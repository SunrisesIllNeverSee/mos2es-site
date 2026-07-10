---
type: Reference
title: SEO scripts — IndexNow ping
description: Reference doc for scripts/indexnow-ping.sh. Notifies Bing, DuckDuckGo, Yandex, and Seznam about page updates for mos2es.com via the IndexNow API.
tags: [mos2es, reference, scripts, seo, indexnow]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:01 UTC
---

# SEO Scripts — IndexNow Ping

## scripts/indexnow-ping.sh

**What it does:** Notifies search engines (Bing, DuckDuckGo, Yandex, Seznam via IndexNow
API) about page updates for mos2es.com.

**Dependencies:** `jq` (JSON payload construction), `curl` (HTTP POST requests), Bash.

**How it's invoked:**

- `./scripts/indexnow-ping.sh` — pings all sitemap URLs
- `./scripts/indexnow-ping.sh /papers` — pings a single URL

**Key behavior:**

1. Parses `sitemap.xml` to extract URLs
2. Constructs JSON payload with `host`, `key`, `keyLocation`, `urlList`
3. POSTs to IndexNow endpoints:
   - `api.indexnow.org`
   - `api.bing.com/indexnow`
   - `yandex.com/indexnow`
4. Reports HTTP status codes per endpoint

**External dependencies:**

- `jq` — required for JSON construction
- `curl` — required for HTTP requests
- Bash (no specific version requirement)

## Notes

- The IndexNow key file is `3cb9dad60ebc43248d4ec58b2d9b4aca.txt` at the repo root (see
  [config/root-config.md](../config/root-config.md)).
- Run after adding/removing pages or updating content. The script reads `sitemap.xml` as
  the source of truth for the URL list — keep `sitemap.xml` in sync when pages change.
- Per CLAUDE.md: `jq` + `curl` are required for this script.
