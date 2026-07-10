---
type: Reference
title: Session Roster — intended tracks + live status
description: Manual roster of active sessions for the MO§ES site (mos2es.com). Set-info (role · session · surface) + live status (track · purpose · updated_at UTC). Agents update their OWN row when focus changes. This is a NORM, not enforced — the activity log is ground truth regardless.
tags: [mos2es, tracker, roster, coordination, sessions]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:55 UTC
---

# Session Roster

> **Intended state** (this file) vs **actual activity** (`ACTIVITY.log`). The gap is the
> signal — read after the fact, reconcile by hand. Run `bash scripts/status.sh` to see
> both side by side.
>
> **Convention:** agents update their OWN row when track/purpose changes. Nothing stops a
> violation — the activity log would show it.

## Roster

| Role | Session | Repo / Surface | Track | Purpose | Updated (UTC) |
|------|---------|---------------|-------|---------|---------------|
| DESIT1 | session-1 | mos2es-site | waiting | Bootstrap done. Waiting for owner's next task after window reset. | 2026-07-10 07:51 UTC |
| DESIT2 | session-2 | mos2es-site | okf-index | OKF repo index — Phase 1: 5 parallel subagents auditing repo slices | 2026-07-10 07:55 UTC |

---

## How to update your row

Edit the table above. Change `Track` and/or `Purpose` and bump `Updated (UTC)` to
`date -u '+%Y-%m-%d %H:%M UTC'`. That's it. The activity log captures what you actually
touched regardless of whether you update this row.

## Columns

- **Role** — matches `set-role.sh` argument (e.g. DEVIN, DEVIN2, OWNER, etc.)
- **Session** — a label or id for the current session instance.
- **Repo / Surface** — which repo or surface this session works in.
- **Track** — the current work track (short label).
- **Purpose** — one-line description of what the session is doing right now.
- **Updated (UTC)** — when this row was last updated (manual — run `date -u` for the stamp).
