// Runs before every Pages Function route, including functions/api/*.
import { canonicalRedirectResponse } from "./lib/canonical-host.mjs";

export async function onRequest(context) {
  return canonicalRedirectResponse(context.request) ?? context.next();
}
