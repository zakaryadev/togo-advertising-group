"use client";
import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { portfolio as staticPortfolio } from "../content/site-content";

interface PortfolioDisplayItem {
  id: string;
  client: string;
  service: string;
  image: string;
}

const filters = ["Barchasi", "LED Logo", "LED Harf", "Lightbox", "Stend", "Avto reklama", "Tashqi reklama"];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("Barchasi");
  const [items, setItems] = useState<PortfolioDisplayItem[]>([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const mapped = data.items.map((item: any) => ({
            id: item.id || item.slug,
            client: item.title || item.client,
            service: item.service_type || item.service,
            image: item.image_url || item.image,
          }));
          setItems(mapped);
        } else {
          setItems(staticPortfolio);
        }
      })
      .catch(() => setItems(staticPortfolio));
  }, []);

  const displayList = items.length > 0 ? items : staticPortfolio;

  const visible = useMemo(
    () => (filter === "Barchasi" ? displayList : displayList.filter((item) => item.service === filter)),
    [filter, displayList]
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero">
          <div className="wrap">
            <span className="eyebrow mono"><BriefcaseBusiness size={13} /> TOGO GROUP PRO / PORTFOLIO</span>
            <h1>Biz yaratgan <span className="neon">ko&rsquo;rinadigan</span><br /> brendlar.</h1>
            <p>Har bir loyiha — g&rsquo;oya, aniqlik va sifatli ishlab chiqarish natijasi.</p>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <div className="filter-bar" role="group" aria-label="Portfolio kategoriyalari">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "filter active" : "filter"}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="portfolio-page-grid">
              {visible.map((item) => (
                <article className="portfolio-page-card" key={item.id}>
                  <div className="portfolio-page-media">
                    <Image
                      src={item.image}
                      alt={`${item.client} loyihasi`}
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
