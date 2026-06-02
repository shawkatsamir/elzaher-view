import { urlFor } from "@/sanity/lib/image";
import { business } from "@/app/lib/business";

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
}

interface Props {
  slug: string;
  title: string;
  description?: string;
  image?: SanityImage;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}

// Emits Article + BreadcrumbList for a project case study. FAQPage JSON-LD is
// handled separately by reusing BlogPostJsonLd at the call site.
export default function ProjectJsonLd({
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
}: Props) {
  const baseUrl = business.baseUrl;
  const url = `${baseUrl}/works/${slug}`;
  const imageUrl = image
    ? urlFor(image).width(1200).height(630).url()
    : `${baseUrl}/default-og.jpg`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(description ? { description } : {}),
    image: [imageUrl],
    ...(datePublished ? { datePublished } : {}),
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName || business.nameAr,
    },
    publisher: {
      "@type": "Organization",
      name: business.nameAr,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}${business.defaultLogoPath}`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ar-SA",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "أعمالنا",
        item: `${baseUrl}/works`,
      },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([articleSchema, breadcrumbSchema]),
      }}
    />
  );
}
