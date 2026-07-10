---
type: Design
title: OKF Repo Index Plan — full knowledge inventory via parallel subagents
description: Plan to index every component of the mos2es-site repo into OKF-compliant reference docs. Two phases: parallel audit (5 subagents) then sequential compilation. Pick this up, run the subagents, commit the results.
tags: [mos2es, okf, indexing, plan, subagents, reference]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:56 UTC
---

# OKF Repo Index Plan

**Goal:** Index every component of the mos2es-site repo into OKF-compliant reference docs
under `Devins_Plans/`, so any future session can understand what's in the repo without
reading every file.

**Method:** Two phases. Phase 1 = 5 parallel read-only subagents that audit different
slices of the repo. Phase 2 = sequential compilation of audit results into OKF docs +
DOC_INDEX update + commit.

---

## Phase 1: Parallel Audit (5 subagents, read-only)

Launch all 5 as background subagents simultaneously. Each reads its slice and returns a
structured summary. No writes — just audit.

### SA1: HTML Pages Audit

**Files:** `index.html`, `architecture.html`, `benchmarks.html`, `deck.html`,
`demovideo.html`, `field-sheet.html`, `governance-vacuum.html`, `legal.html`,
`papers.html`, `press.html`, `resume.html`

**For each page, extract:**
- Page title + meta description
- Purpose (1-2 sentences: what is this page for?)
- Key sections (H1/H2 outline)
- JSON-LD structured data types present (Organization, Article, Dataset, etc.)
- Nav links (what pages link to what)
- External dependencies (CDNs, fonts, APIs, Loom, etc.)
- Inline JS/CSS (note if page has embedded scripts/styles)
- Last modified (from git log if possible)

**Return format:** One section per page, structured markdown.

### SA2: JS/JSX + Scripts Audit

**Files:** `deck-stage.js`, `tweaks-panel.jsx`, `tweaks.jsx`, `scripts/indexnow-ping.sh`,
`scripts/install-hooks.sh`, `scripts/set-role.sh`, `scripts/status.sh`,
`scripts/check-okf.mjs`, `scripts/fix-okf.mjs`, `scripts/hooks/post-commit.sh`,
`scripts/hooks/session-start.sh`, `scripts/hooks/stamp-last-touched.sh`

**For each file, extract:**
- What it does (1-2 sentences)
- Dependencies (what it imports/calls)
- How it's loaded/invoked (which HTML page loads it, or how the script is run)
- Key functions/components
- Any external dependencies (jq, curl, node version requirements)

**Return format:** One section per file, structured markdown.

### SA3: Root Docs + Config Audit

**Files:** `README.md`, `SEO_GEO_AEO_PLAYBOOK.md`, `llms.txt`, `netlify.toml`,
`robots.txt`, `sitemap.xml`, `BingSiteAuth.xml`, `3cb9dad60ebc43248d4ec58b2d9aca.txt`,
`.gitignore`, `.claude/launch.json`, `.claude/session_notes.md`

**For each file, extract:**
- What it is + purpose
- Key contents (summary, not full dump)
- Whether it's owner-curated / do-not-touch
- Relationships (e.g. sitemap.xml ↔ pages, llms.txt ↔ AI discoverability)

**Return format:** One section per file, structured markdown.

### SA4: img/benchmarks/ Audit

**Path:** `img/` (focus on `img/benchmarks/`)

**Files to find and catalog:**
- `img/benchmarks/truths/*.md` — raw benchmark data (combined_raw_numbers, chart_kernels,
  codex_raw_numbers, mos2es_raw_numbers, claude_raw_numbers, chart_raw, aa_model_averages)
- `img/benchmarks/poster.html`, `poster_honest.html` — poster pages
- `img/benchmarks/MOSES_HONEST_PORTRAIT.png` — poster image
- `img/benchmarks/archive/*` — archived chart/card/poster files
- `img/` root — any other images
- `assets/founder.jpg`, `assets/moses-mark.png`

**For each, extract:**
- What it is
- Whether it's referenced by any HTML page (and which)
- Whether it's active or archived
- For truth data: what metrics/models are covered

**Return format:** Structured markdown, grouped by directory.

### SA5: uploads/slides/ + .stash/ Audit

**Paths:** `uploads/slides/` (10 slide folders), `.stash/`

**Slides folders:** `01-cover`, `02-problem`, `04-traction-benchmarks`,
`05-competitive-field`, `06-moat-traction`, `07-market-why-now`, `08-tam`,
`09-founder`, `10-the-ask`, `11-the-law`

**For each slide folder, extract:**
- Slide number + name
- Content summary (from the .md file)
- Whether there's an -edits.md file and what it contains
- Relationship to deck.html (are these the source content for the pitch deck?)

**For .stash/:**
- `resume.html` — is this an older version of the root resume.html?
- `operator.html` — what is this? Is it referenced anywhere?

**Return format:** Structured markdown, grouped by slide folder + .stash.

---

## Phase 2: Sequential Compilation (after all 5 SAs return)

Once all 5 audit summaries are in, compile them into OKF docs:

### 2a. Create topic folders
```
Devins_Plans/reference/
Devins_Plans/reference/pages/      ← one doc per HTML page
Devins_Plans/reference/scripts/    ← one doc for JS/JSX, one for tracker scripts
Devins_Plans/reference/config/     ← one doc for root config files
Devins_Plans/reference/assets/     ← one doc for img/benchmarks/assets
Devins_Plans/reference/deck/       ← one doc for uploads/slides content
```

### 2b. Write reference docs
Each doc gets OKF frontmatter:
```yaml
---
type: Reference
title: <title>
description: <description>
tags: [mos2es, reference, <category>]
timestamp: 2026-07-10
---
```

**Docs to create:**
1. `reference/pages/index.md` — homepage overview
2. `reference/pages/architecture.md` — architecture page
3. `reference/pages/benchmarks.md` — benchmarks page
4. `reference/pages/deck.md` — pitch deck page
5. `reference/pages/demovideo.md` — demo video page
6. `reference/pages/field-sheet.md` — field sheet page
7. `reference/pages/governance-vacuum.md` — governance vacuum article
8. `reference/pages/legal.md` — legal page
9. `reference/pages/papers.md` — papers page
10. `reference/pages/press.md` — press page
11. `reference/pages/resume.md` — resume page
12. `reference/scripts/frontend.md` — deck-stage.js, tweaks-panel.jsx, tweaks.jsx
13. `reference/scripts/tracker.md` — tracker scripts (install-hooks, set-role, status, check-okf, fix-okf, hooks)
14. `reference/scripts/seo.md` — indexnow-ping.sh
15. `reference/config/root-config.md` — netlify.toml, robots.txt, sitemap.xml, llms.txt, BingSiteAuth, IndexNow key, .gitignore
16. `reference/config/seo-playbook.md` — SEO_GEO_AEO_PLAYBOOK.md summary (do NOT copy content — just describe + link)
17. `reference/assets/benchmarks.md` — img/benchmarks/ inventory (truths, posters, archive)
18. `reference/assets/images.md` — img/ root + assets/ inventory
19. `reference/deck/slides.md` — uploads/slides/ inventory (all 10 slides + .stash)

### 2c. Update DOC_INDEX.md
Add all new reference docs to the REFERENCE section with correct paths.

### 2d. Update index.md
Add the new `reference/` subfolders to the topic folders section.

### 2e. Verify + commit
```bash
OKF_PROJECT_TAG=mos2es node scripts/check-okf.mjs   # must pass
git add Devins_Plans/reference/ Devins_Plans/DOC_INDEX.md Devins_Plans/index.md
git commit -m "docs: OKF repo index — reference docs for all pages, scripts, config, assets"
```

---

## Execution instructions for the picking-up session

1. `bash scripts/install-hooks.sh`
2. `bash scripts/set-role.sh DESIT2`
3. Read this plan + the onboarding doc
4. Launch all 5 Phase 1 subagents in parallel (background, `subagent_explore` profile)
5. Wait for all 5 to return
6. Execute Phase 2 sequentially (compile, write docs, update index, lint, commit)
7. Write a close-out on SCRATCHPAD: `### ⤷ de sit2 → ALL: SIGN-OUT — OKF repo index complete`

**Subagent prompt template for each SA:**
```
You are auditing the mos2es-site repo at /Users/dericmchenry/Desktop/mos2es-site.
Your task: <SA-specific task from above>

For each file, read it and extract the requested information.
Return a structured markdown summary with one section per file.
Do NOT modify any files — this is a read-only audit.
Be thorough but concise. Focus on: what it is, what it does, what it depends on.
```

---

## What NOT to do

- Do NOT copy full content from SEO_GEO_AEO_PLAYBOOK.md — it's owner-curated. Just describe it + link to it.
- Do NOT modify any HTML pages, JS, or config files — this is a documentation-only task.
- Do NOT touch JSON-LD blocks in HTML — owner-curated.
- Do NOT create docs for files under Devins_Plans/ itself (that would be recursive — those docs already exist).
- Do NOT create docs for .git/ or .netlify/ — internal/ephemeral.
