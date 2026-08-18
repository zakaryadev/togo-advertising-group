import { CareerPage } from "@/components/site/career-page";
import { isLocale } from "@/data/site";
import { notFound } from "next/navigation";

export default async function Page({ params }: PageProps<"/[locale]/karyera">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CareerPage locale={locale} />;
}
