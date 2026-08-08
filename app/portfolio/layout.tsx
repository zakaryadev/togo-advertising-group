import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "TOGO Group Pro tomonidan yaratilgan LED, lightbox, stend va tashqi reklama loyihalari — Litto Hotel, Artel, UzAuto Motors, Korzinka va boshqalar.",
};

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
