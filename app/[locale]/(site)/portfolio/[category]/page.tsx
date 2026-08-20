import type { Metadata } from "next";
import { PortfolioPreview } from "@/components/site/sections";
import { isLocale, locales, portfolioCategories, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    portfolioCategories.map(([category]) => ({ locale, category })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio/[category]">): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale)) return {};

  const cat = portfolioCategories.find(([key]) => key === category);
  if (!cat) return {};

  const categoryName = cat[1][locale];
  const title =
    locale === "ru"
      ? `${categoryName} — Портфолио TOGO GROUP`
      : locale === "en"
        ? `${categoryName} — TOGO GROUP Portfolio`
        : `${categoryName} — TOGO GROUP Portfolio`;

  const description =
    locale === "ru"
      ? `Примеры работ по направлению «${categoryName}». Производство, доставка и монтаж в Ташкенте.`
      : locale === "en"
        ? `Examples of completed work in «${categoryName}». Production, delivery, and installation in Tashkent.`
        : `«${categoryName}» yo'nalishi bo'yicha tayyorlangan ishlar namunalari. Toshkentda ishlab chiqarish va montaj.`;

  return {
    title,
    description,
    alternates: { canonical: `/${locale}/portfolio/${category}` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title,
      description,
      url: `${siteUrl}/${locale}/portfolio/${category}`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: PageProps<"/[locale]/portfolio/[category]">) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !portfolioCategories.some(([key]) => key === category))
    notFound();
  return <PortfolioPreview locale={locale} category={category} />;
}
