#!/usr/bin/env node
/**
 * fix-okf.mjs — auto-fix OKF frontmatter violations across the docs directory.
 *
 * Fixes three classes of violation:
 *  1. type not in vocabulary → map to closest standard type
 *  2. tags not led by project tag → prepend project tag (if OKF_PROJECT_TAG is set)
 *  3. no frontmatter at all → add minimal block (type=Reference, title from H1, etc.)
 *
 * PORTABLE: configurable via env vars (defaults shown):
 *   TRACKER_DOCS_DIR=Devins_Plans   — the docs directory (relative to repo root)
 *   OKF_PROJECT_TAG=<unset>         — if set, prepend this tag to tags[]
 *   OKF_SKIP_DIRS=_archive,_planning,_merge — comma-separated dirs to skip
 *
 * Run: node scripts/fix-okf.mjs   then verify with node scripts/check-okf.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(SCRIPT_DIR, '..')
const DOCS_DIR = join(REPO_ROOT, process.env.TRACKER_DOCS_DIR || 'Devins_Plans')
const PROJECT_TAG = process.env.OKF_PROJECT_TAG || ''
const SKIP_DIRS = new Set((process.env.OKF_SKIP_DIRS || '_archive,_planning,_merge').split(',').map(s => s.trim()).filter(Boolean))
const TODAY = new Date().toISOString().slice(0, 10)

const VALID_TYPES = new Set([
  'Design', 'Brief', 'Spec', 'Reference', 'Analysis', 'Runbook', 'Coordination', 'Roadmap', 'Findings',
  'Handoff', 'Playbook',
])

// Map non-standard type values to the closest OKF vocabulary type.
const TYPE_MAP = {
  // Case variants
  'reference': 'Reference', 'spec': 'Spec', 'brief': 'Brief', 'plan': 'Roadmap',
  'Report': 'Findings', 'Plan': 'Roadmap',
  // Domain-specific → standard
  'ledger': 'Coordination',
  'tracker': 'Reference',
  'summary': 'Findings',
  'timeline': 'Reference',
  'index': 'Reference',
  'notes': 'Reference',
  'review': 'Findings',
  'handoff': 'Handoff',
  'strategy': 'Reference',
  'checklist': 'Runbook',
  'audit': 'Findings',
  'Process': 'Runbook',
  'Log': 'Coordination',
  'Decision': 'Coordination',
  'Playbook': 'Playbook',
}

function walk(dir, rel = '') {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      out.push(...walk(join(dir, e.name), rel ? `${rel}/${e.name}` : e.name))
    } else if (e.name.endsWith('.md')) {
      out.push({ abs: join(dir, e.name), rel: rel ? `${rel}/${e.name}` : e.name })
    }
  }
  return out
}

function extractFrontmatter(text) {
  const lines = text.split('\n')
  if (lines[0].trim() !== '---') return null
  const end = lines.indexOf('---', 1)
  if (end === -1) return null
  return { lines: lines.slice(1, end), end, all: lines }
}

function parseFields(fmLines) {
  const obj = {}
  for (const line of fmLines) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s?(.*)$/)
    if (m) obj[m[1]] = m[2].trim()
  }
  return obj
}

let fixed = 0
let skipped = 0
const changes = []

for (const { abs, rel } of walk(DOCS_DIR).sort((a, b) => a.rel.localeCompare(b.rel))) {
  const text = readFileSync(abs, 'utf8')
  const fm = extractFrontmatter(text)

  if (!fm) {
    // No frontmatter — add a minimal block
    const lines = text.split('\n')
    let title = rel.replace(/\.md$/, '').replace(/.*\//, '')
    for (const line of lines) {
      const m = line.match(/^#\s+(.+)/)
      if (m) { title = m[1].trim(); break }
    }
    let desc = 'Auto-generated frontmatter — needs human review.'
    for (const line of lines) {
      const t = line.trim()
      if (!t || t.startsWith('#') || t.startsWith('>') || t.startsWith('|') || t.startsWith('-')) continue
      desc = t.slice(0, 150)
      break
    }
    const folder = rel.includes('/') ? rel.split('/')[0] : 'root'
    const tagList = PROJECT_TAG ? `[${PROJECT_TAG}, ${folder}, needs-review]` : `[${folder}, needs-review]`
    const block = [
      '---',
      `type: Reference`,
      `title: ${title}`,
      `description: ${desc}`,
      `tags: ${tagList}`,
      `timestamp: ${TODAY}`,
      '---',
      '',
    ].join('\n')
    writeFileSync(abs, block + text)
    fixed++
    changes.push(`  ${rel}  →  added frontmatter (type=Reference)`)
    continue
  }

  const fields = parseFields(fm.lines)
  let modified = false
  const newLines = [...fm.lines]

  // Fix type
  if (fields.type && !VALID_TYPES.has(fields.type)) {
    const mapped = TYPE_MAP[fields.type]
    if (mapped) {
      const idx = newLines.findIndex(l => l.match(/^type:\s/))
      if (idx >= 0) {
        newLines[idx] = `type: ${mapped}`
        modified = true
        changes.push(`  ${rel}  →  type "${fields.type}" → "${mapped}"`)
      }
    } else {
      changes.push(`  ${rel}  →  ⚠️ UNMAPPED type "${fields.type}" — needs manual fix`)
    }
  }

  // Fix tags — prepend project tag if not first (only if OKF_PROJECT_TAG is set)
  if (fields.tags && PROJECT_TAG) {
    const tagMatch = newLines.findIndex(l => l.match(/^tags:\s/))
    if (tagMatch >= 0) {
      const tagVal = newLines[tagMatch].replace(/^tags:\s/, '').trim()
      const tagsInner = tagVal.replace(/^\[/, '').replace(/\]$/, '').trim()
      const tagList = tagsInner.split(',').map(t => t.trim()).filter(Boolean)
      if (tagList[0] !== PROJECT_TAG) {
        const newTags = [PROJECT_TAG, ...tagList].slice(0, 8)
        newLines[tagMatch] = `tags: [${newTags.join(', ')}]`
        modified = true
        changes.push(`  ${rel}  →  tags prefixed with ${PROJECT_TAG}`)
      }
    }
  }

  // Fix missing timestamp
  if (!fields.timestamp) {
    const idx = newLines.findIndex(l => l.match(/^tags:\s/))
    if (idx >= 0) {
      newLines.splice(idx + 1, 0, `timestamp: ${TODAY}`)
      modified = true
      changes.push(`  ${rel}  →  added timestamp ${TODAY}`)
    }
  }

  if (modified) {
    const newFm = ['---', ...newLines, '---'].join('\n')
    const rest = fm.all.slice(fm.end + 1).join('\n')
    writeFileSync(abs, newFm + '\n' + rest)
    fixed++
  } else {
    skipped++
  }
}

console.log(`\nOKF fixer: ${fixed} files fixed, ${skipped} already compliant (or unmapped).\n`)
if (changes.length) {
  console.log('Changes:')
  changes.forEach(c => console.log(c))
}
