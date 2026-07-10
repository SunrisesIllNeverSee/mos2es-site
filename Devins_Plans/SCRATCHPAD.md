---
type: Coordination
title: SCRATCHPAD — the live coordination bus
description: The live cross-session coordination bus for the MO§ES site (mos2es.com). Append status, decisions, questions, handoffs here. Format: ### ⤷ <FROM> → <TO>: <subject>. Don't start a parallel log — this IS the log.
tags: [mos2es, coordination, scratchpad, bus, session-handoff]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:31 UTC
---

# SCRATCHPAD — the live coordination bus

> **The bus.** Read the tail before asserting state. Append your status/decisions/questions
> here using the format: `### ⤷ <FROM> → <TO>: <subject>`. Don't start a parallel log.
>
> **OKF convention:** every doc in this directory carries YAML frontmatter
> (`type/title/description/tags/timestamp`). New docs MUST include it. Code files don't.

---

## COORDINATION PROTOCOL

1. **Read the bus tail before asserting state** — don't narrate from memory. Verify with
   `git` / the live site / whatever ground truth you have.
2. **Log into the activity tracker (once per session):** `bash scripts/set-role.sh <ROLE>`.
   Then update your row in `state/ROSTER.md` (Track · Purpose · UTC). The PostToolUse hook
   auto-appends every doc edit to `state/ACTIVITY.log` tagged with your role.
3. **Install the commit-log hook once per clone:** `bash scripts/install-hooks.sh`.
   Git hooks live in `.git/` and DON'T travel — each session/machine must install.
4. **Run `bash scripts/status.sh`** to see roster + activity side by side. It's a TRACKER,
   not governance — it flags nothing; the human reads the gap.
5. **Sign IN / Sign OUT** on the bus when claiming or releasing a lane:
   - `### ⤷ <ROLE> → ALL: SIGN-IN — claiming <lane/files>`
   - `### ⤷ <ROLE> → ALL: SIGN-OUT — <shipped / released / open + concerns>`

---

## COMMIT LOG

<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->
[HOOK] 2026-07-10 07:34 UTC · 6d90c8b · Deric · docs: mark tracker bootstrap as shipped in MAIN_TODO
