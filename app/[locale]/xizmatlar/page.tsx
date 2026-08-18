import { isLocale } from "@/data/site";
import { notFound, permanentRedirect } from "next/navigation";

export default async function Page({ params }: PageProps<"/[locale]/xizmatlar">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  permanentRedirect(`/${locale}/yonalishlar`);
}
