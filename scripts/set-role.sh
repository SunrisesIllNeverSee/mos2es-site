#!/bin/bash
# set-role.sh — claim this session's tracker role (DEVIN / DEVIN2 / DEVGTM / DEVREP).
#
# THE fix for the "ACTIVITY.log logs UNKNOWN forever" bug. Run ONCE per session:
#
#   bash scripts/set-role.sh DEVIN
#
# Why not `export SIGRANK_ROLE=LEAD`? Because that export lives only in the
# Bash-tool subshell and never reaches the PostToolUse stamp hook (a separate
# subprocess) — which is exactly why every prior log line said UNKNOWN. This
# helper instead writes a per-session role FILE that the hook CAN read, keyed on
# the session_id the SessionStart hook recorded at state/.session-current.
#
# Devin CLI compatibility (2026-07-09): Devin's SessionStart payload does NOT
# include session_id (only `source`). So .session-current may be missing or
# stale. In that case, we generate a stable ID from the process tree + tty
# and write both .session-current AND the role file. The stamp hook's fallback
# path (read .session-current → look up .role-<id>) then works.
#
# Result: every subsequent Devins_Plans/*.md edit logs with your real role.

set -uo pipefail

role="${1:-}"
if [ -z "$role" ]; then
  echo "usage: bash scripts/set-role.sh <ROLE>   e.g. DEVIN | DEVIN2 | DEVGTM | DEVREP" >&2
  exit 1
fi

docs_dir="${TRACKER_DOCS_DIR:-Devins_Plans}"
repo_root="$(git rev-parse --show-toplevel 2>/dev/null)"
[ -n "$repo_root" ] || repo_root="$(cd "$(dirname "$0")/.." && pwd)"
state_dir="${TRACKER_STATE_DIR:-$repo_root/$docs_dir/state}"
marker="$state_dir/.session-current"
mkdir -p "$state_dir" 2>/dev/null || true

# Try to read session_id from .session-current (written by SessionStart hook).
session_id=""
if [ -f "$marker" ]; then
  session_id="$(head -1 "$marker" | tr -d '[:space:]')"
fi

# Fallback for Devin CLI: if no session_id from SessionStart hook, generate a
# stable per-terminal ID. This isn't the real Devin session ID, but it's stable
# for the lifetime of this shell session and unique per terminal — which is all
# the stamp hook needs to look up the role file.
if [ -z "$session_id" ]; then
  # Generate from tty + parent PID — stable for the session, unique per terminal.
  tty_id="$(tty 2>/dev/null | tr -d '[:space:]' | shasum | cut -c1-8)"
  [ -n "$tty_id" ] || tty_id="notty"
  ppid_id="$PPID"
  session_id="devin-${tty_id}-${ppid_id}"
  # Write it to .session-current so the stamp hook's fallback path finds it.
  printf '%s\n' "$session_id" > "$marker" 2>/dev/null || true
fi

printf '%s\n' "$role" > "$state_dir/.role-$session_id"
echo "✓ role for this session = $role  (state/.role-$session_id)"
echo "  Every Devins_Plans/*.md edit from now logs as '$role' in ACTIVITY.log."
