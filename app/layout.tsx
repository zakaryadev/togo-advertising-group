import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Onest } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = { metadataBase: new URL("https://togogroup.uz"), title: { default: "TOGO GROUP ADVERTISING", template: "%s | TOGO GROUP" }, description: "Toshkentdagi reklama va poligrafiya ishlab chiqarish kompaniyasi.", icons: { icon: "/icon.svg" } };
const onest = Onest({ subsets: ["latin", "cyrillic"], variable: "--display" }); const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--body" }); const mono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], variable: "--mono" });
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="uz" className={`${onest.variable} ${manrope.variable} ${mono.variable}`}><body>{children}</body></html>; }
