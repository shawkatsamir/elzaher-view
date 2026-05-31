import { cities, City } from "./locations";
import {
  services,
  Service,
  SubService,
  getService,
  getServicePrimaryCities,
} from "./services";

export type PageKind =
  | "service-hub"
  | "service-city"
  | "sub-service-hub"
  | "sub-service-city"
  | "site-map";

export interface ServiceHubDescriptor {
  kind: "service-hub";
  slug: string;
  service: Service;
}

export interface ServiceCityDescriptor {
  kind: "service-city";
  slug: string;
  service: Service;
  city: City;
}

export interface SubServiceHubDescriptor {
  kind: "sub-service-hub";
  slug: string;
  service: Service;
  subService: SubService;
}

export interface SubServiceCityDescriptor {
  kind: "sub-service-city";
  slug: string;
  service: Service;
  subService: SubService;
  city: City;
}

export interface SiteMapDescriptor {
  kind: "site-map";
  slug: string;
}

export const SITEMAP_PAGE_SLUG = "خريطة-الموقع";

export type PageDescriptor =
  | ServiceHubDescriptor
  | ServiceCityDescriptor
  | SubServiceHubDescriptor
  | SubServiceCityDescriptor
  | SiteMapDescriptor;

// Arabic city names may contain spaces (e.g. "مكة المكرمة"). URL slugs use hyphens.
function arabicCitySlug(city: City): string {
  return city.nameAr.replace(/\s+/g, "-");
}

export function buildServiceCitySlug(service: Service, city: City): string {
  return `${service.citySlugPrefix}-${arabicCitySlug(city)}`;
}

export function buildSubServiceCitySlug(
  subService: SubService,
  city: City,
): string {
  return `${subService.slug}-${arabicCitySlug(city)}`;
}

const registry: Map<string, PageDescriptor> = (() => {
  const map = new Map<string, PageDescriptor>();

  // Special: HTML sitemap page
  map.set(SITEMAP_PAGE_SLUG, { kind: "site-map", slug: SITEMAP_PAGE_SLUG });

  for (const service of services) {
    // Service hub
    map.set(service.hubSlug, {
      kind: "service-hub",
      slug: service.hubSlug,
      service,
    });

    // Service × city
    for (const city of cities) {
      const slug = buildServiceCitySlug(service, city);
      map.set(slug, {
        kind: "service-city",
        slug,
        service,
        city,
      });
    }

    for (const subService of service.subServices) {
      // Sub-service hub
      map.set(subService.slug, {
        kind: "sub-service-hub",
        slug: subService.slug,
        service,
        subService,
      });

      // Sub-service × city
      for (const city of cities) {
        const slug = buildSubServiceCitySlug(subService, city);
        map.set(slug, {
          kind: "sub-service-city",
          slug,
          service,
          subService,
          city,
        });
      }
    }
  }

  return map;
})();

export function getPageDescriptor(slug: string): PageDescriptor | null {
  return registry.get(decodeURIComponent(slug)) ?? null;
}

export function getAllSlugs(): string[] {
  return Array.from(registry.keys());
}

export function getServiceCitySlug(
  serviceSlug: string,
  citySlug: string,
): string | null {
  const service = getService(serviceSlug);
  const city = cities.find((c) => c.slug === citySlug);
  if (!service || !city) return null;
  return buildServiceCitySlug(service, city);
}

export function getServiceCitySlugByCityPrefix(
  serviceSlug: string,
  cityNameAr: string,
): string | null {
  const service = getService(serviceSlug);
  if (!service) return null;
  const city = cities.find((c) => c.nameAr === cityNameAr);
  if (!city) return null;
  return buildServiceCitySlug(service, city);
}

export interface ContextualLink {
  title: string;
  url: string;
}

export interface ContextualServiceGroup {
  heading: string;
  primary: ContextualLink;
  deep: ContextualLink[];
}

// Expands a post's related services into a primary landing link plus deep
// sub-service-city links. Target cities are the post's own relatedCities when
// set (editor override for a city-specific post); otherwise each service falls
// back to its natural working area (getServicePrimaryCities) — so نقل عفش links
// to المدينة, عزل to مكة, etc., without forcing one city on every service.
export function getContextualServiceLinks(
  relatedServices: string[] | undefined,
  relatedCities: string[] | undefined,
): ContextualServiceGroup[] {
  if (!relatedServices?.length) return [];

  const groups: ContextualServiceGroup[] = [];
  for (const serviceSlug of relatedServices) {
    const service = getService(serviceSlug);
    if (!service) continue;

    const citySlugs = relatedCities?.length
      ? relatedCities
      : getServicePrimaryCities(service.slug);
    const targetCities = citySlugs
      .map((slug) => cities.find((c) => c.slug === slug))
      .filter((c): c is City => Boolean(c));

    if (targetCities.length === 0) {
      groups.push({
        heading: service.hubTitleAr,
        primary: { title: service.hubTitleAr, url: `/${service.hubSlug}` },
        deep: service.subServices.map((sub) => ({
          title: sub.titleAr,
          url: `/${sub.slug}`,
        })),
      });
      continue;
    }

    const deep = targetCities.flatMap((city) =>
      service.subServices.map((sub) => ({
        title: `${sub.titleAr} في ${city.nameAr}`,
        url: `/${buildSubServiceCitySlug(sub, city)}`,
      })),
    );

    // One city → point the primary button at that service-city page; multiple
    // → at the hub, since no single city page represents the group.
    const primary =
      targetCities.length === 1
        ? {
            title: `${service.titleAr} في ${targetCities[0].nameAr}`,
            url: `/${buildServiceCitySlug(service, targetCities[0])}`,
          }
        : { title: service.hubTitleAr, url: `/${service.hubSlug}` };

    groups.push({ heading: service.hubTitleAr, primary, deep });
  }
  return groups;
}
