---
type: Plan
title: SEO Steroid Build-Out — Execution Plan
description: Full execution plan to close the gap between mos2es.com (11 pages, 0 content layer) and signalaf.com (145+ URLs, 34 content pages, 15 schema types, llms.txt + llms-full.txt). Maps signalaf.com's strategy to the MO§ES domain.
tags: [mos2es, seo, geo, aeo, content-layer, execution-plan, steroid-buildout, json-ld, llms-txt]
timestamp: 2026-07-10
last_touched: 2026-07-10 10:30 UTC
---

# SEO Steroid Build-Out — Execution Plan

## The Gap

| Metric | signalaf.com | mos2es.com | Gap |
|--------|-------------|------------|-----|
| Total URLs | 145+ | 11 | 134+ |
| Content pages | 34 | 0 | 34 |
| Schema types | 15 | 3 (Organization, WebSite, BreadcrumbList*) | 12 |
| JSON-LD blocks | 53+ | 33 (but only 3 types) | breadth |
| llms.txt | 116 lines + llms-full.txt (202 lines) | exists but minimal | major |
| Internal linking | 6-column footer, 29 links | basic nav | major |
| GitHub repo SEO | done (topics, homepage, README) | partial | 3 repos need work |
| Academic GEO | ScholarlyArticle, Dataset, DefinedTerm, Patent | none | critical |

*BreadcrumbList exists in the playbook but was NOT added to mos2es.com pages.

## The Plan — 5 Waves

### Wave 1: Academic GEO Layer (the foundation)
**Why first:** This is what makes AI engines cite your work. Without it, ChatGPT/Perplexity/Claude have no structured data to extract.

**1.1 — Add ScholarlyArticle JSON-LD to papers.html**
- One ScholarlyArticle block per Zenodo deposit
- Fields: headline, description, datePublished, author (with ORCID), license (CC-BY-4.0), citation, isPartOf
- 4 deposits: Conservation Law, Experimental Record, Transformation Harness, P-000 Propositions

**1.2 — Add Dataset JSON-LD to papers.html**
- One Dataset block per Zenodo deposit with data
- Fields: name, description, url, sameAs (DOI), creator, publisher, license, citation, keywords, distribution
- 3 datasets: Experimental Record, Transformation Harness, P-000 Propositions

**1.3 — Add DefinedTerm JSON-LD to papers.html + architecture.html**
- One DefinedTerm per key concept
- Concepts: Conservation Law of Commitment, Lineage Claw, Origin Binding, Recursive Compression, Governance Enforcement Layer, Commitment Conservation, Signal Encoding, Constitutional Substrate
- Fields: name, description, url, inDefinedTermSet (DefinedTermSet: "MO§ES Concepts")

**1.4 — Add BreadcrumbList JSON-LD to all sub-pages**
- Home → [Page] breadcrumb on every page except index
- 10 pages get BreadcrumbList

**1.5 — Add CreativeWork JSON-LD for patents to legal.html (or field-sheet)**
- One CreativeWork per patent application
- Fields: name, description, url, copyrightHolder, creator, datePublished
- 4 PPAs + 1 Utility + 1 Trademark

**1.6 — Expand Organization sameAs in existing JSON-LD**
- Add ORCID: 0009-0002-9904-5390
- Add all 4 Zenodo DOIs
- Add signalaf.com
- Add signomy.xyz
- Add GitHub org
- Add npm packages (sigrank, sigrank-mcp)

**Result:** mos2es.com goes from 3 schema types to 8. AI engines can now extract papers, datasets, concepts, and patents as structured data.

---

### Wave 2: Content Layer (the steroids)
**Why second:** This is what captures long-tail search traffic. Each page targets one search intent and gives AI engines one citable definition.

**Domain mapping — signalaf.com → mos2es.com:**

| signalaf.com category | signalaf.com topic | mos2es.com equivalent | mos2es.com topic |
|----------------------|-------------------|----------------------|-----------------|
| /metrics/ (6 pages) | Yield, Cache Hit, SNR, etc. | /concepts/ (6-8 pages) | Conservation Law, Lineage Claw, Origin Binding, Recursive Compression, Governance Enforcement, Commitment Conservation, Signal Encoding, Constitutional Substrate |
| /guides/ (7 pages) | How to measure, improve, reduce | /guides/ (5-7 pages) | How to enforce commitment conservation, How to audit multi-agent transformations, How to implement governance at execution, How to verify lineage, How to measure semantic commitment |
| /vs/ (5 pages) | vs ccusage, vs Copilot, etc. | /vs/ (4-5 pages) | vs Constitutional AI, vs AI alignment frameworks, vs RLHF, vs guardrails, vs agent orchestration frameworks |
| /alternatives/ (4 pages) | Alternatives to ccusage, etc. | /alternatives/ (3-4 pages) | Alternatives to AI governance frameworks, Alternatives to agent guardrails, Alternatives to commitment tracking |
| /tools/ (4 pages) | Yield calculator, etc. | /tools/ (2-3 pages) | Commitment conservation calculator, Lineage verification checker |
| Topic hubs (6 pages) | AI benchmarking, cascade analysis | Topic hubs (4-5 pages) | AI governance, commitment conservation, multi-agent systems, constitutional AI, agent governance |
| /blog/ (2 pages) | Best AI coding tools, benchmarking | /blog/ (2-3 pages) | The governance vacuum (already exists), Why AI deployments fail, The execution layer |
| /faq/ (new) | — | /faq/ (1 page) | 15-20 Q&A pairs about MO§ES, commitment conservation, governance enforcement |

**Total new pages: 28-32**

**Each page includes:**
- Canonical, OG, Twitter tags (from the SEO system we already built)
- JSON-LD: BreadcrumbList + FAQPage + (DefinedTerm | HowTo | ScholarlyArticle depending on type)
- 3-5 FAQ items with substantive answers
- Cross-links to related pages
- Footer with all content page links
- 800-1,500 words

**Page template (static HTML):**
```html
<!doctype html>
<html lang="en">
<head>
  <!-- Shared SEO head (canonical, OG, Twitter, fonts) -->
  <!-- Page-specific JSON-LD (BreadcrumbList + FAQPage + type-specific) -->
</head>
<body>
  <!-- Shared nav -->
  <main>
    <h1>Page Title</h1>
    <p>Lead paragraph (the citable definition — first 1-2 sentences AI engines extract)</p>
    <!-- Content sections with H2s -->
    <!-- FAQ section -->
    <!-- Related pages -->
  </main>
  <!-- Shared footer with content page links -->
</body>
</html>
```

**Result:** mos2es.com goes from 11 pages to 39-43 pages. Sitemap goes from 10 URLs to 37-41 URLs. Long-tail search coverage.

---

### Wave 3: llms.txt Expansion (the AI discovery layer)
**Why third:** Now that the content exists, tell AI engines where it is.

**3.1 — Expand llms.txt**
- Add all new content pages (concepts, guides, vs, alternatives, tools, topic hubs, blog, FAQ)
- Add academic foundation section (4 Zenodo DOIs, ORCID, Commitment Theory repo)
- Add governance section (MO§ES, Signomy, GitHub, patents)
- Add UTM tracking: `?utm_source=ai&utm_medium=answer_engine`
- Target: 55+ links (matching signalaf.com)

**3.2 — Create llms-full.txt**
- Inline full definitions for all 8 concepts
- Inline key formulas (C(T(S)) ≈ C(S), conservation law, lineage verification)
- Inline governance tier ladder
- Inline headline stats (benchmark results, cache hit rate, cost/LOC)
- Inline patent portfolio summary
- Citing MO§ES block with citation format
- Target: 200+ lines (matching signalaf.com)

**Result:** AI engines (ChatGPT, Perplexity, Claude, Google AI Overviews) get a complete map of the site + inlined definitions they can cite directly.

---

### Wave 4: Internal Linking + Footer (the connective tissue)
**Why fourth:** Content exists, AI knows about it, now make sure Google can crawl it all.

**4.1 — Build shared footer with content page links**
- 5-column layout (matching signalaf.com's 6-column):
  - Concepts: Conservation Law, Lineage Claw, Origin Binding, Recursive Compression
  - Guides: Enforce Commitment Conservation, Audit Multi-Agent Transformations, Implement Governance
  - Compare: vs Constitutional AI, vs RLHF, vs Guardrails
  - Explore: AI Governance, Commitment Conservation, Multi-Agent Systems, Constitutional AI
  - Foundation: Papers, Architecture, Field Sheet, Benchmarks, FAQ
- Every page links to every other page (within 3 clicks)

**4.2 — Add cross-link sections to each content page**
- Each page links to 2-3 related pages at the bottom
- Topic hubs link to all pages in their cluster

**4.3 — Update sitemap.xml**
- Add all 28-32 new pages
- Set priorities (homepage 1.0, core pages 0.8, content pages 0.6-0.7)
- Set change frequencies (monthly for content, weekly for core)

**4.4 — Re-submit sitemap to GSC + push to IndexNow**
- Submit updated sitemap
- Push all new URLs to IndexNow (Bing, Yandex)
- Push all new URLs to Google Indexing API

**Result:** 0 orphan pages. Every page discoverable from every other page. Google + Bing notified of all new content.

---

### Wave 5: GitHub Repo SEO + Verification (the polish)
**Why last:** External surfaces and final verification.

**5.1 — Fix GitHub repos that need work**
- **signa**: Add topics (ai-agents, token-cascade, coaching, mcp, model-context-protocol), set homepage
- **fundscore**: Add description, add topics (investor-readiness, startup, scoring), set homepage
- **Commitment_Theory**: Verify topics include (commitment-theory, conservation-law, semantic-information, shannon)
- **commitment-conservation**: Verify topics include (conservation-law, commitment, information-theory)
- **MOS2ES**: Verify topics include (ai-governance, constitutional-ai, multi-agent, commitment-conservation)
- **agent-universe**: Verify topics include (agent-marketplace, signomy, ai-agents)
- **moses-clicky-worker**: Verify topics include (moses, governance, cloudflare-worker)
- **Mos2es_Signomy**: Verify topics include (moses, civitae, governance, licensing)

**5.2 — Add cross-links to READMEs**
- Each MO§ES-related repo README should link to mos2es.com
- Each repo should mention the Conservation Law + DOI
- Each repo should link to sibling repos (SigRank, Signomy, Commitment_Theory)

**5.3 — Add ORCID + related-identifiers to Zenodo deposits**
- Add ORCID 0009-0002-9904-5390 to all 4 Zenodo deposits
- Add related-identifiers linking deposits to each other
- Add related-identifiers linking to GitHub repos
- Add related-identifiers linking to mos2es.com

**5.4 — Verification**
- Validate all JSON-LD at validator.schema.org
- Test rich results at search.google.com/test/rich-results
- Preview OG cards at opengraph.xyz
- Run citation query test (10 queries, incognito, across ChatGPT/Perplexity/Claude)
- Re-run Screaming Frog crawl (should see 40+ pages, 0 issues)

---

## Execution Order + Dependencies

```
Wave 1 (Academic GEO) ──→ Wave 3 (llms.txt) ──→ Wave 5 (GitHub + Verify)
         │                                              ↑
         ↓                                              │
Wave 2 (Content Layer) ──→ Wave 4 (Linking + Sitemap) ──┘
```

**Wave 1 and Wave 2 can run in parallel.** Wave 3 depends on Wave 2 (need pages to link to). Wave 4 depends on Wave 2 (need pages to link). Wave 5 depends on everything.

## Effort Estimate

| Wave | Pages/Files | Effort | Can Parallelize? |
|------|------------|--------|-----------------|
| 1 — Academic GEO | 6 JSON-LD types across 11 pages | Medium | Yes (subagents) |
| 2 — Content Layer | 28-32 new HTML pages | High | Yes (subagents by category) |
| 3 — llms.txt | 2 files | Low | No (after Wave 2) |
| 4 — Linking + Sitemap | Footer + sitemap + 28-32 page cross-links | Medium | Yes (after Wave 2) |
| 5 — GitHub + Verify | 8 repos + 4 Zenodo + verification | Medium | Yes (subagents) |

## What This Gets You

| Metric | Current | After Build-Out |
|--------|---------|----------------|
| Total pages | 11 | 39-43 |
| Sitemap URLs | 10 | 37-41 |
| Schema types | 3 | 8+ |
| JSON-LD blocks | 33 | 80+ |
| llms.txt links | ~10 | 55+ |
| llms-full.txt | doesn't exist | 200+ lines |
| Internal links per page | 7-10 | 25+ |
| Long-tail search coverage | 0 queries | 30+ intent targets |
| AI citation targets | 0 | 8 concepts + 5 guides + 5 comparisons |

## Decisions Needed

1. **Content page count:** Full 28-32 pages, or start with 10-15 and expand later?
2. **Concept pages:** What are the 6-8 key concepts to define? (I proposed: Conservation Law, Lineage Claw, Origin Binding, Recursive Compression, Governance Enforcement, Commitment Conservation, Signal Encoding, Constitutional Substrate)
3. **Comparison pages:** What frameworks to compare against? (Constitutional AI, RLHF, guardrails, agent orchestration, alignment frameworks?)
4. **Tools:** Build interactive calculators (JS), or static definition pages?
5. **Blog:** Convert governance-vacuum.html to /blog/ structure, or keep it standalone?
6. **FAQ:** One big FAQ page, or FAQ section on each content page (like signalaf.com)?
7. **Build system:** Build the 28-32 pages as static HTML (matching current site), or set up 11ty first?
