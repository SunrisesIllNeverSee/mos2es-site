---
type: Coordination
title: SCRATCHPAD — the live coordination bus
description: The live cross-session coordination bus for the MO§ES site (mos2es.com). Append status, decisions, questions, handoffs here. Format: ### ⤷ <FROM> → <TO>: <subject>. Don't start a parallel log — this IS the log.
tags: [mos2es, coordination, scratchpad, bus, session-handoff]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:05 UTC
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

### ⤷ de sit1 → ALL: SF crawl cross-referenced — 28 issues, grade C-
2026-07-10 08:25 UTC

Owner dropped the Screaming Frog exports into `Devins_Plans/audit.run1/`. I've
cross-referenced them with my manual audit and updated
`Devins_Plans/reference/SEO_GEO_AEO_AUDIT.md`.

**Crawl stats:** 44 URLs (23 internal, 21 external) · 16 HTML pages · 23 seconds ·
0 broken internal links · 100% HTTPS.

**Grade revised: C- → C-** (SF found worse problems than manual alone):

**New findings from SF (not in manual audit):**
1. **6 exact duplicate pages** — poster pages served at both .html and clean URLs
   (identical hashes). Splits PageRank. HIGH priority.
2. **field-sheet is NON-INDEXABLE** — canonical points to homepage. Google is being
   told to de-index it. This is the most urgent single-line fix.
3. **resume.html was NOT CRAWLED** — it's an orphan, not linked from anywhere, not in
   sitemap. Invisible to search engines.
4. **Zenodo DOI link timing out** — `zenodo.org/records/20029607` (the Conservation
   Law paper, linked from 10 pages). Most important external link on the site.
5. **8 pages with no internal outlinks** — deck.html and architecture.html are dead
   ends (0 nav links). Users/crawlers can't navigate away from them.
6. **SF detected 0 structured data** — FALSE POSITIVE. I validated all 6 JSON-LD
   blocks with Python (3 on index.html, 3 on papers.html) — all valid JSON. SF's
   structured data detection wasn't enabled in the crawl config.
7. **mos2es.io → www.mos2es.io redirect** — field-sheet links to .io domain which
   301-redirects. Leaking link equity.
8. **Medium profile 403** — blocks crawlers (not a real issue, Medium blocks all bots).
9. **PDF has broken title** — "localhost:59872/#" in MOSES_UPDATED_VSRAW.pdf metadata.

**Confirmed good from SF:** 0 broken internal links, 0 internal redirects, 100% HTTPS,
HSTS present, no JS errors, no mixed content, no spelling/grammar errors.

**Full audit + fix priority in:** `Devins_Plans/reference/SEO_GEO_AEO_AUDIT.md`
**Raw SF exports in:** `Devins_Plans/audit.run1/`

**Awaiting owner:** ready to start the fix campaign whenever you give the word. Phase 1
(critical fixes) is ~1 hour. Also: should I re-run SF with structured data detection
enabled to get a real JSON-LD count? And do you want to send the 6-7 repos for their
own SEO/GEO/AEO audit?

---

### ⤷ de sit1 → ALL: Pass 1 complete — 10 critical fixes shipped (d88bf5f)
2026-07-10 08:48 UTC

Pass 1 of the 3-pass SEO/GEO/AEO fix campaign is committed. 15 files changed.

**What's fixed:**
1. field-sheet canonical → self-referencing (was de-indexing the page)
2. field-sheet og:url → correct URL
3. 4 poster pages have canonical tags (eliminates 8 duplicate content pages)
4. resume.html + demovideo.html added to sitemap
5. resume.html linked from index.html footer (was orphan, undiscoverable)
6. H1 added to index.html (wordmark→h1), deck.html (sr-only), resume.html (name→h1)
7. Meta descriptions added to architecture, deck, resume
8. Architecture title fixed: MO§E§™ → MO§ES™, dropped "Investor"
9. All Zenodo links → DOI URLs (records URL was 503)
10. mos2es.io links removed from field-sheet (old domain)
11. Titles expanded: press, demovideo, legal, deck, resume

**Owner decisions applied:**
- resume.html: added to sitemap + linked (no noindex)
- deck.html: NOT in sitemap
- architecture title: dropped "Investor"
- mos2es.io: links removed (old site)
- short titles: expanded

**Next: Pass 2 — build the structure** (canonical tags on all pages, security
headers, _redirects, OG/Twitter tags, JSON-LD on 9 pages, nav links on deck +
architecture). ~2-3 hours. Starting now.

---

### ⤷ de sit1 → ALL: Pass 2 complete — structure built (5c506d6)
2026-07-10 09:05 UTC

Pass 2 of the 3-pass SEO/GEO/AEO fix campaign is committed. 13 files changed, 435 insertions.

**What's built:**
- Canonical tags on all 11 pages (self-referencing, clean URLs)
- OG tags on all 11 pages (7 tags each: type, url, title, description, image, width, height)
- Twitter card tags on all 11 pages (summary_large_image)
- JSON-LD on 9 pages that were missing it (33 total blocks across 11 pages, all valid JSON):
  - WebSite schema on all 9 new pages
  - BreadcrumbList on all 9 new pages
  - Page-specific types: Dataset (benchmarks), WebPage (legal, press, field-sheet, deck),
    Article (governance-vacuum), TechArticle (architecture), VideoObject (demovideo),
    ProfilePage+Person (resume)
- _headers file: 4 security headers (X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, CSP) — was 100% missing
- _redirects file: clean URL rewrites for 9 pages
- Nav footer added to deck.html (was a dead end — 0 internal links)
- Nav footer added to architecture.html (was a dead end — 0 internal links)

**Used 3 parallel subagents** for the page-level work (SA1: index/papers/legal/press,
SA2: benchmarks/field-sheet/governance-vacuum, SA3: demovideo/resume). I handled
deck + architecture myself (needed nav links + design care).

**Next: Pass 3 — polish + verify** (meta trims, image dimensions, compression,
demovideo content, nofollow on Medium, IndexNow push, re-crawl prep).

---

### ⤷ de sit2 → ALL: SIGN-OUT — OKF repo index complete
2026-07-10 08:04 UTC

Phase 2 of the OKF repo index plan is done. Committed as 4430df0.

**What shipped:**
- 19 OKF-compliant reference docs under `Devins_Plans/reference/`:
  - `pages/` (11): one doc per HTML page
  - `scripts/` (3): frontend JS/JSX, tracker scripts, SEO scripts
  - `config/` (2): root config files, SEO playbook summary (describe + link only, no content copied)
  - `assets/` (2): img/benchmarks/ inventory, img/assets/ inventory
  - `deck/` (1): uploads/slides/ source + .stash/
- `DOC_INDEX.md` REFERENCE section updated with all 19 docs
- `index.md` topic folders section updated with reference/ subfolders
- `check-okf.mjs`: all 31 docs compliant (was 11, now 31)

**SA3 gap:** The SA3 subagent (root docs + config) didn't return a completion notification,
so I audited those files myself (README, netlify.toml, robots.txt, sitemap.xml, llms.txt,
BingSiteAuth.xml, IndexNow key, .gitignore, .claude/launch.json, .claude/session_notes.md)
and folded the results into `reference/config/root-config.md`.

**Lane discipline:** I did NOT touch or commit de sit1's `reference/SEO_GEO_AEO_AUDIT.md`
(separate workstream). Only staged my own files.

**Notable findings surfaced in the reference docs (for owner awareness, not action taken):**
- `architecture.html` title has encoding bug: "MO§E§™" (§ in place of S) — matches the
  LOW finding in de sit1's SEO audit
- `sitemap.xml` lists 8 of 11 pages (deck, demovideo, resume not listed)
- `assets/moses-mark.png` is unreferenced by any HTML page
- `uploads/slides/` has naming inconsistencies (folder 08-tam contains `07a-tam.md`, etc.)
- `tweaks-panel.jsx` and `tweaks.jsx` are not loaded by any HTML page (WIP/library files)

These are documented in the relevant reference docs for future sessions to find.

---

## COMMIT LOG

<!-- POST-COMMIT HOOK APPENDS BELOW THIS LINE -->
[HOOK] 2026-07-10 08:55 UTC · 5c506d6 · Deric · fix: Pass 2 — build the SEO/GEO/AEO structure (13 files)
[HOOK] 2026-07-10 08:51 UTC · ab439c7 · Deric · fix: remove stale crawl reports, credit Mettle as content layer reference
[HOOK] 2026-07-10 08:48 UTC · 3107c6e · Deric · docs: Pass 1 complete — bus update
[HOOK] 2026-07-10 08:48 UTC · d88bf5f · Deric · fix: Pass 1 — critical SEO/GEO/AEO fixes (10 issues)
[HOOK] 2026-07-10 08:47 UTC · 3eb98c2 · Deric · docs: add reference plans from signalaf.com SEO/GEO/AEO implementation
[HOOK] 2026-07-10 08:45 UTC · efd2f92 · Deric · docs: add page-level SEO beef-up + academic GEO mapping playbook
[HOOK] 2026-07-10 08:32 UTC · df05f2a · Deric · docs: 3-pass SEO/GEO/AEO fix plan — 28 issues, phased approach
[HOOK] 2026-07-10 08:25 UTC · 9b738c5 · Deric · docs: post SF cross-reference findings on the bus
[HOOK] 2026-07-10 08:24 UTC · f4b2dcc · Deric · docs: cross-reference SF crawl with manual audit — 28 issues, grade C-
[HOOK] 2026-07-10 08:05 UTC · 8c41795 · Deric · docs: sign out on SCRATCHPAD — OKF repo index complete
[HOOK] 2026-07-10 08:04 UTC · 4430df0 · Deric · docs: OKF repo index — 19 reference docs for all pages, scripts, config, assets, deck
[HOOK] 2026-07-10 08:02 UTC · ddf836a · Deric · docs: SEO/GEO/AEO audit — 23 issues found, grade C+
[HOOK] 2026-07-10 07:52 UTC · 29d7cf0 · Deric · docs: rename roles DEVIN→de sit1, DEVIN2→de sit2 across all docs
[HOOK] 2026-07-10 07:48 UTC · b44c493 · Deric · docs: sign-in + handoff on SCRATCHPAD, update ROSTER for DEVIN + DEVIN2
[HOOK] 2026-07-10 07:44 UTC · 8facb6c · Deric · docs: add OKF repo index plan for parallel subagent execution
[HOOK] 2026-07-10 07:35 UTC · 930e93b · Deric · chore: gitignore session state files + commit hook log entry
[HOOK] 2026-07-10 07:34 UTC · 6d90c8b · Deric · docs: mark tracker bootstrap as shipped in MAIN_TODO
