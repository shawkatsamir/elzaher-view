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
        title: `${d.service.hubTitleAr} | ${business.nameAr}`,
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
        title: `${d.service.titleAr} ${d.city.nameAr} | ${d.service.hubTitleAr} في ${d.city.nameAr}`,
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
        title: `${d.subService.titleAr} | ${d.service.hubTitleAr}`,
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
        title: `${d.subService.titleAr} ${d.city.nameAr} | ${d.service.hubTitleAr}`,
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

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const descriptor = getPageDescriptor(slug);
  if (!descriptor) notFound();

  switch (descriptor.kind) {
    case "service-hub":
      return <ServiceHubTemplate service={descriptor.service} />;
    case "service-city":
      return (
        <ServiceCityTemplate
          service={descriptor.service}
          city={descriptor.city}
        />
      );
    case "sub-service-hub":
      return (
        <SubServiceHubTemplate
          service={descriptor.service}
          subService={descriptor.subService}
        />
      );
    case "sub-service-city":
      return (
        <SubServiceCityTemplate
          service={descriptor.service}
          subService={descriptor.subService}
          city={descriptor.city}
        />
      );
  }
}
