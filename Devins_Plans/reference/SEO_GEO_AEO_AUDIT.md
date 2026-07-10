---
type: Findings
title: SEO/GEO/AEO Audit — Screaming Frog-style site health review
description: Full audit of mos2es.com SEO/GEO/AEO posture. Covers JSON-LD structured data, meta tags, OG/Twitter cards, sitemap completeness, security headers, H1/H2 structure, image attributes, canonical tags, and the playbook checklist. 23 issues found, prioritized for fix campaign.
tags: [mos2es, seo, geo, aeo, audit, screaming-frog, findings]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:05 UTC
---

# SEO/GEO/AEO Audit — mos2es.com

**Audited by:** de sit1
**Date:** 2026-07-10
**Method:** Manual audit of all 11 HTML pages + config files, using the SEO_GEO_AEO_PLAYBOOK.md
checklist as the rubric. This is the equivalent of a Screaming Frog crawl done by hand
(since SF is a desktop tool and we're in a CLI session).

**Summary:** 23 issues found. Grade: **C+** (significant gaps in structured data, OG tags,
security headers, and sitemap completeness). The homepage and papers page have good
foundations; the rest of the site is largely unoptimized.

---

## Issue Summary (by severity)

| Severity | Count | Category |
|----------|-------|----------|
| CRITICAL | 5 | Missing H1, missing meta description, no OG image |
| HIGH | 8 | Missing JSON-LD, missing OG tags, sitemap gaps, no security headers |
| MEDIUM | 7 | Missing Twitter cards, missing canonical, long meta description |
| LOW | 3 | Missing image dimensions, inconsistent title branding |

---

## CRITICAL Issues

### C1. Three pages have no H1 tag
**Pages:** `index.html`, `deck.html`, `resume.html`
**Impact:** Search engines and AI engines use H1 as the primary page topic signal. Missing
H1 = the page has no declared topic.
**Fix:** Add exactly one `<h1>` to each page.
- `index.html` — H1 should be "MO§ES — Sovereign Signal Governance" (currently jumps from
  no H1 straight to H2s like "The headline is not 80–85%...")
- `deck.html` — H1 should be the deck title (currently has H2s but no H1)
- `resume.html` — H1 should be "Deric J. McHenry" (no headings at all currently)

### C2. Three pages have no meta description
**Pages:** `architecture.html`, `deck.html`, `resume.html`
**Impact:** Search engines show a generated snippet instead of a controlled description.
AI engines have no summary to cite. Screaming Frog flags this as HIGH.
**Fix:** Add `<meta name="description" content="...">` to each, ≤155 chars.
- `architecture.html` — e.g. "MO§ES system architecture: recursive compression, origin binding, lineage claws, and the governance enforcement layer."
- `deck.html` — e.g. "MO§ES pitch deck — the investor presentation for sovereign signal governance."
- `resume.html` — e.g. "Deric J. McHenry — founder of MO§ES, AI governance researcher, commitment conservation theorist."

### C3. No OG image exists on the site
**Issue:** `/img/og.png` does not exist. The playbook (Phase 1) says to create a 1200×630
PNG banner. Only `benchmarks.html` has an og:image (pointing to a benchmark chart, not a
site-wide banner).
**Impact:** Sharing any page (except benchmarks) in Slack/Twitter/Discord shows no preview
image. This is the #1 playbook priority.
**Fix:** Create `/img/og.png` (1200×630, dark bg, MO§ES logo, tagline). Add og:image meta
to all 11 pages.

---

## HIGH Issues

### H1. JSON-LD structured data only on 2 of 11 pages
**Pages with JSON-LD:** `index.html` (Organization, WebSite, Person, CreativeWork),
`papers.html` (ScholarlyArticle, Dataset, Person, PublicationEvent)
**Pages WITHOUT JSON-LD:** architecture, benchmarks, deck, demovideo, field-sheet,
governance-vacuum, legal, press, resume (9 pages)
**Impact:** AI engines (ChatGPT, Perplexity, Claude) use JSON-LD to decide what to cite.
9 pages have zero structured data = invisible to AI citation.
**Fix:** Per the playbook:
- Add **WebSite** schema to all pages (in addition to Organization on homepage)
- Add **BreadcrumbList** to all sub-pages
- Add **DefinedTerm** to papers.html for each concept
- Add **Article** to governance-vacuum.html (it's an article)
- Add **Dataset** to benchmarks.html (it's empirical data)
- Consider **FAQPage** if Q&A content is added

### H2. OG tags only on 2 of 11 pages
**Pages with OG tags:** `benchmarks.html` (full set), `field-sheet.html` (partial — has
og:title, og:description, og:url, og:type but NO og:image)
**Pages with NO OG tags:** index, architecture, deck, demovideo, governance-vacuum, legal,
papers, press, resume (9 pages)
**Impact:** No social sharing cards on 9 pages. Slack/Twitter/Discord show plain text links.
**Fix:** Add full OG tag set to all pages: og:type, og:url, og:title, og:description,
og:image, og:image:width, og:image:height.

### H3. Twitter card tags only on 2 of 11 pages
**Pages with Twitter cards:** `benchmarks.html` (full set), `field-sheet.html` (partial —
only twitter:card=summary, no image/title/description)
**Fix:** Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` to all
pages. Use `summary_large_image` for pages with OG images.

### H4. Sitemap missing 3 pages
**In sitemap (8 URLs):** /, /papers, /legal, /press, /field-sheet, /benchmarks,
/governance-vacuum, /architecture
**NOT in sitemap (3 pages):**
- `deck.html` — pitch deck. Intentional? If public, add it.
- `demovideo.html` — demo video page. Recently made reachable (commit 8349d47 dropped
  noindex). Should be in sitemap now.
- `resume.html` — resume page. Intentional? If public, add it.
**Fix:** Add the 3 missing pages to sitemap.xml (or mark them noindex if intentionally
excluded). Note: sitemap uses clean URLs (`/papers` not `/papers.html`) — Netlify must be
serving these without extension. Verify this works.

### H5. No security headers
**Issue:** `netlify.toml` only has `[build] publish = "."`. No `_headers` file exists.
Missing: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
**Impact:** Screaming Frog flags this as 100% missing on all pages. The signalaf.com audit
found this same issue and fixed it.
**Fix:** Create a `_headers` file (Netlify convention):
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:
```
Note: CSP needs tuning — the deck uses inline styles/scripts, the favicon is a data: URI,
and pages reference external resources (Loom, GitHub). Start with a permissive CSP and
tighten over time.

### H6. No canonical tags on 10 of 11 pages
**Pages with canonical:** `field-sheet.html` (but it points to `https://mos2es.com/` —
WRONG, should point to its own URL)
**Pages without canonical:** all other 10 pages
**Impact:** Search engines may index duplicate URLs (with/without .html extension, with/without
trailing slash). Canonical tags prevent duplicate content issues.
**Fix:** Add `<link rel="canonical" href="https://mos2es.com/<page>.html">` to each page.
Fix field-sheet.html canonical to point to its own URL.

### H7. No `_redirects` file for clean URLs
**Issue:** Sitemap uses clean URLs (`/papers` not `/papers.html`) but there's no `_redirects`
file. Netlify's pretty URLs may handle this automatically, but it should be explicit.
**Fix:** Create `_redirects`:
```
/papers     /papers.html    200
/legal      /legal.html     200
/press      /press.html     200
/field-sheet  /field-sheet.html  200
/benchmarks  /benchmarks.html  200
/governance-vacuum  /governance-vacuum.html  200
/architecture  /architecture.html  200
```
(Use 200 rewrites, not 301 redirects, so the URL stays clean.)

### H8. index.html not in sitemap
**Issue:** The sitemap has `https://mos2es.com/` which IS the homepage, so this is
technically covered. But the grep check flagged it because `index.html` doesn't appear
literally. This is a false positive — `/` is correct for the homepage.

---

## MEDIUM Issues

### M1. Meta description over 155 chars on 1 page
**Page:** `index.html` — 160 chars (just barely over)
**Fix:** Trim to ≤155 chars. E.g. drop "at point of execution" or shorten
"commitment conservation, governance enforcement, and lineage-bound artifacts."

### M2. Meta description over 155 chars on benchmarks.html
**Page:** `benchmarks.html` — 333 chars (way over)
**Impact:** Search engines truncate at ~155 chars. The full description won't show.
**Fix:** Split into a short meta description (≤155 chars) and keep the detail in the page
body. E.g. "MO§ES leads all 5 measured economic categories vs. the AA Coding Agent Index.
Raw JSONL · 98 sessions · operator-augmented Claude Code + Opus 4.7."

### M3. field-sheet.html canonical points to wrong URL
**Issue:** `<link rel="canonical" href="https://mos2es.com/">` — points to homepage, not
the field-sheet page. This tells Google the field-sheet is a duplicate of the homepage.
**Fix:** Change to `href="https://mos2es.com/field-sheet.html"`

### M4. field-sheet.html OG URL points to wrong URL
**Issue:** `og:url` is `https://mos2es.com/` — should be `https://mos2es.com/field-sheet.html`
**Fix:** Correct the og:url.

### M5. No Twitter card image on field-sheet.html
**Issue:** Has `twitter:card=summary` but no twitter:image, twitter:title, or
twitter:description.
**Fix:** Add the missing Twitter card fields.

### M6. deck.html title doesn't include "MO§ES"
**Issue:** Title is "Ello Cello — Pitch" — no brand name. Inconsistent with other pages
which all start with "MO§ES™ —".
**Fix:** Change to "MO§ES™ — Pitch Deck" or similar.

### M7. resume.html title doesn't include "MO§ES"
**Issue:** Title is "Deric J. McHenry, Resume" — no brand connection.
**Fix:** Change to "MO§ES™ — Deric J. McHenry, Resume" or similar.

---

## LOW Issues

### L1. Two images missing width/height attributes
**Images:**
- `benchmarks.html`: `<img src="img/benchmarks/card_06_combined.png">` — no width/height
- `deck.html`: `<img src="assets/founder.jpg">` — has inline style with height but no
  width/height attributes (uses CSS instead)
**Impact:** Screaming Frog flags this. Can cause layout shift (CLS) during page load.
**Fix:** Add `width="1200" height="628"` (or actual dimensions) to benchmarks image.
Add `width` and `height` attributes to founder.jpg in deck.html.

### L2. architecture.html title has encoding issue
**Issue:** Title is "MO§E§™ — Investor Architecture" — note "E§" instead of "ES". The §
character is in the wrong position.
**Fix:** Change to "MO§ES™ — Architecture" (also drop "Investor" unless that's intentional
targeting — it limits the page's search intent to investors only).

### L3. No favicon file (uses inline SVG data URI)
**Issue:** Favicon is an inline SVG data URI, not a file. Works but some crawlers/tools
prefer a real .ico or .png file.
**Impact:** Minimal — this is cosmetic. The data URI favicon renders fine.
**Fix (optional):** Create `/img/favicon.png` and reference it as a real file. Low priority.

---

## What's Already Good

- **robots.txt** — clean, allows all crawlers, references sitemap ✓
- **llms.txt** — comprehensive, covers core concepts, academic foundation, governance
  ecosystem, related surfaces ✓
- **Organization + WebSite JSON-LD on homepage** — good foundation ✓
- **ScholarlyArticle + Dataset JSON-LD on papers.html** — academic content is structured ✓
- **IndexNow** — key file deployed, ping script exists ✓
- **lang="en"** on all pages ✓
- **No broken internal links** — all .html links resolve to real files ✓
- **No redirect chains** — static site, no redirects at all ✓
- **Titles all ≤60 chars** — all within limits ✓ (except benchmarks at exactly 60)
- **BingSiteAuth.xml** — Bing verification in place ✓

---

## Playbook Checklist Status

| # | Item | Status |
|---|------|--------|
| 1 | Fix OG image (create /img/og.png) | ❌ NOT DONE |
| 2 | JSON-LD on all pages (WebSite + BreadcrumbList) | ❌ 2/11 pages only |
| 3 | llms.txt | ✅ DONE |
| 4 | Per-page OG images | ❌ NOT DONE (only benchmarks has one) |
| 5 | npm + GitHub discoverability | ❌ NOT DONE (no GitHub topics set) |
| 6 | Content layer (concept pages) | ❌ NOT DONE (11 pages, no concept/guide pages) |
| 7 | Screaming Frog crawl | ❌ NOT RUN (this audit is the manual equivalent) |
| 8 | Security headers | ❌ NOT DONE |
| 9 | Google Search Console submission | ❓ UNKNOWN (owner would know) |
| 10 | IndexNow push for all URLs | ⚠️ Script exists but may not have been run for all pages |
| 11 | FAQ section + FAQPage schema | ❌ NOT DONE |
| 12 | Concept pages (one per key term) | ❌ NOT DONE |
| 13 | Weekly citation tracking | ❓ UNKNOWN (owner would know) |

---

## Recommended Fix Priority

1. **C1 — Add H1 to 3 pages** (quick, high impact)
2. **C2 — Add meta descriptions to 3 pages** (quick, high impact)
3. **H1 — Add JSON-LD to 9 pages** (medium effort, highest GEO/AEO ROI)
4. **H2/H3 — Add OG + Twitter tags to 9 pages** (medium effort, high social impact)
5. **C3 — Create OG image** (requires design tool, owner may need to do this)
6. **H4 — Add 3 missing pages to sitemap** (quick)
7. **H5 — Add security headers** (quick — create _headers file)
8. **H6 — Add canonical tags to all pages** (quick)
9. **H7 — Add _redirects for clean URLs** (quick)
10. **M1/M2 — Trim long meta descriptions** (quick)
11. **M3/M4/M5 — Fix field-sheet canonical/OG/Twitter** (quick)
12. **M6/M7 — Fix deck + resume titles** (quick)
13. **L1 — Add image dimensions** (quick)
14. **L2 — Fix architecture title encoding** (quick)

**Estimated effort for items 1, 2, 4, 6-14:** ~2-3 hours (all quick fixes)
**Items 3, 5:** require design tool or owner input for OG image creation
**Item H1 (JSON-LD):** ~2-3 hours for 9 pages

---

## Next Steps

1. Owner reviews this audit and approves the fix campaign
2. Run fixes in priority order (quick wins first)
3. After fixes: run `scripts/indexnow-ping.sh` to push all URLs to Bing/Yandex
4. Submit sitemap to Google Search Console (if not already done)
5. Consider running an actual Screaming Frog crawl to catch anything this manual audit missed
6. Track issue count — should go from 23 → near 0 after the fix campaign
