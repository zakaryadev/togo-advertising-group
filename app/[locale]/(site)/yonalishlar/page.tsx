import type { Metadata } from "next";
import { ReferenceDirectionsPage } from "@/components/site/reference-pages";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Tashqi reklama va poligrafiya xizmatlari",
    description:
      "Toshkentda tashqi reklama va poligrafiya: banner bosma, vizitka, flayer, peshtoq, LED harflar, stend va montaj xizmatlari.",
  },
  ru: {
    title: "Услуги наружной рекламы и полиграфии",
    description:
      "Наружная реклама и полиграфия в Ташкенте: баннеры, визитки, флаеры, вывески, объёмные буквы, стенды и монтаж.",
  },
  en: {
    title: "Outdoor advertising and print production services",
    description:
      "Outdoor advertising and print production in Tashkent: banners, business cards, flyers, signage, 3D letters, stands and installation.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/yonalishlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/yonalishlar` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/yonalishlar`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/yonalishlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ReferenceDirectionsPage locale={locale} />;
}
