import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TOGO Group Pro — Reklama va branding",
  description: "Tashqi reklama, LED harflar, stend va poligrafiya xizmatlari.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uz"><body>{children}</body></html>;
}
