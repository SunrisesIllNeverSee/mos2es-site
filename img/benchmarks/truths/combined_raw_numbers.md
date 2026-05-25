# Combined Engine Raw Numbers — Claude Code + Codex

**Measurement window:** May 8–14, 2026
**Engines:** Claude Code (MO§ES · Opus 4.7) + Codex (gpt-5.3-codex, gpt-5.4, gpt-5.5)
**Compiled:** 2026-05-25

---

## Kernel Comparison

| Kernel | Claude Code | Codex | Edge |
|---|---|---|---|
| I · Cache Hit Rate | 96.88% | **99.66%** | Codex +2.78pp |
| II · Output : Input | **31.7×** | 20.0× | Claude 1.6× higher |
| III · Cost / Session | $74.50 | **$15.92** | Codex 4.7× cheaper |
| IV · Tokens / Session | 53.49M | **24.65M** | Codex 2.2× leaner |
| V · Total Window Cost | $1,564 (API-eq) | **$111.43** | Claude 14× more expensive |

---

## Combined Token Totals

### Claude Code (JSONL extract · 98 sessions · canonical)

| Bucket | Tokens |
|---|---|
| Fresh Input | 123,246 |
| Cache Create | 34,826,779 |
| Cache Read | 1,084,399,183 |
| Output | 3,902,803 |
| **Total** | **1,123,252,011** |

### Codex (ccusage · 4 active days · 7 sessions)

| Bucket | Tokens | Note |
|---|---|---|
| User Fresh Prompt | 554,358 | ccusage `outputTokens` |
| Cache Read | 160,873,472 | ccusage `cachedInputTokens` |
| Codex Generation | 11,089,944 | ccusage `inputTokens` |
| Reasoning | 113,071 | ccusage `reasoningOutputTokens` |
| **Total** | **172,517,774** | |

### Combined Window

| Bucket | Claude Code | Codex | Combined |
|---|---:|---:|---:|
| Fresh / User Prompt | 123,246 | 554,358 | 677,604 |
| Cache Create | 34,826,779 | — | 34,826,779 |
| Cache Read | 1,084,399,183 | 160,873,472 | 1,245,272,655 |
| Generation / Output | 3,902,803 | 11,089,944 | 14,992,747 |
| Reasoning | — | 113,071 | 113,071 |
| **Total** | **1,123,252,011** | **172,517,774** | **1,295,769,785** |
| **Cost** | **$1,564.47 (API-eq)** | **$111.43** | **~$1,675.90** |

---

## Engine Role Summary

| Dimension | Claude Code | Codex |
|---|---|---|
| Primary role | Generative workhorse | High-cache executor |
| Sessions | 98 | 7 |
| Token share | 86.7% | 13.3% |
| Cost share | 93.4% | 6.6% |
| Cache saturation | 96.88% | 99.66% |
| Output density | 31.7× per fresh token | 20.0× per fresh token |
| Reasoning | None | 1.0% of generation |
| Models | Opus 4.7 (primary), Opus 4.6 | gpt-5.5, gpt-5.4, gpt-5.3-codex |

> **Interpretation:** Claude Code carried the generative load — building, writing, architecting.
> Codex operated as a near-saturated cache layer — deeply embedded in the repo, executing
> against known context at high efficiency and low cost. Two-engine split: think+build vs verify+execute.

---

## Source References

- `claude_raw_numbers.md` — Claude Code canonical numbers (JSONL extract)
- `codex_raw_numbers.md` — Codex numbers (ccusage, pulled 2026-05-25)
- `mos2es_raw_numbers.md` — MO§ES portrait totals
- `03_moses_5_benchmarks.md` — Full 5-kernel breakdown with all time windows

---

## Combined 5-Kernel Analysis

| Kernel | Combined | Claude Alone | Codex Alone | AA Field Avg |
|---|---|---|---|---|
| I · Cache Hit Rate | **97.23%** | 96.88% | 99.66% | ~92% |
| II · Generation : Fresh Input | **22.1×** | 31.7× | 20.0× | ~0.11× |
| III · Cost / Session (API-eq) | **$59.85** | $74.50 | $15.92 | — |
| IV · Tokens / Session (parent) | **46.28M** | 53.49M | 24.65M | — |
| V · Cost / LOC (API-eq) | **$0.0476** | $0.0444 | n/a | — |
| V · Cost / LOC (plan+Codex) | **$0.0038** | $0.0007 | n/a | — |

**Sessions:** 28 parent (21 Claude + 7 Codex) · 105 total incl subagents  
**Total tokens:** 1,295,769,785  
**Total cost (API-eq):** $1,675.90  
**Total cost (plan+Codex):** $134.76
