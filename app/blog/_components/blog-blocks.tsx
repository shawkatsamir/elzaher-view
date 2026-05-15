import Link from "next/link";
import { Img } from "@/components/Image";
import { getPageDescriptor } from "@/app/lib/slug-registry";
import { ChevronDown, Info, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";

interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

const calloutThemes = {
  tip: {
    bg: "bg-emerald-50",
    border: "border-emerald-400",
    text: "text-emerald-900",
    icon: Lightbulb,
    label: "نصيحة",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-500",
    text: "text-amber-900",
    icon: AlertTriangle,
    label: "تحذير",
  },
  note: {
    bg: "bg-slate-50",
    border: "border-slate-400",
    text: "text-slate-900",
    icon: BookOpen,
    label: "ملاحظة",
  },
  info: {
    bg: "bg-indigo-50",
    border: "border-indigo-400",
    text: "text-indigo-900",
    icon: Info,
    label: "معلومة",
  },
} as const;

type CalloutVariant = keyof typeof calloutThemes;

export function InfoCalloutBlock({
  value,
}: {
  value: {
    variant?: CalloutVariant;
    title?: string;
    body: { children?: { text?: string }[] }[];
  };
}) {
  const v = value.variant && calloutThemes[value.variant] ? value.variant : "info";
  const t = calloutThemes[v];
  const Icon = t.icon;
  return (
    <aside
      className={`my-8 rounded-lg border-r-4 ${t.bg} ${t.border} p-5`}
      role="note"
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className={`h-5 w-5 ${t.text}`} />
        <span className={`text-sm font-bold ${t.text}`}>
          {value.title || t.label}
        </span>
      </div>
      <div className={`leading-relaxed ${t.text}`}>
        {value.body?.map((block, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {block.children?.map((c) => c?.text).join("")}
          </p>
        ))}
      </div>
    </aside>
  );
}

export function ComparisonTableBlock({
  value,
}: {
  value: {
    caption?: string;
    headers?: string[];
    rows?: { cells?: string[] }[];
  };
}) {
  if (!value.headers || value.headers.length === 0) return null;
  return (
    <figure className="my-8 overflow-x-auto">
      {value.caption && (
        <figcaption className="mb-3 text-center text-lg font-bold text-gray-900">
          {value.caption}
        </figcaption>
      )}
      <table className="w-full border-collapse text-right text-sm">
        <thead>
          <tr className="bg-indigo-600 text-white">
            {value.headers.map((h, i) => (
              <th key={i} className="border border-indigo-700 p-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.rows?.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.cells?.map((c, j) => (
                <td key={j} className="border border-gray-200 p-3 text-gray-700">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export function InternalServiceLinkBlock({
  value,
}: {
  value: { slug: string; label?: string; description?: string };
}) {
  const descriptor = getPageDescriptor(value.slug);
  if (!descriptor || descriptor.kind === "site-map") {
    return null;
  }
  const label =
    value.label ||
    (descriptor.kind === "service-hub"
      ? descriptor.service.hubTitleAr
      : descriptor.kind === "service-city"
        ? `${descriptor.service.titleAr} في ${descriptor.city.nameAr}`
        : descriptor.kind === "sub-service-hub"
          ? descriptor.subService.titleAr
          : `${descriptor.subService.titleAr} في ${descriptor.city.nameAr}`);
  return (
    <Link
      href={`/${value.slug}`}
      className="my-6 flex items-center justify-between gap-4 rounded-xl border border-indigo-200 bg-indigo-50 p-5 transition-colors hover:bg-indigo-100"
    >
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-indigo-600">
          خدمة ذات صلة
        </p>
        <h4 className="text-lg font-bold text-gray-900">{label}</h4>
        {value.description && (
          <p className="mt-1 text-sm text-gray-700">{value.description}</p>
        )}
      </div>
      <ChevronDown className="h-5 w-5 -rotate-90 text-indigo-600" />
    </Link>
  );
}

export function EmbeddedFaqBlock({
  value,
}: {
  value: {
    heading?: string;
    items?: { question: string; answer: string }[];
  };
}) {
  if (!value.items || value.items.length === 0) return null;
  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {value.heading || "الأسئلة الشائعة"}
      </h2>
      <div className="space-y-3">
        {value.items.map((item, i) => (
          <details
            key={i}
            className="group rounded-lg border border-gray-200 bg-white"
          >
            <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900 hover:bg-gray-50">
              {item.question}
              <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="border-t px-4 py-4 leading-relaxed text-gray-700">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HowToStepsBlock({
  steps,
}: {
  steps: { name: string; text: string; image?: SanityImage }[];
}) {
  if (!steps || steps.length === 0) return null;
  return (
    <section className="my-12">
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={i} className="rounded-xl border border-gray-200 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">{step.text}</p>
            {step.image?.asset && (
              <Img
                src={step.image}
                alt={step.name}
                fill
                containerClassName="relative aspect-video w-full overflow-hidden rounded-lg"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
