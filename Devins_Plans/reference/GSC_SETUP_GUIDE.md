---
type: Reference
title: Google Search Console setup guide
description: Step-by-step guide to verify mos2es.com in Google Search Console and connect the GSC toolkit.
tags: [mos2es, google, search-console, gsc, seo, setup, verification]
timestamp: 2026-07-10
last_touched: 2026-07-10 09:30 UTC
---

# Google Search Console Setup Guide

## What's already done

- **GSC toolkit script** at `scripts/gsc/gsc.mjs` — can submit sitemaps, push URLs for indexing, inspect URL status, pull analytics, and audit index coverage
- **npm dependencies installed** — `google-auth-library` ready in `scripts/gsc/node_modules/`
- **Bing verification** already in place (`BingSiteAuth.xml`)
- **IndexNow** already pinging Bing/Yandex/Naver (script at `scripts/indexnow-ping.sh`)
- **Sitemap** at `https://mos2es.com/sitemap.xml` (10 URLs, clean format)

## What you need to do (5 steps, ~15 minutes)

### Step 1: Add the property in Google Search Console

1. Go to https://search.google.com/search-console
2. Sign in with your Google account
3. Click "Add property"
4. Choose **Domain** property type (recommended — covers all subdomains and protocols)
5. Enter `mos2es.com`
6. Google will show you a verification method — for Domain properties, it gives you a **DNS TXT record**

**Alternative:** If you prefer the **URL prefix** property type (simpler verification):
1. Choose "URL prefix"
2. Enter `https://mos2es.com`
3. Choose verification method: **HTML tag** (easiest)
4. Google gives you a meta tag like: `<meta name="google-site-verification" content="ABCD1234..." />`
5. Copy the `content` value — I'll add it to all pages

### Step 2: Verify ownership

**If you chose Domain property (DNS method):**
1. Go to your DNS provider (wherever mos2es.com DNS is managed)
2. Add a TXT record with the value Google shows you
3. Click "Verify" in GSC (may take a few minutes to propagate)

**If you chose URL prefix (HTML tag method):**
1. Tell me the `content` value from the meta tag Google gave you
2. I'll add `<meta name="google-site-verification" content="YOUR_CODE">` to all 11 pages
3. Push to origin/main
4. Wait for Netlify to deploy (~1 minute)
5. Click "Verify" in GSC

**If you chose URL prefix (HTML file method):**
1. Download the `google[long-string].html` file Google gives you
2. Put it in the repo root
3. Push to origin/main
4. Click "Verify" in GSC

### Step 3: Submit the sitemap

Once verified:
1. In GSC, go to "Sitemaps" (left sidebar)
2. Enter `https://mos2es.com/sitemap.xml`
3. Click "Submit"

Or use the toolkit:
```bash
export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json
node scripts/gsc/gsc.mjs sitemaps:submit
```

### Step 4: Set up the service account (for the toolkit)

This enables the `gsc.mjs` script for programmatic sitemap submission, index pushing, and analytics.

1. Go to https://console.cloud.google.com
2. Create or select a project
3. Enable two APIs:
   - Search Console API (`searchconsole.googleapis.com`)
   - Web Search Indexing API (`indexing.googleapis.com`)
4. IAM & Admin → Service Accounts → Create
   - Name: `mos2es-gsc`
   - Role: Service Usage Admin
5. Keys → Add key → JSON → download
   - Save to `~/.config/mos2es/gsc-sa.json` (NOT in the repo)
6. In Search Console → mos2es.com → Settings → Users and permissions
   - Add user → paste the service account email (`xxx@project.iam.gserviceaccount.com`)
   - Role: Owner
7. Test it:
```bash
export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json
node scripts/gsc/gsc.mjs sitemaps:list
```

### Step 5: Push all URLs for indexing

```bash
# Submit the sitemap
node scripts/gsc/gsc.mjs sitemaps:submit

# Push all sitemap URLs to the Indexing API
node scripts/gsc/gsc.mjs index https://mos2es.com/ https://mos2es.com/papers https://mos2es.com/legal https://mos2es.com/press https://mos2es.com/benchmarks https://mos2es.com/field-sheet https://mos2es.com/governance-vacuum https://mos2es.com/architecture https://mos2es.com/demovideo https://mos2es.com/resume

# Check index status of all URLs
node scripts/gsc/gsc.mjs check:index

# Or inspect + auto-push unindexed
node scripts/gsc/gsc.mjs check:index --push
```

## After setup — ongoing maintenance

### When you publish a new page or update content:
```bash
# Re-submit sitemap
node scripts/gsc/gsc.mjs sitemaps:submit

# Push the new/updated URL
node scripts/gsc/gsc.mjs index https://mos2es.com/newpage

# Verify Google sees it
node scripts/gsc/gsc.mjs inspect https://mos2es.com/newpage
```

### Weekly check (or use the weekly script):
```bash
# Check what queries are driving traffic
node scripts/gsc/gsc.mjs queries 7

# Check top pages
node scripts/gsc/gsc.mjs analytics 7

# Check AI Overviews citations
node scripts/gsc/gsc.mjs ai-overviews 7

# Full index audit
node scripts/gsc/gsc.mjs check:index
```

### Or just run the weekly SEO maintenance script:
```bash
bash scripts/seo-weekly.sh
```

## What GSC tells you

- **Index coverage** — which pages are indexed, which aren't, why
- **Search performance** — clicks, impressions, CTR, position for each query/page
- **AI Overviews** — whether your content appears in AI-generated answers
- **Sitemap status** — errors, warnings, discovered URLs
- **Core Web Vitals** — LCP, FID, CLS scores
- **Mobile usability** — any mobile issues
- **Manual actions** — any penalties

## Troubleshooting

- **"Property not found"** — make sure you're using the right property type (`sc-domain:mos2es.com` for Domain, `https://mos2es.com/` for URL prefix)
- **Verification failed** — for DNS, wait 5-10 minutes for propagation. For HTML tag, make sure the tag is in the `<head>` of the live page
- **Indexing API quota** — 200 URLs/day default. Don't spam it
- **Service account auth error** — make sure the SA email is added as Owner in GSC, not just a user
