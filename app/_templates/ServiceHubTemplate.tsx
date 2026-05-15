import Link from "next/link";
import { Img } from "@/components/Image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SubServiceCard } from "@/components/SubServiceCard";
import { ImageCarousel } from "@/components/ImageCarousel";
import {
  Shield,
  Clock,
  Users,
  Award,
  CheckCircle,
  MapPin,
  Phone,
} from "lucide-react";
import ServiceJsonLd from "@/app/_components/ServiceJsonLd";
import LocalBusinessJsonLd from "@/app/_components/LocalBusinessJsonLd";
import FaqJsonLd from "@/app/_components/FaqJsonLd";
import BreadcrumbJsonLd from "@/app/_components/BreadcrumbJsonLd";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import RelatedPostsSection, { type RelatedPost } from "./RelatedPostsSection";
import { themes } from "./theme";
import { cities } from "@/app/lib/locations";
import type { Service } from "@/app/lib/services";
import { buildServiceCitySlug } from "@/app/lib/slug-registry";
import { business, telLink } from "@/app/lib/business";

interface ServiceHubTemplateProps {
  service: Service;
  relatedPosts?: RelatedPost[];
}

export default function ServiceHubTemplate({
  service,
  relatedPosts,
}: ServiceHubTemplateProps) {
  const t = themes[service.colorTheme];
  const pageUrl = `/${service.hubSlug}`;

  return (
    <main className="flex-1">
      <ServiceJsonLd
        name={service.titleAr}
        description={service.shortDescriptionAr}
        image={service.galleryImages[0]?.src ?? business.defaultLogoPath}
        url={pageUrl}
      />
      <LocalBusinessJsonLd
        pageUrl={pageUrl}
        description={service.shortDescriptionAr}
      />
      <FaqJsonLd faqs={service.hubFaqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: service.hubTitleAr, path: pageUrl },
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
                {service.titleAr}
              </Badge>
              <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
                {service.hubTitleAr}
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {service.longDescriptionAr}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className={`${t.ctaBg} ${t.ctaHover}`}
                  asChild
                >
                  <Link href={telLink()}>
                    <Phone className="ml-2 h-5 w-5" />
                    <span>اتصل الآن</span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  عرض الخدمات
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Img
                  src={service.galleryImages[0]?.src ?? ""}
                  alt={service.titleAr}
                  className="h-[400px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              لماذا تختار {business.nameAr}؟
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                { icon: Shield, title: "ضمان شامل", desc: "ضمان حقيقي على العمل والمواد" },
                { icon: Clock, title: "خدمة 24/7", desc: "متاحون على مدار الساعة للطوارئ" },
                { icon: Users, title: "فنيون خبراء", desc: "فريق متخصص بخبرة عملية طويلة" },
                { icon: Award, title: "جودة معتمدة", desc: "نلتزم بالمعايير السعودية" },
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="text-center">
                    <div
                      className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${t.pillBg}`}
                    >
                      <Icon className={`h-8 w-8 ${t.iconText}`} />
                    </div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {f.title}
                    </h3>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sub-services grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              تخصصاتنا في {service.titleAr}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              نقدم خدمات متكاملة تشمل كل ما تحتاجه
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.subServices.map((sub) => (
              <Link key={sub.slug} href={`/${sub.slug}`} className="block">
                <SubServiceCard
                  title={sub.titleAr}
                  subtitle={sub.shortAr}
                  features={sub.techniques.slice(0, 4)}
                  image={sub.heroImage}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {service.galleryImages.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                معرض أعمالنا
              </h2>
            </div>
            <ImageCarousel
              slides={service.galleryImages}
              autoPlay={true}
              height="h-[400px]"
              overlayContent={false}
            />
          </div>
        </section>
      )}

      {/* Cities grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {service.titleAr} في جميع مدن المملكة
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              اختر مدينتك للحصول على خدمات محلية متخصصة
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {cities.map((city) => (
              <Card
                key={city.slug}
                className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/${buildServiceCitySlug(service, city)}`}>
                  <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                    <MapPin className={`h-6 w-6 ${t.iconText}`} />
                    <h3 className="text-lg font-bold text-gray-900">
                      {city.nameAr}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {service.titleAr}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title={`الأسئلة الشائعة عن ${service.titleAr}`}
        items={service.hubFaqs}
      />

      {relatedPosts && relatedPosts.length > 0 && (
        <RelatedPostsSection
          posts={relatedPosts}
          title={`مقالات في ${service.titleAr}`}
          subtitle="نصائح وإرشادات يجب أن تعرفها قبل طلب الخدمة"
        />
      )}

      <CtaSection
        title={`اطلب ${service.titleAr} الآن`}
        subtitle="فريقنا جاهز للمساعدة في أي مدينة بالمملكة"
        theme={service.colorTheme}
      />
    </main>
  );
}
