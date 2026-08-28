// .eleventy.js — MO§ES site
// Input:  root directory (existing HTML files stay in place)
// Output: _site/ (deploy target)
const path = require("path");

const publisherAddress = {
  "@type": "PostalAddress",
  streetAddress: "84 W Utica St",
  addressLocality: "Buffalo",
  addressRegion: "NY",
  postalCode: "14209",
  addressCountry: "US",
};

// Canon-backed Organization identity (Search Authority v1.0.0, frozen tag
// master-canon-v1.0.0). This is the single source of the #org node injected
// into every HTML page via the organization-identity transform below.
// Page-specific JSON-LD blocks reference the same #org/#brand identifiers.
// Do not duplicate this block in individual pages or partials.
const organizationIdentity = {
  "@context": {
    "@vocab": "https://schema.org/",
    "moses": "https://mos2es.com/ontology/0.1/",
    "sourceSystem": "moses:sourceSystem",
    "canonBacked": "moses:canonBacked",
    "authorityApprovalRef": "moses:authorityApprovalRef",
    "associatedWith": "moses:associatedWith",
  },
  "@type": "Organization",
  "@id": "https://mos2es.com/#org",
  name: "Ello Cello LLC",
  alternateName: ["Ello Cello", "MO§ES", "MOSES"],
  description: "Organization associated with the owner's published works and products, including Upsilon, SigRank, and MO§ES™.",
  url: "https://mos2es.com",
  email: "burnmydays@proton.me",
  sourceSystem: "search-authority",
  canonBacked: true,
  authorityApprovalRef: "APPROVAL-2026-08-14-001 (ID-ELLO-001)",
  sameAs: [
    "https://orcid.org/0009-0002-9904-5390",
    "https://github.com/SunrisesIllNeverSee",
    "https://github.com/SunrisesIllNeverSee/MOS2ES",
    "https://github.com/SunrisesIllNeverSee/moses-governance",
    "https://github.com/SunrisesIllNeverSee/moses-claw-gov",
    "https://doi.org/10.5281/zenodo.20029607",
    "https://signalaf.com",
    "https://signomy.xyz",
  ],
  founder: {
    "@type": "Person",
    name: "Deric J. McHenry",
    sameAs: "https://orcid.org/0009-0002-9904-5390",
    affiliation: {
      "@type": "Organization",
      name: "Ello Cello LLC",
    },
  },
  associatedWith: "https://mos2es.com/ontology/0.1/entity/moses",
  knowsAbout: [
    "AI governance",
    "Constitutional AI",
    "Commitment Theory",
    "Conservation Law of Commitment",
    "Semantic preservation",
    "Commitment conservation",
    "Governance enforcement",
    "Audit trails",
    "Lineage-bound artifacts",
  ],
  brand: {
    "@type": "Brand",
    "@id": "https://mos2es.com/#brand",
    name: "MO§ES™",
    alternateName: ["MO§ES", "MOS2ES", "MOSES"],
    url: "https://mos2es.com",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general inquiries",
      email: "burnmydays@proton.me",
      url: "https://mos2es.com/contact",
      availableLanguage: ["English"],
    },
  ],
  address: publisherAddress,
};

module.exports = function (eleventyConfig) {
  // ── Passthrough copies (static assets, config files) ──
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("deck-stage.js");
  eleventyConfig.addPassthroughCopy("BingSiteAuth.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("llms-full.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("3cb9dad60ebc43248d4ec58b2d9b4aca.txt");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy(".well-known");

  // ── MOSES ontology outputs (synced from moses-integration) ──
  eleventyConfig.addPassthroughCopy("ontology");

  // Inject one canon-backed Organization identity node into every HTML page.
  // This is the single source of the #org node — page-specific JSON-LD and
  // partials must NOT emit a second Organization block with the same @id.
  eleventyConfig.addTransform("organization-identity", function (content) {
    if (!this.page?.outputPath?.endsWith(".html") || !content.includes("</head>")) {
      return content;
    }

    const jsonLd = `  <script type="application/ld+json">\n${JSON.stringify(organizationIdentity, null, 2)}\n  </script>\n`;
    return content.replace("</head>", `${jsonLd}</head>`);
  });

  // Inject Cloudflare Web Analytics beacon into every HTML page (if not
  // already present). Uses the auto-token mode tied to the account ID.
  const CF_ANALYTICS_BEACON = `  <!-- Cloudflare Web Analytics -->\n  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "auto", "api": {"accountID": "8251078af351cd5b19cb73a3435e446f"}}'></script>\n`;
  eleventyConfig.addTransform("cloudflare-analytics", function (content) {
    if (!this.page?.outputPath?.endsWith(".html") || !content.includes("</head>")) {
      return content;
    }
    if (content.includes("cloudflareinsights")) return content; // already present
    return content.replace("</head>", `${CF_ANALYTICS_BEACON}</head>`);
  });

  // ── Default permalink: keep .html extension for backward compat ──
  // Existing pages use href="papers.html" — this preserves that structure.
  // New content pages can override with their own permalink in front matter.
  eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
    return (data) => {
      // Respect explicit permalink from front matter
      if (data.permalink) return data.permalink;
      // Default: keep .html extension (e.g. /papers.html not /papers/index.html)
      return data.page.filePathStem + ".html";
    };
  });

  // ── Shortcodes ──
  // {{ year }} → current year
  eleventyConfig.addShortcode("year", () => new Date().getFullYear().toString());

  // ── Filters ──
  // | slugify → lowercase-hyphenated
  eleventyConfig.addFilter("slugify", (str) =>
    String(str)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk"],
  };
};
