"use client";

import { useState } from "react";
import Link from "next/link";
import { Img } from "@/components/Image";
import { Calendar, MapPin, ArrowLeft, ImageIcon } from "lucide-react";

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
}

export interface WorkCard {
  id: string;
  title: string;
  slug: string;
  mainImage: SanityImage | null;
  summary: string;
  resultHighlight: string;
  clientType: string;
  cityLabel: string;
  serviceLabel: string;
  serviceSlug: string;
  dateLabel: string;
}

interface ServiceOption {
  slug: string;
  label: string;
}

export default function WorksGrid({
  cards,
  serviceOptions,
}: {
  cards: WorkCard[];
  serviceOptions: ServiceOption[];
}) {
  const [active, setActive] = useState<string>("all");
  const filtered =
    active === "all" ? cards : cards.filter((c) => c.serviceSlug === active);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {serviceOptions.length > 1 && (
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                active === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              جميع المشاريع
            </button>
            {serviceOptions.map((opt) => (
              <button
                key={opt.slug}
                type="button"
                onClick={() => setActive(opt.slug)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  active === opt.slug
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">
              لا توجد مشاريع بعد
            </h3>
            <p className="text-gray-500">سيتم إضافة المشاريع المنفذة قريباً.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/works/${c.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-200">
                  {c.mainImage ? (
                    <Img
                      src={c.mainImage}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-indigo-300" />
                    </div>
                  )}
                  {c.serviceLabel && (
                    <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur-sm">
                      {c.serviceLabel}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    {c.cityLabel && (
                      <span className="flex items-center">
                        <MapPin className="ml-1 h-3 w-3" />
                        {c.cityLabel}
                      </span>
                    )}
                    {c.dateLabel && (
                      <span className="flex items-center">
                        <Calendar className="ml-1 h-3 w-3" />
                        {c.dateLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-3 text-lg font-bold leading-snug text-gray-900 group-hover:text-indigo-600">
                    {c.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
                    {c.summary}
                  </p>
                  <span className="mt-auto flex items-center text-sm font-medium text-indigo-600">
                    عرض تفاصيل المشروع
                    <ArrowLeft className="mr-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
