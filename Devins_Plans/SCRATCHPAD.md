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

## SESSION LOG

### ⤷ DEVIN → ALL: SIGN-IN — claiming session tracker bootstrap + OKF setup
2026-07-10 07:31 UTC

Bootstrapping the session tracker + OKF doc system from the tracker-bootstrap package.
Owner placed the package at /tmp/tracker-bootstrap.tar.gz. I inspected all scripts before
running (no network calls, no arbitrary code execution — all repo-local). Extracted,
merged with existing scripts/ (preserved indexnow-ping.sh), customized all seed docs for
the MO§ES project, fixed .gitignore to allow .claude/settings.json through, committed
everything, installed hooks, set role to DEVIN.

**Roles assigned by owner:**
- **DEVIN** = this session (me). Primary development.
- **DEVIN2** = the other session the owner is opening. Will run the OKF repo index plan.

**What's done:**
- Tracker bootstrap: 4 commits (61e116a, 6d90c8b, 930e93b, 8facb6c)
- OKF linter: 11/11 docs compliant (with mos2es project tag)
- Post-commit hook: proven working (3 commits auto-logged)
- Role set: DEVIN (state/.role-devin-0b5697bf-59783)
- .gitignore: .claude/settings.json allowed, session state files ignored
- CLAUDE.md: customized for MO§ES (repos, roles, hard rules, deploy flow, do-not-touch list)
- Onboarding doc: has full repo map, gate commands, hard rules

**What's pending:**
- OKF repo index plan written at Devins_Plans/_planning/OKF_REPO_INDEX_PLAN.md
- DEVIN2 should pick that up: 5 parallel read-only subagents → compile into ~19 reference docs
- Owner has another task for DEVIN (me) — not yet described
- 4 commits ahead of origin/main — NOT pushed yet

**Owner is about to reset this window.** Everything durable is committed. The next DEVIN
session should: install-hooks.sh → set-role.sh DEVIN → read this bus tail → read
MAIN_TODO → read DECISIONS → check git log → wait for owner's task.

---

### ⤷ DEVIN → DEVIN2: HANDOFF — OKF repo index plan ready for you
2026-07-10 07:48 UTC

The plan is at `Devins_Plans/_planning/OKF_REPO_INDEX_PLAN.md`. Read it for the full spec.
Quick version:

1. Boot: `install-hooks.sh` → `set-role.sh DEVIN2` → read onboarding → read this bus
2. Phase 1: Launch 5 parallel background subagents (`subagent_explore` profile, read-only):
   - SA1: audit 11 HTML pages (purpose, sections, JSON-LD, nav, deps)
   - SA2: audit 3 JS/JSX + 8 scripts (what they do, deps, how invoked)
   - SA3: audit root docs + config (README, SEO playbook, llms.txt, netlify, robots, sitemap)
   - SA4: audit img/benchmarks/ (truth data, posters, archive, assets)
   - SA5: audit uploads/slides/ (10 slide folders) + .stash/
3. Phase 2: Sequential — compile audit results into ~19 OKF reference docs under
   `Devins_Plans/reference/` (pages/, scripts/, config/, assets/, deck/), update DOC_INDEX
   + index.md, lint, commit
4. Sign out on this bus when done

**Do NOT touch:** HTML pages, JSON-LD blocks, SEO_GEO_AEO_PLAYBOOK.md, llms.txt, sitemap.xml,
robots.txt. This is documentation-only — you're indexing, not modifying the site.

**Do NOT copy SEO playbook content** — just describe it + link to it. Owner-curated.

---

## COMMIT LOG

<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->
[HOOK] 2026-07-10 07:44 UTC · 8facb6c · Deric · docs: add OKF repo index plan for parallel subagent execution
[HOOK] 2026-07-10 07:35 UTC · 930e93b · Deric · chore: gitignore session state files + commit hook log entry
[HOOK] 2026-07-10 07:34 UTC · 6d90c8b · Deric · docs: mark tracker bootstrap as shipped in MAIN_TODO
