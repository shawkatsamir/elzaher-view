import type { CityServiceContent, SubServiceCityContent } from "./types";
import * as plumbing from "./plumbing";
import * as cleaning from "./cleaning";
import * as maintenance from "./maintenance";
import * as landscaping from "./landscaping";
import * as contracting from "./contracting";
import * as moving from "./moving";
import * as insulation from "./insulation";
import * as parquet from "./parquet";
import * as ceramic from "./ceramic";

const allServiceCity: Record<string, CityServiceContent> = {
  ...plumbing.serviceCity,
  ...cleaning.serviceCity,
  ...maintenance.serviceCity,
  ...landscaping.serviceCity,
  ...contracting.serviceCity,
  ...moving.serviceCity,
  ...insulation.serviceCity,
  ...parquet.serviceCity,
  ...ceramic.serviceCity,
};

const allSubServiceCity: Record<string, SubServiceCityContent> = {
  ...plumbing.subServiceCity,
  ...cleaning.subServiceCity,
  ...maintenance.subServiceCity,
  ...landscaping.subServiceCity,
  ...contracting.subServiceCity,
  ...moving.subServiceCity,
  ...insulation.subServiceCity,
  ...parquet.subServiceCity,
  ...ceramic.subServiceCity,
};

export function getCityServiceContent(
  citySlug: string,
  serviceSlug: string,
): CityServiceContent | null {
  return allServiceCity[`${citySlug}::${serviceSlug}`] ?? null;
}

export function getSubServiceCityContent(
  citySlug: string,
  serviceSlug: string,
  subServiceSlug: string,
): SubServiceCityContent | null {
  return (
    allSubServiceCity[`${citySlug}::${serviceSlug}::${subServiceSlug}`] ?? null
  );
}

export type { CityServiceContent, SubServiceCityContent } from "./types";
