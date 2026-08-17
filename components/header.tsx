"use client";

import { useState, useEffect } from "react";

const translations = {
  navHome: { uz: "Asosiy", ru: "Главная", en: "Home" },
  nav1: { uz: "Yo'nalishlar", ru: "Направления", en: "Services" },
  navPortfolio: { uz: "Portfolio", ru: "Портфолио", en: "Portfolio" },
  navPrice: { uz: "Narxlar", ru: "Цены", en: "Prices" },
  nav3: { uz: "Tadbirlar", ru: "Мероприятия", en: "Events" },
  nav4: { uz: "Jarayon", ru: "Процесс", en: "Process" },
  nav5: { uz: "Rasmiy", ru: "Реквизиты", en: "Company" },
  navCta: { uz: "Ariza qoldirish", ru: "Оставить заявку", en: "Leave a request" },
};

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("togo_theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("nav-open", navOpen);
    }
    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [navOpen]);

  useEffect(() => {
    const onLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<"uz" | "ru" | "en">;
      if (customEvent.detail) {
        setLang(customEvent.detail);
      }
    };
    window.addEventListener("togo_lang_change", onLangChange);
    return () => {
      window.removeEventListener("togo_lang_change", onLangChange);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("togo_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  function handleLang(newLang: "uz" | "ru" | "en") {
    setLang(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("togo_lang_change", { detail: newLang }));
    }
  }

  return (
    <header>
      <div className="wrap bar">
        <a href="#home" className="logo-link" aria-label="TOGO GROUP ADVERTISING">
          <svg
            className="logo"
            role="img"
            viewBox="2894 12434 15198 4834"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M16367.75 15112.89l-329.11 -0.87 0 1429.54 260.68 1.65 2.84 -846.46 198.25 540.25c35.51,101.93 74.56,203.55 105.71,306.64l278.7 -0.77 -0.03 -1429.55 -259.61 -1c-7.94,68.43 -2.95,201.63 -2.08,248.55 2.01,105.44 9.92,224.98 2.51,329.32l-16.41 232.24 -241.45 -809.54zm-6769.67 -1661.33l0 -298.29 -750.63 0 0 298.29 227.7 0 0 1226.91 295.01 0 0 -1226.91 227.92 0zm-4287.2 -833.86c1233.21,0 2232.8,999.62 2232.8,2232.83 0,1233.21 -999.59,2232.83 -2232.8,2232.83 -1233.27,0 -2232.83,-999.62 -2232.83,-2232.83 0,-1233.21 999.56,-2232.83 2232.83,-2232.83zm-253.61 604.33c724.73,-111.87 1437.31,266.04 1748.24,933.81l496.88 0c-287.15,-823.35 -1070.23,-1414.08 -1991.51,-1414.08 -85.84,0 -170.42,5.26 -253.61,15.21l0 465.06zm2349.85 1398.6l-2329.72 0c0,255.99 208.8,464.83 464.79,464.83 466.6,0 933.17,0 1399.8,0 -199.49,1398.43 -1981.02,1905.49 -2879.82,840.45 -278.71,-323.31 -399.22,-694.42 -399.22,-1117.62l0 -1273.53c-288.38,360.63 -460.84,818.02 -460.84,1315.77 0,1164.71 944.06,2108.77 2108.77,2108.77 1164.68,0 2108.73,-944.06 2108.73,-2108.77 0,-77.71 -4.28,-154.41 -12.49,-229.9zm-1156.34 -488.54c-214.66,-280.41 -551.94,-462.01 -931.76,-464.63l-726.51 0.57 0 -800.67c-165.56,59.92 -321.48,140.01 -464.73,237.31l0 1745.89c0,662.01 542.77,1194.59 1204.5,1182.9 374.5,-6.7 706.52,-187.33 918.67,-464.59l-897.9 0c-418.3,0 -760.54,-342.27 -760.54,-760.58l0 -675.03 760.54 -1.17 897.73 0zm-3296.79 718.44c0,1301.67 1055.15,2356.89 2356.89,2356.89 1301.67,0 2356.82,-1055.22 2356.82,-2356.89 0,-1301.67 -1055.15,-2356.89 -2356.82,-2356.89 -1301.74,0 -2356.89,1055.22 -2356.89,2356.89zm7066.42 -172.06l303.92 0c180.4,0 261.49,-84.74 261.49,-264.26l0 -996.88c0,-179.56 -81.13,-264.06 -261.49,-264.06l-303.92 0c-180.23,0 -261.25,84.7 -261.25,264.06l0 996.88c0,179.32 80.98,264.26 261.25,264.26zm33.52 -1226.91l236.87 0 0 928.45 -236.87 0 0 -928.45zm1519.62 391.64l-354.7 0 59.68 180.8 0 356.01 -236.83 0 0 -928.45 236.83 0 0 153.37 295.02 0 0 -187.6c0,-179.56 -81.16,-264.06 -261.46,-264.06l-303.95 0c-180.23,0 -261.22,84.7 -261.22,264.06l0 996.88c0,179.32 80.92,264.26 261.22,264.26l303.95 0c180.33,0 261.46,-84.74 261.46,-264.26l0 -571.01zm422.32 835.27l303.92 0c180.37,0 261.45,-84.74 261.45,-264.26l0 -996.88c0,-179.56 -81.15,-264.06 -261.45,-264.06l-303.92 0c-180.23,0 -261.22,84.7 -261.22,264.06l0 996.88c0,179.32 80.96,264.26 261.22,264.26zm33.53 -1226.91l236.87 0 0 928.45 -236.87 0 0 -928.45zm2051.42 391.64l-354.66 0 59.68 180.8 0 356.01 -236.86 0 0 -928.45 236.86 0 0 153.37 294.98 0 0 -187.6c0,-179.56 -81.12,-264.06 -261.48,-264.06l-303.92 0c-180.23,0 -261.19,84.7 -261.19,264.06l0 996.88c0,179.32 80.96,264.26 261.19,264.26l303.92 0c180.4,0 261.48,-84.74 261.48,-264.26l0 -571.01zm755.79 835.27l291.7 0 -227.96 -690.1 58.71 0c107.28,0 109.53,-193.97 109.53,-264.27l0 -306.77c0,-179.56 -81.16,-264.06 -261.49,-264.06l-565.14 0 0 1525.2 294.78 0 0 -807.1 299.87 807.1zm-63.03 -911.97l-236.84 0 0 -314.94 236.84 0 0 314.94zm717.3 911.97l303.92 0c180.4,0 261.49,-84.74 261.49,-264.26l0 -996.88c0,-179.56 -81.12,-264.06 -261.49,-264.06l-303.92 0c-180.23,0 -261.19,84.7 -261.19,264.06l0 996.88c0,179.32 80.96,264.26 261.19,264.26zm33.56 -1226.91l236.83 0 0 928.45 -236.83 0 0 -928.45zm1519.54 -298.29l-294.94 0 0 1226.74 -236.9 0 0 -1226.74 -294.68 0 0 1260.94c0,179.32 80.92,264.26 261.18,264.26l303.86 0c180.4,0 261.48,-84.74 261.48,-264.26l0 -1260.94zm161.14 0l0 1525.2 294.78 0 0 -613.44 270.36 0c180.5,0 261.49,-84.63 261.49,-264.26l0 -383.44c0,-179.56 -81.16,-264.06 -261.49,-264.06l-565.14 0zm531.62 613.23l-236.84 0 0 -314.94 236.84 0 0 314.94zm106.94 1984.11l-335.57 0 56.54 171.08 0 343.15 -230.51 0 0 -893.01 230.51 0 0 146.97 279.03 0 0 -177.95c0,-171.02 -76.93,-251.14 -248.69,-251.14l-291.23 0c-171.59,0 -248.39,80.28 -248.39,251.14l0 955c0,170.79 76.74,251.41 248.39,251.41l291.23 0c171.79,0 248.69,-80.45 248.69,-251.41l0 -545.24zm-7760.87 792.56c117.46,4.19 235.49,-0.33 352.92,-0.27 281.01,0.17 397.07,10.29 396.87,-310.62l-0.54 -797.59c-0.03,-96.46 4.56,-207.56 -74.59,-276.82 -67.42,-58.98 -226.89,-46.02 -313.57,-46.09 -120.88,-0.1 -241.76,-1.64 -362.64,-0.53l1.55 1431.92zm262.02 -279.84l3.72 -875.43 206.95 0.98 7.87 32.22c8.71,35.57 7.71,106.88 8.48,144.49 1.71,83.3 2.04,166.76 1.91,250.13 -0.1,85.14 -0.74,170.32 -2.21,255.42 -0.84,50.18 -0.47,105.31 -5.26,155.15l-3.72 38.72 -217.74 -1.68zm2316.23 281.35c64.47,5.89 189.37,1.94 263.86,-0.77l-2.01 -614.65 68.19 52.49c9.68,6.63 16.58,15.24 19.9,26.73l50.44 130.92c17.45,48.7 34.77,96.94 52.55,144.93 31.55,85.01 59.29,171.42 92.11,255.96l272.57 2.14 -220.82 -637.72 47.99 -9.34c129.83,-25.26 108.96,-178.96 108.86,-279.74 -0.1,-101.15 16.98,-321.14 -31.22,-406.65 -58.41,-103.53 -196.54,-97 -300.13,-97.1 -138.97,-0.1 -281.22,-8.74 -420.32,-1.44l-1.97 1434.24zm263.06 -851.75l-1.44 -304.59 223.03 0.03 -0.6 302.08 -220.99 2.48zm-3879.79 847.29l266.14 1.68 22.54 -141.81 302.62 -0.64 24.85 140.98 266.41 2 -267.55 -1429.74 -343.34 -1.54 -271.67 1429.07zm326.97 -417.36l118.57 -739.81 104.66 737.5 -223.23 2.31zm5633.55 -11.52l-264.3 0.77c-4.19,84.1 -2.54,226.08 12.26,281.44 21.5,80.12 67.36,124.5 148.75,142.29 85.07,18.59 244.67,7.97 335.94,6.86 262.92,-3.01 238.71,-184.35 239.28,-384.51 0.2,-76.56 13.73,-273.44 -35.2,-336.57 -47.6,-61.5 -275.83,-154.41 -348.74,-189.41 -33.39,-16.01 -67.69,-26.7 -79.38,-66.09 -8.94,-30.17 -4.82,-102.75 -5.86,-136.25l-0.94 -32.99 31.68 -9.01c46.26,-13.33 91.27,-8.77 138.4,-5.99l39.26 2.31 2.31 135.11 256.29 1.01c11.99,-151.1 18.36,-375.37 -162.54,-404.48 -98.98,-15.94 -234.39,-6.29 -336.58,-4.15 -253.45,5.46 -233.49,178.52 -234.39,372.55 -0.41,89.63 -11.63,197.88 35.87,278.13 54.23,91.64 333.9,159.3 427.71,242.67l13.37 11.85 0.84 17.86c3.65,75.79 14.57,139.53 -14.54,212.31 -13.77,34.47 -60.96,33.76 -91.77,33.76 -23.58,0 -64.04,0.37 -82.7,-15.44l-6.3 -5.35 -3.78 -7.31c-19.83,-37.78 -16.68,-92.91 -14.94,-141.37zm-3794.07 430.26l320.03 0.67 257.43 -1431.12 -272.67 0.23 -130.16 971.89 -56.03 -194.03c-16.31,-56.47 -24.65,-124.93 -32.49,-183.31 -11.32,-84.64 -20.87,-169.58 -30.62,-254.42 -5.86,-50.71 -26.76,-262.53 -46.45,-339.13l-269.22 -1.37 260.18 1430.59zm707.79 -0.37l591.7 1.94 0.53 -278.16 -325.36 1.9 -0.77 -312.26 284.5 -1 0.23 -265.51 -282.72 1.64 -1.74 -301.51 327 -0.3 -1.51 -277.09 -591.56 0.7 -0.3 1429.65zm1614.43 -1152.99l203.61 0.1 2.74 1155.03 261.29 -0.3 -0.3 -1154.56 201.13 -1.48 2.04 -275.62 -670.98 -0.26 0.47 277.09zm804.79 1152.25l264.2 2.48 0.47 -1430.95 -262.23 -0.37 -2.44 1428.84zm1280.3 0.94l256.09 1.61 0.14 -1429.92 -256.27 -1.14c-10.35,101.22 -0.23,233.45 0.17,330.72 1.54,365.62 -11.65,733.38 -0.13,1098.73z" />
          </svg>
        </a>

        <nav className="menu">
          <a href="#home" data-go="home">{translations.navHome[lang]}</a>
          <a href="#yonalish" data-go="yonalish">{translations.nav1[lang]}</a>
          <a href="#portfolio" data-go="portfolio">{translations.navPortfolio[lang]}</a>
          <a href="#narx" data-go="narx">{translations.navPrice[lang]}</a>
          <a href="#tadbir" data-go="tadbir">{translations.nav3[lang]}</a>
          <a href="#jarayon" data-go="jarayon">{translations.nav4[lang]}</a>
          <a href="#rasmiy" data-go="rasmiy">{translations.nav5[lang]}</a>
        </nav>

        <div className="tools">
          <div className="langs desktop-only">
            <button
              className={`lang ${lang === "uz" ? "on" : ""}`}
              onClick={() => handleLang("uz")}
            >
              UZ
            </button>
            <button
              className={`lang ${lang === "ru" ? "on" : ""}`}
              onClick={() => handleLang("ru")}
            >
              RU
            </button>
            <button
              className={`lang ${lang === "en" ? "on" : ""}`}
              onClick={() => handleLang("en")}
            >
              EN
            </button>
          </div>

          <button
            className="icobtn desktop-only"
            onClick={toggleTheme}
            aria-label="Theme toggle"
            title="Temani o'zgartirish"
          >
            {theme === "dark" ? (
              <svg className="sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="moon" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button data-order="" className="cta desktop-only">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            <span>{translations.navCta[lang]}</span>
          </button>

          <button
            className="icobtn burger"
            aria-label="Menu"
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            onClick={() => setNavOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className="mobile-drawer">
          <a href="#home" data-go="home" onClick={() => setNavOpen(false)}>
            {translations.navHome[lang]}
          </a>
          <a href="#yonalish" data-go="yonalish" onClick={() => setNavOpen(false)}>
            {translations.nav1[lang]}
          </a>
          <a href="#portfolio" data-go="portfolio" onClick={() => setNavOpen(false)}>
            {translations.navPortfolio[lang]}
          </a>
          <a href="#narx" data-go="narx" onClick={() => setNavOpen(false)}>
            {translations.navPrice[lang]}
          </a>
          <a href="#tadbir" data-go="tadbir" onClick={() => setNavOpen(false)}>
            {translations.nav3[lang]}
          </a>
          <a href="#jarayon" data-go="jarayon" onClick={() => setNavOpen(false)}>
            {translations.nav4[lang]}
          </a>
          <a href="#rasmiy" data-go="rasmiy" onClick={() => setNavOpen(false)}>
            {translations.nav5[lang]}
          </a>
          <button
            data-order=""
            className="cta"
            onClick={() => setNavOpen(false)}
            style={{ width: "100%", justifyContent: "center", marginTop: "10px", display: "inline-flex" }}
          >
            {translations.navCta[lang]}
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
            <div className="langs">
              <button
                className={`lang ${lang === "uz" ? "on" : ""}`}
                onClick={() => handleLang("uz")}
              >
                UZ
              </button>
              <button
                className={`lang ${lang === "ru" ? "on" : ""}`}
                onClick={() => handleLang("ru")}
              >
                RU
              </button>
              <button
                className={`lang ${lang === "en" ? "on" : ""}`}
                onClick={() => handleLang("en")}
              >
                EN
              </button>
            </div>

            <button
              className="icobtn"
              onClick={toggleTheme}
              aria-label="Theme toggle"
              title="Temani o'zgartirish"
            >
              {theme === "dark" ? (
                <svg className="sun" viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }}>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="moon" viewBox="0 0 24 24" style={{ width: "16px", height: "16px", fill: "none", stroke: "currentColor", strokeWidth: "1.9" }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
      </div>
    </header>
  );
}
