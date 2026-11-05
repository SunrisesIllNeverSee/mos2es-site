// www.mos2es.com serves the same Pages deployment as mos2es.com, so search
// engines saw two copies of every page. Send www to the apex, keeping the
// path and query. Cloudflare Pages _redirects cannot match on host, so this
// runs in functions/_middleware.js, ahead of every route.
export const CANONICAL_HOST = "mos2es.com";
const ALIAS_HOSTS = new Set(["www.mos2es.com"]);

// Returns the apex URL to redirect to, or null when the host is already canonical.
export function canonicalRedirect(requestUrl) {
  const url = new URL(requestUrl);
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!ALIAS_HOSTS.has(host)) return null;
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return url.toString();
}

// 301 for GET/HEAD (what search engines consolidate on); 308 for anything
// else so a POST keeps its method and body.
export function canonicalRedirectResponse(request) {
  const location = canonicalRedirect(request.url);
  if (!location) return null;
  const status = request.method === "GET" || request.method === "HEAD" ? 301 : 308;
  return new Response(null, { status, headers: { Location: location } });
}
