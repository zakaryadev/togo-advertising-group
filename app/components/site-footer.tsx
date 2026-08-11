"use client";
import { useEffect, useState } from "react";
import { useLang } from "../content/i18n-context";

import Link from "next/link";

export function SiteFooter() {
  const { t, lang } = useLang();
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer>
      <div className="wrap">
        <Link href={`/${lang}`} className="footer-logo-wrap" aria-label="TOGO GROUP ADVERTISING">
          <img
            src="/togo_logo.svg"
            alt="TOGO GROUP ADVERTISING"
            width={600}
            height={200}
            className="footer-logo-img"
          />
        </Link>
        <div className="fbot mono">
          <span>© {year} TOGO GROUP ADVERTISING · {t("ct.city")}</span>
          <span>{t("ft.tags")}</span>
          <Link href="/admin" style={{ opacity: 0.5 }}>Admin</Link>
          <span>togogroup.uz</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
