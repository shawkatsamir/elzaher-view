import { client } from "../sanity/client";

export default async function sitemap() {
  const baseUrl = "https://alzaherview.com";

  const postsQuery = `*[_type == "post"] {
    "slug": slug.current,
    "category": categories[0]->slug.current,
    _updatedAt
  }`;
  const posts = await client.fetch(postsQuery);

  const categoriesQuery = `*[_type == "category"] {
    "slug": slug.current,
    _updatedAt
  }`;
  const categories = await client.fetch(categoriesQuery);

  const staticRoutes = ["", "/blog", "/services"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/blog/${category.slug}`,
    lastModified: category._updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.category}/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
