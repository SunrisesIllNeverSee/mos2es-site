// .eleventy.js — MO§ES site
// Input:  root directory (existing HTML files stay in place)
// Output: _site/ (deploy target)
const path = require("path");

const organizationIdentity = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://mos2es.com/#org",
  name: "Ello Cello LLC",
  legalName: "Ello Cello LLC",
  url: "https://mos2es.com",
  email: "burnmydays@proton.me",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "84 W Utica St",
    addressLocality: "Buffalo",
    addressRegion: "NY",
    postalCode: "14209",
    addressCountry: "US",
  },
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

  // Add one canonical organization identity node to every HTML page. Existing
  // page-specific JSON-LD can reference the same #org/#brand identifiers.
  eleventyConfig.addTransform("organization-identity", function (content) {
    if (!this.page?.outputPath?.endsWith(".html") || !content.includes("</head>")) {
      return content;
    }

    const jsonLd = `  <script type="application/ld+json">\n${JSON.stringify(organizationIdentity, null, 2)}\n  </script>\n`;
    return content.replace("</head>", `${jsonLd}</head>`);
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
