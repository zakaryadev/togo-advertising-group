"use client";
import { useEffect, useState } from "react";
import { useLang } from "../content/i18n-context";

import Link from "next/link";

export function SiteFooter() {
  const { t } = useLang();
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer>
      <div className="wrap">
        <a href="#top" className="footer-logo-wrap" aria-label="TOGO GROUP PRO">
          <img
            src="/togo_logo.svg"
            alt="TOGO GROUP PRO"
            width={600}
            height={200}
            className="footer-logo-img"
          />
        </a>
        <div className="fbot mono">
          <span>© {year} TOGO GROUP PRO · {t("ct.city")}</span>
          <span>{t("ft.tags")}</span>
          <Link href="/admin" style={{ opacity: 0.5 }}>Admin</Link>
          <span>togogrouppro.uz</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
