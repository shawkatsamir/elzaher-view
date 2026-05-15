// Single source of truth for client NAP (Name, Address, Phone) and brand data.
// Replace every TODO(NAP) before going to production — structured data with placeholder data is a Google-trust risk.

export const business = {
  baseUrl: "https://alzaherview.com",
  nameAr: "شركة الزاهر فيو",
  nameEn: "Al-Zaher View",
  legalName: "شركة الزاهر فيو",
  // TODO(NAP): replace with the client's real phone number once supplied
  phone: "+966590123782",
  phoneDisplay: "0590123782",
  // TODO(NAP): replace with the client's real WhatsApp number once supplied
  whatsapp: "966590123782",
  // TODO(NAP): replace with the client's real email once supplied
  email: "info@alzaherview.com",
  address: {
    // TODO(NAP): replace with the client's real registered address
    streetAr: "طريق الملك فهد",
    streetEn: "King Fahd Road",
    cityAr: "الرياض",
    cityEn: "Riyadh",
    regionAr: "منطقة الرياض",
    regionEn: "Riyadh",
    postalCode: "11564",
    country: "SA",
  },
  social: {
    // TODO(NAP): replace with the client's real social URLs
    twitter: "https://twitter.com/alzaherview",
    instagram: "https://instagram.com/alzaherview",
    facebook: "https://facebook.com/alzaherview",
    tiktok: "",
    youtube: "",
  },
  // TODO(NAP): paste the client's Google Business Profile share URL
  googleBusinessProfileUrl: "",
  priceRange: "$$",
  openingHours: {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  defaultLogoPath: "/logo.png",
} as const;

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
