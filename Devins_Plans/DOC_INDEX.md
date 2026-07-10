---
type: Reference
title: Doc Index — status map of every doc
description: Dated index of every doc in the docs directory, classified ACTIVE / REFERENCE / PARKED / ARCHIVED. Re-index when docs are added, moved, or status changes.
tags: [mos2es, index, maintenance, status, reference, okf]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:04 UTC
---

# Doc Index

> **Purpose:** full index of every doc, sorted by status. Re-index when docs are added,
> moved, or change status. Run `node scripts/check-okf.mjs` to verify OKF compliance.

## OKF compliance status

| Metric | Value |
|--------|-------|
| Total .md files | (run `find . -name '*.md' \| wc -l`) |
| OKF-compliant | (run `node scripts/check-okf.mjs`) |

## Folder layout

| Folder | Holds |
|--------|-------|
| **(root — live hubs only)** | SCRATCHPAD · MAIN_TODO · DECISIONS · DOC_INDEX · DOC_ORGANIZATION · OKF · AFTER_LAUNCH · ICEBOX · index |
| `onboarding/` | Evergreen onboarding docs (core + per-role) |
| `state/` | Live trackers (ACTIVITY.log, ROSTER) |
| `reference/` | Stable reference material |
| `_archive/` | Shipped/finished docs (kept for history, not linted) |

> **Status key:** `ACTIVE` (drives current/next work) · `REFERENCE` (durable spec/canon,
> keep live, not a task) · `PARKED` (blocked on a precondition) · `ARCHIVED` (under `_archive/`).

---

## ACTIVE — stay live (drive current/next work)

| Date | File | Role |
|------|------|------|
| 2026-07-10 | SCRATCHPAD.md | Live coordination bus — never archive |
| 2026-07-10 | MAIN_TODO.md | Consolidated roadmap |
| 2026-07-10 | DECISIONS.md | Decision ledger |
| 2026-07-10 | state/ROSTER.md | Active session roster |
| 2026-07-10 | onboarding/FRESH_SESSION_ONBOARD.md | Fresh session onboarding |

---

## REFERENCE — durable, keep live (spec/canon/onboarding, not tasks)

| File | Kind |
|------|------|
| OKF.md · index.md | Conventions + doc index root (okf_version) |
| DOC_ORGANIZATION.md | Filing convention |
| onboarding/ (role files) | Onboarding (evergreen) |
| reference/pages/ (11 docs) | One reference doc per HTML page (index, architecture, benchmarks, deck, demovideo, field-sheet, governance-vacuum, legal, papers, press, resume) |
| reference/scripts/ (3 docs) | Frontend JS/JSX (deck-stage, tweaks-panel, tweaks), tracker scripts (hooks, roles, status, OKF lint), SEO scripts (indexnow-ping) |
| reference/config/ (2 docs) | Root config files (netlify, robots, sitemap, llms.txt, auth, gitignore), SEO/GEO/AEO playbook summary |
| reference/assets/ (2 docs) | img/benchmarks/ inventory (truth data, posters, archive), img/ root + assets/ inventory |
| reference/deck/ (1 doc) | uploads/slides/ source content + .stash/ stashed pages |

---

## PARKED — out-of-phase (precondition not met; NOT pending)

| Date | File | Trigger to un-park |
|------|------|-------------------|
| (none yet) | | |

---

## ARCHIVED (correctly placed — no action)

All files under `_archive/` are retired. See `_archive/README.md` for what was retired and why.
