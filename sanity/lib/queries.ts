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
  seoTitle,
  slug,
  mainImage,
  ogImage,
  body,
  publishedAt,
  authorName,
  authorRole,
  readTime,
  relatedServices,
  relatedCity,
  "category": categories[0]->{title, slug, description, seoTitle},
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
  slug,
  description,
  seoTitle
}`;

export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  title,
  seoTitle,
  slug,
  description
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

// Posts tagged with a given service slug (set on post.relatedServices).
// Used by service landing pages to surface editorial → commercial links.
export const RELATED_POSTS_BY_SERVICE_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
  && $serviceSlug in relatedServices
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  readTime,
  "category": categories[0]->{title, slug}
}`;

// Posts tagged with a given service AND city. Falls back to service-only at the call site
// if the city-specific set is empty.
export const RELATED_POSTS_BY_SERVICE_AND_CITY_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
  && $serviceSlug in relatedServices
  && relatedCity == $citySlug
] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  readTime,
  "category": categories[0]->{title, slug}
}`;
