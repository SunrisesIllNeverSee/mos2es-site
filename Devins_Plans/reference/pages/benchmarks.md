---
type: Reference
title: benchmarks.html — sovereign signal benchmarks
description: Reference doc for the MO§ES benchmarks page (benchmarks.html). Five measured kernels vs Artificial Analysis Coding Agent Index field average.
tags: [mos2es, reference, pages, benchmarks]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:59 UTC
---

# benchmarks.html — Sovereign Signal Benchmarks

**File:** `benchmarks.html` (repo root)
**Title:** "MO§ES™ — Five Measured Kernels · Sovereign Signal Benchmarks"
**Meta description:** "MO§ES leads all 5 measured economic categories vs. the Artificial Analysis Coding Agent Index field average: cache hit rate 94.66%, output:input 17.9×, tokens per task 810K, time per task 1.84 min, cost per LOC $0.0007..."

## Purpose

Benchmark comparison page showing MO§ES performance metrics against the Artificial
Analysis Coding Agent Index, with live HTML poster embeds and downloadable assets.

## Key sections (H1/H2 outline)

- H1: "Five measured kernels. One operator."
- Label: "Honest Comparison · MO§ES vs. Raw Field Average"
- Label: "Honest Comparison · Portrait · With Cross-Cost Analysis"
- Label: "The Five Kernels" (stat grid with 5 metrics)
- Label: "From Five Token Categories" (raw token breakdown)
- Label: "Methodology · Not the Same Thing Being Measured"
- Label: "VI · The Full Instrument"
- Label: "Downloads"

## JSON-LD structured data

None.

## Nav links

| Label | Target |
|-------|--------|
| Home | `index.html` |
| Papers | `papers.html` |
| Architecture | `architecture.html` |
| Field Sheet | `field-sheet.html` |
| Deck | `deck.html` |
| Articles | `governance-vacuum.html` |
| Press | `press.html` |
| Legal | `legal.html` |

## External dependencies

- Google Fonts: Playfair Display, DM Sans, DM Mono (via `fonts.googleapis.com`)
- Inline CSS (~60 lines, lines 29–93)
- Iframe embeds: `img/benchmarks/poster.html`, `poster_honest.html`, `poster_honest_portrait.html`
- External link: https://artificialanalysis.ai/agents/coding-agents
- No inline JavaScript

## Notes

- **Sole consumer** of benchmark assets in `img/benchmarks/` (14 references).
- See [assets/benchmarks.md](../assets/benchmarks.md) for the full benchmark asset inventory.
- **Hard rule:** do NOT modify HTML chart values or re-export screenshots without explicit
  instruction (see `.claude/session_notes.md` — 2026-05-21 incident).
