# PAGE_SCHEMA_MATRIX.md — Page-Level Structured Data Integration

> Generated 2026-08-26 by ASSIST (rep2) for the FINAL PAGE-SCHEMA INTEGRATION task.
> Lineage: Search Authority v1.0.0 (frozen, tag `master-canon-v1.0.0`, commit `fd305af`)
>           → Framework → generated Schema → page JSON-LD
> Canon ref: `master-canon-v1.0.0`

## First Release Scope

| Page | URL | Schema Types | Source | Canon Ref | Validation | Status |
|------|-----|-------------|--------|-----------|------------|--------|
| Homepage | `/` (index.html) | Organization, WebSite, SoftwareApplication+DefinedTerm, CreativeWork | Generated (Ello Cello LLC + MO§ES entity from SA v1.0.0) + page-specific (WebSite, CreativeWork patent) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Ontology | `/ontology` (ontology.html) | CollectionPage, DefinedTermSet, SoftwareApplication+DefinedTerm | Generated (MO§ES entity from SA v1.0.0) + page-specific (CollectionPage with ontology resource refs) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Architecture | `/architecture` (architecture.html) | WebSite, BreadcrumbList, TechArticle | Page-specific (WebSite, BreadcrumbList, TechArticle) + canonical entity refs (about/mentions) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Papers | `/papers` (papers.html) | ScholarlyArticle, Dataset×3, BreadcrumbList | Page-specific (ScholarlyArticle, Datasets, BreadcrumbList) + canonical entity refs (about/mentions) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |
| Financial Signals Paper | `/financial-signals-paper` (financial-signals-paper.html) | ScholarlyArticle, BreadcrumbList | Page-specific (ScholarlyArticle, BreadcrumbList) + canonical entity refs (about/mentions) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |

## Global Partial (affects content pages)

| File | Schema Types | Source | Canon Ref | Validation | Status |
|------|-------------|--------|-----------|------------|--------|
| `_includes/partials/head.html` | Organization, WebSite | Generated (Ello Cello LLC from SA v1.0.0) + page-specific (WebSite) | `master-canon-v1.0.0` | PASS | PRODUCTION-READY |

## Detailed Block Inventory

### index.html (4 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses, knowsAbout |
| 2 | WebSite | `https://mos2es.com/#website` | Page-specific | NO | name, url, publisher→#org |
| 3 | SoftwareApplication+DefinedTerm | `https://mos2es.com/ontology/0.1/entity/moses` | Generated (MO§ES entity) | YES — `APPROVAL-2026-08-14-001 (ID-MOSES-001)` | name, description, enforcementArchitectureFor→commitment_theory, operationalizes→conservation_law, governs→[signomy, civitae] |
| 4 | CreativeWork | `https://mos2es.com/#moses-patent` | Page-specific + generated description | NO (description from generated MO§ES entity) | name, description (canon-backed wording), about→[moses, commitment_theory, conservation_law], mentions→[signomy, civitae], isBasedOn→DOI |

### ontology.html (2 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | CollectionPage | `https://mos2es.com/ontology` | Page-specific + generated refs | NO (page wrapper) | name, description, about→moses entity, mainEntity→DefinedTermSet with 7 entity refs, subjectOf→6 ontology resource files |
| 2 | SoftwareApplication+DefinedTerm | `https://mos2es.com/ontology/0.1/entity/moses` | Generated (MO§ES entity) | YES — `APPROVAL-2026-08-14-001 (ID-MOSES-001)` | name, description, enforcementArchitectureFor, operationalizes, governs |

### architecture.html (3 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | WebSite | `https://mos2es.com/#website` | Page-specific | NO | name, url, publisher→#org |
| 2 | BreadcrumbList | — | Page-specific | NO | Home→Architecture |
| 3 | TechArticle | — | Page-specific + canonical entity refs | NO | headline, description, about→[moses, commitment_theory, conservation_law], mentions→[signomy, civitae, kassa] |

### papers.html (5 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | ScholarlyArticle | `doi:10.5281/zenodo.20029607` | Page-specific + canonical entity refs | NO | headline, about→[conservation_law, commitment_theory], mentions→[moses] |
| 2 | Dataset | `doi:10.5281/zenodo.19105225` | Page-specific + canonical entity refs | NO | name, about→[conservation_law, commitment_theory] |
| 3 | Dataset | `doi:10.5281/zenodo.19109397` | Page-specific + canonical entity refs | NO | name, about→[conservation_law, commitment_theory] |
| 4 | Dataset | `doi:10.5281/zenodo.20031715` | Page-specific + canonical entity refs | NO | name, about→[commitment_theory, conservation_law, moses] |
| 5 | BreadcrumbList | — | Page-specific | NO | Home→Papers & Proofs |

### financial-signals-paper.html (2 blocks)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | ScholarlyArticle | `doi:10.5281/zenodo.21069978` | Page-specific + canonical entity refs | NO | headline, about→[conservation_law, commitment_theory], mentions→[moses] |
| 2 | BreadcrumbList | — | Page-specific | NO | Home→Papers→Financial Signals |

### _includes/partials/head.html (3 blocks, 1 template)

| # | @type | @id | Source | Canon-Backed | Key Fields |
|---|-------|-----|--------|-------------|------------|
| 1 | Organization | `https://mos2es.com/#org` | Generated (Ello Cello LLC) | YES — `APPROVAL-2026-08-14-001 (ID-ELLO-001)` | name, description, sameAs, founder, associatedWith→moses |
| 2 | WebSite | `https://mos2es.com/#website` | Page-specific | NO | name, url, publisher→#org |
| 3 | (template) | — | Eleventy `jsonld` front matter array | — | `{{ block | dump | safe }}` |

## Legacy Schema Replaced

| File | Block | Legacy Classification | Issue | Fix |
|------|-------|----------------------|-------|-----|
| `_includes/partials/head.html` | Organization | LEGACY_HAND_WRITTEN | name="MO§ES" (wrong — Organization is Ello Cello LLC per canon); hand-written description; sameAs typo `SunrisesIllneverSee` (lowercase n); missing provenance fields | Replaced with generated Ello Cello LLC values; fixed typo; added sourceSystem/canonBacked/authorityApprovalRef/associatedWith |
| `index.html` | Organization | LEGACY_HAND_WRITTEN | Same as head.html — name="MO§ES", hand-written description, missing MO§ES entity | Replaced with generated Ello Cello LLC values; added separate MO§ES entity block (SoftwareApplication+DefinedTerm) with full relationship predicates |
| `index.html` | CreativeWork | LEGACY_HAND_WRITTEN | Hand-written canon-sensitive description; generic `about` string; no canonical entity refs | Replaced description with generated MO§ES entity description; added `about`/`mentions` with canonical entity IDs |
| `ontology.html` | (none) | MISSING | No JSON-LD blocks at all | Added CollectionPage + DefinedTermSet + MO§ES entity block |
| `architecture.html` | TechArticle | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs |
| `papers.html` | ScholarlyArticle + 3 Datasets | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs to all 4 blocks |
| `financial-signals-paper.html` | ScholarlyArticle | PAGE_SPECIFIC_VALID (enhanced) | Missing canonical entity refs | Added `about`/`mentions` with canonical entity IDs |

## Disputed/Incorrect Legacy Wording Removed

1. **Organization name "MO§ES"** — The Organization at `https://mos2es.com/#org` is Ello Cello LLC per Search Authority canon (entity `ello_cello_llc`, `canonical_urls: ["https://mos2es.com/#org"]`). MO§ES is a product/entity (SoftwareApplication+DefinedTerm), not an organization. Fixed in both `head.html` and `index.html`.

2. **Organization description** — Legacy: "Sovereign signal governance — the protocol layer for preserving semantic meaning at point of execution: commitment conservation, governance enforcement, and lineage-bound artifacts." This is a marketing description, not the canon-backed Ello Cello LLC description. Replaced with generated: "Organization associated with the owner's published works and products, including SigRank and MO§ES™."

3. **CreativeWork patent description** — Legacy: "Constitutional AI governance enforcement engine for the Conservation Law of Commitment. Patent Serial No. 63/877,177 (Provisional, pending)." This is hand-written and not canon-backed. Replaced with generated MO§ES entity description from SA v1.0.0.

4. **sameAs typo** — `https://github.com/SunrisesIllneverSee` (lowercase 'n' in 'never') in head.html. Fixed to `https://github.com/SunrisesIllNeverSee`.

5. **No disputed wording emitted as owner-approved** — All canon-backed blocks carry `canonBacked: true` with valid `authorityApprovalRef`. No disputed claims are promoted. The MO§ES description used is the frozen v1.0.0 canon description (owner_approved, APPROVAL-2026-08-14-001).

## Validation Results

- **Files checked:** 6 (head.html + 5 target pages)
- **Blocks validated:** 19
- **JSON parse:** 19/19 PASS
- **Schema.org types:** All valid (Organization, WebSite, CollectionPage, DefinedTermSet, SoftwareApplication, DefinedTerm, CreativeWork, TechArticle, ScholarlyArticle, Dataset, BreadcrumbList)
- **MO§ES namespace:** `https://mos2es.com/ontology/0.1/` — correct in all blocks using custom predicates
- **Canon-backed values:** All canon-backed blocks match generated source (Ello Cello LLC description, MO§ES entity description)
- **Disputed wording:** None emitted as owner-approved
- **Authority approval refs:** All canon-backed blocks have valid refs (APPROVAL-2026-08-14-001)
- **Canonical URLs:** All `https://mos2es.com` format, no http:// or www. variants
- **Entity references:** All `about`/`mentions` reference valid canonical entity URIs (7 entities: moses, commitment_theory, conservation_law_of_commitment, sigrank, kassa, signomy, civitae)
- **Rendered HTML:** All 5 pages serve HTTP 200 with correct JSON-LD block counts

**VERDICT: PASS — 0 errors, 0 warnings**
