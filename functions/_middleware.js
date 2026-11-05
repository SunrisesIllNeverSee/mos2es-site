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
      context.waitUntil(fetch(capture.url, capture.init).catch(() => {}));
    }
  } catch {
    // ignore
  }

  return response;
}
