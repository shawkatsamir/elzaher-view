import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuFacebook,
  LuTwitter,
  LuInstagram,
} from "react-icons/lu";
import Link from "next/link";
import { services } from "@/app/lib/services";
import { cities } from "@/app/lib/locations";
import { buildServiceCitySlug } from "@/app/lib/slug-registry";
import { business, telLink } from "@/app/lib/business";

const addressLine = `${business.address.streetAr}، ${business.address.cityAr}، ${business.address.regionAr}`;

export function Footer() {
  const socialMedia = [
    { name: "فيسبوك", href: business.social.facebook, icon: <LuFacebook /> },
    { name: "تويتر", href: business.social.twitter, icon: <LuTwitter /> },
    { name: "إنستغرام", href: business.social.instagram, icon: <LuInstagram /> },
  ].filter((s) => Boolean(s.href));

  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "اعمالنا", href: "/works" },
    { name: "المدونة", href: "/blog" },
    { name: "خريطة الموقع", href: "/خريطة-الموقع" },
  ];

  // For the cities column, link each city to the first (primary) service's city page —
  // this gives Google a city anchor and lets the user pick their service from there.
  const primaryService = services[0];

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">
              {business.nameAr}
            </h3>
            <p className="leading-relaxed text-gray-300">
              نقدم أفضل الخدمات المنزلية بجودة عالية ومهنية متميزة. فريقنا
              المتخصص جاهز لخدمتكم على مدار الساعة في جميع مدن المملكة.
            </p>

            <div className="flex space-x-4 space-x-reverse">
              {socialMedia.map((item) => (
                <Link
                  key={item.name}
                  href={item.href!}
                  aria-label={item.name}
                  className="text-gray-400 transition-colors hover:text-blue-400"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">خدماتنا</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.hubSlug}`}
                    className="text-right text-gray-300 transition-colors hover:text-white"
                  >
                    {service.hubTitleAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">
              {primaryService.titleAr} في مدن المملكة
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${buildServiceCitySlug(primaryService, city)}`}
                    className="text-right text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {primaryService.citySlugPrefix} {city.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">
              معلومات التواصل
            </h4>
            <div className="space-y-3">
              <Link
                href={telLink()}
                className="flex items-center space-x-3 space-x-reverse text-gray-300 hover:text-white"
              >
                <LuPhone className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <span>{business.phoneDisplay}</span>
              </Link>
              <Link
                href={`mailto:${business.email}`}
                className="flex items-center space-x-3 space-x-reverse text-gray-300 hover:text-white"
              >
                <LuMail className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <span>{business.email}</span>
              </Link>
              <div className="flex items-start space-x-3 space-x-reverse">
                <LuMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-gray-300">{addressLine}</span>
              </div>
            </div>

            <div className="pt-4">
              <h5 className="mb-2 text-sm font-semibold text-blue-400">
                روابط سريعة
              </h5>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {business.nameAr}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
