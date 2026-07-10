---
type: Plan
title: SEO/GEO/AEO Fix Campaign — 3-pass plan
description: Phased fix plan for all 28 issues found in the SEO/GEO/AEO audit. Pass 1 stops the bleeding (critical fixes). Pass 2 builds the structure (JSON-LD, OG/Twitter, canonical, security headers, sitemap, internal links). Pass 3 polishes and verifies (meta trims, titles, images, content, re-crawl prep).
tags: [mos2es, seo, geo, aeo, fix-plan, screaming-frog, plan]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:35 UTC
---

# SEO/GEO/AEO Fix Campaign — 3-Pass Plan

**Owner:** de sit1
**Date:** 2026-07-10
**Audit baseline:** 28 issues, grade C- (see `reference/SEO_GEO_AEO_AUDIT.md`)
**Target:** grade A- (matching signalaf.com post-fix result)

**Three passes, no rushing:**
- **Pass 1** — Stop the bleeding (critical, actively hurting right now)
- **Pass 2** — Build the structure (high-impact, foundation for GEO/AEO)
- **Pass 3** — Polish + verify (medium/low, cleanup, re-crawl prep)

Each pass ends with a commit + bus update. No pass starts until the previous one is
committed and verified.

---

## Pass 1 — Stop the Bleeding

**Goal:** Fix the issues that are actively damaging the site right now.
**Estimated changes:** 7 files touched, ~1 hour

### 1.1 Fix field-sheet canonical (C2) — 1 line
**File:** `field-sheet.html` line 6
**Change:** `href="https://mos2es.com/"` → `href="https://mos2es.com/field-sheet"`
**Why:** The current canonical tells Google the field-sheet is a duplicate of the homepage.
Google is de-indexing it. This is the single most urgent fix — a 1,613-word page is
invisible to search.

### 1.2 Fix field-sheet OG URL (M4) — 1 line
**File:** `field-sheet.html` line 11
**Change:** `content="https://mos2es.com/"` → `content="https://mos2es.com/field-sheet"`
**Why:** OG URL also points to homepage. Social shares of field-sheet link to the wrong page.

### 1.3 Fix poster page duplicates (C1/M1) — add canonicals
**Files:** `img/benchmarks/poster.html`, `img/benchmarks/poster_honest.html`,
`img/benchmarks/poster_honest_portrait.html`
**Change:** Add `<link rel="canonical" href="https://mos2es.com/img/benchmarks/poster">`
(to the clean URL, not the .html version) to each .html file.
**Why:** Screaming Frog found 6 exact duplicate pages — each poster is served at both
`.html` and clean URL with identical content. Canonical tells Google which version is
the real one. This consolidates 6 pages → 3.
**Alternative considered:** `_redirects` rules to 301 the .html versions. Rejected for
now because the poster pages are linked from benchmarks.html using `.html` extension —
redirecting would break those links until we also update them. Canonical is safer.

### 1.4 Decide on resume.html (C3) — owner decision needed
**Options:**
- **A) Add to sitemap + link from index nav** — makes it discoverable, indexed
- **B) Add noindex meta tag** — keeps it accessible by direct URL but hides from search
- **C) Leave as-is** — remains an orphan, invisible to crawlers
**Recommendation:** Option B (noindex) — a resume is typically not a search target, but
keeping it accessible by direct URL is useful for sharing. Add `<meta name="robots"
content="noindex, follow">` to the head.
**Blocking:** This needs owner input before Pass 1 commit. If no answer, default to B.

### 1.5 Add H1 to index.html (C4)
**File:** `index.html`
**Issue:** No `<h1>` tag. The page jumps straight to H2s.
**Change:** Add a visually-hidden or styled `<h1>` in the hero section. The H1 should be
"MO§ES — Sovereign Signal Governance" (matching the title tag).
**Where:** After the `<body>` tag, before the nav or in the hero section. Need to check
the existing CSS — the page has a hero/door-grid design. The H1 can be visually styled
to match or hidden with `sr-only` class if the design doesn't want a visible H1.
**Important:** Don't disrupt the existing visual design. The H1 can be the wordmark or
a screen-reader-only element.

### 1.6 Add H1 to deck.html (C4)
**File:** `deck.html`
**Issue:** No `<h1>` tag. Has H2s ("The Execution Gap", "Orchestration ≠ Governance", etc.)
but no H1.
**Change:** Add `<h1>` with "MO§ES — Pitch Deck" or "Ello Cello — MO§ES Pitch" (matching
the title). Can be visually hidden or styled as the deck title slide.
**Note:** deck.html uses a custom `<deck-stage>` web component. The H1 should go inside
the first slide or as a visually-hidden element in the head.

### 1.7 Add H1 to resume.html (C4)
**File:** `resume.html`
**Issue:** No headings at all — no H1, H2, or H3.
**Change:** Add `<h1>Deric J. McHenry</h1>` in the header section. The resume has a
`.name` div that could be converted to H1, or an H1 can be added alongside it.

### 1.8 Add meta descriptions to 3 pages (C5)
**Files + proposed descriptions (≤155 chars):**
- `architecture.html` — "MO§ES system architecture: recursive compression, origin binding, lineage claws, and the governance enforcement layer for multi-agent AI." (130 chars)
- `deck.html` — "MO§ES pitch deck — the investor presentation for sovereign signal governance and the Conservation Law of Commitment." (112 chars)
- `resume.html` — "Deric J. McHenry — founder of MO§ES, AI governance researcher, commitment conservation theorist, and inventor of the governance enforcement layer." (140 chars)

### 1.9 Fix architecture.html title encoding (L2)
**File:** `architecture.html` line 6
**Change:** `MO§E§™ — Investor Architecture` → `MO§ES™ — Architecture`
**Why:** "E§" is an encoding bug — the § character is in the wrong position. Also drop
"Investor" — it limits the page's search intent to investors only.

### 1.10 Fix Zenodo DOI links (H7)
**Issue:** `zenodo.org/records/20029607` returns 503 Service Unavailable. The DOI URL
`doi.org/10.5281/zenodo.20029607` resolves correctly (302 → zenodo.org/doi/... → records).
**Root cause:** Zenodo is having service issues (503). The records URL is the final
destination but it's currently down. This may be temporary.
**Change:** Replace all `https://zenodo.org/records/20029607` with
`https://doi.org/10.5281/zenodo.20029607` across all HTML files. The DOI URL is the
persistent identifier — it will always redirect to the right place, even if Zenodo
changes their URL structure.
**Files affected:** index.html (5 occurrences), field-sheet.html (3), papers.html (1),
governance-vacuum.html (1)
**Note:** The JSON-LD blocks already use `https://doi.org/10.5281/zenodo.20029607` —
only the visible `<a href>` links need updating.

### Pass 1 verification
- [ ] field-sheet canonical points to /field-sheet
- [ ] field-sheet og:url points to /field-sheet
- [ ] 3 poster pages have canonical tags
- [ ] resume.html has noindex (or owner's choice)
- [ ] index.html has exactly 1 H1
- [ ] deck.html has exactly 1 H1
- [ ] resume.html has exactly 1 H1
- [ ] architecture.html has meta description
- [ ] deck.html has meta description
- [ ] resume.html has meta description
- [ ] architecture.html title is fixed (MO§ES™ not MO§E§™)
- [ ] All Zenodo links use doi.org/10.5281/zenodo.20029607
- [ ] Commit + bus update

---

## Pass 2 — Build the Structure

**Goal:** Add the SEO/GEO/AEO infrastructure that's missing on 9 of 11 pages.
**Estimated changes:** 11 HTML files + 2 new config files, ~2-3 hours

### 2.1 Add canonical tags to all pages (H6)
**Files:** all 11 HTML pages (field-sheet already fixed in Pass 1)
**Change:** Add `<link rel="canonical" href="https://mos2es.com/<page>">` to `<head>`
**Pattern:**
- index.html → `https://mos2es.com/`
- papers.html → `https://mos2es.com/papers`
- legal.html → `https://mos2es.com/legal`
- press.html → `https://mos2es.com/press`
- benchmarks.html → `https://mos2es.com/benchmarks`
- governance-vacuum.html → `https://mos2es.com/governance-vacuum`
- architecture.html → `https://mos2es.com/architecture`
- deck.html → `https://mos2es.com/deck`
- demovideo.html → `https://mos2es.com/demovideo`
- resume.html → `https://mos2es.com/resume` (only if not noindex)
**Why:** 17 of 18 pages have no canonical. Google may index duplicate URLs (with/without
.html, with/without trailing slash). Self-referencing canonicals prevent this.

### 2.2 Add security headers (H5) — new file
**File:** `_headers` (Netlify convention, root of repo)
**Content:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https:
```
**Why:** SF found 4 security headers missing on 100% of 23 URLs. The signalaf.com fix
campaign did the same thing.
**CSP note:** `unsafe-inline` and `unsafe-eval` are needed because the pages use inline
styles and the deck uses a web component. `data:` is needed for the SVG favicon.
`https:` allows Google Fonts and external resources. This is a permissive CSP — can be
tightened in a future pass.

### 2.3 Add _redirects for clean URLs (H7 from original audit)
**File:** `_redirects` (Netlify convention, root of repo)
**Content:**
```
/papers              /papers.html              200
/legal               /legal.html               200
/press               /press.html               200
/field-sheet         /field-sheet.html         200
/benchmarks          /benchmarks.html          200
/governance-vacuum   /governance-vacuum.html   200
/architecture        /architecture.html        200
/deck                /deck.html                200
/demovideo           /demovideo.html           200
/resume              /resume.html              200
```
**Why:** Sitemap uses clean URLs (`/papers` not `/papers.html`). Netlify's pretty URLs
may handle this automatically, but explicit rewrites (200, not 301) make it deterministic.
This also ensures the canonical URLs (which will use clean URLs) actually resolve.

### 2.4 Update sitemap.xml (H4)
**File:** `sitemap.xml`
**Changes:**
- Add `/deck` (if owner decides it should be public)
- Add `/demovideo`
- Add `/resume` (only if not noindex)
- Verify all URLs use clean format (matching the _redirects rules)
**Current:** 8 URLs. After: 10-11 URLs depending on resume decision.

### 2.5 Add OG tags to all pages (H2)
**Files:** all 11 HTML pages (benchmarks + field-sheet already have partial sets)
**Tags to add:**
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://mos2es.com/<page>">
<meta property="og:title" content="<page title>">
<meta property="og:description" content="<meta description>">
<meta property="og:image" content="https://mos2es.com/img/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```
**Note:** og:image references `/img/og.png` which doesn't exist yet (C6). The tags should
be added now — the image can be created later. Social platforms will just not show an
image until the file exists. When the image is created, all pages will automatically
have it.
**Exception:** benchmarks.html already has its own og:image (the benchmark chart). Keep
that one — it's a real per-page OG image.

### 2.6 Add Twitter card tags to all pages (H3)
**Files:** all 11 HTML pages (benchmarks has full set, field-sheet has partial)
**Tags to add:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<page title>">
<meta name="twitter:description" content="<meta description>">
<meta name="twitter:image" content="https://mos2es.com/img/og.png">
```
**Exception:** benchmarks.html already has its own twitter:image. Keep that one.

### 2.7 Add JSON-LD structured data to 9 pages (H1)
**Priority order (by search/AEO value):**

1. **benchmarks.html** — add Dataset schema (empirical data)
2. **governance-vacuum.html** — add Article schema (it's an article)
3. **architecture.html** — add TechArticle schema
4. **legal.html** — add WebPage + BreadcrumbList
5. **press.html** — add WebPage + BreadcrumbList
6. **field-sheet.html** — add WebPage + BreadcrumbList
7. **demovideo.html** — add VideoObject schema (it has a video)
8. **deck.html** — add WebPage + BreadcrumbList
9. **resume.html** — add ProfilePage + Person schema (only if not noindex)

**Also add to all sub-pages:** BreadcrumbList schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mos2es.com/" },
    { "@type": "ListItem", "position": 2, "name": "<Page Name>", "item": "https://mos2es.com/<page>" }
  ]
}
```

**Also add WebSite schema to all pages** (currently only on index.html):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mos2es.com/#website",
  "name": "MO§ES",
  "url": "https://mos2es.com",
  "publisher": { "@id": "https://mos2es.com/#org" }
}
```

**Validation:** After adding, validate all pages at validator.schema.org and
search.google.com/test/rich-results.

### 2.8 Add nav links to deck.html and architecture.html (H9)
**Issue:** Both pages have 0 internal outlinks — they're dead ends.
**deck.html:** No nav at all. Add a minimal nav or footer with links to:
- Home (index.html)
- Papers (papers.html)
- Benchmarks (benchmarks.html)
- Legal (legal.html)
**architecture.html:** No nav at all. Add the same minimal nav.
**Design consideration:** deck.html has a custom design (paper aesthetic, deck-stage
web component). The nav should be minimal and not disrupt the design. A simple footer
link row at the bottom would work. Same for architecture.html (which has its own
light-themed design).

### 2.9 Fix mos2es.io redirect link (H10)
**File:** `field-sheet.html`
**Issue:** Links to `https://mos2es.io/` which 301-redirects to `https://www.mos2es.io/`
**Change:** Update the link to point directly to the final destination, or remove if the
.io domain isn't needed. Need to check what mos2es.io is — is it a separate site? A
redirect to the main site? If it's just a redirect, remove the links.

### Pass 2 verification
- [ ] All 11 pages have canonical tags (self-referencing)
- [ ] `_headers` file exists with 4 security headers
- [ ] `_redirects` file exists with clean URL rewrites
- [ ] sitemap.xml has 10-11 URLs (all pages except noindex'd ones)
- [ ] All 11 pages have OG tags (og:type, og:url, og:title, og:description, og:image)
- [ ] All 11 pages have Twitter card tags
- [ ] 9 pages have JSON-LD structured data (WebSite + page-specific type + BreadcrumbList)
- [ ] deck.html has internal nav/footer links
- [ ] architecture.html has internal nav/footer links
- [ ] mos2es.io redirect links fixed
- [ ] Validate JSON-LD at validator.schema.org (spot check 3 pages)
- [ ] Commit + bus update

---

## Pass 3 — Polish + Verify

**Goal:** Clean up medium/low issues, optimize, and prepare for re-crawl.
**Estimated changes:** 5-6 files, ~1 hour

### 3.1 Trim long meta descriptions (M2)
**Files:**
- `index.html` — 160 chars → trim to ≤155. Drop "at point of execution" or shorten
  "commitment conservation, governance enforcement, and lineage-bound artifacts."
- `benchmarks.html` — 333 chars → trim to ≤155. E.g. "MO§ES leads all 5 measured
  economic categories vs. the AA Coding Agent Index. Raw JSONL · 98 sessions ·
  operator-augmented Claude Code + Opus 4.7." (130 chars)

### 3.2 Fix deck.html title (M6)
**File:** `deck.html`
**Change:** `Ello Cello — Pitch` → `MO§ES™ — Pitch Deck`
**Why:** No brand name in current title. Inconsistent with other pages.

### 3.3 Fix resume.html title (M7)
**File:** `resume.html`
**Change:** `Deric J. McHenry, Resume` → `MO§ES™ — Deric J. McHenry, Resume`
**Why:** No brand connection. (Only if resume is not noindex'd.)

### 3.4 Expand short titles (M4) — optional
**Pages:** press (14 chars), demovideo (19), legal (19)
**Suggested:**
- press: `MO§ES™ — Press Kit & Media Resources` (36 chars)
- demovideo: `MO§ES™ — Demo Video & Walkthrough` (33 chars)
- legal: `MO§ES™ — Legal, Patent & IP` (27 chars)
**Note:** These are optional — the current titles aren't wrong, just short. Only do if
owner wants more keyword targeting.

### 3.5 Add image dimensions (L1)
**Files:**
- `benchmarks.html` — `<img src="img/benchmarks/card_06_combined.png">` → add
  `width="1200" height="628"` (need to check actual dimensions)
- `deck.html` — `<img src="assets/founder.jpg">` → add width/height attributes
  (has CSS height:340px but no HTML attributes)

### 3.6 Compress large image (M6)
**File:** `img/benchmarks/MOSES_HONEST_PORTRAIT.png` — 182 KB
**Options:**
- Compress with `pngquant` or `optipng` if available
- Convert to WebP (but need to add fallback for older browsers)
- Resize if the displayed size is smaller than the native size
**Target:** <100 KB

### 3.7 Add content to demovideo page (M5)
**File:** `demovideo.html`
**Issue:** Only 50 words. SF flags as low content.
**Change:** Add descriptive content around the video — what it shows, the workflow
demonstrated, key takeaways. Target 150-200 words. This helps search engines understand
the page and gives AI engines content to cite.

### 3.8 Fix PDF metadata (new finding from SF)
**File:** `img/benchmarks/MOSES_UPDATED_VSRAW.pdf`
**Issue:** PDF title metadata is "localhost:59872/#" — garbage from the tool that
generated it.
**Fix:** Regenerate the PDF with proper title metadata, or use a PDF tool to update the
metadata. Low priority — PDFs aren't primary search targets.

### 3.9 Add rel="nofollow" to Medium link (H8)
**File:** Need to find which page links to `medium.com/@burnmydays`
**Change:** Add `rel="nofollow"` to the Medium profile link.
**Why:** Medium blocks crawlers (403). noindex tells search engines not to follow it.

### 3.10 Run IndexNow push
**After all fixes are committed:** Run `bash scripts/indexnow-ping.sh` to push all
URLs to Bing/Yandex/Naver. This tells them to re-crawl the updated pages.

### 3.11 Prepare for Screaming Frog re-crawl
**Checklist for owner:**
- [ ] Re-run SF with structured data detection enabled (Config > Spider > Advanced)
- [ ] Upload sitemap.xml to SF (Site > Sitemaps) for orphan page comparison
- [ ] Crawl `https://mos2es.com` (should take ~30 seconds for 11 pages)
- [ ] Export same reports as run 1
- [ ] Compare: issue count should drop from 28 → near 0
- [ ] Drop exports in `Devins_Plans/audit.run2/` for comparison

### Pass 3 verification
- [ ] index.html meta description ≤155 chars
- [ ] benchmarks.html meta description ≤155 chars
- [ ] deck.html title includes "MO§ES"
- [ ] resume.html title includes "MO§ES" (if not noindex)
- [ ] 2 images have width/height attributes
- [ ] MOSES_HONEST_PORTRAIT.png is <100 KB
- [ ] demovideo.html has 150+ words
- [ ] Medium link has rel="nofollow"
- [ ] IndexNow push completed
- [ ] Commit + bus update + sign out

---

## What's NOT in this plan (future work)

These are bigger items that need separate planning:

1. **Create OG image** (C6) — needs a design tool (Photoshop/Figma/Canva). Owner task.
   The OG tags will reference `/img/og.png` after Pass 2 — the image just needs to be
   created and dropped in.
2. **Content layer / concept pages** (playbook Phase 6) — one page per key term
   (Conservation Law, Lineage Claw, Origin Binding, etc.). This is the biggest GEO/AEO
   lever but needs content strategy discussion first.
3. **FAQ section + FAQPage schema** — high citation potential but needs Q&A content.
4. **GitHub topics + repo discoverability** (playbook Phase 5) — needs the 6-7 repos.
5. **Google Search Console setup** — owner task (needs Google account verification).
6. **Weekly citation tracking** — manual process, needs owner involvement.
7. **Per-page OG images** (playbook Phase 4) — nice-to-have, not foundation.

---

## Decision needed from owner before Pass 1

1. **resume.html** — noindex (B, recommended) or add to sitemap + nav (A) or leave as
   orphan (C)?
2. **deck.html in sitemap?** — it's a pitch deck. Public but maybe not a search target.
   Recommend: add to sitemap (it's linked from nav, so it's already public).
3. **architecture.html title** — drop "Investor" from the title? (recommended — it
   limits search intent). Or keep it for investor targeting?
4. **mos2es.io** — what is this domain? Should the links point elsewhere or be removed?
5. **Short titles (press, demovideo, legal)** — expand them for keyword targeting or
   leave as-is?

**Default if no answer:** noindex resume, add deck to sitemap, drop "Investor" from
architecture title, leave mos2es.io links as-is for now, leave short titles as-is.
