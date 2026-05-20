import type { FaqItem } from "../services";

export interface CityServiceContent {
  intro: string;
  challenges: string;
  whyUs: string;
  cityFaqs: FaqItem[];
}

export interface SubServiceCityContent {
  cityAdaptedIntro: string;
  techniquesNote: string;
  pricingNote: string;
  subServiceCityFaqs: FaqItem[];
}

export interface ServiceContentBundle {
  serviceCity: Record<string, CityServiceContent>;
  subServiceCity: Record<string, SubServiceCityContent>;
}
