# Page-Level SEO Beef-Up + Academic GEO Mapping — What We Did and How to Apply It

> This is the second teaching document, covering the work that came AFTER the
> initial 7-phase SEO implementation. Two major efforts:
>
> 1. **Page-level SEO beef-up** — internal linking, meta descriptions, titles,
>    H1/H2 fixes, security headers, content gaps, image sizes. Found via
>    Screaming Frog crawl, fixed in a 5-commit campaign.
> 2. **Academic GEO mapping** — connecting the live product to the academic
>    foundation (Conservation Law, Commitment Theory, MO§ES, Zenodo DOIs,
>    ORCID) via structured data, cross-links, and llms.txt expansion.
>
> **Reference site:** signalaf.com (Next.js 15, ~145 URLs)
> **Your site:** mos2es.com (static HTML, 11 pages)

---

## Table of Contents

1. [Part 1: Page-Level SEO Beef-Up](#part-1-page-level-seo-beef-up)
   - [The Internal Linking Fix](#the-internal-linking-fix
   - [Security Headers](#security-headers)
   - [Meta Descriptions](#meta-descriptions)
   - [Page Titles](#page-titles)
   - [Low Content Pages](#low-content-pages)
   - [H1/H2 Issues](#h1h2-issues)
   - [Image Size Attributes](#image-size-attributes)
   - [The Mapping Table (every page → what it links to)](#the-mapping-table)
2. [Part 2: Academic GEO Mapping](#part-2-academic-geo-mapping)
   - [The Convergence Thesis](#the-convergence-thesis)
   - [Organization sameAs](#organization-sameas)
   - [ScholarlyArticle Schema](#scholarlyarticle-schema)
   - [The /science Page](#the-science-page)
   - [llms.txt Academic Expansion](#llmstxt-academic-expansion)
   - [Dataset Citation Field](#dataset-citation-field)
   - [GitHub Repo SEO](#github-repo-seo)
   - [Zenodo Deposit Optimization](#zenodo-deposit-optimization)
3. [Your Checklist for mos2es.com](#your-checklist-for-mos2escom)

---

## Part 1: Page-Level SEO Beef-Up

After the initial 7-phase implementation (OG images, JSON-LD, llms.txt, content
pages), we ran a Screaming Frog crawl and found 30 issues. Here's what we fixed
and how.

### The Internal Linking Fix

**The problem:** We had built 34 SEO content pages (guides, metrics, tools, vs,
alternatives, blog) but they were **one-way equity pipes** — they all linked TO
the board, but nothing linked TO them. 9 pages were in the sitemap but had zero
internal links pointing to them (sitemap orphans). The topic hubs existed but
weren't linked from the homepage or footer.

**What we did (Phase A, 31 files, 511 insertions):**

1. **Added a "Topics" column to the footer** with all 5 topic hubs:
   - `/ai-benchmarking`
   - `/ai-coding-metrics`
   - `/ai-operator-scoring`
   - `/operator-performance`
   - `/cascade-analysis`

2. **Verified each topic hub links to its content cluster** — each hub has a
   `RELATED` array linking to its guides, metrics, tools, vs/alternatives pages,
   and the board.

3. **Added "Related" sections to all 27 SEO content pages** — each page now
   links to 2-3 related pages. See [the mapping table](#the-mapping-table).

4. **Added cross-links from core pages to topic hubs:**
   - Homepage → all 5 topic hubs
   - `/about` → `/ai-operator-scoring`, `/operator-performance`
   - `/science` → `/ai-benchmarking`, `/cascade-analysis`
   - `/methodology` → `/ai-coding-metrics`, `/ai-operator-scoring`

**Result:** Average internal inlinks per page went from 18.1 → 27.0 (+49%).
Sitemap orphans went from 9 → 0. Every page is now reachable from the homepage
within 3 clicks.

### How to do it on mos2es.com

With 11 pages, the internal linking is simpler but the principle is the same:

1. Every page should link to at least 2-3 related pages
2. The homepage should link to all major sections
3. No page should be an orphan (in sitemap but not linked from any page)

Suggested cross-links:
- `index.html` → all pages (it's the hub)
- `papers.html` → `architecture.html`, `benchmarks.html`, `governance-vacuum.html`
- `architecture.html` → `papers.html`, `benchmarks.html`, `governance-vacuum.html`
- `benchmarks.html` → `papers.html`, `field-sheet.html`
- `governance-vacuum.html` → `papers.html`, `architecture.html`
- `field-sheet.html` → `papers.html`, `benchmarks.html`
- `press.html` → `papers.html`, `index.html`
- `legal.html` → `index.html`

---

### Security Headers

**The problem:** 4 security headers missing on 100% of pages:
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

**What we did:** Added them in `next.config.ts`:
```js
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; ..." },
]
```

**Result:** 100% missing → 100% present. Screaming Frog flagged this on every
page — one config change fixed all of them.

### How to do it on mos2es.com

Since you're on Netlify with static HTML, add a `_headers` file or use
`netlify.toml`:

```toml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:"
```

You already have a `netlify.toml` — add the headers section to it.

---

### Meta Descriptions

**The problem:** 34 pages had meta descriptions over 155 characters. Google
truncates at ~155 chars / 985 pixels.

**What we did:** Went through every page's metadata and trimmed to ≤155 chars.
Kept the core message, cut the detail.

**Examples:**
- Before: "SigRank is a privacy-preserving leaderboard that scores AI operators on canonical token-telemetry metrics including the yield cascade, signal-to-noise ratio, leverage, and velocity across multiple time windows" (215 chars)
- After: "Privacy-preserving AI operator leaderboard ranked by token-cascade efficiency. Live rankings, operator profiles, and yield metrics." (130 chars)

### How to do it on mos2es.com

Check every page's `<meta name="description">` tag. Keep each one ≤155 chars.
You already have good descriptions on the homepage — verify the sub-pages.

---

### Page Titles

**The problem:** 8 pages had titles over 60 chars (Google truncates). 8 pages
had titles under 30 chars (wasted space).

**What we did:** Adjusted all titles to 30-60 characters. Added keywords/USPs
to short titles, trimmed long ones.

**Examples:**
- Before: "SigRank — Privacy-Preserving AI Operator Token Efficiency Leaderboard Rankings and Metrics" (88 chars)
- After: "SigRank · AI Operator Leaderboard" (33 chars)

### How to do it on mos2es.com

Check each page's `<title>` tag. Aim for 30-60 chars. Format:
`Page Name · MO§ES` or `Page Name — MO§ES`

---

### Low Content Pages

**The problem:** 5 pages under 200 words. Search engines see thin content as
low quality.

**What we did:** Added 100-150 words of intro content to each:
- Board pages: intro explaining what the leaderboard shows, how to read it, how to get listed
- `/hall`: context about what the Hall of Signal is and what qualifies
- `/upgrade`: more detail about what supporters get
- `/score/paste`: more context about the paste flow

**Note:** Don't bloat pages that are intentionally minimal (data pages). 100-150
words of intro is enough.

### How to do it on mos2es.com

Check word count on each page. Any page under 200 words should get an intro
paragraph explaining what it is and why it matters.

---

### H1/H2 Issues

**The problem:**
- 5 pages had duplicate H1s (board pages all said "Burners, Builders & 10×ers")
- 18 pages had duplicate H2s (metrics pages all had "The formula" / "What it measures")
- 6 pages had missing H2s
- Heading order issues (H2 before H1, multiple H1s)

**What we did:**
- Board pages: gave each window a unique H1 ("All-Time Leaderboard" vs "30-Day Leaderboard")
- Metrics pages: made H2s unique per page ("The Yield Formula" vs "The Cache Hit Rate Formula")
- Added missing H2s to 6 pages
- Fixed heading order on 2 pages

### How to do it on mos2es.com

Check each page:
- Exactly one H1 per page (should be the page title/topic)
- H2s should be unique per page (don't repeat "Overview" on every page)
- Heading order: H1 → H2 → H3 (never H2 before H1, never skip levels)

---

### Image Size Attributes

**The problem:** 3 images lacked width/height attributes — causes layout shift
(CLS), which is a Google ranking factor.

**What we did:** Added `width` and `height` to 7 images across 3 components.

### How to do it on mos2es.com

Every `<img>` tag should have `width` and `height` attributes:
```html
<img src="img/diagram.png" width="800" height="400" alt="MO§ES architecture diagram">
```

---

### The Mapping Table

This is the internal linking map we built for signalaf.com. Every SEO content
page links to 2-3 related pages. This is the hub-and-spoke structure that
connects everything together.

| Page | Links to |
|------|----------|
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

**The principle:** Each page links to 2-3 pages that are topically related.
This creates a web of internal links that search engines and AI engines can
follow. No page is an island.

---

## Part 2: Academic GEO Mapping

This is the work that connects the live product to the academic foundation.
The goal: **every surface points back to every other surface**, so no matter
which page an AI engine or search engine encounters, it can trace the full
citation graph.

### The Convergence Thesis

The citation graph should be a hub-and-spoke with these hubs:
- **signalaf.com** — the live data product
- **ORCID** — the author identity
- **Zenodo DOIs** — the published papers
- **mos2es.com** — the governance framework
- **GitHub repos** — the code

Every surface should link to every other hub. When an AI engine reads any page
on any surface, it should learn about the full ecosystem.

```
                    ORCID
                      |
           Zenodo DOIs |  GitHub repos
                      | /
    signalaf.com ←----+----→ mos2es.com
                      | \
                      |  signomy.xyz
```

### Organization sameAs

**What we did:** Extended the Organization JSON-LD on signalaf.com with a
`sameAs` array connecting to every surface:

```json
{
  "@type": "Organization",
  "name": "SigRank",
  "url": "https://signalaf.com",
  "sameAs": [
    "https://orcid.org/0009-0002-9904-5390",
    "https://github.com/SunrisesIllNeverSee",
    "https://doi.org/10.5281/zenodo.20029607",
    "https://doi.org/10.5281/zenodo.19105225",
    "https://signomy.xyz",
    "https://mos2es.com"
  ]
}
```

**Why:** AI engines use `sameAs` to connect entities across surfaces. Without
this, each surface is orphaned — the AI engine doesn't know they're related.

### How to do it on mos2es.com

You already have `sameAs` on the homepage Organization schema — good. Verify it
includes:
- ORCID: `https://orcid.org/0009-0002-9904-5390`
- GitHub: `https://github.com/SunrisesIllNeverSee`
- Conservation Law DOI: `https://doi.org/10.5281/zenodo.20029607`
- Experimental Record DOI: `https://doi.org/10.5281/zenodo.19105225`
- signalaf.com: `https://signalaf.com`
- signomy.xyz: `https://signomy.xyz`

---

### ScholarlyArticle Schema

**What we did:** Added a `ScholarlyArticle` JSON-LD builder for the Conservation
Law paper:

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": "https://doi.org/10.5281/zenodo.20029607",
  "headline": "A Conservation Law for Commitment in Language Under Transformative Compression and Recursive Application",
  "url": "https://doi.org/10.5281/zenodo.20029607",
  "author": {
    "@type": "Person",
    "name": "Deric J. McHenry",
    "sameAs": "https://orcid.org/0009-0002-9904-5390"
  },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "datePublished": "2026-05-04",
  "version": "V.05"
}
```

**Why:** This tells Google Dataset Search and AI engines that the site is
grounded in a published conservation law with a Zenodo DOI. It's the
structured-data link between the live product and the theoretical foundation.

### How to do it on mos2es.com

Add ScholarlyArticle schema to `papers.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": "https://doi.org/10.5281/zenodo.20029607",
  "headline": "A Conservation Law for Commitment in Language Under Transformative Compression and Recursive Application",
  "url": "https://doi.org/10.5281/zenodo.20029607",
  "author": {
    "@type": "Person",
    "name": "Deric J. McHenry",
    "sameAs": "https://orcid.org/0009-0002-9904-5390"
  },
  "publisher": { "@id": "https://mos2es.com/#org" },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "datePublished": "2026-05-04",
  "version": "V.05"
}
</script>
```

Add one for each Zenodo deposit (Experimental Record, Harness, P-000 Propositions).

---

### The /science Page

**What we did:** Created a `/science` page on signalaf.com presenting the
academic foundation:
- The Conservation Law statement (C(T(S)) ≈ C(S) with enforcement)
- DOI link to the Zenodo paper
- Empirical record summary (EXP-001 through EXP-007)
- CT architecture (5-layer stack)
- Patent reference (Serial No. 63/877,177)
- Links to all Zenodo deposits
- JSON-LD: ScholarlyArticle + CreativeWork (patent) + BreadcrumbList

**Why:** This is what makes the product credible as a data source. An AI engine
reading `/science` learns that the product is built on a published conservation
law with a Zenodo DOI and an empirical record.

### How to do it on mos2es.com

You already have `papers.html` and `governance-vacuum.html` — these serve a
similar purpose. Consider:
- Adding a `/science.html` or expanding `papers.html` with the full academic
  foundation (Conservation Law statement, empirical record, CT architecture,
  patent reference, all Zenodo DOI links)
- Adding ScholarlyArticle + CreativeWork JSON-LD to that page

---

### llms.txt Academic Expansion

**What we did:** Expanded the llms.txt to teach AI engines about the academic
foundation, not just the product pages:

```
## Academic foundation
- [The Conservation Law of Commitment](https://signalaf.com/science): the theoretical foundation. C(T(S)) ≈ C(S) with enforcement; C(T(S)) < C(S) without it.
- Conservation Law paper (Zenodo, CC-BY-4.0): https://doi.org/10.5281/zenodo.20029607
- Experimental Record (Zenodo): https://doi.org/10.5281/zenodo.19105225
- Commitment Theory (34-paper research program): https://github.com/SunrisesIllNeverSee/Commitment_Theory

## Governance
- MO§ES™ governance framework (patent pending 63/877,177): https://mos2es.com
- SIGNOMY governed agent marketplace: https://signomy.xyz
- GitHub org: https://github.com/SunrisesIllNeverSee
- ORCID: https://orcid.org/0009-0002-9904-5390
```

**Why:** An AI engine reading llms.txt should learn the full ecosystem, not
just the product. When someone asks ChatGPT "what is the Conservation Law of
Commitment?", the AI should be able to trace: llms.txt → /science → Zenodo DOI
→ the paper.

### How to do it on mos2es.com

Your llms.txt already has the academic foundation section — good. Verify it
includes:
- All Zenodo DOIs (Conservation Law, Experimental Record, Harness, P-000)
- The Commitment Theory GitHub repo
- The signalaf.com cross-link
- The ORCID
- The patent reference

---

### Dataset Citation Field

**What we did:** Added a `citation` field to the Dataset JSON-LD on
signalaf.com's `/methodology` page:

```json
{
  "@type": "Dataset",
  "name": "The SigRank Index",
  "citation": "https://doi.org/10.5281/zenodo.20029607",
  "license": "https://creativecommons.org/licenses/by/4.0/"
}
```

**Why:** This tells Google Dataset Search and AI engines that the data is
grounded in the Conservation Law. It's the structured-data link between the
live data product and the theoretical foundation.

### How to do it on mos2es.com

If you add any data/dataset pages (benchmarks, experimental results), add
Dataset JSON-LD with the `citation` field pointing to the Conservation Law DOI.

---

### GitHub Repo SEO

**What we did:** Audited all 40 GitHub repos (22 public) for SEO discoverability.
For each public repo:
- README cross-links to signalaf.com, Zenodo DOIs, other repos
- GitHub topics set (keywords for GitHub search)
- Homepage URL configured (→ signalaf.com or Zenodo)
- Social preview image
- Description accurate and keyword-rich

**The per-repo checklist:**
1. Does the README link to the canonical surfaces?
2. Are GitHub topics set?
3. Is the homepage URL configured?
4. Is there a social preview image?
5. Is the description accurate and keyword-rich?

### How to do it on mos2es.com

For every MO§ES-related GitHub repo:
- `MOS2ES` — add topics: `governance, ai-governance, commitment-conservation, multi-agent, sha256, audit-trail`
- `moses-governance` — add topics + README cross-links to mos2es.com + Zenodo
- `moses-claw-gov` — add topics + cross-links
- `moses-governance-cowork` — add topics + cross-links
- `command-engine` — add topics + cross-links
- `moses-clicky-worker` — add topics + cross-links
- `mos2es-site` — add topics: `static-site, governance, ai-governance, moses`
- `commitment-conservation` — verify DOI badges, add ORCID, add signalaf.com cross-link
- `Commitment_Theory` — add README, topics, cross-links

Set the homepage URL for each repo to `https://mos2es.com` (or the most relevant
canonical surface).

---

### Zenodo Deposit Optimization

**What we did (planned):** For each Zenodo deposit:
- Add ORCID to the deposit metadata
- Add related-identifier cross-links (Conservation Law → Experimental Record → signalaf.com)
- Add keywords matching the site's JSON-LD keywords
- Ensure the Conservation Law deposit links to the Experimental Record deposit

**Why:** Zenodo deposits are academic surfaces. Without ORCID and
related-identifiers, they're orphaned from the author and from each other.
With them, an AI engine reading any deposit can trace the full citation graph.

### How to do it on mos2es.com

For each Zenodo deposit (Conservation Law, Experimental Record, Harness,
P-000 Propositions):
1. Log into Zenodo
2. Edit the deposit
3. Add ORCID: `0009-0002-9904-5390`
4. Add related identifiers:
   - Conservation Law → Experimental Record (isDerivedFrom)
   - Conservation Law → signalaf.com (isReferencedBy)
   - Conservation Law → mos2es.com (isReferencedBy)
5. Add keywords: `commitment conservation, AI governance, multi-agent, MOSES, semantic meaning, recursive compression`
6. Save and publish the updated deposit

---

## Your Checklist for mos2es.com

### Internal linking
- [ ] Add cross-links between all 11 pages (see suggested map above)
- [ ] Verify no page is an orphan (in sitemap but not linked internally)
- [ ] Add all 11 pages to sitemap.xml (currently only 8)

### Security headers
- [ ] Add X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP to netlify.toml

### Meta + titles
- [ ] Verify all meta descriptions ≤155 chars
- [ ] Verify all page titles 30-60 chars
- [ ] Verify exactly one H1 per page
- [ ] Verify H2s are unique per page
- [ ] Verify heading order (H1 → H2 → H3)

### Content
- [ ] Add intro content to any page under 200 words
- [ ] Add `alt` text to all images
- [ ] Add `width` and `height` to all `<img>` tags

### Academic GEO
- [ ] Verify Organization `sameAs` includes ORCID + all Zenodo DOIs + signalaf.com + signomy.xyz
- [ ] Add ScholarlyArticle JSON-LD to papers.html (one per Zenodo deposit)
- [ ] Add BreadcrumbList JSON-LD to all sub-pages
- [ ] Add DefinedTerm JSON-LD for each key concept (Conservation Law, Lineage Claw, etc.)
- [ ] Expand llms.txt with all Zenodo DOIs + Commitment Theory repo + ORCID + patent
- [ ] Add GitHub topics to all MO§ES-related repos
- [ ] Set homepage URL on all repos → mos2es.com
- [ ] Add ORCID + related-identifiers to all Zenodo deposits
- [ ] Add cross-links to READMEs of all MO§ES GitHub repos

### Verification
- [ ] Run Screaming Frog crawl (before and after fixes)
- [ ] Validate JSON-LD at validator.schema.org
- [ ] Test rich results at search.google.com/test/rich-results
- [ ] Preview OG cards at opengraph.xyz
- [ ] Submit sitemap to Google Search Console
- [ ] Push all URLs to IndexNow
- [ ] Run citation query test (10 queries, incognito, across ChatGPT/Perplexity/Claude)

---

*Built from the signalaf.com page-level SEO beef-up (Screaming Frog crawl 1 →
fix campaign → crawl 2) and the academic GEO mapping strategy (Conservation Law
→ Zenodo → ORCID → GitHub → live product convergence). Apply the same
disciplines, adapt for static HTML, and re-audit quarterly.*
