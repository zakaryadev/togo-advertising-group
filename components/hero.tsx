import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="hero wrap" id="home">
        <div className="herotext">
          <div className="eyebrow">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>Toshkentda to'liq ishlab chiqarish sikli</span>
          </div>

          <h1>
            Obyomli harflar, <em>kran reklamasi</em> va poligrafiya
          </h1>

          <p className="lead">
            Yashnobod tumanidagi o'z sexlarimizda dizayndan tortib minorali kran va balandlikdagi murakkab montajgacha — bitta jamoada. Ochiq narxlar, davlat xaridlari, EHF va kafolat.
          </p>

          <div className="hbtns">
            <Link href="#anketa" className="cta">
              <span>BETA-HISOB OLISH</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="#portfolio" className="cta ghost">
              <span>PORTFOLIO</span>
            </Link>
          </div>

          <div className="specs">
            <div className="spec">
              <i>TAJRIBA</i>
              <b>7+ YIL</b>
            </div>
            <div className="spec">
              <i>LOYIHALAR</i>
              <b>500+</b>
            </div>
            <div className="spec">
              <i>KAFOLAT</i>
              <b>12 OY</b>
            </div>
            <div className="spec">
              <i>MUDDAT</i>
              <b>1-3 KUN</b>
            </div>
          </div>
        </div>

        {/* Vector scene illustration */}
        <div className="scene" aria-hidden="true">
          <svg viewBox="0 0 800 600" className="sc">
            <g className="bgline">
              <path d="M 0 500 L 800 500" />
              <path d="M 0 450 L 800 450" />
            </g>
            <path className="ground" d="M 40 500 L 760 500" />
            
            {/* Building framework */}
            <rect x="220" y="240" width="360" height="260" className="wallb" />
            <rect x="220" y="240" width="360" height="260" className="wall" />
            <rect x="250" y="270" width="60" height="80" className="win" />
            <rect x="340" y="270" width="60" height="80" className="win" />
            <rect x="430" y="270" width="60" height="80" className="win" />
            <rect x="520" y="270" width="60" height="80" className="win" />
            <rect x="360" y="410" width="80" height="90" className="door" />

            {/* Glowing sign letters */}
            <g className="ln l2">
              <rect x="240" y="160" width="80" height="50" rx="8" />
              <text x="280" y="187" textAnchor="middle" fontSize="24">
                TO
              </text>
            </g>
            <g className="ln l3">
              <rect x="330" y="160" width="80" height="50" rx="8" />
              <text x="370" y="187" textAnchor="middle" fontSize="24">
                GO
              </text>
            </g>
            <g className="ln">
              <rect x="420" y="160" width="140" height="50" rx="8" />
              <text x="490" y="187" textAnchor="middle" fontSize="22">
                GROUP
              </text>
            </g>

            {/* Worker on scaffolding */}
            <g className="worker">
              <line x1="600" y1="120" x2="600" y2="500" className="rail" />
              <line x1="640" y1="120" x2="640" y2="500" className="rail" />
              <circle cx="620" cy="220" r="14" className="helmet" />
              <rect x="612" y="234" width="16" height="30" rx="4" className="suit" />
              <line x1="620" y1="240" x2="570" y2="210" className="arm" strokeWidth="6" />
            </g>
          </svg>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="mq bleed">
        <div>
          <span>OBYOMLI HARFLAR</span> • KRAN REKLAMASI • KATTA FORMATLI BOSMA • UV BOSMA • POLIGRAFIYA • KO'RGAZMA STENDLARI • LIGHTBOX • AVTO BRENDLASH •
          <span>OBYOMLI HARFLAR</span> • KRAN REKLAMASI • KATTA FORMATLI BOSMA • UV BOSMA • POLIGRAFIYA • KO'RGAZMA STENDLARI • LIGHTBOX • AVTO BRENDLASH •
        </div>
      </div>
    </>
  );
}
