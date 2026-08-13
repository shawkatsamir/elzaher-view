---
name: blog-post
description: Plan, draft, and publish Arabic blog posts in the Al-Zaher View Sanity dataset — postIdea briefs, Portable Text bodies, featured answers, FAQs, internal service links, and schema.org article types. Use when writing a new post, turning a Post Idea into a draft, fixing a post that isn't ranking, or wiring a post into the internal-link graph.
---

# Blog Post Authoring

Posts are the site's topical-authority and E-E-A-T layer: they earn links to the 397
service pages that can't earn links themselves. A post that doesn't feed the link graph
isn't worth writing.

**Sanity:** project `wz9bp19w`, dataset `production` (`sanity/env.ts`). Use the Sanity MCP
tools. Always `get_schema` before writing documents. Create as **drafts** and let the user
publish — never `publish_documents` unprompted.

## Pipeline

`postIdea` (editorial backlog) → `post` (draft) → user publishes.

Start from a `postIdea` when one exists — it already carries `primaryKeyword`,
`searchIntent`, `plannedH2s`, `plannedFaqs`, `plannedInternalLinks`, `competitorRefs`,
and `targetWordCount`. Move `status` along (`idea → briefed → drafting → qa → published`)
and set `linkedPost` once the draft exists. If the user asks for a post with no idea
document, offer to create the `postIdea` first — the brief is where the SEO decisions get
made, and it's also where GSC performance gets tracked back (`gscImpressions`,
`gscClicks`, `gscAvgPosition`, `lastTrackedAt`).

## Required fields for a post that can rank

| Field | Rule |
|---|---|
| `title` | Primary keyword near the front, natural Arabic phrasing |
| `slug` | Arabic slug — the custom `slugify` preserves U+0600–U+06FF. Never hand-write a transliterated Latin slug |
| `featuredAnswer` | **40–60 words**, answers the primary query outright. This is the featured-snippet / AI-answer target. Max 400 chars (validated) |
| `body` | Portable Text. **1500–2500 words.** Under 600 words fails validation outright; under 1000 warns |
| `excerpt` | 1–2 sentences, distinct from `metaDescription` |
| `metaDescription` | ~150–160 chars, contains the keyword, reads as a promise not a summary |
| `postFaqs` | 3–8 questions → `FAQPage` JSON-LD |
| `articleType` | `Article` / `HowTo` / `Guide` / `Comparison` / `Listicle` — drives JSON-LD |
| `howToSteps` | Required when `articleType: HowTo`; emits `HowTo` JSON-LD |
| `author` | Reference an `author` doc (E-E-A-T). Legacy `authorName`/`authorRole` strings are fallback only |
| `publishedAt` / `lastReviewedAt` | `lastReviewedAt` renders as «آخر مراجعة» — a freshness signal. Set it when revising |
| `relatedServices` | Service slugs — this is what surfaces the post on service pages |
| `relatedCities` | City slugs, **only** for geo-specific posts. Leave empty for nationwide posts so each service falls back to its own working area |

`readTime` is computed from word count if omitted — leave it empty.

## Body blocks

Beyond `block` and `image`:

- **`infoCallout`** — `tip` / `warning` / `note` / `info`. Use for safety warnings and
  cost traps; breaks up long Arabic text walls.
- **`comparisonTable`** — 2–6 columns. Strong for `Comparison` posts and for
  price/material tradeoffs. Keep cells short; the table scrolls on mobile.
- **`embeddedFaq`** — min 2 items, placed mid-body. Distinct from `postFaqs` (which is the
  schema-level FAQ block at the end).
- **`internalServiceLink`** — the important one.

### internalServiceLink is validated

The `slug` field is checked against `getPageDescriptor()` from `app/lib/slug-registry.ts`
at edit time. A slug that doesn't resolve to a real page **blocks the save** with an
Arabic error. Common cause is hamza spelling (أ vs ا) or a city name mismatch.

Get valid slugs from the registry rather than guessing — `getAllSlugs()`, or build them
with `buildServiceCitySlug` / `buildSubServiceCitySlug`. Shapes:

```
شركة-سباكة              service hub
سباك-الرياض             service × city  (uses service.citySlugPrefix)
كشف-تسريبات             sub-service hub
كشف-تسريبات-جدة         sub-service × city
```

Aim for **3–6 internal service links** per post, placed where they're contextually
earned — inside the section that discusses that problem, not dumped in a footer block.

## Writing rules

- Arabic MSA, second person, concrete. Same voice as the city content (see `city-content`).
- H2s answer real questions; the outline should read like a SERP's People-Also-Ask list.
- Every price/spec claim must be plausible for the KSA market and consistent with the
  service pages. Don't contradict `app/lib/city-content/*.ts`.
- No fabricated statistics, studies, certifications, or customer counts. If a number would
  strengthen the post and you don't have a real source, write around it.
- The client's NAP (phone `0590123782`, "King Fahd Road, Riyadh") is a **placeholder** —
  don't build content that depends on the address being real.

## Before handing back

1. Word count in range, `featuredAnswer` 40–60 words.
2. Every `internalServiceLink` slug resolves (the schema will tell you; don't rely on it
   alone — check against the registry while drafting).
3. `relatedServices` set, `relatedCities` deliberate (empty ≠ forgotten).
4. FAQs are questions a customer would actually ask, answers self-contained.
5. Left as a **draft**; tell the user what to review before publishing.

Related: `seo-guardrails` for JSON-LD and indexing checks, `city-content` for landing copy.
