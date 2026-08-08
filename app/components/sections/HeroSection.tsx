"use client";
import { useLang } from "../../content/i18n-context";
import { SvgIcon } from "../SvgIcons";

export default function HeroSection() {
  const { t, ta } = useLang();
  const headWords = ta("head");

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <span className="eyebrow mono">{t("hero.eyebrow")}</span>
        <h1>
          {headWords.map((word, i) => (
            <span className="mask" key={i}>
              <u className={i === headWords.length - 1 ? "neon" : ""}>{word}</u>
            </span>
          ))}
        </h1>
        <div className="hero-btm">
          <div>
            <p className="hero-sub rv">{t("hero.sub")}</p>
            <div className="hero-cta rv">
              <a href="#aloqa" className="btn mag">
                <s /><span>{t("hero.cta1")}</span>
              </a>
              <a href="#ishlar" className="btn ghost mag">
                <s /><span>{t("hero.cta2")}</span>
              </a>
            </div>
          </div>
          <a href="#aloqa" className="badge rv">
            <svg viewBox="0 0 200 200">
              <defs><path id="cir" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"/></defs>
              <text fill="#F3EFE2" fontFamily="JetBrains Mono, monospace" fontSize="13" letterSpacing="4.6">
                <textPath href="#cir">TOGO GROUP PRO · SIGNAGE · PRINT · TASHKENT · </textPath>
              </text>
            </svg>
            <span className="ar">↓</span>
          </a>
        </div>
        <div className="specbar rv">
          <div><span className="mono">{t("sp1")}</span><b>3.2 m</b></div>
          <div><span className="mono">{t("sp2")}</span><b>1440 dpi</b></div>
          <div><span className="mono">{t("sp3")}</span><b>CMYK + Spot</b></div>
          <div><span className="mono">{t("sp4")}</span><b>41.31 / 69.24</b></div>
        </div>
        <div className="herofig rv">
          <SvgIcon id="i-billboard" className="il" />
        </div>
      </div>
    </section>
  );
}
