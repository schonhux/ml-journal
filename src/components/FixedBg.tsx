"use client";

import { useEffect, useRef } from "react";

export default function FixedBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (ref.current) {
        ref.current.style.transform = `scale(1.07) translate(${cx * -12}px, ${cy * -9}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      {/* Background image, fixed to the viewport, gently parallaxed by the cursor */}
      <div
        ref={ref}
        className="fixed inset-0 -z-10 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: 'url("/images/Background.jpg")', transform: "scale(1.07)" }}
      />
      {/* Dark gradient + tiled overlay so text is readable everywhere */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/35 to-black/45 bg-overlay" />
    </>
  );
}
