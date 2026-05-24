# MO§ES — Raw Numbers (Locked)

**Source:** raw JSONL · 98 session files · all subagents
**Measurement window:** May 8–14, 2026 (7-day window, 5 build days May 10–14)
**Locked:** 2026-05-24
**Comparison data:** see [chart_raw.md](chart_raw.md) and [chart_kernels.md](chart_kernels.md)

---

## MO§ES Kernels (own values only)

| Kernel | MO§ES |
|---|---|
| I · Cache Hit Rate | 94.66% |
| II · Output : Input | 17.9× |
| III · Tokens / Task | 810K |
| IV · Time / Task | 1.84m |
| V · Cost / LOC | $0.0007 |

---

## Raw Token Extraction (98 sessions, all subagents)

| Bucket | Tokens |
|---|---|
| Input | 123,246 |
| Output | 3,902,803 |
| Cache Create | 34,826,779 |
| Cache Read | 1,084,399,183 |
| **Total** | **1,123,252,011** |

---

## Portrait Totals

| Field | Value |
|---|---|
| Total tokens | 1.12B |
| Cost (plan) | $23.33 |
| Cost (API equivalent) | $1,564.47 |
| Active time | 44.9 hrs |
| Sessions | 98 |
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
