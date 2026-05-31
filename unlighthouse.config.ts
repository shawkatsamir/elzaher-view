import { defineConfig } from "unlighthouse";

// Large-site config — https://unlighthouse.dev/guide/recipes/large-sites
// The site has 287+ SSG long-tail pages but only a handful of route templates
// (/[slug], /[slug]/, /blog/[category], /blog/[category]/[slug] + statics).
// We feed Unlighthouse the existing sitemap.xml and let dynamicSampling test a
// sample per template instead of all 287 routes on every run.
export default defineConfig({
  site: process.env.UNLIGHTHOUSE_SITE || "https://alzaherview.com",
  scanner: {
    // Discover URLs from sitemap.xml rather than crawling link-by-link.
    sitemap: true,
    crawler: true,
    // Test N routes per detected template. Raise for more coverage per template.
    dynamicSampling: 8,
    // Hard ceiling across all templates — keep above total page count so the
    // sitemap is never truncated when we disable sampling for a full audit.
    maxRoutes: 500,
    // One Lighthouse pass per URL is enough for trend tracking.
    samples: 1,
    // The pages are static HTML; skip throttling for faster runs (turn back on
    // for a realistic mobile-network score).
    throttle: false,
    exclude: [
      "/studio.*", // Sanity Studio is not a public SEO page
    ],
  },
});
