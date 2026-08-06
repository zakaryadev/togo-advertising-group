"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Camera,
  CarFront,
  Clock3,
  HardHat,
  LayoutPanelTop,
  Menu,
  MessageCircle,
  PackageCheck,
  PanelsTopLeft,
  PenLine,
  Play,
  Printer,
  Send,
  Settings,
  Sparkles,
  Trophy,
  Truck,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
const Instagram = Camera;

const nav = [
  ["Bosh sahifa", "top"],
  ["Xizmatlar", "xizmatlar"],
  ["Portfolio", "portfolio"],
  ["Jarayon", "jarayon"],
  ["Biz haqimizda", "afzalliklar"],
  ["Aloqa", "aloqa"],
];
const navHref = (id: string) => ({ xizmatlar: "/xizmatlar", portfolio: "/portfolio", aloqa: "/aloqa" }[id] ?? `#${id}`);
const services = [
  [
    "LED Harflar",
    "Har qanday turdagi yoritiladigan harflar",
    Sparkles,
    "/img/services/led-harflar.webp",
  ],
  [
    "Lightbox",
    "Yoritiladigan qutilar va panellar",
    PanelsTopLeft,
    "/img/services/lightbox.webp",
  ],
  [
    "Banner",
    "Tashqi va ichki banner ishlab chiqarish",
    Printer,
    "/img/services/banner.webp",
  ],
  [
    "Roll Up",
    "Rolap stendlar va konstruksiyalar",
    LayoutPanelTop,
    "/img/services/roll-up.webp",
  ],
  [
    "Stend",
    "Ko‘rgazma va savdo stendlar",
    PanelsTopLeft,
    "/img/services/stend.webp",
  ],
  [
    "Avto reklama",
    "Avtomobillarga brend va reklama yopishtirish",
    CarFront,
    "/img/services/avto-reklama.webp",
  ],
  [
    "Statuetka",
    "Akril, metal va boshqa esdalik sovg‘alar",
    Award,
    "/img/services/statuetka.webp",
  ],
  [
    "UV Print",
    "UV bosma xizmati, turli materiallarga",
    PackageCheck,
    "/img/services/uv-print.webp",
  ],
] as const;
const portfolio = [
  ["Litto Hotel", "LED Logo", "/img/portfolio/litto-hotel.webp"],
  ["Artel Showroom", "LED Harf", "/img/portfolio/artel-showroom.webp"],
  ["Lightme Office", "Lightbox", "/img/portfolio/lightme-office.webp"],
  ["Mövenpick Hotel", "LED Logo", "/img/portfolio/movenpick.webp"],
  ["Ideal Furniture", "Stend", "/img/portfolio/ideal-furniture.webp"],
  ["Nest One", "Tashqi Reklama", "/img/portfolio/nest-one.webp"],
  ["UzAuto Motors", "Stend", "/img/portfolio/uzauto-motors.webp"],
  ["Korzinka", "Avto reklama", "/img/portfolio/korzinka.webp"],
  ["N-Clinic", "Tashqi Reklama", "/img/portfolio/n-clinic.webp"],
  ["Wine Time", "LED Harf", "/img/portfolio/wine-time.webp"],
];
const metrics = [
  ["500+", "Loyihalar", Trophy],
  ["120+", "Doimiy mijozlar", Users],
  ["48 soat", "O‘rtacha ishlab chiqarish", Clock3],
  ["5+", "Yillik tajriba", Award],
] as const;
const process = [
  [
    "01",
    "Buyurtma",
    "Mijoz talabini aniqlaymiz va maslahat beramiz.",
    PanelsTopLeft,
  ],
  ["02", "Dizayn", "Professional dizayn va 3D vizualizatsiya.", PenLine],
  [
    "03",
    "Ishlab chiqarish",
    "Zamonaviy uskunalarda sifatli ishlab chiqarish.",
    Settings,
  ],
  ["04", "O‘rnatish", "Yetkazib berish va o‘rnatish ishlari.", Wrench],
] as const;
const benefits = [
  ["Premium materiallar", Award],
  ["Tezkor ishlab chiqarish", Sparkles],
  ["Sifat kafolati 100%", BadgeCheck],
  ["Professional dizayn", PenLine],
  ["Yetkazib berish xizmati", Truck],
  ["Montaj va servis", HardHat],
] as const;
const Arrow = () => <ArrowUpRight size={15} strokeWidth={2.2} />;

export default function Home() {
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState("top");
  useEffect(() => {
    const f = () => {
      const found = nav
        .map(([, id]) => id)
        .find((id) => {
          const e = document.getElementById(id);
          return (
            e &&
            e.getBoundingClientRect().top < 140 &&
            e.getBoundingClientRect().bottom > 140
          );
        });
      if (found) setActive(found);
    };
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <main id="top">
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top">
            <Image src="/togo_logo.svg" alt="TOGO Group Pro" width={150} height={52} priority />
          </a>
          <nav className="nav">
            {nav.map(([l, id]) => (
              <a
                key={id}
                className={active === id ? "active" : ""}
                href={navHref(id)}
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="phone">
            <Zap size={15} color="var(--lime)" /> +998 90 123 45 67
          </div>
          <button
            className="menu-btn"
            aria-label="Menyuni ochish"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      {drawer && (
        <aside className="drawer">
          <button
            className="menu-btn"
            aria-label="Menyuni yopish"
            onClick={() => setDrawer(false)}
          >
            <X size={21} />
          </button>
          {nav.map(([l, id]) => (
            <a key={id} href={navHref(id)} onClick={() => setDrawer(false)}>
              {l}
            </a>
          ))}
        </aside>
      )}
      <section className="hero">
        <div className="container hero-content">
          <div className="eyebrow">
            <Zap size={13} color="var(--lime)" />
            Nafaqat reklama, balki obro‘ ham o‘rnatamiz!
          </div>
          <h1>
            Biz brendingizni <span className="lime">ko‘rinadigan</span> qilamiz.
          </h1>
          <p>
            Tashqi reklama, LED harflar, stend, banner, brending, poligrafiya va
            boshqa reklama xizmatlari.
          </p>
          <div className="actions">
            <a className="btn primary" href="#aloqa">
              BEPUL KONSULTATSIYA <Arrow />
            </a>
            <a className="btn" href="#portfolio">
              PORTFOLIO <Arrow />
            </a>
          </div>
          <div className="socials">
            <a href="#aloqa" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="#aloqa" aria-label="Telegram">
              <Send size={14} />
            </a>
            <a href="#aloqa" aria-label="WhatsApp">
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
        <div className="hero-sign">
          <div className="sign-box">
            <Image
              src="/togo_logo.svg"
              alt="TOGO Group Pro"
              width={430}
              height={148}
              priority
              className="hero-logo-3d"
            />
          </div>
          <button className="btn" onClick={() => setModal(true)}>
            <Play size={14} fill="currentColor" /> Ish jarayonimizni tomosha
            qiling
          </button>
        </div>
      </section>
      <div className="container metrics">
        {metrics.map(([n, l, Icon]) => (
          <div className="metric" key={l}>
            <div className="metric-icon">
              <Icon size={28} />
            </div>
            <div>
              <strong>{n}</strong>
              <small>{l}</small>
            </div>
          </div>
        ))}
      </div>
      <section className="section" id="xizmatlar">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Xizmatlarimiz</h2>
            <a className="section-link" href="#xizmatlar">
              Barcha xizmatlar <Arrow />
            </a>
          </div>
          <div className="grid services">
            {services.map(([t, p, Icon, img]) => (
              <article className="card" key={t}>
                <div className="service-media">
                  <Image
                    src={img}
                    alt={t}
                    fill
                    sizes="(max-width:767px) 50vw,(max-width:1023px) 25vw,15vw"
                  />
                </div>
                <div className="card-body">
                  <div className="card-icon">
                    <Icon size={18} />
                  </div>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="portfolio">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Portfolio</h2>
            <a className="section-link" href="#portfolio">
              Barcha loyihalar <Arrow />
            </a>
          </div>
          <div className="grid portfolio">
            {portfolio.map(([t, s, img]) => (
              <article className="card" key={t}>
                <div className="portfolio-media">
                  <Image
                    src={img}
                    alt={t + " — " + s}
                    fill
                    sizes="(max-width:767px) 100vw,(max-width:1023px) 50vw,25vw"
                  />
                </div>
                <div className="portfolio-body">
                  <h3>{t}</h3>
                  <p>{s}</p>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <a className="btn" href="#portfolio">
              BARCHA PORTFOLIO <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="section" id="jarayon">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Ishlash jarayoni</h2>
          </div>
          <div className="process">
            {process.map(([n, t, p, Icon]) => (
              <div className="process-step" key={n}>
                <div className="step-num">
                  <Icon size={22} />
                </div>
                <div>
                  <b>{n}</b>
                  <strong>{t}</strong>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" id="afzalliklar">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Nega aynan biz?</h2>
          </div>
          <div className="grid benefits">
            {benefits.map(([t, Icon]) => (
              <div className="benefit" key={t}>
                <b>
                  <Icon size={20} />
                </b>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="logos" aria-label="Mijozlar logolari">
            Hilton　 artel　 payme　 MÖVENPICK　 UzAuto　 korzinka　 IDEAL　
            N-clinic
          </div>
        </div>
      </section>
      <section className="container cta" id="aloqa">
        <div>
          <h2>
            Loyihangizni <span className="lime">bugun</span> boshlang.
          </h2>
          <p>Bepul konsultatsiya oling va maxsus taklifga ega bo‘ling!</p>
        </div>
        <a className="btn primary" href="mailto:info@togogrouppro.uz">
          BUYURTMA BERISH <Arrow />
        </a>
      </section>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="logo"><Image src="/togo_logo.svg" alt="TOGO Group Pro" width={150} height={52} /></div>
            <p>Tashqi reklama va brending bo‘yicha professional yechimlar.</p>
            <div className="socials">
              <a href="#aloqa">
                <Instagram size={14} />
              </a>
              <a href="#aloqa">
                <Send size={14} />
              </a>
              <a href="#aloqa">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
          <div>
            <h3>Xizmatlar</h3>
            {services.slice(0, 6).map(([t]) => (
              <a href="#xizmatlar" key={t}>
                {t}
              </a>
            ))}
          </div>
          <div>
            <h3>Kompaniya</h3>
            <a href="#afzalliklar">Biz haqimizda</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#jarayon">Jarayon</a>
            <a href="#aloqa">Aloqa</a>
          </div>
          <div>
            <h3>Aloqa</h3>
            <p>+998 90 123 45 67</p>
            <p>info@togogrouppro.uz</p>
            <p>Toshkent, Chilonzor tumani</p>
          </div>
        </div>
      </footer>
      {modal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Video maketi"
          onClick={() => setModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="menu-btn"
              style={{ float: "right" }}
              onClick={() => setModal(false)}
            >
              <X size={18} />
            </button>
            <h2>Ish jarayonimiz</h2>
            <div className="play">
              <Play size={25} />
            </div>
            <p style={{ color: "var(--muted)" }}>
              Video keyingi bosqichda ulanadi. Hozircha bu demo oynasi.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
