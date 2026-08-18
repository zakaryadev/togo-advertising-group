"use client";

import { useEffect, useRef } from "react";

export default function LedCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const canvas = document.createElement("canvas");
    const offCanvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const octx = offCanvas.getContext("2d");

    if (!ctx || !octx) return;

    containerRef.current.appendChild(canvas);

    const SP = 32;
    const DOT = 1.35;
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let DPR = 1;
    let RGB = [255, 198, 26];
    let baseCol = "rgba(255,255,255,.055)";
    let cx = -999;
    let cy = -999;
    let tx = -999;
    let ty = -999;
    let raf = 0;
    const trail: Array<[number, number]> = [];

    function parseColor(str: string) {
      str = (str || "").trim();
      if (str.charAt(0) === "#") {
        if (str.length === 4) {
          return [
            parseInt(str[1] + str[1], 16),
            parseInt(str[2] + str[2], 16),
            parseInt(str[3] + str[3], 16),
          ];
        }
        return [
          parseInt(str.substring(1, 3), 16),
          parseInt(str.substring(3, 5), 16),
          parseInt(str.substring(5, 7), 16),
        ];
      }
      const m = str.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
      return m ? [+m[1], +m[2], +m[3]] : [255, 198, 26];
    }

    function rgba(a: number | string) {
      return `rgba(${RGB[0]},${RGB[1]},${RGB[2]},${a})`;
    }

    function drawBase() {
      if (!W || !octx) return;
      octx.setTransform(DPR, 0, 0, DPR, 0, 0);
      octx.clearRect(0, 0, W, H);
      octx.fillStyle = baseCol;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          octx.beginPath();
          octx.arc(i * SP, j * SP, DOT, 0, 6.2832);
          octx.fill();
        }
      }
    }

    function readTheme() {
      const cs = getComputedStyle(document.documentElement);
      RGB = parseColor(cs.getPropertyValue("--brand"));
      const light =
        document.documentElement.getAttribute("data-theme") === "light";
      baseCol = light ? "rgba(13,21,34,.075)" : "rgba(255,255,255,.055)";
      drawBase();
    }

    function resize() {
      if (!canvas || !ctx || !offCanvas) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.ceil(W / SP);
      rows = Math.ceil(H / SP);
      drawBase();
    }

    function lit(px: number, py: number, R: number, power: number) {
      if (!ctx) return;
      const i0 = Math.max(0, Math.floor((px - R) / SP));
      const i1 = Math.min(cols, Math.ceil((px + R) / SP));
      const j0 = Math.max(0, Math.floor((py - R) / SP));
      const j1 = Math.min(rows, Math.ceil((py + R) / SP));
      const R2 = R * R;
      for (let i = i0; i <= i1; i++) {
        const x = i * SP;
        const dx = x - px;
        for (let j = j0; j <= j1; j++) {
          const y = j * SP;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (d2 > R2) continue;
          let f = 1 - Math.sqrt(d2) / R;
          f = f * f;
          const a = f * power;
          if (a < 0.012) continue;
          ctx.fillStyle = rgba(a.toFixed(3));
          ctx.beginPath();
          ctx.arc(x, y, DOT + f * 2.1, 0, 6.2832);
          ctx.fill();
        }
      }
    }

    function frame() {
      if (!ctx) return;
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;

      trail.push([cx, cy]);
      if (trail.length > 16) trail.shift();

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(offCanvas, 0, 0, W, H);

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
      g.addColorStop(0, rgba(0.085));
      g.addColorStop(0.55, rgba(0.028));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(cx - 280, cy - 280, 560, 560);

      if (trail.length > 3) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = rgba(0.55);
        ctx.shadowBlur = 14;
        ctx.strokeStyle = rgba(0.2);
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(trail[0][0], trail[0][1]);
        for (let k = 1; k < trail.length; k++) {
          const p = trail[k - 1];
          const c = trail[k];
          ctx.quadraticCurveTo(
            p[0],
            p[1],
            (p[0] + c[0]) / 2,
            (p[1] + c[1]) / 2,
          );
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      lit(cx, cy, 168, 0.62);
      for (let t = 0; t < trail.length; t += 3) {
        const w = (t / trail.length) * 0.22;
        if (w > 0.02) lit(trail[t][0], trail[t][1], 78, w);
      }

      ctx.fillStyle = rgba(0.9);
      ctx.beginPath();
      ctx.arc(cx, cy, 2.6, 0, 6.2832);
      ctx.fill();

      raf = requestAnimationFrame(frame);
    }

    function move(x: number, y: number) {
      tx = x;
      ty = y;
    }

    const onPointerMove = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const p = e.touches[0];
      if (p) move(p.clientX, p.clientY);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    resize();
    readTheme();

    if (reduce) {
      ctx.drawImage(offCanvas, 0, 0, W, H);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (raf) cancelAnimationFrame(raf);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div id="bgfx" ref={containerRef} aria-hidden="true" />;
}
