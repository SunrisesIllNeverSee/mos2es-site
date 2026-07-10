---
type: Spec
title: OKF — Object-Knowledge Format (v0.1)
description: Canonical specification for the frontmatter convention every doc in the docs directory carries — the five required fields, the standardized type vocabulary, tag + timestamp rules, the index.md root, and the check-okf lint that enforces it.
tags: [mos2es, okf, convention, frontmatter, spec, lint]
timestamp: 2026-07-10
last_touched: 2026-07-10 07:31 UTC
---

# OKF — Object-Knowledge Format (v0.1)

Every doc in the docs directory is a **knowledge object**: a Markdown file that opens with a
YAML frontmatter block so a human or agent can tell, without reading the body, *what it is,
what it's about, and when it's from.* This file is the canonical definition of that block.

> **Why this exists.** Without a convention, docs drift — missing metadata, inconsistent
> types, no way to tell what's active vs archived. This spec + the `check-okf` lint make
> the convention durable and enforceable.

## The five required fields

Every doc MUST open with exactly this block (order recommended, not enforced):

```yaml
---
type: <one of the type vocabulary below>
title: <concise human title, ≤ 120 chars>
description: <1–2 sentences: what it is + current status>
tags: [<project-tag>, <3–7 lowercase-kebab tags>]
timestamp: <YYYY-MM-DD>
---
```

| Field | Rule |
|-------|------|
| `type` | Exactly one value from the **type vocabulary** below. |
| `title` | Human-readable, ≤ 120 chars. If the doc is deferred/gated/obsolete, say so here. |
| `description` | 1–2 sentences. State **what** the doc is and its **status** (active / deferred / gated / superseded). |
| `tags` | A YAML list of 3–7 lowercase-kebab tags. The **first tag should be your project name** (configurable in the lint). |
| `timestamp` | **`YYYY-MM-DD`** (date-only) — the doc's authored date. Use the git first-commit date for back-filled docs. |

## Type vocabulary (closed set)

Pick the single best fit. Do not invent new types without updating this list.

| `type` | Use for |
|--------|---------|
| `Design` | An architecture/design for something to be built. |
| `Brief` | An instruction / build-spec handed to a session. |
| `Spec` | A precise specification of a schema, format, or feature. |
| `Reference` | Durable reference material — catalog, quickref, glossary, taxonomy. |
| `Analysis` | An analytical breakdown, methodology, or argument. |
| `Runbook` | Step-by-step operator actions. |
| `Coordination` | A multi-session bus / decision log. |
| `Roadmap` | A phased plan of future work. |
| `Findings` | Results of a review, audit, smoke-test, or observation. |

## The index root

`index.md` (if present) is the **bundle root**. In addition to the five fields it carries
`okf_version: "0.1"` (the format version marker) and links the key docs. Bump `okf_version`
when this spec changes in a backward-incompatible way.

## Timestamp format — canonical going forward

`YYYY-MM-DD` (date-only). New and back-filled docs use date-only. Existing full-ISO
timestamps are left as-is (the lint accepts both for compatibility) but should migrate
to date-only on next edit.

## Archiving

Retired docs (superseded or consumed by shipped work) move to `_archive/`. They keep
their frontmatter for provenance but leave the active set and are **not linted** (the
lint skips `_archive/` by default). `_archive/README.md` indexes what was retired and why.

## Enforcement

`scripts/check-okf.mjs` validates every doc in the docs directory:
- frontmatter present, with all five required fields;
- `type` ∈ the vocabulary above;
- `tags` is a non-empty list (first tag should match your project name — configurable);
- `timestamp` matches `YYYY-MM-DD` (or legacy full-ISO).
- `index.md` additionally requires `okf_version`.

Run: `node scripts/check-okf.mjs` (exit 0 = all compliant; non-zero lists violations).
Wire into CI / a pre-commit check to keep the corpus at 100%.

### Configuration

Both `check-okf.mjs` and `fix-okf.mjs` respect these env vars:

| Env var | Default | What it does |
|---------|---------|-------------|
| `TRACKER_DOCS_DIR` | `Devins_Plans` | The docs directory to scan (relative to repo root) |
| `OKF_PROJECT_TAG` | (none — tag check disabled) | Required first tag (e.g. `sigrank`, `myproject`) |
| `OKF_SKIP_DIRS` | `_archive,_planning,_merge` | Comma-separated dirs to skip during the scan |

Example:
```bash
OKF_PROJECT_TAG=myproject node scripts/check-okf.mjs
```
