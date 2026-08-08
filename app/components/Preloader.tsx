"use client";
import { useEffect, useRef } from "react";
import { useLang } from "../content/i18n-context";

export default function Preloader() {
  const { t } = useLang();
  const pctRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pre = preRef.current!;
    const pct = pctRef.current!;
    let v = 0;
    document.body.classList.add("lock");

    const timer = setInterval(() => {
      v += Math.random() * 12 + 6;
      if (v >= 100) {
        v = 100;
        clearInterval(timer);
        setTimeout(() => {
          pre.classList.add("fill");
          setTimeout(() => {
            pre.classList.add("done");
            document.body.classList.remove("lock");
            document.body.classList.add("loaded");
          }, 560);
        }, 220);
      }
      pct.textContent = String(Math.floor(v));
    }, rm ? 24 : 95);

    return () => {
      clearInterval(timer);
      document.body.classList.remove("lock");
    };
  }, []);

  return (
    <div id="pre" ref={preRef}>
      <span className="swipe" />
      <b ref={pctRef}>0</b>
      <span className="mono">{t("pre.txt")}</span>
    </div>
  );
}
