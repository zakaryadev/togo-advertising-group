"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = matchMedia("(pointer: coarse)").matches;
    if (rm || coarse) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = 0, y = 0, tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = `translate(${tx}px,${ty}px)`;
      ring.style.opacity = "1";
      const spot = document.getElementById("spot");
      if (spot) {
        spot.style.setProperty("--mx", tx + "px");
        spot.style.setProperty("--my", ty + "px");
      }
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,.wk,.row")) ring.classList.add("big");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,.wk,.row")) ring.classList.remove("big");
    };

    addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf: number;
    function loop() {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      ring.style.transform = `translate(${x}px,${y}px)`;
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    /* magnetic buttons */
    const mags = document.querySelectorAll<HTMLElement>(".mag");
    const magMove = (b: HTMLElement, e: MouseEvent) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    };
    const magLeave = (b: HTMLElement) => {
      b.style.transition = "transform .45s cubic-bezier(.16,1,.3,1)";
      b.style.transform = "";
      setTimeout(() => (b.style.transition = ""), 450);
    };
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
    mags.forEach(b => {
      const mv = (e: MouseEvent) => magMove(b, e);
      const lv = () => magLeave(b);
      b.addEventListener("mousemove", mv);
      b.addEventListener("mouseleave", lv);
      handlers.push([b, mv, lv]);
    });

    return () => {
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      handlers.forEach(([b, mv, lv]) => {
        b.removeEventListener("mousemove", mv);
        b.removeEventListener("mouseleave", lv);
      });
    };
  }, []);

  return (
    <>
      <div id="ring" ref={ringRef} />
      <div id="dot" ref={dotRef} />
    </>
  );
}
