import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, services, siteUrl } from "@/data/site";

const printMetadata = {
  uz: {
    title: "Poligrafiya Toshkentda — vizitka, flayer va katalog",
    description:
      "Toshkentda poligrafiya xizmatlari: vizitka, flayer, buklet, katalog, bloknot va kalendar. Dizayn hamda sifatli ishlab chiqarish — TOGO GROUP.",
  },
  ru: {
    title: "Полиграфия в Ташкенте — визитки, флаеры и каталоги",
    description:
      "Полиграфические услуги в Ташкенте: визитки, флаеры, буклеты, каталоги, блокноты и календари. Дизайн и качественное производство от TOGO GROUP.",
  },
  en: {
    title: "Print production in Tashkent — business cards, flyers and catalogues",
    description:
      "Print production in Tashkent: business cards, flyers, booklets, catalogues, notebooks and calendars. Design and quality production by TOGO GROUP.",
  },
} as const;

const bannerMetadata = {
  ru: {
    title: "Печать баннеров в Ташкенте — широкоформатная и UV-печать",
    description:
      "Печать баннеров, баннерной сетки и плёнки в Ташкенте. Производство, подготовка и монтаж от TOGO GROUP.",
  },
} as const;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/xizmatlar/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!isLocale(locale) || !service) return {};

  const specializedMetadata =
    slug === "poligrafiya"
      ? printMetadata[locale]
      : locale === "ru" && slug === "bosma"
        ? bannerMetadata.ru
        : null;
  const title = specializedMetadata?.title ?? service.title[locale];
  const description =
    specializedMetadata?.description ?? `${service.description[locale]} ${service.details[locale]}`;
  const ogLocale = locale === "ru" ? "ru_RU" : locale === "en" ? "en_US" : "uz_UZ";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/xizmatlar/${slug}`,
      languages: Object.fromEntries(
        locales.map((item) => [item, `${siteUrl}/${item}/xizmatlar/${slug}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: "TOGO GROUP ADVERTISING",
      title,
      description,
      url: `${siteUrl}/${locale}/xizmatlar/${slug}`,
      locale: ogLocale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: PageProps<"/[locale]/xizmatlar/[slug]">) {
  const { locale, slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!isLocale(locale) || !service) notFound();

  return (
    <section className="wrap section page">
      <p className="kick">TOGO GROUP</p>
      <h1>{service.title[locale]}</h1>
      <p className="lead">{service.description[locale]}</p>
      <div className="detail-card">
        <h2>{locale === "uz" ? "Xizmat haqida" : locale === "ru" ? "Об услуге" : "About the service"}</h2>
        <p>{service.details[locale]}</p>
      </div>
      <Link className="cta" href={`/${locale}/aloqa`}>
        {locale === "ru" ? "Запросить расчёт" : locale === "en" ? "Get a quote" : "Hisob-kitob so'rash"}
      </Link>
    </section>
  );
}
