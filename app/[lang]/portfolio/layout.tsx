import type { Metadata } from "next";
import type { LangKey } from "../../content/translations";
import { buildAlternates } from "../../content/seo";

const metaByLang: Record<LangKey, { title: string; description: string }> = {
  uz: {
    title: "Portfolio",
    description: "TOGO Group Advertising tomonidan yaratilgan LED, lightbox, stend va tashqi reklama loyihalari — Litto Hotel, Artel, UzAuto Motors, Korzinka va boshqalar.",
  },
  ru: {
    title: "Портфолио",
    description: "Проекты LED вывесок, лайтбоксов, стендов и наружной рекламы от TOGO Group Advertising — Litto Hotel, Artel, UzAuto Motors, Korzinka и другие.",
  },
  en: {
    title: "Portfolio",
    description: "LED signage, lightbox, stand and outdoor advertising projects by TOGO Group Advertising — Litto Hotel, Artel, UzAuto Motors, Korzinka and more.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langCode = (lang as LangKey) || "uz";
  return {
    ...metaByLang[langCode],
    alternates: buildAlternates(langCode, "/portfolio"),
  };
}

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
