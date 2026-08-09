"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "../content/i18n-context";
import type { LangKey } from "../content/translations";

const navItems = [
  { key: "nav.svc", path: "/xizmatlar" },
  { key: "nav.calc", path: "#hisob" },
  { key: "nav.mat", path: "#material" },
  { key: "nav.work", path: "/portfolio" },
  { key: "nav.proc", path: "#jarayon" },
  { key: "nav.contact", path: "/aloqa" },
];

export function SiteHeader() {
  const { lang, t } = useLang();
  const pathname = usePathname();
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

  const getLocalizedPath = (langCode: LangKey) => {
    const rest = pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, "");
    return `/${langCode}${rest}`;
  };

  return (
    <header id="hd" ref={headerRef}>
      <div className="wrap nav">
        <Link href={`/${lang}`} className="logo" aria-label="TOGO GROUP PRO">
          <img
            src="/togo_logo.svg"
            alt="TOGO GROUP PRO"
            width={140}
            height={48}
            className="logo-img"
          />
        </Link>
        <nav className={`nav-links${menuOpen ? " open" : ""}`} id="menu">
          {navItems.map((item) => (
            <Link key={item.key} href={`/${lang}${item.path}`} onClick={closeMenu}>
              <i>{t(item.key)}</i>
              <i>{t(item.key)}</i>
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang" id="lang">
            {(["uz", "ru", "en"] as LangKey[]).map((l) => (
              <Link
                key={l}
                href={getLocalizedPath(l)}
                className={lang === l ? "on" : ""}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <a href={`/${lang}#aloqa`} className="btn mag">
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
