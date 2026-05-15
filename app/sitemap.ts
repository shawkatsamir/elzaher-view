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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = business.baseUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/${SITEMAP_PAGE_SLUG}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const serviceHubRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/${s.hubSlug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const serviceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    cities.map((c) => ({
      url: `${baseUrl}/${buildServiceCitySlug(s, c)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    })),
  );

  const subServiceHubRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    s.subServices.map((sub) => ({
      url: `${baseUrl}/${sub.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  );

  const subServiceCityRoutes: MetadataRoute.Sitemap = services.flatMap((s) =>
    s.subServices.flatMap((sub) =>
      cities.map((c) => ({
        url: `${baseUrl}/${buildSubServiceCitySlug(sub, c)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      })),
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

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${baseUrl}/blog/${c.slug}`,
      lastModified: new Date(c._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts
      .filter((p) => p.category)
      .map((p) => ({
        url: `${baseUrl}/blog/${p.category}/${p.slug}`,
        lastModified: new Date(p._updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

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
