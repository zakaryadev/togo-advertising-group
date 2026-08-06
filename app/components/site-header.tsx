"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["Bosh sahifa", "/"], ["Xizmatlar", "/xizmatlar"], ["Portfolio", "/portfolio"], ["Jarayon", "/#jarayon"], ["Biz haqimizda", "/#afzalliklar"], ["Aloqa", "/aloqa"]];
export function SiteHeader() { const [open, setOpen] = useState(false); const path = usePathname(); return <header className="site-header"><div className="container header-inner"><Link className="logo" href="/"><Image src="/togo_logo.svg" alt="TOGO Group Pro" width={150} height={52} priority /></Link><nav className="nav">{links.map(([label, href]) => <Link key={href} className={(href !== "/" && path.startsWith(href.split("#")[0])) || (href === "/" && path === "/") ? "active" : ""} href={href}>{label}</Link>)}</nav><div className="phone"><Zap size={15} color="var(--lime)" /> +998 90 123 45 67</div><button className="menu-btn" aria-label="Menyuni ochish" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={21} /></button></div>{open && <aside className="drawer"><button className="menu-btn" aria-label="Menyuni yopish" onClick={() => setOpen(false)}><X size={21} /></button>{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</aside>}</header>; }
