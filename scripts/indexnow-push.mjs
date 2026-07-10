#!/usr/bin/env node
// indexnow-push.mjs — IndexNow push script for mos2es.com
//
// Reads every <loc> URL from sitemap.xml and POSTs the URL list to three
// IndexNow endpoints (api.indexnow.org, Bing, Yandex). Logs the HTTP status
// code returned by each engine and prints a summary at the end.
//
// Usage:
//   node scripts/indexnow-push.mjs                 # push all sitemap URLs
//   node scripts/indexnow-push.mjs /papers         # push a single URL
//
// Requires: Node 18+ (global fetch). No external dependencies.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HOST = "mos2es.com";
const KEY = "3cb9dad60ebc43248d4ec58b2d9b4aca";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const ENGINES = [
  "https://api.indexnow.org/IndexNow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(SCRIPT_DIR, "..");
const SITEMAP_PATH = join(REPO_ROOT, "sitemap.xml");

// ─── URL extraction ────────────────────────────────────────────────────────

/**
 * Parse sitemap.xml and return every <loc> value in document order.
 * Uses a non-greedy regex so we don't need a DOM parser dependency.
 * @param {string} xml
 * @returns {string[]}
 */
function extractUrlsFromSitemap(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

// ─── IndexNow push ──────────────────────────────────────────────────────────

/**
 * POST the urlList to a single IndexNow endpoint.
 * @param {string} endpoint
 * @param {string[]} urlList
 * @returns {Promise<{endpoint: string, status: number | string, ok: boolean, error?: string}>}
 */
async function pushToEngine(endpoint, urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return { endpoint, status: res.status, ok: res.ok };
  } catch (err) {
    return {
      endpoint,
      status: "ERROR",
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  // Resolve URL list: explicit arg → single URL, otherwise parse sitemap.
  const arg = process.argv[2];
  let urls;
  if (arg) {
    urls = [arg.startsWith("http") ? arg : `https://${HOST}${arg}`];
  } else {
    let xml;
    try {
      xml = readFileSync(SITEMAP_PATH, "utf8");
    } catch (err) {
      console.error(
        `ERROR: could not read ${SITEMAP_PATH}: ${
          err instanceof Error ? err.message : err
        }`,
      );
      process.exit(1);
    }
    urls = extractUrlsFromSitemap(xml);
  }

  if (urls.length === 0) {
    console.error("ERROR: no URLs found to push.");
    process.exit(1);
  }

  console.log(`IndexNow push for ${HOST}`);
  console.log(`Pushing ${urls.length} URL(s) to ${ENGINES.length} engine(s)...\n`);

  const results = [];
  for (const endpoint of ENGINES) {
    process.stdout.write(`→ ${endpoint}  ... `);
    const result = await pushToEngine(endpoint, urls);
    if (result.ok) {
      console.log(`Status: ${result.status}`);
    } else {
      console.log(`Status: ${result.status}${result.error ? ` (${result.error})` : ""}`);
    }
    results.push(result);
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log("\n──────────────────────────────────────────────");
  console.log(`SUMMARY  —  ${urls.length} URL(s) pushed`);
  console.log("──────────────────────────────────────────────");
  for (const r of results) {
    const tag = r.ok ? "OK " : "FAIL";
    console.log(`[${tag}] ${r.endpoint}  →  ${r.status}`);
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.log(`\n${failed.length} engine(s) returned a non-2xx status.`);
  }

  // Exit non-zero if every engine failed; partial success is still useful.
  if (failed.length === results.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Fatal error: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
});
