'use client'

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
    { name: "خدمات النقل", href: "/services/moving" },
    { name: "خدمات العزل", href: "/services/insulation" },
  ];

  const isCurrentPage = (path: string) => pathname === path;
  const isServicePage = pathname.startsWith("/services");

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              شركة الزاهر فيو
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 space-x-reverse">
              <Link
                href="/"
                className={`transition-colors ${
                  isCurrentPage("/")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                الرئيسية
              </Link>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center transition-colors ${
                    isServicePage
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  الخدمات
                  <ChevronDown className="mr-1 h-4 w-4" />
                </button>

                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={service.href}
                        className="block w-full text-right px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
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
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                أعمالنا
              </Link>

              <Link
                href="/blog"
                className={`transition-colors ${
                  isCurrentPage("/blog")
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                المدونة
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
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
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-right px-3 py-2 rounded-md transition-colors ${
                  isCurrentPage("/")
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                الرئيسية
              </Link>

              {/* Mobile Services */}
              <div>
                <button
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-colors ${
                    isServicePage
                      ? "text-blue-600 font-semibold bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
                        className="block w-full text-right px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
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
                className={`block w-full text-right px-3 py-2 rounded-md transition-colors ${
                  isCurrentPage("/works")
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                أعمالنا
              </Link>

              <Link
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-right px-3 py-2 rounded-md transition-colors ${
                  isCurrentPage("/blog")
                    ? "text-blue-600 font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
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
