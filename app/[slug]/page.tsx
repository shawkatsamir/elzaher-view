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
import { client } from "@/sanity/client";
import {
  RELATED_POSTS_BY_SERVICE_QUERY,
  RELATED_POSTS_BY_SERVICE_AND_CITY_QUERY,
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
        title: `${d.service.hubTitleAr} في ${d.city.nameAr} | ${d.service.titleAr} ${d.city.nameAr}`,
        description: `أفضل ${d.service.titleAr} في ${d.city.nameAr}. ${d.service.shortDescriptionAr} خدمة 24/7 في ${d.city.nameAr} وضواحيها.`,
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
    case "sub-service-hub": {
      return {
        title: `${d.subService.titleAr} - ${d.service.hubTitleAr}`,
        description: d.subService.shortAr,
        keywords: [
          d.subService.titleAr,
          ...d.subService.techniques.slice(0, 3),
          d.service.titleAr,
        ],
        image: d.subService.heroImage,
        canonicalPath: `/${d.subService.slug}`,
      };
    }
    case "sub-service-city": {
      return {
        title: `${d.subService.titleAr} في ${d.city.nameAr} - ${d.service.hubTitleAr}`,
        description: `${d.subService.shortAr} في ${d.city.nameAr}. خدمة محلية متخصصة وفريق متاح على مدار الساعة.`,
        keywords: [
          `${d.subService.titleAr} ${d.city.nameAr}`,
          `${d.subService.titleAr} في ${d.city.nameAr}`,
          `${d.service.titleAr} ${d.city.nameAr}`,
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
      const relatedPosts = await fetchRelatedPosts(
        descriptor.service.slug,
        descriptor.city.slug,
      );
      return (
        <ServiceCityTemplate
          service={descriptor.service}
          city={descriptor.city}
          relatedPosts={relatedPosts}
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
