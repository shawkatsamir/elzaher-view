import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Home, MapPin, Phone } from "lucide-react";
import { services } from "@/app/lib/services";
import { cities } from "@/app/lib/locations";
import { buildServiceCitySlug } from "@/app/lib/slug-registry";
import { business, telLink } from "@/app/lib/business";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex-1 bg-gray-50">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          الصفحة التي تبحث عنها غير موجودة
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-600">
          ربما تم نقل الصفحة أو حذفها. تصفح خدماتنا أو اختر مدينتك من القوائم
          أدناه.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="ml-2 h-5 w-5" />
              <span>العودة للرئيسية</span>
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={telLink()}>
              <Phone className="ml-2 h-5 w-5" />
              <span>اتصل بنا {business.phoneDisplay}</span>
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          خدماتنا
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
          {services.map((s) => (
            <Card key={s.slug} className="hover:shadow-md">
              <Link href={`/${s.hubSlug}`}>
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <span className="font-semibold text-gray-900">
                    {s.titleAr}
                  </span>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          خدماتنا حسب المدينة
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {cities.map((c) => {
            const firstService = services[0];
            const target = firstService
              ? `/${buildServiceCitySlug(firstService, c)}`
              : "/";
            return (
              <Card key={c.slug} className="hover:shadow-md">
                <Link href={target}>
                  <CardContent className="flex items-center gap-2 p-4">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold text-gray-900">
                      {c.nameAr}
                    </span>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
