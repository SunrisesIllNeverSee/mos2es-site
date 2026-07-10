---
type: Reference
title: Tracker scripts — hooks, roles, status, OKF lint
description: Reference doc for the session tracker scripts (install-hooks, set-role, status, check-okf, fix-okf, post-commit, session-start, stamp-last-touched). What they do, dependencies, how they're invoked.
tags: [mos2es, reference, scripts, tracker, hooks, okf]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:01 UTC
---

# Tracker Scripts — hooks, roles, status, OKF lint

## scripts/install-hooks.sh

**What it does:** Installs the git post-commit hook by creating a shim in
`.git/hooks/post-commit` that executes the committed `scripts/hooks/post-commit.sh`.

**Dependencies:** None (standard bash, git).

**How it's invoked:** `bash scripts/install-hooks.sh` (run once per clone/machine).
Idempotent — safe to re-run.

**Key behavior:**
- Creates shim at `.git/hooks/post-commit`
- Shim executes committed `scripts/hooks/post-commit.sh`
- Makes both files executable

---

## scripts/set-role.sh

**What it does:** Claims a session role (DEVIN/DEVIN2/DEVGTM/DEVREP — note: renamed to
de sit1/de sit2 per commit 29d7cf0) by writing a role file keyed to session_id, fixing the
"UNKNOWN" logging bug in ACTIVITY.log.

**Dependencies:** `shasum` (fallback session ID), `jq` (session-start hook payload).

**How it's invoked:** `bash scripts/set-role.sh <ROLE>` (run once per session).

**Key behavior:**
- Reads session_id from `state/.session-current` (written by session-start.sh hook)
- Fallback: generates stable ID from tty + parent PID if session_id missing
- Writes role to `state/.role-<session_id>`
- Uses `TRACKER_DOCS_DIR` env var (default: `Devins_Plans`)
- Uses `TRACKER_STATE_DIR` env var (default: `<docs>/state`)

---

## scripts/status.sh

**What it does:** Displays session status by showing the ROSTER.md table (intended state)
and the last N lines of ACTIVITY.log (actual activity) side by side.

**Dependencies:** None (standard bash utilities: awk, tail, wc, date).

**How it's invoked:** `bash scripts/status.sh [N]` (N = activity lines, default 15).

**Key behavior:**
- Prints ROSTER.md table (extracts between "## Roster" and next `---` or `## `)
- Prints last N lines of ACTIVITY.log
- Shows total line count of ACTIVITY.log

---

## scripts/check-okf.mjs

**What it does:** Lints YAML frontmatter on all markdown files in the docs directory to
ensure OKF (Object-Knowledge Format) compliance (type, title, description, tags, timestamp).

**Dependencies:** None (Node.js built-in modules: `fs`, `url`, `path`). Requires Node 12+
(ES modules).

**How it's invoked:** `node scripts/check-okf.mjs` (exit 0 = compliant, 1 = violations).

**Key behavior:**
- `frontmatter(text)` — extracts YAML block between `---` delimiters
- `parse(block)` — parses flat `key: value` frontmatter lines
- `walk(dir, rel)` — recursively scans for `.md` files
- Validates required fields: type, title, description, tags, timestamp
- Checks type against vocabulary set
- Validates tags format and optional project tag prefix
- Validates timestamp format (YYYY-MM-DD)
- Checks `index.md` for `okf_version` field
- Uses `TRACKER_DOCS_DIR` (default: `Devins_Plans`), `OKF_PROJECT_TAG` (optional),
  `OKF_SKIP_DIRS` (default: `_archive,_planning,_merge`)

---

## scripts/fix-okf.mjs

**What it does:** Auto-fixes OKF frontmatter violations by mapping non-standard types,
prepending project tags, adding missing timestamps, and inserting minimal frontmatter
blocks where missing.

**Dependencies:** None (Node.js built-in modules: `fs`, `url`, `path`). Requires Node 12+.

**How it's invoked:** `node scripts/fix-okf.mjs` (then verify with check-okf.mjs).

**Key behavior:**
- `extractFrontmatter(text)` — extracts YAML block with line positions
- `parseFields(fmLines)` — parses frontmatter key-value pairs
- `walk(dir, rel)` — recursively scans for `.md` files
- Fixes type values via `TYPE_MAP` (case variants, domain-specific mappings)
- Prepends project tag to tags if `OKF_PROJECT_TAG` is set
- Adds missing timestamp with today's date
- Adds minimal frontmatter block to files without any
- Extracts title from first H1 or filename
- Extracts description from first non-empty non-markup line

---

## scripts/hooks/post-commit.sh

**What it does:** Git post-commit hook that appends every commit to SCRATCHPAD.md as a log
entry with hash, timestamp, author, and subject.

**Dependencies:** None (standard bash, git, sed).

**How it's invoked:** Automatically by git after each commit. Installed via
`scripts/install-hooks.sh`.

**Key behavior:**
- Reads commit hash, timestamp, subject, author via `git log`
- Formats entry: `[HOOK] <timestamp> · <hash> · <author> · <subject>`
- Inserts entry after marker line in SCRATCHPAD.md
- No-ops cleanly if SCRATCHPAD.md or marker missing
- Uses `TRACKER_DOCS_DIR` (default: `Devins_Plans`)

---

## scripts/hooks/session-start.sh

**What it does:** SessionStart hook that records the session_id to
`state/.session-current` so set-role.sh can map a human-chosen role to the session.

**Dependencies:** `jq` (JSON parsing from stdin payload).

**How it's invoked:** Automatically by Claude/Devin CLI at session start. Reads JSON
payload from stdin.

**Key behavior:**
- Reads hook payload from stdin
- Extracts session_id via jq
- Writes session_id to `state/.session-current`
- Never fails the session (all errors swallowed, exits 0)
- Uses `TRACKER_DOCS_DIR`, `TRACKER_STATE_DIR`, `DEVIN_PROJECT_DIR`/`CLAUDE_PROJECT_DIR`

---

## scripts/hooks/stamp-last-touched.sh

**What it does:** PostToolUse hook that stamps `last_touched: <UTC>` into YAML frontmatter
of edited markdown files and appends entries to ACTIVITY.log with role attribution.

**Dependencies:** `jq` (hook payload), `perl` (in-place frontmatter updates), `awk`
(finding frontmatter closing delimiter).

**How it's invoked:** Automatically by Claude/Devin CLI after Write/Edit/exec tools. Reads
JSON payload from stdin.

**Key behavior:**
- Reads hook payload from stdin
- Extracts file_path from Write/Edit tools or parses command from exec tools
- Resolves role from env vars (`TRACKER_ROLE`/`SIGRANK_ROLE`) or per-session role file
- Fallback role: "UNKNOWN (in <dir>)"
- Appends to ACTIVITY.log: `<UTC> · <role> · edited <path>`
- Stamps `last_touched: <UTC>` into frontmatter (updates existing or inserts before closing `---`)
- Only processes files under `<docs_dir>/` ending in `.md`
- Requires frontmatter block (line 1 == `---`)
- Uses `TRACKER_DOCS_DIR`, `TRACKER_STATE_DIR`, `DEVIN_PROJECT_DIR`/`CLAUDE_PROJECT_DIR`

---

## Summary

| File | Type | External deps |
|------|------|---------------|
| `install-hooks.sh` | one-time setup | git, bash |
| `set-role.sh` | per-session | shasum, jq |
| `status.sh` | on-demand | bash, awk, tail, wc, date |
| `check-okf.mjs` | on-demand lint | Node 12+ |
| `fix-okf.mjs` | on-demand fix | Node 12+ |
| `hooks/post-commit.sh` | git hook | git, bash, sed |
| `hooks/session-start.sh` | SessionStart hook | jq |
| `hooks/stamp-last-touched.sh` | PostToolUse hook | jq, perl, awk |
