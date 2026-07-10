---
type: Reference
title: Doc Organization Convention
description: How docs are filed — what stays at root, which subfolder topical docs go to, and when to archive. Read before doing a cleanup pass so the structure stays consistent.
tags: [mos2es, meta, organization, convention, cleanup]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:31 UTC
---

# Doc Organization Convention

The rule set for filing docs. Follow it on every cleanup pass so the structure stays predictable.

## What STAYS at root (the live hubs only)

Only evergreen, frequently-opened control docs live at the root:

| File | Role |
|---|---|
| `SCRATCHPAD.md` | The coordination bus (chatty cross-session channel). |
| `MAIN_TODO.md` | The live task list. |
| `DECISIONS.md` | Append-only decision ledger — UTC · what · why (terse durable rulings, not chatter). |
| `DOC_INDEX.md` | Dated index of every frontmatter doc + its DONE/ACTIVE status. |
| `index.md` | OKF bundle root (okf_version + key links). |
| `OKF.md` | The frontmatter-convention spec. |
| `DOC_ORGANIZATION.md` | This file. |
| `ICEBOX.md` | Items deliberately out of the current phase (preconditions unmet). |
| `AFTER_LAUNCH.md` | Features deferred until after launch (active, sequenced later). |

Everything else gets filed into a subfolder.

## Subfolders (file topical docs by subject)

Start with these. Add topic folders as your project grows:

| Folder | Holds |
|---|---|
| `onboarding/` | Evergreen come-up-to-speed docs (core + per-role). Task-FREE. |
| `state/` | Live trackers only — ACTIVITY.log, ROSTER, migration docs, review records. |
| `reference/` | Stable reference material. Subfolders ok (canon/, token/, etc.). |
| `_planning/` | Build specs / briefs / staged data (per-target subfolders ok). |
| `_assets/` | Images / non-markdown attachments. |
| `_archive/` | Completed / superseded docs (kept for record). |

Add your own topic folders (security/, growth/, ingest/, etc.) as needed. The convention is:
**file by subject, not by date.** A doc about auth goes in `auth/` whether it was written
this week or last month.

## When to ARCHIVE vs keep

- A doc whose work is **shipped/verified** or that is **self-marked SUPERSEDED/ARCHIVED**
  → `_archive/` (or `_archive/<topic>/`).
- A doc still describing **open** work → its topical folder, NOT archive.
- Punch-lists/briefs once their items are done → `_archive/`.

## Filing procedure (repeatable)

1. `git mv <file> <folder>/` (preserves history; never plain `mv` + re-add).
2. Update `DOC_INDEX.md` — fix the path; flip status to DONE if archiving.
3. Grep for inbound links to the moved file and fix them:
   `grep -rl "<oldname>" .` → update the markdown links.
4. Keep frontmatter intact; add it if the doc lacks OKF frontmatter (see `OKF.md`).

## Guardrails

- Don't move the root hubs listed above — sessions + hooks reference them by root path.
- `_archive/` docs keep their frontmatter for provenance but are NOT OKF-linted.
- Archive, don't delete (owner standing rule). Old code → `_archive/`. Never `git rm`
  something reusable — you may reuse ideas later.
