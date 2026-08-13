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
    // One business, one address — on every page. City coverage is expressed via
    // areaServed, never by relocating the address, which would assert a physical
    // branch per city and break NAP consistency against the Google Business Profile.
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetEn,
      addressLocality: business.address.cityEn,
      addressRegion: business.address.regionEn,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: city
      ? { "@type": "City", name: city.nameAr }
      : { "@type": "Country", name: "Saudi Arabia" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.phone,
      contactType: "customer service",
      areaServed: business.address.country,
      availableLanguage: ["ar", "en"],
    },
    // The GBP URL first — it is the strongest entity tie between site and listing.
    // Every entry must resolve; a sameAs pointing at a 404 is a negative trust signal.
    sameAs: [
      business.googleBusinessProfileUrl,
      business.social.twitter,
      business.social.instagram,
      business.social.facebook,
      business.social.tiktok,
      business.social.youtube,
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
