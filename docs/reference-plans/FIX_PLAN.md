---
type: Plan
title: signalaf.com Fix Plan — Screaming Frog Audit 2026-07-09
description: Prioritized fix plan for all issues found in the Screaming Frog crawl. Covers sitemap orphans, cross-linking, security headers, meta descriptions, page titles, content gaps, and H1/H2 issues.
tags: [sigrank, seo, site-audit, fix-plan, screaming-frog, signalaf]
timestamp: 2026-07-09T06:35:00Z
last_touched: 2026-07-09 06:35 UTC
---

# signalaf.com Fix Plan

> Source audit: `SITE_AUDIT_signalaf_2026-07-09.md` (same folder)
> All fixes ship to `sigrank-app` main → Vercel auto-builds.

---

## Already shipped

| Fix | What | Commit | Status |
|-----|------|--------|--------|
| #1 | `/submit` 404 — removed link from `/methodology` + removed from sitemap | `4cac367` | DONE |
| #2 | `/leaderboard` → 307 → `/board/all` (46 redirects) — changed all links to `/board/all` | `4cac367` | DONE |
| Phase A | Internal linking — footer Topics column + topic hub RELATED sections + cross-links on 27 SEO pages + core pages link to hubs (31 files, 511 insertions) | `a96b251` | DONE |
| Phase B | Security headers — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP in next.config.ts | `a64cd27` | DONE |
| Phase C | Meta descriptions — all 37 pages shortened to ≤155 chars (were 162-252) | `a64cd27` | DONE |
| Phase D | Page titles — 11 long titles (>60 chars) shortened to 30-60 chars | `a64cd27` | DONE |
| Phase E | Low content pages — added intro content to /board, /hall, /upgrade, /score/paste | `a64cd27` | DONE |
| Phase F | H1/H2 fixes — dynamic board H1, unique metrics H2s, missing H2 on /compare | `a64cd27` | DONE |
| Phase G | Image size attributes — 7 images across 3 components got width/height | `a64cd27` | DONE |
| Post-audit | Sitemap fix: /leaderboard → /board/all + llms.txt expanded with 30+ SEO content pages | `255cb2d` | DONE |
| Post-audit | GSC: sitemap re-submitted + 42 URLs pushed to Indexing API | — | DONE |
| Post-audit | IndexNow: key file deployed + 42 URLs pushed to Bing/Yandex/Naver/Seznam | `ba3bea2` | DONE |
| Phase H | Wiki meta (8 pages) + duplicate title/H1 (blog vs guide, wiki) + cross-page H2s (5 fixes) + low content (/hall, /board) | `b527f5d` | DONE |
| Post-audit | GSC: sitemap re-submitted + 22 URLs pushed to Indexing API + IndexNow | — | DONE |

---

## Phase A — Internal Linking (fixes #3 + #4)

> 9 pages are in the sitemap but have ZERO internal links pointing to them.
> The 34 SEO content pages all link TO the board but nothing links TO them except the nav/footer.
> This phase wires everything together — topic hubs become real hubs, content pages get cross-linked.

### A1 — Add topic hubs to the footer

**Problem:** 4 topic hubs (`/ai-benchmarking`, `/ai-coding-metrics`, `/ai-operator-scoring`, `/operator-performance`) + `/cascade-analysis` are in the sitemap but not linked from any page on the site.

**Fix:** Add a "Topics" column to the footer with all 5 topic hubs.

**File:** `components/ui/Footer.tsx`

**Change:** Add a 6th column:
```
{
  heading: 'Topics',
  links: [
    { href: '/ai-benchmarking', label: 'AI Benchmarking' },
    { href: '/ai-coding-metrics', label: 'AI Coding Metrics' },
    { href: '/ai-operator-scoring', label: 'AI Operator Scoring' },
    { href: '/operator-performance', label: 'Operator Performance' },
    { href: '/cascade-analysis', label: 'Cascade Analysis' },
  ],
},
```

**Also add to "Explore" column:**
- `/alternatives/ai-benchmarking-tools`
- `/alternatives/token-tracking-tools`
- `/blog/how-to-benchmark-ai-coding-workflow`
- `/guides/how-to-benchmark-ai-coding-workflow`

**Effort:** 10 min

### A2 — Verify topic hubs link to their related content

**Problem:** Topic hubs have a `RELATED` array but some hubs link to 0 pages. Need to verify each hub links to its content cluster.

**Files to check:**
- `app/ai-benchmarking/page.tsx` — has RELATED (4 links) ✓
- `app/ai-coding-metrics/page.tsx` — has RELATED (check count)
- `app/ai-operator-scoring/page.tsx` — has RELATED (check count)
- `app/operator-performance/page.tsx` — has RELATED (check count)
- `app/cascade-analysis/page.tsx` — NO RELATED found — needs links added

**Fix:** Ensure each topic hub links to:
- Its related guides
- Its related metrics
- Its related tools
- Its related vs/alternatives pages
- The board

**Effort:** 30 min

### A3 — Add "Related" sections to SEO content pages

**Problem:** The 34 SEO content pages (guides, metrics, tools, vs, alternatives, blog) don't link to each other. They're one-way equity pipes to the board.

**Fix:** Add a "Related" section to the bottom of each SEO content page linking to 2-3 related pages:

| Page | Should link to |
|------|---------------|
| `/metrics/yield-cascade` | `/tools/yield-calculator`, `/guides/how-to-improve-your-yield`, `/metrics/cache-hit-rate` |
| `/metrics/cache-hit-rate` | `/metrics/leverage`, `/guides/how-to-reduce-token-waste`, `/tools/token-waste-calculator` |
| `/metrics/compression-ratio` | `/metrics/yield-cascade`, `/guides/how-to-measure-ai-coding-efficiency`, `/tools/yield-calculator` |
| `/metrics/leverage` | `/metrics/cache-hit-rate`, `/guides/how-to-improve-your-yield`, `/tools/yield-calculator` |
| `/metrics/velocity` | `/metrics/yield-cascade`, `/guides/how-to-measure-ai-coding-efficiency` |
| `/metrics/signal-to-noise-ratio` | `/science`, `/metrics/yield-cascade`, `/guides/how-to-read-your-cascade` |
| `/guides/how-to-read-your-cascade` | `/metrics/yield-cascade`, `/tools/cascade-comparator`, `/guides/how-to-track-token-cascade` |
| `/guides/how-to-measure-ai-coding-efficiency` | `/metrics/yield-cascade`, `/tools/yield-calculator`, `/methodology` |
| `/guides/how-to-reduce-token-waste` | `/tools/token-waste-calculator`, `/metrics/cache-hit-rate`, `/guides/how-to-improve-your-yield` |
| `/guides/how-to-improve-your-yield` | `/tools/yield-calculator`, `/metrics/yield-cascade`, `/guides/how-to-read-your-cascade` |
| `/guides/how-to-track-token-cascade` | `/wiki/local-agent`, `/metrics/yield-cascade`, `/guides/how-to-read-your-cascade` |
| `/guides/how-to-benchmark-ai-coding-workflow` | `/ai-benchmarking`, `/vs/lmsys-arena`, `/methodology` |
| `/tools/yield-calculator` | `/metrics/yield-cascade`, `/tools/operator-class-checker`, `/guides/how-to-improve-your-yield` |
| `/tools/operator-class-checker` | `/tools/yield-calculator`, `/methodology`, `/guides/how-to-read-your-cascade` |
| `/tools/cascade-comparator` | `/compare`, `/tools/yield-calculator`, `/guides/how-to-read-your-cascade` |
| `/tools/token-waste-calculator` | `/metrics/cache-hit-rate`, `/guides/how-to-reduce-token-waste`, `/tools/yield-calculator` |
| `/vs/ccusage` | `/alternatives/ccusage-alternatives`, `/tools/yield-calculator`, `/wiki/local-agent` |
| `/vs/cursor` | `/alternatives/ai-coding-metrics`, `/tools/yield-calculator`, `/guides/how-to-measure-ai-coding-efficiency` |
| `/vs/wakatime` | `/alternatives/ai-coding-metrics`, `/metrics/velocity`, `/guides/how-to-measure-ai-coding-efficiency` |
| `/vs/lmsys-arena` | `/ai-benchmarking`, `/alternatives/ai-benchmarking-tools`, `/methodology` |
| `/alternatives/ai-coding-metrics` | `/ai-coding-metrics`, `/vs/ccusage`, `/vs/wakatime` |
| `/alternatives/ccusage-alternatives` | `/vs/ccusage`, `/wiki/local-agent`, `/tools/yield-calculator` |
| `/alternatives/ai-benchmarking-tools` | `/ai-benchmarking`, `/vs/lmsys-arena`, `/methodology` |
| `/alternatives/token-tracking-tools` | `/token-telemetry`, `/vs/ccusage`, `/wiki/local-agent` |
| `/blog/best-ai-coding-tools-2026` | `/alternatives/ai-coding-metrics`, `/ai-coding-metrics`, `/tools/yield-calculator` |
| `/blog/how-to-benchmark-ai-coding-workflow` | `/guides/how-to-benchmark-ai-coding-workflow`, `/ai-benchmarking`, `/methodology` |
| `/token-telemetry` | `/metrics/yield-cascade`, `/guides/how-to-track-token-cascade`, `/wiki/local-agent` |

**Approach:** Create a reusable `<RelatedLinks>` component that takes an array of `{href, title, desc}` and renders a consistent section. Add it to each SEO page.

**Effort:** 1.5 hours (component + 27 pages)

### A4 — Add cross-links from core pages to topic hubs

**Problem:** The homepage, /about, /science, and /methodology don't link to the topic hubs.

**Fix:**
- Homepage: add a "Learn more" section linking to the 5 topic hubs
- `/about`: link to `/ai-operator-scoring` and `/operator-performance`
- `/science`: link to `/ai-benchmarking` and `/cascade-analysis`
- `/methodology`: link to `/ai-coding-metrics` and `/ai-operator-scoring`

**Effort:** 20 min

---

## Phase B — Security Headers (fix #5)

**Problem:** 4 security headers missing on 100% of pages.

**Fix:** Add to `next.config.js` via the `headers()` function:

```js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.posthog.com https://*.supabase.co; frame-ancestors 'self'" },
]
```

**Note:** CSP needs to allow Vercel analytics scripts, PostHog, and Supabase. The policy above is a starting point — verify it doesn't break anything in dev.

**File:** `next.config.js` (or `next.config.ts`)

**Effort:** 15 min

---

## Phase C — Meta Descriptions (fix #6)

**Problem:** 34 pages have meta descriptions over 155 characters. Google truncates at ~155 chars / 985 pixels.

**Fix:** Shorten each meta description to ≤155 characters. The 34 pages are the SEO content pages (guides, metrics, tools, vs, alternatives, blog) + a few core pages.

**Approach:** Go through each page's `metadata` export and trim the description. Keep the core message, cut the detail.

**Effort:** 1 hour

---

## Phase D — Page Titles (fix #7)

**Problem:**
- 8 pages have titles over 60 characters (Google truncates)
- 8 pages have titles below 30 characters (wasted space)

**Fix:** Adjust titles to 30-60 characters each. Add keywords/USPs to short titles, trim long ones.

**Effort:** 30 min

---

## Phase E — Low Content Pages (fix #8)

**Problem:** 5 pages under 200 words. Likely:
- `/board/all` (69 words)
- `/board/30d` (69 words)
- `/hall` (93 words)
- `/upgrade` (95 words)
- `/score/paste` (102 words)

**Fix:** Add descriptive content to each:
- Board pages: add an intro paragraph explaining what the leaderboard shows, how to read it, and how to get listed
- `/hall`: add context about what the Hall of Signal is and what qualifies
- `/upgrade`: add more detail about what supporters get
- `/score/paste`: add more context about the paste flow

**Note:** Board pages are intentionally minimal (the data is the content). Adding 100-150 words of intro text is enough — don't bloat them.

**Effort:** 45 min

---

## Phase F — H1/H2 Issues (fix #9)

**Problem:**
- 5 pages have duplicate H1s (likely board pages: "Burners, Builders & 10×ers")
- 18 pages have duplicate H2s (likely metrics pages: "The formula" / "What it measures")
- 6 pages have missing H2s
- 1 page has H1 not as first heading (non-sequential)
- 1 page has H2 not following H1 (non-sequential)
- 1 page has multiple H1s

**Fix:**
- Board pages: give each board window a unique H1 (e.g., "All-Time Leaderboard" vs "30-Day Leaderboard")
- Metrics pages: make H2s unique per page (e.g., "The Yield Formula" vs "The Cache Hit Rate Formula")
- Missing H2s: add section headings to the 6 pages that lack them
- Non-sequential: fix heading order on the 2 pages

**Effort:** 45 min

---

## Phase G — Images Missing Size Attributes (fix #10)

**Problem:** 3 images lack width/height attributes — causes layout shift (CLS).

**Fix:** Find the 3 images and add `width` and `height` props.

**Effort:** 10 min

---

## Execution order

| Phase | What | Effort | Priority |
|-------|------|--------|----------|
| A | Internal linking (sitemap orphans + cross-links) | ~2.5 hours | HIGH — this is the SEO strategy completion |
| B | Security headers | 15 min | HIGH — quick win, 100% of pages |
| C | Meta descriptions | 1 hour | MEDIUM |
| D | Page titles | 30 min | MEDIUM |
| E | Low content pages | 45 min | MEDIUM |
| F | H1/H2 issues | 45 min | LOW |
| G | Image size attributes | 10 min | LOW |

**Total estimated effort:** ~5.5 hours

**Recommended order:** A → B → D → C → E → F → G

Phase A first because it completes the SEO strategy (the 34 pages were built but never wired together). Phase B second because it's 15 minutes for 100% coverage. Then the meta/title/content/heading fixes in priority order.
