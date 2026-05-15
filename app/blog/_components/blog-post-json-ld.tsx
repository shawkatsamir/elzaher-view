import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl } from "@/app/lib/business";

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
}

interface HowToStep {
  name: string;
  text: string;
  image?: SanityImage;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  url: string;
  name: string;
  description?: string;
  articleType?: "Article" | "HowTo" | "Guide" | "Comparison" | "Listicle";
  howToSteps?: HowToStep[];
  postFaqs?: FaqItem[];
  image?: SanityImage;
}

export default function BlogPostJsonLd({
  url,
  name,
  description,
  articleType,
  howToSteps,
  postFaqs,
  image,
}: Props) {
  const blocks: Record<string, unknown>[] = [];

  if (articleType === "HowTo" && howToSteps && howToSteps.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name,
      ...(description ? { description } : {}),
      ...(image
        ? { image: urlFor(image).width(1200).height(630).fit("crop").url() }
        : {}),
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${absoluteUrl(url)}#step-${i + 1}`,
        ...(s.image
          ? { image: urlFor(s.image).width(1200).height(630).fit("crop").url() }
          : {}),
      })),
    });
  }

  if (postFaqs && postFaqs.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: postFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  if (blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
