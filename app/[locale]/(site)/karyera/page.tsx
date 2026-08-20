import type { Metadata } from "next";
import { CareerPage } from "@/components/site/career-page";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Karyera va bo'sh ish o'rinlari",
    description: "TOGO GROUP jamoasiga qo'shiling: dizayner, bosma operatori, montajchi va menejer lavozimlari bo'yicha bo'sh ish o'rinlari.",
  },
  ru: {
    title: "Карьера и вакансии",
    description: "Присоединяйтесь к команде TOGO GROUP: открытые вакансии дизайнеров, операторов печати, монтажников и менеджеров в Ташкенте.",
  },
  en: {
    title: "Careers and open positions",
    description: "Join the TOGO GROUP team: open vacancies for designers, print operators, installers, and project managers in Tashkent.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/karyera">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/karyera` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/karyera`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/karyera">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CareerPage locale={locale} />;
}
