// .eleventy.js — MO§ES site
// Input:  root directory (existing HTML files stay in place)
// Output: _site/ (deploy target)
const path = require("path");

module.exports = function (eleventyConfig) {
  // ── Passthrough copies (static assets, config files) ──
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("docs");
  eleventyConfig.addPassthroughCopy("BingSiteAuth.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");
  eleventyConfig.addPassthroughCopy("llms-full.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("3cb9dad60ebc43248d4ec58b2d9b4aca.txt");
  eleventyConfig.addPassthroughCopy("CNAME");

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
