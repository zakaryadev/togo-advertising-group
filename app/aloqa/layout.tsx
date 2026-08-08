import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aloqa",
  description: "TOGO Group Pro bilan bog‘laning — bepul konsultatsiya oling. Telefon, Telegram yoki forma orqali so‘rov qoldiring.",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
