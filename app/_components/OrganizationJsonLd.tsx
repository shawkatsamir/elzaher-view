export default function OrganizationJsonLd() {
  const baseUrl = "https://alzaherview.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "شركة الزاهر فيو",
    alternateName: "Al-Zaher View",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "نقدم لكم أفضل خدمات التنظيف والصيانة المنزلية بأعلى جودة وأفضل الأسعار في جميع أنحاء المملكة العربية السعودية",
    address: {
      "@type": "PostalAddress",
      streetAddress: "King Fahd Road",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh",
      postalCode: "11564",
      addressCountry: "SA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966590123782",
      contactType: "customer service",
      areaServed: "SA",
      availableLanguage: ["ar", "en"],
    },
    sameAs: [
      "https://twitter.com/alzaherview",
      "https://instagram.com/alzaherview",
      "https://facebook.com/alzaherview",
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
