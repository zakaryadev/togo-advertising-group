import Link from "next/link";
import { heroCopy, labels, type Locale } from "@/data/site";

const tickerData: Record<Locale, string> = {
  uz: "Tom va kranga reklama  •  Obyomli harf  •  Yorug'lik qutisi  •  LED ekran  •  Neon reklama  •  Yuguruvchi qator  •  Kontrajur yoritish  •  Fasad reklamasi  •  Tom ustiga logotip  •  Stella  •  Navigatsiya ko'rsatkichlari  •  Banner bosma  •  UV bosma  •  Poligrafiya  •  Roll Up  •  Press-wall  •  Suvenirlar  •  Avtomobil brendlash  •  ",
  ru: "Реклама на крышах и кранах  •  Объёмные буквы  •  Световые короба  •  LED экраны  •  Неоновая реклама  •  Бегущая строка  •  Контражурная подсветка  •  Фасадная реклама  •  Крышные установки  •  Стеллы  •  Навигация  •  Печать баннеров  •  УФ-печать  •  Полиграфия  •  Roll Up  •  Press-wall  •  Сувениры  •  Брендирование авто  •  ",
  en: "Rooftop & crane ads  •  3D letters  •  Lightboxes  •  LED screens  •  Neon signs  •  LED tickers  •  Backlit illumination  •  Facade branding  •  Rooftop signs  •  Pylons  •  Wayfinding  •  Banner printing  •  UV printing  •  Print production  •  Roll Up  •  Press-wall  •  Corporate gifts  •  Fleet branding  •  ",
};
const specificationLabels = { uz: ["BOSMA KENGLIGI", "BOSMA ANIQLIGI", "KONSTRUKSIYA KAFOLATI", "BALANDLIKDAGI MONTAJ"], ru: ["ШИРИНА ПЕЧАТИ", "РАЗРЕШЕНИЕ", "ГАРАНТИЯ КОНСТРУКЦИИ", "ВЫСОТНЫЙ МОНТАЖ"], en: ["PRINT WIDTH", "RESOLUTION", "STRUCTURE WARRANTY", "HEIGHT INSTALLATION"] } as const;

export default function Hero({ locale }: { locale: Locale }) {
  const copy = heroCopy;
  const signWord = locale === "ru" ? "РЕКЛАМА" : locale === "en" ? "ADVERTISING" : "REKLAMA";
  const step = locale === "en" ? 25 : 34;
  const startX = locale === "en" ? 122 : 140;
  const letterWidth = locale === "en" ? 22 : 30;
  const specs = specificationLabels[locale];
  const ticker = tickerData[locale];

  return <>
    <section className="hero wrap" id="home">
      <div className="herotext">
        <span className="eyebrow">{copy.eyebrow[locale]}</span>
        <h1><span>{copy.title1[locale]} </span><em>{copy.title2[locale]}</em><span className="t3"> {copy.title3[locale]}</span></h1>
        <p className="lead">{copy.lead[locale]}</p>
        <div className="hbtns"><Link href={`/${locale}/aloqa`} className="cta">{labels.request[locale]}</Link><a href="https://price.togogroup.uz" target="_blank" rel="noreferrer" className="cta ghost">{copy.priceCatalog[locale]}</a></div>
      </div>
      <div className="scene" aria-hidden="true"><svg viewBox="0 0 620 440" className="sc">
        <g className="bgline"><path d="M40 90h540M40 150h540M40 210h540M40 270h540M40 330h540" /></g><path className="ground" d="M30 392h560" />
        <g className="bld"><rect className="wallb" x="112" y="96" width="300" height="296" /><rect className="wall" x="112" y="96" width="300" height="296" /><path className="thin" d="M112 150h300M112 316h300" /><g className="win"><rect x="140" y="176" width="52" height="52" rx="3" /><rect x="212" y="176" width="52" height="52" rx="3" /><rect x="284" y="176" width="52" height="52" rx="3" /><rect x="356" y="176" width="34" height="52" rx="3" /><rect x="140" y="248" width="52" height="52" rx="3" /><rect x="212" y="248" width="52" height="52" rx="3" /><rect x="284" y="248" width="52" height="52" rx="3" /><rect x="356" y="248" width="34" height="52" rx="3" /></g><rect className="door" x="238" y="330" width="48" height="62" rx="3" /><path className="thin" d="M262 330v62" /></g>
        <g className="sign">{Array.from(signWord).map((letter, index) => { const x = startX + index * step; return <g className="ln" style={{ animationDelay: `${0.4 + index * 0.12}s` }} key={`${letter}-${index}`}><rect x={x} y="112" width={letterWidth} height="30" rx="4" /><text x={x + letterWidth / 2} y="133" textAnchor="middle">{letter}</text></g>; })}<path className="glow" d="M140 150h260" /></g>
        <g className="ladder"><path className="rail" d="M392 372V150M420 372V150" /><path className="rung" d="M392 176h28M392 206h28M392 236h28M392 266h28M392 296h28M392 326h28M392 356h28" /></g>
        <g className="worker"><path className="thick" d="M402 300l-6 26M414 300l6 26" /><path className="suit" d="M398 262h20l4 40h-28z" /><path className="stroke" d="M398 262h20l4 40h-28z" /><circle className="head" cx="408" cy="246" r="13" /><circle className="stroke" cx="408" cy="246" r="13" fill="none" /><path className="helmet" d="M393 244a15 15 0 0130 0z" /><path className="stroke" d="M393 244a15 15 0 0130 0z" fill="none" /><path className="thin" d="M391 244h34" /><path className="arm thick" d="M400 272l-38-10" /><circle className="hand" cx="358" cy="260" r="5" /></g>
        <g className="sparks"><circle cx="356" cy="130" r="4" /><circle cx="250" cy="122" r="3" /><circle cx="180" cy="132" r="4" /></g>
      </svg></div>
    </section>
    <div className="specs wrap"><div className="spec"><i>{specs[0]}</i><b>3.2 m</b></div><div className="spec"><i>{specs[1]}</i><b>1440 dpi</b></div><div className="spec"><i>{specs[2]}</i><b>12 {locale === "ru" ? "мес." : locale === "en" ? "months" : "oy"}</b></div><div className="spec"><i>{specs[3]}</i><b>{locale === "ru" ? "Кран и фасад" : locale === "en" ? "Crane & facade" : "Kran va fasad"}</b></div></div>
    <div className="mq bleed"><div><span>{ticker}</span><span>{ticker}</span></div></div>
  </>;
}
