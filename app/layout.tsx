import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./content/seo";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "TOGO GROUP PRO — Reklama va bosmaxona | Toshkent",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
