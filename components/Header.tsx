"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);

  const services = [
    { name: "خدمات التنظيف", href: "/services/cleaning" },
    { name: "خدمات الصيانة", href: "/services/maintenance" },
    { name: "خدمات السباكة", href: "/services/plumbing" },
    { name: "تنسيق الحدائق", href: "/services/landscaping" },
    { name: "خدمات المقاولات", href: "/services/contracting" },
    { name: "خدمات النقل", href: "/services/fernature" },
    { name: "خدمات العزل", href: "/services/insulation" },
  ];

  const isCurrentPage = (path: string) => pathname === path;
  const isServicePage = pathname.startsWith("/services");

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              شركة الزاهر فيو
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

              {/* Services Dropdown */}
              <div className="group relative">
                <button
                  className={`flex items-center transition-colors ${
                    isServicePage
                      ? "font-semibold text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  الخدمات
                  <ChevronDown className="mr-1 h-4 w-4" />
                </button>

                <div className="invisible absolute right-0 z-50 mt-2 w-64 rounded-lg bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="py-2">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        className="block w-full px-4 py-2 text-right text-gray-700 transition-colors hover:bg-gray-50 hover:text-blue-600"
                      >
                        {service.name}
                      </Link>
                    ))}
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
                  isCurrentPage("/blog")
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
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
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

              {/* Mobile Services */}
              <div>
                <button
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 transition-colors ${
                    isServicePage
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  onClick={toggleServices}
                >
                  الخدمات
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="mt-1 space-y-1 pr-4">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full rounded-md px-3 py-2 text-right text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
                      >
                        {service.name}
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
                  isCurrentPage("/blog")
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                المدونة
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
