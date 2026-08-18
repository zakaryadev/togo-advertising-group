"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { labels, locales, navigation, type Locale } from "@/data/site";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("togo_theme") === "light" ? "light" : "dark";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  const hrefForLocale = (next: Locale) => pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, `/${next}`);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("togo_theme", next);
    document.documentElement.dataset.theme = next;
  };
  const closeMenu = () => setOpen(false);
  const links = navigation.map(([slug, label]) => <Link key={slug} href={`/${locale}/${slug}`} onClick={closeMenu}>{label[locale]}</Link>);

  return <header className="route-header">
    <div className="wrap bar">
      <Link href={`/${locale}`} className="brand-logo" aria-label="TOGO GROUP ADVERTISING"><Image src="/togo_logo.svg" alt="TOGO GROUP ADVERTISING" width={292} height={100} priority /></Link>
      <nav className="menu" aria-label="Asosiy navigatsiya"><Link href={`/${locale}`}>{labels.home[locale]}</Link>{links}</nav>
      <div className="tools">
        <div className="langs desktop-only">{locales.map((item) => <Link key={item} className={item === locale ? "lang on" : "lang"} href={hrefForLocale(item)}>{item.toUpperCase()}</Link>)}</div>
        <button className="icobtn desktop-only" onClick={toggleTheme} aria-label="Theme toggle">{theme === "dark" ? "☼" : "☾"}</button>
        <Link className="cta desktop-only" href={`/${locale}/aloqa`}>{labels.request[locale]}</Link>
        <button className="icobtn burger" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18" /></svg></button>
      </div>
    </div>
    <nav id="mobile-navigation" className={open ? "mobile-drawer open" : "mobile-drawer"} aria-label="Mobile navigation">
      <Link href={`/${locale}`} onClick={closeMenu}>{labels.home[locale]}</Link>{links}
      <div className="mobile-drawer-tools">
        <div className="langs">{locales.map((item) => <Link key={item} className={item === locale ? "lang on" : "lang"} href={hrefForLocale(item)} onClick={closeMenu}>{item.toUpperCase()}</Link>)}</div>
        <button className="icobtn" type="button" onClick={toggleTheme} aria-label="Theme toggle">{theme === "dark" ? "☼" : "☾"}</button>
        <Link className="cta" href={`/${locale}/aloqa`} onClick={closeMenu}>{labels.request[locale]}</Link>
      </div>
    </nav>
  </header>;
}
