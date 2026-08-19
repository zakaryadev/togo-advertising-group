import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiManagerWidget from "@/components/ai-manager-widget";
import BayramBadge from "@/components/bayram-badge";
import LedCanvas from "@/components/led-canvas";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { isLocale, locales, siteUrl } from "@/data/site";

const homeMetadata = {
  uz: {
    title: "Tashqi reklama va poligrafiya Toshkentda",
    description:
      "Toshkentda tashqi reklama va poligrafiya: banner bosma, vizitka, flayer, katalog, peshtoq, LED harflar va montaj xizmatlari.",
  },
  ru: {
    title: "Наружная реклама и полиграфия в Ташкенте",
    description:
      "Наружная реклама и полиграфия в Ташкенте: баннеры, визитки, флаеры, вывески, объёмные буквы и монтаж от TOGO GROUP.",
  },
  en: {
    title: "Outdoor advertising and print production in Tashkent",
    description:
      "Outdoor advertising and print production in Tashkent: banners, business cards, flyers, signage, 3D letters and installation by TOGO GROUP.",
  },
} as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const copy = homeMetadata[locale];
  return {
    title: {
      default: copy.title,
      template: "%s | TOGO GROUP",
    },
    description: copy.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `${siteUrl}/${item}`])),
        "x-default": `${siteUrl}/uz`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title: copy.title,
      description: copy.description,
      url: `/${locale}`,
      locale: locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    name: "TOGO GROUP ADVERTISING",
    url: `${siteUrl}/${locale}`,
    telephone: "+998773004500",
    email: "info@togogrouppro.uz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    areaServed: { "@type": "City", name: "Tashkent" },
    sameAs: ["https://t.me/togo_group_pro", "https://www.instagram.com/togo_group_pro/"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+998773004500",
      contactType: "sales",
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
  };

  return (
    <>
      <LedCanvas />
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <SiteFooter locale={locale} />
      <BayramBadge locale={locale} />
      <AiManagerWidget locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
