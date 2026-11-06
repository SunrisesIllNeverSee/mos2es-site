# MO§ES™ site

Source for [mos2es.com](https://mos2es.com), the home page for Ello Cello LLC's work: SignalAF, SigRank, Signomy, AQUA and Commitment Theory.

Since 2026-11-04 the site is a short landing, not a product site. The old site is frozen at tag `archive/mos2es-site-2026-11-04` and at https://d3b4511e.mos2es.pages.dev.

## Pages

| Address | What it is |
|---|---|
| `/` | Lead slide and menu. Opens with the 3D wordmark intro, once per session. Doesn't scroll. |
| `/products` | Preview cards for each product, the Enterprise Intelligence Pilot and services. |
| `/research` | Papers with DOIs and five core concepts. |
| `/explore` | Assembly video, demos and walkthroughs, SigRank promo videos, the four 3D models, the commitment kernel demo and the deck. |
| `/contact` | Name, email, mailing address and links. |
| `/about` | The idea, numbers, what's shipped, timeline, founder and the record. |
| `/faq`, `/privacy`, `/deck` | Kept from the old site. |
| `/3d/` | The 3D models (Global, Lab, World, Assembly Sequence). Prebuilt, copied as is. |
| `/concepts/*`, `/guides/how-to-verify-lineage` | Five concept pages and one guide, kept from the old site. |

Retired pages are listed in `.eleventyignore`. Their sources stay in the repo, and `_redirects` sends each old address to its closest live page with a 301.

## Build and run

```bash
npm install
npm run dev      # local server with live reload
npm run build    # writes _site/
npm test         # agent-readiness and redirect tests
```

GitHub Actions (`.github/workflows/ci.yml`) runs the tests and the build on every pull request and push to `main`, and checks the live site after each push to `main`.

The site is built with Eleventy 3 (`.eleventy.js`). The new pages use `_includes/layouts/simple.html` and `assets/landing.css`. The kept concept, guide and FAQ pages use the older layouts in `_includes/`.

## Deploy

mos2es.com is served by the Cloudflare Pages project `mos2es`. Merging to `main` does **not** deploy. Deploy by hand from a clean checkout of `main`:

```bash
npm run build
npx wrangler pages deploy _site --project-name mos2es --branch main
```

Then check the live pages and a few redirects. `functions/` holds the Pages Function that serves Markdown to clients that send `Accept: text/markdown`. `netlify.toml` and `src/edge-functions/` are from the old Netlify setup and are no longer used.

## Rules worth knowing

- `_redirects` may hold 301s only. Never add `/x /x.html 200` rewrites: they caused redirect loops with Cloudflare's pretty URLs. `tests/agent-readiness.test.mjs` enforces this.
- Spell the brand MO§ES™ (MO§ES in running text). Never MO§E§.
- `llms.txt` and `llms-full.txt` describe the site for AI agents. Keep them in step with the pages.
- `sitemap.xml` is written by hand. Update it when pages are added or retired.
- Videos live in `media/` (promos in `media/promo/`). Encode them as H.264 MP4 with faststart and keep each file under Cloudflare's 25 MB limit.

© 2026 Ello Cello LLC, Buffalo, NY.
