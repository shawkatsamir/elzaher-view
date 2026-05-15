import { business, absoluteUrl } from "@/app/lib/business";
import type { City } from "@/app/lib/locations";

interface LocalBusinessJsonLdProps {
  city?: City;
  pageUrl: string;
  description?: string;
}

export default function LocalBusinessJsonLd({
  city,
  pageUrl,
  description,
}: LocalBusinessJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: business.nameAr,
    alternateName: business.nameEn,
    url: absoluteUrl(pageUrl),
    logo: absoluteUrl(business.defaultLogoPath),
    image: absoluteUrl(business.defaultLogoPath),
    description:
      description ||
      "خدمات منزلية شاملة في جميع مدن المملكة العربية السعودية: سباكة، تنظيف، صيانة، عزل، تنسيق حدائق، نقل عفش ومقاولات عامة.",
    telephone: business.phone,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetEn,
      addressLocality: city ? city.nameEn : business.address.cityEn,
      addressRegion: city ? city.nameEn : business.address.regionEn,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    ...(city
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.lat,
            longitude: city.lng,
          },
          areaServed: {
            "@type": "City",
            name: city.nameAr,
          },
        }
      : {
          areaServed: {
            "@type": "Country",
            name: "Saudi Arabia",
          },
        }),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone,
      contactType: "customer service",
      areaServed: business.address.country,
      availableLanguage: ["ar", "en"],
    },
    sameAs: [
      business.social.twitter,
      business.social.instagram,
      business.social.facebook,
    ].filter(Boolean),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: business.openingHours.days,
      opens: business.openingHours.opens,
      closes: business.openingHours.closes,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
