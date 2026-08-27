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
- **de sit1** = primary development session. Operates out of mos2es-site.
- **de sit2** = secondary/parallel session. Operates out of mos2es-site or sibling repos.
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
  `SEO_GEO_AEO_PLAYBOOK.md` is owner-curated. JSON-LD is split into two
  categories — see the structured-data rule below.

---

> ⚠️ **STRUCTURED DATA RULE (updated 2026-08-26 — supersedes prior "do not touch JSON-LD" rule):**
>
> JSON-LD on this site is now governed by two categories:
>
> **A. CANONICAL ENTITY DATA — governed by Search Authority / generated profile**
> - Entity descriptions, identities, canonical IDs (@id values under
>   `https://mos2es.com/ontology/0.1/entity/`), `name`, `description`,
>   `alternateName`, relationship fields (`governs`, `operationalizes`,
>   `enforcementArchitectureFor`, `associatedWith`), `sourceSystem`,
>   `canonBacked`, `authorityApprovalRef`, and the `#org` Organization
>   identity (Ello Cello LLC)
> - These MUST derive from the generated MO§ES schema pipeline:
>   `Search Authority → Framework → generated Schema → page-level JSON-LD`
> - The `.eleventy.js` `organizationIdentity` transform is the single
>   source of the `#org` node. Page-specific blocks reference `#org`
>   via `@id` but do not duplicate it.
> - Do not hand-write or override canon-sensitive values. If a value
>   conflicts with the generated schema, the generated schema wins.
>
> **B. PAGE-SPECIFIC STRUCTURED DATA — locally curated and protected**
> - Page-specific Schema.org types (`TechArticle`, `ScholarlyArticle`,
>   `BreadcrumbList`, `Dataset`, `WebPage`, `CollectionPage`, etc.)
> - Page-specific `about`/`mentions` references to canonical entity IDs
> - `SEO_GEO_AEO_PLAYBOOK.md`, `llms.txt`, `sitemap.xml`, `robots.txt`
> - These remain owner-curated. Do not modify without owner approval.
>
> When in doubt: if it describes a canonical ENTITY (what MO§ES is,
> who owns it, what it governs), it's category A. If it describes a
> PAGE (an article about a topic, a breadcrumb trail), it's category B.

---

# ORIGINAL BUILD GOAL (HISTORICAL — completed; kept for record)

> Static landing page for mos2es.com — "Sovereign Signal Governance." The protocol layer
> for preserving semantic meaning at point of execution: commitment conservation,
> governance enforcement, and lineage-bound artifacts. Site includes: homepage, papers,
> benchmarks, architecture, governance-vacuum article, field sheet, demo video, press,
> legal, resume, and pitch deck. Deployed via Netlify with SEO/GEO/AEO optimization
> (JSON-LD structured data, llms.txt, sitemap, Bing IndexNow).

---

## Master Canon Context (Search Authority)

This repository is the **MO§ES™** public site (mos2es.com). It is governed by
the Search Authority master canon.

### When to load canon context

Before modifying any of the following, load the relevant canon context:

- canonical product definitions (what MO§ES™ is/is not)
- ecosystem relationships (MO§ES™ ↔ Commitment Theory, Conservation Law, SigRank, Signomy, CIVITAE, KASSA)
- terminology (MO§ES™ rendering — never MO§E§; aliases: mos2es, MOSES)
- research claims or governance architecture descriptions
- product boundaries (MO§ES™ vs KASSA public demonstration layer)
- public positioning or SEO/AEO copy that makes canonical claims

### How to load canon context

```bash
export SEARCH_AUTHORITY_PATH="${SEARCH_AUTHORITY_PATH:-$HOME/Developer/active/search-authority}"
python3 "$SEARCH_AUTHORITY_PATH/canon_cli.py" context moses
```

Or use the MCP server (compatible agents):

```bash
python3 "$SEARCH_AUTHORITY_PATH/canon_mcp.py"
```

If the canon repository is unavailable, **do not invent canonical context** —
ask the owner. The canon outranks ad-hoc public copy or generated model output
for normative product/research truth.

### What is NOT authority-sensitive

CSS/layout, static asset updates, and build config do **not** require loading
the canon.

### Key governance rules

- Exactly ONE MO§ES entity. Canonical display: MO§ES™. Accepted prose: MO§ES.
- Aliases: mos2es, MOSES. Never render: MO§E§ or MO§E§™.
- Do NOT collapse Signomy and CIVITAE — they are distinct entities.
- MO§ES™ is the enforcement architecture for Commitment Theory.
- MO§ES™ operationalizes the Conservation Law of Commitment.
- The harness may measure authority, but it cannot manufacture authority.
- Automated systems may not promote claims into owner-approved truth.
