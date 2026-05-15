import Link from "next/link";
import { Img } from "@/components/Image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SubServiceCard } from "@/components/SubServiceCard";
import { CheckCircle, MapPin, Phone, Shield, Clock } from "lucide-react";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";
import LocalBusinessJsonLd from "@/app/_components/LocalBusinessJsonLd";
import FaqJsonLd from "@/app/_components/FaqJsonLd";
import BreadcrumbJsonLd from "@/app/_components/BreadcrumbJsonLd";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import RelatedPostsSection, { type RelatedPost } from "./RelatedPostsSection";
import { themes } from "./theme";
import {
  cities,
  getNearbyCities,
  type City,
} from "@/app/lib/locations";
import type { Service, FaqItem } from "@/app/lib/services";
import {
  buildServiceCitySlug,
  buildSubServiceCitySlug,
} from "@/app/lib/slug-registry";
import { services } from "@/app/lib/services";
import { business, telLink } from "@/app/lib/business";

interface ServiceCityTemplateProps {
  service: Service;
  city: City;
  relatedPosts?: RelatedPost[];
}

function buildCityFaqs(service: Service, city: City): FaqItem[] {
  return [
    {
      question: `هل تغطون جميع أحياء ${city.nameAr}؟`,
      answer: `نعم، لدينا فرق متنقلة تغطي جميع أحياء ${city.nameAr} وضواحيها، بما في ذلك ${city.neighborhoods.slice(0, 5).join("، ")}، ونصل إليكم في أسرع وقت.`,
    },
    {
      question: `كم تستغرق الاستجابة لطلبات ${service.titleAr} في ${city.nameAr}؟`,
      answer: `فريقنا في ${city.nameAr} يصل عادةً خلال 30 إلى 60 دقيقة من تأكيد الطلب لأي حي داخل المدينة، وأقل في حالات الطوارئ.`,
    },
    ...service.hubFaqs.slice(0, 3),
  ];
}

export default function ServiceCityTemplate({
  service,
  city,
  relatedPosts,
}: ServiceCityTemplateProps) {
  const t = themes[service.colorTheme];
  const slug = buildServiceCitySlug(service, city);
  const pageUrl = `/${slug}`;
  const faqs = buildCityFaqs(service, city);
  const nearbyCities = getNearbyCities(city.slug);

  const otherServicesInCity = services.filter(
    (s) => s.slug !== service.slug,
  );

  return (
    <main className="flex-1">
      <ServiceJsonLd
        name={`${service.titleAr} في ${city.nameAr}`}
        description={`${service.shortDescriptionAr} في ${city.nameAr} وضواحيها. فريق محلي متاح 24/7.`}
        image={service.galleryImages[0]?.src ?? business.defaultLogoPath}
        url={pageUrl}
        areaServedAr={city.nameAr}
      />
      <LocalBusinessJsonLd
        city={city}
        pageUrl={pageUrl}
        description={`${service.titleAr} في ${city.nameAr} — ${service.shortDescriptionAr}`}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: service.hubTitleAr, path: `/${service.hubSlug}` },
          { name: city.nameAr, path: pageUrl },
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
                {service.titleAr} في {city.nameAr}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                أفضل {service.titleAr} في {city.nameAr}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                هل تبحث عن {service.titleAr} موثوقة في {city.nameAr}؟ نوفر لكم
                فريقاً متخصصاً يصلكم في أي حي من أحياء {city.nameAr} بأحدث
                التقنيات وأفضل الأسعار.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className={`${t.ctaBg} ${t.ctaHover}`}
                  asChild
                >
                  <Link href={telLink()}>
                    <Phone className="ml-2 h-5 w-5" />
                    <span>اطلب الآن</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src={service.galleryImages[0]?.src ?? ""}
                  alt={`${service.titleAr} في ${city.nameAr}`}
                  className="h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              {service.titleAr} في {city.nameAr}: تحديات محلية وحلول متخصصة
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {city.localContext}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {service.longDescriptionAr}
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhoods coverage */}
      <section className={`relative overflow-hidden ${t.darkBg} py-16 text-white`}>
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold">
                نغطي جميع أحياء {city.nameAr}
              </h2>
              <p className={`mb-6 text-lg leading-relaxed ${t.outlineText}`}>
                فرقنا المتنقلة في {city.nameAr} جاهزة للوصول إلى أي حي خلال
                أقل من ساعة، نضمن استجابة سريعة وخدمة بأعلى جودة.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {city.neighborhoods.map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span className={t.outlineText}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="mb-4 text-center text-2xl font-bold">
                اتصل بنا في {city.nameAr}
              </h3>
              <p className={`mb-6 text-center ${t.outlineText}`}>
                خدمة طوارئ على مدار الساعة
              </p>
              <Button
                className="w-full bg-white py-6 font-bold text-gray-900 hover:bg-gray-100"
                asChild
              >
                <Link href={telLink()}>{business.phoneDisplay}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services for this city */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              تخصصاتنا في {city.nameAr}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub) => (
              <Link
                key={sub.slug}
                href={`/${buildSubServiceCitySlug(sub, city)}`}
                className="block"
              >
                <SubServiceCard
                  title={`${sub.titleAr} في ${city.nameAr}`}
                  subtitle={sub.shortAr}
                  features={sub.techniques.slice(0, 4)}
                  image={sub.heroImage}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title={`الأسئلة الشائعة عن ${service.titleAr} في ${city.nameAr}`}
        items={faqs}
      />

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                {service.titleAr} في مدن قريبة
              </h2>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {nearbyCities.map((c) => (
                <Card key={c.slug} className="group hover:shadow-lg">
                  <Link href={`/${buildServiceCitySlug(service, c)}`}>
                    <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                      <MapPin className={`h-5 w-5 ${t.iconText}`} />
                      <span className="font-semibold text-gray-900">
                        {service.titleAr} {c.nameAr}
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPostsSection
          posts={relatedPosts}
          title={`مقالات عن ${service.titleAr} في ${city.nameAr}`}
          subtitle="إرشادات الخبراء قبل وأثناء طلب الخدمة"
        />
      )}

      {/* Other services in same city */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              خدمات أخرى في {city.nameAr}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نقدم خدمات شاملة لجميع احتياجاتك المنزلية في {city.nameAr}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {otherServicesInCity.map((s) => (
              <Card
                key={s.slug}
                className="group hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/${buildServiceCitySlug(s, city)}`}>
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <span className="font-semibold text-gray-900">
                      {s.titleAr}
                    </span>
                    <span className="text-xs text-gray-600">
                      في {city.nameAr}
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`هل تحتاج ${service.titleAr} في ${city.nameAr} الآن؟`}
        subtitle="فريق الطوارئ جاهز لخدمتكم على مدار الساعة"
        theme={service.colorTheme}
      />
    </main>
  );
}
