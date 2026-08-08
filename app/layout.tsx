import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { contact } from "./content/site-content";
import { I18nProvider } from "./content/i18n-context";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--display",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--body",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--mono",
  weight: ["400", "500"],
});

const siteUrl = "https://togogrouppro.uz";
const title = "TOGO GROUP PRO — Reklama va bosmaxona | Toshkent";
const description =
  "Katta formatli bosma, tashqi reklama, yorugʻlik harflari, stendlar va brending. Toshkentda toʻliq ishlab chiqarish sikli.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — TOGO GROUP PRO" },
  description,
  keywords: [
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
  authors: [{ name: "TOGO GROUP PRO" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    siteName: "TOGO GROUP PRO",
    title,
    description,
    images: [{ url: "/media/cta-banner.png", width: 1774, height: 952, alt: "TOGO GROUP PRO — Reklama va bosmaxona" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/cta-banner.png"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AdvertisingAgency",
  name: "TOGO GROUP PRO",
  url: siteUrl,
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uz"
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
