---
type: Reference
title: uploads/slides/ + .stash/ — deck source content and stashed pages
description: Reference doc for uploads/slides/ (11 slide folders with markdown source + edit notes) and .stash/ (operator.html, resume.html backup). Relationship to deck.html.
tags: [mos2es, reference, deck, slides, stash]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:03 UTC
---

# uploads/slides/ + .stash/ — Deck Source & Stash

## uploads/slides/ — Pitch Deck Source Content

**Path:** `uploads/slides/`
**Structure:** 11 folders, 22 files (each folder has a content `.md` + an `-edits.md`
review file).

### Relationship to deck.html

The markdown files in `uploads/slides/` contain structured content that appears to be
source material for the pitch deck. However, the current `deck.html` is branded "Ello Cello"
while the markdown is branded "MO§ES™" — suggesting either an alternative/earlier version,
extracted content for review, or multiple deck versions. See [pages/deck.md](../pages/deck.md).

### Slide folder inventory

| Folder | File(s) | Content summary |
|--------|---------|-----------------|
| `01-cover` | `01-cover.md`, `01-cover-edits.md` | Cover: MO§ES™ "Sovereign Signal Governance" with TCP/IP analogy. Round: Seed · $1.5M SAFE. |
| `02-problem` | `02-problem.md`, `02-problem-edits.md` | Problem: no evals/metrics exist for operator contribution to AI systems. Every benchmark measures the model, not the operator. |
| `03-commitment-theory` | `03-commitment-theory.md`, `03-commitment-theory-edits.md` | Commitment Theory: thermodynamics applied to language. Shannon bracketed semantics in 1948; MO§ES opens the bracket. Formula: `C(T(S)) ≈ C(S)`. |
| `04-traction-benchmarks` | `04-traction-benchmarks.md`, `04-traction-benchmarks-edits.md` | Traction: 5 measured kernels vs field average. 98 sessions, 1,465 tasks, 35,242 LOC. 110× compression, 5.8× fewer tokens. DOI: 10.5281/zenodo.18792459. |
| `05-competitive-field` | `05-competitive-field.md`, `05-competitive-field-edits.md` | Competitive landscape: MO§ES alone in upper-right quadrant (high enforcement × high efficiency). Categories: Code Agents, Eval/Guard, Model Providers. |
| `06-moat-traction` | `06-moat-traction.md`, `06-moat-traction-edits.md` | Moat: 4 U.S. Patent Filings, 5 Zenodo Releases, 1 Conservation Law, zero refutations. Traction: 5 products (SIGRANK, SIGNOMY, AQUA, KASSA, GROK). |
| `07-market-why-now` | `07-market-why-now.md`, `07-market-why-now-edits.md` | Market timing: AI stack has no governance primitive. Why now: agent commerce 2026, no operator-augmented benchmark, EU AI Act convergence. Floor case: $3.25M ARR. |
| `08-tam` | `07a-tam.md`, `07a-tam-edits.md` | TAM: $18–25B today, $110–142B by 2030. Four product layers, four markets. TAM/SAM/SOM breakdown. **Note:** file named `07a-tam.md` (not `08-tam.md`) — naming inconsistency. |
| `09-founder` | `08-founder.md`, `08-founder-edits.md` | Founder: Deric J. McHenry, Buffalo, NY. 15+ years at DJMP Inc. ($1M/yr, team of 40). Sole architect. Solo founder key man risk flagged. |
| `10-the-ask` | `09-the-ask.md`, `09-the-ask-edits.md` | Ask: $1.5M SAFE. 18-month runway to land first 50 enterprise design partners + publish protocol v1 spec. Use of funds: 40% Eng, 30% Research, 20% GTM, 10% Reserve. |
| `11-the-law` | `10-the-law.md`, `10-the-law-edits.md` | Closing: "Commitment is conserved under transformation when enforcement is applied." CTA: book 20-min walkthrough at MOS2ES.COM. |

### Edit notes (key flagged issues across all slides)

The `-edits.md` files contain reviewer feedback. Critical issues flagged:

1. **07-market-why-now:** Missing TAM/SAM/SOM (addressed in `08-tam` folder), undefined
   revenue model, missing financial projections, vague GTM.
2. **05-competitive-field:** Incomplete competitive analysis — scatter plot positions
   asserted without methodology. Missing competitors (CrewAI, LlamaIndex, AutoGen,
   Braintrust, Patronus, Galileo).
3. **09-founder:** Solo founder key man risk. Options: name advisor, lean into it
   explicitly, or name the hire this raise enables.
4. **10-the-ask:** Vague GTM strategy ("50 enterprise design partners" is target, not
   strategy). Missing scaling strategy and financial projections breakdown.
5. **06-moat-traction:** Ambiguous traction metrics (what does "SIGNOMY 27" mean? what's
   the status of each product?). No product visuals.
6. **02-problem:** Needs real-world governance failure example for emotional impact.
7. **03-commitment-theory:** High technical cognitive load — needs plain-English one-liner
   before the equation.

Quick wins flagged across slides: improve contact professionalism (business domain email),
define technical abbreviations (LOC, pp), add status labels (live/beta/internal/filed),
make CTAs clickable, add milestone markers.

### Naming inconsistency

Folder `08-tam` contains file `07a-tam.md` (not `08-tam.md`). Similarly, folder `09-founder`
contains `08-founder.md`, `10-the-ask` contains `09-the-ask.md`, `11-the-law` contains
`10-the-law.md`. This suggests renumbering or insertion during deck evolution. Consider
renaming files to match folder names for consistency.

---

## .stash/ — Stashed Pages

**Path:** `.stash/`
**Files:** `operator.html`, `resume.html`

### .stash/resume.html

Older version of the root `resume.html`. Same structure and styling (Newsreader/IBM Plex
Sans/IBM Plex Mono, paper/ink color scheme). Similar content with some wording differences.

**Status:** Backup or earlier draft. The root `resume.html` is the active version. See
[pages/resume.md](../pages/resume.md).

### .stash/operator.html

Standalone personal profile/portfolio page for Deric J. McHenry. Different design system
from `resume.html` — uses the main site's dark theme (`#0A0D12` background, gold `#C4923A`
accents, Playfair Display/DM Sans/DM Mono fonts).

**Sections:** Contact, Interests, Papers, Patents, Products, Current.
**Contact:** `burnmydays@proton.me`, LinkedIn, X/Twitter, GitHub.
**Links to:** `papers.html`, `governance-vacuum.html`, `index.html`, `benchmarks.html`,
`signomy.xyz`, KASSA demo.

**Status:** Not referenced by the main site navigation. Could be:
- An alternative profile for operator-focused audiences
- A draft page that was never integrated
- A supplementary page for specific use cases

---

## Recommendations

### For uploads/slides/
1. **Clarify relationship to deck.html:** Determine whether the markdown is source content
   to sync, an alternative/earlier version to archive, or review material to delete after
   edits are applied.
2. **Fix naming inconsistency:** Rename `07a-tam.md` → `08-tam.md` (and similarly for
   `08-founder.md`, `09-the-ask.md`, `10-the-law.md`) to match folder names.
3. **Consider archiving:** If the markdown is review material already incorporated into
   `deck.html`, consider moving `uploads/slides/` to `_archive/uploads/slides/`.

### For .stash/
1. **resume.html:** Keep as backup, delete if confident in git history, or move to
   `_archive/.stash/` if not actively used.
2. **operator.html:** Determine purpose — add to nav if active, archive if obsolete, or
   document its use case if for specific audiences.
