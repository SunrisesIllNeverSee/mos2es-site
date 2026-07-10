---
type: Plan
title: Site Organization & Structure Plan
description: Brainstorming plan for reorganizing mos2es.com — content structure, CSS architecture, page consolidation, and visitor journey.
tags: [mos2es, site-structure, reorganization, plan, brainstorming, css, architecture]
timestamp: 2026-07-10
last_touched: 2026-07-10 10:00 UTC
---

# Site Organization & Structure Plan

## Current State — The Craziness

### 11 pages, 3 design languages, 0 shared CSS

The site has grown organically into 11 HTML pages with no shared infrastructure:

**Dark theme pages (8):** index, papers, benchmarks, field-sheet, governance-vacuum, demovideo, press, legal
- Playfair Display + DM Sans + DM Mono
- #0A0D12 background, #C4923A gold accent
- But TWO different variable naming systems:
  - index/governance-vacuum: `--bone`, `--bone-soft`, `--gray`, `--gold-soft`
  - papers/legal/press/benchmarks/demovideo: `--text`, `--dim`, `--bright`, `--line`
  - field-sheet: a THIRD variant with `--blue`, `--green`, `--amber` added

**Light/paper theme pages (2):** deck, resume
- Newsreader + IBM Plex Sans + IBM Plex Mono
- #F2EDE3 paper background, #B5421C rust accent
- Completely different design language

**Light/technical theme (1):** architecture
- IBM Plex Mono + IBM Plex Sans
- #F8F7F4 background, hardcoded colors (no CSS variables at all)
- A THIRD design language

### The problems this creates

1. **75 KB of duplicated CSS** — the same color variables, reset, nav, fonts, and card styles are copy-pasted into every page. Change a color → edit 8 files.

2. **Inconsistent variable naming** — `--bone` vs `--text` vs `--bright` all mean the same thing. `--gray` vs `--dim` are the same color (#8A94A0). Makes maintenance error-prone.

3. **3 font systems** — Playfair/DM Sans/DM Mono (dark pages), Newsreader/IBM Plex (paper pages), IBM Plex (architecture). 3 Google Fonts requests per page, many weights loaded that aren't used.

4. **Content overlap** — patents appear on 4 pages, papers on 4 pages, benchmarks on 3 pages, product list on 3 pages. When something changes, you update multiple pages or they drift out of sync.

5. **No shared nav** — every page has its own nav implementation. Some have full nav bars, some have footer links, field-sheet has only anchor links (no way back to home except the URL bar).

6. **4 poster pages** living as crawlable HTML in img/benchmarks/ — they're print artifacts but Google crawls them as separate pages (94 impressions on poster.html alone).

7. **No build system** — everything is hand-edited HTML. No includes, no templating, no partials. The SEO fix campaign took 3 passes because every change had to be applied to 11 files.

---

## The Plan — 4 Layers

### Layer 1: CSS Architecture (the foundation)

**Goal:** One shared stylesheet, page-specific CSS only for what's unique.

**Create `assets/site.css`** — extract everything shared:
- `:root` variables (unified naming — pick ONE system)
- Reset (`* { box-sizing... }`)
- Body + grid background
- Typography base (headings, paragraphs, links, lists)
- Nav bar (shared component)
- Footer (shared component)
- Card / panel / pill / tag components
- Table styles
- CTA button styles
- Responsive breakpoints

**Create `assets/page.css`** (optional, per-page) — only what's unique:
- index: hero, door grid, law equation, audience grid
- field-sheet: bar charts, sticky nav, dashboard layout
- governance-vacuum: article body, footnotes, source cards
- benchmarks: stat grid, gallery, poster frame
- deck: slide system (keep inline — it's a web component)
- resume: print styles (keep inline — it's print-optimized)

**Result:** Pages drop from 40 KB to 5-15 KB. Edit a color → change one file. Add a nav link → change one file.

**Variable unification** — pick the simpler system and migrate:
```
--bg:        #0A0D12    (was: --bg)
--panel:     #10141A    (was: --bg-alt, --panel)
--elev:      #141920    (was: --bg-elev)
--border:    #1A1F28    (new — standardize)
--text:      #E8ECF1    (was: --bone, --bright)
--text-soft: #C8CDD6    (was: --bone-soft, --text)
--dim:       #8A94A0    (was: --gray, --bone-mute, --dim)
--dim-soft:  #6B7480    (was: --gray-soft)
--gold:      #C4923A    (was: --gold — universal)
--gold-warm: #C9A24A    (was: --gold-warm)
--serif:     'Playfair Display', Georgia, serif
--sans:      'DM Sans', Inter, system-ui, sans-serif
--mono:      'DM Mono', ui-monospace, monospace
```

### Layer 2: Page Consolidation (the structure)

**Current: 11 pages + 4 posters = 15 crawlable URLs**

**Proposed: 8 pages + 0 standalone posters = 8 crawlable URLs**

| Current | Proposed | Action |
|---------|----------|--------|
| index.html | index.html | Simplify (operator.html direction, future) |
| papers.html | papers.html | Keep |
| benchmarks.html | benchmarks.html | Keep |
| field-sheet.html | field-sheet.html | Keep (but add nav back to site) |
| governance-vacuum.html | governance-vacuum.html | Keep |
| architecture.html | architecture.html | Keep (but migrate to dark theme) |
| deck.html | deck.html | Keep (not in sitemap, investor-only) |
| demovideo.html | **merge into benchmarks** | Demovideo has no actual video — fold the workflow description into benchmarks or index |
| resume.html | resume.html | Keep (print-optimized, separate design is fine) |
| press.html | **merge into field-sheet** | Press kit is 200 words — fold into field-sheet as a "Press" section |
| legal.html | **merge into field-sheet** | Legal/patent info is 500 words — fold into field-sheet as a "Legal" section |
| 4 poster pages | **convert to PDFs** | Stop serving as crawlable HTML. Link to PDFs from benchmarks.html |

**Why merge demovideo, press, legal:**
- demovideo.html: 400 words, no actual video, placeholder player. The content (workflow description, SigRank explanation) belongs on benchmarks or index.
- press.html: 200 words. A contact email + boilerplate. This is a section, not a page.
- legal.html: 500 words. Patent numbers + filing dates. This is a section of the field-sheet (which already has an IP section).

**Why convert posters to PDFs:**
- They're print artifacts (poster format, not web format)
- They're getting crawled as duplicate content (94 impressions on poster.html)
- They have no nav, no internal links, no way back to the site
- PDFs can still be linked from benchmarks.html and downloaded

**Result:** Sitemap drops from 10 URLs to 7. No orphan pages. No duplicate content. Every page has a clear purpose and sufficient content.

### Layer 3: Shared Components (the maintainability)

**Goal:** Edit nav once, not 11 times.

**Option A — Static includes (simplest):**
- Use a build script (Node, Python, or shell) that assembles pages from partials
- `partials/head.html` — `<head>` with SEO tags (page-specific values injected)
- `partials/nav.html` — shared nav bar
- `partials/footer.html` — shared footer
- `partials/fonts.html` — Google Fonts links
- Build script: `node scripts/build.js` → outputs final HTML to `dist/`
- Netlify builds from `dist/`

**Option B — 11ty (Eleventy) static site generator:**
- Lightweight, no client-side JS, works with plain HTML/Nunjucks
- Built-in includes, layouts, data files
- Netlify has first-class 11ty support
- Learning curve: ~1 hour

**Option C — No build system, just shared CSS:**
- Extract CSS to `assets/site.css` (Layer 1)
- Keep HTML pages as-is
- Accept that nav changes require find-and-replace across files
- Simplest, but doesn't solve the maintainability problem

**Recommendation:** Start with Option C (just CSS extraction). Move to Option A or B when you're ready to stop copy-pasting nav.

### Layer 4: Visitor Journey (the experience)

**Current journey:** Visitor lands on index → sees 10 nav links → doesn't know where to go → bounces.

**Proposed journey — 3 audiences, 3 paths:**

```
                    ┌──→ Papers (researchers)
                    │
Visitor → Index ────┼──→ Benchmarks (technical buyers)
                    │
                    ├──→ Governance Vacuum (thought leaders)
                    │
                    ├──→ Architecture (engineers)
                    │
                    ├──→ Field Sheet (press/analysts — includes press + legal sections)
                    │
                    ├──→ Deck (investors — not in nav, direct link only)
                    │
                    └──→ Resume (recruiters — not in nav, direct link only)
```

**Nav bar simplification:**
- Current: Home, Papers, Benchmarks, Legal, Press, Field Sheet, Deck, Articles, Demo, Resume, Run →
- Proposed: Papers, Benchmarks, Architecture, Articles, Field Sheet, Run →
- Deck and Resume: linked from field-sheet and footer, not in main nav
- Legal and Press: sections within field-sheet, not separate pages

**Index page (future — operator.html direction):**
- Minimal landing, not a marketing page
- What MO§ES is (one paragraph)
- The conservation law (one equation)
- 3-4 links to the main pages
- Contact
- No hero image, no door grid, no audience grid, no IP strip

---

## Implementation Phasing

### Phase 1: CSS Extraction (low risk, high impact)
1. Create `assets/site.css` with unified variables + shared components
2. Link from all dark-theme pages
3. Remove duplicated inline CSS
4. Test each page visually
5. **Result:** 75 KB → ~20 KB total CSS, one source of truth

### Phase 2: Page Merges (medium risk)
1. Merge press.html content into field-sheet.html (add "Press" section)
2. Merge legal.html content into field-sheet.html (add "Legal" section)
3. Merge demovideo.html content into benchmarks.html (add "Demo Workflow" section)
4. 301 redirect old URLs to field-sheet/benchmarks via _redirects
5. Update sitemap (10 → 7 URLs)
6. Update all internal links
7. **Result:** 7 focused pages, no thin content, no orphans

### Phase 3: Poster Consolidation (low risk)
1. Convert 4 poster HTML files to PDFs (or keep as downloadable HTML but add `noindex`)
2. Remove from crawlable surface (or add robots meta)
3. Update benchmarks.html to link to PDFs
4. **Result:** No duplicate content, no crawlable print artifacts

### Phase 4: Architecture Theme Migration (medium risk)
1. Migrate architecture.html from light/technical theme to dark theme
2. Use shared `assets/site.css`
3. Keep the ring diagram and tab system as page-specific CSS
4. **Result:** 2 design languages instead of 3 (dark + paper for deck/resume)

### Phase 5: Build System (optional, future)
1. Set up 11ty or simple build script
2. Extract shared head/nav/footer into partials
3. Build → dist/ → Netlify deploys
4. **Result:** Edit nav once, not 7 times

### Phase 6: Landing Page (future, when ready)
1. Replace index.html with operator.html-inspired minimal landing
2. Add SEO tags
3. **Result:** Clean front door, 8 KB instead of 40 KB

---

## What This Gets You

| Metric | Current | After Phase 1-4 |
|--------|---------|-----------------|
| Crawlable URLs | 15 (11 + 4 posters) | 7 |
| Total CSS | 75 KB (duplicated) | ~20 KB (shared) |
| Design languages | 3 | 2 (dark + paper) |
| Variable naming systems | 3 | 1 |
| Font systems | 3 | 2 (dark + paper) |
| Pages with nav | 9/11 | 7/7 |
| Content overlap | 4 pages share patents | 1 page (field-sheet) |
| Edit nav link | 11 files | 1 file (after build system) |
| Sitemap URLs | 10 | 7 |

## Decisions Needed

1. **Variable naming:** Use the simpler `--text/--dim/--gold` system or the `--bone/--gray/--gold` system?
2. **Page merges:** Agree to merge press + legal into field-sheet, and demovideo into benchmarks?
3. **Poster pages:** Convert to PDF, or add `noindex` and keep as HTML?
4. **Architecture page:** Migrate to dark theme, or keep its light/technical theme?
5. **Build system:** Start with just CSS extraction (Option C), or go straight to 11ty (Option B)?
6. **Landing page:** Leave index.html as-is for now, or start the operator.html migration?
