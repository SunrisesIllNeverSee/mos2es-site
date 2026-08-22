#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://mos2es.com}"
BASE_URL="${BASE_URL%/}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

fail() {
  echo "agent-readiness-live: FAIL: $*" >&2
  exit 1
}

wait_for_site() {
  local code
  for _ in $(seq 1 30); do
    code="$(curl -sS -o /dev/null -w '%{http_code}' --connect-timeout 5 --max-time 15 "$BASE_URL/" 2>/dev/null || true)"
    if [[ "$code" == "200" ]]; then
      return 0
    fi
    sleep 2
  done
  fail "site did not become reachable at $BASE_URL"
}

request() {
  local name="$1"
  local path="$2"
  local accept="${3:-}"
  local headers="$TMP_DIR/$name.headers"
  local body="$TMP_DIR/$name.body"
  local -a args=(-sS -D "$headers" -o "$body" -w '%{http_code}' --connect-timeout 10 --max-time 30)

  if [[ -n "$accept" ]]; then
    args+=(-H "Accept: $accept")
  fi

  curl "${args[@]}" "$BASE_URL$path"
}

header_value() {
  local file="$1"
  local header="$2"
  awk -v wanted="${header,,}" '
    BEGIN { IGNORECASE=1 }
    {
      key=$1
      sub(/:$/, "", key)
      if (tolower(key) == wanted) {
        sub(/^[^:]+:[[:space:]]*/, "")
        gsub(/\r$/, "")
        print
      }
    }
  ' "$file" | paste -sd ',' -
}

assert_status() {
  local actual="$1"
  local expected="$2"
  local label="$3"
  [[ "$actual" == "$expected" ]] || fail "$label returned HTTP $actual, expected $expected"
}

assert_header_contains() {
  local file="$1"
  local header="$2"
  local needle="$3"
  local value
  value="$(header_value "$file" "$header" | tr '[:upper:]' '[:lower:]')"
  [[ "$value" == *"${needle,,}"* ]] || fail "$header for $file was '$value', missing '$needle'"
}

assert_vary_token() {
  local file="$1"
  local token="$2"
  local value
  value="$(header_value "$file" "Vary" | tr '[:upper:]' '[:lower:]' | tr ',' '\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
  grep -Fxq "${token,,}" <<<"$value" || fail "Vary for $file missing token '$token'"
}

assert_contains() {
  local file="$1"
  local needle="$2"
  grep -Fq "$needle" "$file" || fail "$file missing expected text: $needle"
}

assert_public_path() {
  local path="$1"
  local code
  code="$(curl -sS -o /dev/null -w '%{http_code}' -H 'Accept: text/html' --connect-timeout 10 --max-time 30 "$BASE_URL$path")"
  [[ "$code" == "200" ]] || fail "public endpoint $path returned HTTP $code"
}

wait_for_site

echo "agent-readiness-live: checking $BASE_URL"

# Browser/default HTML representation.
code="$(request html-root / 'text/html')"
assert_status "$code" 200 "homepage HTML"
assert_header_contains "$TMP_DIR/html-root.headers" "Content-Type" "text/html"
assert_vary_token "$TMP_DIR/html-root.headers" "accept"
assert_vary_token "$TMP_DIR/html-root.headers" "accept-encoding"
assert_contains "$TMP_DIR/html-root.body" '"contactPoint"'
assert_contains "$TMP_DIR/html-root.body" '"PostalAddress"'
assert_contains "$TMP_DIR/html-root.body" '"MOS2ES"'

# Canonical URL negotiates Markdown and honors quality values.
code="$(request markdown /architecture 'text/markdown, text/html;q=0.5')"
assert_status "$code" 200 "architecture Markdown"
assert_header_contains "$TMP_DIR/markdown.headers" "Content-Type" "text/markdown; charset=utf-8"
assert_vary_token "$TMP_DIR/markdown.headers" "accept"
assert_vary_token "$TMP_DIR/markdown.headers" "accept-encoding"
assert_contains "$TMP_DIR/markdown.body" 'Sovereign Architecture'
if grep -Fqi '<html' "$TMP_DIR/markdown.body"; then
  fail "Markdown representation still contains an HTML document shell"
fi

# HTML remains preferred when its q-value wins.
code="$(request html-preferred /architecture 'text/html, text/markdown;q=0.5')"
assert_status "$code" 200 "architecture HTML preference"
assert_header_contains "$TMP_DIR/html-preferred.headers" "Content-Type" "text/html"

# An explicitly unsupported representation is rejected.
code="$(request not-acceptable /architecture 'application/json')"
assert_status "$code" 406 "unsupported representation"
assert_vary_token "$TMP_DIR/not-acceptable.headers" "accept"
assert_vary_token "$TMP_DIR/not-acceptable.headers" "accept-encoding"

# Unknown paths remain real 404s and provide recovery in both representations.
MISSING='/some-path-that-does-not-exist-ora-check'
code="$(request missing-html "$MISSING" 'text/html')"
assert_status "$code" 404 "HTML missing path"
assert_contains "$TMP_DIR/missing-html.body" '/llms.txt'
assert_contains "$TMP_DIR/missing-html.body" '/sitemap.xml'

code="$(request missing-md "$MISSING" 'text/markdown')"
assert_status "$code" 404 "Markdown missing path"
assert_header_contains "$TMP_DIR/missing-md.headers" "Content-Type" "text/markdown; charset=utf-8"
assert_vary_token "$TMP_DIR/missing-md.headers" "accept"
assert_vary_token "$TMP_DIR/missing-md.headers" "accept-encoding"
assert_contains "$TMP_DIR/missing-md.body" '/llms.txt'
assert_contains "$TMP_DIR/missing-md.body" '/sitemap.xml'

# Trust anchors are public and substantive.
for page in about contact privacy; do
  code="$(request "trust-$page" "/$page" 'text/html')"
  assert_status "$code" 200 "/$page"
  bytes="$(wc -c < "$TMP_DIR/trust-$page.body")"
  (( bytes >= 500 )) || fail "/$page returned only $bytes bytes"
done
assert_contains "$TMP_DIR/trust-about.body" 'MOS2ES'
assert_contains "$TMP_DIR/trust-contact.body" 'Ello Cello LLC'
assert_contains "$TMP_DIR/trust-privacy.body" 'Google Analytics 4'

# Machine-readable/public agent files.
code="$(request llms /llms.txt)"
assert_status "$code" 200 "/llms.txt"
assert_contains "$TMP_DIR/llms.body" '## When to use MO§ES'
assert_contains "$TMP_DIR/llms.body" '## How agents should use this site'
assert_contains "$TMP_DIR/llms.body" 'Accept: text/markdown'

code="$(request llms-full /llms-full.txt)"
assert_status "$code" 200 "/llms-full.txt"

code="$(request sitemap /sitemap.xml)"
assert_status "$code" 200 "/sitemap.xml"
assert_contains "$TMP_DIR/sitemap.body" 'https://mos2es.com/about'
assert_contains "$TMP_DIR/sitemap.body" 'https://mos2es.com/contact'
assert_contains "$TMP_DIR/sitemap.body" 'https://mos2es.com/privacy'

code="$(request robots /robots.txt)"
assert_status "$code" 200 "/robots.txt"

code="$(request bing-auth /BingSiteAuth.xml)"
assert_status "$code" 200 "/BingSiteAuth.xml"

code="$(request verification-token /3cb9dad60ebc43248d4ec58b2d9b4aca.txt)"
assert_status "$code" 200 "/3cb9dad60ebc43248d4ec58b2d9b4aca.txt"

# Verify every canonical URL advertised in sitemap.xml against the deployment
# under test, replacing the production origin with the current BASE_URL.
canonical_count=0
while IFS= read -r canonical_url; do
  path="${canonical_url#https://mos2es.com}"
  [[ -n "$path" ]] || path="/"
  assert_public_path "$path"
  canonical_count=$((canonical_count + 1))
done < <(sed -n 's:.*<loc>\(https://mos2es\.com[^<]*\)</loc>.*:\1:p' "$TMP_DIR/sitemap.body")
(( canonical_count > 0 )) || fail "sitemap.xml contained no canonical URLs"
echo "agent-readiness-live: verified $canonical_count sitemap endpoints"

# Verify every clean public route declared in Netlify's redirects table.
redirect_count=0
while read -r source _target status _rest; do
  [[ "$source" == /* ]] || continue
  [[ "$source" != *"*"* ]] || continue
  [[ "$status" == "200" ]] || continue
  assert_public_path "$source"
  redirect_count=$((redirect_count + 1))
done < <(grep -v '^[[:space:]]*#' _redirects | grep -v '^[[:space:]]*$')
(( redirect_count > 0 )) || fail "_redirects contained no clean public routes"
echo "agent-readiness-live: verified $redirect_count declared clean routes"

echo "agent-readiness-live: PASS"
