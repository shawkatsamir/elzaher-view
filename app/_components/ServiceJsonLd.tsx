interface ServiceJsonLdProps {
  name: string;
  description: string;
  image: string;
  url: string;
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
  offers,
}: ServiceJsonLdProps) {
  const baseUrl = "https://alzaherview.com";
  const fullUrl = `${baseUrl}${url}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: "شركة الزاهر فيو",
      image: `${baseUrl}/logo.png`,
      telephone: "+966590123782",
      address: {
        "@type": "PostalAddress",
        streetAddress: "King Fahd Road",
        addressLocality: "Riyadh",
        addressRegion: "Riyadh",
        postalCode: "11564",
        addressCountry: "SA",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Saudi Arabia",
    },
    url: fullUrl,
    image: imageUrl,
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
