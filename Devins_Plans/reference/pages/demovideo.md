---
type: Reference
title: demovideo.html — demo video
description: Reference doc for the MO§ES demo video page (demovideo.html). Video player with Loom placeholder and link to live SigRank demo.
tags: [mos2es, reference, pages, demo, video]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:59 UTC
---

# demovideo.html — Demo Video

**File:** `demovideo.html` (repo root)
**Title:** "MO§ES™ — Demo Video"
**Meta description:** "MO§ES product demo video — a walkthrough of governed execution and the SigRank application workflow."

## Purpose

Video player page for the product demo with a placeholder for the Loom embed and a link to
the live SigRank demo on Hugging Face.

## Key sections (H1/H2 outline)

- H1: "Demo"
- Lede paragraph
- Video player container (placeholder with "Demo video coming soon")
- CTA: "Try SigRank live →"
- Meta chips (mos2es.com, signomy.xyz, Patent pending)

## JSON-LD structured data

None.

## Nav links

| Label | Target |
|-------|--------|
| Home | `index.html` |
| Benchmarks | `benchmarks.html` |
| Architecture | `architecture.html` |
| Papers | `papers.html` |
| Deck | `deck.html` |
| Run | https://signomy.xyz/moses |

## External dependencies

- Google Fonts: Playfair Display, DM Sans, DM Mono (via `fonts.googleapis.com`)
- Inline CSS (~15 lines, lines 11–28)
- Hugging Face Space: https://huggingface.co/spaces/build-small-hackathon/sigrank
- Loom embed (placeholder URL in `VIDEO_URL` constant)
- Inline JavaScript: video embed logic (lines 60–107)

## Notes

- `VIDEO_URL` is a placeholder — the actual demo video is not yet published.
