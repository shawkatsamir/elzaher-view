---
name: city-content
description: Write or revise the Arabic service×city and sub-service×city landing copy in app/lib/city-content/*.ts for Al-Zaher View. Use when adding a new service or city, filling missing entries, rewriting weak/duplicate entries, or when the similarity gate fails. Covers the key format, the differentiation rules that keep 397 SSG pages out of Google's doorway-page bucket, the required local-fact sourcing, and the pre-commit checks.
---

# City Content Authoring

The site generates **397 static pages** from 9 services × 3 sub-services × 10 cities. The
copy that makes each page distinct lives in `app/lib/city-content/<service>.ts`. This is
the only thing standing between the site and a doorway-page demotion — treat every entry
as a page that must justify its own existence.

## The two shapes

`app/lib/city-content/types.ts` defines both. Keys are `::`-joined and **must** match the
slugs in `app/lib/services.ts` / `app/lib/locations.ts` exactly, Arabic included.

```ts
// serviceCity — key: `${citySlug}::${serviceSlug}`   e.g. "riyadh::تنظيف"
{ intro, challenges, whyUs, cityFaqs: FaqItem[] }

// subServiceCity — key: `${citySlug}::${serviceSlug}::${subServiceSlug}`
//                  e.g. "riyadh::تنظيف::تنظيف-منازل"
{ cityAdaptedIntro, techniquesNote, pricingNote, subServiceCityFaqs: FaqItem[] }
```

A missing key is not a crash — `getCityServiceContent` / `getSubServiceCityContent` in
`index.ts` return `null` and the template falls back to generic service copy. That is
exactly the thin-page state that got earlier pages marked "Crawled – currently not
indexed". **Never ship a city page relying on the fallback.**

New service file → add both spreads to `app/lib/city-content/index.ts` and the service
name to the `SERVICES` array in `scripts/check-content-similarity.ts`.

## Non-negotiable: every entry carries city-specific facts

The differentiator is never the city *name*. Swapping "الرياض" for "جدة" in an otherwise
identical paragraph is the failure mode. Each entry must turn on a **material local
reality** that changes how the service is actually delivered.

Source facts from `app/lib/locations.ts` — each city has `localContext`, `neighborhoods`,
`keywords`, `nearbyCitySlugs`. Use them, and go beyond them. The existing corpus is the
quality bar:

| City | The real hook |
|---|---|
| الرياض | Sand storms; hard/calcified water; large north-side villas (الملقا، حطين، النرجس) |
| جدة | 60–80% humidity; sea-salt deposits; mold behind cabinets; أبحر الشمالية sea-facing glass |
| الدمام | Gulf humidity + industrial dust; sulfur in groundwater staining fixtures |
| مكة | 50°C+ heat; Hajj/Umrah surges; cramped old buildings near الحرم |
| المدينة | Desert dust, drier than جدة; hotel/serviced-apartment demand near الحرم النبوي |
| الطائف | Mountain climate; winter fog → mold; seasonal استراحات in الهدا/الشفا |
| أبها | 2,200 m altitude; monsoon rain, persistent fog; worst mold pressure in KSA |

Write each entry so that **if you deleted the city name, a local would still know which
city it is.** That is the test.

## Voice

- Arabic (MSA with natural Saudi service vocabulary), second person to the customer.
- Concrete over adjectives: instruments, materials, timeframes, neighborhood names.
- Prices in ريال with realistic ranges and what's included — never a bare number.
- No superlative stuffing ("الأفضل", "رقم 1"), no invented certifications or awards.
- Keyword in the first sentence naturally; never repeat it mechanically.

Lengths that match the existing corpus: `intro` / `cityAdaptedIntro` ≈ 45–70 words,
`challenges` / `techniquesNote` ≈ 45–70, `whyUs` / `pricingNote` ≈ 30–45, and **3 FAQs**
per entry with answers of 35–60 words.

## FAQs must be city-specific questions

Not "كم تكلفة التنظيف؟" but "بعد كل عاصفة ترابية يمتلئ بيتي في الرياض غباراً، هل توفرون
تنظيفاً سريعاً؟". Phrase them the way a customer would actually type or speak them —
these feed `FaqJsonLd` and are the site's best shot at FAQ rich results and AI answer
surfaces. Each answer must resolve the question on its own; don't defer to a phone call.

Do not reuse the same question across cities within a service, and do not reuse it across
the 3 sub-services within a city. Those are precisely the two axes the gate measures.

## Pricing discipline

Prices are commitments the client has to honor. Keep them internally consistent across
the site: a service must not be cheaper on its sub-service×city page than on the parent
service×city page for the same scope. If you invent a new price point, check the sibling
entries first and stay within the established band. **Flag to the user rather than guess**
when a genuinely new service has no precedent.

## Mandatory pre-commit gate

```
npx tsx scripts/check-content-similarity.ts <service>   # one service
npx tsx scripts/check-content-similarity.ts             # all 9
```

Word-trigram Jaccard on both axes (cross-city, cross-sub), threshold **0.55**, exits
non-zero on breach. Current baseline for reference — stay in this range:

```
plumbing 11% · cleaning 14% · maintenance 16% · landscaping 19%
contracting 19% · moving 12% · insulation 27% · parquet 25% · ceramic 30%
```

Anything above ~35% means the entries are drifting template-ward even though the gate
passes. Rewrite before it reaches 55%. Passing the gate is the floor, not the goal — the
gate cannot detect "grammatically distinct but substantively identical."

Then `npm run lint` and `npm run build` — the build is what proves all 397 slugs resolve.

## Workflow for a batch

1. Read the sibling entries already written for that service (cross-city) **and** the
   other sub-services for that city (cross-sub). You are writing against both.
2. Pull the city's `localContext` + `neighborhoods` from `locations.ts`.
3. Draft all 10 cities in one pass so differentiation is deliberate, not accidental.
4. Run the similarity gate; rewrite the weaker side of any pair over ~35%.
5. `npm run build`, then check a couple of pages in the browser for RTL/layout breaks.

Related: `seo-guardrails` for the indexing rules these pages have to satisfy.
