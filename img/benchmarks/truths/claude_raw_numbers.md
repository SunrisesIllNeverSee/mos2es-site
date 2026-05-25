# Claude Code (MO§ES) — Raw Numbers

**Source:** raw JSONL · 98 session files · all subagents (extract_benchmark_window.py)
**Measurement window:** May 8–14, 2026 (7-day window, 5 build days May 10–14)
**Locked:** 2026-05-14
**Cross-ref:** mos2es_raw_numbers.md · 03_moses_5_benchmarks.md

> **Note on ccusage vs JSONL extract:** ccusage daily for the same window shows higher totals
> (cache read 1.32B vs 1.08B, cost $817 vs $1,564 API-eq) because ccusage counts ALL Claude
> activity across all projects on those calendar days. The JSONL extract below is filtered to
> the 98 benchmark sessions only and is the canonical source of truth.

---

## MO§ES Kernels (own values)

| Kernel | MO§ES |
|---|---|
| I · Cache Hit Rate | 96.88% |
| II · Output : Fresh Input | 31.7× |
| III · Tokens / Session | 53.49M |
| IV · Cost / LOC | $0.0007 (plan) · $0.0444 (API-eq) |
| V · Turns / Session | 348.9 |

---

## Raw Token Extraction (98 sessions, all subagents)

| Bucket | Tokens |
|---|---|
| Fresh Input | 123,246 |
| Cache Create | 34,826,779 |
| Cache Read | 1,084,399,183 |
| Output | 3,902,803 |
| **Total** | **1,123,252,011** |

---

## Daily Breakdown (ccusage · all Claude activity, not filtered to 98 sessions)

| Date | Fresh Input | Cache Create | Cache Read | Output | Total | Cost |
|---|---:|---:|---:|---:|---:|---:|
| 2026-05-08 | 1,297,670 | 1,436,196 | 37,924,102 | 144,228 | 40,802,196 | $38.41 |
| 2026-05-09 | 648,703 | 988,097 | 28,723,080 | 124,942 | 30,484,822 | $26.36 |
| 2026-05-10 | 3,837,246 | 7,141,649 | 347,853,424 | 1,159,362 | 359,991,681 | $219.08 |
| 2026-05-11 | 5,381,380 | 11,707,119 | 403,789,642 | 1,199,049 | 422,077,190 | $236.51 |
| 2026-05-12 | 44,013 | 11,915,401 | 385,156,498 | 1,538,367 | 398,654,279 | $214.71 |
| 2026-05-13 | 2,506 | 694,648 | 5,172,089 | 31,400 | 5,900,643 | $6.60 |
| 2026-05-14 | 2,055 | 2,701,932 | 107,256,770 | 505,688 | 110,466,445 | $75.56 |
| **TOTAL** | **11,213,573** | **36,585,042** | **1,315,875,605** | **4,703,036** | **1,368,377,256** | **$817.22** |

---

## Portrait Totals (canonical — from JSONL extract)

| Field | Value |
|---|---|
| Total tokens | 1.12B |
| Cost (plan) | $23.33 |
| Cost (API equivalent) | $1,564.47 |
| Active time | 44.9 hrs |
| Sessions | 98 (21 parent + subagents) |
| Turns | 7,327 |
| Task-equivalents (turns ÷ 5) | ~1,465 |

---

## Lines of Code Shipped

| Source | Path | LOC |
|---|---|---|
| App TS/TSX | `app/**/*.ts` + `.tsx` | 23,692 |
| Migrations SQL | `migrations/*.sql` (38 files) | 6,876 |
| MCP Server TS | `application-hub-mcp-server/src/**/*.ts` | 4,060 |
| Scripts | `scripts/` | 614 |
| **Total** | | **35,242** |

Shipped in 5 build days within the 7-day measurement window (May 10–14, 2026).
