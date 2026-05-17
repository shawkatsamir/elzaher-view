import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import Breadcrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { StickyContactButons } from "@/components/StickyContactButton";
import { business } from "@/app/lib/business";

const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(business.baseUrl),
  title: {
    default: business.nameAr,
    template: `%s | ${business.nameAr}`,
  },
  description:
    `${business.nameAr} تقدم خدمات منزلية شاملة في جميع مدن المملكة العربية السعودية: سباكة، تنظيف، صيانة، عزل، تنسيق حدائق، نقل عفش، ومقاولات عامة.`,
  keywords: [
    business.nameAr,
    business.nameEn,
    "سباكة",
    "تنظيف",
    "صيانة",
    "عزل",
    "تنسيق حدائق",
    "نقل عفش",
    "مقاولات",
    "السعودية",
    "الرياض",
    "جدة",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: business.nameAr,
    countryName: "Saudi Arabia",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  other: {
    "geo.region": "SA-01",
    "geo.placename": "Riyadh, Saudi Arabia",
    "geo.position": "24.7136;46.6753",
    ICBM: "24.7136, 46.6753",
  },
};

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} rtl flex min-h-screen flex-col`}>
        <Header />
        <div className="pt-16">
          <Breadcrumbs />
        </div>
        <main className="flex-1">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
        <Footer />
        <StickyContactButons />
      </body>
    </html>
  );
}
