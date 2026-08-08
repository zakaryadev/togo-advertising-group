"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../../content/i18n-context";
import { SvgIcon } from "../SvgIcons";

interface DynamicWorkItem {
  id: string;
  idx: string;
  subTitle: string;
  title: string;
  imageUrl?: string;
  grad: string;
  icon?: string;
}

const staticWorks = [
  { icon: "i-facade", grad: "g1", sKey: "w1", idx: "01" },
  { icon: "i-letters", grad: "g2", sKey: "w2", idx: "02" },
  { icon: "i-wall", grad: "g3", sKey: "w3", idx: "03" },
  { icon: "i-print", grad: "g4", sKey: "w4", idx: "04" },
  { icon: "i-car", grad: "g5", sKey: "w5", idx: "05" },
  { icon: "i-billboard", grad: "g6", sKey: "w6", idx: "06" },
  { icon: "i-stand", grad: "g7", sKey: "w7", idx: "07" },
];

const grads = ["g1", "g2", "g3", "g4", "g5", "g6", "g7"];

export default function WorksSection() {
  const { t } = useLang();
  const stripRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [dynamicWorks, setDynamicWorks] = useState<DynamicWorkItem[]>([]);

  useEffect(() => {
    fetch("/api/portfolio?featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const mapped: DynamicWorkItem[] = data.items.map((item: any, i: number) => ({
            id: item.id,
            idx: String(i + 1).padStart(2, "0"),
            subTitle: item.dimensions || item.service_type || item.service,
            title: item.title || item.client,
            imageUrl: item.image_url || item.image,
            grad: grads[i % grads.length],
          }));
          setDynamicWorks(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const s = stripRef.current;
    const bar = barRef.current;
    if (!s || !bar) return;

    let down = false, sx = 0, sl = 0;

    const onDown = (e: PointerEvent) => { down = true; s.classList.add("drag"); sx = e.clientX; sl = s.scrollLeft; };
    const onUp = () => { down = false; s.classList.remove("drag"); };
    const onMove = (e: PointerEvent) => { if (!down) return; e.preventDefault(); s.scrollLeft = sl - (e.clientX - sx) * 1.3; };
    const onScroll = () => {
      const max = s.scrollWidth - s.clientWidth;
      const bw = Math.max(12, s.clientWidth / s.scrollWidth * 100);
      bar.style.width = bw + "%";
      bar.style.left = (max ? s.scrollLeft / max * (100 - bw) : 0) + "%";
    };

    s.addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    s.addEventListener("pointermove", onMove);
    s.addEventListener("scroll", onScroll);

    return () => {
      s.removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      s.removeEventListener("pointermove", onMove);
      s.removeEventListener("scroll", onScroll);
    };
  }, [dynamicWorks]);

  const displayWorks = dynamicWorks.length > 0 ? dynamicWorks : null;

  return (
    <section className="sec block" id="ishlar">
      <div className="wrap">
        <div className="shead rv">
          <div>
            <span className="tag mono">{t("wk.tag")}</span>
            <h2>{t("wk.h")}</h2>
          </div>
          <p>{t("wk.p")}</p>
        </div>
      </div>
      <div className="wrap">
        <div className="strip" ref={stripRef}>
          {displayWorks
            ? displayWorks.map((w) => (
                <article className="wk" key={w.idx}>
                  <div className={`art ${w.grad}`}>
                    {w.imageUrl ? (
                      <img
                        src={w.imageUrl}
                        alt={w.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <>
                        <div className="tex" />
                        {w.icon && <SvgIcon id={w.icon} className="il" />}
                      </>
                    )}
                  </div>
                  <span className="veil" />
                  <span className="idx">{w.idx}</span>
                  <div className="meta">
                    <span>{w.subTitle}</span>
                    <b>{w.title}</b>
                  </div>
                </article>
              ))
            : staticWorks.map((w) => (
                <article className="wk" key={w.idx}>
                  <div className={`art ${w.grad}`}>
                    <div className="tex" />
                    <SvgIcon id={w.icon} className="il" />
                  </div>
                  <span className="veil" />
                  <span className="idx">{w.idx}</span>
                  <div className="meta">
                    <span>{t(`${w.sKey}.s`)}</span>
                    <b>{t(`${w.sKey}.t`)}</b>
                  </div>
                </article>
              ))}
        </div>
        <div className="striphint mono">
          <span>{t("wk.drag")}</span>
          <span className="bar"><i ref={barRef} /></span>
        </div>
      </div>
    </section>
  );
}
