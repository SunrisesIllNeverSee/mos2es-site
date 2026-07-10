# Tracker Bootstrap — Setup Guide

A portable session-coordination tracker for multi-session repos. Drop into any repo
and you get: activity logging, role tracking, commit logging, a coordination bus,
and an OKF (Open Knowledge Framework) doc convention.

## What you get

- **Activity tracker** — every doc edit auto-logs to `ACTIVITY.log` with the session's role
- **Role tracker** — `set-role.sh` claims a role for the session (no more UNKNOWN)
- **Commit logger** — every commit auto-appends to `SCRATCHPAD.md` (travels with the repo)
- **Status viewer** — `status.sh` shows roster + activity side by side
- **OKF convention** — YAML frontmatter on every doc, auto-stamped `last_touched`
- **OKF linter** — `check-okf.mjs` validates frontmatter; `fix-okf.mjs` auto-fixes violations
- **Coordination bus** — `SCRATCHPAD.md` for cross-session handoffs
- **Decision ledger** — append-only `DECISIONS.md` for durable rulings
- **Onboarding** — `FRESH_SESSION_ONBOARD.md` for new sessions to come up to speed

## Quick install (5 minutes)

### 1. Copy files into your repo

```bash
# From your repo root:
cp -r /path/to/tracker-bootstrap/scripts/ ./scripts/
cp -r /path/to/tracker-bootstrap/.devin/ ./.devin/
cp -r /path/to/tracker-bootstrap/.claude/ ./.claude/   # only if using Claude Code
```

### 2. Rename the docs directory

The default docs directory is `Devins_Plans` (inherited from the origin project).
Rename it to whatever fits your project:

```bash
# Example: rename to "docs" or "coord" or whatever you want
mv Devins_Plans/ docs/
```

If you rename it, set the env var in the hook configs so the scripts know where to look:

**`.devin/hooks.v1.json`** and **`.claude/settings.json`** — prefix the hook commands:
```json
"command": "TRACKER_DOCS_DIR=docs bash \"${DEVIN_PROJECT_DIR:-$CLAUDE_PROJECT_DIR}/scripts/hooks/stamp-last-touched.sh\" 2>/dev/null || true"
```

Or just keep `Devins_Plans` as the directory name — it works as-is with no config changes.

### 3. Seed the docs

```bash
cp -r /path/to/tracker-bootstrap/Devins_Plans/ ./Devins_Plans/   # or your renamed dir
```

Replace `2026-07-10T07:24:22Z` in the seed docs with real timestamps:
```bash
date -u '+%Y-%m-%dT%H:%M:%SZ'        # for timestamp: field
date -u '+%Y-%m-%d %H:%M UTC'         # for last_touched: field
```

### 4. Edit the seed docs for your project

- **`SCRATCHPAD.md`** — update the header to describe YOUR project + roles
- **`state/ROSTER.md`** — replace the placeholder roles with YOUR role names
- **`onboarding/FRESH_SESSION_ONBOARD.md`** — fill in YOUR gate commands, repo map, hard rules
- **`MAIN_TODO.md`** — seed with YOUR actual open items
- **`state/DECISIONS.md`** — remove the placeholder line, start your own ledger

### 5. Commit everything

```bash
git add scripts/ .devin/ .claude/ Devins_Plans/   # or your renamed docs dir
git commit -m "chore: add session tracker infrastructure"
```

### 6. Install hooks (per clone)

```bash
bash scripts/install-hooks.sh
```

## First session boot sequence

Every new session does this, in order:

1. `bash scripts/install-hooks.sh` — wire git hooks into this clone
2. `bash scripts/set-role.sh <ROLE>` — claim your session role
3. Read `onboarding/FRESH_SESSION_ONBOARD.md` — the shared core
4. Read `SCRATCHPAD.md` tail — the live coordination bus
5. Read `MAIN_TODO.md` — what's actually open
6. Read `state/DECISIONS.md` — why things are the way they are
7. Read `state/ROSTER.md` — who's doing what
8. `bash scripts/status.sh` — see roster + activity side by side
9. Prove your gates (tsc/test/lint — whatever your project uses)
10. Start work

## What you get — the full repo operating structure

This isn't just scripts. It's the entire system for running a multi-session repo:

**Coordination layer:**
- **Coordination bus** (`SCRATCHPAD.md`) — cross-session handoffs, sign-in/sign-out, decisions on the bus
- **Decision ledger** (`DECISIONS.md`) — append-only, UTC-stamped, why-things-are rulings
- **Session roster** (`state/ROSTER.md`) — who claims what, updated manually
- **Activity log** (`state/ACTIVITY.log`) — ground truth, auto-populated by hooks

**Roadmap layer:**
- **Live roadmap** (`MAIN_TODO.md`) — what's actually open right now
- **Deferred queue** (`AFTER_LAUNCH.md`) — important but sequenced later
- **Icebox** (`ICEBOX.md`) — out-of-phase, blocked on a precondition (NOT pending)

**Organization layer:**
- **OKF spec** (`OKF.md`) — frontmatter convention, type vocabulary, enforcement rules
- **OKF linter** (`check-okf.mjs` + `fix-okf.mjs`) — validate + auto-fix frontmatter
- **Doc organization** (`DOC_ORGANIZATION.md`) — what stays at root, what gets filed, when to archive
- **Doc index** (`DOC_INDEX.md`) — status map of every doc (ACTIVE/REFERENCE/PARKED/ARCHIVED)
- **Bundle root** (`index.md`) — OKF version + key links, the entry point

**Onboarding layer:**
- **Shared core** (`onboarding/FRESH_SESSION_ONBOARD.md`) — evergreen, task-free, how to come up to speed
- **Rules file** (`CLAUDE.md`) — operating state header, session coordination, hard rules, repo map

**Tracker infrastructure:**
- **Role tracker** (`set-role.sh`) — claims a role for the session
- **Commit logger** (`install-hooks.sh` + `post-commit.sh`) — commits auto-append to SCRATCHPAD
- **Activity tracker** (`stamp-last-touched.sh`) — doc edits auto-log to ACTIVITY.log + stamp last_touched
- **Status viewer** (`status.sh`) — roster + activity side by side

**Archive convention:**
- `_archive/` with README — retired docs kept for history, not linted, never deleted

## File map

```
CLAUDE.md                     ← the rules file (operating state, coordination, hard rules, repo map)

scripts/
  set-role.sh                 — claim session role (run once per session)
  install-hooks.sh            — wire git hooks into .git/hooks/ (run once per clone)
  status.sh                   — roster + activity viewer (read-only)
  check-okf.mjs               — lint OKF frontmatter on every doc (exit 0 = all compliant)
  fix-okf.mjs                 — auto-fix OKF frontmatter violations (type mapping, missing fields)
  hooks/
    post-commit.sh            — auto-logs commits to SCRATCHPAD (fires after commit)
    session-start.sh          — records session_id for role mapping (SessionStart hook)
    stamp-last-touched.sh     — stamps last_touched + appends ACTIVITY.log (PostToolUse hook)

.devin/
  hooks.v1.json               — Devin CLI hook config (SessionStart + PostToolUse)

.claude/
  settings.json               — Claude Code hook config (same hooks, for Claude Code)

Devins_Plans/                 ← rename this to whatever fits your project
  index.md                    — OKF bundle root (okf_version + key links)
  SCRATCHPAD.md               — the coordination bus (cross-session messages + commit log)
  MAIN_TODO.md                — the live roadmap (what's open right now)
  DECISIONS.md                — append-only decision ledger (why things are the way they are)
  OKF.md                      — the OKF spec (frontmatter convention, type vocabulary, rules)
  DOC_ORGANIZATION.md         — how docs are filed (root vs subfolder vs archive)
  DOC_INDEX.md                — status map of every doc (ACTIVE/REFERENCE/PARKED/ARCHIVED)
  AFTER_LAUNCH.md             — deferred features (active, sequenced later)
  ICEBOX.md                   — out-of-phase items (parked on a precondition, NOT pending)
  onboarding/
    FRESH_SESSION_ONBOARD.md  — shared onboarding core (evergreen, task-free, read first)
  state/
    ROSTER.md                 — intended state (manual — agents update their row)
    ACTIVITY.log              — actual activity (automatic — ground truth)
  _archive/
    README.md                 — index of retired docs (why each was archived)
```

## How the system fits together

```
CLAUDE.md (rules file)
  ↓ "read in order"
  ↓
  onboarding/FRESH_SESSION_ONBOARD.md  ← how to come up to speed
  ↓
  SCRATCHPAD.md tail                   ← the live bus (what's happening)
  ↓
  MAIN_TODO.md                         ← what's open
  DECISIONS.md                         ← why things are the way they are
  AFTER_LAUNCH.md                      ← what's deferred (active, later)
  ICEBOX.md                            ← what's parked (precondition-gated)
  ↓
  state/ROSTER.md                      ← who's doing what
  state/ACTIVITY.log                   ← what actually happened (ground truth)
  ↓
  DOC_INDEX.md                         ← where everything lives + status
  DOC_ORGANIZATION.md                  ← how to file new docs
  OKF.md                               ← frontmatter convention
  ↓
  check-okf.mjs / fix-okf.mjs          ← enforce the convention
```

## The three roadmap docs (don't conflate them)

| Doc | What it holds | Status |
|-----|---------------|--------|
| `MAIN_TODO.md` | What's actually open right now | Active tasks |
| `AFTER_LAUNCH.md` | Important, deferred, will do soon | Active but sequenced later |
| `ICEBOX.md` | Out-of-phase, blocked on a precondition | Parked, NOT pending |

A common failure mode: counting icebox items as "not done" in status reviews. They aren't
pending — they're parked. Each entry names its **trigger** (the condition that un-parks it).

## How the two layers of truth work

| Layer | File | Who writes it | What it captures |
|-------|------|---------------|------------------|
| Intended state | `state/ROSTER.md` | Manual (agents) | Who claims what, what they're doing |
| Actual activity | `state/ACTIVITY.log` | Automatic (hook) | Every doc edit, tagged with role + UTC |

The gap between the two is the signal. `status.sh` shows both side by side. The tracker
flags nothing — the human reads the gap. This is a TRACKER, not governance.

## Customization

### Different docs directory name

Set `TRACKER_DOCS_DIR` in the hook configs or as an env var:
```json
"command": "TRACKER_DOCS_DIR=mydocs bash \"...\" 2>/dev/null || true"
```

### Different role names

`set-role.sh` accepts any string — just use whatever roles your project uses:
```bash
bash scripts/set-role.sh LEAD
bash scripts/set-role.sh DEV1
bash scripts/set-role.sh DEV2
```

Update `ROSTER.md` to match your role names.

### OKF project tag

If you want the OKF linter to enforce that every doc's `tags[0]` matches your project name,
set `OKF_PROJECT_TAG`:

```bash
# Lint with project tag enforcement
OKF_PROJECT_TAG=myproject node scripts/check-okf.mjs

# Auto-fix: will prepend the project tag to any tags[] missing it
OKF_PROJECT_TAG=myproject node scripts/fix-okf.mjs

# Verify
OKF_PROJECT_TAG=myproject node scripts/check-okf.mjs
```

If `OKF_PROJECT_TAG` is not set, the tag-first-position check is skipped (tags just need
to be a non-empty list). This is the default — works out of the box without configuration.

### OKF skip dirs

Control which subdirectories the linter skips (default: `_archive,_planning,_merge`):

```bash
OKF_SKIP_DIRS=_archive,old,drafts node scripts/check-okf.mjs
```

### Wire OKF into CI

Add to your CI workflow or pre-commit hook:
```bash
node scripts/check-okf.mjs  # exit 1 if any violations
```

### Different state directory

Set `TRACKER_STATE_DIR` to move where `ACTIVITY.log` + `.role-*` files live:
```bash
TRACKER_STATE_DIR=/custom/path bash scripts/set-role.sh LEAD
```

## Troubleshooting

**ACTIVITY.log says UNKNOWN for every entry:** you forgot to run `set-role.sh`. Run it:
`bash scripts/set-role.sh <ROLE>`. Future edits will log with your role.

**Commit log not appearing in SCRATCHPAD:** you forgot to run `install-hooks.sh`. Run it:
`bash scripts/install-hooks.sh`. Also verify the `<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->`
marker exists in SCRATCHPAD.md.

**Hooks not firing at all:** verify `.devin/hooks.v1.json` (Devin CLI) or `.claude/settings.json`
(Claude Code) exists and the paths point to the right scripts directory.

**`last_touched` not updating:** the doc must have YAML frontmatter (start with `---`). The
hook only stamps files that have frontmatter. The activity log records ALL edits regardless.
