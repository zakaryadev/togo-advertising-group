"use client";
import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { portfolio as staticPortfolio } from "../../content/site-content";
import { useLang } from "../../content/i18n-context";
import type { LangKey } from "../../content/translations";

interface PortfolioDisplayItem {
  id: string;
  client: string;
  service: string;
  category: string;
  image: string;
}

interface RawPortfolioItem {
  id?: string;
  slug?: string;
  title?: string;
  client?: string;
  service_type?: string;
  service?: string;
  category?: string;
  image_url?: string;
  image?: string;
}

const ALL = "__all__";

const categoryLabels: Record<string, Record<LangKey, string>> = {
  "LED Logo": { uz: "LED Logo", ru: "LED Логотип", en: "LED Logo" },
  "LED Harf": { uz: "LED Harf", ru: "Объемные буквы", en: "LED Letters" },
  Lightbox: { uz: "Lightbox", ru: "Лайтбокс", en: "Lightbox" },
  Stend: { uz: "Stend", ru: "Стенд", en: "Stand" },
  "Avto reklama": { uz: "Avto reklama", ru: "Реклама на авто", en: "Car Branding" },
  "Tashqi reklama": { uz: "Tashqi reklama", ru: "Наружная реклама", en: "Outdoor Advertising" },
};

const categoryOrder = Object.keys(categoryLabels);

export default function PortfolioPage() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState(ALL);
  const [dynamicItems, setDynamicItems] = useState<PortfolioDisplayItem[] | null>(null);

  useEffect(() => {
    fetch(`/api/portfolio?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const mapped = data.items.map((item: RawPortfolioItem) => ({
            id: item.id || item.slug || "",
            client: item.title || item.client || "",
            service: item.service_type || item.service || "",
            category: item.category || item.service_type || item.service || "",
            image: item.image_url || item.image || "",
          }));
          setDynamicItems(mapped);
        } else {
          setDynamicItems(null);
        }
      })
      .catch(() => setDynamicItems(null));
  }, [lang]);

  const displayList: PortfolioDisplayItem[] = useMemo(() => {
    if (dynamicItems && dynamicItems.length > 0) return dynamicItems;
    return staticPortfolio.map((item) => ({
      id: item.id,
      client: item.client[lang],
      service: item.service[lang],
      category: item.category,
      image: item.image,
    }));
  }, [dynamicItems, lang]);

  const visible = useMemo(
    () => (filter === ALL ? displayList : displayList.filter((item) => item.category === filter)),
    [filter, displayList]
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero">
          <div className="wrap">
            <span className="eyebrow mono"><BriefcaseBusiness size={13} /> TOGO GROUP ADVERTISING / {t("pg.pf.eyebrow")}</span>
            <h1>{t("pg.pf.h1a")} <span className="neon">{t("pg.pf.h1b")}</span></h1>
            <p>{t("pg.pf.sub")}</p>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="filter-bar" role="group" aria-label="Portfolio categories">
              <button
                className={filter === ALL ? "filter active" : "filter"}
                onClick={() => setFilter(ALL)}
              >
                {t("pg.filter.all")}
              </button>
              {categoryOrder.map((cat) => (
                <button
                  key={cat}
                  className={filter === cat ? "filter active" : "filter"}
                  onClick={() => setFilter(cat)}
                >
                  {categoryLabels[cat][lang]}
                </button>
              ))}
            </div>

            <div className="portfolio-page-grid">
              {visible.map((item) => (
                <article className="portfolio-page-card" key={item.id}>
                  <div className="portfolio-page-media">
                    <Image
                      src={item.image}
                      alt={item.client}
                      fill
                      unoptimized
                      sizes="(max-width:640px) 100vw,(max-width:1000px) 50vw,33vw"
                    />
                  </div>
                  <div className="portfolio-page-body">
                    <div>
                      <h2>{item.client}</h2>
                      <p>{item.service}</p>
                    </div>
                    <ArrowUpRight size={21} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
