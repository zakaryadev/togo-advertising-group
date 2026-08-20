import type { Metadata } from "next";
import { ReferenceContactPage } from "@/components/site/reference-pages";
import { isLocale, siteUrl } from "@/data/site";
import { notFound } from "next/navigation";

const pageMetadata = {
  uz: {
    title: "Aloqa va manzil",
    description: "TOGO GROUP bilan bog'lanish: telefon, Telegram, elektron pochta va Toshkentdagi ofisimiz manzili. Loyihangizni bir soatda hisoblab beramiz.",
  },
  ru: {
    title: "Контакты и адрес",
    description: "Связаться с TOGO GROUP: телефон, Telegram, почта и адрес офиса в Ташкенте. Рассчитаем ваш проект за 1 час.",
  },
  en: {
    title: "Contact and location",
    description: "Contact TOGO GROUP: phone, Telegram, email and office address in Tashkent. We will estimate your project within an hour.",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/aloqa">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = pageMetadata[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/aloqa` },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `${siteUrl}/${locale}/aloqa`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/aloqa">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ReferenceContactPage locale={locale} />;
}
