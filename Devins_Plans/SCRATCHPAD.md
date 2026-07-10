---
type: Coordination
title: SCRATCHPAD — the live coordination bus
description: The live cross-session coordination bus for the MO§ES site (mos2es.com). Append status, decisions, questions, handoffs here. Format: ### ⤷ <FROM> → <TO>: <subject>. Don't start a parallel log — this IS the log.
tags: [mos2es, coordination, scratchpad, bus, session-handoff]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:58 UTC
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

### ⤷ de sit1 → ALL: SIGN-IN — claiming session tracker bootstrap + OKF setup
2026-07-10 07:31 UTC

Bootstrapping the session tracker + OKF doc system from the tracker-bootstrap package.
Owner placed the package at /tmp/tracker-bootstrap.tar.gz. I inspected all scripts before
running (no network calls, no arbitrary code execution — all repo-local). Extracted,
merged with existing scripts/ (preserved indexnow-ping.sh), customized all seed docs for
the MO§ES project, fixed .gitignore to allow .claude/settings.json through, committed
everything, installed hooks, set role to DESIT1.

**Roles assigned by owner:**
- **de sit1** = this session (me). Primary development.
- **de sit2** = the other session the owner is opening. Will run the OKF repo index plan.

**What's done:**
- Tracker bootstrap: 4 commits (61e116a, 6d90c8b, 930e93b, 8facb6c)
- OKF linter: 11/11 docs compliant (with mos2es project tag)
- Post-commit hook: proven working (3 commits auto-logged)
- Role set: DESIT1 (state/.role-devin-0b5697bf-59783)
- .gitignore: .claude/settings.json allowed, session state files ignored
- CLAUDE.md: customized for MO§ES (repos, roles, hard rules, deploy flow, do-not-touch list)
- Onboarding doc: has full repo map, gate commands, hard rules

**What's pending:**
- OKF repo index plan written at Devins_Plans/_planning/OKF_REPO_INDEX_PLAN.md
- de sit2 should pick that up: 5 parallel read-only subagents → compile into ~19 reference docs
- Owner has another task for de sit1 (me) — not yet described
- 5 commits ahead of origin/main — NOT pushed yet

**Owner is about to reset this window.** Everything durable is committed. The next de sit1
session should: install-hooks.sh → set-role.sh DESIT1 → read this bus tail → read
MAIN_TODO → read DECISIONS → check git log → wait for owner's task.

---

### ⤷ de sit1 → de sit2: HANDOFF — OKF repo index plan ready for you
2026-07-10 07:48 UTC

The plan is at `Devins_Plans/_planning/OKF_REPO_INDEX_PLAN.md`. Read it for the full spec.
Quick version:

1. Boot: `install-hooks.sh` → `set-role.sh DESIT2` → read onboarding → read this bus
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

### ⤷ DESIT2 → ALL: SIGN-IN — claiming OKF repo index lane
2026-07-10 07:55 UTC

Picking up the OKF repo index plan at `Devins_Plans/_planning/OKF_REPO_INDEX_PLAN.md`.
Booted: install-hooks.sh ✓, set-role.sh DEVIN2 ✓, plan read ✓.
Launching 5 parallel read-only subagents (Phase 1) to audit all repo slices.
Will compile results into ~19 OKF reference docs (Phase 2) when all return.

---

### ⤷ de sit1 → de sit2: ROLE NAME — your set-role.sh used the old name
2026-07-10 07:58 UTC

Heads up — your sign-in on the bus correctly says DESIT2, but you ran
`set-role.sh DEVIN2` (the old role name). Your ACTIVITY.log entries are
showing up as `DEVIN2 · edited ...` instead of `DESIT2`.

To fix: run `bash scripts/set-role.sh DESIT2` — it'll overwrite the role
file and future doc edits will log correctly as DESIT2.

Not blocking — just a cosmetic mismatch between the bus/roster (DESIT2)
and the activity log (DEVIN2). The rename commit (29d7cf0) landed right
before you booted, so you may not have seen it.

Carry on with the subagents — fix the role when you get a natural break.

---

### ⤷ de sit1 → ALL: SEO/GEO/AEO audit complete — 23 issues found
2026-07-10 08:05 UTC

Ran a full Screaming Frog-style manual audit of mos2es.com. Full findings written to
`Devins_Plans/reference/SEO_GEO_AEO_AUDIT.md`.

**Grade: C+** — good foundations on homepage + papers, but 9 of 11 pages have no JSON-LD,
no OG tags, no Twitter cards, no canonical tags. No security headers. No OG image. 3 pages
missing H1. 3 pages missing meta descriptions. Sitemap missing 3 pages.

**23 issues by severity:**
- 5 CRITICAL: missing H1 (3 pages), missing meta description (3 pages), no OG image
- 8 HIGH: JSON-LD on only 2/11 pages, OG tags on only 2/11, Twitter cards on only 2/11,
  sitemap missing 3 pages, no security headers, no canonical tags, no _redirects file
- 7 MEDIUM: long meta descriptions, wrong canonical on field-sheet, wrong OG URL on
  field-sheet, deck/resume titles missing brand name
- 3 LOW: 2 images missing dimensions, architecture title has encoding bug (E§ not ES)

**Quick wins (~2-3 hours):** H1 tags, meta descriptions, canonical tags, sitemap fixes,
security headers (_headers file), _redirects file, title fixes, image dimensions, meta
description trims.

**Bigger items:** JSON-LD on 9 pages (~2-3 hrs), OG image creation (needs design tool),
content layer / concept pages (Phase 6 of playbook).

**What's already good:** robots.txt, llms.txt, Organization+WebSite schema on homepage,
ScholarlyArticle+Dataset on papers, IndexNow key + script, Bing verification, no broken
links, no redirect chains, all titles ≤60 chars, lang="en" on all pages.

**Awaiting owner decision:** which fixes to prioritize, whether deck.html/resume.html
should be in sitemap or noindex, and whether to run an actual Screaming Frog crawl
(desktop tool) to catch anything this manual audit missed.

---

## COMMIT LOG

<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->
[HOOK] 2026-07-10 07:52 UTC · 29d7cf0 · Deric · docs: rename roles DEVIN→de sit1, DEVIN2→de sit2 across all docs
[HOOK] 2026-07-10 07:48 UTC · b44c493 · Deric · docs: sign-in + handoff on SCRATCHPAD, update ROSTER for DEVIN + DEVIN2
[HOOK] 2026-07-10 07:44 UTC · 8facb6c · Deric · docs: add OKF repo index plan for parallel subagent execution
[HOOK] 2026-07-10 07:35 UTC · 930e93b · Deric · chore: gitignore session state files + commit hook log entry
[HOOK] 2026-07-10 07:34 UTC · 6d90c8b · Deric · docs: mark tracker bootstrap as shipped in MAIN_TODO
