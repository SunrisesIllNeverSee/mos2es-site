---
type: Brief
title: Academic + Governance GEO/SEO/AEO Mapping — Devin Session Prompt
description: Handoff prompt for a separate Devin session to map the owner's entire academic + governance ecosystem (Conservation Law of Commitment, Commitment Theory, MO§ES™, CIVITAE, legal papers, Zenodo deposits, 30+ GitHub repos) and build a unified linking strategy so every surface points back to SigRank / signalaf.com / the owner's ORCID. Continues the WS1 SEO+GEO work (Dataset JSON-LD, /methodology, /research reports) already shipped on signalaf.com. Adapts the master SEO/GEO plan methodology for academic surfaces.
tags: [sigrank, growth, geo, seo, aeo, academic, governance, moses, commitment-theory, conservation-law, zenodo, prompt, devin]
timestamp: 2026-06-30T14:00:00Z
last_touched: 2026-07-06 03:58 UTC
---

# Academic + Governance GEO/SEO/AEO Mapping — Devin Session Prompt

> **Copy everything below this line into a new Devin session.**
> The new session should work from the RNS repo (`~/Desktop/SigRank`) and the
> standalone repos it references. It should NOT touch the live sigrank-app
> without the same gates (tsc 0, canonical 11/11, push main → Vercel).

---

## YOUR MISSION

Map the owner's entire academic + governance ecosystem and build a unified
linking + structured-data strategy so that **every surface — papers, datasets,
GitHub repos, governance frameworks, legal scholarship, live products — points
back to SigRank / signalaf.com / the owner's ORCID**, and so that answer
engines (ChatGPT, Perplexity, Claude, Google AI Overviews) recognize the
owner as the canonical source for:

1. **AI operator token-efficiency data** (SigRank Index)
2. **The Conservation Law of Commitment** — the foundational published law
3. **Commitment Theory (CT)** — the 34-paper research program built on the law
4. **MO§ES™ governance framework** (constitutional AI governance, patent pending)
5. **AI work-product legal doctrine** (the Schenck→Heppner paper + SLRO essay)

The goal is citation convergence: no matter which surface an AI engine or
search engine encounters, it should trace back to the owner and the canonical
URLs.

## THE MASTER METHODOLOGY (adapt this for academic surfaces)

A master SEO+GEO implementation plan was already built and fully executed for
SigRank. **Read it first** — it's the methodology template you're adapting:

- **`~/Desktop/SigRank/Devins_Plans/_archive/SEO_GEO_PLAN.md`** — the full 5-phase plan
  (OG images, JSON-LD structured data, llms.txt, per-page dynamic OG, npm/GitHub
  discoverability). All 5 phases shipped + verified live.

The academic surfaces need the **same disciplines** but **different tuning**:
- GitHub repos for papers/governance need the same treatment as sigrank-mcp got
  (topics, homepage URL, social preview, README cross-links)
- Zenodo deposits need structured metadata the way signalaf.com got JSON-LD
  (ORCID on deposit, related-identifier cross-links, keyword alignment)
- The Conservation Law paper needs to be as machine-discoverable as the SigRank
  Dataset — it's the theoretical foundation that makes the data credible
- llms.txt on signalaf.com should teach AI engines about the law + papers, not
  just the product pages
- The academic repos may need their own llms.txt or CONTRIBUTING.md that
  cross-links to the live products

**The key difference:** SigRank is a product with a live URL (signalaf.com).
The academic work lives on Zenodo (DOIs) + GitHub repos + (eventually) ORCID.
The structured-data strategy must bridge these — a Dataset on signalaf.com
should `cite` the Conservation Law Zenodo DOI, and the Zenodo deposit should
link back to signalaf.com as the live implementation.

## WHAT'S ALREADY BEEN BUILT (the foundation you're extending)

A prior Devin session shipped the full SEO+GEO stack on `signalaf.com`:

- **JSON-LD structured data** across every page type: Organization, WebSite,
  ItemList (boards), ProfilePage (operators), BreadcrumbList, DefinedTerm (wiki)
- **`/methodology`** — "The SigRank Index" page with server-rendered quotable
  figures + `Dataset` JSON-LD (CC-BY-4.0 license) + `FAQPage`
- **`/research/q1-2026`** — quarterly research report with `ScholarlyArticle`
  JSON-LD + cite-this-report block
- **`/llms.txt`** — plain-text map for AI crawlers (core pages, data, research, concepts, tooling)
- **Dynamic OG cards** — per-operator + per-board via `next/og`
- **npm keywords + GitHub topics** on both sigrank repos
- **Sitemap** — dynamic, includes all operators + boards + wiki + methodology + research

Files to read to understand the existing layer:
- `sigrank-app/lib/jsonld.ts` — all JSON-LD builders (the file you'll extend)
- `sigrank-app/lib/seo.ts` — SITE_ORIGIN, SITE_NAME, SITE_TAGLINE, withOG()
- `sigrank-app/app/methodology/page.tsx` — the Dataset + quotable figures page
- `sigrank-app/app/research/[slug]/page.tsx` — the quarterly report route
- `sigrank-app/app/llms.txt/route.ts` — the llms.txt convention
- `sigrank-app/app/sitemap.ts` — the dynamic sitemap
- `Devins_Plans/_archive/SEO_GEO_PLAN.md` — **the master methodology plan** (adapt this)
- `Devins_Plans/growth/WS1_DEVIN_GOAL.md` — the WS1 goal doc (marked complete)
- `Devins_Plans/growth/sigrank-dataset-citation-plan.md` — the full citation spec

## THE ECOSYSTEM YOU'RE MAPPING

### 1. SigRank (signalaf.com) — the live product
- **Repo:** `~/Desktop/SigRank-repos/sigrank-app` (public, Vercel auto-deploys main)
- **MCP:** `~/Desktop/SigRank-repos/sigrank-mcp` (public, npm: `sigrank`)
- **VS Code extension:** `SunrisesIllNeverSee/sigrank-vscode`
- **Python agent:** `SunrisesIllNeverSee/sigrank-agent` (PyPI: `sigrank-agent`)
- **What it is:** Privacy-preserving AI operator leaderboard ranked by token-cascade
  efficiency (Υ = cache_read × output / input²). On-device, ed25519-signed telemetry.
- **Already has:** Full SEO/GEO/JSON-LD stack (see above).
- **Relationship to the Conservation Law:** SigRank is the first live product
  that applies Conservation Law principles (on-device verification, signed
  snapshots, commitment preservation under transformation). The Dataset on
  signalaf.com should `cite` the Conservation Law Zenodo DOI as its theoretical
  foundation.

### 2. The Conservation Law of Commitment — the foundational published law
- **Repo:** `~/Desktop/Commitment_Conservation/` → `SunrisesIllNeverSee/commitment-conservation` (public)
- **CLAUDE.md:** `~/Desktop/Commitment_Conservation/CLAUDE.md` — read this first
- **The law:** C(T(S)) ≈ C(S) with enforcement; C(T(S)) < C(S) without it.
  Commitment content (obligations, prohibitions, modal constraints) persists
  under recursive transformative compression, and is most cleanly conserved
  under an enforcement gate. **Never call this "McHenry's Law"** — owner
  explicitly prohibits personal name attribution.
- **Paper:** v.05 released. Paper lives in `paper/v05/` (LaTeX sources + figures).
- **Empirical record:** 7 experiments (EXP-001 through EXP-007) in `experiments/`.
  Key result: EXP-003 — 13/20 signals at NLI bidirectional entailment = 1.00
  across 10 recursive iterations under gate condition.
- **Published DOIs (RECONCILE — there's a discrepancy across files):**
  - `10.5281/zenodo.20029607` — listed in Commitment_Conservation README + CLAUDE.md as "Paper DOI"
  - `10.5281/zenodo.18792459` — listed in CT/CLAUDE.md as "Paper 0 preprint" + DEPOSITS.md
  - `10.5281/zenodo.19105225` — Experimental Record (consistent across files)
  - `10.5281/zenodo.18271102` — Software DOI (CITATION.cff)
  - `10.5281/zenodo.18267278` — Concept DOI (REPRODUCIBILITY.md)
  - **ACTION:** Verify which DOI is the canonical paper DOI. The discrepancy
    between 20029607 and 18792459 needs resolution — they may be different
    versions or one may be wrong.
- **Patent:** Serial No. 63/877,177 (Provisional) — covers the MO§ES™ enforcement
  architecture for the Conservation Law. The law itself is open; the
  implementation is patent-protected.
- **License:** CC-BY-4.0
- **CITATION.cff:** Present — has author info (Deric J. McHenry) + keywords.
- **Key files:**
  - `Commitment_Conservation/CLAUDE.md` — repo context, law statement, file structure
  - `Commitment_Conservation/README.md` — public-facing, has DOI badges + abstract
  - `Commitment_Conservation/CITATION.cff` — citation metadata
  - `Commitment_Conservation/REPRODUCIBILITY.md` — harness verification
  - `Commitment_Conservation/experiments/` — EXP-001 through EXP-007
  - `Commitment_Conservation/paper/v05/` — paper LaTeX sources

### 3. Commitment Theory (CT) — the 34-paper research program
- **Hub repo:** `~/Desktop/Commitment_Theory/` (local) → `SunrisesIllNeverSee/Commitment_Theory` (public)
- **What it is:** The full research program built on the Conservation Law.
  34 papers across 3 tracks: CT track (11), Legal Theory track (11), MISC track (12).
- **Architecture:**
  ```
  Layer -1: McHenry Axioms + Anchors (proprietary constitutional foundation)
  Layer  0: Six-Gate Protocol (G1–G6)
  Layer 0.5: MO§ES™ Architecture (patent-pending enforcement engine)
  Layer  1: Physical Laws — Conservation Law (published) + Second Law (candidate)
  Layer  2: Measurement Science — Papers 1–5
  Layer  3: Applications — Legal_Theory/, MISC/
  Layer  4: Extensions — SIGSYSTEM, Post-Turing Test, Channel Capacity
  ```
- **Status:** Paper 0 (Conservation Law) published. L-001 (SLRO essay) submitted.
  P-000 (Propositions Prospectus) ready to deposit but not yet deposited.
  31 more papers planned. Read `Commitment_Theory/academic-research/CLAUDE.md`
  for the full pipeline status.
- **Pending deposits:** P-000 (Propositions Prospectus), Paper 0 v.06 (CCT→CT rename),
  L-000 (Legal Propositions)
- **License:** CC-BY-4.0 on all papers + datasets
- **Key files to read:**
  - `Commitment_Theory/academic-research/CLAUDE.md` — the full 34-paper pipeline + architecture
  - `Commitment_Theory/publishing/CLAUDE.md` — the identity/distribution/discovery architecture
  - `Commitment_Theory/publishing/DEPOSITS.md` — every Zenodo deposit
  - `Commitment_Theory/publishing/PROFILES.md` — ORCID, Lens, DataCite, OpenAIRE status
  - `Commitment_Theory/publishing/PATENTS.md` — patent filing log
  - `Commitment_Theory/CT/CLAUDE.md` — CT track papers + the law
  - `Commitment_Theory/Legal_Theory/CLAUDE.md` — legal track papers

### 4. MO§ES™ — the governance framework (patent pending)
- **Patent:** Serial No. 63/877,177 (Provisional, pending)
- **Repos:** `SunrisesIllNeverSee/MOS2ES`, `SunrisesIllNeverSee/moses-governance`,
  `SunrisesIllNeverSee/moses-claw-gov`, `SunrisesIllNeverSee/moses-governance-cowork`,
  `SunrisesIllNeverSee/command-engine`, `SunrisesIllNeverSee/moses-clicky-worker`
- **What it is:** Constitutional AI governance framework. Six-Gate Protocol,
  commitment conservation enforcement, SHA-256 audit chain, role hierarchy.
  The proprietary implementation of the open Conservation Law.
- **Relationship to SigRank:** SigRank is the first product built on MO§ES™
  principles (on-device verification, signed snapshots, token counts only).
- **Relationship to the Conservation Law:** MO§ES™ is Layer 0.5 in the CT
  architecture — the enforcement engine for the Conservation Law. The law is
  open (Zenodo); the implementation is patent-protected.
- **Static site:** mos2es.com

### 5. CIVITAE / SIGNOMY (signomy.xyz) — governed agent marketplace
- **Repo:** `~/Desktop/CIVITAE/` → `SunrisesIllNeverSee/agent-universe` (public)
- **Also:** `SunrisesIllNeverSee/Mos2es_Signomy` (public)
- **What it is:** Governed agent city-state. AI agents register, form teams,
  fill mission slots, transact, build reputation under MO§ES™ constitutional protocol.
- **Live:** signomy.xyz (270 API endpoints, 47 frontend pages, MCP endpoint)
- **License:** All Rights Reserved (unlike SigRank/CT which are CC-BY/MIT)

### 6. Legal papers
- **SLRO essay (L-001):** Submitted May 1, 2026 to Stanford Law Review Online Vol. 79.
  Awaiting decision. File: `Commitment_Theory/Legal_Theory/papers/L-001_SLRO/Slro_paper_final.md`
- **Schenck→Heppner paper:** Draft complete, not submitted. File: `~/Desktop/ash_paper/v3_ai2.md`
  Argues AI work-product doctrine maps onto Schenck→Brandenburg First Amendment arc.
  Companion to SLRO essay. Read `~/Desktop/ash_paper/CLAUDE.md` for full context.
- **Legal Papers hub:** `~/Desktop/Legal Papers/` — multi-paper management system

### 7. Full GitHub repo inventory (40 repos under SunrisesIllNeverSee)

The owner has 40 repos — 22 public, 18 private. **Every public repo is an SEO/GEO
surface.** The new session must audit each one for: README quality, topics,
homepage URL, description, social preview, and cross-links to the canonical
surfaces (signalaf.com, Zenodo DOIs, signomy.xyz).

#### SigRank ecosystem (public — highest priority)
| Repo | Description | Notes |
|------|-------------|-------|
| `sigrank-app` | SigRank leaderboard (signalaf.com) | Full SEO/GEO already shipped |
| `sigrank-mcp` | MCP server + CLI (npm: sigrank) | Keywords + topics done |
| `sigrank-vscode` | VS Code extension | Needs topics + cross-links |
| `sigrank-agent` | Python telemetry agent (PyPI) | Needs topics + cross-links |

#### Conservation Law + Commitment Theory (public — academic priority)
| Repo | Description | Notes |
|------|-------------|-------|
| `commitment-conservation` | The Conservation Law paper + experiments | Has DOI badges, needs ORCID + signalaf cross-link |
| `Commitment_Theory` | 34-paper research program hub | Needs README, topics, cross-links |

#### MO§ES™ governance ecosystem (public — governance priority)
| Repo | Description | Notes |
|------|-------------|-------|
| `MOS2ES` | Core system architecture | Needs topics + cross-links |
| `moses-governance` | Governance framework | Needs README + topics |
| `moses-claw-gov` | Constitutional Claw governance harness | Has description, needs cross-links |
| `moses-governance-cowork` | Governance for Claude.ai Chat/Cowork | Needs topics + cross-links |
| `command-engine` | Open-source governance runtime | Needs topics + cross-links |
| `moses-clicky-worker` | Governed Worker for Clicky | Needs topics + cross-links |
| `mos2es-site` | Static site for mos2es.com | Needs cross-links to signalaf + Zenodo |
| `MOS2ES-PitchDeck` | Pitch deck artifact (private) | Private — no SEO impact |

#### CIVITAE / SIGNOMY (public — marketplace priority)
| Repo | Description | Notes |
|------|-------------|-------|
| `agent-universe` | Governed agent marketplace (signomy.xyz) | Needs JSON-LD + cross-links |
| `Mos2es_Signomy` | CIVITAE governance infrastructure | Needs topics + cross-links |
| `KASSA` | Marketplace (public) | Needs README + topics + cross-links |

#### Research + data (public — citation priority)
| Repo | Description | Notes |
|------|-------------|-------|
| `moses-sigrank` | Gradio/HF leaderboard + Supabase | Needs cross-links to signalaf.com |
| `grok-demo` | 339-exchange MO§ES governance demo | Needs topics + cross-links |
| `FMS-2.0-Package` | FMS package (public) | Needs README + topics + cross-links |
| `TransmitterSignal` | Public drops from SignalVault | Needs topics + cross-links |
| `qaapplication` | (public, no description) | Needs description + topics + README |
| `application-hub` | (public, no description) | Needs description + topics + README |

#### Private repos (no direct SEO impact, but should cross-link internally)
| Repo | Description | Notes |
|------|-------------|-------|
| `RNS` | Signal vs. noise research hub | Private brain — not a public surface |
| `signalaf` | SigRank (private mirror) | Private |
| `moses-operator-ledger` | Token-composition leaderboard (HF mirror) | Private |
| `Signal-ARCHIVED` | SignalVault archive | Private |
| `KASSA_LEGACY` | Legacy K-Governed Voice Architecture | Private |
| `agent-universe-pre-bfg` | Pre-BFG agent universe | Private |
| `pickle` | (private) | Private |
| `commitment-test-harness` | Commitment test harness | Private |
| `Turing_Test` | Turing Test research logs | Private |
| `fundscore` | Fund scoring | Private |
| `Command` | Multi-AI governance console | Private |
| `MOS2ES--Codex--Drop` | Codex Drop | Private |
| `cloud-paradox-response-mos2es` | Response to a16z Cloud Paradox | Private |
| `MOS2ES-Teaser-TM-PPA` | Trademark filing announcement | Private |
| `Bakery` | Latent signal frameworks | Private |
| `stats-dump` | (private) | Private |
| `Aiainti` | (private) | Private |
| `Codexboardoflead` | (private) | Private |
| `TransSignal` | (private) | Private |

#### Other surfaces (non-GitHub)
| Surface | URL | Notes |
|---------|-----|-------|
| SigRank live site | signalaf.com | Full SEO/GEO shipped |
| SIGNOMY live site | signomy.xyz | Needs JSON-LD + cross-links |
| MO§ES static site | mos2es.com | Needs cross-links |
| HuggingFace Space | moses-sigrank | Needs cross-links |
| Zenodo deposits | 4+ DOIs (see §2) | Needs ORCID + related-identifiers |
| npm | sigrank | Keywords done |
| PyPI | sigrank-agent | Needs keywords check |
| Local research repos | `~/Desktop/SigRank/2_secondary/sig_army/`, `word_vault/`, `4_references/` | Not public — internal research |

**The audit (Phase 1) must cover every public repo in this table.** For each,
check: Does the README link to signalaf.com? To the Conservation Law DOI? To
signomy.xyz? Are GitHub topics set? Is the homepage URL configured? Is there
a social preview image? Is the description accurate and keyword-rich?

## WHAT TO BUILD

### Phase 1 — Audit + Map (read-only, no changes)

1. **Inventory every public surface** — all 30+ GitHub repos, both live sites
   (signalaf.com, signomy.xyz, mos2es.com), Zenodo deposits, HuggingFace spaces,
   npm/PyPI packages. For each, record: URL, what it is, license, current SEO
   state (README quality, topics, description, homepage URL, social preview),
   whether it links to the others.

2. **Map the citation graph** — which surfaces currently link to which?
   - Do the Zenodo deposits link to signalaf.com? (probably not)
   - Do the GitHub repos cross-link? (some do, most don't)
   - Does any repo reference the owner's ORCID? (ORCID may not be set up yet — check PROFILES.md)
   - Does signomy.xyz link to signalaf.com or the CT papers?
   - Do the papers reference signalaf.com as a live data source?
   - Does the Conservation Law paper reference SigRank as a live implementation?
   - Does signalaf.com reference the Conservation Law as its theoretical foundation?

3. **Identify the gaps** — where are the broken links, missing structured data,
   missing cross-references, missing `sameAs` properties, missing ORCID connections?

4. **Reconcile the DOI discrepancy** — the Conservation Law paper DOI is listed
   as both `10.5281/zenodo.20029607` and `10.5281/zenodo.18792459` in different
   files. Determine which is canonical (check Zenodo directly) and flag for
   correction in the files that carry the wrong one.

### Phase 2 — Strategy Document

Write `Devins_Plans/growth/ACADEMIC_GEO_STRATEGY.md` covering:

1. **The convergence thesis:** every surface should point to the owner as the
   canonical source. The citation graph should be a hub-and-spoke with
   signalaf.com + ORCID + Zenodo as the hubs. The Conservation Law is the
   theoretical root; SigRank is the live data product; MO§ES™ is the enforcement
   engine; CIVITAE is the governance runtime. All four should cross-link.

2. **Per-surface action plan:** for each repo/site/deposit, what specific changes
   would maximize GEO/AEO discoverability — adapting the master SEO/GEO plan
   methodology for each surface type:
   - **GitHub repos** (same treatment sigrank-mcp got): README cross-links, topics,
     homepage URL, social preview images, `sameAs` references
   - **Zenodo deposits**: add ORCID, add related-identifier links to signalaf.com,
     add keywords matching the sigrank-app Dataset keywords, ensure the
     Conservation Law deposit links to the Experimental Record deposit
   - **signalaf.com**: add `sameAs` pointing to Zenodo DOIs (Conservation Law +
     Experimental Record), GitHub repos, ORCID, signomy.xyz in the Organization
     JSON-LD; add a `/science` page that links to the Conservation Law paper +
     CT pipeline; add the patent to the Organization schema; the Dataset
     `citation` field should reference the Conservation Law DOI
   - **signomy.xyz**: add JSON-LD (Organization, sameAs), cross-link to signalaf.com
   - **mos2es.com**: ensure it links to the patent, the Conservation Law, and SigRank
   - **Papers**: add signalaf.com as a "related artifact" in Zenodo metadata;
     add DOI references in paper text where SigRank data is used

3. **New JSON-LD builders needed** on signalaf.com:
   - `organization()` should carry `sameAs: [GitHub org, Zenodo DOIs, ORCID, signomy.xyz, HuggingFace, mos2es.com]`
   - A `CreativeWork` or `ScholarlyArticle` schema for the Conservation Law paper,
     linked from /methodology or a new /science page — this is the theoretical
     citation the Dataset depends on
   - `Patent` schema for MO§ES™ (63/877,177) — schema.org has a Patent type
   - The Dataset builder's `citation` field should reference the Conservation Law DOI

4. **The /science page:** a new page on signalaf.com that presents the academic
   foundation — the Conservation Law, the CT architecture, the empirical record,
   links to Zenodo DOIs, the patent. This is what makes SigRank credible as a
   data source: "this data is governed by a published conservation law with an
   empirical record." Quarterly reports (/research) are data outputs; /science
   is the theoretical root.

5. **ORCID setup:** the owner's ORCID is not yet set up (PROFILES.md shows "in
   progress"). This is the single highest-leverage identity fix — without it,
   Zenodo deposits don't auto-push, and the patent + papers aren't linked in any
   authoritative identity system. Flag this as an owner action item with
   step-by-step instructions.

6. **llms.txt expansion:** the current llms.txt covers SigRank's own pages.
   It should also teach AI engines about the Conservation Law (with DOI), the
   CT research program, the MO§ES™ governance framework, and the patent. An AI
   engine reading /llms.txt should learn that SigRank is built on a published
   conservation law, which has a Zenodo DOI, which connects to a 34-paper
   research program.

7. **Academic repo SEO:** the public GitHub repos (commitment-conservation,
   Commitment_Theory, MOS2ES, etc.) should get the same discoverability
   treatment as sigrank-mcp: topics, homepage URL (→ signalaf.com or Zenodo),
   social preview, README cross-links. Produce a per-repo checklist.

### Phase 3 — Implementation (after owner reviews the strategy)

Implement the signalaf.com-side changes (the repo you can ship to):
- Extend `organization()` in `lib/jsonld.ts` with `sameAs` array (Zenodo DOIs,
  GitHub, ORCID, signomy.xyz, HuggingFace)
- Add `ScholarlyArticle` or `CreativeWork` schema for the Conservation Law paper
- Add `Patent` schema for MO§ES™ (63/877,177)
- Add `citation` field to the Dataset builder pointing to the Conservation Law DOI
- Add a `/science` page presenting the academic foundation
- Extend `llms.txt` with the academic + governance context
- Add the Zenodo DOIs to the sitemap or as `sameAs` references
- Any new JSON-LD builders needed

For the other surfaces (GitHub repos, Zenodo, signomy.xyz, mos2es.com), produce
a checklist the owner can execute (or hand to another session).

## CONSTRAINTS

- **Moat:** RS.xx proprietary weights are NEVER exposed. The Conservation Law
  is open (Zenodo, CC-BY-4.0); the MO§ES™ enforcement architecture is
  patent-pending. The McHenry Axioms (Layer -1) are proprietary. Don't expose
  trade secrets in any structured data.
- **Naming:** "Commitment Theory" (CT), not "Conservation of Commitment Theory"
  or "CCT" — old naming is being phased out. The law within CT is the
  "Conservation Law of Commitment." **Never call it "McHenry's Law."**
- **License clarity:** SigRank code = MIT. SigRank dataset = CC-BY-4.0.
  Conservation Law paper + CT papers = CC-BY-4.0. CIVITAE = All Rights Reserved.
  Keep these straight in the schema.
- **Gates:** tsc 0, canonical 11/11 (Υ 18436.98), before any sigrank-app commit.
  Run `node --test sigrank-app/__tests__/ingest/canonical.test.mjs` from the RNS repo.
- **Repos:** Ship to `~/Desktop/SigRank-repos/sigrank-app` (push main → Vercel).
  Save docs/strategy to RNS (`~/Desktop/SigRank`, branch `sigrank-app-build`).
  NEVER push research/strategy to the public app repo.
- **Read the CLAUDE.md** at `~/Desktop/SigRank/CLAUDE.md` first — it has the
  repo map, the session coordination protocol, and the gates.

## DELIVERABLES

1. `Devins_Plans/growth/ACADEMIC_GEO_STRATEGY.md` — the full strategy doc
2. `Devins_Plans/growth/ECOSYSTEM_INVENTORY.md` — the audit map (every surface,
   its current state, and what's missing)
3. Implemented changes on signalaf.com (organization sameAs, /science page,
   Conservation Law ScholarlyArticle, Patent schema, llms.txt expansion) —
   committed + pushed + verified live
4. An owner-action checklist for the non-sigrank surfaces (GitHub repos, Zenodo,
   ORCID, signomy.xyz, mos2es.com)

## STARTING POINT

Read these files in order:
1. `~/Desktop/SigRank/CLAUDE.md` — repo map + session protocol
2. `~/Desktop/SigRank/Devins_Plans/_archive/SEO_GEO_PLAN.md` — **the master methodology plan** (adapt this)
3. `~/Desktop/SigRank/Devins_Plans/growth/WS1_DEVIN_GOAL.md` — what's done
4. `~/Desktop/SigRank/Devins_Plans/growth/sigrank-dataset-citation-plan.md` — the citation spec
5. `~/Desktop/Commitment_Conservation/CLAUDE.md` — **the Conservation Law repo** (the foundational law)
6. `~/Desktop/Commitment_Conservation/README.md` — public-facing, DOI badges + abstract
7. `~/Desktop/Commitment_Conservation/CITATION.cff` — citation metadata
8. `~/Desktop/Commitment_Theory/academic-research/CLAUDE.md` — the 34-paper pipeline
9. `~/Desktop/Commitment_Theory/publishing/CLAUDE.md` — identity/distribution/discovery
10. `~/Desktop/Commitment_Theory/publishing/DEPOSITS.md` — Zenodo DOIs
11. `~/Desktop/Commitment_Theory/publishing/PROFILES.md` — ORCID/Lens status
12. `~/Desktop/Commitment_Theory/publishing/PATENTS.md` — patent filing log
13. `~/Desktop/ash_paper/CLAUDE.md` — the Schenck→Heppner paper
14. `~/Desktop/SigRank-repos/sigrank-app/lib/jsonld.ts` — the existing JSON-LD layer
15. `~/Desktop/SigRank-repos/sigrank-app/app/methodology/page.tsx` — the Dataset page

Then start with Phase 1 (audit) and work through to Phase 3.
