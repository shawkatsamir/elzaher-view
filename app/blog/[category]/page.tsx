"use client";

import React, { useState, useEffect } from "react";
import { Img } from "../../../components/Image";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { client } from "../../../sanity/client";
import {
  POSTS_BY_CATEGORY_QUERY,
  CATEGORIES_QUERY,
} from "../../../sanity/lib/queries";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  publishedAt: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  readTime: number;
  category: Category;
}

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Decode the URL-encoded category slug (important for Arabic/non-ASCII slugs)
        const decodedCategorySlug = decodeURIComponent(categorySlug);

        console.log("🔍 Category slug from URL (encoded):", categorySlug);
        console.log("🔍 Category slug (decoded):", decodedCategorySlug);
        console.log("🔍 Fetching posts with params:", {
          categorySlug: decodedCategorySlug,
        });

        const [postsData, categoriesData] = await Promise.all([
          client.fetch(POSTS_BY_CATEGORY_QUERY, {
            categorySlug: decodedCategorySlug,
          }),
          client.fetch(CATEGORIES_QUERY),
        ]);

        console.log("📊 Posts returned:", postsData.length, postsData);
        console.log("📂 All categories:", categoriesData);

        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchData();
    }
  }, [categorySlug]);

  const featuredPost = posts[0];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="border-primary-600 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    );
  }

  const decodedCategorySlug = decodeURIComponent(categorySlug);

  const currentCategory = categories.find(
    (c) => c.slug.current === decodedCategorySlug,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="bg-primary-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Link
              href="/blog"
              className="hover:text-primary-200 mb-6 inline-flex items-center text-sm font-medium text-white/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Articles
            </Link>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              {currentCategory?.title || "Category"} Articles
            </h1>
            <p className="text-primary-100 mb-8 text-xl">
              Explore our latest posts in {currentCategory?.title}.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
              <TrendingUp className="text-primary-600 mr-2 h-6 w-6" />
              Featured in {currentCategory?.title}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl transition-shadow hover:shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  {featuredPost.mainImage && (
                    <Img
                      src={featuredPost.mainImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="bg-primary-100 text-primary-700 rounded-full px-3 py-1 font-medium">
                      {featuredPost.category?.title || "Article"}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-gray-900">
                    {featuredPost.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-primary-100 text-primary-700 mr-3 flex h-10 w-10 items-center justify-center rounded-full font-bold">
                        {featuredPost.authorName?.[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {featuredPost.authorName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {featuredPost.authorRole}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${categorySlug}/${featuredPost.slug.current}`}
                      className="text-primary-600 hover:text-primary-700 flex items-center font-medium"
                    >
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="rounded-full bg-white px-6 py-2 text-gray-600 transition-all hover:bg-gray-100"
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/blog/${category.slug.current}`}
                className={`rounded-full px-6 py-2 transition-all ${
                  decodedCategorySlug === category.slug.current
                    ? "bg-primary-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {category.title}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  {post.mainImage && (
                    <Img
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="text-primary-700 absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {post.category?.title}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4 flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary-600 mb-3 text-xl font-bold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-gray-600">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t pt-4">
                    <div className="flex items-center">
                      <div className="bg-primary-100 text-primary-700 mr-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                        {post.authorName?.[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {post.authorName}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${categorySlug}/${post.slug.current}`}
                      className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
                    >
                      Read <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">
                No articles found
              </h3>
              <p className="text-gray-500">Try checking another category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
