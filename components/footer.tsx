"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  function copyRequisites() {
    const text = `«TOGO GROUP ADVERTISING» MCHJ
STIR: 312481772
IFUT: 73110
H/R: 2020 8000 8073 2289 6001
Bank: HAMKORBANK (MFO: 00083)
Manzil: Toshkent sh., Yashnobod MFY, 4-Aviasozlar mavzesi, 9-uy`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      {/* Official requisites section */}
      <section className="wrap" id="rasmiy">
        <div className="kick">RASMIY MA'LUMOTLAR</div>
        <h2>Kompaniya rekvizitlari va to'lov shartlari</h2>

        <div className="info">
          <div className="ib">
            <h4>
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M7 15h0M2 9.5h20" />
              </svg>
              <span>«TOGO GROUP ADVERTISING» MCHJ</span>
            </h4>
            <div className="co">RASMIY RO'YXATDAN O'TGAN YURIDIK SHAXS</div>
            <p>
              Biz bilan tuzilgan shartnomalar, hisob-faktura (EHF) va barcha to'lovlar davlat xaridlari (xarid.uzex.uz, dxarid.uzex.uz) talablariga mos ravishda amalga oshiriladi.
            </p>

            <div className="rq">
              <div>
                <i>STIR / INN</i>
                <b>312481772</b>
              </div>
              <div>
                <i>IFUT CODE</i>
                <b>73110 (Reklama agentliklari xizmati)</b>
              </div>
              <div>
                <i>HISOBLASH RAQAMI</i>
                <b>2020 8000 8073 2289 6001</b>
              </div>
              <div>
                <i>BANK VA MFO</i>
                <b>HAMKORBANK (MFO: 00083)</b>
              </div>
            </div>

            <button type="button" className="copy" onClick={copyRequisites}>
              <svg viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{copied ? "NUSXALANDI!" : "REKVIZITLARNI NUSXALASH"}</span>
            </button>
          </div>

          <div className="ib">
            <h4>
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Bog'lanish va Aloqa</span>
            </h4>

            <div className="contact" style={{ marginTop: "16px" }}>
              <div className="clist">
                <a href="tel:+998773004500" className="cl">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <i>SAVDO BO'LIMI</i>
                    <b>+998 77 300 45 00</b>
                  </div>
                </a>

                <a href="https://t.me/togo_group_pro" target="_blank" rel="noopener noreferrer" className="cl">
                  <svg viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <div>
                    <i>TELEGRAM</i>
                    <b>@togo_group_pro</b>
                  </div>
                </a>

                <a href="https://www.instagram.com/togo_group_pro/" target="_blank" rel="noopener noreferrer" className="cl">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <div>
                    <i>INSTAGRAM</i>
                    <b>@togo_group_pro</b>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer bottom */}
      <footer>
        <div className="wrap fgrid">
          <div>
            <div className="ftlabel">TOGO GROUP ADVERTISING</div>
            <p>
              Toshkent shahrida obyomli harflar, kran reklamasi, katta formatli bosma hamda poligrafiya xizmatlari.
            </p>
            <div className="mono">
              © {new Date().getFullYear()} TOGO GROUP ADVERTISING MCHJ. Barcha huquqlar himoyalangan.
            </div>
          </div>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <Link href="#home">Asosiy</Link>
            <Link href="#yonalish">Yo'nalishlar</Link>
            <Link href="#portfolio">Portfolio</Link>
            <Link href="#anketa">Aloqa</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
