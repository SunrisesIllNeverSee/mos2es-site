# GSC toolkit — `gsc.mjs`

Programmatic Google Search Console + Indexing for mos2es.com. One Node script, all ops.

## One-time setup (~10 min)

1. **GCP project** (use any existing one). Enable two APIs:
   - **Search Console API** (`searchconsole.googleapis.com`)
   - **Web Search Indexing API** (`indexing.googleapis.com`)
   Console → APIs & Services → Enable APIs → search each → Enable.
2. **Service account:** IAM & Admin → Service Accounts → Create. Name it `mos2es-gsc`. Grant it role
   **Service Usage Admin** (lets the toolkit enable required Google APIs itself).
   → Keys → Add key → JSON → download. Save it somewhere private, e.g. `~/.config/mos2es/gsc-sa.json`
   (NOT in the repo — it's a credential).
3. **Grant it on the property:** Search Console → mos2es.com → Settings → Users and permissions →
   Add user → paste the service account's **email** (`...@<project>.iam.gserviceaccount.com`) → role **Owner**.
   (Owner is required for the Indexing API; sitemaps/analytics need ≥ Full.)
4. **Install the one dep** (once): `cd scripts/gsc && npm install`
5. **Point the script at the key:** `export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json`

## Property type
Default is the **Domain** property: `GSC_SITE=sc-domain:mos2es.com` (the script's default).
If yours is a URL-prefix property instead, `export GSC_SITE="https://mos2es.com/"`.

## Commands

```bash
node scripts/gsc/gsc.mjs sitemaps:list                          # registered sitemaps + error/warning counts
node scripts/gsc/gsc.mjs sitemaps:submit                        # (re)submit https://mos2es.com/sitemap.xml
node scripts/gsc/gsc.mjs sitemaps:submit https://mos2es.com/sitemap.xml
node scripts/gsc/gsc.mjs index https://mos2es.com/papers.html   # push one/many URLs (Indexing API)
node scripts/gsc/gsc.mjs index https://mos2es.com/ https://mos2es.com/architecture.html
node scripts/gsc/gsc.mjs index:status https://mos2es.com/papers.html
node scripts/gsc/gsc.mjs inspect https://mos2es.com/papers.html # URL inspection: verdict + coverage
node scripts/gsc/gsc.mjs analytics 28                          # clicks/impressions + top 15 pages, last N days
node scripts/gsc/gsc.mjs check:index                           # inspect ALL sitemap URLs, report status
node scripts/gsc/gsc.mjs check:index --push                    # inspect + auto-push unindexed URLs
node scripts/gsc/gsc.mjs ai-overviews 28                       # AI Overviews search appearance
node scripts/gsc/gsc.mjs queries 28                            # top queries by impressions/clicks
```

### `check:index` — automated indexing audit

Fetches the sitemap, inspects every URL via the URL Inspection API, and reports
which pages are indexed, discovered-but-not-indexed, or unknown to Google.
With `--push`, it also index-pushes every unindexed URL via the Indexing API.

```bash
# Inspect only (read-only):
GSC_SITE="sc-domain:mos2es.com" node gsc.mjs check:index

# Inspect + push unindexed:
GSC_SITE="sc-domain:mos2es.com" node gsc.mjs check:index --push
```

Exit code: **0** if all URLs indexed, **1** if any unindexed (useful for cron/CI).

## Typical flow when you ship a new page
```bash
export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json
node scripts/gsc/gsc.mjs sitemaps:submit                        # re-ping the updated sitemap
node scripts/gsc/gsc.mjs index https://mos2es.com/newpage.html  # fast-track the new URL
node scripts/gsc/gsc.mjs inspect https://mos2es.com/newpage.html # confirm Google sees it
```

## Notes
- **Read-only & safe:** `sitemaps:list`, `analytics`, `index:status`, `inspect`, `check:index` (without `--push`). **Mutating:** `sitemaps:submit`, `index`, `check:index --push`.
- The Indexing API is officially scoped to JobPosting/BroadcastEvent but is widely used to nudge crawl of any page; treat it as a hint, not a guarantee. Don't spam it (quota: 200 URLs/day default).
- The key file is a **credential** — keep it out of git.
- No `gcloud` required — auth is the service-account JSON via `google-auth-library`.
