---
type: Reference
title: img/benchmarks/ — benchmark asset inventory
description: Reference doc for the img/benchmarks/ directory. Truth data, active posters, archive. Sole consumer is benchmarks.html.
tags: [mos2es, reference, assets, benchmarks, img]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:03 UTC
---

# img/benchmarks/ — Benchmark Asset Inventory

**Path:** `img/benchmarks/`
**Sole consumer:** `benchmarks.html` (14 references) — see [pages/benchmarks.md](../pages/benchmarks.md).

> **Hard rule:** Do NOT modify HTML chart values or re-export screenshots without explicit
> instruction. (See `.claude/session_notes.md` — 2026-05-21 incident.)

## Active files (img/benchmarks/)

### PDFs
| File | Purpose | Referenced at |
|------|---------|---------------|
| `MOSES_BENCHMARK_POSTER.pdf` | Full benchmark poster (all 13 field models) | `benchmarks.html` line 202 |
| `MOSES_UPDATED_VSRAW.pdf` | Honest comparison PDF | `benchmarks.html` line 205 |

### PNGs
| File | Purpose | Referenced at |
|------|---------|---------------|
| `MOSES_HONEST_PORTRAIT.png` | Portrait format benchmark visualization | `benchmarks.html` line 203 (OG/Twitter) |
| `MOSES_UPDATED_VSRAW.png` | Landscape format benchmark visualization | `benchmarks.html` line 204 (OG/Twitter) |
| `card_06_combined.png` | Combined slide (5 kernels → 5 token categories) | `benchmarks.html` lines 198, 206 |

### HTML posters
| File | Purpose | Referenced at |
|------|---------|---------------|
| `poster.html` | Full benchmark poster with all 13 field models (iframe) | `benchmarks.html` line 114 (iframe), 116 (standalone) |
| `poster_honest.html` | Honest comparison vs field average (2 bars per chart) | `benchmarks.html` line 121 (iframe), 123 (standalone) |
| `poster_honest_portrait.html` | Portrait with token breakdown & cross-cost analysis | `benchmarks.html` line 127 (iframe), 129 (standalone) |

### Unreferenced (likely WIP)
| File | Purpose | Status |
|------|---------|--------|
| `poster_multi_engine.html` | Multi-engine composition (Claude + Codex) | UNREFERENCED — WIP |
| `card_tokenmaxx_og.html` | Social card 1200×630 (Tokenmaxx Receipts) | UNREFERENCED — WIP/social |

### Config
| File | Purpose |
|------|---------|
| `.vscode/settings.json` | VSCode settings |

---

## Truth data (img/benchmarks/truths/)

All files are **ACTIVE** and contain locked benchmark metrics. These are the canonical
data sources.

| File | Purpose | Locked |
|------|---------|--------|
| `aa_model_averages.md` | Artificial Analysis 13-model field averages (per-model token breakdown: 455K input / 4,166K cached / 48K output / 4,669K total) | 2026-05-24 |
| `chart_kernels.md` | Derived metrics (5 kernels: Cache Hit Rate 94.66% vs 90.68%, Output:Input 17.9× vs 0.162×, Tokens/Task 810K vs 4.67M, Time/Task 1.84m vs 11.92m, Cost/LOC $0.0007 vs $0.067) | 2026-05-24 |
| `chart_raw.md` | Raw basic numbers (no denominators): sessions, tasks, input/output tokens, cache create/read, total tokens, LOC, active time, cost | 2026-05-24 |
| `claude_raw_numbers.md` | Claude Code (MO§ES) raw numbers from JSONL: 98 sessions, 7,327 turns, 1.12B total tokens, $23.33 plan cost, 35,242 LOC, 5 kernels | 2026-05-14 |
| `codex_raw_numbers.md` | Codex raw numbers from ccusage: 7 sessions, 4 active days, 172.5M total tokens, $111.43 cost, 99.66% cache hit rate, 5 kernels | 2026-05-25 |
| `combined_raw_numbers.md` | Combined engine (Claude + Codex): 28 parent sessions, 1.29B total tokens, $1,675.90 cost, kernel comparison, engine role summary | 2026-05-25 |
| `mos2es_raw_numbers.md` | MO§ES locked raw numbers: 98 sessions, 1,465 task-equivalents, 1.12B tokens, $23.33 plan cost, 35,242 LOC, 5 kernels | 2026-05-24 |

---

## Archive (img/benchmarks/archive/)

28 archived files (17 PNGs, 6 HTMLs, 1 PDF, 2 MD scratchpads, 2 duplicates). Includes
pre-truthlock versions (2026-05-21) documenting the data lock transition. Scratch files
(`avgmodel.scratch.md`, `avgmod2.scratch.md`) contain calculation reasoning for AA model
averages.

### Notable archived files
- `poster_honest.2026-05-21-pre-truthlock.html` — pre-truthlock honest poster
- `poster_honest_portrait.2026-05-21-pre-truthlock.html` — pre-truthlock portrait
- `card_01_cache.png` through `card_05_loc.png` — individual chart cards (v1)
- `chart_01_cache.png` through `chart_05_loc.png` — chart exports
- `MOSES_BENCHMARK_POSTER_SLIM.pdf` — slim poster variant

---

## Data coverage summary

- **Truth data covers:** Claude Code (MO§ES), Codex, Combined engines, AA field averages
  (13 models)
- **Metrics (5 kernels):** Cache Hit Rate, Output:Input, Tokens/Task, Time/Task, Cost/LOC
- **Time window:** 7-day measurement window (May 8–14, 2026)
- **Models:** Cursor (Opus 4.7, Composer 2, GPT-5.5), Claude Code (Opus 4.7/4.6, Sonnet
  4.6, Kimi K2.6, GLM-5.1, DeepSeek V4 Pro), Codex (GPT-5.4/5.5), Gemini 3.1 Pro

## Recommendations

- **`poster_multi_engine.html` + `card_tokenmaxx_og.html`:** Determine if these WIP files
  should be integrated into `benchmarks.html` or removed.
- **Archive maintenance:** Well-organized with clear versioning — no action needed.
- **Truth data integrity:** All truth files are locked with dates and cross-referenced —
  good practice maintained.
