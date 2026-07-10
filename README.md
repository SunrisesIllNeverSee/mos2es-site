# MO§ES™ Site

Static landing page for `mos2es.com`.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9134f21-e3a3-4384-8b5b-bea769c8a7b9/deploy-status)](https://app.netlify.com/projects/mos2es/deploys)

## Netlify

- Branch: `main`
- Build command: `npm run build`
- Publish directory: `_site`

## Local Development

```bash
npm install        # install 11ty
npm run dev        # local server at http://localhost:8080
npm run build      # build to _site/
```

## Architecture

- **11ty** static site generator (v3.1)
- Existing pages (index, papers, legal, etc.) are hand-written HTML, copied as-is
- New content pages (concepts, guides, vs, alternatives, blog, FAQ) use shared layouts in `_includes/`
- Shared CSS in `_includes/css/base.css`
- Shared nav/footer in `_includes/partials/`
