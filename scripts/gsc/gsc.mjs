#!/usr/bin/env node
/**
 * gsc.mjs — MO§ES Google Search Console + Indexing toolkit (one script, all ops).
 *
 * Auth: a Google Cloud SERVICE ACCOUNT JSON key (see scripts/gsc/README.md for setup).
 *   Point GSC_SA_KEY at the key file:  export GSC_SA_KEY=~/.config/mos2es/gsc-sa.json
 *   The service account's email must be added as an OWNER of the mos2es.com property in
 *   Search Console (Settings → Users and permissions → Add user → Owner), and (for indexing)
 *   added as an Owner in the Search Console property the Indexing API checks.
 *
 * Property: defaults to the domain property. Override with GSC_SITE (e.g. "sc-domain:mos2es.com"
 *   for a Domain property, or "https://mos2es.com/" for a URL-prefix property).
 *
 * Usage:
 *   node scripts/gsc/gsc.mjs sitemaps:list
 *   node scripts/gsc/gsc.mjs sitemaps:submit [https://mos2es.com/sitemap.xml]
 *   node scripts/gsc/gsc.mjs index <url> [<url> ...]        # Indexing API URL_UPDATED
 *   node scripts/gsc/gsc.mjs index:status <url>
 *   node scripts/gsc/gsc.mjs analytics [days]               # default 28; top pages + totals
 *   node scripts/gsc/gsc.mjs inspect <url>                  # URL inspection (index status)
 *   node scripts/gsc/gsc.mjs check:index                    # inspect ALL sitemap URLs
 *   node scripts/gsc/gsc.mjs check:index --push             # inspect + auto-push unindexed
 *   node scripts/gsc/gsc.mjs ai-overviews [days]            # AI Overviews search appearance
 *   node scripts/gsc/gsc.mjs queries [days]                 # top queries
 *
 * No gcloud needed. Uses google-auth-library (installed in scripts/gsc/).
 * Read-only ops (list/analytics/status/inspect) are safe; submit/index mutate Google's state.
 */

import { readFileSync } from 'node:fs'
import { GoogleAuth } from 'google-auth-library'

const SITE = process.env.GSC_SITE || 'sc-domain:mos2es.com'
const SITE_PREFIX = process.env.GSC_SITE_PREFIX || 'https://mos2es.com/'
const DEFAULT_SITEMAP = 'https://mos2es.com/sitemap.xml'
const KEY = process.env.GSC_SA_KEY

const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',     // Search Console (sitemaps, analytics, inspect)
  'https://www.googleapis.com/auth/indexing',       // Indexing API
]

function die(msg) { console.error('✗ ' + msg); process.exit(1) }
if (!KEY) die('set GSC_SA_KEY to your service-account JSON key path (see scripts/gsc/README.md)')

const auth = new GoogleAuth({ keyFile: KEY, scopes: SCOPES })

async function api(method, url, body) {
  const client = await auth.getClient()
  const res = await client.request({ method, url, data: body })
  return res.data
}

const enc = encodeURIComponent
const [, , cmd, ...args] = process.argv

try {
  switch (cmd) {
    case 'sitemaps:list': {
      const d = await api('GET', `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps`)
      for (const s of d.sitemap || []) {
        console.log(`${s.path}  submitted=${s.lastSubmitted || '—'}  errors=${s.errors || 0}  warnings=${s.warnings || 0}`)
      }
      if (!d.sitemap?.length) console.log('(no sitemaps registered)')
      break
    }
    case 'sitemaps:submit': {
      const sm = args[0] || DEFAULT_SITEMAP
      await api('PUT', `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/sitemaps/${enc(sm)}`)
      console.log(`✓ submitted ${sm}`)
      break
    }
    case 'index': {
      if (!args.length) die('usage: index <url> [<url> ...]')
      let ok = 0, fail = 0
      for (const url of args) {
        try {
          await api('POST', 'https://indexing.googleapis.com/v3/urlNotifications:publish',
            { url, type: 'URL_UPDATED' })
          ok++
        } catch (e) {
          fail++
          console.log(`✗ skip ${url} — ${(e?.response?.data?.error?.message || e.message).slice(0, 80)}`)
        }
      }
      console.log(`✓ index push: ${ok} ok, ${fail} skipped (of ${args.length})`)
      break
    }
    case 'index:file': {
      const path = args[0] || die('usage: index:file <path-with-one-url-per-line>')
      const urls = readFileSync(path, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)
      let ok = 0, fail = 0
      for (const url of urls) {
        try {
          await api('POST', 'https://indexing.googleapis.com/v3/urlNotifications:publish',
            { url, type: 'URL_UPDATED' })
          ok++
        } catch (e) {
          fail++
          console.log(`✗ skip ${url} — ${(e?.response?.data?.error?.message || e.message).slice(0, 80)}`)
        }
      }
      console.log(`✓ index push: ${ok} ok, ${fail} skipped (of ${urls.length})`)
      break
    }
    case 'index:status': {
      const url = args[0] || die('usage: index:status <url>')
      const d = await api('GET', `https://indexing.googleapis.com/v3/urlNotifications/metadata?url=${enc(url)}`)
      console.log(JSON.stringify(d, null, 2))
      break
    }
    case 'inspect': {
      const url = args[0] || die('usage: inspect <url>')
      const d = await api('POST', 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
        { inspectionUrl: url, siteUrl: SITE })
      const r = d.inspectionResult?.indexStatusResult || {}
      console.log(`verdict=${r.verdict}  coverage=${r.coverageState}  lastCrawl=${r.lastCrawlTime || '—'}  google=${r.googleCanonical || '—'}`)
      break
    }
    case 'analytics': {
      const days = Number(args[0] || 28)
      const end = new Date(); const start = new Date(end.getTime() - days * 864e5)
      const fmt = (d) => d.toISOString().slice(0, 10)
      const d = await api('POST',
        `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/searchAnalytics/query`,
        { startDate: fmt(start), endDate: fmt(end), dimensions: ['page'], rowLimit: 25 })
      let clicks = 0, imp = 0
      for (const row of d.rows || []) { clicks += row.clicks; imp += row.impressions }
      console.log(`Last ${days}d — clicks=${clicks}  impressions=${imp}  (top pages:)`)
      for (const row of (d.rows || []).slice(0, 15)) {
        console.log(`  ${row.clicks}c ${row.impressions}i  ${row.keys[0]}`)
      }
      if (!d.rows?.length) console.log('  (no data yet — normal for a new/low-traffic property)')
      break
    }
    case 'check:index': {
      const doPush = args.includes('--push')
      const smArg = args.find((a) => a.startsWith('--sm='))
      const sitemapUrl = smArg ? smArg.slice(5) : (args.find((a) => ! a.startsWith('--')) || DEFAULT_SITEMAP)

      const smRes = await fetch(sitemapUrl)
      if (!smRes.ok) die(`sitemap fetch failed: ${smRes.status} ${sitemapUrl}`)
      const smXml = await smRes.text()
      const urls = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
      if (!urls.length) die('no URLs found in sitemap')
      console.log(`Sitemap: ${sitemapUrl} (${urls.length} URLs)\n`)

      const indexed = []
      const discovered = []
      const excluded = []
      const errors = []

      for (const url of urls) {
        try {
          const d = await api('POST', 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
            { inspectionUrl: url, siteUrl: SITE })
          const r = d.inspectionResult?.indexStatusResult || {}
          const verdict = r.verdict || '—'
          const coverage = r.coverageState || '—'
          const tag = verdict === 'PASS' ? '✓' : coverage.includes('Discovered') ? '○' : '✗'
          console.log(`  ${tag} ${verdict.padEnd(7)} ${coverage.padEnd(45)} ${url}`)

          if (verdict === 'PASS') indexed.push(url)
          else if (coverage.includes('Discovered')) discovered.push(url)
          else excluded.push(url)
        } catch (e) {
          const msg = (e?.response?.data?.error?.message || e.message).slice(0, 60)
          console.log(`  ✗ ERROR   ${msg.padEnd(45)} ${url}`)
          errors.push(url)
        }
      }

      console.log(`\n── Summary ────────────────────────────────────`)
      console.log(`  Indexed:   ${indexed.length}`)
      console.log(`  Discovered: ${discovered.length}`)
      console.log(`  Excluded:  ${excluded.length}`)
      console.log(`  Errors:    ${errors.length}`)
      console.log(`  Total:     ${urls.length}`)

      if (doPush && (discovered.length || excluded.length)) {
        const toPush = [...discovered, ...excluded]
        console.log(`\n── Index push (${toPush.length} URLs) ────────────`)
        let ok = 0, fail = 0
        for (const url of toPush) {
          try {
            await api('POST', 'https://indexing.googleapis.com/v3/urlNotifications:publish',
              { url, type: 'URL_UPDATED' })
            console.log(`  ✓ pushed ${url}`)
            ok++
          } catch (e) {
            const msg = (e?.response?.data?.error?.message || e.message).slice(0, 60)
            console.log(`  ✗ skip ${url} — ${msg}`)
            fail++
          }
        }
        console.log(`\n  Pushed: ${ok} ok, ${fail} skipped`)
      }

      if (discovered.length || excluded.length || errors.length) process.exit(1)
      break
    }
    case 'ai-overviews': {
      const days = Number(args[0] || 28)
      const end = new Date(); const start = new Date(end.getTime() - days * 864e5)
      const fmt = (d) => d.toISOString().slice(0, 10)
      const d = await api('POST',
        `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/searchAnalytics/query`,
        { startDate: fmt(start), endDate: fmt(end), dimensions: ['searchAppearance'], rowLimit: 25 })
      console.log(`Last ${days}d — search appearance breakdown:`)
      let aioImp = 0, aioClicks = 0
      for (const row of d.rows || []) {
        const label = row.keys[0]
        const isAIO = label.toLowerCase().includes('ai') || label.toLowerCase().includes('overview')
        const mark = isAIO ? ' ◀ AI OVERVIEW' : ''
        console.log(`  ${row.clicks}c ${row.impressions}i  ${label}${mark}`)
        if (isAIO) { aioImp += row.impressions; aioClicks += row.clicks }
      }
      if (!d.rows?.length) console.log('  (no data — property may be too new or no AI Overviews yet)')
      console.log(`\n  AI Overviews total: ${aioClicks} clicks, ${aioImp} impressions`)
      break
    }
    case 'queries': {
      const days = Number(args[0] || 28)
      const end = new Date(); const start = new Date(end.getTime() - days * 864e5)
      const fmt = (d) => d.toISOString().slice(0, 10)
      const d = await api('POST',
        `https://www.googleapis.com/webmasters/v3/sites/${enc(SITE)}/searchAnalytics/query`,
        { startDate: fmt(start), endDate: fmt(end), dimensions: ['query'], rowLimit: 25 })
      console.log(`Last ${days}d — top queries:`)
      for (const row of (d.rows || []).slice(0, 25)) {
        console.log(`  ${row.clicks}c ${row.impressions}i  pos=${row.position.toFixed(1)}  ${row.keys[0]}`)
      }
      if (!d.rows?.length) console.log('  (no data yet)')
      break
    }
    default:
      console.log(readFileSync(new URL(import.meta.url)).toString().split('\n').slice(2, 28).join('\n'))
  }
} catch (e) {
  const msg = e?.response?.data?.error?.message || e.message
  die(`API error: ${msg}\n  (check: GSC_SA_KEY valid? service-account added as OWNER of ${SITE}? APIs enabled?)`)
}
