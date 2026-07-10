#!/usr/bin/env node
/**
 * check-okf.mjs — lint the OKF frontmatter convention on every doc in the docs directory.
 *
 * Spec: <docs_dir>/OKF.md (Object-Knowledge Format v0.1). Every doc must open
 * with YAML frontmatter carrying five fields: type, title, description, tags,
 * timestamp. `index.md` additionally carries okf_version (the bundle root).
 *
 * PORTABLE: configurable via env vars (defaults shown):
 *   TRACKER_DOCS_DIR=Devins_Plans   — the docs directory (relative to repo root)
 *   OKF_PROJECT_TAG=<unset>         — if set, tags[0] must match this value
 *   OKF_SKIP_DIRS=_archive,_planning,_merge — comma-separated dirs to skip
 *
 * Dependency-free (hand-parses the flat frontmatter — no YAML lib needed).
 *   node scripts/check-okf.mjs        exit 0 = all compliant, 1 = violations
 */

import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(SCRIPT_DIR, '..')
const DOCS_DIR = join(REPO_ROOT, process.env.TRACKER_DOCS_DIR || 'Devins_Plans')
const PROJECT_TAG = process.env.OKF_PROJECT_TAG || ''
const SKIP_DIRS = new Set((process.env.OKF_SKIP_DIRS || '_archive,_planning,_merge').split(',').map(s => s.trim()).filter(Boolean))

const TYPES = new Set([
  'Design', 'Brief', 'Spec', 'Reference', 'Analysis', 'Runbook', 'Coordination', 'Roadmap', 'Findings',
  'Handoff', 'Playbook',
])
const REQUIRED = ['type', 'title', 'description', 'tags', 'timestamp']

/** Extract the frontmatter block (raw lines) or null if absent. */
function frontmatter(text) {
  const lines = text.split('\n')
  if (lines[0].trim() !== '---') return null
  const end = lines.indexOf('---', 1)
  if (end === -1) return null
  return lines.slice(1, end)
}

/** Parse flat `key: value` frontmatter lines into a map (top-level keys only). */
function parse(block) {
  const obj = {}
  for (const line of block) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/)
    if (m) obj[m[1]] = m[2].trim()
  }
  return obj
}

// Recurse into topic folders so foldered docs stay gated. Skip frozen/historical trees.
function walk(dir, rel = '') {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      out.push(...walk(join(dir, e.name), rel ? `${rel}/${e.name}` : e.name))
    } else if (e.name.endsWith('.md')) {
      out.push(rel ? `${rel}/${e.name}` : e.name)
    }
  }
  return out
}
const files = walk(DOCS_DIR).sort()
const violations = []

for (const f of files) {
  const text = readFileSync(join(DOCS_DIR, f), 'utf8')
  const block = frontmatter(text)
  if (!block) {
    violations.push([f, 'no frontmatter (missing opening `---` block)'])
    continue
  }
  const fm = parse(block)
  const missing = REQUIRED.filter((k) => !fm[k] || fm[k] === '')
  if (missing.length) violations.push([f, `missing field(s): ${missing.join(', ')}`])
  if (fm.type && !TYPES.has(fm.type)) violations.push([f, `type "${fm.type}" not in vocabulary`])
  if (fm.tags) {
    const tags = fm.tags.replace(/^\[|\]$/g, '').split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    if (tags.length < 1) {
      violations.push([f, `tags must be a non-empty list (got: ${fm.tags})`])
    } else if (PROJECT_TAG && tags[0] !== PROJECT_TAG) {
      violations.push([f, `tags[0] must be "${PROJECT_TAG}" (got: "${tags[0]}")`])
    }
  }
  if (fm.timestamp && !/^\d{4}-\d{2}-\d{2}/.test(fm.timestamp)) {
    violations.push([f, `timestamp "${fm.timestamp}" not YYYY-MM-DD`])
  }
  if (f === 'index.md' && !fm.okf_version) violations.push([f, 'index root missing okf_version'])
}

const compliant = files.length - new Set(violations.map((v) => v[0])).size
if (violations.length === 0) {
  console.log(`✓ OKF: all ${files.length} docs compliant.`)
  process.exit(0)
}
console.log(`✗ OKF: ${compliant}/${files.length} compliant — ${violations.length} violation(s):\n`)
for (const [f, why] of violations) console.log(`  ${f.padEnd(34)} ${why}`)
process.exit(1)
