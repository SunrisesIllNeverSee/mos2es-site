---
type: Reference
title: index.html — homepage
description: Reference doc for the MO§ES homepage (index.html). Covers purpose, sections, JSON-LD, nav, dependencies, inline CSS/JS.
tags: [mos2es, reference, pages, homepage]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:59 UTC
---

# index.html — Homepage

**File:** `index.html` (repo root)
**Title:** "MO§ES™ — Sovereign Signal Governance"
**Meta description:** "MO§ES is the protocol layer for preserving semantic meaning at point of execution: commitment conservation, governance enforcement, and lineage-bound artifacts."

## Purpose

Main landing page introducing MO§ES™ as a sovereign signal governance protocol for AI
execution. Drives toward funding/collaboration call-to-action.

## Key sections (H1/H2 outline)

- Hero: "MO§ES™" wordmark + "Sovereign Signal Governance" tagline
- § I — The Law: `C(T(S)) ≈ C(S)`
- § II — The Inversion: "The headline is not 80–85%. The headline is 41%."
- § III — Proof Highlights (KASSA, Grok Stress Thread, Zenodo DOI, 4 Filings + TM)
- § IV — Signomy Execution Layer (3 governance layers)
- § V — Patent Portfolio (4 patent serials)
- § VI — What It Produces (CIVITAE/Signomy, KASSA, Command, Agent Universe)
- § VII — Thesis + Audience (Investors, Operators & Builders, Regulators & Lawyers)
- § VIII — The Ask (Funding, SAFE, angel, collaboration)

## JSON-LD structured data

- `Organization` (founder, knowsAbout, sameAs → ORCID, GitHub, Zenodo, signalaf.com, signomy.xyz)
- `WebSite`
- `CreativeWork` (MO§ES Enforcement Architecture patent)

> **Owner-curated — do not touch JSON-LD blocks.**

## Nav links

| Label | Target |
|-------|--------|
| Home | `index.html` |
| Papers | `papers.html` |
| Benchmarks | `benchmarks.html` |
| Legal | `legal.html` |
| Press | `press.html` |
| Field Sheet | `field-sheet.html` |
| Deck | `deck.html` |
| Articles | `governance-vacuum.html` |
| Demo | `demovideo.html` |
| Run | https://signomy.xyz/moses |

## External dependencies

- Google Fonts: Playfair Display, DM Sans, DM Mono (via `fonts.googleapis.com`)
- Inline CSS (~700 lines, lines 81–860)
- No external JS libraries, no inline JavaScript

## Notes

- Largest page on the site (~40 KB). Carries the canonical Organization JSON-LD.
- Design system: dark theme `#0A0D12` background, gold accent `#C4923A`.
