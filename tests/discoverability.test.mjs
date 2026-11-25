import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const DISCOVERY_FILES = [
  ".well-known/agent.json",
  ".well-known/agent-card.json",
  ".well-known/api-catalog",
  ".well-known/mcp/server-card.json",
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
  const serverCard = JSON.parse(await read(".well-known/mcp/server-card.json"));
  assert.equal(serverCard.remotes, undefined);
});

const ANALYTICS_FILES = ["_includes/partials/head.html", "_includes/layouts/content-page.html", "deck.html"];

test("GA4 and PostHog only start on the production hostnames", async () => {
  for (const path of ANALYTICS_FILES) {
    const html = await read(path);
    if (html.includes("G-SDGZRVRKKS")) {
      // No static gtag.js tag: it is injected only after the hostname check.
      assert.ok(!/<script[^>]+googletagmanager\.com\/gtag\/js/.test(html), `${path} loads gtag.js unconditionally`);
      assert.match(html, /\['mos2es\.com', 'www\.mos2es\.com'\]\.indexOf\(location\.hostname\) === -1\) return/, path);
    }
    if (html.includes("posthog.init")) {
      assert.match(html, /<script>if\(\["mos2es\.com","www\.mos2es\.com"\]\.indexOf\(location\.hostname\)>-1\)\{!function/, path);
    }
  }
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

test("served pages link straight to final URLs, not retired ones", async () => {
  const retired = /href="(?:https:\/\/mos2es\.com)?\/(?:papers|architecture|ai-governance|agent-governance|multi-agent-systems|constitutional-ai-hub|commitment-conservation-hub|concepts\/conservation-law|concepts\/commitment-conservation)["#?]/;
  for (const path of [
    "404.html",
    "faq.html",
    "concepts/origin-binding.html",
    "concepts/recursive-compression.html",
    "concepts/governance-enforcement.html",
    "concepts/signal-encoding.html",
    "concepts/constitutional-substrate.html",
    "guides/how-to-verify-lineage.html",
  ]) {
    assert.ok(!retired.test(await read(path)), `${path} links to a redirecting URL`);
  }
});
