import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPageDescriptor,
  getAllSlugs,
  type PageDescriptor,
} from "@/app/lib/slug-registry";
import { absoluteUrl, business } from "@/app/lib/business";
import ServiceHubTemplate from "@/app/_templates/ServiceHubTemplate";
import ServiceCityTemplate from "@/app/_templates/ServiceCityTemplate";
import SubServiceHubTemplate from "@/app/_templates/SubServiceHubTemplate";
import SubServiceCityTemplate from "@/app/_templates/SubServiceCityTemplate";
import SitemapPageTemplate from "@/app/_templates/SitemapPageTemplate";
import type { RelatedPost } from "@/app/_templates/RelatedPostsSection";
import type { RelatedProject } from "@/app/_templates/RelatedProjectsSection";
import { client } from "@/sanity/client";
import {
  RELATED_POSTS_BY_SERVICE_QUERY,
  RELATED_POSTS_BY_SERVICE_AND_CITY_QUERY,
  RELATED_PROJECTS_BY_SERVICE_QUERY,
  RELATED_PROJECTS_BY_SERVICE_AND_CITY_QUERY,
} from "@/sanity/lib/queries";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function descriptorMeta(d: PageDescriptor): {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  canonicalPath: string;
} {
  switch (d.kind) {
    case "service-hub": {
      return {
        title: d.service.hubTitleAr,
        description: d.service.shortDescriptionAr,
        keywords: [
          d.service.hubTitleAr,
          d.service.titleAr,
          ...d.service.subServices.map((s) => s.titleAr),
          business.nameAr,
        ],
        image: d.service.galleryImages[0]?.src ?? business.defaultLogoPath,
        canonicalPath: `/${d.service.hubSlug}`,
      };
    }
    case "service-city": {
      return {
        // The old title repeated service+city twice and truncated in the SERP.
        // Second half is now a differentiator, which is what earns the click.
        title: `${d.service.hubTitleAr} في ${d.city.nameAr} | معاينة مجانية وضمان`,
        description: `${d.service.shortDescriptionAr} نغطي جميع أحياء ${d.city.nameAr} وضواحيها، ${d.service.availability.badgeAr} مع معاينة مجانية وضمان على التنفيذ.`,
        keywords: [
          `${d.service.titleAr} ${d.city.nameAr}`,
          `${d.service.hubTitleAr} ${d.city.nameAr}`,
          `شركة ${d.service.titleAr} في ${d.city.nameAr}`,
          ...d.service.subServices.map((s) => `${s.titleAr} ${d.city.nameAr}`),
          ...d.city.keywords,
        ],
        image: d.service.galleryImages[0]?.src ?? business.defaultLogoPath,
        canonicalPath: `/${d.slug}`,
      };
    }
    // Sub-service titles deliberately omit the parent's hubTitleAr. Appending it put
    // the parent's head term ("معلم تركيب سيراميك") in the title of every sub-service
    // page, so four URLs competed for one query. Each sub-service now owns its own
    // head term and links up to the service×city page instead.
    case "sub-service-hub": {
      const head = d.subService.titleShortAr ?? d.subService.titleAr;
      return {
        title: `${head} | أسعار ومواصفات التنفيذ`,
        description: d.subService.shortAr,
        keywords: [
          head,
          d.subService.titleAr,
          ...d.subService.techniques.slice(0, 3),
          d.service.titleAr,
        ],
        image: d.subService.heroImage,
        canonicalPath: `/${d.subService.slug}`,
      };
    }
    case "sub-service-city": {
      const head = d.subService.titleShortAr ?? d.subService.titleAr;
      return {
        title: `${head} في ${d.city.nameAr} | أسعار ومدة التنفيذ`,
        description: `${d.subService.shortAr} في ${d.city.nameAr}. أسعار المتر، مدة التنفيذ، والمواد المستخدمة.`,
        keywords: [
          `${head} ${d.city.nameAr}`,
          `${head} في ${d.city.nameAr}`,
          `${d.subService.titleAr} ${d.city.nameAr}`,
          ...d.city.keywords,
        ],
        image: d.subService.heroImage,
        canonicalPath: `/${d.slug}`,
      };
    }
    case "site-map": {
      return {
        title: `خريطة الموقع`,
        description: `جميع صفحات موقع ${business.nameAr} — خدمات وتخصصات في كل مدن المملكة.`,
        keywords: ["خريطة الموقع", business.nameAr, "جميع الخدمات"],
        image: business.defaultLogoPath,
        canonicalPath: `/${d.slug}`,
      };
    }
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const descriptor = getPageDescriptor(slug);
  if (!descriptor) return {};

  const m = descriptorMeta(descriptor);
  const canonical = absoluteUrl(m.canonicalPath);

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical,
      languages: {
        "ar-SA": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      type: "website",
      locale: "ar_SA",
      images: m.image
        ? [{ url: m.image.startsWith("http") ? m.image : absoluteUrl(m.image) }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

async function fetchRelatedPosts(
  serviceSlug: string,
  citySlug?: string,
): Promise<RelatedPost[]> {
  try {
    if (citySlug) {
      const cityScoped = await client.fetch<RelatedPost[]>(
        RELATED_POSTS_BY_SERVICE_AND_CITY_QUERY,
        { serviceSlug, citySlug },
      );
      if (cityScoped && cityScoped.length > 0) return cityScoped;
    }
    return await client.fetch<RelatedPost[]>(RELATED_POSTS_BY_SERVICE_QUERY, {
      serviceSlug,
    });
  } catch {
    return [];
  }
}

// Same city-first, service-wide fallback as fetchRelatedPosts: a case study from the
// searcher's own city is the strongest proof, but any case study for the service beats
// an empty section.
async function fetchRelatedProjects(
  serviceSlug: string,
  citySlug: string,
): Promise<RelatedProject[]> {
  try {
    const cityScoped = await client.fetch<RelatedProject[]>(
      RELATED_PROJECTS_BY_SERVICE_AND_CITY_QUERY,
      { serviceSlug, citySlug },
    );
    if (cityScoped && cityScoped.length > 0) return cityScoped;
    return await client.fetch<RelatedProject[]>(
      RELATED_PROJECTS_BY_SERVICE_QUERY,
      { serviceSlug },
    );
  } catch {
    return [];
  }
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const descriptor = getPageDescriptor(slug);
  if (!descriptor) notFound();

  switch (descriptor.kind) {
    case "service-hub": {
      const relatedPosts = await fetchRelatedPosts(descriptor.service.slug);
      return (
        <ServiceHubTemplate
          service={descriptor.service}
          relatedPosts={relatedPosts}
        />
      );
    }
    case "service-city": {
      const [relatedPosts, relatedProjects] = await Promise.all([
        fetchRelatedPosts(descriptor.service.slug, descriptor.city.slug),
        fetchRelatedProjects(descriptor.service.slug, descriptor.city.slug),
      ]);
      return (
        <ServiceCityTemplate
          service={descriptor.service}
          city={descriptor.city}
          relatedPosts={relatedPosts}
          relatedProjects={relatedProjects}
        />
      );
    }
    case "sub-service-hub": {
      const relatedPosts = await fetchRelatedPosts(descriptor.service.slug);
      return (
        <SubServiceHubTemplate
          service={descriptor.service}
          subService={descriptor.subService}
          relatedPosts={relatedPosts}
        />
      );
    }
    case "sub-service-city": {
      const relatedPosts = await fetchRelatedPosts(
        descriptor.service.slug,
        descriptor.city.slug,
      );
      return (
        <SubServiceCityTemplate
          service={descriptor.service}
          subService={descriptor.subService}
          city={descriptor.city}
          relatedPosts={relatedPosts}
        />
      );
    }
    case "site-map":
      return <SitemapPageTemplate />;
  }
}
