#!/bin/bash
# post-commit.sh — appends every commit to the SCRATCHPAD commit log.
#
# This is the COMMITTED, travels-with-the-repo version of the git post-commit hook.
# Git hooks live in .git/hooks/ which NEVER travels with clone/push — so every
# session/machine must run `scripts/install-hooks.sh` once to wire it in.
#
# PORTABLE: configurable via env vars (defaults shown):
#   TRACKER_DOCS_DIR=Devins_Plans   — the docs directory (relative to repo root)
#
# Drop into any project: set TRACKER_DOCS_DIR=docs (or whatever your docs dir is
# called) and the hook logs to that directory's SCRATCHPAD.md. No code changes needed.

set -euo pipefail

docs_dir="${TRACKER_DOCS_DIR:-Devins_Plans}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
LOG_FILE="$REPO_ROOT/$docs_dir/SCRATCHPAD.md"
MARKER='<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->'

# No-op cleanly if the bus or its marker is absent (don't ever fail a commit).
[ -f "$LOG_FILE" ] || exit 0
grep -q "$MARKER" "$LOG_FILE" || exit 0

HASH=$(git rev-parse --short HEAD)
TIMESTAMP=$(date -u '+%Y-%m-%d %H:%M UTC')
SUBJECT=$(git log -1 --pretty=format:'%s' | tr -d '\\')
AUTHOR=$(git log -1 --pretty=format:'%an')
ENTRY="[HOOK] $TIMESTAMP · $HASH · $AUTHOR · $SUBJECT"

# Insert directly after the marker line (newest entries appear at the top of the log).
sed -i.bak "/$MARKER/a\\
$ENTRY" "$LOG_FILE"
rm -f "$LOG_FILE.bak"
