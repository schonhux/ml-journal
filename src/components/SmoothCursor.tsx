"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* Refined dot + ring cursor:
   - dot: responsive spring
   - ring: soft trailing spring, accent glow, slow-spinning accent arc,
     and a subtle velocity-based squash-and-stretch (settles to a circle at rest)
   - the ring color eases with the active tab accent (via --accent)
   Desktop / fine-pointer only. */

export default function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const s = useMotionValue(1); // hover scale target

  const dotX = useSpring(x, { stiffness: 1100, damping: 48, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 48, mass: 0.25 });

  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringScale = useSpring(s, { stiffness: 300, damping: 24 });

  // velocity-driven squash-and-stretch
  const rot = useMotionValue(0);
  const stretch = useMotionValue(0);
  const rotS = useSpring(rot, { stiffness: 200, damping: 20 });
  const stretchS = useSpring(stretch, { stiffness: 250, damping: 26 });
  const scaleX = useTransform(stretchS, (v) => 1 + v * 0.35);
  const scaleY = useTransform(stretchS, (v) => 1 - v * 0.22);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const isInteractive = (t: EventTarget | null) =>
      !!(t as HTMLElement | null)?.closest(
        "a, button, [role='tab'], input, [data-cursor='hover']"
      );
    const onOver = (e: MouseEvent) => s.set(isInteractive(e.target) ? 2 : 1);
    const onDown = () => s.set(s.get() * 0.7);
    const onUp = (e: MouseEvent) => s.set(isInteractive(e.target) ? 2 : 1);

    let raf = 0;
    const loop = () => {
      const vx = ringX.getVelocity();
      const vy = ringY.getVelocity();
      const speed = Math.hypot(vx, vy);
      stretch.set(Math.min(speed / 3400, 1));
      if (speed > 40) {
        let a = (Math.atan2(vy, vx) * 180) / Math.PI;
        a = (((a + 90) % 180) + 180) % 180 - 90; // constrain to (-90, 90] (ellipse symmetry)
        rot.set(a);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [x, y, s, ringX, ringY, rot, stretch]);

  if (!enabled) return null;

  return (
    <>
      {/* soft trailing ring with squash-stretch */}
      <motion.div
        className="cursor-ring"
        aria-hidden="true"
        style={{ x: ringX, y: ringY, scale: ringScale, rotate: rotS, scaleX, scaleY }}
      />
      {/* slow-spinning accent arc (position only; spin handled in CSS child) */}
      <motion.div className="cursor-arc-wrap" aria-hidden="true" style={{ x: ringX, y: ringY }}>
        <div className="cursor-arc" />
      </motion.div>
      {/* responsive dot */}
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x: dotX, y: dotY }} />
    </>
  );
}
