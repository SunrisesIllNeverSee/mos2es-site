# Codex — Raw Numbers

**Source:** ccusage@latest · `npx ccusage@latest codex daily -j` + `codex session -j`
**Measurement window:** May 8–14, 2026 (4 active days, 7 sessions)
**Pulled:** 2026-05-25
**Label note:** ccusage Codex labels are inverted vs Claude — `inputTokens` = Codex generation, `outputTokens` = user prompt

---

## Codex Kernels (own values)

| Kernel | Codex |
|---|---|
| I · Cache Hit Rate | 99.66% |
| II · Generation : Fresh Prompt | 20.0× |
| III · Cost / Session | $15.92 |
| IV · Tokens / Session | 24.65M |
| V · Reasoning : Generation | 1.0% |

---

## Raw Token Totals (4 active days)

| Bucket | Tokens | ccusage field |
|---|---|---|
| User Fresh Prompt | 554,358 | `outputTokens` |
| Cache Read | 160,873,472 | `cachedInputTokens` |
| Codex Generation | 11,089,944 | `inputTokens` |
| Reasoning | 113,071 | `reasoningOutputTokens` |
| **Total** | **172,517,774** | `totalTokens` |

---

## Daily Breakdown

| Date | User Prompt | Cache Read | Codex Gen | Reasoning | Total | Cost |
|---|---:|---:|---:|---:|---:|---:|
| 2026-05-08 | 74,957 | 25,989,504 | 1,292,692 | 9,897 | 27,357,153 | $21.71 |
| 2026-05-09 | 52,938 | 13,752,960 | 648,297 | 10,483 | 14,454,195 | $11.71 |
| 2026-05-10 | 260,563 | 81,647,232 | 3,797,991 | 52,168 | 85,705,786 | $52.47 |
| 2026-05-11 | 165,900 | 39,483,776 | 5,350,964 | 40,523 | 45,000,640 | $25.55 |
| **TOTAL** | **554,358** | **160,873,472** | **11,089,944** | **113,071** | **172,517,774** | **$111.43** |

---

## Session Breakdown

| Directory | Models | User Prompt | Cache Read | Codex Gen | Reasoning | Total | Cost |
|---|---|---:|---:|---:|---:|---:|---:|
| 2026/05/09 | gpt-5.4, gpt-5.5 | 387,573 | 118,650,496 | 8,908,508 | 85,193 | 127,946,577 | $75.35 |
| 2026/05/09 | gpt-5.5 | 43,885 | 11,424,000 | 422,106 | 8,561 | 11,889,991 | $9.14 |
| 2026/05/10 | gpt-5.5 | 17,566 | 1,878,528 | 69,912 | 2,965 | 1,966,006 | $1.82 |
| 2026/05/10 | gpt-5.5 | 12,923 | 950,272 | 85,914 | 2,393 | 1,049,109 | $1.29 |
| 2026/05/10 | gpt-5.5 | 6,565 | 928,512 | 48,930 | 2,149 | 984,007 | $0.91 |
| 2026/05/11 | gpt-5.3-codex | 9,660 | 807,936 | 161,063 | 1,673 | 978,659 | $0.56 |
| 2026/05/08 | gpt-5.5 | 1,162 | 56,448 | 34,562 | 512 | 92,172 | $0.24 |

> **Session vs daily note:** Session directories reflect session *start* date; daily reflects actual activity date.
> The large 2026/05/09 session (127.9M tokens) burned most of its compute on May 10 and 11 — visible as the daily surplus on those days.

---

## Window Summary

| Field | Value |
|---|---|
| Total tokens | 172.5M |
| Cost (API pay-per-token) | $111.43 |
| Active days | 4 |
| Sessions | 7 |
| Models used | gpt-5.3-codex, gpt-5.4, gpt-5.5 |
| Cache hit rate | 99.66% |
