import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "شركة الزاهر فيو",
  description: "",
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
      </body>
    </html>
  );
}
