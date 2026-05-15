"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/app/lib/services";
import { cities } from "@/app/lib/locations";
import { buildServiceCitySlug } from "@/app/lib/slug-registry";
import { business } from "@/app/lib/business";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobilePanel, setOpenMobilePanel] = useState<
    "services" | "cities" | null
  >(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenMobilePanel(null);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isCurrentPage = (path: string) => pathname === path;

  // Treat any Arabic-slug landing page (i.e. anything not under /blog, /works, /studio)
  // as a "services" area for the active-state highlight.
  const isServicesArea =
    pathname !== "/" &&
    !pathname.startsWith("/blog") &&
    !pathname.startsWith("/works") &&
    !pathname.startsWith("/studio");

  // For the mega-menu cities column: link each city to the first (primary) service.
  const primaryService = services[0];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              {business.nameAr}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center md:flex">
            <div className="flex items-center space-x-8 space-x-reverse">
              <Link
                href="/"
                className={`transition-colors ${
                  isCurrentPage("/")
                    ? "font-semibold text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                الرئيسية
              </Link>

              {/* Services Mega-Menu */}
              <div className="group relative">
                <button
                  className={`flex items-center transition-colors ${
                    isServicesArea
                      ? "font-semibold text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  الخدمات
                  <ChevronDown className="mr-1 h-4 w-4" />
                </button>

                <div className="invisible absolute right-0 z-50 mt-2 w-[640px] rounded-lg bg-white opacity-0 shadow-xl ring-1 ring-gray-200 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div>
                      <h4 className="mb-2 border-b pb-2 text-sm font-bold text-gray-500">
                        خدماتنا
                      </h4>
                      <ul className="space-y-1">
                        {services.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/${s.hubSlug}`}
                              className="block rounded-md px-3 py-2 text-right text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                            >
                              {s.hubTitleAr}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 border-b pb-2 text-sm font-bold text-gray-500">
                        {primaryService.titleAr} في المدن
                      </h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {cities.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/${buildServiceCitySlug(primaryService, c)}`}
                              className="block rounded-md px-3 py-1.5 text-right text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                            >
                              {c.nameAr}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/خريطة-الموقع"
                        className="mt-3 block rounded-md bg-gray-50 px-3 py-2 text-center text-xs font-medium text-blue-700 transition-colors hover:bg-blue-50"
                      >
                        عرض جميع الصفحات (خريطة الموقع)
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/works"
                className={`transition-colors ${
                  isCurrentPage("/works")
                    ? "font-semibold text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                أعمالنا
              </Link>

              <Link
                href="/blog"
                className={`transition-colors ${
                  pathname.startsWith("/blog")
                    ? "font-semibold text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                المدونة
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600 md:hidden"
            onClick={toggleMenu}
            aria-label="القائمة"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="max-h-[80vh] overflow-y-auto border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-1 px-2 pb-4 pt-2">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full rounded-md px-3 py-2 text-right transition-colors ${
                  isCurrentPage("/")
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                الرئيسية
              </Link>

              {/* Mobile: Services */}
              <div>
                <button
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors ${
                    isServicesArea
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={() =>
                    setOpenMobilePanel(
                      openMobilePanel === "services" ? null : "services",
                    )
                  }
                >
                  الخدمات
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openMobilePanel === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMobilePanel === "services" && (
                  <div className="mt-1 space-y-1 pr-4">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.hubSlug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full rounded-md px-3 py-2 text-right text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                      >
                        {s.hubTitleAr}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile: Cities */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                  onClick={() =>
                    setOpenMobilePanel(
                      openMobilePanel === "cities" ? null : "cities",
                    )
                  }
                >
                  مدن الخدمة
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openMobilePanel === "cities" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openMobilePanel === "cities" && (
                  <div className="mt-1 grid grid-cols-2 gap-1 pr-4">
                    {cities.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/${buildServiceCitySlug(primaryService, c)}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-md px-3 py-2 text-right text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                      >
                        {c.nameAr}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/works"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full rounded-md px-3 py-2 text-right transition-colors ${
                  isCurrentPage("/works")
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                أعمالنا
              </Link>

              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full rounded-md px-3 py-2 text-right transition-colors ${
                  pathname.startsWith("/blog")
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                المدونة
              </Link>

              <Link
                href="/خريطة-الموقع"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-md px-3 py-2 text-right text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
              >
                خريطة الموقع
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
