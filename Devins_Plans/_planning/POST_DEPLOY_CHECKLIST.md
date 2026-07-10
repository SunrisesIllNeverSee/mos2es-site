---
type: Checklist
title: Post-Deploy Checklist
description: Step-by-step post-deploy checklist for the mos2es.com SEO steroid build-out. Covers deploy, verification, GSC sitemap resubmit, IndexNow push, Google Indexing API, Zenodo updates, Screaming Frog re-crawl, citation test, and the parked Cloudflare Pages migration discussion.
tags: [mos2es, seo, geo, aeo, post-deploy, checklist, gsc, indexnow, zenodo, screaming-frog, cloudflare]
timestamp: 2026-07-10
---

# Post-Deploy Checklist — SEO Steroid Build-Out

> **Context:** The SEO steroid build-out (see
> [`SEO_STEROID_BUILDOUT_PLAN.md`](SEO_STEROID_BUILDOUT_PLAN.md)) added ~30 new
> content pages, expanded JSON-LD to 8 schema types, built out `llms.txt` +
> `llms-full.txt`, added a shared footer, and updated `sitemap.xml` from 10 to
> 40 URLs. This checklist covers everything that must happen **after** the code
> is merged to `main` to get the new content crawled, indexed, and cited.
>
> **Run order:** Steps 1–2 (deploy + verify) → Step 3 (GSC sitemap) → Step 4
> (IndexNow) → Step 5 (Indexing API) → Step 6 (Zenodo, manual) → Step 7
> (Screaming Frog) → Step 8 (citation test) → Step 9 (Cloudflare, parked).
>
> **Prerequisite:** `GSC_SA_KEY` env var must point at the service-account JSON
> key (see [`reference/GSC_SETUP_GUIDE.md`](../reference/GSC_SETUP_GUIDE.md)
> Step 4) before running Steps 3 and 5.

---

## Step 1 — Deploy to Netlify

**What:** Push the merged build-out to `main` so Netlify auto-builds and
publishes `_site/` to mos2es.com.

**How:**
```bash
# From the repo root (mos2es-site/)
git status                       # confirm only your files are staged
git push origin main
```

Netlify watches `main`, runs `npm run build`, and publishes the generated
`_site/` directory. No manual deploy step.

**Expected result:**
- `git push` completes with no rejections.
- Netlify build kicks off within ~30 seconds (watch the Netlify dashboard or
  the deploy notification).
- Build finishes green in ~1–2 minutes.
- `https://mos2es.com/` serves the new homepage.

**If it fails:**
- **Push rejected (non-fast-forward):** run `git pull --rebase origin main`,
  resolve conflicts, then push again.
- **Netlify build fails:** open the Netlify deploy log. Most common causes are
  a broken `npm run build` (missing dependency → `npm install`) or a syntax
  error in a new HTML page. Fix locally, re-push.
- **Build succeeds but site doesn't update:** check Netlify → Site settings →
  Build & deploy → Publish directory is `_site/`. Confirm the deploy wasn't
  marked as a draft.

---

## Step 2 — Verify the deploy (5 sample URLs)

**What:** Confirm the live site loads and that the new content pages are
reachable. Test one URL from each new content category.

**How:**
```bash
# Homepage
curl -sI https://mos2es.com/ | head -1

# 5 new-page spot checks (expect HTTP 200)
for url in \
  https://mos2es.com/concepts/conservation-law \
  https://mos2es.com/guides/how-to-enforce-commitment-conservation \
  https://mos2es.com/vs/constitutional-ai \
  https://mos2es.com/faq \
  https://mos2es.com/blog/governance-vacuum ; do
  printf '%s -> ' "$url"
  curl -sI "$url" | head -1
done
```

Also open each URL in a browser and confirm the page renders (nav, footer,
JSON-LD, FAQ section).

**Expected result:**
- Homepage returns `HTTP/2 200`.
- All 5 sample URLs return `HTTP/2 200` (not 301 to a different path, not 404).
- Each page renders with the shared nav + footer and contains a JSON-LD
  `<script type="application/ld+json">` block.

**If it fails:**
- **404 on a new page:** the file wasn't emitted to `_site/` (check the build
  output) or the filename/path doesn't match the sitemap entry. Rebuild and
  re-push.
- **200 but blank/broken layout:** a shared include (nav/footer/head) failed
  to compile. Check the build log for template errors.
- **Redirect loop or wrong canonical:** verify the `<link rel="canonical">`
  tag matches the sitemap URL exactly.

---

## Step 3 — GSC sitemap resubmit

**What:** Tell Google Search Console the sitemap has new URLs so it re-crawls.

**How:**
```bash
# One-time: point the toolkit at the service-account key
export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json

# Confirm the toolkit can auth (should list existing sitemaps)
node scripts/gsc/gsc.mjs sitemaps:list

# Submit the updated sitemap
node scripts/gsc/gsc.mjs sitemaps:submit

# Audit index coverage across ALL sitemap URLs
node scripts/gsc/gsc.mjs check:index
```

> **Note:** The GSC toolkit uses a colon-separated command syntax
> (`sitemaps:submit`, `check:index`), not space-separated. The commands above
> are the real ones; `sitemap submit` / `index audit` in the plan summary are
> shorthand for the same operations.

**Expected result:**
- `sitemaps:list` returns the existing `sitemap.xml` entry without auth errors.
- `sitemaps:submit` returns a success response; GSC shows "Submitted" with
  40 URLs discovered.
- `check:index` prints a per-URL table; most core pages show as indexed or
  "Discovered — currently not indexed" (new pages take days to weeks to
  index).

**If it fails:**
- **Auth error / "Property not found":** confirm `GSC_SA_KEY` points at the
  JSON key and the service-account email is added as **Owner** on the
  `sc-domain:mos2es.com` property in GSC (Settings → Users and permissions).
  See [`reference/GSC_SETUP_GUIDE.md`](../reference/GSC_SETUP_GUIDE.md)
  Step 4.
- **Submit returns 400:** the sitemap URL must be reachable. Re-run Step 2's
  `curl` against `https://mos2es.com/sitemap.xml` and confirm it returns the
  40-URL XML.
- **`check:index` quota error:** the Indexing API default quota is 200
  URLs/day. The 40-URL sitemap is well under that; if you hit it, wait 24h
  and re-run.

---

## Step 4 — IndexNow push (Bing, Yandex, IndexNow API)

**What:** Ping the IndexNow endpoints so Bing, Yandex, and any IndexNow
consumer know about all 40 sitemap URLs immediately.

**How:**
```bash
# Push every URL in sitemap.xml to all three IndexNow endpoints
node scripts/indexnow-push.mjs

# (Optional) push a single URL
node scripts/indexnow-push.mjs /concepts/conservation-law
```

The script reads `sitemap.xml`, extracts every `<loc>`, and POSTs the list to
`api.indexnow.org`, `www.bing.com/indexnow`, and `yandex.com/indexnow`.

**Expected result:**
- Each engine returns `200 OK` (or `202 Accepted`).
- Summary line prints `40 URLs pushed to 3 engines`.
- The IndexNow key file `https://mos2es.com/3cb9dad60ebc43248d4ec58b2d9b4aca.txt`
  is reachable (engines fetch it to verify ownership).

**If it fails:**
- **Non-200 from an engine:** usually transient — re-run the script. Bing
  occasionally returns `422` if the key file isn't reachable; `curl` the key
  file URL and confirm it returns the key string.
- **`fetch is not defined`:** the script needs Node 18+ (global `fetch`).
  Upgrade Node or run under `nvm use 18`.
- **0 URLs pushed:** `sitemap.xml` is empty or unreadable from the repo root.
  Confirm the file has 40 `<loc>` entries.

---

## Step 5 — Google Indexing API push (30 new pages)

**What:** Push the ~30 new page URLs directly to Google's Indexing API via the
GSC toolkit so Google queues them for crawling ahead of the normal sitemap
cadence.

**How:**
```bash
export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json

# Push every sitemap URL through the Indexing API (URL_UPDATED notifications)
node scripts/gsc/gsc.mjs check:index --push

# Or push a specific new page explicitly
node scripts/gsc/gsc.mjs index https://mos2es.com/concepts/conservation-law \
  https://mos2es.com/guides/how-to-enforce-commitment-conservation \
  https://mos2es.com/vs/constitutional-ai \
  https://mos2es.com/faq \
  https://mos2es.com/blog/governance-vacuum
```

`check:index --push` inspects every sitemap URL and auto-pushes any that
aren't yet indexed — this covers all 30 new pages in one command.

**Expected result:**
- Each pushed URL returns `URL_UPDATED` from the Indexing API.
- No quota errors (200 URLs/day default; 40 URLs is well within budget).
- Re-running `check:index` a few days later shows the new pages moving from
  "Discovered" → "Indexed".

**If it fails:**
- **403 / "Permission denied":** the service account needs the Indexing API
  enabled in Google Cloud Console (`indexing.googleapis.com`) AND must be an
  Owner on the GSC property. See
  [`reference/GSC_SETUP_GUIDE.md`](../reference/GSC_SETUP_GUIDE.md) Step 4.
- **Quota exceeded:** wait 24h for the daily quota to reset, then push the
  remaining URLs.
- **URLs stuck on "Discovered" for weeks:** this is normal for a new site
  with low authority. Keep the content fresh, build internal links, and
  re-push after any content update.

---

## Step 6 — Zenodo updates (MANUAL — owner login required)

**What:** Update the 4 Zenodo deposits to add the author ORCID and
related-identifiers that link the deposits to each other, to the GitHub repos,
and to mos2es.com. This is the academic-GEO foundation that lets AI engines
cite the work.

**This step cannot be automated — it requires the Zenodo owner's browser
session.** Flag it for the owner; a session cannot complete it.

**What to do (owner, in the Zenodo UI):**
1. Log in to https://zenodo.org.
2. For **each of the 4 deposits** (Conservation Law, Experimental Record,
   Transformation Harness, P-000 Propositions):
   - Edit → Creators → add ORCID `0009-0002-9904-5390` to the author row.
   - Edit → Related identifiers → add:
     - The other 3 Zenodo DOIs (type: `isRelatedTo` / `cites`).
     - The relevant GitHub repo URLs (e.g.
       `https://github.com/SunrisesIllNeverSee/Commitment_Theory`,
       `https://github.com/SunrisesIllNeverSee/MOS2ES`) — type: `isSupplementTo`.
     - `https://mos2es.com/papers` — type: `isIdenticalTo` or `isDerivedFrom`.
   - Save → publish the new version.

**Expected result:**
- All 4 deposits show the ORCID badge next to the author name.
- Each deposit's "Related identifiers" section lists the other deposits, the
  GitHub repos, and mos2es.com.
- DataCite metadata for each DOI resolves with the new ORCID + relations.

**If it fails:**
- **Can't edit (no edit button):** you're not logged in as the deposit owner,
  or the deposit is locked as a published version — use "New version" instead
  of editing the published record.
- **Related-identifier rejected:** Zenodo validates the identifier type. Use
  the dropdown's exact relation types (`isSupplementTo`, `isCitedBy`,
  `cites`, `isIdenticalTo`).
- **ORCID not linking:** confirm the ORCID is correct
  (`0009-0002-9904-5390`) and that the Zenodo email matches the ORCID account
  email, otherwise Zenodo won't auto-link the badge.

---

## Step 7 — Screaming Frog re-crawl

**What:** Run a full Screaming Frog crawl against the live site to verify the
build-out introduced no broken links, no missing JSON-LD, and no critical
issues.

**How (Screaming Frog GUI):**
1. Open Screaming Frog SEO Spider.
2. Enter `https://mos2es.com/` as the crawl target.
3. Set mode to **List** if you only want the sitemap URLs, or **Spider** for a
   full internal-crawl (recommended — this also catches orphan pages).
4. Start the crawl.
5. After it finishes, check:
   - **Internal → All:** page count ≥ 40.
   - **Response Codes → Client Error (4xx):** 0 critical 404s.
   - **Internal → Redirects:** no unexpected 301 chains.
   - **Structured Data:** every page has valid JSON-LD (no "Invalid markup"
     errors). Validate a sample at https://validator.schema.org and test rich
     results at https://search.google.com/test/rich-results.
   - **Links → Orphan Pages:** 0 (every page reachable from the footer/nav).

**Expected result:**
- ≥ 40 pages crawled (core + content + blog + FAQ).
- 0 critical 4xx/5xx errors.
- 0 orphan pages.
- JSON-LD validates on every page (BreadcrumbList, FAQPage, DefinedTerm,
  ScholarlyArticle, Dataset, Organization, WebSite, CreativeWork as
  applicable).

**If it fails:**
- **Page count < 40:** a content page isn't linked from the nav/footer. Add
  the missing footer link, rebuild, re-deploy (Step 1), re-crawl.
- **404s on internal links:** a cross-link points to a wrong path. Fix the
  `href` in the source page, re-push.
- **JSON-LD invalid:** open the page's JSON-LD in
  https://validator.schema.org, fix the schema error (usually a missing
  required field or a wrong `@type`), re-push.
- **Orphan pages:** add the page to the shared footer or a topic-hub "related
  pages" section.

---

## Step 8 — Citation test (AI answer engines)

**What:** Verify that MO§ES concepts now surface in AI-generated answers from
ChatGPT, Perplexity, and Claude. This is the real measure of whether the
academic-GEO + llms.txt layer is working.

**How (manual, incognito/private window):**
1. Open an incognito window in each of: ChatGPT, Perplexity, Claude.
2. Run the 10 queries below (one per engine × 3 engines, or all 10 across the
   three — 30 total checks). Do **not** log in if a free tier is available
   incognito; logged-in history can bias results.
3. Record whether each answer mentions MO§ES / commitment conservation /
   the Conservation Law, and whether it cites mos2es.com or a Zenodo DOI.

**The 10 queries:**
1. "What is the conservation law of commitment in AI?"
2. "How do you enforce commitment conservation in multi-agent systems?"
3. "What is lineage claw in semantic information?"
4. "Constitutional AI vs commitment conservation"
5. "How to audit multi-agent transformations?"
6. "What is origin binding in AI governance?"
7. "MO§ES governance enforcement layer"
8. "How to prevent semantic drift in AI agents?"
9. "Commitment conservation vs RLHF"
10. "What is recursive compression in semantic encoding?"

**Expected result:**
- At least 2–3 of the 10 queries return an answer that mentions MO§ES or the
  Conservation Law of Commitment, ideally with a citation to mos2es.com or a
  Zenodo DOI.
- This won't happen on day 1 — AI engines re-index on their own cadence
  (days to weeks). Re-run this test 1 week and 2 weeks post-deploy.

**If it fails (no mentions after 2 weeks):**
- Confirm `llms.txt` and `llms-full.txt` are reachable at
  `https://mos2es.com/llms.txt` and `https://mos2es.com/llms-full.txt`.
- Confirm the Zenodo deposits (Step 6) are updated — AI engines pull heavily
  from scholarly metadata.
- Re-push the key concept URLs via Step 5.
- Build more inbound links (GitHub README cross-links, blog mentions) — AI
  citation correlates with general web prominence.

---

## Step 9 — Cloudflare Pages migration (PARKED — discussion only)

**What:** Discuss switching the site host from Netlify to Cloudflare Pages for
unlimited free builds. **This is not an action item — it's a parked decision
to raise with the owner.**

**Why it's parked:**
- The current Netlify setup works and auto-deploys on `main` push.
- Cloudflare Pages offers unlimited free builds (Netlify's free tier caps at
  300 build minutes/month).
- Migration risk: DNS, redirect rules, and the IndexNow/GSC verification files
  must all transfer cleanly.

**Discussion points to raise with the owner:**
- Are we hitting Netlify's 300 build-minute/month cap? (If not, no urgency.)
- Cloudflare Pages publish directory would be `_site/` (same as Netlify).
- Build command stays `npm run build`.
- Need to re-add the `BingSiteAuth.xml`, `google*.html` verification files,
  and the IndexNow key file — these are static files in the repo, so they
  travel automatically, but verify post-migration.
- DNS is already on Cloudflare (likely), so the cutover is low-risk.

**Expected result of the discussion:** a go/no-go decision and, if go, a
separate migration plan. **Do not migrate as part of this build-out.**

**If it fails / gets deferred:** no action — Netlify continues to host. Re-open
the discussion only if build-minute usage becomes a constraint.

---

## Sign-off

| Step | Done by | Status | Notes |
|------|---------|--------|-------|
| 1 — Deploy | | ☐ | |
| 2 — Verify 5 URLs | | ☐ | |
| 3 — GSC sitemap resubmit | | ☐ | |
| 4 — IndexNow push | | ☐ | |
| 5 — Indexing API push | | ☐ | |
| 6 — Zenodo updates | OWNER | ☐ | manual, needs login |
| 7 — Screaming Frog re-crawl | | ☐ | |
| 8 — Citation test | | ☐ | re-run at +1wk, +2wk |
| 9 — Cloudflare discussion | OWNER | ☐ | parked |
