"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type BreadcrumbProps = {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
};

const slugMap: { [key: string]: string } = {
  works: "أعمالنا",
  services: "الخدمات",
  blog: "المدونة",
  cleaning: "خدمات التنظيف",
  contracting: "المقاولات العامة",
  fernature: "نقل العفش",
  insulation: "خدمات العزل",
  landscaping: "تنسيق الحدائق",
  maintenance: "خدمات الصيانة",
  plumbing: "السباكة",
};

const Breadcrumbs = ({
  homeElement = "الرئيسية",
  separator = <span className="mx-2 text-gray-400"> / </span>,
  containerClasses = "flex py-5 overflow-x-auto bg-white rounded-lg px-4 shadow-sm",
  listClasses = "hover:text-blue-500 font-medium text-gray-700 whitespace-nowrap transition-colors",
  activeClasses = "text-blue-600 cursor-default font-semibold whitespace-nowrap",
}: BreadcrumbProps) => {
  const paths = usePathname();
  const pathNames = paths
    .split("/")
    .filter((path) => path)
    .map((path) => decodeURIComponent(path));

  const getDisplayTitle = (slug: string): string => {
    if (slugMap[slug]) {
      return slugMap[slug];
    }

    const formattedSlug = slug.replace(/-/g, " ");

    return formattedSlug
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav aria-label="breadcrumb" className="w-full">
      <ol className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/"} aria-label="الرئيسية">
            {homeElement}
          </Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const itemTitle = getDisplayTitle(link);
          const isLast = index === pathNames.length - 1;

          return (
            <React.Fragment key={index}>
              <li className={isLast ? activeClasses : listClasses}>
                {isLast ? (
                  <span aria-current="page">{itemTitle}</span>
                ) : (
                  <Link href={href}>{itemTitle}</Link>
                )}
              </li>
              {!isLast && separator}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
