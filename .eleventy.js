module.exports = function (eleventyConfig) {
  // fichiers statiques copiés tels quels
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("admin");

  // filtre de date simple, en français, sans dépendance externe
  eleventyConfig.addFilter("dateFr", (value) => {
    if (!value) return "";
    const d = new Date(value);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  });

  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("relatedItems", (allItems, currentUrl) => {
    return allItems
      .filter((item) => item.url !== currentUrl && item.data.section)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
