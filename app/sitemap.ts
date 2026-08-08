import type { MetadataRoute } from "next";

const siteUrl = "https://togogrouppro.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/xizmatlar", "/portfolio", "/aloqa"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
