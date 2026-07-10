---
type: Runbook
title: SEO/AEO/GEO Maintenance & Check-in Playbook
description: The routine cadence for keeping SigRank's search, answer-engine, and generative-engine visibility healthy and growing. NOT a re-implementation guide — the implementation is done. This is the upkeep layer: what to check, how often, what tools to use, and the tricks that compound.
tags: [sigrank, growth, seo, aeo, geo, maintenance, playbook, check-in, monitoring, cadence]
timestamp: 2026-07-09T19:30:00Z
last_touched: 2026-07-10 08:46 UTC
---

# SEO/AEO/GEO Maintenance & Check-in Playbook

> **The implementation is DONE.** All 7 phases shipped (OG images, JSON-LD, llms.txt,
> dynamic OG, npm/GitHub discoverability, 34 content pages, Screaming Frog audit fixes).
> This doc is the **upkeep layer** — the routine checks that keep visibility compounding.
>
> ⚠️ **DO NOT touch the SEO/AEO/GEO content strategy.** See CLAUDE.md header note.
> The llms.txt topic hubs, /vs/, /alternatives/, /guides/, /tools/, /metrics/ routes
> are intentional. Never remove them.

---

## The Cadence at a Glance

| Frequency | What | Time | Tool |
|-----------|------|------|------|
| **Weekly** | Citation query test | 15 min | Manual (incognito) |
| **Weekly** | GSC AI Overviews + queries | 5 min | `scripts/gsc/gsc.mjs` |
| **Bi-weekly** | Core page freshness refresh | 30 min | Manual edit |
| **Monthly** | Full AEO citation audit | 30 min | `aeo-platform` or manual |
| **Monthly** | Competitor citation benchmark | 20 min | Manual (incognito) |
| **Monthly** | AI crawler access check | 5 min | `curl robots.txt` + bot log |
| **Monthly** | IndexNow push for new/changed URLs | 5 min | `curl` script |
| **Quarterly** | Full GEO audit (6 areas) | 2 hours | Manual + aeo-platform |
| **Quarterly** | Screaming Frog crawl | 30 min | SF SEO Spider (free, 500 URLs) |
| **Quarterly** | Content decay review | 1 hour | GSC + manual |
| **Quarterly** | llms.txt + sitemap audit | 15 min | Manual |
| **Annually** | Full content audit | Half day | GSC + SF + manual |

---

## Weekly Checks

### 1. Citation Query Test (15 min)

The single highest-leverage measurement activity. Run 10-15 target queries in
**incognito mode** across ChatGPT, Perplexity, Claude, and Google AI Overviews.

**Target query set (copy-paste these each week):**
```
1. what is yield cascade in AI coding
2. token efficiency ranking AI operators
3. how to measure AI coding efficiency
4. AI operator token telemetry
5. cache hit rate AI coding
6. what is leverage in token cascade
7. signal to noise ratio AI tokens
8. ccusage alternative
9. AI coding metrics tools
10. how to benchmark AI coding workflow
11. token waste calculator
12. AI operator scoring
13. what is SigRank
14. token cascade compression ratio
15. privacy preserving AI leaderboard
```

**For each query, record:**
- Mentioned? (yes/no — does SigRank appear by name?)
- Cited? (yes/no — is signalaf.com linked as a source?)
- Competitor cited instead? (who?)
- Position in answer (top/middle/bottom/not present)

**Log format** (spreadsheet or markdown table):
```
| Date | Engine | Query | Mentioned | Cited | Competitor | Position |
```

**Trick:** Run the same query 2-3 times across different sessions/days.
One-off results mislead more often than they inform. LLMs have variance.

**Trick:** Perplexity is the most citation-heavy engine — if you're not
showing up there, your GEO content structure needs work. Start there.

### 2. GSC AI Overviews + Top Queries (5 min)

```bash
cd ~/Desktop/SigRank
export GSC_SA_KEY=~/.config/sigrank/gsc-sa.json
node scripts/gsc/gsc.mjs ai-overviews 7    # AI Overview impressions (7d)
node scripts/gsc/gsc.mjs queries 7          # top queries by impressions (7d)
```

**What to watch:**
- AI Overview impressions trending up week-over-week
- New queries appearing that you didn't target (content discovery)
- Queries where you rank position 1-10 but get 0 clicks (title/meta fix)

**Baseline (2026-07-15):** 0 AI Overview impressions, 109 total impressions,
0 clicks. This is the starting line — everything from here is growth.

---

## Bi-Weekly

### 3. Core Page Freshness Refresh (30 min)

AI platforms (especially Perplexity) bias toward recently modified content.
A guide published 6 months ago without updates loses citation potential to
a competitor who published last week — regardless of domain authority.

**Pages to refresh on rotation (pick 2-3 per cycle):**
- `/methodology` — update the quotable figures (server-rendered, but check
  the surrounding prose is current)
- `/science` — update if new papers/Zenodo deposits published
- `/guides/*` (8 pages) — rotate through, update stats, add new examples
- `/metrics/*` (6 pages) — verify formulas still match the live calculator
- `/vs/*` (5 pages) — update if competitor shipped new features
- `/blog/*` (2 posts) — update year references, stats, tool versions

**What "refresh" means:**
- Update any dated references ("2026" → keep current, update stats)
- Add 1-2 new sentences with current data (e.g., "As of [date], the field
  average yield is X")
- Touch the `dateModified` in JSON-LD (if present) or add one
- Check that internal links still resolve (no new 404s from route changes)

**Trick:** The `dateModified` field in JSON-LD is a freshness signal that
AI engines read. Even a small content update + dateModified bump can
restore citation frequency within 4-8 weeks.

**Trick:** 70% of content resources should go to refreshing existing pages,
30% to new content. Updating delivers faster citation gains than creating
new pages (40-50% less effort, faster impact).

---

## Monthly Checks

### 4. Full AEO Citation Audit (30 min)

Either run `aeo-platform` (automated, ~$0.20/run) or do the manual version
from the weekly check but with the full 50-query set.

**Automated:**
```bash
npm install -g aeo-platform
export OPENAI_API_KEY=sk-...
export GEMINI_API_KEY=AIza...
aeo-platform init --yes --brand=SigRank --domain=signalaf.com --auto
aeo-platform run
aeo-platform report
```

**Manual:** Same as weekly but expand to 50 queries and log everything.
Compare month-over-month. Look for:
- Citation rate trend (cited / total queries)
- Mention rate trend (mentioned / total queries)
- Per-engine breakdown (which engine is gaining/losing)
- New competitor citations (who showed up that wasn't there last month?)

### 5. Competitor Citation Benchmark (20 min)

Run 10-15 of your target queries in incognito across all engines and
record which competitors get cited instead of SigRank.

**Known competitors to watch:**
- ccusage (the tool, not the concept)
- LMSYS Arena / Chatbot Arena
- WakaTime (coding metrics, different angle)
- Cursor (AI coding, different angle)
- Any new AI coding metrics tool that appears

**Trick:** Track competitor robots.txt changes. A competitor who suddenly
opens up GPTBot + publishes an llms.txt is investing in AI visibility —
strategic signal. A competitor who blocks everything is either protecting
content or hasn't noticed the shift.

```bash
# Quick competitor robots.txt check
curl -s https://competitor.com/robots.txt | grep -i "gptbot\|claudebot\|perplexity\|google-extended"
curl -s https://competitor.com/llms.txt | head -20
```

### 6. AI Crawler Access Check (5 min)

Verify that AI crawlers can still reach your content. robots.txt is plain
text and rarely reviewed — mistakes ship silently and stay live for months.

```bash
# Check our robots.txt
curl -s https://signalaf.com/robots.txt

# Verify AI bots are allowed (should see allow: / for all)
# Check for accidental blocks:
curl -s https://signalaf.com/robots.txt | grep -i "disallow"
# Should only show /api/ and /auth/ (not content pages)
```

**The AI crawlers that matter (2026):**
| Bot | What it does | Block = |
|-----|-------------|---------|
| GPTBot | Trains future GPT models | Exit ChatGPT training corpus |
| OAI-SearchBot | ChatGPT Search citations | Zero ChatGPT Search citations |
| ClaudeBot | Claude training + search | Exit Claude knowledge graph |
| PerplexityBot | Perplexity citations | Zero Perplexity citations |
| Google-Extended | Google AI Overviews | No AI Overview inclusion |
| CCBot | Common Crawl (many LLMs train on this) | Exit broad LLM training |
| Amazonbot | Amazon's crawler | Reduced Alexa/Alexa AI visibility |
| Applebot-Extended | Apple Intelligence | Reduced Apple AI visibility |

**Our robots.ts allows all crawlers** (only blocks `/api/` and `/auth/`).
Verify this hasn't changed after any deploy.

**Trick:** Perplexity has been accused of fetching pages despite robots.txt
blocks via "user-driven" fetches. Monitor both `PerplexityBot` and
`Perplexity-User` in your bot logs if you have server access.

### 7. IndexNow Push (5 min)

Push any new or changed URLs to Bing/Yandex/Naver for instant indexing.

```bash
INDEXNOW_KEY=$(cat ~/.config/sigrank/indexnow.key)

# Push specific URLs
curl -s -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"signalaf.com\",
    \"key\": \"$INDEXNOW_KEY\",
    \"keyLocation\": \"https://signalaf.com/$INDEXNOW_KEY.txt\",
    \"urlList\": [
      \"https://signalaf.com/methodology\",
      \"https://signalaf.com/guides/how-to-improve-your-yield\"
    ]
  }" -o /dev/null -w "HTTP %{http_code}\n"
```

**When to push:**
- After any content refresh (bi-weekly rotation)
- After shipping new pages
- After Phase H-type fixes (meta, titles, content changes)

**Trick:** IndexNow only works for Bing, Yandex, Naver, and Seznam. Google
uses the Indexing API instead (see GSC commands below).

### 8. GSC Indexing Push (5 min)

For Google, push new/changed URLs via the Indexing API:

```bash
cd ~/Desktop/SigRank
export GSC_SA_KEY=~/.config/sigrank/gsc-sa.json
node scripts/gsc/gsc.mjs index "https://signalaf.com/methodology" "https://signalaf.com/guides/how-to-improve-your-yield"
```

**Trick:** Don't push URLs that are already indexed (wastes API quota).
Check first with `node scripts/gsc/gsc.mjs inspect <url>`.

---

## Quarterly Checks

### 9. Full GEO Audit (2 hours)

Six-area audit per the GEO checklist:

1. **Crawlability** — Can PerplexityBot, GPTBot, ClaudeBot, Google-Extended
   reach your key pages? (robots.txt + server logs)
2. **Content structure** — Are key pages structured for sentence-level
   extraction? (H2 starts with a question, answer in first 2 sentences,
   schema markup present)
3. **Structured data** — Is JSON-LD valid and present on all key pages?
   (Org, WebSite, ItemList, ProfilePage, Breadcrumb, DefinedTerm, Dataset,
   FAQPage, HowTo, Article)
4. **Author entity signals** — Is ORCID linked? Are Zenodo deposits
   cross-linked? Is the Conservation Law DOI in the JSON-LD?
5. **Query gap analysis** — What queries are competitors cited for that
   SigRank isn't? (Run 50 queries, compare)
6. **Citation tracking** — Month-over-month citation rate trend

**Re-audit quarterly.** Brands that run structured GEO audits on a defined
cadence see 2.4x more AI Overview impressions after 90 days compared to
ad-hoc changes (BrightEdge Research, 2025).

### 10. Screaming Frog Crawl (30 min)

Free tier covers 500 URLs (signalaf.com has ~145, well within range).

1. Download: https://www.screamingfrog.co.uk/seo-spider/
2. Crawl `https://signalaf.com`
3. Export: All Internal Links, All External Links, Orphan Pages, Redirects
4. Compare to previous crawl (track issue count over time)

**What to look for:**
- New 404s (broken links from route changes)
- New redirect chains (A → B → C instead of A → C)
- Orphan pages (in sitemap but not linked internally)
- Duplicate titles/meta (from new pages)
- Missing H1/H2 on new pages
- Image size attributes missing on new images

**Baseline:** Crawl 2 (2026-07-09) = 23 issues, 174 flagged URLs, grade A-.
The remaining issues are all acceptable (brand titles, /compare query-param
artifact, academic readability). Track that the count doesn't INCREASE.

### 11. Content Decay Review (1 hour)

Pages that were cited by AI engines but have disappeared from citations for
2+ consecutive weeks are decaying. This is the single most common GEO
failure mode.

**How to check:**
1. Pull GSC data for pages with declining impressions
2. Cross-reference with your monthly citation audit
3. For any page declining: refresh content, bump dateModified, push to
   IndexNow + GSC Indexing API

**Trick:** Pages with >100 backlinks but zero AI citations are the highest-
ROI update targets. The backlink equity is there; the content just needs
freshness to unlock citation frequency.

### 12. llms.txt + Sitemap Audit (15 min)

```bash
# Verify llms.txt is live and complete
curl -s https://signalaf.com/llms.txt | wc -l    # should be ~60+ lines
curl -s https://signalaf.com/llms.txt | grep -c "http"  # count links

# Verify sitemap is live
curl -s https://signalaf.com/sitemap.xml | grep -oE '<loc>[^<]+</loc>' | wc -l

# Check for 404s in llms.txt links
curl -s https://signalaf.com/llms.txt | grep -oE 'https://signalaf.com[^ )]+' | while read url; do
  code=$(curl -s --max-time 5 -o /dev/null -w "%{http_code}" "$url")
  [ "$code" != "200" ] && echo "$code $url"
done

# Check GSC sitemap status
cd ~/Desktop/SigRank
export GSC_SA_KEY=~/.config/sigrank/gsc-sa.json
node scripts/gsc/gsc.mjs sitemaps:list
```

**What to verify:**
- llms.txt links all resolve (no 404s)
- sitemap URL count is growing (new pages added)
- GSC sitemap: 0 errors, 0 warnings
- New pages from the quarter are in both llms.txt and sitemap

**Trick:** llms.txt is human-curated, not auto-generated. When you ship new
content pages, add them to the appropriate llms.txt section manually. The
sitemap is dynamic (auto-includes new routes), but llms.txt is not.

---

## Annual Check

### 13. Full Content Audit (half day)

- Review every page in GSC for impressions/clicks trend
- Identify pages with zero impressions for 6+ months (candidates for
  consolidation or removal — but NEVER remove SEO/AEO/GEO strategy pages)
- Identify pages with high impressions but low CTR (title/meta optimization)
- Run a full Screaming Frog crawl + compare to all previous crawls
- Review competitor landscape (new tools, new comparison pages needed?)
- Update the target query set (add new queries, remove irrelevant ones)
- Review the llms.txt structure (does it still reflect the site?)

---

## The Tricks & Tips (Quick Reference)

### Content Structure for AI Extraction

1. **Start H2s with questions.** AI engines extract by heading. "What is
   Yield (Υ)?" as an H2, followed by a one-sentence answer, is the most
   citable format.

2. **Answer in the first 2 sentences.** LLMs lift the first 1-2 sentences
   under a heading. Put the definition there, then elaborate.

3. **Use schema markup.** FAQPage, HowTo, Article, Dataset, DefinedTerm —
   each one tells the AI engine what kind of content this is.

4. **Tables and step-by-steps.** Structured content gets lifted more than
   prose. The class ladder table, the metric formulas table, the
   comparison tables — all highly citable.

5. **One fact per sentence.** AI engines cite sentences, not paragraphs.
   "The average user yield is 1.57." is citable. "The average user yield
   is 1.57, which is surprisingly close to the power-user median of 1.51,
   because leverage without velocity doesn't pay" is not.

### Freshness Signals

6. **dateModified in JSON-LD.** Even a small content update + dateModified
   bump can restore citation frequency within 4-8 weeks.

7. **Perplexity biases toward recent content.** A guide updated last week
   beats a guide published 6 months ago, regardless of domain authority.

8. **70/30 rule.** 70% of content effort on refreshing existing pages,
   30% on new content. Updating is 40-50% less effort with faster impact.

### Entity Signals

9. **ORCID + Zenodo + GitHub cross-links.** Every academic surface should
   point to every other. The Conservation Law DOI should appear in
   llms.txt, JSON-LD, /science page, and Zenodo metadata.

10. **Consistent naming.** Use "SigRank" everywhere. Not "SignalAF" or
    "Signal Rank" or "sigrank" (except in URLs/code). Entity recognition
    depends on consistent naming across surfaces.

### AI Crawler Tricks

11. **Monitor competitor robots.txt.** A competitor opening GPTBot is a
    strategic signal. A competitor blocking is an opportunity for you.

12. **Verify bot identity.** User-agent strings are spoofable. If you have
    server logs, verify AI crawler IPs against published CIDR ranges
    (OpenAI, Anthropic, Perplexity all publish them).

13. **Don't block training bots unless you have a paid-licensing strategy.**
    Blocking GPTBot removes you from the next training cycle. For a data
    company like SigRank, being in the training corpus is the moat.

### Measurement Tricks

14. **Run queries across multiple sessions.** LLMs have variance. One run
    can show 0 citations, the next shows 3. Run 2-3 times before drawing
    conclusions.

15. **Perplexity is the citation leader.** If you're not showing up in
    Perplexity, your content structure needs work. Start there, then fix
    ChatGPT and Gemini.

16. **GSC AI Overviews is free and already wired.** Run
    `node scripts/gsc/gsc.mjs ai-overviews 28` monthly. Currently 0 —
    this is the baseline. Watch for the first non-zero week.

17. **The feedback loop is what most teams skip.** Every finding needs a
    roadmap ticket: what to fix, who owns it, what success looks like.
    Don't just log findings — act on them.

### Content Calendar

18. **Quarterly cycle with four layers:**
    - New content creation (30% of effort)
    - Freshness updates to existing content (70% of effort)
    - Entity signal building (off-site: Reddit, Quora, directories)
    - Citation monitoring and adjustment

19. **Reddit and Quora matter for GEO.** AI engines train on them. Having
    SigRank mentioned in r/MachineLearning or AI coding subreddits builds
    entity recognition. Participate with boundaried answers, not spam.

20. **Industry directories and comparison sites.** Get listed on AI tool
    directories, comparison sites, and newsletters. Each listing is an
    entity signal that compounds.

---

## Tools We Have (Already Wired)

| Tool | What | Command |
|------|------|---------|
| GSC API | Index status, AI Overviews, queries, sitemaps | `node scripts/gsc/gsc.mjs <cmd>` |
| IndexNow | Bing/Yandex/Naver instant indexing | `curl` script (above) |
| Screaming Frog | Full site crawl (free, 500 URLs) | GUI app |
| aeo-platform | Automated AEO citation audit | `aeo-platform run` |
| llms.txt | AI engine content map | `curl signalaf.com/llms.txt` |
| llms-full.txt | Full reference for AI ingestion | `curl signalaf.com/llms-full.txt` |

## Tools to Consider

| Tool | Price | When |
|------|-------|------|
| Promptwatch | $$$ | When citation share is actually moving — full gap→content→tracking loop |
| Otterly.AI | $$ | If you want automated AI visibility dashboard |
| AthenaHQ | $$ | Brand visibility across AI engines |
| SERPfinity | $$ | AI visibility + ranking progress monitoring |

**Recommendation:** Start with the free tools (GSC + manual queries +
Screaming Frog). Add aeo-platform when you want automation ($0.20/run).
Skip paid dashboards until citation share is actually moving — then use
Promptwatch for the full loop.

---

## What NOT to Do

1. **Don't remove SEO/AEO/GEO strategy pages** (see CLAUDE.md header note)
2. **Don't block AI crawlers** — being in the training corpus is the moat
3. **Don't audit once and never re-run** — citation share shifts weekly
4. **Don't trust a single LLM snapshot** — run queries 2-3 times
5. **Don't create new content before refreshing existing** — 70/30 rule
6. **Don't push already-indexed URLs to GSC** — wastes API quota
7. **Don't change robots.txt without verifying AI bot access after**
8. **Don't forget llms.txt is manual** — new pages need to be added by hand
9. **Don't ignore Perplexity** — it's the most citation-heavy engine
10. **Don't skip the feedback loop** — every finding needs an action item
