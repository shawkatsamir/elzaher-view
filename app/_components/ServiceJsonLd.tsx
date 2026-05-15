import { business, absoluteUrl } from "@/app/lib/business";

interface ServiceJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
  areaServedAr?: string;
  offers?: {
    price?: string;
    priceCurrency?: string;
  }[];
}

export default function ServiceJsonLd({
  name,
  description,
  image,
  url,
  areaServedAr,
  offers,
}: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: business.nameAr,
      image: absoluteUrl(business.defaultLogoPath),
      telephone: business.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.streetEn,
        addressLocality: business.address.cityEn,
        addressRegion: business.address.regionEn,
        postalCode: business.address.postalCode,
        addressCountry: business.address.country,
      },
    },
    areaServed: areaServedAr
      ? { "@type": "City", name: areaServedAr }
      : { "@type": "Country", name: "Saudi Arabia" },
    url: absoluteUrl(url),
    image: absoluteUrl(image),
    ...(offers && {
      offers: offers.map((offer) => ({
        "@type": "Offer",
        price: offer.price || "0",
        priceCurrency: offer.priceCurrency || "SAR",
        availability: "https://schema.org/InStock",
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
