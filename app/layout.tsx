import BayramBadge from "@/components/bayram-badge";
import AiManagerWidget from "@/components/ai-manager-widget";
import Header from "@/components/header";
import Script from "next/script";
import type { Metadata } from "next";
import { Onest, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--display",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
  variable: "--mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://togogroup.uz"),
  title: "Obyomli harflar, kran reklamasi va poligrafiya — TOGO GROUP ADVERTISING, Toshkent",
  description:
    "Toshkentda obyomli harflar va yorug'lik peshtoqlari, minorali kranlarga reklama, katta formatli va UV bosma, ko'rgazma stendlari, poligrafiya. Dizayndan balandlikdagi montajgacha — bitta jamoada.",
  keywords: [
    "obyomli harflar Toshkent",
    "obyomli bukva",
    "объёмные буквы Ташкент",
    "hajmli harflar",
    "yorug'lik harflari",
    "LED peshtoq",
    "kran reklamasi",
    "реклама на кране",
    "tashqi reklama Toshkent",
    "наружная реклама Ташкент",
    "poligrafiya Toshkent",
    "katta formatli bosma",
    "UV bosma",
    "lightbox",
    "TOGO GROUP ADVERTISING",
  ],
  authors: [{ name: "TOGO GROUP ADVERTISING" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "TOGO GROUP ADVERTISING",
    locale: "uz_UZ",
    url: "https://togogroup.uz/",
    title: "Obyomli harflar, kran reklamasi va poligrafiya — TOGO GROUP ADVERTISING",
    description:
      "Toshkentda peshtoq va yorug'lik harflari, kranlarga reklama, katta formatli va UV bosma, ko'rgazma stendlari, poligrafiya.",
    images: [
      {
        url: "https://togogroup.uz/logos.png",
        width: 1200,
        height: 630,
        alt: "TOGO GROUP ADVERTISING",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://togogroup.uz/#org",
    name: "TOGO GROUP ADVERTISING",
    alternateName: [
      "TOGO GROUP ADVERTISING MCHJ",
      "ТОГО ГРУПП",
      "Togo Group Pro",
    ],
    description:
      "Toshkentda obyomli harflar, yorug'lik peshtoqlari, kran reklamasi, katta formatli va UV bosma, ko'rgazma stendlari hamda poligrafiya ishlab chiqarish.",
    url: "https://togogroup.uz/",
    telephone: "+998773004500",
    email: "info@togogrouppro.uz",
    priceRange: "$$",
    currenciesAccepted: "UZS",
    paymentAccepted: "Naqd, Click, Payme, bank o'tkazmasi",
    logo: "https://togogroup.uz/togo_logo.svg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy",
      addressLocality: "Toshkent",
      addressRegion: "Toshkent",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.31,
      longitude: 69.24,
    },
    areaServed: [
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Place", name: "MDH / CIS" },
    ],
    sameAs: [
      "https://t.me/togo_group_pro",
      "https://www.instagram.com/togo_group_pro/",
    ],
    openingHours: "Mo-Sa 09:00-18:00",
  };

  return (
    <html
      lang="uz"
      className={`${onest.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "window.__TOGO_AI_MANAGER_INIT = true; window.__TOGO_FX_ENGINE_INIT = true;",
          }}
        />
      </head>
      <body>
        <Header />
        {children}
        <BayramBadge />
        <AiManagerWidget />
      </body>
    </html>
  );
}
