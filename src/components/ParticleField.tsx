"use client";

import { useEffect, useRef } from "react";

/* Subtle "latent space" particle layer over the background photo.
   Low opacity, GPU-cheap, respects prefers-reduced-motion. */

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0;
    let H = 0;

    type P = { x: number; y: number; vx: number; vy: number; d: number };
    let pts: P[] = [];
    const mouse = { x: 0.5, y: 0.5 };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor(W / 22));
      pts = Array.from({ length: count }, () => {
        const d = 0.4 + Math.random() * 0.6;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.14 * d,
          vy: (Math.random() - 0.5) * 0.1 * d,
          d,
        };
      });
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);

      if (!reduced) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          // faint drift toward cursor
          p.x += (mouse.x * W - p.x) * 0.00012 * p.d;
          p.y += (mouse.y * H - p.y) * 0.00012 * p.d;
          if (p.x < -15) p.x = W + 15;
          if (p.x > W + 15) p.x = -15;
          if (p.y < -15) p.y = H + 15;
          if (p.y > H + 15) p.y = -15;
        }
      }

      // connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.globalAlpha = (1 - dist / 120) * 0.06;
            ctx.strokeStyle = "#bcd3ff";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // points
      for (const p of pts) {
        ctx.globalAlpha = 0.16 * p.d;
        ctx.fillStyle = "#dbe6ff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.05 * p.d + 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / W;
      mouse.y = e.clientY / H;
    };
    const onResize = () => {
      setup();
      if (reduced) frame();
    };

    setup();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    if (reduced) frame();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
