/**
 * Objective duplicate-content gate for the sub-service×city entries.
 *
 * Concatenates each entry's authored text, builds word-level trigram shingles,
 * and computes pairwise Jaccard similarity on two axes:
 *   - same sub-service across the 10 cities
 *   - the 3 sub-services within each city
 *
 * Exits non-zero if any pair exceeds THRESHOLD, printing the offenders so the
 * weaker entry can be rewritten before publish.
 *
 * Usage:
 *   npx tsx scripts/check-content-similarity.ts plumbing
 *   npx tsx scripts/check-content-similarity.ts            # all services
 */
import type { SubServiceCityContent } from "../app/lib/city-content/types";

const THRESHOLD = 0.55;

const SERVICES = [
  "plumbing",
  "cleaning",
  "maintenance",
  "landscaping",
  "contracting",
  "moving",
  "insulation",
  "parquet",
  "ceramic",
] as const;

function entryText(e: SubServiceCityContent): string {
  return [
    e.cityAdaptedIntro,
    e.techniquesNote,
    e.pricingNote,
    ...e.subServiceCityFaqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
}

/** Strip Arabic diacritics + tatweel, drop punctuation, collapse whitespace. */
function normalize(text: string): string {
  return text
    .replace(/[ً-ْـ]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingles(text: string, n = 3): Set<string> {
  const words = normalize(text).split(" ").filter(Boolean);
  const out = new Set<string>();
  if (words.length < n) {
    if (words.length) out.add(words.join(" "));
    return out;
  }
  for (let i = 0; i <= words.length - n; i++) {
    out.add(words.slice(i, i + n).join(" "));
  }
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const s of a) if (b.has(s)) inter++;
  return inter / (a.size + b.size - inter);
}

function parseKey(key: string): { city: string; service: string; sub: string } {
  const [city, service, sub] = key.split("::");
  return { city, service, sub };
}

async function loadService(
  name: string,
): Promise<Record<string, SubServiceCityContent>> {
  const mod = await import(`../app/lib/city-content/${name}.ts`);
  return mod.subServiceCity ?? {};
}

async function main() {
  const arg = process.argv[2];
  const targets = arg ? [arg] : [...SERVICES];
  let failures = 0;
  let pairsChecked = 0;

  for (const service of targets) {
    const record = await loadService(service);
    const keys = Object.keys(record);
    if (keys.length === 0) {
      console.log(`• ${service}: no entries yet — skipped`);
      continue;
    }

    const sig = new Map<string, Set<string>>();
    for (const k of keys) sig.set(k, shingles(entryText(record[k])));

    // Group keys by sub-service (cross-city axis) and by city (cross-sub axis).
    const bySub = new Map<string, string[]>();
    const byCity = new Map<string, string[]>();
    for (const k of keys) {
      const { city, sub } = parseKey(k);
      (bySub.get(sub) ?? bySub.set(sub, []).get(sub)!).push(k);
      (byCity.get(city) ?? byCity.set(city, []).get(city)!).push(k);
    }

    let worst = 0;
    const check = (group: string[], axis: string) => {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const s = jaccard(sig.get(group[i])!, sig.get(group[j])!);
          pairsChecked++;
          worst = Math.max(worst, s);
          if (s > THRESHOLD) {
            failures++;
            console.error(
              `  ✗ [${axis}] ${(s * 100).toFixed(0)}%  ${group[i]}  ↔  ${group[j]}`,
            );
          }
        }
      }
    };
    for (const g of bySub.values()) check(g, "cross-city");
    for (const g of byCity.values()) check(g, "cross-sub");

    console.log(
      `• ${service}: ${keys.length} entries, worst pair ${(worst * 100).toFixed(0)}%`,
    );
  }

  console.log(
    `\nChecked ${pairsChecked} pairs at threshold ${(THRESHOLD * 100).toFixed(0)}%.`,
  );
  if (failures > 0) {
    console.error(`FAILED: ${failures} pair(s) over threshold.`);
    process.exit(1);
  }
  console.log("PASS: all pairs under threshold.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
