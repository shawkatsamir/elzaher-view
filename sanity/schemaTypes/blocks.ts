import { defineType, defineField } from "sanity";

export const infoCallout = defineType({
  name: "infoCallout",
  title: "Info Callout",
  type: "object",
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Tip (نصيحة)", value: "tip" },
          { title: "Warning (تحذير)", value: "warning" },
          { title: "Note (ملاحظة)", value: "note" },
          { title: "Info (معلومة)", value: "info" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title (optional)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", variant: "variant" },
    prepare: ({ title, variant }) => ({
      title: title || "Callout",
      subtitle: variant,
    }),
  },
});

export const comparisonTable = defineType({
  name: "comparisonTable",
  title: "Comparison Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption / Title",
      type: "string",
    }),
    defineField({
      name: "headers",
      title: "Column Headers",
      description: "Header cells, left-to-right (RTL: right-to-left visually).",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          name: "row",
          title: "Row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: (cells as string[] | undefined)?.join(" | ") || "Row",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "caption" },
    prepare: ({ title }) => ({ title: title || "Comparison Table" }),
  },
});

export const internalServiceLink = defineType({
  name: "internalServiceLink",
  title: "Internal Service Link",
  type: "object",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      description:
        "Arabic slug of the service or service×city page to link to. Examples: شركة-سباكة, سباك-الرياض, كشف-تسريبات-جدة.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      description: "Optional override for link text. Defaults to the slug.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "label", slug: "slug" },
    prepare: ({ title, slug }) => ({
      title: title || slug || "Internal Link",
      subtitle: `/${slug}`,
    }),
  },
});

export const embeddedFaq = defineType({
  name: "embeddedFaq",
  title: "Embedded FAQ",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      initialValue: "الأسئلة الشائعة",
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
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
      validation: (Rule) => Rule.min(2),
    }),
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare: ({ title, items }) => ({
      title: title || "FAQ",
      subtitle: `${(items as unknown[] | undefined)?.length || 0} question(s)`,
    }),
  },
});

export const howToStep = defineType({
  name: "howToStep",
  title: "How-To Step",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Step Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Step Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Step Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
