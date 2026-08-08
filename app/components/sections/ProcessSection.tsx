"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../../content/i18n-context";

const steps = [
  { n: "01", tKey: "p1" },
  { n: "02", tKey: "p2" },
  { n: "03", tKey: "p3" },
  { n: "04", tKey: "p4" },
  { n: "05", tKey: "p5" },
];

export default function ProcessSection() {
  const { t } = useLang();
  const tlRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = tlRef.current;
    const rail = railRef.current;
    if (!tl || !rail) return;

    let tick = false;
    function upd() {
      const r = tl!.getBoundingClientRect();
      const p = Math.min(Math.max((innerHeight * 0.72 - r.top) / (r.height * 0.86), 0), 1);
      rail!.style.height = (p * 100) + "%";
      tick = false;
    }
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(upd); } };
    addEventListener("scroll", onScroll, { passive: true });
    upd();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="sec" id="jarayon">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("pr.tag")}</span>
            <h2>{t("pr.h")}</h2>
          </div>
          <p>{t("pr.p")}</p>
        </div>
        <div className="tl" ref={tlRef}>
          <div className="rail"><i ref={railRef} /></div>
          {steps.map(s => (
            <div className="step rv" key={s.n}>
              <div>
                <div className="mono">{t("pr.stage")} {s.n}</div>
                <h4>{t(`${s.tKey}.t`)}</h4>
              </div>
              <p>{t(`${s.tKey}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
