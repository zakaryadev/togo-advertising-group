import type { Metadata } from "next";
import { StaticPage } from "@/components/site/sections";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Xizmatlar narxlari va hisob-kitob",
    description: "Toshkentda reklama xizmatlari narxlari: banner bosma, obyomli harflar, lightbox, flayer va suvenirlar bo'yicha shaffof narxlar.",
  },
  ru: {
    title: "Цены на услуги и онлайн-расчет",
    description: "Цены на рекламные и полиграфические услуги в Ташкенте: печать баннеров, объёмные буквы, лайтбоксы, флаеры и сувениры.",
  },
  en: {
    title: "Service prices and estimates",
    description: "Advertising and print production prices in Tashkent: banner printing, 3D letters, lightboxes, flyers and corporate merchandise.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/narxlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/narxlar` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/narxlar`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/narxlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StaticPage locale={locale} page="narxlar" />;
}
