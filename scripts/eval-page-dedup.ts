/**
 * Honest before/after evaluation of the sub-service×city de-duplication.
 *
 * Reconstructs the CONTENT BODY text of a sub-service-city page exactly as the
 * template renders it (excluding constant chrome like nav/footer, which is
 * identical on every page and only adds a fixed offset). Computes pairwise
 * Jaccard similarity across the 10 cities for each sub-service, in two modes:
 *   BEFORE — the page as it rendered before authoring (longAr fallback,
 *            no techniquesNote/pricingNote, shared subService.faqs present)
 *   AFTER  — the page now (authored cityAdaptedIntro/techniquesNote/pricingNote,
 *            subServiceCityFaqs, subService.faqs dropped)
 *
 * Usage: npx tsx scripts/eval-page-dedup.ts plumbing
 */
import { services } from "../app/lib/services";
import { cities } from "../app/lib/locations";
import { subServiceCity, serviceCity } from "../app/lib/city-content/plumbing";
import type { SubServiceCityContent, CityServiceContent } from "../app/lib/city-content/types";

const SERVICE_SLUG = "سباكة";

function norm(t: string): string {
  return t
    .replace(/[ً-ْـ]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function words(t: string): string[] {
  return norm(t).split(" ").filter(Boolean);
}
function shingles(t: string, n = 3): Set<string> {
  const w = words(t);
  const s = new Set<string>();
  if (w.length < n) return w.length ? new Set([w.join(" ")]) : s;
  for (let i = 0; i <= w.length - n; i++) s.add(w.slice(i, i + n).join(" "));
  return s;
}
function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}
function avgPairwise(texts: string[]): number {
  const sigs = texts.map((t) => shingles(t));
  let sum = 0,
    n = 0;
  for (let i = 0; i < sigs.length; i++)
    for (let j = i + 1; j < sigs.length; j++) {
      sum += jaccard(sigs[i], sigs[j]);
      n++;
    }
  return sum / n;
}

const service = services.find((s) => s.slug === SERVICE_SLUG)!;

function buildBefore(subSlug: string, citySlug: string): string {
  const sub = service.subServices.find((s) => s.slug === subSlug)!;
  const city = cities.find((c) => c.slug === citySlug)!;
  const cityContent: CityServiceContent | undefined =
    serviceCity[`${citySlug}::${SERVICE_SLUG}`];
  const parts = [
    `${sub.titleAr} في ${city.nameAr}`,
    `${sub.longAr} نخدم سكان ${city.nameAr} وضواحيها على مدار الساعة.`,
    `كيف ننفذ ${sub.titleAr} في ${city.nameAr}`,
    ...sub.techniques,
    `لماذا تختلف ${sub.titleAr} في ${city.nameAr}؟`,
    cityContent?.challenges ?? city.localContext,
    ...city.neighborhoods.slice(0, 9),
    `الأسئلة الشائعة حول ${sub.titleAr} في ${city.nameAr}`,
    `هل تقدمون خدمة ${sub.titleAr} في جميع أحياء ${city.nameAr}؟`,
    `نعم، فرقنا تغطي جميع أحياء ${city.nameAr} بما فيها ${city.neighborhoods.slice(0, 4).join("، ")}، ونصل إليكم في أسرع وقت.`,
    ...(cityContent ? [cityContent.cityFaqs[0].question, cityContent.cityFaqs[0].answer] : []),
    ...sub.faqs.flatMap((f) => [f.question, f.answer]),
    `خدمات ${service.titleAr} الأخرى في ${city.nameAr}`,
    ...service.subServices.filter((s) => s.slug !== subSlug).flatMap((s) => [s.titleAr, s.shortAr]),
  ];
  return parts.join(" ");
}

function buildAfter(subSlug: string, citySlug: string): string {
  const sub = service.subServices.find((s) => s.slug === subSlug)!;
  const city = cities.find((c) => c.slug === citySlug)!;
  const cityContent: CityServiceContent | undefined =
    serviceCity[`${citySlug}::${SERVICE_SLUG}`];
  const subC: SubServiceCityContent | undefined =
    subServiceCity[`${citySlug}::${SERVICE_SLUG}::${subSlug}`];
  const parts = [
    `${sub.titleAr} في ${city.nameAr}`,
    subC?.cityAdaptedIntro ?? `${sub.longAr} نخدم سكان ${city.nameAr} وضواحيها على مدار الساعة.`,
    `كيف ننفذ ${sub.titleAr} في ${city.nameAr}`,
    ...(subC?.techniquesNote ? [subC.techniquesNote] : []),
    ...sub.techniques,
    ...(subC?.pricingNote ? [`أسعار وتوفر ${sub.titleAr} في ${city.nameAr}`, subC.pricingNote] : []),
    `لماذا تختلف ${sub.titleAr} في ${city.nameAr}؟`,
    cityContent?.challenges ?? city.localContext,
    ...city.neighborhoods.slice(0, 9),
    `الأسئلة الشائعة حول ${sub.titleAr} في ${city.nameAr}`,
    ...(subC?.subServiceCityFaqs ?? []).flatMap((f) => [f.question, f.answer]),
    `هل تقدمون خدمة ${sub.titleAr} في جميع أحياء ${city.nameAr}؟`,
    `نعم، فرقنا تغطي جميع أحياء ${city.nameAr} بما فيها ${city.neighborhoods.slice(0, 4).join("، ")}، ونصل إليكم في أسرع وقت.`,
    ...(cityContent ? [cityContent.cityFaqs[0].question, cityContent.cityFaqs[0].answer] : []),
    ...(subC ? [] : sub.faqs.flatMap((f) => [f.question, f.answer])),
    `خدمات ${service.titleAr} الأخرى في ${city.nameAr}`,
    ...service.subServices.filter((s) => s.slug !== subSlug).flatMap((s) => [s.titleAr, s.shortAr]),
  ];
  return parts.join(" ");
}

const citySlugs = cities.map((c) => c.slug);
console.log(`Service: ${service.titleAr}\n`);
console.log("sub-service              | cross-city sim BEFORE | AFTER | body words (after)");
console.log("-------------------------|-----------------------|-------|-------------------");
for (const sub of service.subServices) {
  const before = avgPairwise(citySlugs.map((c) => buildBefore(sub.slug, c)));
  const after = avgPairwise(citySlugs.map((c) => buildAfter(sub.slug, c)));
  const wc = Math.round(
    citySlugs.map((c) => words(buildAfter(sub.slug, c)).length).reduce((a, b) => a + b, 0) /
      citySlugs.length,
  );
  console.log(
    `${sub.titleAr.padEnd(24)} | ${(before * 100).toFixed(0).padStart(19)}% | ${(after * 100).toFixed(0).padStart(3)}% | ${String(wc).padStart(17)}`,
  );
}

// Cross-sub similarity within a city (internal duplication among the 3 siblings).
console.log("\ncross-sub sim within a city (3 siblings):");
console.log("city          | BEFORE | AFTER");
console.log("--------------|--------|------");
for (const city of cities) {
  const before = avgPairwise(service.subServices.map((s) => buildBefore(s.slug, city.slug)));
  const after = avgPairwise(service.subServices.map((s) => buildAfter(s.slug, city.slug)));
  console.log(
    `${city.slug.padEnd(13)} | ${(before * 100).toFixed(0).padStart(5)}% | ${(after * 100).toFixed(0).padStart(4)}%`,
  );
}
