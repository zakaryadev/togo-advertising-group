import type { Metadata } from "next";
import type { LangKey } from "../../content/translations";
import { buildAlternates } from "../../content/seo";

const metaByLang: Record<LangKey, { title: string; description: string }> = {
  uz: {
    title: "Aloqa",
    description: "TOGO Group Pro bilan bog'laning — bepul konsultatsiya oling, loyihangizni muhokama qiling. Telefon, Telegram, Instagram va manzil.",
  },
  ru: {
    title: "Контакты",
    description: "Свяжитесь с TOGO Group Pro — получите бесплатную консультацию, обсудите проект. Телефон, Telegram, Instagram и адрес.",
  },
  en: {
    title: "Contact",
    description: "Get in touch with TOGO Group Pro — free consultation, discuss your project. Phone, Telegram, Instagram and address.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langCode = (lang as LangKey) || "uz";
  return {
    ...metaByLang[langCode],
    alternates: buildAlternates(langCode, "/aloqa"),
  };
}

export default function AloqaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
