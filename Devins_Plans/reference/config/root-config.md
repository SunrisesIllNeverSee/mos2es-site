---
type: Reference
title: Root config files — netlify, robots, sitemap, llms.txt, auth, gitignore
description: Reference doc for the root configuration files (netlify.toml, robots.txt, sitemap.xml, llms.txt, BingSiteAuth.xml, IndexNow key, .gitignore, .claude/launch.json, .claude/session_notes.md, README.md).
tags: [mos2es, reference, config, netlify, seo, sitemap]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:02 UTC
---

# Root Config Files

## README.md

**What it is:** Project README. Brief — describes the site as a static landing page for
`mos2es.com` and lists Netlify deploy settings (branch `main`, publish dir `.`).

**Owner-curated:** No (safe to update).

---

## netlify.toml

**What it is:** Netlify deploy config. Minimal — just sets `publish = "."` under `[build]`.

**Contents:**
```toml
[build]
  publish = "."
```

**Relationships:** No build command (static site). Push to `main` → Netlify auto-deploys.

**Owner-curated:** No.

---

## robots.txt

**What it is:** Crawl directives for all user agents.

**Contents:**
```
User-agent: *
Allow: /

Sitemap: https://mos2es.com/sitemap.xml
```

**Relationships:** Points to `sitemap.xml`. Allows all crawlers full access.

**Owner-curated:** Yes — listed in CLAUDE.md do-not-touch list.

---

## sitemap.xml

**What it is:** XML sitemap listing 8 URLs with changefreq and priority.

**URLs listed:**
| URL | changefreq | priority |
|-----|-----------|----------|
| `/` | weekly | 1.0 |
| `/papers` | monthly | 0.9 |
| `/legal` | monthly | 0.8 |
| `/press` | monthly | 0.8 |
| `/field-sheet` | monthly | 0.8 |
| `/benchmarks` | weekly | 0.95 |
| `/governance-vacuum` | monthly | 0.85 |
| `/architecture` | monthly | 0.85 |

**Relationships:** Consumed by `scripts/indexnow-ping.sh` (see
[scripts/seo.md](../scripts/seo.md)). Referenced by `robots.txt`.

**Owner-curated:** Yes — only update when adding/removing pages (per CLAUDE.md).

**Note:** The sitemap lists 8 URLs but the site has 11 HTML pages. Not listed:
`deck.html`, `demovideo.html`, `resume.html`. Intentional (investor/internal pages not
meant for search indexing) or a gap — flag to owner if unsure.

---

## llms.txt

**What it is:** AI discoverability config (~2.3 KB). Declares MO§ES core concepts, academic
foundation (Zenodo DOIs, GitHub repos), governance ecosystem, and related surfaces
(signalaf.com, signomy.xyz, ORCID).

**Key sections:**
- Core concepts (links to papers, architecture, governance-vacuum, benchmarks, field-sheet)
- Academic foundation (5 Zenodo DOIs + 2 GitHub repos)
- Governance ecosystem (4 GitHub repos + patent serial)
- Related surfaces (SigRank, SIGNOMY/CIVITAE, GitHub org, ORCID)
- Legal (links to legal.html, press.html)

**Relationships:** Mirrors and extends the JSON-LD in `index.html` and `papers.html`. The
Zenodo DOIs are the canonical academic references.

**Owner-curated:** Yes — listed in CLAUDE.md do-not-touch list.

---

## BingSiteAuth.xml

**What it is:** Bing site ownership verification file.

**Contents:**
```xml
<?xml version="1.0"?>
<users>
  <user>0570A0C4BDDCBD49E6A31D8C55CF057B</user>
</users>
```

**Owner-curated:** Yes (verification token is owner-specific).

---

## 3cb9dad60ebc43248d4ec58b2d9b4aca.txt

**What it is:** IndexNow key file. Contents: `3cb9dad60ebc43248d4ec58b2d9b4aca`.

**Relationships:** Referenced by `scripts/indexnow-ping.sh` as the `key` and `keyLocation`
in the IndexNow API payload. Must be served at the site root for IndexNow verification.

**Owner-curated:** Yes (key is owner-specific).

---

## .gitignore

**What it is:** Git ignore rules.

**Ignores:**
- `.netlify/` — Netlify local state
- `.DS_Store` / `**/.DS_Store` — macOS metadata
- `.claude/*` — Claude Code internal files
- `!.claude/settings.json` — exception: keep shared hook config
- `Devins_Plans/state/.role-*` — per-session role files
- `Devins_Plans/state/.session-current` — per-session session ID

**Owner-curated:** No (safe to update).

---

## .claude/launch.json

**What it is:** Launch config for local dev server.

**Contents:** Runs `python3 -m http.server 8743` (port 8743).

**Relationships:** Referenced in CLAUDE.md as the local dev command.

**Owner-curated:** No.

---

## .claude/session_notes.md

**What it is:** Session-specific correction notes. Currently contains one entry:

> **2026-05-21 incident:** Task was to re-export two PNGs via Playwright. Instead, the
> session unilaterally updated chart values across both HTML files without instruction,
> then bungled the revert by running it in the wrong repo directory.
>
> **Rule going forward:** Do not modify any HTML or chart values without explicit
> instruction. Re-export = screenshot the file as-is. That's it.

**Relationships:** This note is the source of the CLAUDE.md hard rule: "Do NOT modify HTML
chart values or re-export screenshots without explicit instruction."

**Owner-curated:** Yes (incident record — do not edit or remove).

---

## .claude/settings.json

**What it is:** Shared Claude Code hook config (allowed through `.gitignore` via negation).

**Owner-curated:** No (but hooks are wired to tracker scripts — coordinate changes).
