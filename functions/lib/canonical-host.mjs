// www.mos2es.com serves the same Pages deployment as mos2es.com, so search
// engines saw two copies of every page. Send www to the apex with a 301,
// keeping the path and query. Cloudflare Pages _redirects cannot match on
// host, so this runs in the catch-all function instead.
export const CANONICAL_HOST = "mos2es.com";
const ALIAS_HOSTS = new Set(["www.mos2es.com"]);

// Returns the apex URL to redirect to, or null when the host is already canonical.
export function canonicalRedirect(requestUrl) {
  const url = new URL(requestUrl);
  if (!ALIAS_HOSTS.has(url.hostname.toLowerCase())) return null;
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return url.toString();
}
