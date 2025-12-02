import { client } from "../../../../sanity/client";
import { POST_QUERY, POSTS_QUERY } from "../../../../sanity/lib/queries";

import { PortableText } from "@portabletext/react";
import { Img } from "../../../../components/Image";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return posts.map((post) => ({
    category: post.category?.slug.current,
    slug: post.slug.current,
  }));
}

interface Category {
  title: string;
  slug: { current: string };
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  publishedAt: string;
  readTime: number;
  authorName: string;
  excerpt: string;
  category: Category;
}

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: SanityImage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  publishedAt: string;
  authorName: string;
  authorRole: string;
  readTime: number;
  category: Category;
  relatedPosts: RelatedPost[];
  metaDescription?: string;
  keywords?: string[];
}

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  console.log("Fetching post for slug:", decodedSlug);
  const post = await client.fetch<Post>(POST_QUERY, { slug: decodedSlug });
  console.log("Fetched post:", post ? post.title : "null");

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white pt-24">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href={`/blog/${category}`}
              className="hover:text-primary-600 mb-8 inline-flex items-center text-sm font-medium text-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              العودة الي المدونة
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="bg-primary-100 text-primary-700 rounded-full px-3 py-1 font-medium">
                {post.category?.title || "Article"}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime} min read
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              {post.title}
            </h1>

            <div className="flex items-center">
              <div className="bg-primary-100 text-primary-700 mr-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                {post.authorName?.[0]}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.authorName}</p>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      {post.mainImage && (
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Img
              src={post.mainImage}
              alt={post.title}
              fill
              containerClassName="relative -mt-8 aspect-video w-full overflow-hidden rounded-2xl shadow-xl md:-mt-12"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="prose-a:text-primary-600 prose prose-lg mx-auto max-w-5xl text-gray-700 prose-headings:font-bold prose-headings:text-gray-900 prose-img:rounded-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="col-span-1 lg:col-span-2">
              <Card>
                <CardContent>
                  <PortableText
                    value={post.body}
                    components={{
                      block: {
                        h2: ({ children }) => (
                          <h2 className="mb-8 rounded-lg border-r-4 border-indigo-600 bg-indigo-50 p-6 text-2xl font-bold">
                            {children}
                          </h2>
                        ),
                      },
                      types: {
                        image: ({ value }) => {
                          if (!value?.asset?._ref) {
                            return null;
                          }
                          return (
                            <Img
                              src={value}
                              alt={value.alt || "Post image"}
                              fill
                              containerClassName="relative my-8 aspect-video w-full overflow-hidden rounded-xl"
                              className="object-cover"
                            />
                          );
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                        <User className="h-10 w-10 text-indigo-600" />
                      </div>
                      <h3 className="mb-2 text-lg">{post.authorName}</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        {post.authorRole}
                      </p>
                      {/* <Separator className="my-4" /> */}
                      <hr />
                      <p className="text-sm leading-relaxed text-gray-600">
                        فريق متخصص من الخبراء في مجال الخدمات المنزلية، نقدم لكم
                        أفضل النصائح والإرشادات المتخصصة.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA Card */}
                <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="mb-3 text-xl">هل تحتاج للمساعدة؟</h3>
                    <p className="mb-6 text-indigo-100">
                      فريقنا المتخصص جاهز لخدمتكم على مدار الساعة
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                      <Button
                        size="lg"
                        className="flex items-center space-x-2 space-x-reverse"
                        asChild
                      >
                        <a href="tel:+966590123782">
                          <Phone className="h-5 w-5" />
                          <span>اتصل الآن</span>
                        </a>
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center space-x-2 space-x-reverse"
                        asChild
                      >
                        <a
                          href="https://wa.me/966590123782"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>واتساب</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost._id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    {relatedPost.mainImage && (
                      <Img
                        src={relatedPost.mainImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <div className="text-primary-700 absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {relatedPost.category?.title}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {relatedPost.readTime} min read
                      </span>
                    </div>
                    <h3 className="group-hover:text-primary-600 mb-3 text-xl font-bold text-gray-900">
                      {relatedPost.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 flex-1 text-gray-600">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between border-t pt-4">
                      <div className="flex items-center">
                        <div className="bg-primary-100 text-primary-700 mr-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                          {relatedPost.title?.[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {relatedPost.authorName}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${relatedPost.category?.slug.current}/${relatedPost.slug.current}`}
                        className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
                      >
                        Read <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
