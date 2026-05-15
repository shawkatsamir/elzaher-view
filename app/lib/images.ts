// Single source of truth for service imagery.
// Replace Unsplash URLs here when the client supplies real job-site photos —
// services.ts references this file by semantic key, so no other edits needed.

export interface ImageRef {
  src: string;
  alt: string;
}

interface ServiceImages {
  gallery: ImageRef[];
  sub: Record<string, string>;
}

const u = (id: string, w: 800 | 1080 | 1200 = 1200) =>
  `https://images.unsplash.com/${id}?w=${w}`;

export const IMG: Record<string, ServiceImages> = {
  plumbing: {
    gallery: [
      { src: u("photo-1682268294094-5c68969ea23a", 1080), alt: "فني سباكة يعمل على إصلاح الأنابيب" },
      { src: u("photo-1607472586893-edb57bdc0e39", 800), alt: "كشف تسريبات المياه بالأجهزة الحديثة" },
      { src: u("photo-1558618666-fcd25c85cd64", 800), alt: "تسليك البالوعات والمجاري" },
      { src: u("photo-1621905251189-08b45d6a269e", 800), alt: "أعمال السباكة المتخصصة" },
    ],
    sub: {
      leakDetection: u("photo-1607472586893-edb57bdc0e39"),
      drainCleaning: u("photo-1558618666-fcd25c85cd64"),
      maintenance: u("photo-1621905251189-08b45d6a269e"),
    },
  },
  cleaning: {
    gallery: [
      { src: u("photo-1581578731548-c64695cc6952", 1080), alt: "تنظيف منازل احترافي" },
      { src: u("photo-1527515637462-cff94eecc1ac", 800), alt: "تنظيف وتعقيم الأرضيات" },
      { src: u("photo-1584820927498-cfe5211fd8bf", 800), alt: "تنظيف الأثاث المنزلي" },
    ],
    sub: {
      homes: u("photo-1581578731548-c64695cc6952"),
      tanks: u("photo-1527515637462-cff94eecc1ac"),
      acs: u("photo-1584820927498-cfe5211fd8bf"),
    },
  },
  maintenance: {
    gallery: [
      { src: u("photo-1581092918056-0c4c3acd3789", 1080), alt: "صيانة منازل احترافية" },
      { src: u("photo-1581092160562-40aa08e78837", 800), alt: "صيانة كهرباء" },
    ],
    sub: {
      electrical: u("photo-1581092160562-40aa08e78837"),
      ac: u("photo-1581092918056-0c4c3acd3789"),
      general: u("photo-1581092918056-0c4c3acd3789"),
    },
  },
  landscaping: {
    gallery: [
      { src: u("photo-1558904541-efa843a96f01", 1080), alt: "تنسيق حدائق منزلية" },
      { src: u("photo-1416879595882-3373a0480b5b", 800), alt: "عشب صناعي وتنسيق" },
    ],
    sub: {
      artificialGrass: u("photo-1416879595882-3373a0480b5b"),
      gardenDesign: u("photo-1558904541-efa843a96f01"),
      waterFeatures: u("photo-1558904541-efa843a96f01"),
    },
  },
  contracting: {
    gallery: [
      { src: u("photo-1503387762-592deb58ef4e", 1080), alt: "أعمال مقاولات وبناء" },
    ],
    sub: {
      renovation: u("photo-1503387762-592deb58ef4e"),
      villaBuild: u("photo-1503387762-592deb58ef4e"),
      finishing: u("photo-1503387762-592deb58ef4e"),
    },
  },
  moving: {
    gallery: [
      { src: u("photo-1600518464441-9154a4dea21b", 1080), alt: "نقل عفش احترافي" },
    ],
    sub: {
      disassembly: u("photo-1600518464441-9154a4dea21b"),
      storage: u("photo-1600518464441-9154a4dea21b"),
      intercity: u("photo-1600518464441-9154a4dea21b"),
    },
  },
  insulation: {
    gallery: [
      { src: u("photo-1530124566582-a618bc2615dc", 1080), alt: "عزل أسطح ومبانٍ" },
    ],
    sub: {
      roofs: u("photo-1530124566582-a618bc2615dc"),
      tanks: u("photo-1530124566582-a618bc2615dc"),
      foam: u("photo-1530124566582-a618bc2615dc"),
    },
  },
};
