import type { Metadata } from "next";
import { ProcessPage } from "@/components/site/sections";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Ish jarayoni — buyurtma qanday harakatlanadi",
    description: "TOGO GROUP reklama ishlab chiqarish jarayoni: brif va o'lchovdan tortib, dizayn, sifatli bosma va professional montajgacha.",
  },
  ru: {
    title: "Процесс работы — как движется заказ",
    description: "Процесс производства рекламы в TOGO GROUP: от брифа и точного замера до дизайна, печати и профессионального монтажа.",
  },
  en: {
    title: "Our process — how an order moves forward",
    description: "Advertising production workflow at TOGO GROUP: from initial brief and surveying to layout design, printing, and installation.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/jarayon">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/jarayon` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/jarayon`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/jarayon">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProcessPage locale={locale} />;
}
