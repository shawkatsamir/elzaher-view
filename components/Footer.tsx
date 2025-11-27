import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuFacebook,
  LuTwitter,
  LuInstagram,
  LuLinkedin,
} from "react-icons/lu";
import Link from "next/link";

export function Footer() {
  const services = [
    { name: "خدمات التنظيف", href: "/services/cleaning" },
    { name: "خدمات الصيانة", href: "/services/maintenance" },
    { name: "خدمات السباكة", href: "/services/plumbing" },
    { name: "تنسيق الحدائق", href: "/services/landscaping" },
    { name: "خدمات المقاولات", href: "/services/contracting" },
    { name: "خدمات النقل", href: "/services/moving" },
    { name: "خدمات العزل", href: "/services/insulation" },
  ];

  const socialMedia = [
    {
      name: "فيسبوك",
      href: "https://facebook.com",
      icon: <LuFacebook />,
      classsName: "text-gray-400 hover:text-blue-400 transition-colors",
    },
    {
      name: "تويتر",
      href: "https://twitter.com",
      icon: <LuTwitter />,
      className: "",
    },
    { name: "إنستغرام", href: "https://instagram.com", icon: <LuInstagram /> },
    { name: "لينكدإن", href: "https://linkedin.com", icon: <LuLinkedin /> },
  ];

  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "اعمالنا", href: "/works" },
    { name: "المدونة", href: "/blog" },
  ];

  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">
              شركة الزاهر فيو
            </h3>
            <p className="leading-relaxed text-gray-300">
              نقدم أفضل الخدمات المنزلية بجودة عالية و مهنية متميزة. فريفنا
              المتخصص جاهز لخدمتكم علي مدار الساعة
            </p>

            <div className="flex space-x-4 space-x-reverse">
              {socialMedia.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-400 transition-colors hover:text-blue-400"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-right text-gray-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">خدماتنا</h4>
            <ul className="space-y-2">
              {services.map((service, index) =>
                service.href ? (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-right text-gray-300 transition-colors hover:text-white"
                    >
                      {service.name}
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">
              معلومات التواصل
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <LuPhone className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-gray-300">+966590123782</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <LuMail className="h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-gray-300">info@alzaherview.com</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <LuMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <span className="text-gray-300">
                  الرياض، المملكة العربية السعودية
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
