---
type: Brief
title: Onboarding CORE — shared bring-up for any session (read first)
description: The shared, evergreen "come up to speed" core for ANY new session on the MO§ES site (mos2es.com). Coordination, hard rules, live doc map, gate commands. Role specifics live in role-specific onboarding files — read the core, then your role file. Deliberately task-FREE so it never goes stale; current tasks live in the roadmap docs + the bus.
tags: [mos2es, onboarding, coordination, session-handoff, evergreen, core]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:31 UTC
---

# Onboarding CORE — shared bring-up (read first, then your role file)

**You're joining a live, multi-session operation.** This file is the shared core —
how to come up to speed, the hard rules, and the coordination protocol. It is
**evergreen + task-free on purpose** — current work lives in the roadmap docs + the bus.

**Project:** MO§ES™ site (mos2es.com) — static HTML website for "Sovereign Signal Governance."
Deployed via Netlify (main branch auto-deploy, publish dir `.`). No build step.

---

## 1. Get oriented (do this in order)

1. **Install the commit-log hook (once per clone):** `bash scripts/install-hooks.sh`. It
   appends every commit to the SCRATCHPAD COMMIT LOG. Git hooks don't travel with
   clone/push — you must run this once per machine/clone. The newest `[HOOK]` line stays
   uncommitted until the next commit — normal, not breakage.
2. **Log into the activity tracker:** `bash scripts/set-role.sh <ROLE>` — once per session.
   This writes a per-session role file that the PostToolUse hook reads. Without it, every
   activity log entry says UNKNOWN. Then set your row in `state/ROSTER.md`
   (Track · Purpose · UTC stamp).
3. **Read the bus:** `SCRATCHPAD.md` — read the tail + the COORDINATION PROTOCOL header.
   This is where live cross-session messages live (`### ⤷ FROM → TO: subject`). Look for a
   handoff addressed to you.
4. **Read the roadmap, in order:**
   - `MAIN_TODO.md` — the live task picture.
   - `DECISIONS.md` — why things are the way they are (append-only).
   - Any frozen-reference / canon docs — don't contradict them.

## 2. Prove the gates BEFORE touching anything (and after every change)

This is a static HTML site — no build/test/lint gates. Verify by:
- `python3 -m http.server 8743` → open `http://localhost:8743` and check pages render
- Check for broken links after structural changes (adding/removing pages)
- Verify `sitemap.xml` is updated when pages are added/removed
- Verify JSON-LD structured data is valid after schema changes

## 3. The hard rules (non-negotiable)

- **Archive, don't delete:** old/unused code → `_archive/`. Never `git rm` something
  reusable — you may reuse ideas later.
- **Selective `git add` only — NEVER stage the whole tree.** Sessions share the working
  tree; staging everything sweeps in another session's WIP. Stage your files by name.
- **Lane discipline:** ping the bus before editing a file another session is mid-flight on.
  Announce before you touch shared files.
- **No secrets in the repo. Never bypass git hooks.** Owner-gated calls (pricing,
  public/private, schema drops) → ask on the bus, don't guess.
- **Do NOT modify HTML chart values or re-export screenshots without explicit instruction.**
  (See `.claude/session_notes.md` — 2026-05-21 incident.) Re-export = screenshot as-is.
- **Do NOT touch SEO/GEO/AEO strategy pages without owner approval:**
  `SEO_GEO_AEO_PLAYBOOK.md`, JSON-LD blocks, `llms.txt`, `sitemap.xml`, `robots.txt`.

## 4. When you finish a unit

Commit your lane (gates green) → push → write a durable close-out on the bus: what changed,
any decisions made, gate status, and anything left for the next session. Durable beats chat
— the next session only sees the bus.

---

## Repo map

| Path | What |
|------|------|
| `index.html` | Homepage — "Sovereign Signal Governance" |
| `papers.html` | Research papers + experimental record |
| `benchmarks.html` | Benchmark results + charts |
| `architecture.html` | Architecture overview |
| `governance-vacuum.html` | Governance vacuum article |
| `field-sheet.html` | Field sheet / spec sheet |
| `demovideo.html` | Demo video page (Loom + SigRank button) |
| `deck.html` + `deck-stage.js` | Pitch deck (interactive) |
| `press.html` | Press page |
| `legal.html` | Legal / terms page |
| `resume.html` | Resume page |
| `tweaks-panel.jsx` + `tweaks.jsx` | UI tweaks panel |
| `img/` | Images |
| `assets/` | Static assets |
| `uploads/` | Uploaded files |
| `scripts/indexnow-ping.sh` | IndexNow SEO ping script |
| `SEO_GEO_AEO_PLAYBOOK.md` | SEO/GEO/AEO playbook (owner-curated, do not touch) |
| `llms.txt` | AI discoverability config (do not touch) |
| `sitemap.xml` | Sitemap (update when pages change) |
| `robots.txt` | Crawl directives |
| `netlify.toml` | Netlify config (publish = `.`) |

---

## OKF (Open Knowledge Framework) convention

Every doc in this directory carries YAML frontmatter:
```yaml
---
type: Brief|Playbook|Roadmap|Reference|Handoff|Coordination
title: <title>
description: <one-line description>
tags: [mos2es, tag2, ...]
timestamp: YYYY-MM-DD
last_touched: YYYY-MM-DD HH:MM UTC
---
```

New docs MUST include it. Code files don't. The `last_touched` stamp is auto-updated by
the PostToolUse hook on every edit — don't manage it manually.

## The tracker system

| Tool | What | Command |
|------|------|---------|
| set-role.sh | Claim your session role | `bash scripts/set-role.sh <ROLE>` |
| install-hooks.sh | Wire git hooks into this clone | `bash scripts/install-hooks.sh` |
| status.sh | Roster + activity side by side | `bash scripts/status.sh` |
| check-okf.mjs | Lint OKF frontmatter on all docs | `node scripts/check-okf.mjs` |
| fix-okf.mjs | Auto-fix OKF frontmatter violations | `node scripts/fix-okf.mjs` |
| PostToolUse hook | Auto-logs doc edits to ACTIVITY.log | (automatic — fires on Write/Edit) |
| post-commit hook | Auto-logs commits to SCRATCHPAD | (automatic — fires after commit) |

**Two layers of truth:**
- `state/ROSTER.md` = intended state (manual — agents update their own row).
- `state/ACTIVITY.log` = actual activity (automatic — ground truth).
- The gap between the two is the signal. Read it by hand. The tracker flags nothing.

---

> **Why this file is task-free:** an onboarding doc that bakes in a specific "first task"
> goes stale the day that task ships. Current tasks live in the roadmap + the bus. This
> file is just *how to come up to speed* — keep it that way.
