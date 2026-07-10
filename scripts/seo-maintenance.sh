#!/usr/bin/env bash
set -uo pipefail

# seo-maintenance.sh — MO§ES weekly SEO/AEO/GEO check-in
#
# Run: bash scripts/seo-maintenance.sh
# Automate: cron weekly (e.g. every Monday 9am UTC)
#   0 9 * * 1 cd /path/to/mos2es-site && bash scripts/seo-maintenance.sh
#
# Requires: GSC_SA_KEY env var pointing to service-account JSON (for GSC ops)
#           See scripts/gsc/README.md for setup.

SITE="https://mos2es.com"
GSC_KEY="${GSC_SA_KEY:-$HOME/.config/mos2es/gsc-sa.json}"
INDEXNOW_KEY="3cb9dad60ebc43248d4ec58b2d9b4aca"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPORT_DIR="$SCRIPT_DIR/../reports"
DATE=$(date -u +%Y-%m-%d)

mkdir -p "$REPORT_DIR"
REPORT="$REPORT_DIR/maintenance-$DATE.md"

echo "# MO§ES SEO Maintenance Run — $DATE" > "$REPORT"
echo "" >> "$REPORT"

# 1. GSC (if key exists)
if [ -f "$GSC_KEY" ]; then
  echo "## GSC" >> "$REPORT"
  export GSC_SA_KEY="$GSC_KEY"
  echo '### AI Overviews (7d)' >> "$REPORT"
  node "$SCRIPT_DIR/gsc/gsc.mjs" ai-overviews 7 >> "$REPORT" 2>&1
  echo "" >> "$REPORT"
  echo '### Top Queries (7d)' >> "$REPORT"
  node "$SCRIPT_DIR/gsc/gsc.mjs" queries 7 >> "$REPORT" 2>&1
  echo "" >> "$REPORT"
  echo '### Sitemap' >> "$REPORT"
  node "$SCRIPT_DIR/gsc/gsc.mjs" sitemaps:list >> "$REPORT" 2>&1
  echo "" >> "$REPORT"
else
  echo "## GSC (skipped — no key at $GSC_KEY)" >> "$REPORT"
  echo "Set up: see scripts/gsc/README.md" >> "$REPORT"
  echo "" >> "$REPORT"
fi

# 2. robots.txt
echo "## robots.txt" >> "$REPORT"
curl -s --max-time 10 "$SITE/robots.txt" >> "$REPORT" 2>&1
echo "" >> "$REPORT"

# 3. llms.txt
echo "## llms.txt" >> "$REPORT"
curl -s --max-time 10 -o /dev/null -w "HTTP %{http_code} size=%{size_download}\n" "$SITE/llms.txt" >> "$REPORT" 2>&1
echo "" >> "$REPORT"

# 4. Sitemap URL count
echo "## Sitemap URLs" >> "$REPORT"
echo "$(curl -s --max-time 10 "$SITE/sitemap.xml" | grep -oE '<loc>[^<]+</loc>' | wc -l) URLs" >> "$REPORT"
echo "" >> "$REPORT"

# 5. Security headers
echo "## Security Headers" >> "$REPORT"
curl -s --max-time 10 -I "$SITE" | grep -i "strict-transport\|x-content-type\|x-frame-options\|referrer-policy\|content-security" >> "$REPORT" 2>&1
echo "" >> "$REPORT"

# 6. Site health
echo "## Site Health" >> "$REPORT"
curl -s --max-time 10 -o /dev/null -w "HTTP %{http_code} time=%{time_total}s\n" "$SITE" >> "$REPORT" 2>&1
echo "" >> "$REPORT"

# 7. Index status (key pages)
echo "## Index Status" >> "$REPORT"
KEY_URLS=(
  "https://mos2es.com/"
  "https://mos2es.com/papers.html"
  "https://mos2es.com/architecture.html"
  "https://mos2es.com/benchmarks.html"
  "https://mos2es.com/governance-vacuum.html"
  "https://mos2es.com/field-sheet.html"
  "https://mos2es.com/press.html"
  "https://mos2es.com/legal.html"
)

if [ -f "$GSC_KEY" ]; then
  for url in "${KEY_URLS[@]}"; do
    result=$(node "$SCRIPT_DIR/gsc/gsc.mjs" inspect "$url" 2>&1)
    verdict=$(echo "$result" | grep -oE "verdict=\w+" | cut -d= -f2)
    coverage=$(echo "$result" | grep -oE "coverage=[^ ]+" | cut -d= -f2-)
    printf "%-50s %s %s\n" "$url" "${verdict:-?}" "${coverage:-?}" >> "$REPORT"
  done
else
  echo "(GSC key not set — skipping index status)" >> "$REPORT"
fi
echo "" >> "$REPORT"

# 8. Push unindexed pages via IndexNow
echo "## IndexNow Push" >> "$REPORT"
bash "$SCRIPT_DIR/indexnow-ping.sh" >> "$REPORT" 2>&1
echo "" >> "$REPORT"

echo "Report saved to $REPORT"
