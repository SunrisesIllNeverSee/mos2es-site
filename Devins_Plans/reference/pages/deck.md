---
type: Reference
title: deck.html — pitch deck
description: Reference doc for the Ello Cello pitch deck (deck.html). Single-page HTML slide presentation powered by deck-stage.js.
tags: [mos2es, reference, pages, deck, investor]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:59 UTC
---

# deck.html — Pitch Deck

**File:** `deck.html` (repo root)
**Title:** "Ello Cello — Pitch"
**Meta description:** none

## Purpose

Investor pitch deck as a single-page HTML slide presentation. Covers problem, solution,
architecture, proof, market, motion, team, and ask.

## Key sections (H1/H2 outline)

- Cover slide with "Ello Cello" wordmark
- Multiple section slides (eyebrow-labeled)
- Data tables and quadrant plots
- Product cards (AQUA, SigRank, SIGNOMY)
- Filter slide with taxonomy spine chart
- Founder placeholder (uses `assets/founder.jpg`)
- Pull quotes

## JSON-LD structured data

None.

## Nav links

No navigation links — standalone pitch deck.

## External dependencies

- Google Fonts: Newsreader, IBM Plex Sans, IBM Plex Mono, Playfair Display (via `fonts.googleapis.com`)
- Inline CSS (~300 lines, lines 9–398)
- External JS: `deck-stage.js` (referenced at line 1042) — see [scripts/frontend.md](../scripts/frontend.md)
- Inline speaker notes JSON (lines 410–421)
- Image: `assets/founder.jpg` (line 851) — see [assets/images.md](../assets/images.md)

## Notes

- Branded "Ello Cello" rather than "MO§ES™" — differs from the `uploads/slides/` markdown
  source content (which is MO§ES™-branded). See [deck/slides.md](../deck/slides.md) for the
  relationship between the markdown source and this HTML deck.
- Speaker notes are embedded as `<script type="application/json" id="speaker-notes">`.
