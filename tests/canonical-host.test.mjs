import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { canonicalRedirect } from "../functions/lib/canonical-host.mjs";
import { onRequest } from "../functions/_middleware.js";

const run = async (url, method = "GET") => {
  let nextCalled = false;
  const res = await onRequest({
    request: new Request(url, { method, body: method === "POST" ? "x=1" : undefined }),
    next: async () => { nextCalled = true; return new Response("page"); },
  });
  return { res, nextCalled };
};

test("www.mos2es.com redirects to the apex, keeping path and query", () => {
  assert.equal(canonicalRedirect("https://www.mos2es.com/"), "https://mos2es.com/");
  assert.equal(canonicalRedirect("https://www.mos2es.com/about?x=1#top"), "https://mos2es.com/about?x=1#top");
  assert.equal(canonicalRedirect("http://WWW.mos2es.com/papers"), "https://mos2es.com/papers");
  assert.equal(canonicalRedirect("https://www.mos2es.com./papers"), "https://mos2es.com/papers");
});

test("the apex and other hosts are left alone", () => {
  assert.equal(canonicalRedirect("https://mos2es.com/about"), null);
  assert.equal(canonicalRedirect("https://mos2es.pages.dev/"), null);
  assert.equal(canonicalRedirect("http://localhost:8788/"), null);
});

test("middleware: GET on www is a 301 to the apex and never reaches the page", async () => {
  const { res, nextCalled } = await run("https://www.mos2es.com/about?x=1");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://mos2es.com/about?x=1");
  assert.equal(nextCalled, false);
});

test("middleware: POST on www is a 308 so the method and body survive", async () => {
  const { res } = await run("https://www.mos2es.com/api/search", "POST");
  assert.equal(res.status, 308);
  assert.equal(res.headers.get("location"), "https://mos2es.com/api/search");
});

test("middleware: apex requests pass straight through", async () => {
  const { res, nextCalled } = await run("https://mos2es.com/about");
  assert.equal(nextCalled, true);
  assert.equal(await res.text(), "page");
});

test("_redirects holds no host-matched rules (Pages ignores them)", async () => {
  const redirects = await readFile(new URL("../_redirects", import.meta.url), "utf8");
  const hostRules = redirects.split("\n").map((l) => l.trim()).filter((l) => /^https?:\/\//.test(l));
  assert.deepEqual(hostRules, []);
});
