# CURRENT OPERATING STATE — read FIRST

Updated 2026-11-05T11:24Z.

**mos2es.com is LIVE** as a short landing site (consolidated 2026-11-04, PR #13).
It is an Eleventy 3 build served by the **Cloudflare Pages** project `mos2es`.
Netlify is no longer used; `netlify.toml` and `src/edge-functions/` are leftovers.

- **Pages:** `/`, `/products`, `/research`, `/explore`, `/contact`, `/about`, plus kept
  `/faq`, `/privacy`, `/deck`, `/3d/`, five `/concepts/*` pages and one guide.
  See README.md for the table.
- **Retired pages:** listed in `.eleventyignore`; sources kept; `_redirects` 301s each
  old address to its closest live page. Old site frozen at tag
  `archive/mos2es-site-2026-11-04` and https://d3b4511e.mos2es.pages.dev.
- **Layout:** new pages use `_includes/layouts/simple.html` and `assets/landing.css`.

**Build, test, deploy:**

```bash
npm install && npm test && npm run build
npx wrangler pages deploy _site --project-name mos2es --branch main   # owner-approved only
```

Merging to `main` does **not** deploy. A deploy is an owner-gated action: deploy only when the owner
asks for it, from a clean `main`, then check the live pages and a few redirects.
CI (`.github/workflows/repo-standard.yml`) runs the repo check, `npm test` and the build on PRs.

**The repos:**
- **mos2es-site** = this repo (public).
- **MOS2ES**, **moses-governance**, **moses-claw-gov** = protocol, governance and tooling repos.
- **signalaf.com**, **signomy.xyz**, **aquaidp.xyz** = sibling product sites.

---

# SESSION COORDINATION

Multiple sessions may work in this repo. Before editing, check `git status`, the recent log and
open branches. Stage by explicit path only. The older bus in `Devins_Plans/` is historical.

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

# SITE PURPOSE

> mos2es.com is the minimal home for Ello Cello's work: it points people to SignalAF, SigRank,
> AQUA, Signomy and Commitment Theory, the research, the demos and 3D models, and contact.
> The 2025 to 2026 "Sovereign Signal Governance" product site (papers, benchmarks,
> architecture, field sheet, press, legal, resume and topic hubs) was retired on 2026-11-04.

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
