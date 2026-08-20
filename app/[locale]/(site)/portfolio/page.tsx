import type { Metadata } from "next";
import { PortfolioPreview } from "@/components/site/sections";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Portfolio — bajarilgan ishlar va loyihalar",
    description: "TOGO GROUP portfolio galereyasi: fasad reklamasi, obyomli harflar, bannerlar, ko'rgazma stendlari va avtomobil brendlash.",
  },
  ru: {
    title: "Портфолио — выполненные работы и проекты",
    description: "Портфолио TOGO GROUP: фасадная реклама, объёмные буквы, баннеры, выставочные стенды и брендирование авто в Ташкенте.",
  },
  en: {
    title: "Portfolio — completed projects and works",
    description: "TOGO GROUP portfolio gallery: facade signs, 3D letters, banners, exhibition stands, and vehicle wraps in Tashkent.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/portfolio">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/portfolio` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/portfolio`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/portfolio">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PortfolioPreview locale={locale} />;
}
