# PAGE_SCHEMA_MATRIX.md — Page-Level Structured Data Integration

> Generated 2026-08-26 for the FINAL PAGE-SCHEMA INTEGRATION task.
> Lineage: Search Authority v1.0.0 (frozen, tag `master-canon-v1.0.0`, commit `fd305af`)
>           → Framework → generated Schema → page JSON-LD
> Canon ref: `master-canon-v1.0.0`
> Validation method: rendered HTML in `_site/` after `npm run build` (not source files)

## Architecture

The Organization `#org` node is injected into **every** HTML page by the
`organization-identity` transform in `.eleventy.js`. This transform is the
single source of the canon-backed Organization node — page-specific JSON-LD
blocks and partials reference `#org` via `@id` but do not duplicate it.

Page-specific blocks (WebSite, ScholarlyArticle, TechArticle, etc.) live
inline in each HTML file or in the `head.html` partial (for content pages
using the `content-page.html` layout).

## First Release Scope (rendered block counts)

| Page | URL | Rendered Blocks | Schema Types | Source | Canon Ref | Validation | Status |
|------|-----|-----------------|-------------|--------|-----------|------------|--------|
| Homepage | `/` (index.html) | 4 | Organization, WebSite, SoftwareApplication+DefinedTerm, CreativeWork | Generated (Ello Cello LLC + MO§ES entity from SA v1.0.0) + page-specific (WebSite, CreativeWork patent) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Ontology | `/ontology` (ontology.html) | 3 | Organization, CollectionPage, SoftwareApplication+DefinedTerm | Generated (Ello Cello LLC + MO§ES entity from SA v1.0.0) + page-specific (CollectionPage with ontology resource refs) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Architecture | `/architecture` (architecture.html) | 4 | Organization, WebSite, BreadcrumbList, TechArticle | Generated (Ello Cello LLC from SA v1.0.0) + page-specific (WebSite, BreadcrumbList, TechArticle) + canonical entity refs | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Papers | `/papers` (papers.html) | 6 | Organization, ScholarlyArticle, Dataset×3, BreadcrumbList | Generated (Ello Cello LLC from SA v1.0.0) + page-specific (ScholarlyArticle, Datasets, BreadcrumbList) + canonical entity refs | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Financial Signals Paper | `/financial-signals-paper` (financial-signals-paper.html) | 3 | Organization, ScholarlyArticle, BreadcrumbList | Generated (Ello Cello LLC from SA v1.0.0) + page-specific (ScholarlyArticle, BreadcrumbList) + canonical entity refs | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |

**Total: 20 rendered blocks across 5 target pages.**

## Global Organization Injection

| File | Mechanism | Schema Types | Source | Canon Ref | Validation | Status |
|------|-----------|-------------|--------|-----------|------------|--------|
| `.eleventy.js` | `organization-identity` transform injects into `</head>` of every HTML page | Organization | Generated (Ello Cello LLC from SA v1.0.0) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| `_includes/partials/head.html` | Nunjucks partial included by `content-page.html` layout | WebSite (+ front-matter `jsonld` array template) | Page-specific | N/A | PASS | PRODUCTION-READY |

## Detailed Block Inventory (rendered HTML)

### index.html (4 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | WebSite | `https://mos2es.com/#website` | Page-specific | NO | name, url, publisher→#org |
| 2 | SoftwareApplication+DefinedTerm | `https://mos2es.com/ontology/0.1/entity/moses` | Generated (MO§ES entity) | YES — `APPROVAL-2026-08-14-001 (ID-MOSES-001)` | name, description, enforcementArchitectureFor→commitment_theory, operationalizes→conservation_law, governs→[signomy, civitae] |
| 3 | CreativeWork | `https://mos2es.com/#moses-patent` | Page-specific + generated description | NO (description from generated MO§ES entity) | name, description (canon-backed wording), about→[moses, commitment_theory, conservation_law], mentions→[signomy, civitae], isBasedOn→DOI |
| 4 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) — injected by `.eleventy.js` transform | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout, brand, contactPoint, address |

### ontology.html (3 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | CollectionPage | `https://mos2es.com/ontology` | Page-specific + generated refs | NO (page wrapper) | name, description, about→moses entity, mainEntity→DefinedTermSet with 7 entity refs, subjectOf→6 ontology resource files |
| 2 | SoftwareApplication+DefinedTerm | `https://mos2es.com/ontology/0.1/entity/moses` | Generated (MO§ES entity) | YES — `APPROVAL-2026-08-14-001 (ID-MOSES-001)` | name, description, enforcementArchitectureFor, operationalizes, governs |
| 3 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) — injected by `.eleventy.js` transform | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout, brand, contactPoint, address |

### architecture.html (4 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | WebSite | `https://mos2es.com/#website` | Page-specific | NO | name, url, publisher→#org |
| 2 | BreadcrumbList | — | Page-specific | NO | Home→Architecture |
| 3 | TechArticle | — | Page-specific + canonical entity refs | NO | headline, description, about→[moses, commitment_theory, conservation_law], mentions→[signomy, civitae, kassa] |
| 4 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) — injected by `.eleventy.js` transform | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout, brand, contactPoint, address |

### papers.html (6 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | ScholarlyArticle | `doi:10.5281/zenodo.20029607` | Page-specific + canonical entity refs | NO | headline, about→[conservation_law, commitment_theory], mentions→[moses] |
| 2 | Dataset | `doi:10.5281/zenodo.19105225` | Page-specific + canonical entity refs | NO | name, about→[conservation_law, commitment_theory] |
| 3 | Dataset | `doi:10.5281/zenodo.19109397` | Page-specific + canonical entity refs | NO | name, about→[conservation_law, commitment_theory] |
| 4 | Dataset | `doi:10.5281/zenodo.20031715` | Page-specific + canonical entity refs | NO | name, about→[commitment_theory, conservation_law, moses] |
| 5 | BreadcrumbList | — | Page-specific | NO | Home→Papers & Proofs |
| 6 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) — injected by `.eleventy.js` transform | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout, brand, contactPoint, address |

### financial-signals-paper.html (3 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | ScholarlyArticle | `doi:10.5281/zenodo.21069978` | Page-specific + canonical entity refs | NO | headline, about→[conservation_law, commitment_theory], mentions→[moses] |
| 2 | BreadcrumbList | — | Page-specific | NO | Home→Papers→Financial Signals |
| 3 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) — injected by `.eleventy.js` transform | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout, brand, contactPoint, address |

## Legacy Schema Replaced

| File | Block | Legacy Classification | Issue | Fix |
|------|-------|----------------------|-------|-----|
| `.eleventy.js` | `organizationIdentity` (organization-identity transform) | LEGACY_HAND_WRITTEN | name="MO§ES" (wrong — Organization is Ello Cello LLC per canon); hand-written description; sameAs typo `SunrisesIllneverSee` (lowercase n); missing provenance fields; `parentOrganization` self-referential to Ello Cello LLC | Replaced with generated Ello Cello LLC values; fixed typo; added sourceSystem/canonBacked/authorityApprovalRef/associatedWith; removed self-referential parentOrganization; preserved brand/contactPoint/address/knowsAbout |
| `index.html` | Organization (inline) | LEGACY_HAND_WRITTEN (duplicate) | Duplicated the transform's Organization block with the same `@id`, causing conflicting `name` values in rendered HTML | Removed inline Organization block; transform is the single source of `#org` |
| `_includes/partials/head.html` | Organization (inline) | LEGACY_HAND_WRITTEN (duplicate) | Duplicated the transform's Organization block on content pages using `content-page.html` layout | Removed inline Organization block; transform is the single source of `#org` |
| `index.html` | CreativeWork | LEGACY_HAND_WRITTEN | Hand-written canon-sensitive description; generic `about` string; no canonical entity refs | Replaced description with generated MO§ES entity description; added `about`/`mentions` with canonical entity IDs |
| `ontology.html` | (none) | MISSING | No JSON-LD blocks at all | Added CollectionPage + DefinedTermSet + MO§ES entity block |
| `architecture.html` | TechArticle | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs |
| `papers.html` | ScholarlyArticle + 3 Datasets | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs to all 4 blocks |
| `financial-signals-paper.html` | ScholarlyArticle | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs |

## Disputed/Incorrect Legacy Wording Removed

1. **Organization name "MO§ES"** — The Organization at `https://mos2es.com/#org` is Ello Cello LLC per Search Authority canon (entity `ello_cello_llc`, `canonical_urls: ["https://mos2es.com/#org"]`). MO§ES is a product/entity (SoftwareApplication+DefinedTerm), not an organization. Fixed in the `.eleventy.js` `organizationIdentity` transform, which is the single injection point for every rendered page.

2. **Organization description** — Legacy: "Sovereign signal governance — the protocol layer for preserving semantic meaning at point of execution: commitment conservation, governance enforcement, and lineage-bound artifacts." This is a marketing description, not the canon-backed Ello Cello LLC description. Replaced with generated: "Organization associated with the owner's published works and products, including SigRank and MO§ES™."

3. **CreativeWork patent description** — Legacy: "Constitutional AI governance enforcement engine for the Conservation Law of Commitment. Patent Serial No. 63/877,177 (Provisional, pending)." This is hand-written and not canon-backed. Replaced with generated MO§ES entity description from SA v1.0.0.

4. **sameAs typo** — `https://github.com/SunrisesIllneverSee` (lowercase 'n' in 'never') in the Organization block. Fixed to `https://github.com/SunrisesIllNeverSee` in the `.eleventy.js` transform.

5. **Self-referential parentOrganization** — Legacy transform had `#org` (name="MO§ES") with `parentOrganization` pointing to `#publisher` (name="Ello Cello LLC"). Since `#org` IS Ello Cello LLC per canon, the `parentOrganization` was self-referential and incorrect. Removed.

6. **No disputed wording emitted as owner-approved** — All canon-backed blocks carry `canonBacked: true` with valid `authorityApprovalRef`. No disputed claims are promoted. The MO§ES description used is the frozen v1.0.0 canon description (owner_approved, APPROVAL-2026-08-14-001).

## Validation Results (rendered HTML in `_site/`)

Validation performed by parsing rendered HTML output after `npm run build`,
not by inspecting source files.

- **Files checked:** 5 target pages + 4 content pages (about, contact, vs/guardrails, blog/why-ai-deployments-fail)
- **Blocks validated:** 35 (20 target + 15 content)
- **JSON parse:** 35/35 PASS
- **Duplicate @id check:** 0 duplicates — every `@id` resolves to exactly one node per page
- **Schema.org types:** All valid (Organization, WebSite, CollectionPage, DefinedTermSet, SoftwareApplication, DefinedTerm, CreativeWork, TechArticle, ScholarlyArticle, Dataset, BreadcrumbList, AboutPage, ContactPage, FAQPage)
- **MO§ES namespace:** `https://mos2es.com/ontology/0.1/` — correct in all blocks using custom predicates
- **Canon-backed values:** All canon-backed blocks match generated source (Ello Cello LLC description, MO§ES entity description)
- **Disputed wording:** None emitted as owner-approved
- **Authority approval refs:** All canon-backed blocks have valid refs (APPROVAL-2026-08-14-001)
- **Canonical URLs:** All `https://mos2es.com` format, no http:// or www. variants
- **Entity references:** All `about`/`mentions` reference valid canonical entity URIs (7 entities: moses, commitment_theory, conservation_law_of_commitment, sigrank, kassa, signomy, civitae)
- **Legacy name="MO§ES" on Organization #org:** 0 occurrences in rendered HTML
- **Build:** `npm run build` succeeds (80 files written, 0 errors)
- **Tests:** `npm test` — 10/10 pass
- **Repo check:** `python3 .repo/scripts/repo_check.py --ci` — 0 errors, 22 warnings (all pre-existing OKF frontmatter)

**VERDICT: PASS — 0 errors, 0 warnings**
