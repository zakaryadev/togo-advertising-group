"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact } from "../content/site-content";

const links = [
  ["Bosh sahifa", "/"],
  ["Xizmatlar", "/xizmatlar"],
  ["Portfolio", "/portfolio"],
  ["Jarayon", "/#jarayon"],
  ["Biz haqimizda", "/#afzalliklar"],
  ["Aloqa", "/aloqa"],
] as const;

const isActive = (href: string, path: string) => {
  const pathname = href.split("#")[0] || "/";
  return href.includes("#")
    ? path === "/"
    : pathname === "/"
      ? path === "/"
      : path === pathname;
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="logo" href="/">
            <Image
              src="/togo_logo.svg"
              alt="TOGO Group Pro"
              width={150}
              height={52}
              priority
            />
          </Link>

          <nav className="nav" aria-label="Asosiy navigatsiya">
            {links.map(([label, href]) => (
              <Link
                key={href}
                className={isActive(href, path) ? "active" : ""}
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a className="phone" href={contact.phoneHref}>
            <Zap size={15} color="var(--lime)" /> {contact.phone}
          </a>

          <button
            className="menu-btn"
            aria-label="Menyuni ochish"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={21} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              aria-label="Navigatsiya menyusi"
            >
              <button
                className="menu-btn"
                aria-label="Menyuni yopish"
                onClick={() => setOpen(false)}
              >
                <X size={21} />
              </button>

              {links.map(([label, href]) => (
                <Link
                  className={isActive(href, path) ? "active" : ""}
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
