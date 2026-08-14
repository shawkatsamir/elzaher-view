// Canonical price table for the ceramic and parquet trees.
//
// Prices live as prose inside services.ts and city-content/*.ts — deliberately, so
// each city page reads differently and clears the dedup gate in
// scripts/check-content-similarity.ts. That prose is the rendered copy; THIS FILE is
// the reference it must agree with. Before changing a figure anywhere, change it here
// and check every row it touches.
//
// Two rules the prose broke before and must keep:
//   1. State the basis. "عمالة فقط" and "شامل المواد" differ by 3-5x; an unlabelled
//      number reads as a contradiction against a labelled one on a neighbouring page.
//   2. Keep the size buckets fixed. 60×60 is a LARGE ceramic format, not a small one.

export interface PriceRow {
  /** What is being priced, in the same words the prose uses. */
  labelAr: string;
  /** SAR per m², labour only unless basis says otherwise. */
  from: number;
  to?: number;
  basis: "عمالة فقط" | "شامل المواد";
  note?: string;
}

/** Baseline city. Every other city is this ± the uplift below. */
export const CERAMIC_BASE: PriceRow[] = [
  { labelAr: "سيراميك مقاس صغير 30×30 و 40×40", from: 25, basis: "عمالة فقط" },
  { labelAr: "سيراميك مقاس كبير 60×60 و 60×120", from: 35, to: 45, basis: "عمالة فقط" },
  { labelAr: "سيراميك على الحوائط", from: 50, to: 65, basis: "عمالة فقط" },
  { labelAr: "بورسلين 60×120", from: 45, basis: "عمالة فقط" },
  { labelAr: "بورسلين 80×160", from: 75, basis: "عمالة فقط" },
  {
    labelAr: "ألواح بورسلين عملاقة 120×260 (سلاب)",
    from: 120,
    basis: "عمالة فقط",
    note: "تحتاج فريقاً من ثلاثة وأكواب شفط ومقص ليزر — لا تُسعّر كالبلاط العادي",
  },
  { labelAr: "جرانيت", from: 60, basis: "عمالة فقط" },
  { labelAr: "رخام فاخر (كرارا)", from: 90, to: 150, basis: "عمالة فقط" },
  { labelAr: "مواد السيراميك", from: 30, basis: "شامل المواد" },
];

export const PARQUET_BASE: PriceRow[] = [
  {
    labelAr: "باركيه لاميميت/عادي بنظام Click",
    from: 15,
    basis: "عمالة فقط",
    note: "أرخص بند في القائمة لأنه عمالة فقط بنظام نقر بلا لاصق — لا يُقارن بأسعار «شامل المواد»",
  },
  { labelAr: "باركيه خشب طبيعي — زان", from: 80, basis: "عمالة فقط" },
  { labelAr: "باركيه خشب طبيعي — أرو", from: 120, basis: "عمالة فقط" },
  { labelAr: "باركيه خشب طبيعي — ماهوجني", from: 180, to: 250, basis: "عمالة فقط" },
  { labelAr: "باركيه مهندس HDF", from: 150, to: 280, basis: "شامل المواد" },
  { labelAr: "باركيه فينيل SPC وLVT", from: 90, to: 180, basis: "شامل المواد" },
  { labelAr: "مواد باركيه الأرو الأوروبي", from: 200, basis: "شامل المواد" },
];

/**
 * Per-city uplift on the ceramic base, in SAR/m², with the reason it exists.
 * Cities absent from this map price at base. Keep the prose reasons in sync — an
 * unexplained price difference between two city pages looks arbitrary to a reader
 * and to a quality rater.
 */
export const CITY_UPLIFT: Record<string, { ceramic: number; reasonAr: string }> = {
  riyadh: { ceramic: 0, reasonAr: "مدينة الأساس" },
  medina: { ceramic: 0, reasonAr: "مقر الشركة — لا تكلفة انتقال" },
  mecca: { ceramic: 0, reasonAr: "قرب المدينة المنورة" },
  buraydah: { ceramic: 0, reasonAr: "مدينة الأساس" },
  taif: { ceramic: 1, reasonAr: "تضاريس جبلية ونقل أطول" },
  tabuk: { ceramic: 1, reasonAr: "بُعد المسافة وتكلفة نقل المواد" },
  jeddah: { ceramic: 2, reasonAr: "حشو إيبوكسي وعزل مائي إلزاميان في الرطوبة الساحلية" },
  dammam: { ceramic: 2, reasonAr: "حشو إيبوكسي وعزل مائي لرطوبة الخليج الدائمة" },
  abha: { ceramic: 2, reasonAr: "رطوبة جبلية عالية وتضاريس صعبة" },
  "khamis-mushait": { ceramic: 2, reasonAr: "رطوبة المرتفعات وعزل مائي" },
};
