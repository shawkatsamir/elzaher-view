import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/app/lib/business";
import { getService } from "@/app/lib/services";
import { getCity } from "@/app/lib/locations";
import { Briefcase, MapPin, ShieldCheck } from "lucide-react";
import WorksGrid, { type WorkCard } from "./_components/works-grid";

export const revalidate = 60;

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
}

interface ProjectListItem {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  summary?: string;
  completedAt?: string;
  neighborhood?: string;
  clientType?: string;
  resultHighlight?: string;
  relatedServices?: string[];
  relatedCities?: string[];
}

const canonical = absoluteUrl("/works");
const description =
  "نماذج من مشاريعنا المنفذة في العزل والسباكة والصيانة والتنظيف وتنسيق الحدائق وغيرها بمختلف مدن السعودية، موثقة بالصور والخطوات والنتائج الحقيقية.";

export const metadata: Metadata = {
  title: "أعمالنا | مشاريع منفذة بالصور والنتائج - شركة الزاهر فيو",
  description,
  alternates: {
    canonical,
    languages: { "ar-SA": canonical, "x-default": canonical },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: canonical,
    title: "أعمالنا | مشاريع منفذة بالصور والنتائج",
    description,
  },
};

export default async function WorksPage() {
  const projects = await client.fetch<ProjectListItem[]>(PROJECTS_QUERY);

  const cards: WorkCard[] = projects.map((p) => {
    const serviceSlug = p.relatedServices?.[0];
    const citySlug = p.relatedCities?.[0];
    return {
      id: p._id,
      title: p.title,
      slug: p.slug.current,
      mainImage: p.mainImage ?? null,
      summary: p.summary || p.resultHighlight || "",
      resultHighlight: p.resultHighlight || "",
      clientType: p.clientType || "",
      cityLabel: citySlug ? getCity(citySlug)?.nameAr || "" : "",
      serviceLabel: serviceSlug
        ? getService(serviceSlug)?.titleAr || serviceSlug
        : "",
      serviceSlug: serviceSlug || "",
      dateLabel: p.completedAt
        ? new Date(p.completedAt).toLocaleDateString("ar-SA", {
            year: "numeric",
            month: "long",
          })
        : "",
    };
  });

  const serviceOptions = Array.from(
    new Map(
      cards
        .filter((c) => c.serviceSlug)
        .map((c) => [c.serviceSlug, c.serviceLabel]),
    ).entries(),
  ).map(([slug, label]) => ({ slug, label }));

  const cityCount = new Set(
    cards.map((c) => c.cityLabel).filter(Boolean),
  ).size;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="relative bg-gradient-to-br from-indigo-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
              أعمالنا ومشاريعنا المنفذة
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
              نماذج حقيقية من مشاريع أنجزها فريقنا في مختلف مدن المملكة، موثقة
              بالصور والخطوات والنتائج. كل مشروع دراسة حالة تشرح التحدي والحل
              والنتيجة النهائية.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Briefcase className="ml-2 h-5 w-5 text-indigo-500" />
                <span>{cards.length} مشروع منفذ</span>
              </div>
              {cityCount > 0 && (
                <div className="flex items-center">
                  <MapPin className="ml-2 h-5 w-5 text-green-500" />
                  <span>{cityCount} مدينة نخدمها</span>
                </div>
              )}
              <div className="flex items-center">
                <ShieldCheck className="ml-2 h-5 w-5 text-blue-500" />
                <span>ضمان على جميع الأعمال</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WorksGrid cards={cards} serviceOptions={serviceOptions} />
    </div>
  );
}
