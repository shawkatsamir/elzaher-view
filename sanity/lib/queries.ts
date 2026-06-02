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
  featuredAnswer,
  body,
  articleType,
  howToSteps[]{
    name,
    text,
    image
  },
  postFaqs[]{
    question,
    answer
  },
  tocAuto,
  publishedAt,
  lastReviewedAt,
  authorName,
  authorRole,
  "author": author->{
    _id,
    name,
    slug,
    role,
    bio,
    photo,
    expertise,
    yearsExperience,
    twitterUrl,
    linkedinUrl
  },
  readTime,
  relatedServices,
  "relatedCities": coalesce(relatedCities, [relatedCity][defined(relatedCity)]),
  targetKeywords,
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
  && ($citySlug in relatedCities || relatedCity == $citySlug)
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

// ---- Projects (works / case studies) ----

export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug.current)] | order(coalesce(completedAt, publishedAt) desc) {
  _id,
  title,
  slug,
  mainImage,
  summary,
  completedAt,
  neighborhood,
  clientType,
  resultHighlight,
  relatedServices,
  relatedCities
}`;

export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  _updatedAt,
  title,
  seoTitle,
  slug,
  mainImage,
  ogImage,
  gallery[]{ ..., alt, caption },
  summary,
  body,
  tocAuto,
  clientType,
  neighborhood,
  completedAt,
  durationLabel,
  materialsUsed,
  resultHighlight,
  testimonial,
  postFaqs[]{ question, answer },
  publishedAt,
  lastReviewedAt,
  "author": author->{
    _id,
    name,
    slug,
    role,
    bio,
    photo,
    expertise,
    yearsExperience
  },
  relatedServices,
  relatedCities,
  keywords,
  metaDescription,
  "relatedProjects": relatedProjects[]->{
    _id,
    title,
    slug,
    mainImage,
    completedAt,
    summary,
    resultHighlight
  },
  "relatedPosts": relatedPosts[]->{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "category": categories[0]->{title, slug}
  }
}`;

// Projects tagged with a given service (and optionally city) — for surfacing
// case studies on service landing pages (phase 2).
export const RELATED_PROJECTS_BY_SERVICE_QUERY = groq`*[
  _type == "project"
  && defined(slug.current)
  && $serviceSlug in relatedServices
] | order(coalesce(completedAt, publishedAt) desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  completedAt,
  resultHighlight,
  neighborhood
}`;

export const RELATED_PROJECTS_BY_SERVICE_AND_CITY_QUERY = groq`*[
  _type == "project"
  && defined(slug.current)
  && $serviceSlug in relatedServices
  && $citySlug in relatedCities
] | order(coalesce(completedAt, publishedAt) desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  completedAt,
  resultHighlight,
  neighborhood
}`;
