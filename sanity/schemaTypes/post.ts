import { defineType, defineField } from "sanity";

// Count words in a Portable Text body. Used by validation + word-count helper.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function countWordsInBody(body: any): number {
  if (!Array.isArray(body)) return 0;
  let count = 0;
  for (const block of body) {
    if (block?._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (typeof child?.text === "string") {
          count += child.text.split(/\s+/).filter(Boolean).length;
        }
      }
    } else if (block?._type === "infoCallout" && Array.isArray(block.body)) {
      count += countWordsInBody(block.body);
    } else if (block?._type === "embeddedFaq" && Array.isArray(block.items)) {
      for (const item of block.items) {
        if (typeof item?.question === "string")
          count += item.question.split(/\s+/).filter(Boolean).length;
        if (typeof item?.answer === "string")
          count += item.answer.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return count;
}

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "schema", title: "Schema.org" },
    { name: "author", title: "Author" },
    { name: "relations", title: "Relations" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "featuredAnswer",
      title: "Featured Answer (Snippet Target)",
      description:
        "40-60 word concise answer to the post's main question. Rendered as a styled callout at the top of the post — best shot at winning Google's featured snippet box. Aim for the most important keywords up front.",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) =>
        Rule.max(400).warning("Keep under 400 characters for snippet eligibility."),
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        { type: "infoCallout" },
        { type: "comparisonTable" },
        { type: "internalServiceLink" },
        { type: "embeddedFaq" },
      ],
      validation: (Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Rule.custom((body: any) => {
          const words = countWordsInBody(body);
          if (words === 0) return true;
          if (words < 600)
            return `Body has ${words} words. Target 1500-2500 for SEO. Posts under 600 words rarely rank in this niche.`;
          if (words < 1000)
            return {
              level: "warning" as const,
              message: `Body has ${words} words. Target 1500-2500 for SEO.`,
            };
          return true;
        }),
    }),
    defineField({
      name: "articleType",
      title: "Article Type",
      description:
        "Drives schema.org type emitted in JSON-LD. Use HowTo for step-by-step tutorials (best for rich results).",
      type: "string",
      group: "schema",
      options: {
        list: [
          { title: "Article (regular post)", value: "Article" },
          { title: "HowTo (step-by-step tutorial)", value: "HowTo" },
          { title: "Guide", value: "Guide" },
          { title: "Comparison (X vs Y)", value: "Comparison" },
          { title: "Listicle (Top N)", value: "Listicle" },
        ],
        layout: "radio",
      },
      initialValue: "Article",
    }),
    defineField({
      name: "howToSteps",
      title: "How-To Steps",
      description:
        "Numbered steps. Only used when Article Type = HowTo. Emits schema.org HowTo JSON-LD.",
      type: "array",
      group: "schema",
      of: [{ type: "howToStep" }],
      hidden: ({ document }) => document?.articleType !== "HowTo",
    }),
    defineField({
      name: "postFaqs",
      title: "Post FAQs",
      description:
        "Post-level FAQs. Emits FAQPage JSON-LD — rich results in SERP. Aim for 3-8 questions.",
      type: "array",
      group: "schema",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
    defineField({
      name: "tocAuto",
      title: "Auto Table of Contents",
      description: "Auto-build a TOC from H2/H3 headings in body.",
      type: "boolean",
      group: "content",
      initialValue: true,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: { type: "post" } }],
    }),
    defineField({
      name: "relatedServices",
      title: "Related Services",
      description:
        "Service slugs this post relates to (used to surface the post on service landing pages). Example: سباكة, تنظيف, صيانة, تنسيق-حدائق, مقاولات, نقل-عفش, عزل.",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedCity",
      title: "Related City",
      description:
        "City slug if this post is specifically about a city. Example: riyadh, jeddah, dammam.",
      type: "string",
      group: "relations",
    }),
    defineField({
      name: "author",
      title: "Author",
      description:
        "Reference an Author document (preferred). Falls back to the legacy authorName/authorRole string fields if not set.",
      type: "reference",
      group: "author",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "authorName",
      title: "Author Name (legacy)",
      description: "Used if no Author reference is set. Prefer the reference for new posts.",
      type: "string",
      group: "author",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role (legacy)",
      type: "string",
      group: "author",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "lastReviewedAt",
      title: "Last Reviewed At",
      description:
        "When this post was last reviewed for accuracy. Displayed as 'آخر مراجعة' on the post — freshness signal.",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "readTime",
      title: "Read Time (min)",
      description:
        "Optional. If left empty, computed from body word count at render time (200 wpm).",
      type: "number",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      group: "content",
      rows: 3,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description:
        "Optional. Overrides the post title in the <title> tag and OG/Twitter. Useful for longer keyword-rich titles.",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      group: "seo",
      rows: 2,
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image (OG)",
      description: "Optional. Falls back to Main Image. Recommended 1200×630.",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "targetKeywords",
      title: "Target Keywords (SEO planning)",
      description:
        "Primary keywords this post targets. Used for internal QA and possible related-post selection. Different from `keywords` (which lists all relevant tags).",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
