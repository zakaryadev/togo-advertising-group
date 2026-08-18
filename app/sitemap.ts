import type { MetadataRoute } from "next";
import { locales, portfolioCategories, services, siteUrl } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/xizmatlar",
    "/yonalishlar",
    "/portfolio",
    "/narxlar",
    "/tadbirlar",
    "/jarayon",
    "/rekvizitlar",
    "/aloqa",
  ];
  const lastModified = new Date();
  const alternates = (path: string) => ({ languages: Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`])) });
  return locales.flatMap((locale) => [
    ...routes.map((path) => ({ url: `${siteUrl}/${locale}${path}`, lastModified, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/xizmatlar" ? 0.9 : 0.7, alternates: alternates(path) })),
    ...services.map((service) => ({
      url: `${siteUrl}/${locale}/xizmatlar/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates(`/xizmatlar/${service.slug}`),
    })),
    ...portfolioCategories.map(([category]) => ({
      url: `${siteUrl}/${locale}/portfolio/${category}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: alternates(`/portfolio/${category}`),
    })),
  ]);
}
