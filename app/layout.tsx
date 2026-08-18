import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Onest } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://togogroup.uz"),
  title: { default: "Tashqi reklama va banner bosma — TOGO GROUP", template: "%s | TOGO GROUP" },
  description:
    "Toshkentda tashqi reklama, banner bosma, peshtoq, LED harflar va montaj. TOGO GROUP — dizayn, ishlab chiqarish va o‘rnatish bir joyda.",
  keywords: ["tashqi reklama Toshkent", "наружная реклама Ташкент", "banner Toshkent", "banner bosma", "баннер печать", "peshtoq", "вывеска", "LED harflar", "наружная реклама"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", siteName: "TOGO GROUP ADVERTISING", locale: "uz_UZ", title: "Tashqi reklama va banner bosma — TOGO GROUP", description: "Toshkentda tashqi reklama, banner bosma, peshtoq va montaj xizmatlari." },
  twitter: { card: "summary_large_image", title: "Tashqi reklama va banner bosma — TOGO GROUP", description: "Toshkentda tashqi reklama, banner bosma, peshtoq va montaj." },
  icons: { icon: "/icon.svg" },
};
const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--display" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--body" });
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--mono",
});
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="uz"
      className={`${onest.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
