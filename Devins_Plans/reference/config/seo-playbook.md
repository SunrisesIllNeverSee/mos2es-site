---
type: Reference
title: SEO/GEO/AEO Playbook — summary
description: Reference doc describing the owner-curated SEO_GEO_AEO_PLAYBOOK.md. Summary only — do not copy content. Links to the source file.
tags: [mos2es, reference, config, seo, geo, aeo, playbook]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:02 UTC
---

# SEO/GEO/AEO Playbook — Summary

**Source file:** [`SEO_GEO_AEO_PLAYBOOK.md`](../../../SEO_GEO_AEO_PLAYBOOK.md) (repo root,
~22 KB)

> **Owner-curated — do not touch.** Listed in CLAUDE.md do-not-touch list. This doc only
> describes it and links to it; it does not copy content.

## What it is

A teaching document walking through the full SEO/GEO/AEO implementation shipped on
`signalaf.com` (SigRank), so the same playbook can be applied to `mos2es.com`.

- **Reference site:** signalaf.com (Next.js 15, ~145 URLs, Vercel-hosted)
- **Target site:** mos2es.com (static HTML, 11 pages, Netlify-hosted)
- Principles are framework-agnostic; implementation details differ.

## Structure (table of contents)

1. What is SEO vs GEO vs AEO?
2. The 7-Phase Implementation (what was shipped)
   - Phase 1 — Fix the OG Image
   - Phase 2 — JSON-LD Structured Data
   - Phase 3 — llms.txt
   - Phase 4 — Per-Page Dynamic OG Images
   - Phase 5 — npm + GitHub Discoverability
   - Phase 6 — Content Layer (34 pages)
   - Phase 7 — Screaming Frog Site Audit
3. Post-Audit — Indexing Push
4. The Maintenance Cadence
5. What to Expect: Timeline and Results
6. What NOT to Do
7. Your Checklist for mos2es.com
8. Tools

## Relationship to the site

- The playbook explains the strategy behind the JSON-LD blocks, `llms.txt`, `sitemap.xml`,
  and OG images already present on mos2es.com.
- It is the canonical reference for any SEO/GEO/AEO work on this site. Read it before
  proposing changes to structured data, OG images, or AI discoverability config.

## What NOT to do

- Do not copy playbook content into this reference doc — it's owner-curated.
- Do not modify the playbook without owner approval.
- Do not modify JSON-LD blocks, `llms.txt`, `sitemap.xml`, or `robots.txt` without owner
  approval (all listed in CLAUDE.md do-not-touch list).
