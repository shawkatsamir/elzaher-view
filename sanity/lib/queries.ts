import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  authorName,
  authorRole,
  readTime,
  "category": categories[0]->{title, slug}
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  authorName,
  authorRole,
  readTime,
  "category": categories[0]->{title, slug},
  "relatedPosts": relatedPosts[]->{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    readTime,
    authorName,
    excerpt,
    "category": categories[0]->{title, slug}
  },
  metaDescription,
  keywords
}`;

export const CATEGORIES_QUERY = groq`*[_type == "category"] {
  _id,
  title,
  slug
}`;

export const POSTS_BY_CATEGORY_QUERY = groq`*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  authorName,
  authorRole,
  readTime,
  "category": categories[0]->{title, slug}
}`;
