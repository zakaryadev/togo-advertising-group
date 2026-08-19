import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Onest } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://togogroup.uz"),
  title: {
    default: "Tashqi reklama va poligrafiya — TOGO GROUP",
    template: "%s | TOGO GROUP",
  },
  description:
    "Toshkentda tashqi reklama va poligrafiya: banner bosma, vizitka, flayer, katalog, peshtoq, LED harflar va montaj xizmatlari. TOGO GROUP.",
  keywords: [
    "tashqi reklama Toshkent",
    "poligrafiya Toshkent",
    "banner bosma Toshkent",
    "vizitka va flayer Toshkent",
    "наружная реклама Ташкент",
    "типография Ташкент",
    "banner printing Tashkent",
    "print production Tashkent",
    "peshtoq",
    "LED harflar",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "TOGO GROUP ADVERTISING",
    locale: "uz_UZ",
    title: "Tashqi reklama va poligrafiya — TOGO GROUP",
    description:
      "Toshkentda tashqi reklama, poligrafiya, banner bosma, peshtoq, LED harflar va montaj xizmatlari.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashqi reklama va poligrafiya — TOGO GROUP",
    description:
      "Toshkentda tashqi reklama, poligrafiya, banner bosma, peshtoq, LED harflar va montaj xizmatlari.",
  },
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
    <html lang="uz" className={`${onest.variable} ${manrope.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRTLP8WX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRTLP8WX');`}
        </Script>
      </body>
    </html>
  );
}
