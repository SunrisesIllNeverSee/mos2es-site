# CURRENT OPERATING STATE — read FIRST

**MO§ES™ site (mos2es.com) is LIVE** — static HTML site deployed via Netlify (main branch, auto-deploy).
**A fresh session, read in order:** this header →
[MAIN_TODO.md](Devins_Plans/MAIN_TODO.md) (what's actually open) →
[DECISIONS.md](Devins_Plans/DECISIONS.md) (why things are the way they are) →
the [SCRATCHPAD.md](Devins_Plans/SCRATCHPAD.md) tail (the live bus) →
[state/ROSTER.md](Devins_Plans/state/ROSTER.md) (who's doing what).

**The repos (know which surface you're touching):**
- **mos2es-site** = this repo. Static marketing/site pages for mos2es.com. Branch `main`. HTML/CSS/JS, no build step. Deployed via Netlify (publish dir `.`).
- **MOS2ES** (github.com/SunrisesIllNeverSee/MOS2ES) = core protocol/research repo.
- **moses-governance** (github.com/SunrisesIllNeverSee/moses-governance) = governance layer.
- **moses-claw-gov** (github.com/SunrisesIllNeverSee/moses-claw-gov) = claw governance tooling.
- **signalaf.com** = sibling site (SEO/GEO/AEO playbook source).
- **signomy.xyz** = sibling site.

**Live versions:** Static site — no package manager, no build tool. Python3 `http.server` for local dev (port 8743, see `.claude/launch.json`). `jq` + `curl` required for `scripts/indexnow-ping.sh`.

---

# SESSION COORDINATION — read FIRST (every session, every time)

This repo runs multiple parallel sessions.

**Org structure:**
- **DEVIN** = primary development session. Operates out of mos2es-site.
- **DEVIN2** = secondary/parallel session. Operates out of mos2es-site or sibling repos.
- **OWNER** = Deric J. McHenry. Mediates through sessions.

To stop coordination from disappearing between sessions:

1. **The bus is `Devins_Plans/SCRATCHPAD.md`.** Read its tail + the COORDINATION PROTOCOL header
   before doing anything. Append your status/decisions/questions there (format:
   `### ⤷ <FROM> → <TO>: <subject>`). Don't start a parallel log.
2. **Log into the activity tracker (once per session):** `bash scripts/set-role.sh <ROLE>`.
   Then update your row in `Devins_Plans/state/ROSTER.md` (Track · Purpose · UTC). The
   PostToolUse hook auto-appends every `Devins_Plans/*.md` edit to
   `Devins_Plans/state/ACTIVITY.log` tagged with your role (no set-role → `UNKNOWN` — visible,
   never silent). Run `bash scripts/status.sh` to see roster + activity side by side.
   It's a TRACKER, not governance — it flags nothing; the human reads the gap.
3. **Install the commit-log hook once per clone:** `bash scripts/install-hooks.sh`
   (git hooks live in `.git/` and DON'T travel — each session/machine must install). It
   auto-appends every commit to SCRATCHPAD's COMMIT LOG.
4. **OKF convention:** every doc in `Devins_Plans/` carries YAML frontmatter
   (`type/title/description/tags/timestamp`). New docs MUST include it. Code files don't.
   Run `node scripts/check-okf.mjs` to verify. Run `node scripts/fix-okf.mjs` to auto-fix.
5. **Acceptance test (never break):** This is a static HTML site — no build/test/lint gates.
   Verify changes by serving locally: `python3 -m http.server 8743` and checking pages render.
   Check for broken links after structural changes.
6. **Devins_Plans docs** = commit to `main`. **Web code** = commit to `main` (Netlify auto-deploys).
7. **Deploy:** Push to `main` → Netlify auto-deploys to mos2es.com. No manual deploy step.

---

# HARD RULES (non-negotiable)

- **Archive, don't delete:** old/unused code → `_archive/`. Never `git rm` something
  reusable — you may reuse ideas later.
- **Selective `git add` only — NEVER stage the whole tree.** Sessions share the working
  tree; staging everything sweeps in another session's WIP. Stage your files by name.
- **Lane discipline:** ping the bus before editing a file another session is mid-flight on.
  Announce before you touch shared files.
- **No secrets in the repo. Never bypass git hooks.** Owner-gated calls (pricing,
  public/private, schema drops) → ask on the bus, don't guess.
- **Do NOT modify HTML chart values or re-export screenshots without explicit instruction.**
  (See `.claude/session_notes.md` — 2026-05-21 incident.) Re-export = screenshot as-is, nothing more.
- **Do NOT touch SEO/GEO/AEO strategy pages without owner approval.**
  `SEO_GEO_AEO_PLAYBOOK.md` and structured data (JSON-LD) are owner-curated.

---

> ⚠️ **DO NOT TOUCH SEO/CONTENT/STRATEGY PAGES:**
> - `SEO_GEO_AEO_PLAYBOOK.md` — owner-curated SEO/GEO/AEO playbook
> - JSON-LD structured data blocks in all HTML pages — owner-curated schema markup
> - `llms.txt` — AI discoverability config
> - `sitemap.xml` — only update when adding/removing pages
> - `robots.txt` — crawl directives

---

# ORIGINAL BUILD GOAL (HISTORICAL — completed; kept for record)

> Static landing page for mos2es.com — "Sovereign Signal Governance." The protocol layer
> for preserving semantic meaning at point of execution: commitment conservation,
> governance enforcement, and lineage-bound artifacts. Site includes: homepage, papers,
> benchmarks, architecture, governance-vacuum article, field sheet, demo video, press,
> legal, resume, and pitch deck. Deployed via Netlify with SEO/GEO/AEO optimization
> (JSON-LD structured data, llms.txt, sitemap, Bing IndexNow).
