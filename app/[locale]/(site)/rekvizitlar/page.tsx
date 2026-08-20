import type { Metadata } from "next";
import { StaticPage } from "@/components/site/sections";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Kompaniya rekvizitlari va davlat xaridlari",
    description: "«TOGO GROUP ADVERTISING» MCHJ rasmiy yuridik rekvizitlari: STIR, bank hisob raqamlari, EHF va to'lov shartlari.",
  },
  ru: {
    title: "Реквизиты компании и госзакупки",
    description: "Официальные реквизиты ООО «TOGO GROUP ADVERTISING»: ИНН, расчетные счета, ЭСФ, условия работы по госзакупкам и договорам.",
  },
  en: {
    title: "Company details and public procurement",
    description: "Official legal and banking details for «TOGO GROUP ADVERTISING» LLC: TIN, bank accounts, electronic invoices, and corporate procurement terms.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/rekvizitlar">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/rekvizitlar` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/rekvizitlar`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/rekvizitlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <StaticPage locale={locale} page="rekvizitlar" />;
}
