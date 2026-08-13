---
name: seo-guardrails
description: Technical SEO and Google Search Essentials compliance for Al-Zaher View — doorway-page risk, crawl and indexing rules, canonicals with Arabic slugs, sitemap/robots invariants, JSON-LD structured data, and the "Crawled – currently not indexed" playbook. Use before deploying, when adding pages or routes, when touching sitemap.ts/robots.ts/metadata, when pages drop out of the index, or when adding structured data.
---

# SEO Guardrails

Read this before any change that adds pages, alters routing/metadata, or touches
`app/sitemap.ts`, `app/robots.ts`, or JSON-LD. The site is 397 programmatic Arabic pages
on a new domain — it sits in the exact category Google scrutinizes hardest.

## 1. The doorway-page problem is this site's existential risk

Google's spam policy on
[doorway pages](https://developers.google.com/search/docs/essentials/spam-policies#doorways)
names the pattern directly: *"multiple sites or pages targeted at specific regions or
cities that funnel users to one page."* A 9-service × 10-city grid **is** that shape. The
site is not automatically in violation — the defense is that each page carries
substantively different, locally useful content — but the margin is thin and it is
manual-action territory, not a ranking nudge.

Consequences of getting this wrong: a site-wide manual action, or the quieter and more
common outcome the project has already hit — pages stuck at **"Crawled – currently not
indexed."** That status is Google saying *"I fetched it and judged it not worth storing."*

**Rules that follow from this:**

- Never add a city or service just to add pages. More URLs with the same information is
  strictly negative. Adding city #11 means writing 30+ genuinely distinct entries first.
- Never ship a service×city page whose `city-content` entry is missing — the template
  falls back to generic service copy, which is a textbook doorway page.
- The similarity gate (`scripts/check-content-similarity.ts`, Jaccard 0.55) is a **floor,
  not a goal**. It cannot detect "differently worded, substantively identical."
- If the user asks to mass-generate city pages from a template, say plainly that this is
  the pattern that gets sites deindexed, and offer the differentiated alternative. See
  `city-content` for how.

## 2. Crawl and indexing invariants

Do not break these without saying so explicitly:

- **`app/robots.ts`** allows `/` for all agents, disallows only `/private/`, and points to
  `https://alzaherview.com/sitemap.xml`. Never add a `Disallow` covering service, blog, or
  works routes. Never "temporarily" disallow — recovery takes weeks.
- **`robots` meta is env-gated**: `app/layout.tsx:13` sets
  `isProduction = process.env.VERCEL_ENV === "production"`, and non-production returns
  `{ index: false, follow: false }`. If `VERCEL_ENV` is ever wrong on the production
  deployment, **the entire site goes noindex**. Verify the live page source after any
  Vercel/env change.
- **`/studio`** must never be indexed or appear in the sitemap.
- `app/not-found.tsx` correctly sets `robots: { index: false, follow: true }`. Keep it.

## 3. Canonicals with Arabic slugs

Every route sets a self-referencing canonical plus `ar-SA` + `x-default` alternates:
`app/[slug]/page.tsx` (via `canonicalPath` per page kind), `app/blog/**`, `app/works/**`,
and root in `app/layout.tsx`. `metadataBase` is `business.baseUrl`.

The trap is **percent-encoding**. Arabic slugs arrive URL-encoded in params and the routes
`decodeURIComponent` them (`getPageDescriptor` does this too). The canonical must be
emitted in **one consistent form** across sitemap, canonical tag, and internal links —
otherwise Google sees `/سباك-الرياض` and `/%D8%B3%D8%A8%D8%A7%D9%83-...` as two URLs and
splits signals. When adding a route, mirror the existing `absoluteUrl(...)` pattern rather
than assembling URLs by hand.

## 4. Sitemap rules

`app/sitemap.ts` builds static routes + 9 hubs + 90 service×city + 27 sub-hubs + 270
sub-service×city, then appends Sanity blog/category/work routes. Two known traps:

- **Posts without a category are silently dropped** (`.filter((p) => p.category)`), because
  the URL is `/blog/{category}/{slug}`. An uncategorized post is unreachable from the
  sitemap. Always set at least one category on a post.
- The Sanity fetch is wrapped in `try/catch` that **ships an empty blog section on
  failure**. A build during a Sanity outage silently produces a sitemap missing every post.
  If blog URLs vanish from the sitemap, suspect this before suspecting content.

The client uses `perspective: "published"` (`sanity/client.ts`) — drafts can't leak into
the sitemap. Don't change that.

Every URL in the sitemap must return 200 and be self-canonical. Never list a URL that
redirects, 404s, or canonicalizes elsewhere.

## 5. Structured data

Components in `app/_components/`: `OrganizationJsonLd`, `LocalBusinessJsonLd`,
`ServiceJsonLd`, `FaqJsonLd`, `BreadcrumbJsonLd`, plus `blog/_components/blog-post-json-ld`
and `works/_components/project-json-ld`.

- Structured data must **match visible page content**. FAQ JSON-LD whose questions aren't
  rendered on the page is a
  [structured-data violation](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
  `FaqJsonLd` is fed from the same FAQ arrays the templates render — keep it that way.
- **Never invent** `aggregateRating`, `review`, `priceRange` precision, or awards.
  Fake review markup is a direct manual-action trigger.
- `app/lib/business.ts` NAP values are **placeholders** carrying `TODO(NAP)` markers
  (phone `0590123782`, "King Fahd Road, Riyadh"). `LocalBusinessJsonLd` publishing a fake
  address is a real trust risk. Flag any task that would deepen the dependency on these
  before the client supplies real NAP — and do not add `geo` coordinates implying a
  physical location that doesn't exist.
- Validate changed markup against Google's Rich Results Test before deploying.

## 6. "Crawled – currently not indexed" playbook

The project has fought this before (`fix/debug-not-indexed-page`,
`feature/add-subservice-unique-content`). Order of investigation:

1. **Content depth** — does the page have its `city-content` entry, or is it on the generic
   fallback? This is the cause the majority of the time.
2. **Distinctness** — run the similarity gate. Anything above ~35% against a sibling is a
   candidate even though the gate passes.
3. **Internal links** — is the page reachable from more than the HTML sitemap? Orphaned
   pages get deprioritized. `getContextualServiceLinks` (`app/lib/slug-registry.ts`) and
   the blog's `internalServiceLink` blocks exist for this.
4. **Canonical** — confirm the rendered canonical matches the sitemap URL byte for byte.
5. **Only then** request indexing in GSC. Requesting indexing on a thin page does nothing;
   it does not override a quality judgment.

Fixing thin content and waiting beats any submission trick. There is no way to force
indexing, and anything sold as one violates the spam policies.

## 7. Pre-deploy checklist

```
npx tsx scripts/check-content-similarity.ts     # all 9 services, must PASS
npm run lint
npm run build                                   # proves all 397 slugs resolve
npm run lh                                      # unlighthouse, optional perf pass
```

Then confirm: canonical + `robots` meta correct in the deployed HTML, `/sitemap.xml` and
`/robots.txt` load, new URLs present in the sitemap, JSON-LD validates.

## 8. Never do

Cloaking or serving different content to Googlebot · hidden/keyword-stuffed text ·
auto-generated or spun content shipped without review · fake reviews, ratings, or
credentials · doorway pages (see §1) · paid or reciprocal link schemes · scraped competitor
content (`algoharahclean.com` is a *reference for structure and gaps*, never a source to
copy) · `Disallow`/`noindex` as a quick fix for a duplicate-content problem — fix the
content instead.

Related: `city-content` for landing copy, `blog-post` for Sanity posts.
