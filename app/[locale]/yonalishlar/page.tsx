import type { Metadata } from "next";
import { DirectionsPage } from "@/components/site/sections";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[locale]/yonalishlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "ru" ? "Услуги наружной рекламы и печати баннеров" : locale === "en" ? "Outdoor advertising and banner printing services" : "Tashqi reklama va banner bosma xizmatlari";
  const description = locale === "ru" ? "Баннеры, вывески, объёмные буквы, широкоформатная печать и монтаж в Ташкенте." : "Toshkentda banner bosma, peshtoq, LED harflar, tashqi reklama va montaj xizmatlari.";
  return { title, description, alternates: { canonical: `/${locale}/yonalishlar` }, openGraph: { title, description, url: `${siteUrl}/${locale}/yonalishlar` } };
}

export default async function Page({ params }: PageProps<"/[locale]/yonalishlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DirectionsPage locale={locale} />;
}
