export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
  
  const proxyUrl = new URL("https://moses-analytics.sigrank.workers.dev/api/search");
  url.searchParams.forEach((v, k) => proxyUrl.searchParams.set(k, v));
  
  const searchReq = new Request(proxyUrl.toString(), {
    method: request.method,
    headers: { "Content-Type": "application/json", "X-Original-Host": "mos2es.com" },
    body: request.method === "POST" ? await request.text() : undefined,
  });
  
  const searchResp = await fetch(searchReq);
  return new Response(searchResp.body, {
    status: searchResp.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    },
  });
}
