import type { Metadata } from "next";
import { client } from "../../../../sanity/client";
import { POST_QUERY, POSTS_QUERY } from "../../../../sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl } from "@/app/lib/business";

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
  Lightbulb,
  RotateCw,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  InfoCalloutBlock,
  ComparisonTableBlock,
  InternalServiceLinkBlock,
  EmbeddedFaqBlock,
  HowToStepsBlock,
} from "../../_components/blog-blocks";
import BlogPostJsonLd from "../../_components/blog-post-json-ld";

export const revalidate = 60;

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

interface FaqItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: SanityImage;
}

interface AuthorRef {
  _id: string;
  name: string;
  slug?: { current: string };
  role?: string;
  bio?: string;
  photo?: SanityImage;
  expertise?: string[];
  yearsExperience?: number;
  twitterUrl?: string;
  linkedinUrl?: string;
}

type ArticleType = "Article" | "HowTo" | "Guide" | "Comparison" | "Listicle";

interface Post {
  _id: string;
  title: string;
  seoTitle?: string;
  slug: { current: string };
  mainImage: SanityImage;
  ogImage?: SanityImage;
  featuredAnswer?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  articleType?: ArticleType;
  howToSteps?: HowToStep[];
  postFaqs?: FaqItem[];
  tocAuto?: boolean;
  publishedAt: string;
  lastReviewedAt?: string;
  author?: AuthorRef;
  authorName: string;
  authorRole: string;
  readTime: number;
  category: Category;
  relatedPosts: RelatedPost[];
  relatedServices?: string[];
  relatedCity?: string;
  targetKeywords?: string[];
  metaDescription?: string;
  keywords?: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeWordCount(body: any[] | undefined): number {
  if (!Array.isArray(body)) return 0;
  let count = 0;
  for (const block of body) {
    if (block?._type === "block" && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (typeof child?.text === "string") {
          count += child.text.split(/\s+/).filter(Boolean).length;
        }
      }
    } else if (block?._type === "infoCallout" && Array.isArray(block.body)) {
      count += computeWordCount(block.body);
    } else if (block?._type === "embeddedFaq" && Array.isArray(block.items)) {
      for (const item of block.items) {
        if (typeof item?.question === "string")
          count += item.question.split(/\s+/).filter(Boolean).length;
        if (typeof item?.answer === "string")
          count += item.answer.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  return count;
}

// Extract H2/H3 headings for TOC.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(body: any[] | undefined): { id: string; text: string; level: 2 | 3 }[] {
  if (!Array.isArray(body)) return [];
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const block of body) {
    if (block?._type !== "block") continue;
    const style = block.style;
    if (style !== "h2" && style !== "h3") continue;
    const text = Array.isArray(block.children)
      ? block.children
          .map((c: { text?: string }) => c?.text || "")
          .join("")
          .trim()
      : "";
    if (!text) continue;
    const id = text
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
    headings.push({ id, text, level: style === "h2" ? 2 : 3 });
  }
  return headings;
}

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

import JsonLd from "@/app/_components/JsonLd";

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await client.fetch<Post | null>(POST_QUERY, {
    slug: decodedSlug,
  });
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description =
    post.metaDescription ||
    (typeof post.title === "string" ? post.title.slice(0, 160) : "");
  const ogSource = post.ogImage || post.mainImage;
  const ogImageUrl = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;
  const canonical = absoluteUrl(
    `/blog/${decodeURIComponent(category)}/${decodedSlug}`,
  );

  return {
    title,
    description,
    keywords: post.keywords,
    alternates: {
      canonical,
      languages: { "ar-SA": canonical, "x-default": canonical },
    },
    openGraph: {
      type: "article",
      locale: "ar_SA",
      url: canonical,
      title,
      description,
      publishedTime: post.publishedAt,
      authors: post.authorName ? [post.authorName] : undefined,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

function slugifyHeading(text: string): string {
  return text
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await client.fetch<Post>(POST_QUERY, { slug: decodedSlug });

  if (!post) {
    notFound();
  }

  const authorDisplayName = post.author?.name || post.authorName;
  const authorDisplayRole = post.author?.role || post.authorRole;
  const wordCount = computeWordCount(post.body);
  const readTime = post.readTime || Math.max(1, Math.round(wordCount / 200));
  const headings = post.tocAuto ? extractHeadings(post.body) : [];
  const postPath = `/blog/${category}/${decodedSlug}`;

  return (
    <article className="min-h-screen bg-white pt-24">
      <JsonLd post={post} slug={decodedSlug} categorySlug={category} />
      <BlogPostJsonLd
        url={postPath}
        name={post.seoTitle || post.title}
        description={post.metaDescription || post.featuredAnswer || ""}
        articleType={post.articleType}
        howToSteps={post.howToSteps}
        postFaqs={post.postFaqs}
        image={post.ogImage || post.mainImage}
      />
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
              {post.publishedAt && (
                <span className="flex items-center">
                  <Calendar className="ml-1 h-4 w-4" />
                  نُشر: {new Date(post.publishedAt).toLocaleDateString("ar-SA")}
                </span>
              )}
              {post.lastReviewedAt && (
                <span className="flex items-center text-emerald-700">
                  <RotateCw className="ml-1 h-4 w-4" />
                  آخر مراجعة:{" "}
                  {new Date(post.lastReviewedAt).toLocaleDateString("ar-SA")}
                </span>
              )}
              <span className="flex items-center">
                <Clock className="ml-1 h-4 w-4" />
                {readTime} دقيقة قراءة
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              {post.title}
            </h1>

            {authorDisplayName && (
              <div className="flex items-center">
                {post.author?.photo ? (
                  <Img
                    src={post.author.photo}
                    alt={authorDisplayName}
                    fill={false}
                    width={48}
                    height={48}
                    className="ml-4 h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-primary-100 text-primary-700 ml-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                    {authorDisplayName?.[0]}
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{authorDisplayName}</p>
                  <p className="text-sm text-gray-500">{authorDisplayRole}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {post.featuredAnswer && (
        <section className="container mx-auto px-4 pt-8">
          <div className="mx-auto max-w-4xl">
            <aside
              className="rounded-xl border-r-4 border-indigo-500 bg-indigo-50 p-6"
              role="note"
              aria-label="إجابة سريعة"
            >
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-indigo-700" />
                <span className="text-sm font-bold text-indigo-700">
                  الإجابة باختصار
                </span>
              </div>
              <p className="text-lg leading-relaxed text-indigo-950">
                {post.featuredAnswer}
              </p>
            </aside>
          </div>
        </section>
      )}

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
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 1024px"
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
                  {headings.length > 0 && (
                    <nav
                      aria-label="جدول المحتويات"
                      className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5"
                    >
                      <p className="mb-3 text-sm font-bold text-gray-900">
                        محتويات المقال
                      </p>
                      <ol className="list-decimal space-y-1 pr-5 text-sm text-indigo-700">
                        {headings.map((h) => (
                          <li
                            key={h.id}
                            className={h.level === 3 ? "mr-4" : ""}
                          >
                            <a
                              href={`#${h.id}`}
                              className="hover:underline"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  {post.articleType === "HowTo" &&
                    post.howToSteps &&
                    post.howToSteps.length > 0 && (
                      <HowToStepsBlock steps={post.howToSteps} />
                    )}

                  <PortableText
                    value={post.body}
                    components={{
                      block: {
                        h2: ({ children, value }) => {
                          const text = Array.isArray(value?.children)
                            ? value.children
                                .map((c) =>
                                  "text" in c && typeof c.text === "string"
                                    ? c.text
                                    : "",
                                )
                                .join("")
                                .trim()
                            : "";
                          const id = text ? slugifyHeading(text) : undefined;
                          return (
                            <h2
                              id={id}
                              className="mb-8 rounded-lg border-r-4 border-indigo-600 bg-indigo-50 p-6 text-2xl font-bold scroll-mt-24"
                            >
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children, value }) => {
                          const text = Array.isArray(value?.children)
                            ? value.children
                                .map((c) =>
                                  "text" in c && typeof c.text === "string"
                                    ? c.text
                                    : "",
                                )
                                .join("")
                                .trim()
                            : "";
                          const id = text ? slugifyHeading(text) : undefined;
                          return (
                            <h3
                              id={id}
                              className="mb-4 mt-8 text-xl font-bold text-gray-900 scroll-mt-24"
                            >
                              {children}
                            </h3>
                          );
                        },
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
                              sizes="(max-width: 1024px) 100vw, 720px"
                            />
                          );
                        },
                        infoCallout: InfoCalloutBlock,
                        comparisonTable: ComparisonTableBlock,
                        internalServiceLink: InternalServiceLinkBlock,
                        embeddedFaq: EmbeddedFaqBlock,
                      },
                    }}
                  />

                  {post.postFaqs && post.postFaqs.length > 0 && (
                    <EmbeddedFaqBlock
                      value={{
                        heading: "الأسئلة الشائعة",
                        items: post.postFaqs,
                      }}
                    />
                  )}

                  {/* Keywords Section */}
                  {post.keywords && post.keywords.length > 0 && (
                    <div className="mt-8 border-t pt-6">
                      <h3 className="mb-3 text-sm font-bold text-gray-900">
                        الكلمات الدلالية
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
                      {post.author?.photo ? (
                        <Img
                          src={post.author.photo}
                          alt={authorDisplayName || ""}
                          fill={false}
                          width={80}
                          height={80}
                          className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                        />
                      ) : (
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                          <User className="h-10 w-10 text-indigo-600" />
                        </div>
                      )}
                      <h3 className="mb-2 text-lg">{authorDisplayName}</h3>
                      <p className="mb-4 text-sm text-gray-600">
                        {authorDisplayRole}
                      </p>
                      <hr />
                      <p className="mt-4 text-sm leading-relaxed text-gray-600">
                        {post.author?.bio ||
                          "فريق متخصص من الخبراء في مجال الخدمات المنزلية، نقدم لكم أفضل النصائح والإرشادات المتخصصة."}
                      </p>
                      {post.author?.expertise &&
                        post.author.expertise.length > 0 && (
                          <div className="mt-4 flex flex-wrap justify-center gap-1">
                            {post.author.expertise.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      {post.author?.yearsExperience ? (
                        <p className="mt-3 text-xs text-gray-500">
                          {post.author.yearsExperience}+ سنوات خبرة
                        </p>
                      ) : null}
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
