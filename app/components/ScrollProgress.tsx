"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function upd() {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (ref.current && h > 0) ref.current.style.width = (scrollY / h * 100) + "%";
    }
    addEventListener("scroll", upd, { passive: true });
    upd();
    return () => removeEventListener("scroll", upd);
  }, []);
  return <div id="prog" ref={ref} />;
}
