# Reference Plans — signalaf.com SEO/GEO/AEO Implementation

These are the original plan documents from the signalaf.com implementation.
They're the source material that the two teaching docs
(`SEO_GEO_AEO_PLAYBOOK.md` and `SEO_BEEFUP_AND_ACADEMIC_GEO.md` in the
repo root) were built from.

## What's in here

| File | What it is |
|------|-----------|
| `SEO_GEO_PLAN.md` | The original 7-phase SEO/GEO implementation plan (OG images, JSON-LD, llms.txt, dynamic OG, npm/GitHub, content layer modeled on Mettle, Screaming Frog). All phases shipped. |
| `SEO_AEO_GEO_MAINTENANCE.md` | The upkeep playbook — weekly/monthly/quarterly/annual cadence. Citation tracking, Screaming Frog re-crawls, content decay, llms.txt audits. |
| `ACADEMIC_GEO_IMPLEMENTATION.md` | The signalaf.com-side changes to connect the live product to the academic foundation (Organization sameAs, ScholarlyArticle, /science page, llms.txt expansion, Dataset citation field). |
| `ACADEMIC_GEO_MAPPING_PROMPT.md` | The full ecosystem mapping prompt — audits 40 GitHub repos, Zenodo deposits, live sites, and builds a unified linking strategy so every surface points to every other. |

## The Mettle connection

The content layer (Phase 6 in `SEO_GEO_PLAN.md`) was modeled on Mettle
(getmettle.app) — Daniel Kapadia's AI-powered trading journal app. Mettle
had ~33 content pages with a clean structure: comparison, alternatives,
guides, metrics, tools, topic hubs, blog. We mapped that structure 1:1
and built the equivalent for SigRank with 34 pages.

## How to use these

1. Read the two teaching docs in the repo root first — they're adapted for mos2es.com
2. Use these reference plans when you need the full detail or want to see exactly what we did
3. Run a fresh Screaming Frog crawl on mos2es.com — don't reuse old signalaf.com crawl data
