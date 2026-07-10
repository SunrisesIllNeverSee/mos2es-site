---
type: Reference
title: legal.html — legal & IP
description: Reference doc for the MO§ES legal & IP page (legal.html). Patent portfolio, trademark record, IC 042 summary, and licensing surfaces.
tags: [mos2es, reference, pages, legal, ip]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:00 UTC
---

# legal.html — Legal & IP

**File:** `legal.html` (repo root)
**Title:** "MO§ES™ — Legal & IP"
**Meta description:** "MO§ES patent portfolio, trademark record, IC 042 summary, and licensing surfaces."

## Purpose

Legal documentation page listing the patent portfolio with filing numbers, dates,
confirmation numbers, and protected layers, plus the IC 042 trademark summary.

## Key sections (H1/H2 outline)

- H1: "Legal & IP"
- Label: "Patent Portfolio" (table with 5 rows: 4 PPAs + Trademark)
- Label: "IC 042 Summary" (blockquote)
- Label: "Protected Pillars" (3 cards: Compression Gating, Lineage Tracking, Hardware Anchoring)

## JSON-LD structured data

None.

## Nav links

| Label | Target |
|-------|--------|
| Home | `index.html` |
| Papers | `papers.html` |
| Benchmarks | `benchmarks.html` |
| Press | `press.html` |
| Field Sheet | `field-sheet.html` |
| Deck | `deck.html` |
| Articles | `governance-vacuum.html` |
| Demo | `demovideo.html` |
| Run | https://signomy.xyz/moses |

## External dependencies

- Google Fonts: Playfair Display, DM Sans, DM Mono (via `fonts.googleapis.com`)
- Inline CSS (~10 lines, minified, lines 11–13)
- No inline JavaScript

## Notes

- Patent serial numbers are the canonical source of truth across the site. If filing
  status changes, update here first, then propagate to `index.html`, `field-sheet.html`,
  `press.html`, and `resume.html`.
