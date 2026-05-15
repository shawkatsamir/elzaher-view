import Link from "next/link";
import BreadcrumbJsonLd from "@/app/_components/BreadcrumbJsonLd";
import { services } from "@/app/lib/services";
import { cities } from "@/app/lib/locations";
import {
  buildServiceCitySlug,
  buildSubServiceCitySlug,
} from "@/app/lib/slug-registry";

export default function SitemapPageTemplate() {
  return (
    <main className="flex-1 bg-gray-50 py-16">
      <BreadcrumbJsonLd
        items={[
          { name: "الرئيسية", path: "/" },
          { name: "خريطة الموقع", path: "/خريطة-الموقع" },
        ]}
      />

      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            خريطة الموقع
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            جميع صفحات الموقع في مكان واحد — تصفح خدماتنا في كل مدينة بالمملكة.
          </p>
        </header>

        {/* General */}
        <section className="mb-12">
          <h2 className="mb-4 border-b pb-2 text-2xl font-bold text-gray-900">
            عام
          </h2>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <li>
              <Link href="/" className="text-blue-700 hover:underline">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-700 hover:underline">
                المدونة
              </Link>
            </li>
            <li>
              <Link href="/works" className="text-blue-700 hover:underline">
                أعمالنا
              </Link>
            </li>
          </ul>
        </section>

        {/* Per-service section */}
        {services.map((service) => (
          <section
            key={service.slug}
            className="mb-12 rounded-2xl bg-white p-6 shadow-sm"
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              <Link
                href={`/${service.hubSlug}`}
                className="hover:text-blue-700 hover:underline"
              >
                {service.hubTitleAr}
              </Link>
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500">
                  حسب المدينة
                </h3>
                <ul className="grid grid-cols-2 gap-1 text-sm">
                  {cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/${buildServiceCitySlug(service, city)}`}
                        className="text-blue-700 hover:underline"
                      >
                        {service.citySlugPrefix} {city.nameAr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-bold text-gray-500">
                  التخصصات
                </h3>
                <ul className="space-y-3 text-sm">
                  {service.subServices.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/${sub.slug}`}
                        className="font-semibold text-blue-700 hover:underline"
                      >
                        {sub.titleAr}
                      </Link>
                      <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-0.5 pr-3 text-xs text-gray-600">
                        {cities.map((city) => (
                          <li key={city.slug}>
                            <Link
                              href={`/${buildSubServiceCitySlug(sub, city)}`}
                              className="hover:text-blue-700 hover:underline"
                            >
                              {sub.titleAr} {city.nameAr}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
