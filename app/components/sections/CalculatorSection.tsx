"use client";
import { useState, useCallback } from "react";
import { useLang } from "../../content/i18n-context";

const materials = [
  { value: "45000", key: "m1" },
  { value: "55000", key: "m2" },
  { value: "65000", key: "m3" },
  { value: "70000", key: "m4" },
  { value: "95000", key: "m5" },
  { value: "120000", key: "m6" },
];

export default function CalculatorSection() {
  const { t } = useLang();
  const [w, setW] = useState(3);
  const [h, setH] = useState(1.5);
  const [q, setQ] = useState(1);
  const [m, setM] = useState(55000);
  const [mont, setMont] = useState(false);

  const calc = useCallback(() => {
    const area = w * h * q;
    let total = area * m;
    if (mont) total *= 1.25;
    return { total: Math.round(total), area };
  }, [w, h, q, m, mont]);

  const { total, area } = calc();

  return (
    <section className="sec" id="hisob" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("calc.tag")}</span>
            <h2>{t("calc.h")}</h2>
          </div>
          <p>{t("calc.sub")}</p>
        </div>
        <div className="calcwrap rv">
          <div>
            <div className="cfields">
              <div className="cf">
                <label>{t("calc.w")}</label>
                <input type="number" min="0.1" step="0.1" value={w}
                  onChange={e => setW(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="cf">
                <label>{t("calc.hh")}</label>
                <input type="number" min="0.1" step="0.1" value={h}
                  onChange={e => setH(parseFloat(e.target.value) || 0)} />
              </div>
              <div className="cf">
                <label>{t("calc.q")}</label>
                <input type="number" min="1" step="1" value={q}
                  onChange={e => setQ(parseInt(e.target.value) || 1)} />
              </div>
              <div className="cf">
                <label>{t("calc.m")}</label>
                <select value={m} onChange={e => setM(parseFloat(e.target.value))}>
                  {materials.map(mat => (
                    <option key={mat.value} value={mat.value}>{t(mat.key)}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className="copt">
              <input type="checkbox" checked={mont} onChange={e => setMont(e.target.checked)} />
              <span>{t("calc.mont")}</span>
            </label>
            <p className="cnote">{t("calc.note")}</p>
          </div>
          <div className="cres">
            <span className="mono">{t("calc.res")}</span>
            <b className="cout">{total.toLocaleString("ru-RU")} {t("sum")}</b>
            <span className="carea">{t("area")}: {area.toFixed(2)} m²</span>
            <a href="#aloqa" className="btn mag">
              <s /><span>{t("calc.btn")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
