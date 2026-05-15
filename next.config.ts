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

    return redirects;
  },
};

export default nextConfig;
