#!/usr/bin/env bash
# IndexNow ping script for mos2es.com
# Notifies Bing, DuckDuckGo, Yandex, and Seznam about page updates.
#
# Usage:
#   ./scripts/indexnow-ping.sh            # ping all sitemap URLs
#   ./scripts/indexnow-ping.sh /papers    # ping a single URL

set -euo pipefail

HOST="mos2es.com"
KEY="3cb9dad60ebc43248d4ec58b2d9b4aca"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="sitemap.xml"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ENGINES=(
  "https://api.indexnow.org/indexnow"
  "https://www.bing.com/indexnow"
  "https://yandex.com/indexnow"
)

if [ "${1:-}" != "" ]; then
  URLS=("https://${HOST}${1}")
else
  if [ ! -f "$REPO_ROOT/$SITEMAP" ]; then
    echo "ERROR: $REPO_ROOT/$SITEMAP not found" >&2
    exit 1
  fi
  mapfile -t URLS < <(sed -n 's/.*<loc>\(.*\)<\/loc>.*/\1/p' "$REPO_ROOT/$SITEMAP")
fi

echo "Pinging ${#URLS[@]} URL(s) to ${#ENGINES[@]} engines..."

PAYLOAD=$(jq -n \
  --arg host "$HOST" \
  --arg key "$KEY" \
  --arg keyLocation "$KEY_LOCATION" \
  --argjson urlList "$(printf '%s\n' "${URLS[@]}" | jq -R . | jq -s .)" \
  '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

for ENGINE in "${ENGINES[@]}"; do
  echo ""
  echo "→ $ENGINE"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "$ENGINE" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD")
  echo "  Status: $HTTP_CODE"
done

echo ""
echo "Done."
