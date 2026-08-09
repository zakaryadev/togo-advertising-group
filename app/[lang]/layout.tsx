import type { Metadata } from "next";
import { contact } from "../content/site-content";
import { I18nProvider } from "../content/i18n-context";
import { translations, type LangKey } from "../content/translations";
import { siteUrl, ogLocales, buildAlternates } from "../content/seo";

const keywordsByLang: Record<LangKey, string[]> = {
  uz: [
    "LED harflar Toshkent",
    "tashqi reklama",
    "lightbox",
    "reklama stendi",
    "banner ishlab chiqarish",
    "avto reklama",
    "UV print",
    "brending Toshkent",
    "TOGO GROUP PRO",
    "bosmaxona Toshkent",
  ],
  ru: [
    "объемные буквы Ташкент",
    "наружная реклама",
    "лайтбокс",
    "рекламный стенд",
    "изготовление баннеров",
    "реклама на авто",
    "УФ печать",
    "брендинг Ташкент",
    "TOGO GROUP PRO",
    "типография Ташкент",
  ],
  en: [
    "LED letters Tashkent",
    "outdoor advertising",
    "lightbox",
    "advertising stand",
    "banner printing",
    "car branding",
    "UV printing",
    "branding Tashkent",
    "TOGO GROUP PRO",
    "printing house Tashkent",
  ],
};

function resolveLang(lang: string): LangKey {
  return translations[lang as LangKey] ? (lang as LangKey) : "uz";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langCode = resolveLang(lang);
  const title = translations[langCode].title as string;
  const description = translations[langCode]["hero.sub"] as string;
  const alternates = buildAlternates(langCode, "");

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s — TOGO GROUP PRO" },
    description,
    keywords: keywordsByLang[langCode],
    authors: [{ name: "TOGO GROUP PRO" }],
    alternates,
    openGraph: {
      type: "website",
      locale: ogLocales[langCode],
      url: alternates.canonical,
      siteName: "TOGO GROUP PRO",
      title,
      description,
      images: [{ url: "/media/cta-banner.png", width: 1774, height: 952, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/media/cta-banner.png"],
    },
    robots: { index: true, follow: true },
  };
}

function buildJsonLd(langCode: LangKey) {
  return {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    name: "TOGO GROUP PRO",
    url: `${siteUrl}/${langCode}`,
    inLanguage: langCode,
    logo: `${siteUrl}/togo_logo.svg`,
    image: `${siteUrl}/media/cta-banner.png`,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Toshkent",
      addressCountry: "UZ",
    },
    areaServed: "Toshkent",
    sameAs: [contact.instagram, contact.telegram, contact.youtube],
  };
}

export async function generateStaticParams() {
  return [{ lang: "uz" }, { lang: "ru" }, { lang: "en" }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const langCode = resolveLang(lang);

  return (
    <I18nProvider initialLang={langCode}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(langCode)) }}
      />
      {children}
    </I18nProvider>
  );
}
