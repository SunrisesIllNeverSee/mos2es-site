import assert from "node:assert/strict";
import test from "node:test";
import { canonicalRedirect } from "../functions/lib/canonical-host.mjs";

test("www.mos2es.com redirects to the apex, keeping path and query", () => {
  assert.equal(canonicalRedirect("https://www.mos2es.com/"), "https://mos2es.com/");
  assert.equal(canonicalRedirect("https://www.mos2es.com/about?x=1#top"), "https://mos2es.com/about?x=1#top");
  assert.equal(canonicalRedirect("http://WWW.mos2es.com/papers"), "https://mos2es.com/papers");
});

test("the apex and other hosts are left alone", () => {
  assert.equal(canonicalRedirect("https://mos2es.com/about"), null);
  assert.equal(canonicalRedirect("https://mos2es.pages.dev/"), null);
  assert.equal(canonicalRedirect("http://localhost:8788/"), null);
});
