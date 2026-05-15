import Link from "next/link";
import { Img } from "@/components/Image";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: unknown;
  publishedAt?: string;
  excerpt?: string;
  readTime?: number;
  category?: { title?: string; slug?: { current: string } };
}

interface RelatedPostsSectionProps {
  posts: RelatedPost[];
  title?: string;
  subtitle?: string;
}

export default function RelatedPostsSection({
  posts,
  title = "مقالات ذات صلة",
  subtitle = "نصائح وإرشادات من خبرائنا",
}: RelatedPostsSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const categorySlug = post.category?.slug?.current;
            const href = categorySlug
              ? `/blog/${categorySlug}/${post.slug.current}`
              : `/blog/${post.slug.current}`;
            return (
              <Card
                key={post._id}
                className="group overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              >
                <Link href={href}>
                  <CardContent className="p-0">
                    {post.mainImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <Img
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-col p-6">
                      {post.category?.title && (
                        <span className="mb-3 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {post.category.title}
                        </span>
                      )}
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-blue-700">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          {post.publishedAt && (
                            <span className="flex items-center">
                              <Calendar className="ml-1 h-3 w-3" />
                              {new Date(post.publishedAt).toLocaleDateString(
                                "ar-SA",
                              )}
                            </span>
                          )}
                          {post.readTime ? (
                            <span className="flex items-center">
                              <Clock className="ml-1 h-3 w-3" />
                              {post.readTime} د
                            </span>
                          ) : null}
                        </div>
                        <span className="flex items-center font-medium text-blue-600">
                          اقرأ المزيد
                          <ArrowLeft className="mr-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
