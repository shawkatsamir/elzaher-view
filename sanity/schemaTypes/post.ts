import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Content",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    // Extra fields for your specific project
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
    }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({ name: "readTime", title: "Read Time (min)", type: "number" }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
});
