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
  assert.match(headers, /Vary: Accept, Accept-Encoding/);
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
    assert.match(redirects, new RegExp(`/${name}\\s+/${name}\\.html\\s+200`));
    assert.match(sitemap, new RegExp(`https://mos2es\\.com/${name}`));
    assert.match(footer, new RegExp(`href="/${name}"`));
  }
});

test("organization identity publishes brand aliases, contact point, and postal address", async () => {
  const config = await read(".eleventy.js");
  assert.match(config, /name: "Ello Cello LLC"/);
  assert.match(config, /name: "MO§ES™"/);
  assert.match(config, /alternateName: \["MO§ES", "MOS2ES", "MOSES"\]/);
  assert.match(config, /contactPoint/);
  assert.match(config, /"@type": "PostalAddress"/);
  assert.match(config, /streetAddress: "84 W Utica St"/);
  assert.match(config, /addressLocality: "Buffalo"/);
  assert.match(config, /postalCode: "14209"/);
});
