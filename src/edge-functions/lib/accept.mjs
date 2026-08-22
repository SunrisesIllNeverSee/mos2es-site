function parseQuality(raw) {
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function parseRange(entry, order) {
  const [rawType, ...rawParams] = entry.split(";");
  const type = rawType.trim().toLowerCase();
  if (!type.includes("/")) return null;

  let q = 1;
  for (const param of rawParams) {
    const [key, rawValue] = param.split("=");
    if (key?.trim().toLowerCase() === "q") q = parseQuality(rawValue?.trim() ?? "");
  }

  const [major, minor] = type.split("/");
  const specificity = major === "*" ? 0 : minor === "*" ? 1 : 2;
  return { type, major, minor, q, specificity, order };
}

export function parseAccept(header) {
  if (!header || !header.trim()) return [];
  return header
    .split(",")
    .map((entry, order) => parseRange(entry, order))
    .filter(Boolean);
}

function matches(range, target) {
  const [major, minor] = target.split("/");
  return (range.major === "*" || range.major === major) &&
    (range.minor === "*" || range.minor === minor);
}

export function qualityFor(target, ranges) {
  const candidates = ranges.filter((range) => matches(range, target));
  if (!candidates.length) return 0;

  candidates.sort((a, b) => {
    if (b.specificity !== a.specificity) return b.specificity - a.specificity;
    return a.order - b.order;
  });
  return candidates[0].q;
}

export function negotiateRepresentation(header) {
  if (!header || !header.trim()) return "html";

  const ranges = parseAccept(header);
  const markdownQ = qualityFor("text/markdown", ranges);
  const htmlQ = qualityFor("text/html", ranges);

  if (markdownQ <= 0 && htmlQ <= 0) return "not-acceptable";
  if (markdownQ > htmlQ) return "markdown";
  return "html";
}

export function mergeVary(existing = "") {
  const values = existing
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const lower = new Set(values.map((value) => value.toLowerCase()));
  if (!lower.has("accept")) values.push("Accept");
  if (!lower.has("accept-encoding")) values.push("Accept-Encoding");
  return values.join(", ");
}
