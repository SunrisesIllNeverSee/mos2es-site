---
type: Findings
title: SEO/GEO/AEO Audit — Screaming Frog crawl + manual review
description: Full audit of mos2es.com SEO/GEO/AEO posture. Cross-referenced Screaming Frog crawl (run 1, 2026-07-10) with manual HTML audit. 28 issues found across 16 crawled HTML pages + 7 images/PDFs/JS. Grade C-. Prioritized fix campaign included.
tags: [mos2es, seo, geo, aeo, audit, screaming-frog, findings]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:20 UTC
---

# SEO/GEO/AEO Audit — mos2es.com

**Audited by:** de sit1
**Date:** 2026-07-10
**Method:** Screaming Frog crawl (run 1, 2026-07-10 04:11 UTC, 23 seconds, 44 URLs
encountered) cross-referenced with manual HTML audit of all source files.

**Crawl stats:** 44 total URLs (23 internal, 21 external) · 16 HTML pages · 4 images ·
2 PDFs · 1 JS · 0 broken internal links · 1 external 4xx · 1 external timeout · 1 external
redirect · 23 seconds crawl time.

**Summary:** 28 issues found. Grade: **C-**. The SF crawl revealed worse problems than the
manual audit alone — duplicate content from .html/no-.html URL pairs, resume.html is an
orphan that wasn't even crawled, JSON-LD structured data detected as 0/16 pages by SF,
field-sheet is non-indexable due to wrong canonical, and a broken external link to Zenodo.

---

## Issue Summary (by severity)

| Severity | Count | Category |
|----------|-------|----------|
| CRITICAL | 7 | Duplicate content, non-indexable page, orphan page, missing H1, missing meta desc, no OG image |
| HIGH | 10 | 0 JSON-LD detected by SF, missing OG/Twitter tags, sitemap gaps, no security headers, no canonical, broken external links, no internal outlinks on 8 pages |
| MEDIUM | 7 | Duplicate titles, long meta desc, wrong canonical, short titles, low content pages, large image |
| LOW | 4 | Missing image dimensions, URL underscores, readability, duplicate H1 |

---

## CRITICAL Issues

### C1. 6 exact duplicate content pages (poster .html vs no-.html)
**Found by:** Screaming Frog — "Content: Exact Duplicates" (HIGH priority, 6 pages, 33.3%)
**Pages:**
- `img/benchmarks/poster` = `img/benchmarks/poster.html` (identical hash: fe7d4120...)
- `img/benchmarks/poster_honest` = `img/benchmarks/poster_honest.html` (identical hash: a3012662...)
- `img/benchmarks/poster_honest_portrait` = `img/benchmarks/poster_honest_portrait.html` (identical hash: 1ac5b38f...)
**Impact:** Google sees 6 pages that are byte-identical pairs. This splits PageRank and
causes ranking unpredictability. SF rates this HIGH.
**Fix:** Add canonical tags to the .html versions pointing to the clean URLs (or vice
versa). Or add `_redirects` rules to 301 redirect .html → clean URL for these pages. Or
block the .html versions with noindex.

### C2. field-sheet is NON-INDEXABLE (wrong canonical)
**Found by:** Screaming Frog — "Canonicals: Canonicalised" (HIGH priority)
**Issue:** `field-sheet.html` has `<link rel="canonical" href="https://mos2es.com/">` —
it tells Google "this page is a duplicate of the homepage, don't index it." SF marks it
Non-Indexable / Canonicalised.
**Impact:** The field-sheet page is being de-indexed by Google. It has good content
(1,613 words, 380 sentences) but Google won't show it in search results.
**Fix:** Change canonical to `href="https://mos2es.com/field-sheet"` (self-referencing).

### C3. resume.html is an orphan page — NOT CRAWLED
**Found by:** Screaming Frog — resume.html does not appear in the crawl at all
**Issue:** SF crawled 16 HTML pages but resume.html is not among them. It's not linked
from any other page, not in the sitemap, and not reachable by the crawler.
**Impact:** Search engines cannot discover resume.html. It's invisible to Google.
**Fix:** Either link to it from the nav/footer/index page, OR add it to the sitemap, OR
decide it's intentionally private and add noindex. Currently it's in limbo — public if you
know the URL, but undiscoverable.

### C4. Three pages have no H1 tag
**Found by:** Screaming Frog — "H1: Missing" (6 pages, 37.5%) + manual audit
**Pages:** `index.html`, `deck.html`, `resume.html` (not crawled but confirmed by manual audit)
**Also:** The 3 poster pages have no H1 (they're image posters, may be intentional)
**Fix:** Add exactly one `<h1>` to index, deck, resume. Poster pages can be left as-is
if they're not meant to rank.

### C5. Eight pages have no meta description
**Found by:** Screaming Frog — "Meta Description: Missing" (8 pages, 50%)
**Pages:** architecture, deck, resume (not crawled), + all 5 poster pages
**Fix:** Add meta descriptions to architecture, deck, resume. Poster pages can be left
as-is (they're visual resources, not search targets).

### C6. No OG image exists on the site
**Found by:** Manual audit (SF doesn't check OG tags)
**Issue:** `/img/og.png` does not exist. Only benchmarks.html has an og:image (a chart,
not a site banner).
**Fix:** Create 1200×630 PNG banner. Add og:image to all pages.

### C7. Screaming Frog detected 0 pages with structured data — FALSE POSITIVE
**Found by:** Screaming Frog — "Contains Structured Data: 0", "JSON-LD URLs: 0"
**Issue:** My manual audit found JSON-LD on index.html (3 blocks: Organization, WebSite,
CreativeWork) and papers.html (3 blocks: ScholarlyArticle, 2× Dataset). I validated all 6
blocks with Python's json parser — all are valid JSON.
**Root cause:** SF's structured data detection was likely not enabled in the crawl
configuration (Config > Spider > Advanced > Structured Data). This is a crawl setup issue,
not a site issue.
**Action:** Re-run SF with structured data detection enabled. Still validate at
https://validator.schema.org and https://search.google.com/test/rich-results to be sure
Google can parse them.
**Status:** Downgraded from CRITICAL to informational. The JSON-LD is valid; SF just
didn't look for it.

---

## HIGH Issues

### H1. JSON-LD structured data on only 2 of 16 pages (and SF says 0)
**Pages with JSON-LD (manual):** index.html, papers.html
**Pages WITHOUT:** architecture, benchmarks, deck, demovideo, field-sheet,
governance-vacuum, legal, press, resume + 5 poster pages (14 pages)
**Fix:** Add WebSite schema to all pages, BreadcrumbList to sub-pages, Article to
governance-vacuum, Dataset to benchmarks. But FIRST validate existing JSON-LD (see C7).

### H2. OG tags only on 2 of 11 main pages
**Pages with OG:** benchmarks.html (full), field-sheet.html (partial, wrong og:url)
**Fix:** Add full OG tag set to all pages.

### H3. Twitter card tags only on 2 of 11 main pages
**Fix:** Add twitter:card, twitter:title, twitter:description, twitter:image to all pages.

### H4. Sitemap missing 3 pages
**NOT in sitemap:** deck.html, demovideo.html, resume.html
**Note:** SF didn't compare sitemap vs crawled URLs (orphan_pages.csv is empty because
the sitemap wasn't uploaded to SF). But manual audit confirms these 3 are missing.
**Fix:** Add to sitemap or mark noindex.

### H5. No security headers (100% missing on all 23 URLs)
**Found by:** Screaming Frog — 4 headers missing on 100% of URLs:
- Missing X-Frame-Options (23/23)
- Missing X-Content-Type-Options (23/23)
- Missing Content-Security-Policy (23/23)
- Missing Secure Referrer-Policy (23/23)
**Fix:** Create Netlify `_headers` file.

### H6. No canonical tags on 17 of 18 pages (94.4% missing)
**Found by:** Screaming Frog — "Canonicals: Missing" (17 pages, 94.4%)
**Has canonical:** field-sheet (but it's WRONG — points to homepage, see C2)
**Fix:** Add self-referencing canonical to every page.

### H7. Broken external link: Zenodo DOI (connection timeout)
**Found by:** Screaming Frog — "External No Response" (1 URL)
**URL:** `https://zenodo.org/records/20029607` — Connection Timeout
**Impact:** This is the Conservation Law paper DOI — the most important academic link on
the site. It's linked from 10 pages (highest inlink count of any external link). If it's
timing out, users and search engines can't reach it.
**Fix:** Verify the URL is correct. Zenodo may have changed their URL structure. Test
manually. If the DOI resolves differently, update all 10 references.

### H8. Broken external link: Medium (403 Forbidden)
**Found by:** Screaming Frog — "External Client Error (4xx)" (1 URL)
**URL:** `https://medium.com/@burnmydays` — 403 Forbidden
**Impact:** Medium blocks crawlers (including SF and possibly Googlebot) from profile
pages. This may not be a real issue — the link works in a browser. But it looks broken
to crawlers.
**Fix:** Consider adding `rel="nofollow"` to the Medium link, or remove it if it's not
important. Low priority since Medium blocks all crawlers.

### H9. 8 pages with no internal outlinks (50%)
**Found by:** Screaming Frog — "Pages Without Internal Outlinks" (8 pages, 50%)
**Pages:** deck (0 outlinks), architecture (0 outlinks), + 5 poster pages (0 outlinks),
+ 1 PDF
**Impact:** deck.html and architecture.html are dead ends — users and crawlers can't
navigate from them to other pages. This hurts crawl depth and PageRank flow.
**Fix:** Add nav links or footer links to deck.html and architecture.html. Poster pages
can be left as-is.

### H10. External redirect: mos2es.io → www.mos2es.io (301)
**Found by:** Screaming Frog — redirects.csv
**Issue:** field-sheet.html links to `https://mos2es.io/` which 301 redirects to
`https://www.mos2es.io/`. This is a redirect chain from the .io domain.
**Impact:** Minor — it's a redirect, not a broken link. But it's leaking link equity
through a redirect. And www.mos2es.io was "Not crawled" by SF.
**Fix:** Update the link to point directly to the final destination, or remove if the
.io domain isn't needed.

---

## MEDIUM Issues

### M1. 6 duplicate page titles (poster .html vs no-.html)
**Found by:** Screaming Frog — "Page Titles: Duplicate" (6 pages, 37.5%)
**Cause:** Same as C1 — poster pages served at both .html and clean URLs.
**Fix:** Same as C1 — canonical or redirect to consolidate.

### M2. Meta description over 155 chars on 2 pages
**Found by:** Screaming Frog — "Meta Description: Over 155 Characters" (2 pages)
**Pages:** index.html (160 chars / 1018 pixels), benchmarks.html (333 chars / 2089 pixels)
**Also:** "Over 985 Pixels" on same 2 pages
**Fix:** Trim both to ≤155 chars.

### M3. field-sheet canonical + OG URL point to wrong URL
**Found by:** Screaming Frog + manual audit
**Issue:** canonical → `https://mos2es.com/` (should be /field-sheet), og:url →
`https://mos2es.com/` (should be /field-sheet)
**Fix:** Both need to point to the field-sheet's own URL.

### M4. 5 page titles below 30 characters
**Found by:** Screaming Frog — "Page Titles: Below 30 Characters" (5 pages)
**Pages:** press (14 chars), demovideo (19), legal (19), deck (18), + 1 poster
**Impact:** Not necessarily an issue, but these titles are short — there's room for
keywords. E.g. "MO§ES™ — Press" could be "MO§ES™ — Press Kit & Media Resources".
**Fix:** Expand short titles to include target keywords (optional, low priority).

### M5. 2 low content pages
**Found by:** Screaming Frog — "Content: Low Content Pages" (2 pages, 11.1%)
**Pages:** demovideo (50 words), press (159 words)
**Impact:** Search engines need descriptive text to understand the page. demovideo at 50
words is very thin.
**Fix:** Add more descriptive content to demovideo (describe what the demo shows, the
workflow, the results). Press page has 159 words — borderline, could add more context.

### M6. 1 image over 100 kB
**Found by:** Screaming Frog — "Images: Over 100 kB" (1 image, 25%)
**Image:** `MOSES_HONEST_PORTRAIT.png` — 182 KB
**Fix:** Compress or convert to WebP. Target <100 kB.

### M7. 1 title over 561 pixels
**Found by:** Screaming Frog — "Page Titles: Over 561 Pixels" (1 page)
**Page:** benchmarks.html — 589 pixels (60 chars)
**Fix:** Shorten the benchmarks title slightly.

---

## LOW Issues

### L1. 2 images missing size attributes
**Found by:** Screaming Frog — "Images: Missing Size Attributes" (2 images, 50%)
**Images:** card_06_combined.png (benchmarks.html), founder.jpg (deck.html)
**Fix:** Add width/height attributes.

### L2. 4 URLs with underscores
**Found by:** Screaming Frog — "URL: Underscores" (4 URLs, 17.4%)
**Impact:** Underscores aren't always treated as word separators by search engines.
**Fix:** These are likely the poster page URLs. Low priority — changing URLs requires
redirects. Not worth doing for SEO alone per SF's own advice.

### L3. 2 pages with difficult readability
**Found by:** Screaming Frog — "Content: Readability Difficult" (2 pages)
**Pages:** legal (Flesch 48.3, "Hard"), governance-vacuum (Flesch 44.3, "Hard")
**Impact:** Content is best understood by college graduates. May limit audience.
**Fix:** Simplify language where possible (optional — academic/legal content is naturally
complex).

### L4. 2 duplicate H1s
**Found by:** Screaming Frog — "H1: Duplicate" (2 pages, 12.5%)
**Cause:** Poster page .html/no-.html pairs have duplicate H1s (or lack thereof).
**Fix:** Same as C1 — consolidate the duplicate URLs.

---

## What's Already Good (confirmed by SF)

- **0 broken internal links** — all internal links resolve to 200 ✓
- **0 internal redirects** — no redirect chains on internal URLs ✓
- **0 internal 4xx errors** — no broken internal pages ✓
- **100% HTTPS** — all 23 internal URLs are HTTPS, 0 mixed content ✓
- **0 HSTS issues** — HSTS header present ✓
- **All pages indexable** (except field-sheet due to wrong canonical) ✓
- **No JavaScript rendering issues** — 0 JS errors, 0 blocked resources ✓
- **No hreflang issues** (not using hreflang, which is fine for single-language) ✓
- **No pagination issues** ✓
- **No AMP issues** (not using AMP, which is fine) ✓
- **No spelling/grammar errors** detected by SF ✓
- **robots.txt** — 0 URLs blocked, clean config ✓
- **BingSiteAuth.xml** present ✓
- **IndexNow** key file + ping script deployed ✓
- **llms.txt** comprehensive ✓
- **External links mostly healthy** — 18 of 21 external URLs return 200 ✓

---

## New Discoveries from SF (not in manual audit)

| # | Finding | Source |
|---|---------|--------|
| 1 | 6 exact duplicate pages (poster .html vs clean URL) | SF Content: Exact Duplicates |
| 2 | SF detected 0 pages with structured data (JSON-LD may be malformed) | SF Structured Data |
| 3 | resume.html not crawled at all (orphan, undiscoverable) | SF crawl data |
| 4 | Zenodo DOI link timing out (10 inlinks, most important external link) | SF External No Response |
| 5 | Medium profile link 403 (blocks crawlers) | SF External 4xx |
| 6 | mos2es.io → www.mos2es.io redirect chain from field-sheet | SF Redirects |
| 7 | 8 pages with no internal outlinks (deck, architecture are dead ends) | SF Links |
| 8 | PDF has broken title ("localhost:59872/#") | SF page_titles_all.csv |
| 9 | 5 poster pages crawled (not in my manual audit scope) | SF internal_all.csv |
| 10 | benchmarks image is 182KB (MOSES_HONEST_PORTRAIT.png) | SF Images |

---

## Recommended Fix Priority

### Phase 1: Critical fixes (~1 hour)
1. **C2** — Fix field-sheet canonical → self-referencing (1 line, un-indexes a page)
2. **C1/M1** — Add canonical tags to poster pages OR add _redirects to consolidate .html
3. **C3** — Decide on resume.html: link it or noindex it
4. **C4** — Add H1 to index.html, deck.html, resume.html
5. **C5** — Add meta descriptions to architecture, deck, resume

### Phase 2: High-impact fixes (~2-3 hours)
6. **C7/H1** — Validate existing JSON-LD, fix if malformed, then add to other pages
7. **H5** — Create `_headers` file for security headers
8. **H6** — Add canonical tags to all 17 pages missing them
9. **H4** — Add deck/demovideo/resume to sitemap (or noindex)
10. **H7** — Fix/verify Zenodo DOI link (check if URL changed)
11. **H9** — Add nav/footer links to deck.html and architecture.html
12. **H2/H3** — Add OG + Twitter tags to all pages

### Phase 3: Polish (~1 hour)
13. **C6** — Create OG image (needs design tool — owner task)
14. **M2** — Trim long meta descriptions
15. **M5** — Add content to demovideo page
16. **M6** — Compress MOSES_HONEST_PORTRAIT.png
17. **L1** — Add image dimensions
18. **H10** — Fix mos2es.io redirect link
19. **M4/M7** — Expand short titles, trim long title
20. **L2/L3/L4** — Low priority, defer

### Phase 4: Bigger items (future)
21. Add concept/guide pages (playbook Phase 6)
22. Add FAQ section with FAQPage schema
23. Set up Google Search Console + weekly citation tracking
24. Add GitHub topics to repos
25. Run Screaming Frog crawl 2 to verify fixes

---

## Raw crawl data

All SF exports are in `Devins_Plans/audit.run1/`:
- `issues_overview_report.csv` — 28 issues, prioritized
- `crawl_overview.csv` — full crawl summary stats
- `internal_all.csv` — all 23 internal URLs with full metadata
- `external_all.csv` — all 21 external URLs with status codes
- `page_titles_all.csv` — title audit for 16 HTML pages
- `meta_description_all.csv` — meta description audit
- `security_all.csv` — security header analysis
- `redirects.csv` — redirect chains
- `orphan_pages.csv` — empty (sitemap not uploaded to SF)
- `meta_keywords_all.csv` — all empty (not using meta keywords, which is fine)
- `Force-Directed Crawl Diagram.svg` — visual crawl map
- `Force-Directed Directory Tree Diagram.svg` — site structure tree
