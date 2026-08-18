import Link from "next/link";
import {
  pageCopy,
  portfolioCategories,
  services,
  type Locale,
} from "@/data/site";
import { portfolioImagesByCategory } from "@/components/portfolio-images";
import PortfolioGallery from "@/components/site/portfolio-gallery";
import LegacyHero from "@/components/hero";

export function Hero({ locale }: { locale: Locale }) {
  return <LegacyHero locale={locale} />;
}
export function ServicesPreview({ locale }: { locale: Locale }) {
  return (
    <section className="wrap section">
      <p className="kick">
        {locale === "uz"
          ? "XIZMATLAR"
          : locale === "ru"
            ? "УСЛУГИ"
            : "SERVICES"}
      </p>
      <h2>
        {locale === "uz"
          ? "Biz tayyorlaydigan reklama va bosma turlari"
          : locale === "ru"
            ? "Рекламные и полиграфические услуги"
            : "Advertising and print services"}
      </h2>
      <div className="card-grid">
        {services.map((service, index) => (
          <Link
            className="card"
            href={`/${locale}/xizmatlar/${service.slug}`}
            key={service.slug}
          >
            <small>0{index + 1}</small>
            <h3>{service.title[locale]}</h3>
            <p>{service.description[locale]}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function PortfolioPreview({
  locale,
  category,
}: {
  locale: Locale;
  category?: string;
}) {
  const selected =
    category && portfolioCategories.some(([key]) => key === category)
      ? category
      : undefined;
  const categories = selected
    ? portfolioCategories.filter(([key]) => key === selected)
    : portfolioCategories;
  return (
    <section className="wrap section">
      <p className="kick">PORTFOLIO</p>
      <h2>
        {locale === "uz"
          ? "Bajarilgan loyihalar"
          : locale === "ru"
            ? "Выполненные проекты"
            : "Completed projects"}
      </h2>
      <div className="filter-links">
        <Link className={!selected ? "on" : ""} href={`/${locale}/portfolio`}>
          {locale === "uz" ? "Barchasi" : locale === "ru" ? "Все" : "All"}
        </Link>
        {portfolioCategories.map(([key, label]) => (
          <Link
            key={key}
            className={selected === key ? "on" : ""}
            href={`/${locale}/portfolio/${key}`}
          >
            {label[locale]}
          </Link>
        ))}
      </div>
      <PortfolioGallery locale={locale} items={categories.flatMap(([key, label]) =>
          portfolioImagesByCategory[
            key as keyof typeof portfolioImagesByCategory
          ]
            .slice(0, selected ? undefined : 3)
            .map((image) => ({ ...image, alt: label[locale], caption: label[locale] })),
        )} />
    </section>
  );
}
export function StaticPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "narxlar" | "tadbirlar" | "jarayon" | "rekvizitlar";
}) {
  const copy = pageCopy[page];
  const blocks =
    page === "jarayon"
      ? ["Brief", "O'lchov va dizayn", "Ishlab chiqarish", "Montaj"]
      : page === "rekvizitlar"
        ? [
            "STIR: 312481772",
            "IFUT: 73110",
            "H/R: 2020 8000 8073 2289 6001",
            "HAMKORBANK (MFO: 00083)",
          ]
        : page === "narxlar"
          ? [
              "Banner va roll-up — 1 ish kuni",
              "Yorug'lik harflari — 3–7 kun",
              "Katta poligrafiya — 2–5 kun",
            ]
          : [
              "Ko'rgazma stendlari",
              "Press-wall va roll-up",
              "Navigatsiya va brending",
              "Montaj va demontaj",
            ];
  return (
    <section className="wrap section page">
      <p className="kick">TOGO GROUP</p>
      <h1>{copy.title[locale]}</h1>
      <p className="lead">{copy.lead[locale]}</p>
      <div className="info-list">
        {blocks.map((block, i) => (
          <div key={block}>
            <b>0{i + 1}</b>
            <span>{block}</span>
          </div>
        ))}
      </div>
      <Link className="cta" href={`/${locale}/aloqa`}>
        {locale === "uz"
          ? "Murojaat qoldirish"
          : locale === "ru"
            ? "Оставить заявку"
            : "Leave a request"}
      </Link>
    </section>
  );
}
