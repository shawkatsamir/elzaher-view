"use client";

import React, { useState, useEffect } from "react";
import { Img } from "../../components/Image";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Eye,
  Badge,
  ArrowLeft,
} from "lucide-react";
import { client } from "../../sanity/client";
import { POSTS_QUERY, CATEGORIES_QUERY } from "../../sanity/lib/queries";
import Link from "next/link";

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

interface BlogPageProps {
  onNavigateToArticle?: (articleId: string) => void;
}

export default function BlogPage({ onNavigateToArticle }: BlogPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          client.fetch(POSTS_QUERY),
          client.fetch(CATEGORIES_QUERY),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts;

  const featuredPost = posts[0]; // Assuming the first post is featured for now

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="border-primary-600 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              نصائح ومقالات متخصصة
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
              اكتشفوا أحدث النصائح والإرشادات المتخصصة في مجال الخدمات المنزلية.
              مقالات مفيدة تساعدكم في الحفاظ على منازلكم وحل المشاكل اليومية
              بطرق احترافية.
            </p>

            <div className="flex items-center justify-center space-x-4 space-x-reverse text-sm text-gray-600">
              <div className="flex items-center">
                <BookOpen className="ml-2 h-5 w-5 text-indigo-500" />
                <span>+50 مقال مفيد</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                <span>محدث أسبوعياً</span>
              </div>
              <div className="flex items-center">
                <Eye className="ml-2 h-5 w-5 text-blue-500" />
                <span>+10,000 قارئ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 flex items-center text-2xl font-bold text-gray-900">
              <TrendingUp className="text-primary-600 mr-2 h-6 w-6" />
              المقال المميز
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
                      href={`/blog/${featuredPost.category?.slug.current}/${featuredPost.slug.current}`}
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
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              تصفح المقالات حسب الفئة
            </h2>
          </div>
          {/* Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="bg-primary-600 rounded-full px-6 py-2 text-black shadow-md transition-all"
            >
              جميع المقالات
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/blog/${category.slug.current}`}
                className="rounded-full bg-white px-6 py-2 text-gray-600 transition-all hover:bg-gray-100"
              >
                {category.title}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
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
                    <Link
                      href={`/blog/${post.category?.slug.current}/${post.slug.current}`}
                      className="text-primary-600 hover:text-primary-700 flex items-center justify-center font-medium"
                    >
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your category filter
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
