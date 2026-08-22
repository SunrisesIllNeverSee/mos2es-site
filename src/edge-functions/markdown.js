import TurndownService from "npm:turndown";
import { mergeVary, negotiateRepresentation } from "./lib/accept.mjs";

const NON_CONTENT_CLASS = /(?:^|\s)(?:nav|footer|content-footer|ip-strip-top|ip-strip-bottom)(?:\s|$)/i;

function responseHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("Vary", mergeVary(headers.get("Vary") ?? ""));
  return headers;
}

function responseInit(response, headers) {
  return {
    status: response.status,
    statusText: response.statusText,
    headers,
  };
}

function markdownFromHtml(html) {
  const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });

  turndown.remove((node) => {
    const tag = node.nodeName?.toLowerCase?.() ?? "";
    if (["script", "style", "noscript", "nav", "footer", "svg"].includes(tag)) return true;
    const className = typeof node.getAttribute === "function" ? node.getAttribute("class") ?? "" : "";
    return NON_CONTENT_CLASS.test(className);
  });

  return `${turndown.turndown(html).trim()}\n`;
}

// Verify production behavior with:
// curl -sI -H "Accept: text/markdown" https://mos2es.com/
// curl -s  -H "Accept: text/markdown" https://mos2es.com/architecture
// Add/remove paths with the [[edge_functions]] declaration in netlify.toml.
// Test the full request chain locally with: npx netlify dev
export default async function markdownNegotiation(request, context) {
  if (request.method !== "GET" && request.method !== "HEAD") return;

  const representation = negotiateRepresentation(request.headers.get("accept"));

  if (representation === "not-acceptable") {
    return new Response("Not Acceptable. This site can serve text/html or text/markdown.\n", {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
      },
    });
  }

  const origin = await context.next();
  const headers = responseHeaders(origin);
  const contentType = origin.headers.get("content-type") ?? "";

  if (representation !== "markdown" || !contentType.toLowerCase().includes("text/html")) {
    return new Response(origin.body, responseInit(origin, headers));
  }

  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Content-Signal", "ai-train=yes, search=yes, ai-input=yes");
  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  headers.delete("ETag");

  if (request.method === "HEAD") {
    return new Response(null, responseInit(origin, headers));
  }

  const fallback = origin.clone();
  try {
    const markdown = markdownFromHtml(await origin.text());
    headers.set("X-Markdown-Tokens", String(Math.ceil(markdown.length / 4)));
    return new Response(markdown, responseInit(origin, headers));
  } catch (error) {
    console.error("markdown negotiation failed", error);
    const fallbackHeaders = responseHeaders(fallback);
    return new Response(fallback.body, responseInit(fallback, fallbackHeaders));
  }
}
