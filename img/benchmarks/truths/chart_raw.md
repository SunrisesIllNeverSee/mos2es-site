# CHART 1 — Raw Basic Numbers (Locked)

**Purpose:** Source-of-truth measured counts. No denominators applied. No ratios computed.
**Locked:** 2026-05-24

- **MO§ES** = totals across the 7-day measurement window (2026-05-08 → 2026-05-14)
- **AA field avg per model** = single benchmark run × 358 fixed tasks (averaged across 13 models)
- **AA field combined** = sum across all 13 models

---

| Raw count | MO§ES (7-day total) | AA field avg per model | AA field (13 models combined) |
|---|---|---|---|
| Sessions | **98** | **1** | 13 |
| Tasks | 1,465 (turns÷5) | **358** | 4,654 |
| Input tokens (fresh) | **123,246** | 162,890,000 | 2,117,570,000 |
| Output tokens | **3,902,803** | 17,184,000 | 223,392,000 |
| Cache In (create) | **34,826,779** | n/a — not reported separately | n/a |
| Total Cache (read) | **1,084,399,183** | 1,491,428,000 | 19,388,564,000 |
| Total Tokens | **1,123,252,011** | 1,671,502,000 | 21,729,526,000 |
| LOC | **35,242** (measured) | 7,160 (358 × 20 convention) | 93,080 |
| Active time | **44.9 hrs** | 71.1 hrs (358 × 11.92m) | 924 hrs |
| Cost | **$23.33** plan · $1,564.47 API equiv | — | — |

---

## Sources

| Field | MO§ES source | AA source |
|---|---|---|
| Token counts | Token Dashboard 7d API | artificialanalysis.ai/agents/coding-agents |
| Sessions/tasks | session file count (98) · turns÷5 (1,465) | AA benchmark suite (358 fixed tasks) |
| LOC | `wc -l` on App Hub repo | AA 20 LOC/task convention |
| Time | Active wall time across sessions | AA per-task time × 358 |
| Cost (MO§ES) | Anthropic $100/mo Max plan · ccusage API equiv | — |

## Notes

- AA does not separately report Cache Create tokens — their "cached" bucket reflects cached input (Cache Read equivalent).
- AA LOC is a pricing convention (20 LOC per task × 358 tasks = 7,160), not measured shipped code.
- MO§ES "tasks" derived from turns÷5 (poster definition). If you reject this denominator, the per-task kernels in chart_kernels.md need to be re-expressed in a different unit.
