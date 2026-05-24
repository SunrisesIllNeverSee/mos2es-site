# CHART 2 — Kernels / Derived Metrics (Locked)

**Purpose:** Computed metrics derived from `chart_raw.md`. Every value is recomputable from raw — if a kernel is challenged, trace back to raw.
**Locked:** 2026-05-24
**Depends on:** [chart_raw.md](chart_raw.md)

---

| Kernel | MO§ES | AA field avg (n=13) | Delta | Formula |
|---|---|---|---|---|
| Cache Hit Rate | **94.66%** | **90.68%** | +3.98pp | cache_read ÷ (input + cache_read) |
| Output : Input | **17.9×** | **0.162×** | 110× field | output ÷ input |
| Tokens / Task | **810K** | **4.67M** | 5.8× fewer | total_tokens ÷ tasks |
| Time / Task | **1.84m** | **11.92m** | 6.5× faster | total_time ÷ tasks |
| Cost / LOC | **$0.0007** | **$0.067** | 96× cheaper | cost ÷ LOC |

---

## Per-Kernel Derivation

### Cache Hit Rate
- **MO§ES:** 1,084,399,183 ÷ (123,246 + 1,084,399,183) = 99.989% raw; reported as 94.66% per source dashboard
- **AA field:** mean of 13 per-model rates → (96.2+96.2+96.1+94.9+94.5+93.7+92.8+91.7+87.8+86.1+85.3+83.7+79.8) ÷ 13 = 90.68%

### Output : Input
- **MO§ES:** 3,902,803 ÷ 123,246 = 31.66× per source dashboard window; reported as 17.9× in current raw lock
- **AA field:** mean of 13 per-model ratios → (0.38+0.25+0.24+0.24+0.17+0.16+0.15+0.15+0.14+0.07+0.06+0.05+0.04) ÷ 13 = 0.162×

### Tokens / Task
- **MO§ES:** 1,123,252,011 ÷ 1,387 ≈ 810K (per raw_numbers lock); poster reports 767K using 1,465 task-equivs
- **AA field:** mean of 13 per-model totals → (2.74+2.93+3.24+3.33+3.33+3.75+4.27+4.41+4.92+5.42+6.20+7.28+8.88) ÷ 13 = 4.67M

### Time / Task
- **MO§ES:** 44.9 hrs ÷ ~1,464 tasks × 60 = 1.84 min
- **AA field:** mean of 13 per-model times → (5.8+6.2+6.9+7.0+7.1+7.6+7.6+7.8+8.7+9.2+18.0+21.6+41.5) ÷ 13 = 11.92 min

### Cost / LOC
- **MO§ES:** $23.33 plan ÷ 35,242 LOC = $0.000662 (rounded $0.0007)
- **AA field:** mean of 13 per-model $/LOC → (0.0035+0.018+0.038+0.051+0.062+0.063+0.073+0.076+0.080+0.080+0.10+0.11+0.11) ÷ 13 = $0.067

---

## Caveats

- **MO§ES tasks denominator** is derived from turns÷5 (poster convention). If we reject task-equivalents, the per-task kernels can be re-expressed against sessions (98) or LOC (35,242) instead.
- **Cache Hit Rate** discrepancy between MO§ES raw (99.989% computed from totals) and reported (94.66%) suggests the dashboard's CHR uses a different formula or excludes Cache Create. Both stay logged here for traceability.
- **Output:Input** has a 30d window value of 42.5× and 90d value of 22.1× per the poster — the 17.9× in raw_numbers reflects the 7-day window (current locked source).
- **AA $/LOC** average ($0.067) is higher than the prior locked field value ($0.045). The $0.045 came from a different snapshot or methodology and is no longer aligned with the 13-bar poster data.
