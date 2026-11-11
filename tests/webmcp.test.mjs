import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const exists = (path) => access(new URL(path, root)).then(() => true, () => false);

const loadTools = async () => {
  const tools = {};
  const navigations = [];
  const sandbox = {
    document: { modelContext: { registerTool: (t) => { tools[t.name] = t; } } },
    window: { location: { set href(v) { navigations.push(v); } } },
    fetch: async () => ({ ok: false }),
    setTimeout: (fn) => fn(),
  };
  new Function(...Object.keys(sandbox), await read("webmcp.js"))(...Object.values(sandbox));
  return { tools, navigations };
};
const text = (r) => r.content[0].text;

test("shared layouts load the WebMCP tools script", async () => {
  for (const layout of ["_includes/partials/head.html", "_includes/layouts/simple.html"]) {
    assert.match(await read(layout), /<script src="\/webmcp\.js" defer><\/script>/, layout);
  }
  assert.match(await read(".eleventy.js"), /addPassthroughCopy\("webmcp\.js"\)/);
});

test("every mos2es.com path in webmcp.js is a live page, not a redirect", async () => {
  const js = await read("webmcp.js");
  const redirected = new Set((await read("_redirects")).split("\n")
    .map((l) => l.trim()).filter((l) => l.startsWith("/")).map((l) => l.split(/\s+/)[0]));
  const paths = new Set([
    ...[...js.matchAll(/https:\/\/mos2es\.com(\/[a-z0-9/-]*)/g)].map((m) => m[1]),
    ...[...js.matchAll(/(?:url: |: )'(\/[a-z0-9/-]*)'/g)].map((m) => m[1]),
  ]);
  assert.ok(paths.size >= 10, `expected the page lists to be found, got ${paths.size}`);
  assert.ok(!js.includes("mos2es.org"), "mos2es.org expired");
  for (const p of paths) {
    assert.ok(!redirected.has(p) && !redirected.has(p.replace(/\/$/, "")), `${p} is a retired (redirected) path`);
    const base = p === "/" ? "index" : p.replace(/^\//, "").replace(/\/$/, "/index");
    assert.ok(await exists(`${base}.html`), `${p} has no source page (${base}.html)`);
  }
});

test("search: empty query asks for a term; whole-word keywords only", async () => {
  const { tools } = await loadTools();
  assert.match(text(await tools.search_moses.execute({ query: "  " })), /Enter a search term/);
  assert.match(text(await tools.search_moses.execute({ query: "lineage" })), /origin-binding/);
  assert.match(text(await tools.search_moses.execute({ query: "explain" })), /No results/);
});

test("search ignores results from other hosts such as the expired mos2es.org", async () => {
  const { tools } = await loadTools();
  const sandboxFetch = async () => ({ ok: true, json: async () => ({ results: [{ score: 1, text: "old", url: "https://mos2es.org/product" }] }) });
  const tools2 = {};
  new Function("document", "fetch", "setTimeout", await read("webmcp.js"))(
    { modelContext: { registerTool: (t) => { tools2[t.name] = t; } } }, sandboxFetch, (fn) => fn());
  const out = text(await tools2.search_moses.execute({ query: "products" }));
  assert.doesNotMatch(out, /mos2es\.org/);
  assert.match(out, /https:\/\/mos2es\.com\/products/);
  assert.ok(tools.search_moses);
});

test("navigate_to rejects unknown pages and navigates after answering", async () => {
  const { tools, navigations } = await loadTools();
  assert.match(text(await tools.navigate_to.execute({ page: "legal" })), /Unknown page/);
  assert.equal(navigations.length, 0);
  assert.match(text(await tools.navigate_to.execute({ page: "research" })), /mos2es\.com\/research/);
  assert.deepEqual(navigations, ["/research"]);
});

test("list_papers lists every DOI from llms.txt", async () => {
  const { tools } = await loadTools();
  const out = text(await tools.list_papers.execute());
  const dois = [...(await read("llms.txt")).matchAll(/https:\/\/doi\.org\/[^\s)]+/g)].map((m) => m[0]);
  for (const doi of new Set(dois)) assert.ok(out.includes(doi), `missing ${doi}`);
});
