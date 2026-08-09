import type { LangKey } from "./translations";

export const siteUrl = "https://togogroup.uz";

export const ogLocales: Record<LangKey, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

const locales: LangKey[] = ["uz", "ru", "en"];

export function buildAlternates(lang: LangKey, routePath: string) {
  return {
    canonical: `${siteUrl}/${lang}${routePath}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${routePath}`])),
      "x-default": `${siteUrl}/uz${routePath}`,
    },
  };
}
