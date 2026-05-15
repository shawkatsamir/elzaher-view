import Link from "next/link";
import { Img } from "@/components/Image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";
import LocalBusinessJsonLd from "@/app/_components/LocalBusinessJsonLd";
import FaqJsonLd from "@/app/_components/FaqJsonLd";
import BreadcrumbJsonLd from "@/app/_components/BreadcrumbJsonLd";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import RelatedPostsSection, { type RelatedPost } from "./RelatedPostsSection";
import { themes } from "./theme";
import { getNearbyCities, type City } from "@/app/lib/locations";
import type { Service, SubService, FaqItem } from "@/app/lib/services";
import {
  buildServiceCitySlug,
  buildSubServiceCitySlug,
} from "@/app/lib/slug-registry";
import { business, telLink } from "@/app/lib/business";

interface SubServiceCityTemplateProps {
  service: Service;
  subService: SubService;
  city: City;
  relatedPosts?: RelatedPost[];
}

function buildSubServiceCityFaqs(
  subService: SubService,
  city: City,
): FaqItem[] {
  return [
    {
      question: `هل تقدمون خدمة ${subService.titleAr} في جميع أحياء ${city.nameAr}؟`,
      answer: `نعم، فرقنا تغطي جميع أحياء ${city.nameAr} بما فيها ${city.neighborhoods.slice(0, 4).join("، ")}، ونصل إليكم في أسرع وقت.`,
    },
    ...subService.faqs,
  ];
}

export default function SubServiceCityTemplate({
  service,
  subService,
  city,
  relatedPosts,
}: SubServiceCityTemplateProps) {
  const t = themes[service.colorTheme];
  const slug = buildSubServiceCitySlug(subService, city);
  const pageUrl = `/${slug}`;
  const faqs = buildSubServiceCityFaqs(subService, city);
  const nearbyCities = getNearbyCities(city.slug);

  return (
    <main className="flex-1">
      <ServiceJsonLd
        name={`${subService.titleAr} في ${city.nameAr}`}
        description={`${subService.shortAr} في ${city.nameAr}.`}
        image={subService.heroImage}
        url={pageUrl}
        areaServedAr={city.nameAr}
      />
      <LocalBusinessJsonLd
        city={city}
        pageUrl={pageUrl}
        description={`${subService.titleAr} في ${city.nameAr} — ${subService.shortAr}`}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: service.hubTitleAr, path: `/${service.hubSlug}` },
          {
            name: `${service.titleAr} في ${city.nameAr}`,
            path: `/${buildServiceCitySlug(service, city)}`,
          },
          { name: subService.titleAr, path: pageUrl },
        ]}
      />

      {/* Hero */}
      <section
        className={`relative bg-gradient-to-br ${t.heroFrom} ${t.heroTo} py-20`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge
                variant="secondary"
                className={`mb-4 ${t.badgeBg} ${t.badgeText}`}
              >
                {subService.titleAr} • {city.nameAr}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                {subService.titleAr} في {city.nameAr}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {subService.longAr} نخدم سكان {city.nameAr} وضواحيها على مدار
                الساعة.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className={`${t.ctaBg} ${t.ctaHover}`}
                  asChild
                >
                  <Link href={telLink()}>
                    <Phone className="ml-2 h-5 w-5" />
                    <span>اطلب الخدمة الآن</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src={subService.heroImage}
                  alt={`${subService.titleAr} في ${city.nameAr}`}
                  className="h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              كيف ننفذ {subService.titleAr} في {city.nameAr}
            </h2>
            <ul className="space-y-4">
              {subService.techniques.map((tech, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-gray-50 p-4"
                >
                  <CheckCircle
                    className={`mt-1 h-5 w-5 flex-shrink-0 ${t.iconText}`}
                  />
                  <span className="leading-relaxed text-gray-700">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className={`${t.darkBg} py-16 text-white`}>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold">
              لماذا تختلف {subService.titleAr} في {city.nameAr}؟
            </h2>
            <p className={`text-lg leading-relaxed ${t.outlineText}`}>
              {city.localContext}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
              {city.neighborhoods.slice(0, 9).map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className={t.outlineText}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title={`الأسئلة الشائعة حول ${subService.titleAr} في ${city.nameAr}`}
        items={faqs}
      />

      {/* Related sub-services in same city */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات {service.titleAr} الأخرى في {city.nameAr}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.subServices
              .filter((s) => s.slug !== subService.slug)
              .map((sub) => (
                <Card key={sub.slug} className="hover:shadow-lg">
                  <Link href={`/${buildSubServiceCitySlug(sub, city)}`}>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {sub.titleAr} في {city.nameAr}
                      </h3>
                      <p className="text-sm text-gray-600">{sub.shortAr}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPostsSection
          posts={relatedPosts}
          title={`مقالات عن ${subService.titleAr} في ${city.nameAr}`}
          subtitle="نصائح يجب معرفتها"
        />
      )}

      {/* Nearby cities for same sub-service */}
      {nearbyCities.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {subService.titleAr} في مدن قريبة
              </h2>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-3">
              {nearbyCities.map((c) => (
                <Card key={c.slug} className="hover:shadow-lg">
                  <Link href={`/${buildSubServiceCitySlug(subService, c)}`}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <MapPin className={`h-5 w-5 ${t.iconText}`} />
                      <span className="font-semibold text-gray-900">
                        {subService.titleAr} {c.nameAr}
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection
        title={`${subService.titleAr} في ${city.nameAr}`}
        subtitle={`اتصل بنا الآن ${business.phoneDisplay} وفريقنا في طريقه إليك`}
        theme={service.colorTheme}
      />
    </main>
  );
}
