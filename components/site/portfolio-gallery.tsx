"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/data/site";

type GalleryItem = { id: string; src: string; alt: string; caption: string };

export default function PortfolioGallery({ items, locale }: { items: GalleryItem[]; locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [leaving, setLeaving] = useState<{ item: GalleryItem; direction: "next" | "previous" } | null>(null);
  const item = active === null ? undefined : items[active];

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
      {items.map((image, index) => <button className="gallery-item" type="button" key={image.id} onClick={() => { setDirection("next"); setActive(index); }} aria-label={`${image.caption}: kattalashtirib ko'rish`}>
        <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 700px) 100vw, 33vw" unoptimized />
        <span>{image.caption}</span>
      </button>)}
    </div>
    {item && <div className="image-viewer" role="dialog" aria-modal="true" aria-label={item.caption} onMouseDown={() => setActive(null)}>
      <div className="image-viewer-wrap" onMouseDown={(event) => event.stopPropagation()}>
        <div className="image-viewer-top"><b>{item.caption}</b><span>{active! + 1} dan {items.length}</span><button className="image-viewer-close" type="button" onClick={() => setActive(null)} aria-label="Yopish"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button></div>
        <div className="image-viewer-image"><button className="image-viewer-nav previous" type="button" onClick={() => navigate(-1)} aria-label="Oldingi rasm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button>{leaving && <Image className={`image-viewer-photo leaving ${leaving.direction}`} src={leaving.item.src} alt="" width={1600} height={1200} sizes="100vw" aria-hidden="true" unoptimized />}<Image key={item.id} className={`image-viewer-photo entering ${direction}`} src={item.src} alt={item.alt} width={1600} height={1200} sizes="100vw" priority unoptimized /><button className="image-viewer-nav next" type="button" onClick={() => navigate(1)} aria-label="Keyingi rasm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button></div>
        <div className="image-viewer-footer"><div><p>{item.caption}</p><span className="image-viewer-chip">TOGO GROUP</span><small>Ish yoqdimi? O&apos;lcham va joyni ayting — tezda narxini hisoblab beramiz.</small></div><Link className="cta" href={`/${locale}/aloqa`} onClick={() => setActive(null)}>Shunday ish buyurtma qilish</Link></div>
      </div>
    </div>}
  </>;
}
