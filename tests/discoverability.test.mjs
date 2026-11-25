import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const DISCOVERY_FILES = [
  ".well-known/agent.json",
  ".well-known/agent-card.json",
  ".well-known/api-catalog",
  ".well-known/auth.md",
  "auth.md",
];

test("agent discovery files are valid JSON and point at no retired host", async () => {
  for (const path of DISCOVERY_FILES) {
    const text = await read(path);
    if (!path.endsWith(".md")) JSON.parse(text);
    assert.ok(!/mos2es\.org|mos2es\.xyz/.test(text), `${path} names a retired domain`);
  }
});

test("agent discovery files do not reference routes that do not exist", async () => {
  for (const path of DISCOVERY_FILES) {
    const text = await read(path);
    for (const dead of ["/openapi.json", "ai-crawler-log", "/api/analytics/beacon"]) {
      assert.ok(!text.includes(dead), `${path} references ${dead}`);
    }
  }
});

test("agent cards declare no MCP endpoint", async () => {
  for (const path of [".well-known/agent.json", ".well-known/agent-card.json"]) {
    const card = JSON.parse(await read(path));
    for (const iface of card.supportedInterfaces) assert.notEqual(iface.type, "mcp", path);
    assert.ok(!card.capabilities.protocols.includes("mcp"), path);
  }
  // No MCP endpoint exists for this host, so the retired server card must not be advertised.
  await assert.rejects(read(".well-known/mcp/server-card.json"));
  for (const path of ["_headers", ".well-known/ai-catalog.json", ".well-known/api-catalog", ".well-known/agent.json", ".well-known/agent-card.json", "auth.md", ".well-known/auth.md"]) {
    assert.ok(!/server-card|MCP server|mcp-server/i.test(await read(path)), `${path} still advertises an MCP server`);
  }
});

// Every HTML source that can reach the live site (pages, layouts, partials).
async function htmlSources() {
  const skip = new Set(["node_modules", "_site", ".git", "docs", "img", "3d", "assets", "uploads", "tools", "scripts", "system-devin", "Devins_Plans", "keys"]);
  const out = [];
  async function walk(dir) {
    for (const entry of await readdir(new URL(`../${dir}`, import.meta.url), { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!skip.has(entry.name)) await walk(`${dir}${entry.name}/`);
      } else if (entry.name.endsWith(".html")) {
        out.push(`${dir}${entry.name}`);
      }
    }
  }
  await walk("");
  return out;
}

function runAnalytics(scripts, hostname) {
  const appended = [];
  const el = () => ({ set src(v) { appended.push(v); }, get src() { return ""; }, parentNode: { insertBefore: (n) => appended.push(n.src) } });
  const document = {
    createElement: el,
    getElementsByTagName: () => [el()],
    head: { appendChild: (n) => appended.push(n.src) },
  };
  // The sandbox is its own window, so bare globals like `posthog` and `gtag` resolve as in a browser.
  const window = { location: { hostname }, document, console };
  window.window = window;
  const ctx = vm.createContext(window);
  for (const code of scripts) vm.runInContext(code, ctx);
  return { window, appended, ctx };
}

test("no served HTML names a retired domain", async () => {
  for (const file of await htmlSources()) {
    const html = await read(file);
    assert.ok(!/mos2es\.(org|xyz)\b|sigeconomy\.com/.test(html), `${file} names a retired domain`);
  }
});

test("GA4 and PostHog only start on production hosts, and stay safe elsewhere", async () => {
  let checked = 0;
  for (const file of await htmlSources()) {
    const html = await read(file);
    const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).filter((c) => /gtag|posthog/.test(c));
    if (!scripts.length) continue;
    checked++;
    // No static tag may load gtag.js before any hostname check.
    assert.ok(!/<script[^>]+googletagmanager\.com\/gtag\/js/.test(html), `${file} loads gtag.js unconditionally`);
    for (const host of ["mos2es.com", "www.mos2es.com"]) {
      const { window, appended } = runAnalytics(scripts, host);
      assert.equal(typeof window.gtag === "function" || !html.includes("gtag"), true, `${file} gtag on ${host}`);
      if (html.includes("googletagmanager")) assert.ok(appended.some((u) => /googletagmanager\.com\/gtag\/js/.test(u)), `${file} should load gtag.js on ${host}`);
      if (html.includes("posthog.init")) assert.equal(window.posthog._i.length, 1, `${file} should init PostHog on ${host}`);
    }
    for (const host of ["d3b4511e.mos2es.pages.dev", "mos2es.pages.dev", "127.0.0.1", "localhost"]) {
      const { window, appended } = runAnalytics(scripts, host);
      // The queue and stubs exist so page code never throws...
      if (html.includes("googletagmanager")) assert.equal(typeof window.gtag, "function", `${file} gtag stub on ${host}`);
      if (html.includes("posthog.init")) assert.ok(window.posthog, `${file} posthog stub on ${host}`);
      // ...but nothing is loaded or sent.
      assert.ok(!appended.some((u) => /googletagmanager|posthog/.test(u)), `${file} loads analytics on ${host}`);
      if (html.includes("posthog.init")) assert.equal(window.posthog._i.length, 0, `${file} should not init PostHog on ${host}`);
      if (html.includes("googletagmanager")) assert.equal((window.dataLayer || []).length, 0, `${file} queued GA events on ${host}`);
    }
  }
  assert.ok(checked >= 3, "expected to find analytics scripts");
});

test("FAQPage JSON-LD is only on /faq among the concept pages", async () => {
  for (const name of [
    "origin-binding",
    "recursive-compression",
    "governance-enforcement",
    "signal-encoding",
    "constitutional-substrate",
    "conservation-law",
    "commitment-conservation",
  ]) {
    assert.ok(!(await read(`concepts/${name}.html`)).includes("FAQPage"), name);
  }
  assert.ok(!(await read("governance-vs-alignment.html")).includes("FAQPage"), "governance-vs-alignment");
  assert.ok((await read("faq.html")).includes("FAQPage"));
});

test("/3d pages carry a self canonical that matches the sitemap", async () => {
  const sitemap = await read("sitemap.xml");
  const pages = { "3d/index.html": "/3d/", "3d/lab.html": "/3d/lab", "3d/sequence.html": "/3d/sequence", "3d/world.html": "/3d/world" };
  for (const [file, path] of Object.entries(pages)) {
    const url = `https://mos2es.com${path}`;
    assert.ok((await read(file)).includes(`<link rel="canonical" href="${url}"/>`), file);
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `${url} missing from sitemap`);
  }
});

test("served pages never link to a URL that _redirects sends elsewhere", async () => {
  const redirects = new Map();
  const wildcards = [];
  for (const line of (await read("_redirects")).split("\n")) {
    const [from, to, status] = line.trim().split(/\s+/);
    if (!from || from.startsWith("#") || status !== "301" || from.includes(":")) continue;
    if (from.endsWith("*")) wildcards.push(from.slice(0, -1));
    else redirects.set(from, to);
  }
  const redirected = (path) => redirects.has(path) || wildcards.some((w) => path.startsWith(w));
  for (const file of await htmlSources()) {
    if (file.startsWith("_includes/")) continue;
    const page = "/" + file.replace(/\.html$/, "").replace(/\/index$/, "");
    if (redirected(page) || redirected(page + ".html")) continue; // retired page, not served
    const html = await read(file);
    for (const [, href] of html.matchAll(/href="(?:https:\/\/mos2es\.com)?(\/[A-Za-z0-9_\-/]*)(?:["#?])/g)) {
      assert.ok(!redirected(href), `${file} links to ${href}, which redirects`);
    }
  }
});
