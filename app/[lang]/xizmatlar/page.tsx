"use client";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { services as staticServices } from "../../content/site-content";
import { useLang } from "../../content/i18n-context";

interface DisplayService {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  from_price?: string;
  image: string;
}

export default function ServicesPage() {
  const { lang, t } = useLang();
  const [dynamicServices, setDynamicServices] = useState<DisplayService[] | null>(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.services && data.services.length > 0) {
          const mapped = data.services.map((item: any) => ({
            id: item.id || item.slug,
            slug: item.slug || item.id,
            title: item.title,
            excerpt: item.excerpt,
            category: item.category,
            from_price: item.from_price,
            image: item.image || "/img/services/led-harflar.webp",
          }));
          setDynamicServices(mapped);
        } else {
          setDynamicServices(null);
        }
      })
      .catch(() => setDynamicServices(null));
  }, []);

  const displayList: DisplayService[] =
    dynamicServices && dynamicServices.length > 0
      ? dynamicServices
      : staticServices.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          title: typeof item.title === "object" ? item.title[lang] : item.title,
          excerpt: typeof item.excerpt === "object" ? item.excerpt[lang] : item.excerpt,
          category: typeof item.category === "object" ? item.category[lang] : item.category,
          image: item.image,
        }));

  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero">
          <div className="wrap">
            <span className="eyebrow mono"><Sparkles size={13} /> TOGO GROUP PRO / {t("pg.svc.eyebrow")}</span>
            <h1>{t("pg.svc.h1a")}<br /><span className="neon">{t("pg.svc.h1b")}</span></h1>
            <p>{t("pg.svc.sub")}</p>
          </div>
        </section>
        <section className="sec">
          <div className="wrap">
            <div className="service-page-grid">
              {displayList.map((item) => (
                <article className="page-service-card" id={item.slug} key={item.id}>
                  <div className="page-card-media">
                    <Image src={item.image} alt={item.title} fill unoptimized sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className="page-card-body">
                    <span>{item.category}</span>
                    <h2>{item.title}</h2>
                    <p>{item.excerpt}</p>
                    {item.from_price && (
                      <div style={{ color: "#ffd24a", fontWeight: 600, fontSize: "14px", marginTop: "4px" }}>
                        <u>{t("from")}</u> {item.from_price}
                      </div>
                    )}
                    <a className="btn" style={{ marginTop: "12px" }} href={`/${lang}/aloqa`}>{t("pg.detail")} <ArrowUpRight size={16} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="wrap page-cta">
          <div>
            <h2>{t("pg.cta.h1a")} <span className="neon">{t("pg.cta.h1b")}</span></h2>
            <p>{t("pg.cta.p")}</p>
          </div>
          <a className="btn primary" href={`/${lang}/aloqa`}>{t("pg.cta.btn")} <ArrowUpRight size={16} /></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
