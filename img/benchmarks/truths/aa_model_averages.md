# Artificial Analysis — 13-Model Field Averages (Locked)

**Source:** Artificial Analysis Coding Agent Index — per-task token telemetry
**Method:** Derived from chart values via 3 equations / 3 unknowns
**Locked:** 2026-05-24

---

## Method

For each model, given:
- `T` = tokens per task (chart 3)
- `CHR` = cache hit rate (chart 1)
- `R` = output:input ratio (chart 2)

Solve:
- `O = R × I`
- `C = I × CHR / (1 − CHR)`
- `T = I + C + O`

→ `I = T(1 − CHR) / [1 + R(1 − CHR)]`, then `C` and `O` fall out.

---

## Per-Model Token Breakdown (per task)

| Model | Input | Cached | Output | Total |
|---|---|---|---|---|
| Cursor · Opus 4.7 | 110K | 2,779K | 42K | 2,931K |
| CC · Kimi K2.6 | 281K | 6,929K | 70K | 7,280K |
| CC · Sonnet 4.6 | 239K | 4,113K | 57K | 4,409K |
| CC · Opus 4.7 | 125K | 3,175K | 30K | 3,330K |
| Codex · GPT-5.5 | 274K | 5,099K | 47K | 5,420K |
| Cursor · Composer 2 | 273K | 3,014K | 44K | 3,331K |
| CC · Opus 4.6 | 266K | 3,964K | 40K | 4,270K |
| Codex · GPT-5.4 | 350K | 4,517K | 53K | 4,920K |
| Gemini · 3.1 Pro | 442K | 2,736K | 62K | 3,240K |
| Cursor · GPT-5.5 | 331K | 2,385K | 23K | 2,739K |
| Cursor · GPT-5.4 | 547K | 3,171K | 33K | 3,751K |
| CC · GLM-5.1 | 1,436K | 7,372K | 72K | 8,880K |
| CC · DeepSeek V4 Pro | 1,242K | 4,908K | 50K | 6,200K |
| **Average (n=13)** | **455K** | **4,166K** | **48K** | **4,669K** |

**Cross-check:** derived average total (4,669K) matches the chart's stated 4.67M tokens/task average ✓

---

## LOC Note

AA does not measure actual LOC. They apply a flat **20 LOC/task convention** for the `$/LOC` calculation. All 13 models score against **358 benchmark tasks**, yielding a uniform implied **~7,160 LOC per run** — a benchmark scalar, not real shipped code.
