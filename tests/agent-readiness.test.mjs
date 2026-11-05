import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  mergeVary,
  negotiateRepresentation,
  parseAccept,
  qualityFor,
} from "../src/edge-functions/lib/accept.mjs";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Accept parser prefers explicitly requested Markdown", () => {
  assert.equal(negotiateRepresentation("text/markdown"), "markdown");
  assert.equal(negotiateRepresentation("text/markdown, text/html;q=0.8"), "markdown");
});

test("Accept parser preserves HTML as the default browser representation", () => {
  assert.equal(negotiateRepresentation(null), "html");
  assert.equal(negotiateRepresentation("*/*"), "html");
  assert.equal(negotiateRepresentation("text/html, text/markdown;q=0.8"), "html");
});

test("Accept parser honors q=0 and specificity", () => {
  const ranges = parseAccept("text/*;q=0.9, text/markdown;q=0, */*;q=0.5");
  assert.equal(qualityFor("text/markdown", ranges), 0);
  assert.equal(qualityFor("text/html", ranges), 0.9);
  assert.equal(negotiateRepresentation("text/*;q=0.9, text/markdown;q=0, */*;q=0.5"), "html");
});

test("unsupported Accept headers return the 406 decision", () => {
  assert.equal(negotiateRepresentation("application/json"), "not-acceptable");
  assert.equal(negotiateRepresentation("text/html;q=0, text/markdown;q=0"), "not-acceptable");
});

test("Vary always includes Accept and Accept-Encoding without duplicates", () => {
  assert.equal(mergeVary("accept-encoding"), "accept-encoding, Accept");
  assert.equal(mergeVary("Origin, Accept"), "Origin, Accept, Accept-Encoding");
  assert.equal(mergeVary("Accept, Accept-Encoding"), "Accept, Accept-Encoding");
});

test("Netlify config registers canonical Markdown negotiation", async () => {
  const [netlify, headers, edge] = await Promise.all([
    read("netlify.toml"),
    read("_headers"),
    read("src/edge-functions/markdown.js"),
  ]);
  assert.match(netlify, /edge_functions = "src\/edge-functions"/);
  assert.match(netlify, /function = "markdown"/);
  // Vary: Accept was intentionally removed from the global _headers block to
  // fix 406 errors on extensionless .well-known files (scanners sending
  // Accept: application/json or application/linkset+json triggered content
  // negotiation with no matching variant). Only Accept-Encoding remains.
  assert.match(headers, /Vary: Accept-Encoding/);
  assert.match(edge, /text\/markdown; charset=utf-8/);
  assert.match(edge, /status: 406/);
  assert.match(edge, /status: response\.status/);
});

test("custom 404 gives agents explicit recovery paths", async () => {
  const page = await read("404.html");
  assert.match(page, /permalink: "404\.html"/);
  assert.match(page, /\/llms\.txt/);
  assert.match(page, /\/sitemap\.xml/);
  assert.match(page, /Do not treat this URL as a valid resource/);
});

test("llms.txt contains specific when-to-use and calling guidance", async () => {
  const llms = await read("llms.txt");
  assert.match(llms, /## When to use MO§ES/);
  assert.match(llms, /## How agents should use this site/);
  assert.match(llms, /Accept: text\/markdown/);
  assert.match(llms, /Do not use MO§ES as a general-purpose chatbot/);
});

test("trust anchors are substantive, routed, and indexed", async () => {
  const [about, contact, privacy, redirects, sitemap, footer] = await Promise.all([
    read("about.html"),
    read("contact.html"),
    read("privacy.html"),
    read("_redirects"),
    read("sitemap.xml"),
    read("_includes/partials/content-footer.html"),
  ]);

  for (const [name, page] of [["about", about], ["contact", contact], ["privacy", privacy]]) {
    assert.ok(page.length >= 1000, `${name} trust page should contain substantial content`);
    assert.match(sitemap, new RegExp(`https://mos2es\\.com/${name}`));
    assert.match(footer, new RegExp(`href="/${name}"`));
  }

  // Cloudflare Pages handles pretty URLs natively (serves /page.html at /page).
  // Netlify-style rewrites (/path /path.html 200) caused redirect loops there, so
  // _redirects may only hold 301/308 redirects from retired paths to live pages:
  // no rewrites, no rule over a page that still builds, no chains or loops.
  const redirectRules = redirects
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(/\s+/));
  const pathRules = redirectRules.filter(([from]) => from.startsWith("/"));
  const sources = new Set(pathRules.map(([from]) => from));
  const ignored = await read(".eleventyignore");
  for (const [from, to, status] of pathRules) {
    assert.ok(["301", "308"].includes(status), `${from}: only 301/308 redirects, no rewrites (got ${status})`);
    assert.ok(!sources.has(to), `${from} -> ${to}: redirect chain or loop`);
    assert.notEqual(from.replace(/\.html$/, ""), to.replace(/\.html$/, ""), `${from}: redirects to itself`);
    if (!from.includes("*")) {
      const file = from.replace(/^\//, "").replace(/\.html$/, "") + ".html";
      let builds = false;
      try { await read(file); builds = !ignored.split("\n").some((l) => l.trim() === file || (l.trim().endsWith("/") && file.startsWith(l.trim()))); } catch {}
      assert.ok(!builds, `${from}: rule shadows a live page (${file})`);
    }
  }
});

test("organization identity publishes brand aliases and contact point", async () => {
  const config = await read(".eleventy.js");
  assert.match(config, /name: "Ello Cello LLC"/);
  assert.match(config, /name: "MO§ES™"/);
  assert.match(config, /alternateName: \["MO§ES", "MOS2ES", "MOSES"\]/);
  assert.match(config, /contactPoint/);
  // Address + email removed from JSON-LD for privacy (P8 cleanup).
  // Visible on /contact page in HTML only.
  assert.doesNotMatch(config, /burnmydays@proton\.me/);
  assert.doesNotMatch(config, /streetAddress/);
});
