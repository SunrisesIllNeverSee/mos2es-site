// Cloudflare Pages Function — markdown content negotiation
// Ported from src/edge-functions/markdown.js (Netlify Edge Function)
//
// Serves text/markdown when the client sends Accept: text/markdown
// with higher q-value than text/html. Falls through to normal static
// serving otherwise.
//
// IMPORTANT: This function must NOT interfere with non-markdown requests.
// For non-markdown requests, it simply calls next() and returns the
// response unchanged, allowing _redirects and static assets to work
// normally. Markdown conversion only happens when Accept: text/markdown
// is the preferred representation.

import { mergeVary, negotiateRepresentation } from "./lib/accept.mjs";

const STATIC_EXT = /\.(js|css|xml|txt|json|png|jpg|jpeg|gif|svg|webp|ico|pdf|zip|jsonld|ttl)$/i;

const SKIP_TAGS = ["script", "style", "noscript", "nav", "footer", "svg", "head", "meta", "link", "iframe"];

function htmlToMarkdown(html) {
  for (const tag of SKIP_TAGS) {
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, "gi"), "");
  }
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  html = html.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  html = html.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  html = html.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n");
  html = html.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n");
  html = html.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n");
  html = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n");
  html = html.replace(/<br\s*\/?>/gi, "  \n");
  html = html.replace(/<hr[^>]*>/gi, "\n---\n");
  html = html.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");
  html = html.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");
  html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");
  html = html.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "\n```\n$1\n```\n");
  html = html.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, c) => "\n" + c.trim().split("\n").map(l => "> " + l).join("\n") + "\n");
  html = html.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  html = html.replace(/<\/?(ul|ol)[^>]*>/gi, "\n");
  html = html.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  html = html.replace(/<img\s+[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, "![$1]($2)");
  html = html.replace(/<img\s+[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)");
  html = html.replace(/<\/?[^>]+(>|$)/g, "");
  html = html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&hellip;/g, "…")
    .replace(/&sect;/g, "§").replace(/&copy;/g, "©").replace(/&trade;/g, "™");
  html = html.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+\n/g, "\n").trim();
  return html + "\n";
}

export async function onRequest(context) {
  const { request, next } = context;

  // ─── /api/search — proxy to analytics worker (AI Search binding) ──────
  // Handles both GET and POST before the GET/HEAD-only markdown logic.
  const searchUrl = new URL(request.url);
  if (searchUrl.pathname === "/api/search") {
    const proxyUrl = new URL("https://moses-analytics.sigrank.workers.dev/api/search");
    searchUrl.searchParams.forEach((v, k) => proxyUrl.searchParams.set(k, v));
    const searchReq = new Request(proxyUrl.toString(), {
      method: request.method,
      headers: { "Content-Type": "application/json", "X-Original-Host": "mos2es.com" },
      body: request.method === "POST" ? await request.text() : undefined,
    });
    const searchResp = await fetch(searchReq);
    return new Response(searchResp.body, {
      status: searchResp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  }

  // Only intercept GET/HEAD
  if (request.method !== "GET" && request.method !== "HEAD") {
    return next();
  }

  // Skip static assets entirely — let them be served directly
  const url = new URL(request.url);
  if (STATIC_EXT.test(url.pathname)) {
    return next();
  }

  // Skip .well-known endpoints — they have their own Content-Type rules
  // in _headers and must not be subject to HTML/markdown negotiation.
  // Returning 406 for Accept: application/json breaks agent discovery.
  if (url.pathname.startsWith("/.well-known/")) {
    return next();
  }

  // Skip auth.md at root — served with its own Content-Type
  if (url.pathname === "/auth.md") {
    return next();
  }

  // Only do markdown negotiation if the client prefers text/markdown
  const representation = negotiateRepresentation(request.headers.get("accept"));

  // For non-markdown requests, just pass through — this lets _redirects
  // and static asset serving work normally without interference.
  if (representation !== "markdown") {
    if (representation === "not-acceptable") {
      // Only return 406 for page-like requests that explicitly reject
      // both text/html and text/markdown. API clients (Accept: application/json)
      // should fall through to static serving via next().
      return next();
    }
    return next();
  }

  // Markdown negotiation: get the HTML response, convert to markdown.
  // For pretty URLs (e.g. /architecture), next() may return a 308 redirect
  // to /architecture/ or a 404. We need to handle both cases.
  let origin = await next();

  // If we got a redirect, follow it to get the actual HTML
  if (origin.status >= 300 && origin.status < 400) {
    const location = origin.headers.get("location");
    if (location) {
      const redirectUrl = new URL(location, url.origin);
      origin = await fetch(redirectUrl.toString(), {
        headers: { "Accept": "text/html" },
      });
    }
  }

  // If still not found, try appending .html
  if (origin.status === 404 && !url.pathname.endsWith(".html")) {
    origin = await fetch(url.origin + url.pathname + ".html", {
      headers: { "Accept": "text/html" },
    });
  }

  const contentType = origin.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("text/html")) {
    return origin;
  }

  const headers = new Headers(origin.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes");
  headers.set("Vary", mergeVary(headers.get("Vary") ?? ""));
  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  headers.delete("ETag");

  if (request.method === "HEAD") {
    return new Response(null, {
      status: origin.status,
      statusText: origin.statusText,
      headers,
    });
  }

  const fallback = origin.clone();
  try {
    const html = await origin.text();
    const markdown = htmlToMarkdown(html);
    headers.set("X-Markdown-Tokens", String(Math.ceil(markdown.length / 4)));
    return new Response(markdown, {
      status: origin.status,
      statusText: origin.statusText,
      headers,
    });
  } catch (error) {
    console.error("markdown negotiation failed", error.message || error);
    const fallbackHeaders = new Headers(fallback.headers);
    fallbackHeaders.set("Vary", mergeVary(fallbackHeaders.get("Vary") ?? ""));
    return new Response(fallback.body, {
      status: fallback.status,
      statusText: fallback.statusText,
      headers: fallbackHeaders,
    });
  }
}
