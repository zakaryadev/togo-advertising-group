"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../content/i18n-context";
import type { LangKey } from "../content/translations";

const navItems = [
  { key: "nav.svc", href: "#xizmat" },
  { key: "nav.calc", href: "#hisob" },
  { key: "nav.mat", href: "#material" },
  { key: "nav.work", href: "#ishlar" },
  { key: "nav.proc", href: "#jarayon" },
  { key: "nav.contact", href: "#aloqa" },
];

export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("stuck", scrollY > 40);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="hd" ref={headerRef}>
      <div className="wrap nav">
        <a href="#top" className="logo" aria-label="TOGO GROUP PRO">
          <img
            src="/togo_logo.svg"
            alt="TOGO GROUP PRO"
            width={140}
            height={48}
            className="logo-img"
          />
        </a>
        <nav className={`nav-links${menuOpen ? " open" : ""}`} id="menu">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} onClick={closeMenu}>
              <i>{t(item.key)}</i>
              <i>{t(item.key)}</i>
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang" id="lang">
            {(["uz", "ru", "en"] as LangKey[]).map((l) => (
              <button
                key={l}
                className={lang === l ? "on" : ""}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#aloqa" className="btn mag">
            <s />
            <span>{t("nav.quote")}</span>
          </a>
          <button
            className={`burger${menuOpen ? " on" : ""}`}
            id="bg"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i /><i /><i />
          </button>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
