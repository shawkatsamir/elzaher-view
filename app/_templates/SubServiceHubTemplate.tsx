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
import { themes } from "./theme";
import { cities } from "@/app/lib/locations";
import type { Service, SubService } from "@/app/lib/services";
import { buildSubServiceCitySlug } from "@/app/lib/slug-registry";
import { telLink } from "@/app/lib/business";

interface SubServiceHubTemplateProps {
  service: Service;
  subService: SubService;
}

export default function SubServiceHubTemplate({
  service,
  subService,
}: SubServiceHubTemplateProps) {
  const t = themes[service.colorTheme];
  const pageUrl = `/${subService.slug}`;

  return (
    <main className="flex-1">
      <ServiceJsonLd
        name={subService.titleAr}
        description={subService.shortAr}
        image={subService.heroImage}
        url={pageUrl}
      />
      <LocalBusinessJsonLd
        pageUrl={pageUrl}
        description={subService.shortAr}
      />
      <FaqJsonLd faqs={subService.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: service.hubTitleAr, path: `/${service.hubSlug}` },
          { name: subService.titleAr, path: pageUrl },
        ]}
      />

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
                {service.titleAr}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                {subService.titleAr}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {subService.longAr}
              </p>
              <Button size="lg" className={`${t.ctaBg} ${t.ctaHover}`} asChild>
                <Link href={telLink()}>
                  <Phone className="ml-2 h-5 w-5" />
                  <span>اتصل الآن</span>
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src={subService.heroImage}
                  alt={subService.titleAr}
                  className="h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              كيف ننفذ {subService.titleAr}
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

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {subService.titleAr} في جميع مدن المملكة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              اختر مدينتك لخدمة محلية متخصصة
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {cities.map((city) => (
              <Card
                key={city.slug}
                className="group hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/${buildSubServiceCitySlug(subService, city)}`}>
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <MapPin className={`h-6 w-6 ${t.iconText}`} />
                    <h3 className="text-lg font-bold text-gray-900">
                      {city.nameAr}
                    </h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title={`الأسئلة الشائعة حول ${subService.titleAr}`}
        items={subService.faqs}
      />

      <CtaSection
        title={`اطلب ${subService.titleAr} الآن`}
        subtitle="فريقنا جاهز للوصول إليك في أي مدينة"
        theme={service.colorTheme}
      />
    </main>
  );
}
