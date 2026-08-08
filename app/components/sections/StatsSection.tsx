"use client";
import { useEffect, useRef, useCallback } from "react";
import { useLang } from "../../content/i18n-context";

const statsData = [
  { to: 1200, suf: "+", labelKey: "st1" },
  { to: 48, sufKey: "u.h", labelKey: "st2" },
  { to: 1440, suf: "dpi", labelKey: "st3" },
  { to: 12, sufKey: "u.y", labelKey: "st4" },
];

function OdoDigit({ digit, delay }: { digit: string; delay: number }) {
  const colRef = useRef<HTMLSpanElement>(null);

  const roll = useCallback((el: HTMLSpanElement | null) => {
    if (!el) return;
    const d = parseInt(digit);
    if (isNaN(d)) return;
    requestAnimationFrame(() => {
      el.style.transform = `translateY(-${d * 10}%)`;
    });
  }, [digit]);

  return (
    <span className="dg">
      <span
        className="col"
        ref={(el) => { colRef.current = el; }}
        data-d={digit}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <i key={n}>{n}</i>
        ))}
      </span>
    </span>
  );
}

function Odometer({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rolledRef = useRef(false);
  const digits = String(to).split("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !rolledRef.current) {
            rolledRef.current = true;
            el.querySelectorAll<HTMLElement>(".col").forEach((c) => {
              const d = parseInt(c.dataset.d || "0");
              c.style.transform = `translateY(-${d * 10}%)`;
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="odo" ref={ref}>
      {digits.map((d, i) => (
        <OdoDigit key={i} digit={d} delay={i * 110} />
      ))}
      {suffix && <u>{suffix}</u>}
    </div>
  );
}

export default function StatsSection() {
  const { t } = useLang();

  return (
    <div className="stats">
      {statsData.map((s, i) => (
        <div className="stat" key={i}>
          <Odometer
            to={s.to}
            suffix={s.suf || (s.sufKey ? t(s.sufKey) : "")}
          />
          <span className="mono">{t(s.labelKey)}</span>
        </div>
      ))}
    </div>
  );
}
