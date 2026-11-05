// Runs before every Pages Function route, including functions/api/*.
import { canonicalRedirectResponse } from "./lib/canonical-host.mjs";
import { crawlerCapture } from "./lib/ai-crawler.mjs";

export async function onRequest(context) {
  const redirect = canonicalRedirectResponse(context.request);
  if (redirect) return redirect;

  const response = await context.next();

  // Record AI and search crawler visits after the response is sent. Analytics
  // must never delay or break the page, so every failure is swallowed.
  try {
    const capture = crawlerCapture(context.request, response.status, context.env);
    if (capture && typeof context.waitUntil === "function") {
      // Drain the PostHog response so the subrequest doesn't stall.
      const sent = fetch(capture.url, capture.init)
        .then((res) => res.body?.cancel())
        .catch(() => {});
      context.waitUntil(sent);
    }
  } catch {
    // ignore
  }

  return response;
}
