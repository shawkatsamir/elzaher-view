import type { ColorTheme } from "@/app/lib/services";

export interface ThemeTokens {
  heroFrom: string;
  heroTo: string;
  badgeBg: string;
  badgeText: string;
  iconText: string;
  pillBg: string;
  ctaBg: string;
  ctaHover: string;
  darkBg: string;
  outlineText: string;
}

export const themes: Record<ColorTheme, ThemeTokens> = {
  cyan: {
    heroFrom: "from-cyan-50",
    heroTo: "to-cyan-100",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-700",
    iconText: "text-cyan-600",
    pillBg: "bg-cyan-100",
    ctaBg: "bg-cyan-600",
    ctaHover: "hover:bg-cyan-700",
    darkBg: "bg-cyan-900",
    outlineText: "text-cyan-100",
  },
  emerald: {
    heroFrom: "from-emerald-50",
    heroTo: "to-emerald-100",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    iconText: "text-emerald-600",
    pillBg: "bg-emerald-100",
    ctaBg: "bg-emerald-600",
    ctaHover: "hover:bg-emerald-700",
    darkBg: "bg-emerald-900",
    outlineText: "text-emerald-100",
  },
  amber: {
    heroFrom: "from-amber-50",
    heroTo: "to-amber-100",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    iconText: "text-amber-700",
    pillBg: "bg-amber-100",
    ctaBg: "bg-amber-600",
    ctaHover: "hover:bg-amber-700",
    darkBg: "bg-amber-900",
    outlineText: "text-amber-100",
  },
  violet: {
    heroFrom: "from-violet-50",
    heroTo: "to-violet-100",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-700",
    iconText: "text-violet-600",
    pillBg: "bg-violet-100",
    ctaBg: "bg-violet-600",
    ctaHover: "hover:bg-violet-700",
    darkBg: "bg-violet-900",
    outlineText: "text-violet-100",
  },
  rose: {
    heroFrom: "from-rose-50",
    heroTo: "to-rose-100",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    iconText: "text-rose-600",
    pillBg: "bg-rose-100",
    ctaBg: "bg-rose-600",
    ctaHover: "hover:bg-rose-700",
    darkBg: "bg-rose-900",
    outlineText: "text-rose-100",
  },
  sky: {
    heroFrom: "from-sky-50",
    heroTo: "to-sky-100",
    badgeBg: "bg-sky-100",
    badgeText: "text-sky-700",
    iconText: "text-sky-600",
    pillBg: "bg-sky-100",
    ctaBg: "bg-sky-600",
    ctaHover: "hover:bg-sky-700",
    darkBg: "bg-sky-900",
    outlineText: "text-sky-100",
  },
  lime: {
    heroFrom: "from-lime-50",
    heroTo: "to-lime-100",
    badgeBg: "bg-lime-100",
    badgeText: "text-lime-800",
    iconText: "text-lime-700",
    pillBg: "bg-lime-100",
    ctaBg: "bg-lime-600",
    ctaHover: "hover:bg-lime-700",
    darkBg: "bg-lime-900",
    outlineText: "text-lime-100",
  },
};
