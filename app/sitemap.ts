import type { MetadataRoute } from "next";

const siteUrl = "https://togogroup.uz";
const locales = ["uz", "ru", "en"] as const;
const routes = ["", "/xizmatlar", "/portfolio", "/aloqa"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${route}`])
        ),
      },
    }))
  );
}
