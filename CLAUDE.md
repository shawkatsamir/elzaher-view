# Al-Zaher View (شركة الزاهر فيو)

Arabic-language services site for the Saudi market. 9 services across 10 cities, built for
organic search: a customer searching «سباك الرياض» should land on a page written for that
exact query. Next.js 16 (App Router, SSG) + Sanity CMS, deployed on Vercel.

## Architecture

**One dynamic route, not one file per page.** `app/[slug]/page.tsx` resolves every landing
page through `app/lib/slug-registry.ts`, which builds a 397-entry `Map` at module load
from `app/lib/services.ts` (9 services × 3 sub-services) and `app/lib/locations.ts`
(10 cities). Page kinds:

| Kind | Slug shape | Example | Template |
|---|---|---|---|
| service hub | `service.hubSlug` | `/شركة-سباكة` | `ServiceHubTemplate` |
| service × city | `citySlugPrefix-city` | `/سباك-الرياض` | `ServiceCityTemplate` |
| sub-service hub | `subService.slug` | `/كشف-تسريبات` | `SubServiceHubTemplate` |
| sub-service × city | `subSlug-city` | `/كشف-تسريبات-جدة` | `SubServiceCityTemplate` |
| HTML sitemap | `خريطة-الموقع` | | `SitemapPageTemplate` |

To add a service or city you edit the **data files**, and the registry, sitemap, and routes
follow. Never add a page component by hand.

## Slugs are Arabic, on purpose

Flat Arabic slugs with no `/services/` prefix — exact keyword match in the URL is a heavy
Arabic ranking signal. Two consequences:

- Slugs arrive percent-encoded in route params. `getPageDescriptor()` calls
  `decodeURIComponent`; canonicals go through `absoluteUrl(...)`. Emit URLs one consistent
  way — mixing encoded and decoded forms splits ranking signals across two URLs.
- City names with spaces become hyphens (`مكة المكرمة` → `مكة-المكرمة`) via
  `arabicCitySlug()`. Hamza spelling (`أ` vs `ا`) is the most common slug typo.

## The content layer

`app/lib/city-content/<service>.ts` holds the per-city Arabic copy keyed
`city::service` and `city::service::subService`. This is what makes 397 near-identical page
shapes into 397 distinct pages — it is the whole SEO defense, not decoration.

A missing key isn't an error: the lookup returns `null` and the template falls back to
generic service copy. **That fallback is a thin page.** Never ship a city page relying on
it.

New service file → register both spreads in `city-content/index.ts` **and** add the name to
`SERVICES` in `scripts/check-content-similarity.ts`.

## Sanity

Project `wz9bp19w`, dataset `production` (`sanity/env.ts`), Studio embedded at `/studio`.
Client is `perspective: "published"` — drafts never leak into the build.

Schemas: `post`, `postIdea` (editorial backlog with GSC tracking), `category`, `author`,
`project` (case studies at `/works`), plus body blocks in `blocks.ts`.

`internalServiceLink.slug` is validated in-Studio against `getPageDescriptor()`, so a
broken internal link is blocked at save. That validator lives in the Studio bundle, ships
with the Next deploy, and **is not serialized into the schema manifest** — MCP/API writes
bypass it. Check slugs yourself when writing documents programmatically.

## Commands

```bash
npm run dev                                      # next dev --turbopack
npm run build                                    # proves all 397 slugs resolve
npm run lint
npm run lh                                       # unlighthouse perf pass

npx tsx scripts/check-content-similarity.ts      # duplicate-content gate — must PASS
npx tsx scripts/check-content-similarity.ts cleaning
npx tsx scripts/eval-page-dedup.ts               # before/after dedup evaluation
```

The similarity gate is word-trigram Jaccard on two axes (same sub-service across cities,
and sub-services within a city), threshold 0.55, non-zero exit on breach. Run it before
every content commit.

## Gotchas

- **`VERCEL_ENV` gates indexing.** `app/layout.tsx:13` sets `robots: { index: false }` for
  anything other than `production`. A wrong env var noindexes the entire site.
- **Uncategorized posts vanish from the sitemap** — `app/sitemap.ts` filters on category
  because post URLs are `/blog/{category}/{slug}`.
- **The sitemap swallows Sanity failures.** Its `try/catch` ships an empty blog section if
  Sanity is unreachable at build time, with no error.
- **NAP is placeholder.** `app/lib/business.ts` carries `TODO(NAP)` on phone, email, and
  address pending the client. Structured data asserting a fake address is a trust risk —
  don't deepen the dependency on these values.
- `*.md` is gitignored except `README.md`, `CLAUDE.md`, and `.claude/**/*.md`.

## Skills

`.claude/skills/` holds the working procedures — load the relevant one before starting:

- **`city-content`** — writing/revising the Arabic service×city landing copy.
- **`blog-post`** — planning and drafting Sanity posts.
- **`seo-guardrails`** — Google Search Essentials compliance, crawl/index rules, the
  "Crawled – currently not indexed" playbook. Read before any change to routing, metadata,
  `sitemap.ts`, `robots.ts`, or structured data.
