import { business, absoluteUrl, postalAddress } from "@/app/lib/business";

export default function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.nameAr,
    alternateName: business.nameEn,
    url: business.baseUrl,
    logo: absoluteUrl(business.defaultLogoPath),
    description:
      "نقدم خدمات منزلية شاملة في جميع مدن المملكة العربية السعودية بأعلى جودة وأفضل الأسعار: سباكة، تنظيف، صيانة، عزل، تنسيق حدائق، نقل عفش، ومقاولات عامة.",
    address: postalAddress(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone,
      contactType: "customer service",
      areaServed: business.address.country,
      availableLanguage: ["ar", "en"],
    },
    // GBP first, then socials — same ordering and empty-filtering as
    // LocalBusinessJsonLd, so the two never disagree about the entity.
    sameAs: [
      business.googleBusinessProfileUrl,
      business.social.twitter,
      business.social.instagram,
      business.social.facebook,
      business.social.tiktok,
      business.social.youtube,
    ].filter(Boolean),
    priceRange: business.priceRange,
    ...(business.openingHours
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: business.openingHours.days,
            opens: business.openingHours.opens,
            closes: business.openingHours.closes,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
