import type { NextConfig } from "next";
import { cities } from "./app/lib/locations";
import { services } from "./app/lib/services";
import { buildServiceCitySlug } from "./app/lib/slug-registry";

const englishToServiceSlug: Record<string, string> = {
  plumbing: "سباكة",
  cleaning: "تنظيف",
  maintenance: "صيانة",
  landscaping: "تنسيق-حدائق",
  contracting: "مقاولات",
  fernature: "نقل-عفش",
  insulation: "عزل",
};

// Phase G4: blog posts migrated from Latin transliteration slugs to Arabic
// exact-match slugs. 301-redirect every old URL to preserve any inbound links
// and indexed pages.
const blogPostSlugMigrations: Array<{
  category: string;
  oldSlug: string;
  newSlug: string;
}> = [
  {
    category: "cleaning",
    oldSlug: "steam-clean-sofa-guide",
    newSlug: "تنظيف-الكنب-بالبخار",
  },
  {
    category: "flooring-installation",
    oldSlug: "parquet-vs-wood-flooring",
    newSlug: "الفرق-بين-الباركيه-والخشب",
  },
  {
    category: "flooring-installation",
    oldSlug: "tile-installation-guide",
    newSlug: "طريقة-تركيب-البلاط",
  },
  {
    category: "الصيانة-المنزلية",
    oldSlug: "ac-maintenance-before-summer",
    newSlug: "صيانة-المكيف-قبل-الصيف",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    const redirects: Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }> = [];

    for (const [englishSlug, serviceSlug] of Object.entries(englishToServiceSlug)) {
      const service = services.find((s) => s.slug === serviceSlug);
      if (!service) continue;

      redirects.push({
        source: `/services/${englishSlug}`,
        destination: `/${service.hubSlug}`,
        permanent: true,
      });

      for (const city of cities) {
        redirects.push({
          source: `/services/${englishSlug}/${city.slug}`,
          destination: `/${buildServiceCitySlug(service, city)}`,
          permanent: true,
        });
      }
    }

    for (const { category, oldSlug, newSlug } of blogPostSlugMigrations) {
      redirects.push({
        source: `/blog/${category}/${oldSlug}`,
        destination: `/blog/${category}/${newSlug}`,
        permanent: true,
      });
    }

    return redirects;
  },
};

export default nextConfig;
