import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";
import { business } from "@/app/lib/business";
import { services } from "@/app/lib/services";
import { cities } from "@/app/lib/locations";
import {
  buildServiceCitySlug,
  buildSubServiceCitySlug,
  SITEMAP_PAGE_SLUG,
} from "@/app/lib/slug-registry";

interface SanityPost {
  slug: string;
  category: string | null;
  _updatedAt: string;
}

interface SanityCategory {
  slug: string;
  _updatedAt: string;
}

// Per Google's localized-versions doc:
// https://developers.google.com/search/docs/specialty/international/localized-versions
// Each URL gets a self-referencing `ar-SA` + `x-default` alternate. Next.js
// renders these as <xhtml:link rel="alternate" hreflang="…"> in the sitemap.xml,
// which is the replacement signal for the deprecated GSC International Targeting tool.
function withLocaleAlternates(url: string): { languages: Record<string, string> } {
  return {
    languages: {
      "ar-SA": url,
      "x-default": url,
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = business.baseUrl;
  const now = new Date();

  const home = `${baseUrl}`;
  const blogIndex = `${baseUrl}/blog`;
  const siteMapPage = `${baseUrl}/${SITEMAP_PAGE_SLUG}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: home,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: withLocaleAlternates(home),
    },
    {
      url: blogIndex,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: withLocaleAlternates(blogIndex),
    },
    {
      url: siteMapPage,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: withLocaleAlternates(siteMapPage),
    },
  ];

  const serviceHubRoutes: MetadataRoute.Sitemap = services.map((s) => {
    const url = `${baseUrl}/${s.hubSlug}`;
    return {
      url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: withLocaleAlternates(url),
    };
  });

  const serviceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    cities.map((c) => {
      const url = `${baseUrl}/${buildServiceCitySlug(s, c)}`;
      return {
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
        alternates: withLocaleAlternates(url),
      };
    }),
  );

  const subServiceHubRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    s.subServices.map((sub) => {
      const url = `${baseUrl}/${sub.slug}`;
      return {
        url,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: withLocaleAlternates(url),
      };
    }),
  );

  const subServiceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    s.subServices.flatMap((sub) =>
      cities.map((c) => {
        const url = `${baseUrl}/${buildSubServiceCitySlug(sub, c)}`;
        return {
          url,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates: withLocaleAlternates(url),
        };
      }),
    ),
  );

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const postsQuery = `*[_type == "post"] {
      "slug": slug.current,
      "category": categories[0]->slug.current,
      _updatedAt
    }`;
    const categoriesQuery = `*[_type == "category"] {
      "slug": slug.current,
      _updatedAt
    }`;

    const [posts, categories] = await Promise.all([
      client.fetch<SanityPost[]>(postsQuery),
      client.fetch<SanityCategory[]>(categoriesQuery),
    ]);

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => {
      const url = `${baseUrl}/blog/${c.slug}`;
      return {
        url,
        lastModified: new Date(c._updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: withLocaleAlternates(url),
      };
    });

    const postRoutes: MetadataRoute.Sitemap = posts
      .filter((p) => p.category)
      .map((p) => {
        const url = `${baseUrl}/blog/${p.category}/${p.slug}`;
        return {
          url,
          lastModified: new Date(p._updatedAt),
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: withLocaleAlternates(url),
        };
      });

    blogRoutes = [...categoryRoutes, ...postRoutes];
  } catch {
    // If Sanity is unreachable at build time, ship without blog routes.
    blogRoutes = [];
  }

  return [
    ...staticRoutes,
    ...serviceHubRoutes,
    ...serviceCityRoutes,
    ...subServiceHubRoutes,
    ...subServiceCityRoutes,
    ...blogRoutes,
  ];
}
