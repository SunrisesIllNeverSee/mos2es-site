---
type: Roadmap
title: Original SEO/GEO Plan (WS5 baseline — most phases already shipped on main)
description: The original SEO/GEO plan (OG, JSON-LD, llms.txt, dynamic OG cards). Most phases already live on sigrank-app main as of 2026-06-29 (JSON-LD Org/WebSite/ItemList/ProfilePage/Breadcrumb/DefinedTerm, llms.txt route, raster og.png + per-page dynamic opengraph-image cards). Kept as the baseline reference — do not redo the shipped parts; the forward gaps are covered by WS1 (Dataset/Index citation).
tags: [sigrank, growth, seo, geo, baseline, shipped, reference]
timestamp: 2026-06-29T18:25:00Z
last_touched: 2026-07-06 13:07 UTC
---

# SigRank SEO + GEO — Full Implementation Plan

> Scope: `sigrank-app` (Next.js 15 App Router — the SEO/GEO surface) and `sigrank-mcp` (npm + GitHub discoverability).
> Goal: fix the two real bugs, then add the high-leverage structured-data + AI-crawler surfaces so SigRank ranks in classic search **and** gets cited by ChatGPT / Perplexity / Claude / Google AI Overviews.
> Designed to run on your desktop with Claude Code or by hand. No new runtime deps — `next/og` ships with Next 15.

---

## 0. Current state (audited from source)

**Already good — do NOT redo:**
- Centralized `lib/seo.ts`: `metadataBase`, title template `%s · SigRank`, canonical URLs, OG + Twitter `summary_large_image`.
- 22/22 routes export `metadata` / `generateMetadata`. `/user/[codename]` already has dynamic title (codename + yield) and description (class tier + global rank).
- `app/robots.ts` allows all crawlers (incl. AI bots) and references the sitemap.
- `app/sitemap.ts` is dynamic: static routes + board windows + **every ranked operator** from the leaderboard API.
- `/wiki/*` definitional pages exist — prime GEO content.

**Gaps this plan closes:**
| # | Gap | Impact | Phase |
|---|-----|--------|-------|
| 1 | OG image is `/og.svg`; no PNG. Most platforms don't render SVG → broken link previews | 🔴 High | 1 |
| 2 | Zero JSON-LD structured data anywhere | 🔴 High (esp. GEO) | 2 |
| 3 | No `llms.txt` | 🟡 Med (GEO) | 3 |
| 4 | All operators share one static OG image | 🟢 Low (shareability) | 4 |
| 5 | `sigrank-mcp/package.json` has no `keywords`; GitHub topics unverified | 🟡 Med | 5 |

**Branches:** `feat/seo-geo` in each repo (adjust to taste). Both repos assumed cloned side by side.

**Baseline before starting:**
```bash
cd sigrank-app && npm ci && npm run build   # confirm green baseline
```

---

## Phase 1 — Fix the OG image (🔴 the most visible bug)

The cleanest fix on Next 15 is the **file-based `opengraph-image` convention** — it generates a real PNG via `next/og` (no SVG, no committed binary, no Satori-500 because we use a system font and inline styles only). Next auto-injects the correct `og:image` / `twitter:image` meta, so we then **remove the manual SVG wiring** to avoid conflicts.

### 1.1 Root site-wide OG image
Create `app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = SITE_NAME

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '80px',
          background: '#0a0a0a', color: '#ededed',
          fontFamily: 'sans-serif', // system font — avoids remote-font fetch (the old 500)
        }}
      >
        <div style={{ fontSize: 140, fontWeight: 800, letterSpacing: '-0.04em' }}>SigRank</div>
        <div style={{ fontSize: 40, opacity: 0.8, marginTop: 24, maxWidth: 900 }}>
          {SITE_TAGLINE}
        </div>
        <div style={{ fontSize: 28, opacity: 0.5, marginTop: 'auto' }}>signalaf.com</div>
      </div>
    ),
    { ...size },
  )
}
```
> Match the brand colors to your `carbon` theme tokens. Keep it to one flex column with inline styles — that's the subset `next/og` (Satori) renders reliably.

### 1.2 Twitter image (optional but explicit)
File-based `opengraph-image` already covers Twitter via the `summary_large_image` card you set in `lib/seo.ts`. No separate `twitter-image.tsx` needed unless you want a different crop.

### 1.3 Remove the broken SVG wiring
In `lib/seo.ts`:
- Delete the `OG_IMAGE` constant (the `/og.svg` object).
- In `withOG()`: remove the `images: [image]` line from `openGraph` and the `images: [image.url]` from `twitter`. Drop the `ogImage` param (file convention handles images now).
- In `siteMetadata`: remove `images: [OG_IMAGE]` from both `openGraph` and `twitter`.
- Delete `public/og.svg`.

> Result: every route inherits the generated PNG; per-route phases (4) override it with route-local `opengraph-image.tsx`.

### 1.4 Verify
```bash
npm run build
npm start &           # or `npm run dev`
curl -sI http://localhost:3000/opengraph-image | grep -i content-type   # → image/png
```
Then paste the deployed URL into <https://www.opengraph.xyz> — you should see a real card, not a blank.

**Acceptance:** `og:image` resolves to a 1200×630 PNG; preview renders on opengraph.xyz / Slack.

---

## Phase 2 — JSON-LD structured data (🔴 biggest SEO + GEO lever)

Add typed Schema.org builders + a tiny server component, then wire the money pages. This is what makes AI engines quote *your* numbers and Google show rich results.

### 2.1 Renderer component
Create `components/seo/JsonLd.tsx`:
```tsx
import 'server-only'

/** Renders a Schema.org JSON-LD block. `<` is escaped to prevent breakout. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
```

### 2.2 Builders
Create `lib/jsonld.ts`:
```ts
import { SITE_ORIGIN, SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

const ORG_ID = `${SITE_ORIGIN}/#org`
const SITE_ID = `${SITE_ORIGIN}/#website`

export function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: SITE_TAGLINE,
    logo: `${SITE_ORIGIN}/opengraph-image`, // or a dedicated square logo
  }
}

export function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    publisher: { '@id': ORG_ID },
    // Optional: site search action if you add /search
  }
}

/** Leaderboard / board window → ItemList of operators. */
export function leaderboardItemList(
  entries: { codename: string; rank: number; classTier?: string }[],
  path: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `SigRank Leaderboard`,
    url: `${SITE_ORIGIN}${path}`,
    numberOfItems: entries.length,
    itemListElement: entries.map((e) => ({
      '@type': 'ListItem',
      position: e.rank,
      url: `${SITE_ORIGIN}/user/${encodeURIComponent(e.codename)}`,
      item: {
        '@type': 'Person',
        name: e.codename,
        ...(e.classTier ? { jobTitle: e.classTier } : {}),
      },
    })),
  }
}

/** Operator profile → ProfilePage about a Person. */
export function operatorProfile(o: {
  codename: string
  path: string
  classTier?: string
  globalRank?: number
  pending?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${SITE_ORIGIN}${o.path}`,
    mainEntity: {
      '@type': 'Person',
      name: o.codename,
      ...(o.classTier ? { jobTitle: o.classTier } : {}),
      ...(o.globalRank && !o.pending
        ? { description: `Rank #${o.globalRank} on the SigRank leaderboard` }
        : {}),
    },
  }
}

export function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_ORIGIN}${t.path}`,
    })),
  }
}

/** Wiki/glossary term → DefinedTerm (great for AI citation). */
export function definedTerm(term: string, definition: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    url: `${SITE_ORIGIN}${path}`,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'SigRank Wiki', url: `${SITE_ORIGIN}/wiki` },
  }
}
```
> Adjust the entry field names to whatever the leaderboard API actually returns (you map `e.operator?.codename`, `e.global_rank`, `e.snapshot.class_tier` elsewhere — reuse those exact paths).

### 2.3 Wire it — site-wide (Organization + WebSite)
In `app/layout.tsx`, inside `<body>` (top is fine):
```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { organization, website } from '@/lib/jsonld'
// ...
<body className="...">
  <JsonLd data={[organization(), website()]} />
  {/* existing THEME_INIT script, Nav, etc. */}
```

### 2.4 Wire it — `/board/[window]` and `/leaderboard` (ItemList) — the money pages
In `app/board/[window]/page.tsx`, after you fetch the board entries, render:
```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { leaderboardItemList } from '@/lib/jsonld'
// inside the component, reusing the entries you already load:
<JsonLd
  data={leaderboardItemList(
    entries.map((e) => ({
      codename: e.operator.codename,
      rank: e.global_rank,
      classTier: e.snapshot?.class_tier,
    })),
    `/board/${window}`,
  )}
/>
```
`/leaderboard` redirects to `/board/all`, so wiring the board route covers both.

### 2.5 Wire it — `/user/[codename]` (ProfilePage)
In `app/user/[codename]/page.tsx`, in the page component (you already have `row`):
```tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { operatorProfile } from '@/lib/jsonld'
// ...
<JsonLd
  data={operatorProfile({
    codename: resolveName(operator),
    path: `/user/${rawCodename}`,
    classTier: snapshot.class_tier,
    globalRank: row.global_rank,
    pending,
  })}
/>
```

### 2.6 Wire it — `/wiki/*` (BreadcrumbList + DefinedTerm)
For each wiki page (`signal-drift`, `three-degrees`, `verification`, `local-agent`, `measured-alongside`), add:
```tsx
<JsonLd data={[
  breadcrumb([
    { name: 'Wiki', path: '/wiki' },
    { name: 'Signal Drift', path: '/wiki/signal-drift' },
  ]),
  definedTerm('Signal Drift', 'One-sentence canonical definition pulled from the page intro.', '/wiki/signal-drift'),
]} />
```

### 2.7 Verify
```bash
npm run build && npm start
# confirm the blocks are present and valid JSON:
curl -s http://localhost:3000/board/all | grep -o 'application/ld+json'
```
Validate each page type at <https://validator.schema.org> and <https://search.google.com/test/rich-results> (paste deployed URLs after deploy).

**Acceptance:** Organization+WebSite on every page; ItemList on boards; ProfilePage on profiles; Breadcrumb+DefinedTerm on wiki — all pass the Schema validator with 0 errors.

---

## Phase 3 — `llms.txt` (🟡 GEO convention)

A curated plain-text map at `/llms.txt` telling AI crawlers what SigRank is and where the canonical content lives.

Create `app/llms.txt/route.ts` (folder literally named `llms.txt`):
```ts
import { SITE_ORIGIN, SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const revalidate = 3600 // 1h

export async function GET() {
  const body = `# ${SITE_NAME}

> ${SITE_TAGLINE}

SigRank is a privacy-preserving leaderboard that scores AI operators on
canonical token-telemetry metrics (the "yield cascade"). Operators run an
on-device scanner (npm: sigrank) and submit signed, server-verifiable snapshots.

## Core pages
- [Leaderboard](${SITE_ORIGIN}/board/all): live operator rankings (all-time total)
- [Board windows](${SITE_ORIGIN}/board/7d): 7d / 30d / 90d / all-time cohorts
- [Hall of Signal](${SITE_ORIGIN}/hall): top operators
- [Compare](${SITE_ORIGIN}/compare): head-to-head operator comparison

## Concepts (definitions)
- [Verification](${SITE_ORIGIN}/wiki/verification)
- [Signal Drift](${SITE_ORIGIN}/wiki/signal-drift)
- [Three Degrees](${SITE_ORIGIN}/wiki/three-degrees)
- [Local Agent](${SITE_ORIGIN}/wiki/local-agent)
- [Measured Alongside](${SITE_ORIGIN}/wiki/measured-alongside)

## Tooling
- npm package: https://www.npmjs.com/package/sigrank
- MCP server + CLI source: https://github.com/SunrisesIllNeverSee/sigrank-mcp
`
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
```
Add `/llms.txt` to `app/sitemap.ts`'s `STATIC_ROUTES` (priority ~0.5) so it's discoverable.

> Optional `llms-full.txt`: same idea but inline the full wiki definitions + top-50 operators so an LLM can answer without crawling. Add `app/llms-full.txt/route.ts` later if you want maximum citation coverage.

**Acceptance:** `curl -s https://signalaf.com/llms.txt` returns text/plain with live links.

---

## Phase 4 — Per-page dynamic OG images (🟢 shareability upside)

Now that Phase 1 proved `next/og` works, give the high-share routes their own cards. This replaces the reverted Satori attempt — the fix is **no remote font fetch** (use system font) and **inline styles only**.

### 4.1 Operator card
`app/user/[codename]/opengraph-image.tsx` — fetch the same `getOperator(codename)` row and render rank + codename + yield + class tier into the 1200×630 layout (same skeleton as Phase 1.1, `runtime` can be `nodejs` if `getOperator` needs DB access; `edge` if it's a fetch).

### 4.2 Board card
`app/board/[window]/opengraph-image.tsx` — render the window label + top 3 operators.

> File-convention route images automatically override the root one for those segments. No `lib/seo.ts` change needed.

**Acceptance:** sharing `/user/<codename>` shows a card with that operator's rank/score; `/board/30d` shows the window's top 3.

---

## Phase 5 — npm + GitHub discoverability (`sigrank-mcp`)

### 5.1 `package.json` keywords
Add a `keywords` array (npm search ranking + registry AI surfaces):
```json
"keywords": [
  "mcp", "model-context-protocol", "ai-agents", "claude", "anthropic",
  "llm", "token-telemetry", "leaderboard", "cli", "tui",
  "yield-cascade", "sigrank", "agent-tools", "on-device"
],
```
Run `npm pkg fix` and `npm publish --dry-run` to confirm the manifest is clean. (Don't forget to bump version + publish on your normal release flow — this is metadata-only.)

### 5.2 GitHub topics
On both repos, add topics (Settings → Topics, or `gh`):
```
mcp, model-context-protocol, ai-agents, claude, llm, leaderboard, cli, tui, nextjs
```
Set the repo "Website" field to `https://signalaf.com` if not already.

### 5.3 README GEO polish (optional)
The README is already strong. One GEO-friendly add: a short **"What is SigRank?"** plain-English paragraph near the top (one self-contained sentence AI engines can lift verbatim), and an FAQ-style `## FAQ` section ("What does SigRank measure?", "Is my data private?"). Definitional, quotable phrasing = citation bait.

**Acceptance:** `npm view sigrank keywords` lists them post-publish; both repos show topics + website on GitHub.

---

## Phase 6 — Final verification & submission

Per repo:
```bash
npm run build          # sigrank-app: must pass
npx next lint          # sigrank-app
node test.mjs && node sign.test.mjs   # sigrank-mcp (unchanged, sanity)
```

Live checks after deploy:
- [ ] `https://signalaf.com/robots.txt` — references sitemap, allows crawlers
- [ ] `https://signalaf.com/sitemap.xml` — includes boards + operators + `/llms.txt`
- [ ] `https://signalaf.com/llms.txt` — text/plain, live links
- [ ] `https://signalaf.com/opengraph-image` — 1200×630 PNG
- [ ] Rich Results Test passes for: home, `/board/all`, a `/user/<codename>`, a `/wiki/*`
- [ ] opengraph.xyz preview renders for home + an operator profile
- [ ] **Google Search Console**: submit `sitemap.xml`, request indexing on `/board/all` + a couple wiki pages
- [ ] **Bing Webmaster Tools**: submit sitemap (Bing also feeds ChatGPT search)

---

## Suggested commit / PR breakdown

`sigrank-app` (branch `feat/seo-geo`), as separate commits for clean review:
1. `fix(seo): generate raster OG image via next/og, drop broken og.svg` (Phase 1)
2. `feat(seo): add JSON-LD structured data (Org, WebSite, ItemList, ProfilePage, Wiki)` (Phase 2)
3. `feat(geo): add /llms.txt route + sitemap entry` (Phase 3)
4. `feat(seo): per-page dynamic OG cards for operators + boards` (Phase 4)

`sigrank-mcp` (branch `feat/seo-geo`):
5. `chore(npm): add package keywords for discoverability` (Phase 5.1) + repo topics via GitHub UI

---

## Effort estimate
| Phase | Effort | Priority |
|-------|--------|----------|
| 1 — OG raster fix | ~30 min | 🔴 do first |
| 2 — JSON-LD | ~2–3 h | 🔴 highest ROI |
| 3 — llms.txt | ~30 min | 🟡 |
| 4 — dynamic OG cards | ~2 h | 🟢 nice-to-have |
| 5 — npm/GitHub | ~15 min | 🟡 quick win |

Recommended order: **1 → 5 → 2 → 3 → 4** (ship the bug fix + the trivial npm win immediately, then the big structured-data payload, then the polish).

---

## AEO measurement — aeo-platform (added 2026-07-15)

**What:** Open-source CLI that measures brand visibility across ChatGPT, Claude,
Gemini, and Perplexity via official APIs. Free alternative to Profound/Otterly.
Exports a JSON brand-context you paste into any AI for a 30-action improvement plan.

**Repo:** github.com/webappski/aeo-platform
**npm:** `npm install -g aeo-platform`
**License:** MIT, zero subscription. Cost per run: ~$0.20 (your own API keys).

### Setup

```bash
# 1. Install
npm install -g aeo-platform

# 2. Set API keys (minimum ONE; two recommended for cross-model check)
export OPENAI_API_KEY=sk-...        # ChatGPT column + extractor
export GEMINI_API_KEY=AIza...       # Gemini column + extractor
# Optional:
export ANTHROPIC_API_KEY=sk-ant-... # Claude column
export PERPLEXITY_API_KEY=pplx-...  # Perplexity column

# 3. Init config
aeo-platform init --yes --brand=SigRank --domain=signalaf.com --auto

# 4. Run the audit
aeo-platform run

# 5. Generate report (HTML + markdown in aeo-reports/)
aeo-platform report
```

### When to run

**Don't run immediately** — the pages with citation hooks (/methodology, /score,
/research/q1-2026) aren't indexed by Bing or Google yet. Running now will show
0% citation because the AI engines can't find the pages.

**Run after:**
1. Bing crawls (48h after IndexNow push — push fired 2026-07-06)
2. Google re-inspects (~2026-07-09, 18 URLs pushed to Indexing API)
3. Q1 report distributed (Show HN, Reddit, newsletters — drives third-party citations)

**Then run monthly** to track citation share over time.

### The 30 prompts

The prompt set in `Devins_Plans/growth/profound-rerun-prompts.md` can be fed
into aeo-platform. Or let `aeo-platform init --auto` auto-suggest queries based
on the brand + domain.

### What it reports

- Visibility index (0-100) per engine
- Citation rate (how often SigRank is cited as a source)
- Mention rate (how often SigRank is named in the answer)
- Per-engine breakdown (ChatGPT, Claude, Gemini, Perplexity)
- Competitor visibility comparison
- 30-action improvement plan (keyed to your specific gaps)

### Manual alternative (no tool, no API cost)

If you don't want to set up API keys:
1. Open incognito browser
2. Run 10-20 target queries in ChatGPT, Perplexity, Claude, Google
3. For each: record mentioned? cited? which competitor cited instead?
4. Log in a spreadsheet: date, engine, query, mentioned, cited, competitor
5. Run monthly, compare

### GSC AI Overviews (free, already wired)

```bash
cd ~/Desktop/SigRank
export GSC_SA_KEY=~/.config/sigrank/gsc-sa.json
export GSC_SITE="sc-domain:signalaf.com"
node scripts/gsc/gsc.mjs ai-overviews 28    # search appearance breakdown
node scripts/gsc/gsc.mjs queries 28          # top queries by impressions
```

**Baseline (2026-07-15, 28d):** 0 AI Overview impressions, 0 clicks.
Top query: "ranksignal" (8i, pos 20.8 — a brand misspelling, not discovery).
Total: 109 impressions, 0 clicks across 9 pages.

### Other AEO/GEO tools (if you want automated dashboards)

| Tool | Price | What |
|---|---|---|
| Profound | $$ | Dashboard, prompt tracking (tried — found confusing) |
| Otterly.AI | $$ | AI search visibility monitoring |
| Promptwatch | $$$ | Full loop: gap analysis → content briefs → tracking. 10 engines. |
| AthenaHQ | $$ | Brand visibility across AI engines |
| CapstonAI | $$ | AEO-focused, automated prompt testing |

**Recommendation:** Start with the manual method + GSC AI Overviews (free).
If you want automation, use aeo-platform ($0.20/run). Skip paid dashboards
until citation share is actually moving — then use Promptwatch for the full
gap-analysis → content → tracking loop.

---

## Phase 6 — Content Layer (34 pages, shipped 2026-07-08)

> Studied Mettle's SEO footprint (~33 content pages, well-structured) and closed the gap.
> All 34 pages shipped to `sigrank-app` main in commit `1f5cad0`. Sitemap updated in same commit.

### What shipped

| Category | Count | Routes | Purpose |
|----------|-------|--------|---------|
| Comparison (vs) | 5 | `/vs/ccusage`, `/vs/copilot`, `/vs/cursor`, `/vs/lmsys-arena`, `/vs/wakatime` | Head-to-head against known tools — captures "X alternative" and "X vs Y" search intent |
| Alternatives | 4 | `/alternatives/ai-benchmarking-tools`, `/alternatives/ai-coding-metrics`, `/alternatives/ccusage-alternatives`, `/alternatives/token-tracking-tools` | "Alternatives to X" search intent — top-of-funnel for comparison searches |
| Guides | 8 | `/guides/how-to-compare-ai-operators`, `/guides/how-to-improve-your-yield`, `/guides/how-to-measure-ai-coding-efficiency`, `/guides/how-to-read-your-cascade`, `/guides/how-to-reduce-token-waste`, `/guides/how-to-track-token-cascade`, `/how-to-benchmark-ai-coding-workflow`, `/how-to-benchmark-ai-coding-workflow` (alt) | Long-tail "how to" intent — educational, links back to tools and board |
| Metrics | 6 | `/metrics/cache-hit-rate`, `/metrics/compression-ratio`, `/metrics/leverage`, `/metrics/signal-to-noise-ratio`, `/metrics/velocity`, `/metrics/yield-cascade` | Definitional pages for each SigRank metric — GEO/AEO content for AI engines |
| Tools | 4 | `/tools/cascade-comparator`, `/tools/operator-class-checker`, `/tools/token-waste-calculator`, `/tools/yield-calculator` | Interactive tools — each with a page + component, captures "X calculator" intent |
| Topic hubs | 4 | `/ai-benchmarking`, `/ai-coding-metrics`, `/ai-operator-scoring`, `/operator-performance` | Pillar pages that cluster related content — hub-and-spoke SEO structure |
| Blog | 2 | `/blog/best-ai-coding-tools-2026`, `/blog/how-to-benchmark-ai-coding-workflow` | Listicle + deep dive — captures year-based and tutorial search intent |
| Science | 1 | `/science` (updated — added constitutional architecture section) | Credibility page — links to Conservation Law DOI + signomy.xyz/moses |

**Total: 34 new pages + 1 updated page, 12,039 lines added.**

### Rationale

Mettle's SEO was the reference. They had ~33 content pages covering features, guides, and comparison content. SigRank had the board, profile pages, compare, and wiki — but no content layer for search discovery. The 34 pages close that gap:

- **Comparison + alternatives** capture intent from people searching for existing tools (ccusage, Copilot, Cursor, etc.) — they find SigRank as the alternative
- **Guides** capture "how to" intent — educational content that links back to the board and tools
- **Metrics** are definitional pages that AI engines (ChatGPT, Perplexity, Claude) can cite when asked "what is yield cascade" or "what is cache hit rate" — direct GEO/AEO play
- **Tools** are interactive — each one gives the user a reason to stay on the page and try something, not just read
- **Topic hubs** cluster the content into a hub-and-spoke structure that search engines understand
- **Blog** captures time-based and listicle intent

### Sitemap

All 34 pages added to `app/sitemap.ts` in the same commit. Sitemap is dynamic — includes static routes + board windows + every ranked operator.

### What's next

- Monitor GSC for impression growth on the new pages (expect 2-4 weeks for indexing)
- Monitor AI engine citations for the metrics pages (ask ChatGPT/Perplexity "what is yield cascade in AI coding" — see if SigRank is cited)
- Consider adding more comparison pages as new tools enter the market
- Consider adding a `/blog` index page if the blog grows beyond 2 posts

---

## Phase 7 — Site Architecture Audit (Screaming Frog)

> Run a Screaming Frog crawl to visualize the site architecture, find orphan pages, broken links, and internal linking gaps. Free tier covers up to 500 URLs — signalaf.com has ~73, well within range.

### Setup

1. Download Screaming Frog SEO Spider (free, 500 URL limit): https://www.screamingfrog.co.uk/seo-spider/
2. Open it, enter `https://signalaf.com` as the URL
3. Click Start
4. Wait for the crawl to finish (73 URLs, under a minute)

### What to export

| Export | Where in Screaming Frog | What it gives us |
|--------|-------------------------|------------------|
| Force-directed crawl diagram | Visualisations → Force-Directed Crawl Diagram | Internal linking graph — shows clusters, hubs, orphan pages (disconnected nodes) |
| Tree graph site visualization | Visualisations → Tree Graph → Site Structure | URL/directory hierarchy — shows site architecture at a glance |
| All internal links | File → Export → All Internal Links (CSV) | Every internal link on every page — source URL, target URL, anchor text, status |
| All external links | File → Export → All External Links (CSV) | Every external link — useful for finding broken outbound links |
| Orphan pages | Reports → Orphan Pages (CSV) | Pages that exist but aren't linked from anywhere — SEO dead weight |
| Redirects | Reports → Redirects (CSV) | Redirect chains and loops — cleanup targets |

### What to look for

- **Orphan pages** — pages in the sitemap but not linked from any other page. Search engines may not find them. Fix by adding internal links.
- **Broken links (404s)** — internal or external links that return 404. Fix or remove.
- **Redirect chains** — A → B → C instead of A → C. Flatten them.
- **Deep pages** — pages that require 4+ clicks from the homepage. Consider adding direct links from higher-level pages.
- **Hub pages** — pages with many outbound internal links. These are your SEO hubs. Make sure they're linked from the homepage.
- **Isolated clusters** — groups of pages that link to each other but not to the rest of the site. Add cross-links.

### After the crawl

Drop the exported files (CSVs + diagram images) where Devin can read them. Devin will:
1. Generate a Mermaid diagram of the site structure from the internal links CSV
2. Cross-reference with the sitemap to find pages in the sitemap but not linked internally
3. Identify internal linking gaps (pages that should link to each other but don't)
4. Produce a fix list — which pages need internal links added, which redirects to flatten, which orphans to surface

### Screaming Frog features available (for reference)

| Feature | Use it for |
|---------|-----------|
| Find Broken Links | 404s and server errors — fix or remove |
| Audit Redirects | Redirect chains and loops — flatten |
| Analyse Page Titles & Meta Data | Missing/duplicate/too-long titles and descriptions |
| Discover Duplicate Content | Exact and partial duplicates — consolidate or canonicalize |
| Extract Data with XPath | Pull custom data from HTML (social tags, prices, etc.) |
| Review Robots & Directives | noindex/nofollow/canonical issues |
| Generate XML Sitemaps | Compare generated sitemap vs our `app/sitemap.ts` |
| Integrate with GA, GSC & PSI | Pull performance data per URL (needs API keys) |
| Crawl JavaScript Websites | Render JS — important for Next.js SSR/SSG pages |
| Visualise Site Architecture | The crawl diagram + tree graph we're exporting |
| Schedule Audits | Recurring crawls — set monthly to track improvements |
| Compare Crawls & Staging | Track SEO issues over time — run before/after changes |
