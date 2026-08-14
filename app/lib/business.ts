// Single source of truth for client NAP (Name, Address, Phone) and brand data.
// Replace every remaining TODO(NAP) before going to production — structured data
// with placeholder data is a Google-trust risk. Name, address and phone are now
// the client's real values and must stay identical to the Google Business Profile.

export const business = {
  baseUrl: "https://alzaherview.com",
  nameAr: "شركة الزاهر فيو",
  nameEn: "Al-Zaher View",
  legalName: "شركة الزاهر فيو",
  // Confirmed real: the client's number, and the one behind every call CTA.
  phone: "+966590123782",
  phoneDisplay: "0590123782",
  // Same line as `phone`, in the international format wa.me requires.
  whatsapp: "966590123782",
  // TODO(NAP): replace with the client's real email once supplied
  email: "info@alzaherview.com",
  // Matches the Google Business Profile listing. The GBP is the authority here —
  // any divergence is a NAP conflict Google reads as an untrusted local entity.
  address: {
    streetAr: "العصيفرين",
    streetEn: "Al Usayfirin",
    cityAr: "المدينة المنورة",
    cityEn: "Medina",
    regionAr: "منطقة المدينة المنورة",
    regionEn: "Al Madinah",
    // TODO(NAP): postal code from the client — omitted from JSON-LD while empty
    postalCode: "",
    country: "SA",
  },
  // Empty entries are filtered out of sameAs. A profile that does not exist is
  // worse than no profile at all, so leave these blank until each URL resolves.
  social: {
    // TODO(NAP): replace with the client's real social URLs
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  },
  // TODO(NAP): paste the client's Google Business Profile share URL
  googleBusinessProfileUrl: "",
  priceRange: "$$",
  // TODO(NAP): set to the client's real hours, copied verbatim from the Google
  // Business Profile. Null until then — see LocalBusinessJsonLd.
  openingHours: null as {
    days: string[];
    opens: string;
    closes: string;
  } | null,
  defaultLogoPath: "/logo.png",
} as const;

/**
 * The one PostalAddress every schema emission uses. Three components used to build
 * this block independently, which is how the address drifted out of sync with the
 * Google Business Profile in the first place. Empty fields are omitted rather than
 * emitted blank — `"postalCode":""` is invalid markup, not a neutral placeholder.
 */
export function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: business.address.streetEn,
    addressLocality: business.address.cityEn,
    addressRegion: business.address.regionEn,
    ...(business.address.postalCode
      ? { postalCode: business.address.postalCode }
      : {}),
    addressCountry: business.address.country,
  };
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${business.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${business.phone}`;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${business.baseUrl}${normalized}`;
}
