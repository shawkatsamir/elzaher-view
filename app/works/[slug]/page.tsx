import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY, PROJECT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { absoluteUrl, telLink, whatsappLink } from "@/app/lib/business";
import { getContextualServiceLinks } from "@/app/lib/slug-registry";
import { PortableText } from "@portabletext/react";
import { Img } from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  MapPin,
  Home,
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Lightbulb,
  Quote,
  Star,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import {
  InfoCalloutBlock,
  ComparisonTableBlock,
  InternalServiceLinkBlock,
  EmbeddedFaqBlock,
} from "../../blog/_components/blog-blocks";
import BlogPostJsonLd from "../../blog/_components/blog-post-json-ld";
import ProjectJsonLd from "../_components/project-json-ld";

export const revalidate = 60;

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface AuthorRef {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: SanityImage;
}

interface RelatedProject {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  completedAt?: string;
  summary?: string;
  resultHighlight?: string;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  publishedAt?: string;
  excerpt?: string;
  category?: { title: string; slug: { current: string } };
}

interface Project {
  _id: string;
  _updatedAt: string;
  title: string;
  seoTitle?: string;
  slug: { current: string };
  mainImage?: SanityImage;
  ogImage?: SanityImage;
  gallery?: SanityImage[];
  summary?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  tocAuto?: boolean;
  clientType?: string;
  neighborhood?: string;
  completedAt?: string;
  durationLabel?: string;
  materialsUsed?: string[];
  resultHighlight?: string;
  testimonial?: { quote?: string; author?: string; rating?: number };
  postFaqs?: FaqItem[];
  publishedAt?: string;
  lastReviewedAt?: string;
  author?: AuthorRef;
  relatedServices?: string[];
  relatedCities?: string[];
  keywords?: string[];
  metaDescription?: string;
  relatedProjects?: RelatedProject[];
  relatedPosts?: RelatedPost[];
}

interface ProjectStub {
  slug: { current: string };
}

export async function generateStaticParams() {
  const projects = await client.fetch<ProjectStub[]>(PROJECTS_QUERY);
  return projects
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug.current }));
}

function slugifyHeading(text: string): string {
  return text
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(body: any[] | undefined) {
  if (!Array.isArray(body)) return [];
  const headings: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const block of body) {
    if (block?._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;
    const text = Array.isArray(block.children)
      ? block.children
          .map((c: { text?: string }) => c?.text || "")
          .join("")
          .trim()
      : "";
    if (!text) continue;
    headings.push({
      id: slugifyHeading(text),
      text,
      level: block.style === "h2" ? 2 : 3,
    });
  }
  return headings;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await client.fetch<Project | null>(PROJECT_QUERY, {
    slug: decodedSlug,
  });
  if (!project) return {};

  const title = project.seoTitle || project.title;
  const description =
    project.metaDescription ||
    project.summary ||
    (typeof project.title === "string" ? project.title.slice(0, 160) : "");
  const ogSource = project.ogImage || project.mainImage;
  const ogImageUrl = ogSource
    ? urlFor(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;
  const canonical = absoluteUrl(`/works/${decodedSlug}`);

  return {
    title,
    description,
    keywords: project.keywords,
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
      publishedTime: project.publishedAt,
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

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const project = await client.fetch<Project | null>(PROJECT_QUERY, {
    slug: decodedSlug,
  });

  if (!project) {
    notFound();
  }

  const authorName = project.author?.name || "فريق الزاهر فيو";
  const authorRole =
    project.author?.role || "خبراء الخدمات المنزلية في السعودية";
  const headings = project.tocAuto ? extractHeadings(project.body) : [];
  const serviceGroups = getContextualServiceLinks(
    project.relatedServices,
    project.relatedCities,
  );

  const completedLabel = project.completedAt
    ? new Date(project.completedAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
      })
    : null;

  const facts: { icon: typeof Home; label: string; value: string }[] = [];
  if (project.clientType)
    facts.push({ icon: Home, label: "نوع العقار", value: project.clientType });
  if (project.neighborhood)
    facts.push({ icon: MapPin, label: "الموقع", value: project.neighborhood });
  if (completedLabel)
    facts.push({
      icon: Calendar,
      label: "تاريخ الإنجاز",
      value: completedLabel,
    });
  if (project.durationLabel)
    facts.push({
      icon: Clock,
      label: "مدة التنفيذ",
      value: project.durationLabel,
    });
  if (project.resultHighlight)
    facts.push({
      icon: CheckCircle2,
      label: "النتيجة",
      value: project.resultHighlight,
    });

  return (
    <article className="min-h-screen bg-white pt-24">
      <ProjectJsonLd
        slug={decodedSlug}
        title={project.seoTitle || project.title}
        description={project.metaDescription || project.summary}
        image={project.ogImage || project.mainImage}
        datePublished={project.publishedAt}
        dateModified={project._updatedAt}
        authorName={authorName}
      />
      <BlogPostJsonLd
        url={`/works/${decodedSlug}`}
        name={project.seoTitle || project.title}
        description={project.metaDescription || project.summary || ""}
        postFaqs={project.postFaqs}
        image={project.ogImage || project.mainImage}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/works"
              className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى أعمالنا
            </Link>

            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">
                مشروع منفذ
              </span>
              {project.neighborhood && (
                <span className="flex items-center">
                  <MapPin className="ml-1 h-4 w-4" />
                  {project.neighborhood}
                </span>
              )}
              {completedLabel && (
                <span className="flex items-center">
                  <Calendar className="ml-1 h-4 w-4" />
                  {completedLabel}
                </span>
              )}
              {project.durationLabel && (
                <span className="flex items-center">
                  <Clock className="ml-1 h-4 w-4" />
                  {project.durationLabel}
                </span>
              )}
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Summary callout */}
      {project.summary && (
        <section className="container mx-auto px-4 pt-8">
          <div className="mx-auto max-w-4xl">
            <aside
              className="rounded-xl border-r-4 border-indigo-500 bg-indigo-50 p-6"
              role="note"
              aria-label="ملخص المشروع"
            >
              <div className="mb-2 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-indigo-700" />
                <span className="text-sm font-bold text-indigo-700">
                  ملخص المشروع
                </span>
              </div>
              <p className="text-lg leading-relaxed text-indigo-950">
                {project.summary}
              </p>
            </aside>
          </div>
        </section>
      )}

      {/* Cover image */}
      {project.mainImage && (
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <Img
              src={project.mainImage}
              alt={project.title}
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
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent>
                <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-indigo-600 prose-img:rounded-xl">
                  {headings.length > 0 && (
                    <nav
                      aria-label="جدول المحتويات"
                      className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5"
                    >
                      <p className="mb-3 text-sm font-bold text-gray-900">
                        محتويات الصفحة
                      </p>
                      <ol className="list-decimal space-y-1 pr-5 text-sm text-indigo-700">
                        {headings.map((h) => (
                          <li key={h.id} className={h.level === 3 ? "mr-4" : ""}>
                            <a href={`#${h.id}`} className="hover:underline">
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  <PortableText
                    value={project.body}
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
                          if (!value?.asset?._ref) return null;
                          return (
                            <Img
                              src={value}
                              alt={value.alt || project.title}
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

                  {/* Gallery */}
                  {project.gallery && project.gallery.length > 0 && (
                    <section className="mt-10 not-prose">
                      <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        صور المشروع
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {project.gallery.map((img, i) =>
                          img?.asset?._ref ? (
                            <figure key={i} className="overflow-hidden">
                              <Img
                                src={img}
                                alt={img.alt || `${project.title} - صورة ${i + 1}`}
                                fill
                                containerClassName="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, 480px"
                              />
                              {img.caption && (
                                <figcaption className="mt-2 text-center text-sm text-gray-500">
                                  {img.caption}
                                </figcaption>
                              )}
                            </figure>
                          ) : null,
                        )}
                      </div>
                    </section>
                  )}

                  {/* FAQ */}
                  {project.postFaqs && project.postFaqs.length > 0 && (
                    <EmbeddedFaqBlock
                      value={{
                        heading: "الأسئلة الشائعة",
                        items: project.postFaqs,
                      }}
                    />
                  )}

                  {/* Testimonial */}
                  {project.testimonial?.quote && (
                    <blockquote className="my-10 rounded-xl border border-indigo-100 bg-indigo-50/60 p-6 not-prose">
                      <Quote className="mb-3 h-7 w-7 text-indigo-400" />
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        {project.testimonial.quote}
                      </p>
                      <div className="flex items-center justify-between">
                        {project.testimonial.author && (
                          <cite className="not-italic font-bold text-gray-900">
                            {project.testimonial.author}
                          </cite>
                        )}
                        {project.testimonial.rating ? (
                          <div className="flex items-center gap-0.5">
                            {Array.from({
                              length: project.testimonial.rating,
                            }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </blockquote>
                  )}

                  {/* Related service links (editorial → commercial) */}
                  {serviceGroups.length > 0 && (
                    <div className="mt-8 border-t pt-8 not-prose">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        خدماتنا المتخصصة
                      </h3>
                      <div className="space-y-6">
                        {serviceGroups.map((group) => (
                          <div key={group.primary.url}>
                            <Link
                              href={group.primary.url}
                              className="mb-3 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
                            >
                              {group.primary.title}
                              <ArrowLeft className="mr-2 h-4 w-4" />
                            </Link>
                            <div className="flex flex-wrap gap-2">
                              {group.deep.map((link) => (
                                <Link
                                  key={link.url}
                                  href={link.url}
                                  className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 hover:text-indigo-900"
                                >
                                  {link.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Facts card */}
              {facts.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 flex items-center text-lg font-bold text-gray-900">
                      <Wrench className="ml-2 h-5 w-5 text-indigo-600" />
                      تفاصيل المشروع
                    </h3>
                    <dl className="space-y-4">
                      {facts.map((f) => {
                        const Icon = f.icon;
                        return (
                          <div key={f.label} className="flex items-start gap-3">
                            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
                            <div>
                              <dt className="text-xs text-gray-500">
                                {f.label}
                              </dt>
                              <dd className="font-medium text-gray-900">
                                {f.value}
                              </dd>
                            </div>
                          </div>
                        );
                      })}
                    </dl>
                    {project.materialsUsed &&
                      project.materialsUsed.length > 0 && (
                        <div className="mt-5 border-t pt-4">
                          <p className="mb-2 text-xs text-gray-500">
                            المواد المستخدمة
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.materialsUsed.map((m) => (
                              <span
                                key={m}
                                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              )}

              {/* Author card */}
              <Card>
                <CardContent className="p-6 text-center">
                  {project.author?.photo ? (
                    <Img
                      src={project.author.photo}
                      alt={authorName}
                      fill={false}
                      width={80}
                      height={80}
                      className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
                      {authorName?.[0]}
                    </div>
                  )}
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    {authorName}
                  </h3>
                  <p className="text-sm text-gray-600">{authorRole}</p>
                </CardContent>
              </Card>

              {/* CTA card */}
              <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="mb-3 text-xl">هل تريد مشروعاً مماثلاً؟</h3>
                  <p className="mb-6 text-indigo-100">
                    احصل على معاينة مجانية وعرض سعر مفصل
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="flex items-center space-x-2 space-x-reverse"
                      asChild
                    >
                      <a href={telLink()}>
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
                        href={whatsappLink()}
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

      {/* Related projects */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              مشاريع ذات صلة
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {project.relatedProjects.map((rp) => (
                <Link
                  key={rp._id}
                  href={`/works/${rp.slug.current}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-200">
                    {rp.mainImage && (
                      <Img
                        src={rp.mainImage}
                        alt={rp.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                      {rp.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {rp.summary || rp.resultHighlight}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related posts */}
      {project.relatedPosts && project.relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              مقالات قد تهمك
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {project.relatedPosts.map((rp) => (
                <article
                  key={rp._id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-44 overflow-hidden">
                    {rp.mainImage && (
                      <Img
                        src={rp.mainImage}
                        alt={rp.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
                      {rp.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600">
                      {rp.excerpt}
                    </p>
                    {rp.category && (
                      <Link
                        href={`/blog/${rp.category.slug.current}/${rp.slug.current}`}
                        className="mt-auto flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        اقرأ المقال
                        <ArrowRight className="mr-1 h-3 w-3" />
                      </Link>
                    )}
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
