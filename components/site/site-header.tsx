"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, labels, locales, navigation, type Locale } from "@/data/site";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("togo_theme") === "light" ? "light" : "dark";
    setTheme(saved); document.documentElement.dataset.theme = saved;
  }, []);
  useEffect(() => { document.body.classList.toggle("nav-open", open); return () => document.body.classList.remove("nav-open"); }, [open]);

  const hrefForLocale = (next: Locale) => pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, `/${next}`);
  const close = () => setOpen(false);
  const toggleTheme = () => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem("togo_theme", next); };
  const isActive = (slug?: string) => {
    if (!slug) return pathname === `/${locale}` || pathname === `/${locale}/`;
    if (slug === "yonalishlar" && pathname.startsWith(`/${locale}/xizmatlar`)) return true;
    return pathname === `/${locale}/${slug}` || pathname.startsWith(`/${locale}/${slug}/`);
  };
  const navLink = (slug: string, label: string) => <Link href={`/${locale}/${slug}`} key={slug} onClick={close} className={isActive(slug) ? "on" : undefined} aria-current={isActive(slug) ? "page" : undefined}>{label}</Link>;
  const navLinks = navigation.map(([slug, label]) => navLink(slug, label[locale]));

  return <header className="route-header">
    <div className="wrap bar">
      <Link href={`/${locale}`} className="brand-logo" aria-label="TOGO GROUP ADVERTISING"><Image src="/togo_logo.svg" alt="TOGO GROUP ADVERTISING" width={292} height={100} priority /></Link>
      <nav className="menu" aria-label="Asosiy navigatsiya"><Link href={`/${locale}`} className={isActive() ? "on" : undefined} aria-current={isActive() ? "page" : undefined}>{labels.home[locale]}</Link>{navLinks}<Link href={`/${locale}/aloqa`} className={isActive("aloqa") ? "on" : undefined} aria-current={isActive("aloqa") ? "page" : undefined}>{labels.contact[locale]}</Link></nav>
      <div className="tools">
        <div className="langs desktop-only">{locales.map((item) => <Link key={item} className={item === locale ? "lang on" : "lang"} href={hrefForLocale(item)}>{item.toUpperCase()}</Link>)}</div>
        <button className="icobtn desktop-only" type="button" onClick={toggleTheme} aria-label="Tema almashtirish">{theme === "dark" ? <Sun /> : <Moon />}</button>
        <Link className="cta desktop-only" href={`/${locale}/aloqa`}>{labels.request[locale]}</Link>
        <a className="callbtn desktop-only" href="tel:+998990000602"><Phone aria-hidden="true" /><b>+998 99 000 06 02</b></a>
        <button className="icobtn burger" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-drawer" aria-label="Mobil navigatsiya">
      <Link href={`/${locale}`} onClick={close} className={isActive() ? "on" : undefined}>{labels.home[locale]}</Link>{navLinks}<Link href={`/${locale}/aloqa`} onClick={close} className={isActive("aloqa") ? "on" : undefined}>{labels.contact[locale]}</Link>
      <div className="mobile-drawer-tools"><div className="langs">{locales.map((item) => <Link key={item} className={item === locale ? "lang on" : "lang"} href={hrefForLocale(item)} onClick={close}>{item.toUpperCase()}</Link>)}</div><button className="icobtn" type="button" onClick={toggleTheme}>{theme === "dark" ? <Sun /> : <Moon />}</button><Link className="cta" href={`/${locale}/aloqa`} onClick={close}>{labels.request[locale]}</Link></div>
      <a className="dcall" href={contact.phoneHref}><Phone aria-hidden="true" />{contact.phone}</a>
    </nav>
  </header>;
}
