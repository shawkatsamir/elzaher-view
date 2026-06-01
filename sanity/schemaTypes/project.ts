import { defineType, defineField } from "sanity";

// Count words in a Portable Text body. Mirrors the helper in post.ts so project
// case studies hit the same 1500-2500 word SEO target.
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
  name: "project",
  title: "Project (Case Study)",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "facts", title: "Project Facts" },
    { name: "seo", title: "SEO" },
    { name: "schema", title: "Schema.org" },
    { name: "author", title: "Author" },
    { name: "relations", title: "Relations" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      description:
        "Keyword-rich, location-specific. Example: عزل فوم لسطح فيلا في حي الملقا بالرياض.",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        // Preserve Arabic (U+0600-U+06FF) + Latin alphanumerics so Arabic titles
        // produce Arabic slugs (Google's #1 Arabic ranking signal — exact-match
        // keyword in the URL). Same slugify as post.ts.
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^؀-ۿa-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      description: "Real photo of the finished project. Uploaded by client/editor.",
      type: "image",
      group: "content",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery (Before / After Photos)",
      description:
        "Real project photos. Add alt text (for SEO + accessibility) and an optional caption (e.g. قبل العزل / بعد العزل).",
      type: "array",
      group: "content",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) =>
                Rule.required().warning("Add alt text for SEO and accessibility."),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary (Snippet Target)",
      description:
        "40-60 word concise overview of the project, rendered as a callout near the top. Lead with the most important keywords.",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) =>
        Rule.max(400).warning("Keep under 400 characters for snippet eligibility."),
    }),
    defineField({
      name: "body",
      title: "Case Study Content",
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

    // ---- Project facts (drive a structured info card in the UI) ----
    defineField({
      name: "clientType",
      title: "Property Type",
      type: "string",
      group: "facts",
      options: {
        list: [
          { title: "فيلا", value: "فيلا" },
          { title: "شقة", value: "شقة" },
          { title: "عمارة سكنية", value: "عمارة سكنية" },
          { title: "مبنى تجاري", value: "مبنى تجاري" },
          { title: "قصر", value: "قصر" },
          { title: "أخرى", value: "أخرى" },
        ],
      },
    }),
    defineField({
      name: "neighborhood",
      title: "Neighborhood / District",
      description: "Specific area, e.g. حي الملقا. Strengthens local long-tail ranking.",
      type: "string",
      group: "facts",
    }),
    defineField({
      name: "completedAt",
      title: "Completion Date",
      type: "date",
      group: "facts",
    }),
    defineField({
      name: "durationLabel",
      title: "Duration",
      description: "Human-readable, e.g. ٣ أيام.",
      type: "string",
      group: "facts",
    }),
    defineField({
      name: "materialsUsed",
      title: "Materials / Equipment Used",
      type: "array",
      group: "facts",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "resultHighlight",
      title: "Result Highlight",
      description: "One-line measurable outcome, e.g. خفض حرارة السطح وتوفير في فاتورة الكهرباء.",
      type: "string",
      group: "facts",
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial",
      type: "object",
      group: "facts",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "author", title: "Client Name", type: "string" }),
        defineField({
          name: "rating",
          title: "Rating (1-5)",
          type: "number",
          validation: (Rule) => Rule.min(1).max(5),
        }),
      ],
    }),

    // ---- Schema.org ----
    defineField({
      name: "postFaqs",
      title: "FAQs",
      description:
        "Emits FAQPage JSON-LD — rich results in SERP. Aim for 3-6 questions.",
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

    // ---- Relations ----
    defineField({
      name: "relatedServices",
      title: "Related Services",
      description:
        "Service slugs this project relates to (links it to service landing pages + powers the internal-link block). Example: عزل, سباكة, صيانة, تنظيف, تنسيق-حدائق, مقاولات, نقل-عفش, سيراميك, باركية.",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedCities",
      title: "Related Cities",
      description:
        "City slug(s) where this project was executed, for local ranking. Slugs: riyadh, jeddah, dammam, mecca, medina, taif, abha, tabuk, buraydah, khamis-mushait.",
      type: "array",
      group: "relations",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: { type: "project" } }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Articles",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: { type: "post" } }],
    }),

    // ---- Author / dates ----
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "author",
      to: [{ type: "author" }],
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
      type: "date",
      group: "content",
    }),

    // ---- SEO ----
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      description: "Optional. Overrides the project title in <title> + OG/Twitter.",
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
      description: "Optional. Falls back to Cover Image. Recommended 1200×630.",
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
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    select: { title: "title", media: "mainImage", subtitle: "neighborhood" },
  },
});
