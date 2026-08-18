"use client";

import { useState } from "react";
import PortfolioGallery from "@/components/site/portfolio-gallery";
import { portfolioSubcategories, type PortfolioCategoryKey } from "@/data/portfolio-subcategories";
import type { Locale } from "@/data/site";
import type { PortfolioImage } from "@/components/portfolio-images";

export default function PortfolioCategory({ category, items, locale }: { category: PortfolioCategoryKey; items: readonly PortfolioImage[]; locale: Locale }) {
  const [selected, setSelected] = useState<string | null>(null);
  const filters = portfolioSubcategories[category];
  const visible = selected ? items.filter((image) => image.subcategory === selected) : items;
  const allLabel = locale === "ru" ? "Все" : locale === "en" ? "All" : "Hammasi";
  const activeLabel = filters.find((filter) => filter.key === selected)?.label[locale];
  const placeholderLabel = locale === "ru" ? "ФОТО БУДЕТ ДОБАВЛЕНО" : locale === "en" ? "PHOTO WILL BE ADDED" : "RASM JOYLANADI";

  return <>
    <div className="subnav" aria-label="Portfolio filterlari">
      <button className={`subchip ${selected === null ? "on" : ""}`} type="button" onClick={() => setSelected(null)}>{allLabel}</button>
      {filters.map((filter) => <button className={`subchip ${selected === filter.key ? "on" : ""}`} type="button" key={filter.key} onClick={() => setSelected(filter.key)}>{filter.label[locale]}</button>)}
    </div>
    {visible.length ? <PortfolioGallery locale={locale} items={visible.map((image) => ({ ...image, alt: activeLabel ?? image.subcategoryLabel[locale], caption: activeLabel ?? image.subcategoryLabel[locale] }))} /> : <div className="portfolio-placeholder-grid" aria-live="polite">{Array.from({ length: 8 }, (_, index) => <div className="portfolio-placeholder" key={index}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><circle cx="8.6" cy="9.8" r="1.6" /><path d="M3.6 17l5-5 3.4 3.2 3.4-3.6 5 5.4" /></svg><span>{placeholderLabel}</span></div>)}</div>}
  </>;
}
