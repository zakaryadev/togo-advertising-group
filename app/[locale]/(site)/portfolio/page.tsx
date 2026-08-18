import { PortfolioPreview } from "@/components/site/sections"; import { isLocale } from "@/data/site"; import { notFound } from "next/navigation";
export default async function Page({ params }: PageProps<"/[locale]/portfolio">) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <PortfolioPreview locale={locale} />; }
