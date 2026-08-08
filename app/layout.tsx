import type { Metadata } from "next";
import "./globals.css";
import { contact } from "./content/site-content";

const siteUrl = "https://togogrouppro.uz";
const title = "TOGO Group Pro — Tashqi reklama, LED harflar va brending";
const description =
  "TOGO Group Pro — Toshkentda LED harflar, lightbox, banner, reklama stendlari, avto reklama va UV print xizmatlari. Bepul konsultatsiya va tezkor ishlab chiqarish.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — TOGO Group Pro" },
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
    "TOGO Group Pro",
  ],
  authors: [{ name: "TOGO Group Pro" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    url: siteUrl,
    siteName: "TOGO Group Pro",
    title,
    description,
    images: [{ url: "/media/cta-banner.png", width: 1774, height: 952, alt: "TOGO Group Pro — LED reklama" }],
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
  name: "TOGO Group Pro",
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
    <html lang="uz" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
