---
type: Reference
title: img/ root + assets/ — image inventory
description: Reference doc for the img/ root directory and assets/ directory. founder.jpg is active in deck.html; moses-mark.png is unreferenced.
tags: [mos2es, reference, assets, images]
timestamp: 2026-07-10
last_touched: 2026-07-10 08:03 UTC
---

# img/ root + assets/ — Image Inventory

## img/ (root)

**Status:** Empty at root level — contains only the `benchmarks/` subdirectory.

No root-level images. All benchmark imagery lives under `img/benchmarks/` (see
[benchmarks.md](benchmarks.md)).

---

## assets/

| File | Purpose | Referenced by | Status |
|------|---------|---------------|--------|
| `founder.jpg` | Founder photo (Deric J. McHenry) | `deck.html` line 851 | **ACTIVE** |
| `moses-mark.png` | MO§ES logo/mark | (none) | **UNREFERENCED** — unused asset |

## Notes

- `founder.jpg` is the sole consumer of the `assets/` directory — used on the founder slide
  of the pitch deck (`deck.html`).
- `moses-mark.png` is not referenced by any HTML page. Consider either:
  - Using it in the site header/nav/footer if a logo mark is desired
  - Leaving it as a dormant asset (no harm)
  - Archiving to `_archive/` if confirmed unused (per the "archive, don't delete" rule)
