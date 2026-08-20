"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/data/site";

type GalleryItem = { id: string; src: string; alt: string; caption: string };

const galleryLabels = {
  uz: {
    zoom: "kattalashtirib ko'rish",
    close: "Yopish",
    prev: "Oldingi rasm",
    next: "Keyingi rasm",
    of: "dan",
    footerSmall: "Ish yoqdimi? O'lcham va joyni ayting — tezda narxini hisoblab beramiz.",
    orderCta: "Shunday ish buyurtma qilish",
  },
  ru: {
    zoom: "увеличить",
    close: "Закрыть",
    prev: "Предыдущее фото",
    next: "Следующее фото",
    of: "из",
    footerSmall: "Понравилась работа? Укажите размер и место — быстро рассчитаем стоимость.",
    orderCta: "Заказать такую же работу",
  },
  en: {
    zoom: "zoom in",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    of: "of",
    footerSmall: "Like this work? Tell us the size and location — we will quickly calculate the price.",
    orderCta: "Order similar project",
  },
} as const;

export default function PortfolioGallery({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [leaving, setLeaving] = useState<{ item: GalleryItem; direction: "next" | "previous" } | null>(null);
  const item = active === null ? undefined : items[active];
  const gl = galleryLabels[locale];

  const navigate = (step: 1 | -1) => {
    if (active === null) return;
    const nextDirection = step === 1 ? "next" : "previous";
    setDirection(nextDirection);
    setLeaving({ item: items[active], direction: nextDirection });
    setActive((active + step + items.length) % items.length);
  };

  useEffect(() => {
    if (!leaving) return;
    const timeout = window.setTimeout(() => setLeaving(null), 460);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") navigate(1);
      if (event.key === "ArrowLeft") navigate(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, items.length]);

  return <>
    <div className="gallery">
      {items.map((image, index) => <button className="gallery-item" type="button" key={image.id} onClick={() => { setDirection("next"); setActive(index); }} aria-label={`${image.caption}: ${gl.zoom}`}>
        <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 700px) 100vw, 33vw" unoptimized />
        <span>{image.caption}</span>
      </button>)}
    </div>
    {item && <div className="image-viewer" role="dialog" aria-modal="true" aria-label={item.caption} onMouseDown={() => setActive(null)}>
      <div className="image-viewer-wrap" onMouseDown={(event) => event.stopPropagation()}>
        <div className="image-viewer-top"><b>{item.caption}</b><span>{active! + 1} {gl.of} {items.length}</span><button className="image-viewer-close" type="button" onClick={() => setActive(null)} aria-label={gl.close}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        <div className="image-viewer-image"><button className="image-viewer-nav previous" type="button" onClick={() => navigate(-1)} aria-label={gl.prev}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button>{leaving && <Image className={`image-viewer-photo leaving ${leaving.direction}`} src={leaving.item.src} alt="" width={1600} height={1200} sizes="100vw" aria-hidden="true" unoptimized />}<Image key={item.id} className={`image-viewer-photo entering ${direction}`} src={item.src} alt={item.alt} width={1600} height={1200} sizes="100vw" priority unoptimized /><button className="image-viewer-nav next" type="button" onClick={() => navigate(1)} aria-label={gl.next}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button></div>
        <div className="image-viewer-footer"><div><p>{item.caption}</p><span className="image-viewer-chip">TOGO GROUP</span><small>{gl.footerSmall}</small></div><Link className="cta" href={`/${locale}/aloqa`} onClick={() => setActive(null)}>{gl.orderCta}</Link></div>
      </div>
    </div>}
  </>;
}
