import { urlFor } from "@/sanity/lib/image";

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  slug: string;
  categorySlug: string;
}

export default function JsonLd({ post, slug, categorySlug }: JsonLdProps) {
  const baseUrl = "https://alzaherview.com"; // ⚠️ Your Domain

  const postUrl = `${baseUrl}/blog/${categorySlug}/${slug}`;

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/default-og.jpg`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [imageUrl],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName || "Al-Zaher Team",
      jobTitle: post.authorRole || "Editor",
    },
    publisher: {
      "@type": "Organization",
      name: "شركة الزاهر فيو",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "ar-SA",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "المدونة",
        item: `${baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category?.title || categorySlug,
        item: `${baseUrl}/blog/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const schema = [blogPostingSchema, breadcrumbSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
