import assert from "node:assert/strict";
import test from "node:test";
import { AI_CRAWLER_EVENT, crawlerCapture, detectCrawler } from "../functions/lib/ai-crawler.mjs";
import { onRequest } from "../functions/_middleware.js";

const UA = {
  GPTBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot",
  "OAI-SearchBot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot",
  "ChatGPT-User": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
  ClaudeBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)",
  "Claude-User": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-User/1.0; +Claude-User@anthropic.com)",
  "Claude-SearchBot": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Searchbot@anthropic.com)",
  PerplexityBot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)",
  "Perplexity-User": "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)",
  DuckAssistBot: "DuckAssistBot/1.2; (+http://duckduckgo.com/duckassistbot.html)",
  Googlebot: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
  Bingbot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm) Chrome/116.0.1938.76 Safari/537.36",
  Applebot: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)",
  "meta-externalagent": "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
  Bytespider: "Mozilla/5.0 (Linux; Android 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Mobile Safari/537.36 (compatible; Bytespider; spider-feedback@bytedance.com)",
  CCBot: "CCBot/2.0 (https://commoncrawl.org/faq/)",
  Amazonbot: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot) Chrome/119.0.6045.214 Safari/537.36",
  YouBot: "Mozilla/5.0 (compatible; YouBot (+http://www.you.com))",
  "cohere-ai": "cohere-ai",
};

const FAMILIES = {
  GPTBot: "ai_training", ClaudeBot: "ai_training", CCBot: "ai_training", Bytespider: "ai_training",
  "meta-externalagent": "ai_training", Amazonbot: "ai_training", "cohere-ai": "ai_training",
  "OAI-SearchBot": "ai_search", "Claude-SearchBot": "ai_search", PerplexityBot: "ai_search",
  DuckAssistBot: "ai_search", YouBot: "ai_search",
  "ChatGPT-User": "ai_user_fetch", "Claude-User": "ai_user_fetch", "Perplexity-User": "ai_user_fetch",
  Googlebot: "search", Bingbot: "search", Applebot: "search",
};

const BROWSER = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

// Run the middleware with a recorded fetch and waitUntil.
const run = async (url, userAgent, { status = 200, method = "GET" } = {}) => {
  const page = new Response("page", { status, headers: { "X-Page": "1" } });
  const sent = [];
  const waited = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (u, init) => { sent.push({ url: u, init }); return new Response("ok"); };
  try {
    const res = await onRequest({
      request: new Request(url, { method, headers: userAgent ? { "User-Agent": userAgent } : {} }),
      next: async () => page,
      env: {},
      waitUntil: (p) => waited.push(p),
    });
    await Promise.all(waited);
    return { res, page, sent, waited };
  } finally {
    globalThis.fetch = realFetch;
  }
};

test("each real crawler user-agent is identified by name and family", () => {
  for (const [name, ua] of Object.entries(UA)) {
    const crawler = detectCrawler(ua);
    assert.equal(crawler?.name, name, ua);
    assert.equal(crawler.family, FAMILIES[name], name);
  }
});

test("people and unknown bots are not crawlers", () => {
  for (const ua of [null, "", BROWSER, "Slackbot-LinkExpanding 1.0", "Twitterbot/1.0", "SomeCrawler/1.0"]) {
    assert.equal(detectCrawler(ua), null, String(ua));
  }
});

test("middleware returns the page response unchanged for a crawler", async () => {
  const { res, page } = await run("https://mos2es.com/research", UA.GPTBot);
  assert.equal(res, page);
  assert.equal(await res.text(), "page");
  assert.equal(res.headers.get("x-page"), "1");
});

test("a crawler hit sends one ai_bot_detected event through waitUntil, without the query string", async () => {
  const { sent, waited } = await run("https://mos2es.com/research?utm_source=x&token=secret", UA["ChatGPT-User"], { status: 200 });
  assert.equal(waited.length, 1);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, "https://us.i.posthog.com/i/v0/e/");
  assert.equal(sent[0].init.method, "POST");
  const body = JSON.parse(sent[0].init.body);
  assert.equal(body.event, AI_CRAWLER_EVENT);
  assert.equal(body.event, "ai_bot_detected");
  assert.equal(body.distinct_id, "crawler:ChatGPT-User");
  assert.match(body.api_key, /^phc_/);
  assert.deepEqual(
    { ...body.properties },
    {
      bot_name: "ChatGPT-User",
      bot_operator: "OpenAI",
      bot_family: "ai_user_fetch",
      host: "mos2es.com",
      path: "/research",
      method: "GET",
      status: 200,
      $host: "mos2es.com",
      $pathname: "/research",
      $current_url: "https://mos2es.com/research",
      $process_person_profile: false,
      $lib: "mos2es-pages-function",
    },
  );
  assert.doesNotMatch(sent[0].init.body, /utm_source|token=|secret/);
});

test("the page's status is recorded, so crawler 404s show up", async () => {
  const { sent } = await run("https://mos2es.com/missing", UA.Bingbot, { status: 404 });
  assert.equal(JSON.parse(sent[0].init.body).properties.status, 404);
});

test("robots.txt, llms.txt, sitemap.xml and papers are counted; images, styles and scripts are not", async () => {
  for (const path of ["/robots.txt", "/llms.txt", "/sitemap.xml", "/.well-known/mcp.json", "/papers/x.pdf"]) {
    const { sent } = await run(`https://mos2es.com${path}`, UA.ClaudeBot);
    assert.equal(sent.length, 1, path);
  }
  for (const path of ["/assets/landing.css", "/assets/site.js", "/img/a.png", "/favicon.ico", "/fonts/a.woff2"]) {
    const { sent, waited } = await run(`https://mos2es.com${path}`, UA.ClaudeBot);
    assert.equal(sent.length, 0, path);
    assert.equal(waited.length, 0, path);
  }
});

test("people and unknown bots send nothing", async () => {
  for (const ua of [undefined, BROWSER, "Twitterbot/1.0"]) {
    const { sent, waited, res, page } = await run("https://mos2es.com/", ua);
    assert.equal(sent.length, 0);
    assert.equal(waited.length, 0);
    assert.equal(res, page);
  }
});

test("a failing PostHog call never breaks the page", async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("network down"); };
  const waited = [];
  try {
    const page = new Response("page");
    const res = await onRequest({
      request: new Request("https://mos2es.com/", { headers: { "User-Agent": UA.GPTBot } }),
      next: async () => page,
      env: {},
      waitUntil: (p) => waited.push(p),
    });
    assert.equal(res, page);
    await assert.doesNotReject(Promise.all(waited));
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("a www crawler request is redirected and sends nothing", async () => {
  const { res, sent } = await run("https://www.mos2es.com/research", UA.Googlebot);
  assert.equal(res.status, 301);
  assert.equal(sent.length, 0);
});

test("previews, local runs and non-GET requests send nothing", async () => {
  for (const url of ["https://abc123.mos2es.pages.dev/", "https://mos2es.pages.dev/", "http://localhost:8788/"]) {
    const { sent } = await run(url, UA.GPTBot);
    assert.equal(sent.length, 0, url);
  }
  for (const method of ["POST", "OPTIONS"]) {
    const { sent } = await run("https://mos2es.com/", UA.GPTBot, { method });
    assert.equal(sent.length, 0, method);
  }
  const { sent } = await run("https://mos2es.com/", UA.GPTBot, { method: "HEAD" });
  assert.equal(sent.length, 1);
});

test("without waitUntil the page is still served and nothing is sent", async () => {
  const realFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls += 1; return new Response("ok"); };
  try {
    const page = new Response("page");
    const res = await onRequest({
      request: new Request("https://mos2es.com/", { headers: { "User-Agent": UA.GPTBot } }),
      next: async () => page,
    });
    assert.equal(res, page);
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("a POSTHOG_KEY Pages variable overrides the embedded public key", () => {
  const request = new Request("https://mos2es.com/", { headers: { "User-Agent": UA.GPTBot } });
  const capture = crawlerCapture(request, 200, { POSTHOG_KEY: "phc_override" });
  assert.equal(JSON.parse(capture.init.body).api_key, "phc_override");
});

test("crawler hits on /api/ routes are not recorded", () => {
  const request = new Request("https://mos2es.com/api/search?q=x", {
    headers: { "user-agent": "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)" },
  });
  assert.equal(crawlerCapture(request, 200), null);
});

test("the PostHog request carries a timeout", () => {
  const request = new Request("https://mos2es.com/research", {
    headers: { "user-agent": "Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)" },
  });
  const capture = crawlerCapture(request, 200);
  assert.ok(capture.init.signal instanceof AbortSignal);
});
