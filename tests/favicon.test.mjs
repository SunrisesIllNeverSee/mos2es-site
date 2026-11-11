import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const icons = ["favicon.ico", "favicon.svg", "apple-touch-icon.png"];

test("icon files exist and are copied into the build", async () => {
  const config = await read(".eleventy.js");
  for (const icon of icons) {
    assert.ok((await stat(new URL(icon, root))).size > 0, `${icon} is missing or empty`);
    assert.match(config, new RegExp(`addPassthroughCopy\\("${icon.replace(".", "\\.")}"\\)`), `${icon} is not copied to _site`);
  }
});

test("favicon.svg draws the mark as a path, not font-dependent text", async () => {
  const svg = await read("favicon.svg");
  assert.match(svg, /<path /);
  assert.doesNotMatch(svg, /<text/);
});

test("shared layouts link the icon files instead of an inline data URI", async () => {
  for (const layout of ["_includes/partials/head.html", "_includes/layouts/simple.html"]) {
    const html = await read(layout);
    assert.match(html, /<link rel="icon" href="\/favicon\.ico"/, layout);
    assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml">/, layout);
    assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png">/, layout);
    assert.doesNotMatch(html, /rel="icon" href="data:/, layout);
  }
});

test("shared layouts load the WebMCP tools script", async () => {
  for (const layout of ["_includes/partials/head.html", "_includes/layouts/simple.html"]) {
    assert.match(await read(layout), /<script src="\/webmcp\.js" defer><\/script>/, layout);
  }
  assert.match(await read(".eleventy.js"), /addPassthroughCopy\("webmcp\.js"\)/);
});

test("WebMCP tools only point at live pages", async () => {
  const js = await read("webmcp.js");
  for (const retired of ["/benchmarks", "/architecture", "/legal", "/press", "/papers", "/field-sheet", "/agent-governance", "mos2es.org"]) {
    assert.ok(!js.includes(retired), `webmcp.js still references ${retired}`);
  }
});
