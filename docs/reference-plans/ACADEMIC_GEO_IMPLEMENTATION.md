---
type: Roadmap
title: Academic GEO — signalaf.com Implementation Plan
description: The signalaf.com-side changes needed to connect the live product to the academic foundation (Conservation Law, CT, MO§ES™). Derived from the academic-geo ecosystem inventory Phase 1 audit. Ship via sigrank-app (push main → Vercel) after gates pass.
tags: [sigrank, growth, geo, seo, aeo, academic, conservation-law, commitment-theory, moses, signalaf]
timestamp: 2026-06-30T17:30:00Z
status: ready-to-ship
source: academic-geo/ECOSYSTEM_INVENTORY.md
last_touched: 2026-06-30 11:29 UTC
---

# Academic GEO — signalaf.com Implementation Plan

> **Source:** `academic-geo/ECOSYSTEM_INVENTORY.md` Phase 1 audit (gaps #4, #5,
> #6, #11). This is the signalaf.com-side implementation that connects the live
> product to the academic foundation.
>
> **Ship target:** `~/Desktop/SigRank-repos/sigrank-app` (push main → Vercel).
> **Gates:** `tsc 0` + `node --test sigrank-app/__tests__/ingest/canonical.test.mjs` = 11/11 (Υ 18436.98).
> **Save this doc to:** RNS (`~/Desktop/SigRank/Devins_Plans/growth/`).
> **NEVER push research/strategy to the public app repo.**

---

## Verified facts (bake into the code, do not re-investigate)

| What | Value |
|------|-------|
| ORCID | `https://orcid.org/0009-0002-9904-5390` |
| Conservation Law DOI (V.05, current) | `10.5281/zenodo.20029607` |
| Conservation Law concept DOI | `10.5281/zenodo.18267278` |
| Experimental Record DOI | `10.5281/zenodo.19105225` |
| Public Recursive Transformation Harness DOI | `10.5281/zenodo.19109397` |
| P-000 Propositions Prospectus DOI | `10.5281/zenodo.20031715` |
| Patent | Serial No. 63/877,177 (Provisional, pending) |
| GitHub org | `https://github.com/SunrisesIllNeverSee` |
| signomy.xyz | `https://signomy.xyz` |
| mos2es.com | `https://mos2es.com` |
| HuggingFace (if exists) | `https://huggingface.co/spaces/SunrisesIllNeverSee/moses-sigrank` |

---

## Changes to ship

### 1. Extend `organization()` in `lib/jsonld.ts` with `sameAs`

The `organization()` builder (currently lines 20-30) has no `sameAs` field. Add:

```ts
sameAs: [
  'https://orcid.org/0009-0002-9904-5390',
  'https://github.com/SunrisesIllNeverSee',
  'https://doi.org/10.5281/zenodo.20029607',        // Conservation Law V.05
  'https://doi.org/10.5281/zenodo.19105225',        // Experimental Record
  'https://signomy.xyz',
  'https://mos2es.com',
  // 'https://huggingface.co/spaces/SunrisesIllNeverSee/moses-sigrank',  // if exists
],
```

**Why:** AI engines (ChatGPT, Perplexity, Claude, Google AI Overviews) use
`sameAs` to connect entities across surfaces. Without this, SigRank is
orphaned from the Conservation Law, ORCID, and the governance ecosystem.

### 2. Add `citation` field to `sigrankDataset()` in `lib/jsonld.ts`

The `sigrankDataset()` builder (currently lines 136-199) has no `citation`
field. Add:

```ts
citation: 'https://doi.org/10.5281/zenodo.20029607',
```

**Why:** The Dataset's `citation` field tells Google Dataset Search and AI
engines that the SigRank Index data is grounded in the Conservation Law. This
is the structured-data link between the live product and the theoretical
foundation.

### 3. Add `ScholarlyArticle` builder for the Conservation Law paper

New builder in `lib/jsonld.ts`:

```ts
export function conservationLawArticle() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': 'https://doi.org/10.5281/zenodo.20029607',
    headline: 'A Conservation Law for Commitment in Language Under Transformative Compression and Recursive Application',
    url: 'https://doi.org/10.5281/zenodo.20029607',
    author: {
      '@type': 'Person',
      name: 'Deric J. McHenry',
      sameAs: 'https://orcid.org/0009-0002-9904-5390',
    },
    publisher: { '@id': ORG_ID },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    datePublished: '2026-05-04',
    version: 'V.05',
    isPartOf: {
      '@type': 'PublicationEvent',
      name: 'Commitment Theory Research Program',
    },
  }
}
```

### 4. Add `Patent` schema builder for MO§ES™

New builder in `lib/jsonld.ts`:

```ts
export function mosesPatent() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',  // schema.org has no Patent type; CreativeWork is the closest
    '@id': `${SITE_ORIGIN}/#moses-patent`,
    name: 'MO§ES™ Enforcement Architecture',
    description: 'Constitutional AI governance enforcement engine for the Conservation Law of Commitment. Patent Serial No. 63/877,177 (Provisional, pending).',
    author: {
      '@type': 'Person',
      name: 'Deric J. McHenry',
      sameAs: 'https://orcid.org/0009-0002-9904-5390',
    },
    publisher: { '@id': ORG_ID },
    about: 'AI governance enforcement architecture',
  }
}
```

> **Note:** schema.org does not have a `Patent` type. `CreativeWork` is the
> closest valid type. Do NOT use a made-up `@type: 'Patent'` — it won't
> validate. The patent serial number goes in the description.

### 5. Create `/science` page (`app/science/page.tsx`)

A new page presenting the academic foundation:

- **The Conservation Law** — statement (C(T(S)) ≈ C(S) with enforcement),
  DOI link (`https://doi.org/10.5281/zenodo.20029607`), empirical record
  summary (EXP-001 through EXP-007, 13/20 signals at NLI=1.00 under gate)
- **CT architecture** — the 5-layer stack (Layer -1 proprietary → Layer 4
  extensions), plain English
- **Patent reference** — Serial No. 63/877,177, MO§ES™
- **Links to Zenodo deposits** — Conservation Law, Experimental Record,
  Harness, P-000 Propositions
- **JSON-LD:** `conservationLawArticle()` + `mosesPatent()` + `breadcrumb()`

**Why:** This is what makes SigRank credible as a data source. Quarterly
reports (`/research`) are data outputs; `/science` is the theoretical root.
An AI engine reading `/science` should learn that SigRank is built on a
published conservation law with a Zenodo DOI and an empirical record.

### 6. Extend `llms.txt` (`app/llms.txt/route.ts`)

Add academic + governance context to the existing llms.txt body:

```
## Academic foundation
- [The Conservation Law of Commitment](https://signalaf.com/science): the theoretical foundation. C(T(S)) ≈ C(S) with enforcement; C(T(S)) < C(S) without it.
- Conservation Law paper (Zenodo, CC-BY-4.0): https://doi.org/10.5281/zenodo.20029607
- Experimental Record (Zenodo): https://doi.org/10.5281/zenodo.19105225
- Commitment Theory (34-paper research program): https://github.com/SunrisesIllNeverSee/Commitment_Theory

## Governance
- MO§ES™ governance framework (patent pending 63/877,177): https://mos2es.com
- SIGNOMY governed agent marketplace: https://signomy.xyz
- GitHub org: https://github.com/SunrisesIllNeverSee
- ORCID: https://orcid.org/0009-0002-9904-5390
```

### 7. Add `/science` to sitemap (`app/sitemap.ts`)

Add `/science` to the static routes with priority 0.7, changeFrequency monthly.

---

## Gates (HARD — must pass before push)

```bash
# Gate 1 — tsc 0
cd ~/Desktop/SigRank-repos/sigrank-app && npx tsc --noEmit

# Gate 2 — canonical 11/11
cd ~/Desktop/SigRank && node --test sigrank-app/__tests__/ingest/canonical.test.mjs
```

Both must pass. If either fails, fix or revert. Do NOT push to main until both
are green.

## Ship

```bash
cd ~/Desktop/SigRank-repos/sigrank-app
git add -A
git commit -m "academic-geo: organization sameAs + /science page + Conservation Law schema + llms.txt expansion"
git push origin main  # → Vercel auto-builds → signalaf.com
```

## Verify live

- [ ] `https://signalaf.com/science` returns 200
- [ ] Page source contains `application/ld+json` with ScholarlyArticle + CreativeWork
- [ ] `https://signalaf.com/llms.txt` contains the Academic foundation + Governance sections
- [ ] Organization JSON-LD on homepage contains `sameAs` array with ORCID + Zenodo + signomy + mos2es
- [ ] Dataset JSON-LD on `/methodology` contains `citation` field pointing to Conservation Law DOI

---

## Constraints

- **Moat:** RS.xx weights NEVER exposed. McHenry Axioms (Layer -1) proprietary.
- **Naming:** "Commitment Theory" (CT), not "CCT". Never "McHenry's Law."
- **License clarity:** SigRank code = MIT. Dataset + papers = CC-BY-4.0. CIVITAE = ARR.
- **NEVER push research/strategy to the public app repo** — only the web code.
