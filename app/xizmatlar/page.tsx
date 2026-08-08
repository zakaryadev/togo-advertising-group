import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { services } from "../content/site-content";

export const metadata: Metadata = {
  title: "Xizmatlar",
  description: "LED harflar, lightbox, banner, stend, avto reklama, statuetka va UV print — TOGO Group Pro'ning Toshkentdagi barcha tashqi reklama va brending xizmatlari.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow"><Sparkles size={13} /> TOGO GROUP PRO / XIZMATLAR</span>
            <h1>Brendingiz uchun barcha<br /><span className="lime">reklama yechimlari.</span></h1>
            <p>G‘oyadan o‘rnatishgacha — brendingizni ko‘rinadigan qiladigan to‘liq xizmatlar.</p>
          </div>
        </section>
        <section className="section page-section">
          <div className="container">
            <div className="grid service-page-grid">
              {services.map(item => (
                <article className="page-service-card" id={item.slug} key={item.id}>
                  <div className="page-card-media">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </div>
                  <div className="page-card-body">
                    <span>{item.category}</span>
                    <h2>{item.title}</h2>
                    <p>{item.excerpt}</p>
                    <a className="btn" href="/aloqa">BATAFSIL <ArrowUpRight size={16} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="container page-cta">
          <div>
            <h2>Loyihangizni <span className="lime">bugun</span> boshlang.</h2>
            <p>Bepul konsultatsiya oling va maxsus taklifga ega bo‘ling!</p>
          </div>
          <a className="btn primary" href="/aloqa">BOG‘LANISH <ArrowUpRight size={16} /></a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
