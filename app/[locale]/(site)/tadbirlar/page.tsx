import type { Metadata } from "next";
import { ReferenceEventsPage } from "@/components/site/reference-pages";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Ko'rgazma va tadbirlarni to'liq bezatish",
    description: "CAEx Expo Centre va boshqa maydonlardagi ko'rgazmalar, forumlar hamda nufuzli tadbirlar uchun stend, press-wall va to'liq ofarmleniya.",
  },
  ru: {
    title: "Полное оформление выставок и мероприятий",
    description: "Комплексное оформление выставок в CAEx Expo Centre и на других площадках, форумов и мероприятий: стенды, пресс-воллы и навигация.",
  },
  en: {
    title: "Exhibition and event branding production",
    description: "Turnkey exhibition and event branding at CAEx Expo Centre and other venues: custom stands, press walls, wayfinding, and delegation kits.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tadbirlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/tadbirlar` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/tadbirlar`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tadbirlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ReferenceEventsPage locale={locale} />;
}
