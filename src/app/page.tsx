"use client";

import React, { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

import DimensionHero from "@/components/DimensionHero";
import FixedBg from "@/components/FixedBg";
import ParticleField from "@/components/ParticleField";
import SocialLinks from "@/components/SocialLinks";
import SkillsGrid from "@/components/SkillsGrid";

type Tab = "intro" | "experience" | "projects" | "tech" | "publications";

/* shared stagger presets for tab content */
const staggerList = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09 } },
};
const staggerItem = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ProjectCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={[
        "group rounded-lg border border-white/10 bg-white/5 p-4",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]",
        "hover:border-white/20 hover:bg-white/[0.06]",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "flex flex-col justify-between relative overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="h-full w-full bg-gradient-to-b from-white/10 to-transparent" />
      </div>
      {children}
    </motion.div>
  );
}


function CrowdJumbotron({ hovered }: { hovered: boolean }) {
  const game = useMemo(
  () => ({
    away: "CLE",
    home: "GSW",
    awayScore: hovered ? 92 : 89,
    homeScore: hovered ? 89 : 89,
    clock: hovered ? "00:59" : "01:42",
    period: "Q4",
    market: hovered ? "-165" : "-120",
    model: hovered ? "-210" : "+100",
    note: hovered ? "Kyrie hits 3 - Cavs ahead" : "Both teams scoreless since 4:39 ",
  }),
  [hovered]
);


  return (
    <div className="mt-3 relative rounded-md border border-white/10 bg-black/25 p-3 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.5 : 0.18, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/70">Live Sportsbook</div>

          
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.75 }}
            transition={{ duration: 0.18 }}
            className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
          >
            LIVE
          </motion.div>
          <div className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
            &lt;250ms
          </div>
        </div>
      </div>

      {/* screen */}
      <motion.div
        className="relative mt-2 mx-auto w-full max-w-[340px] rounded-md border border-white/10 bg-black/40 p-2.5"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0.92,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.10) inset"
            : "0 0 0 1px rgba(255,255,255,0.06) inset",
        }}
        transition={{ duration: 0.18 }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{ opacity: hovered ? 0.08 : 0 }}
          transition={{ duration: 0.12 }}
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent 45%, rgba(255,255,255,0.08))",
          }}
        />

        <div className="flex items-center justify-between text-[10px] text-white/60">
          <span>
            {game.period} • {game.clock}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
            live feed
          </span>
        </div>

        <div className="mt-1 flex items-end justify-between gap-3">
          <div className="text-sm text-white/90 font-medium whitespace-nowrap">
            {game.away} {game.awayScore}{" "}
            <span className="text-white/40">-</span> {game.home} {game.homeScore}
          </div>

          {/* odds mini-board */}
          <div className="flex gap-1.5 shrink-0">
            <div className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
              <div className="text-white/50">Market</div>
              <motion.div
                key={`mkt-${game.market}`}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.14 }}
                className="text-white/85 font-medium tabular-nums"
              >
                {game.market}
              </motion.div>
            </div>

            <div className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px]">
              <div className="text-white/50">Model</div>
              <motion.div
                key={`mdl-${game.model}`}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.14 }}
                className="text-white/90 font-medium tabular-nums"
              >
                {game.model}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-1 text-[10px] text-white/55 truncate">{game.note}</div>
      </motion.div>

      {/* crowd silhouette */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
        initial={false}
        animate={{ opacity: hovered ? 0.9 : 0.65, y: hovered ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <svg viewBox="0 0 600 90" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="crowdFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="600" height="90" fill="url(#crowdFade)" />

          <path
            d="
              M0,70
              C30,40 50,78 80,55
              C110,30 140,78 170,52
              C200,28 230,80 260,55
              C290,35 320,82 350,56
              C380,30 410,80 440,54
              C470,32 500,82 530,58
              C555,40 575,78 600,62
              L600,90 L0,90 Z
            "
            fill="rgba(0,0,0,0.55)"
          />

          <motion.g
            initial={false}
            animate={{ opacity: hovered ? 0.45 : 0.25 }}
            transition={{ duration: 0.18 }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <circle
                key={i}
                cx={20 + i * 32}
                cy={72 + (i % 3) * 3}
                r="1.5"
                fill="rgba(255,255,255,0.35)"
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>

      {/* footer reserved space */}
      <div className="relative mt-2 text-[11px] text-white/60 flex items-center justify-between min-h-[16px]">
        <span />
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.16 }}
          className="text-white/70"
        />
      </div>
    </div>
  );
}

function InsiderEdgeSnapLine({ hovered }: { hovered: boolean }) {
  const w = 260;
  const h = 104;
  const padX = 10;
  const padY = 12;

  const series = React.useMemo(
    () => [
      184.2, 184.9, 185.4, 186.1, 187.0, 188.2, 189.7, 191.4, 193.0, 194.6,
      196.2, 197.9, 199.4, 200.6, 201.3, 202.2, 201.8, 195.2, 193.4, 194.1,
      194.8, 195.0,
    ],
    []
  );

  const min = Math.min(...series);
  const max = Math.max(...series);

  const pts = React.useMemo(() => {
    return series.map((v, i) => {
      const x = padX + (i * (w - padX * 2)) / Math.max(1, series.length - 1);
      const t = (v - min) / Math.max(1e-6, max - min);
      const y = padY + (1 - t) * (h - padY * 2);
      return { x, y, v, i };
    });
  }, [series, min, max, w, h, padX, padY]);

  const n = pts.length;

  const snapIndex = 16;
  const snapPt = pts[snapIndex];

  const postEventPts = React.useMemo(() => pts.slice(snapIndex), [pts]);
  const crashLow = React.useMemo(() => {
    return postEventPts.reduce((best, p) => (p.v < best.v ? p : best), postEventPts[0]);
  }, [postEventPts]);

  const prePath = React.useMemo(() => {
    return pts
      .slice(0, snapIndex + 1)
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  }, [pts]);

  const postPath = React.useMemo(() => {
    return pts
      .slice(snapIndex)
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  }, [pts]);

  const fullLinePath = React.useMemo(() => {
    return pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  }, [pts]);

  const areaPath = React.useMemo(() => {
    return `${fullLinePath} L ${w - padX} ${h - padY} L ${padX} ${h - padY} Z`;
  }, [fullLinePath, w, h, padX, padY]);

  const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

  const interpAtT = React.useCallback(
    (tt: number) => {
      const t = clamp(tt, 0, n - 1);
      const i0 = Math.floor(t);
      const i1 = Math.min(n - 1, i0 + 1);
      const a = t - i0;
      const p0 = pts[i0];
      const p1 = pts[i1];
      return {
        x: p0.x + (p1.x - p0.x) * a,
        y: p0.y + (p1.y - p0.y) * a,
        v: p0.v + (p1.v - p0.v) * a,
        t,
      };
    },
    [pts, n]
  );

  const defaultT = hovered ? crashLow.i : snapPt.i;
  const targetT = useMotionValue(defaultT);
  const springT = useSpring(targetT, {
    stiffness: 2800,
    damping: 70,
    mass: 0.12,
  });

  const mvX = useTransform(springT, (t) => interpAtT(t).x);
  const mvY = useTransform(springT, (t) => interpAtT(t).y);

  const crossLeft = useTransform(mvX, (x) => `${(x / w) * 100}%`);
  const tipLeft = useTransform(mvX, (x) => `calc(${(x / w) * 100}% - 28px)`);

  const [ui, setUi] = React.useState(() => interpAtT(defaultT));
  const uiRaf = React.useRef<number | null>(null);

  useMotionValueEvent(springT, "change", (t) => {
    if (uiRaf.current != null) return;
    uiRaf.current = requestAnimationFrame(() => {
      uiRaf.current = null;
      setUi(interpAtT(t));
    });
  });

  React.useEffect(() => {
    return () => {
      if (uiRaf.current != null) cancelAnimationFrame(uiRaf.current);
    };
  }, []);

  const chartRef = React.useRef<HTMLDivElement | null>(null);
  const [inside, setInside] = React.useState(false);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hovered || !chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const xPx = clamp(e.clientX - rect.left, 0, rect.width);
    const svgX = (xPx / Math.max(1, rect.width)) * w;

    const x0 = pts[0].x;
    const x1 = pts[n - 1].x;

    const ratio = clamp((svgX - x0) / Math.max(1e-6, x1 - x0), 0, 1);
    targetT.set(ratio * (n - 1));
  };

  React.useEffect(() => {
    if (!inside) targetT.set(defaultT);
  }, [defaultT, inside, targetT]);

  const priceNow = ui.v;
  const start = pts[0].v;
  const change = priceNow - start;
  const changePct = (change / start) * 100;

  const label = (() => {
    const t = ui.t;
    if (Math.abs(t - snapIndex) < 0.35) return "event";
    if (t > snapIndex + 0.35) return "crash";
    return "trend";
  })();

  const bottomText = ui.t > snapIndex ? "sell pressure → liquidity gap" : "anomaly spike detected";

  return (
    <div className="mt-3 rounded-md border border-white/15 bg-white/5 p-3 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">InsiderEdge</div>
          <div className="mt-0.5 text-[11px] text-white/60">
            AWS • ticker overlay • event-driven signal
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="shrink-0 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] text-white/75">
            AWS
          </div>
          <div className="shrink-0 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] text-white/75">
            1D
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-sm text-white/90 font-medium tabular-nums">
          ${priceNow.toFixed(2)}
        </div>

        <div className="text-[10px] text-white/60 tabular-nums">
          <span className="text-white/80">
            {change >= 0 ? "+" : ""}
            {change.toFixed(2)}
          </span>{" "}
          <span className="text-white/50">
            ({changePct >= 0 ? "+" : ""}
            {changePct.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* chart */}
      <div
        ref={chartRef}
        className="mt-3 relative"
        onPointerEnter={() => setInside(true)}
        onPointerLeave={() => {
          setInside(false);
          targetT.set(defaultT);
        }}
        onPointerMove={onMove}
      >
        {/* crosshair line */}
        <motion.div
          className="pointer-events-none absolute top-0 bottom-[18px] w-px bg-white/20"
          style={{ left: crossLeft }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.06, ease: "linear" }}
        />

        {/* tooltip */}
        <motion.div
          className="pointer-events-none absolute -top-2"
          style={{ left: tipLeft }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.08, ease: "easeOut" }}
        >
          <div className="rounded-md border border-white/15 bg-black/60 px-2 py-1 text-[10px] text-white/80 tabular-nums">
            {label} • ${priceNow.toFixed(2)}
          </div>
        </motion.div>

        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="block">
          <defs>
            <linearGradient id="areaFadeStocks" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
            </linearGradient>
          </defs>

          <g opacity="0.16">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = (i * h) / 4;
              return (
                <line
                  key={i}
                  x1="0"
                  x2={w}
                  y1={y}
                  y2={y}
                  stroke="white"
                  strokeWidth="0.7"
                />
              );
            })}
          </g>

          {/* area fill */}
          <path d={areaPath} fill="url(#areaFadeStocks)" />

          {/* pre-event line */}
          <motion.path
            d={prePath}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: hovered ? 0.9 : 0.95 }}
            transition={{ duration: 0.12 }}
          />

          {/* Crash Segment */}
          <AnimatePresence>
            {hovered && (
              <motion.path
                d={postPath}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.95 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.34, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>


          <motion.circle
            r="4.2"
            fill="white"
            cx={mvX}
            cy={mvY}
            style={{ opacity: hovered ? 1 : 0.75 }}
          />
        </svg>


        <div className="mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
          <span className="text-white/55">market view</span>
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.12 }}
            className="text-white/75"
          >
            {bottomText}
          </motion.span>
        </div>

        <motion.div
          className="pointer-events-none absolute right-2 top-2 text-[10px] text-white/45"
          initial={false}
          animate={{ opacity: hovered && inside ? 1 : 0 }}
          transition={{ duration: 0.12 }}
        >
          
        </motion.div>
      </div>
    </div>
  );
}

function LawnMowerJumbotron({ hovered, href }: { hovered: boolean; href: string }) {
  const W = 520;
  const H = 160;

  const mowerX = hovered ? 360 : 120;
  const mowWidth = hovered ? 330 : 40;

  const mowerGroupBaseY = 92;
  const deckCenterY = mowerGroupBaseY + 34;
  const mowStripH = 46;
  const mowStripY = Math.round(deckCenterY - mowStripH / 2);

  const stripX = 160;

  const BLEED = 18;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "mt-3 block rounded-md border border-emerald-200/20 bg-emerald-950/20",
        "overflow-hidden relative",
        "hover:border-emerald-200/30",
      ].join(" ")}
    >
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-emerald-300/16 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.55 : 0.22, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="relative flex items-center justify-between px-3 pt-3">
        <div>
          <div className="text-xs text-white/80">N&amp;M Landscaping LLC</div>
          <div className="mt-0.5 text-[11px] text-white/55"></div>
        </div>

        <div className="rounded-full border border-emerald-200/20 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
          Live Site
        </div>
      </div>

      <div className="relative px-3 pb-3 pt-2">
        <div className="relative rounded-md border border-white/10 bg-black/25 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-black/35 to-transparent z-[2]" />

          <svg viewBox={`0 0 ${W} ${H}`} className="block h-[110px] w-full">
            <defs>
              <linearGradient id="nmLawnAll_A2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(16,185,129,0.42)" />
                <stop offset="1" stopColor="rgba(16,185,129,0.16)" />
              </linearGradient>

      
              <filter id="nmGrain_A2" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="2"
                  stitchTiles="stitch"
                  seed="2"
                />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncA type="table" tableValues="0 0.10" />
                </feComponentTransfer>
              </filter>

          
              <pattern id="nmMowed_A2" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="rgba(255,255,255,0)" />
                <rect width="10" height="2" y="0" fill="rgba(255,255,255,0.05)" />
                <rect width="10" height="2" y="5" fill="rgba(0,0,0,0.06)" />
              </pattern>

              <filter id="nmSoftShadow_A2" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2"
                  floodColor="rgba(0,0,0,0.45)"
                />
              </filter>

              <radialGradient id="nmVignette_A2" cx="55%" cy="40%" r="85%">
                <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="1" stopColor="rgba(0,0,0,0.22)" />
              </radialGradient>

              <linearGradient id="nmTopLift_A2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
              </linearGradient>
            </defs>

            <rect
              x={-BLEED}
              y={-BLEED}
              width={W + BLEED * 2}
              height={H + BLEED * 2}
              fill="url(#nmLawnAll_A2)"
            />
            <rect
              x={-BLEED}
              y={-BLEED}
              width={W + BLEED * 2}
              height={H + BLEED * 2}
              filter="url(#nmGrain_A2)"
              opacity={hovered ? 0.14 : 0.10}
            />

            <rect x={-BLEED} y={-BLEED} width={W + BLEED * 2} height={48} fill="url(#nmTopLift_A2)" opacity="0.55" />


            <rect
              x={-BLEED}
              y={-BLEED}
              width={W + BLEED * 2}
              height={H + BLEED * 2}
              fill="url(#nmVignette_A2)"
              opacity="0.55"
            />

            <motion.rect
              x={stripX}
              y={mowStripY}
              height={mowStripH}
              rx="12"
              fill="rgba(0,0,0,0.10)"
              initial={false}
              animate={{ width: mowWidth, opacity: hovered ? 0.85 : 0.35 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />
            <motion.rect
              x={stripX}
              y={mowStripY}
              height={mowStripH}
              rx="12"
              fill="url(#nmMowed_A2)"
              initial={false}
              animate={{ width: mowWidth, opacity: hovered ? 0.50 : 0.18 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />
            <motion.rect
              x={stripX}
              y={mowStripY}
              height={mowStripH}
              rx="12"
              fill="rgba(255,255,255,0.06)"
              initial={false}
              animate={{ width: mowWidth, opacity: hovered ? 0.18 : 0.08 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />


            <g filter="url(#nmSoftShadow_A2)" transform="translate(22,22)">
              <path
                d="M 10 44 L 46 16 L 82 44 L 82 86 Q 82 94 74 94 L 18 94 Q 10 94 10 86 Z"
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="4.5"
                strokeLinejoin="round"
              />
              <path
                d="M66 22 L66 6 L78 6 L78 30"
                fill="none"
                stroke="rgba(255,255,255,0.70)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 42 94 L 42 70 Q 42 64 48 64 L 52 64 Q 58 64 58 70 L 58 94"
                fill="rgba(0,0,0,0.18)"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="55" cy="80" r="1.7" fill="rgba(255,255,255,0.65)" />

              <rect
                x="20"
                y="56"
                width="16"
                height="14"
                rx="4"
                fill="rgba(16,185,129,0.18)"
                stroke="rgba(255,255,255,0.24)"
                strokeWidth="1.6"
              />
              <rect
                x="66"
                y="56"
                width="16"
                height="14"
                rx="4"
                fill="rgba(16,185,129,0.18)"
                stroke="rgba(255,255,255,0.24)"
                strokeWidth="1.6"
              />

              {/* bushes */}
              <g transform="translate(96,74)">
                <circle cx="8" cy="10" r="9" fill="rgba(16,185,129,0.34)" />
                <circle cx="18" cy="8" r="10" fill="rgba(16,185,129,0.28)" />
                <circle cx="30" cy="10" r="9" fill="rgba(16,185,129,0.32)" />
                <path
                  d="M2 16 C10 10, 14 18, 22 14 C28 12, 34 18, 38 14"
                  fill="none"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>

       
            <motion.g
              initial={false}
              animate={{ x: mowerX }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            >
              <g transform="translate(70,92)">
                <path
                  d="M18 38 L6 14"
                  fill="none"
                  stroke="rgba(255,255,255,0.72)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M6 14 L26 14"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M26 14 L34 22"
                  fill="none"
                  stroke="rgba(255,255,255,0.42)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M18 26 C20 18, 34 14, 48 18 C58 21, 60 34, 54 40 C48 46, 26 46, 18 40 C14 36, 14 31, 18 26 Z"
                  fill="rgba(255,255,255,0.14)"
                  stroke="rgba(255,255,255,0.34)"
                  strokeWidth="2"
                />

                <rect
                  x="33"
                  y="18"
                  width="15"
                  height="10"
                  rx="4"
                  fill="rgba(255,255,255,0.10)"
                  stroke="rgba(255,255,255,0.24)"
                  strokeWidth="1.5"
                />

                <circle cx="26" cy="44" r="6.2" fill="rgba(255,255,255,0.86)" />
                <circle cx="52" cy="44" r="6.2" fill="rgba(255,255,255,0.86)" />
                <circle cx="26" cy="44" r="2.2" fill="rgba(0,0,0,0.25)" />
                <circle cx="52" cy="44" r="2.2" fill="rgba(0,0,0,0.25)" />

                <motion.g
                  initial={false}
                  animate={{ opacity: hovered ? 0.60 : 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={66 + i * 6}
                      cy={34 + (i % 2) * 7}
                      r="1.6"
                      fill="rgba(16,185,129,0.9)"
                    />
                  ))}
                </motion.g>
              </g>
            </motion.g>
          </svg>

          <div className="flex items-center justify-between px-3 py-2 text-[11px] text-white/60">
            <span className="text-white/55">The best in Chicagoland!</span>
            <motion.span
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
              transition={{ duration: 0.2 }}
              className="text-white/75"
            >
              mowing pass…
            </motion.span>
          </div>
        </div>
      </div>
    </a>
  );
}


function AdditionOnlyCalc({ hovered }: { hovered: boolean }) {
  const [expr, setExpr] = useState("2+2");
  const [result, setResult] = useState<string>("");

  const evaluate = () => {
    const s = expr.replace(/\s+/g, "");

    if (!/^\d+(?:\+\d+)*$/.test(s)) {
      setResult("Nah");
      return;
    }

    const sum = s.split("+").reduce((acc, n) => acc + Number(n), 0);
    setResult(String(sum));
  };

  return (
    <div className="mt-3 rounded-md border border-white/15 bg-white/5 p-3 relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.5 : 0.2, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">MathMedic</div>
          <div className="mt-0.5 text-[11px] text-white/60"></div>
        </div>

        <div className="shrink-0 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] text-white/75"></div>
      </div>

      <div className="relative mt-3 rounded-md border border-white/10 bg-black/30 p-3">
        <div className="flex items-center gap-2">
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") evaluate();
            }}
            placeholder="e.g. 10+25+3"
            className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/90 outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={evaluate}
            className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            =
          </button>
        </div>

        <div className="mt-2 min-h-[18px] text-sm text-white/85 tabular-nums">
          {result}
        </div>
      </div>
    </div>
  );
}

function TetrisMini({ hovered }: { hovered: boolean }) {
  const SIZE = 160;
  const COLS = 10;
  const ROWS = 10;
  const cell = SIZE / COLS;

  type Block = { x: number; y: number };
  type Piece = {
    color: string;
    blocks: Block[];
    start: { x: number; y: number }; // y can be negative
    landY: number;
  };

  const pieces: Piece[] = useMemo(
    () => [
      // T
      {
        color: "rgba(56,189,248,0.95)",
        blocks: [
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
          { x: 2, y: 1 },
        ],
        start: { x: 3, y: -2 },
        landY: 8,
      },
      // L
      {
        color: "rgba(251,191,36,0.95)",
        blocks: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 1, y: 2 },
        ],
        start: { x: 1, y: -5 },
        landY: 7,
      },
      // O
      {
        color: "rgba(34,197,94,0.95)",
        blocks: [
          { x: 0, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ],
        start: { x: 6, y: -4 },
        landY: 8,
      },
      // I
      {
        color: "rgba(239,68,68,0.95)",
        blocks: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: 2 },
          { x: 0, y: 3 },
        ],
        start: { x: 8, y: -7 },
        landY: 6,
      },
    ],
    []
  );

  const maxBlockY = (blocks: Block[]) => blocks.reduce((m, b) => Math.max(m, b.y), 0);

  const clampLandY = (landY: number, blocks: Block[]) => {
    const maxY = maxBlockY(blocks);
    return Math.min(ROWS - 1 - maxY, landY);
  };

  // integer rows for each piece (NO subpixel)
  const [rows, setRows] = React.useState<number[]>(() => pieces.map((p) => p.start.y));

  // reset when hover leaves (teleport back instantly)
  React.useEffect(() => {
    if (!hovered) setRows(pieces.map((p) => p.start.y));
  }, [hovered, pieces]);

  React.useEffect(() => {
    if (!hovered) return;

    // ✅ slower tick = more retro (increase this to slow down more)
    const TICK_MS = 220;

    const finalRows = pieces.map((p) => clampLandY(p.landY, p.blocks));

    const id = window.setInterval(() => {
      setRows((prev) =>
        prev.map((r, i) => {
          const target = finalRows[i];
          if (r >= target) return r; // already landed
          return r + 1; // ✅ move EXACTLY one grid cell per tick
        })
      );
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [hovered, pieces]);

  return (
    <div className="mt-3 flex justify-center">
      <div
        className={[
          "relative rounded-md border border-white/15 bg-black/35",
          "w-[160px] h-[160px] overflow-hidden",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        ].join(" ")}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="block">
          {/* grid */}
          <g opacity="0.22">
            {Array.from({ length: COLS + 1 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * cell} y1={0} x2={i * cell} y2={SIZE} stroke="white" strokeWidth="0.7" />
            ))}
            {Array.from({ length: ROWS + 1 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={i * cell} x2={SIZE} y2={i * cell} stroke="white" strokeWidth="0.7" />
            ))}
          </g>

          {/* slight sheen */}
          <rect x="0" y="0" width={SIZE} height={SIZE} fill="rgba(255,255,255,0.03)" />

          {pieces.map((p, idx) => {
            const xPx = p.start.x * cell;
            const yPx = rows[idx] * cell; // ✅ integer row -> exact grid alignment

            return (
              <g key={idx} transform={`translate(${xPx},${yPx})`}>
                {p.blocks.map((b, i) => (
                  <g key={i} transform={`translate(${b.x * cell},${b.y * cell})`}>
                    <rect
                      x="1"
                      y="1"
                      width={cell - 2}
                      height={cell - 2}
                      fill={p.color}
                      shapeRendering="crispEdges"
                    />
                    <rect
                      x="2"
                      y="2"
                      width={Math.max(2, cell * 0.35)}
                      height={Math.max(2, cell * 0.2)}
                      fill="rgba(255,255,255,0.20)"
                      shapeRendering="crispEdges"
                    />
                    <rect
                      x="1"
                      y={cell - 3}
                      width={cell - 2}
                      height="2"
                      fill="rgba(0,0,0,0.18)"
                      shapeRendering="crispEdges"
                    />
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FlextasyPhone({ hovered }: { hovered: boolean }) {
  const messages = useMemo(
    () => [
      { from: "them", text: "leg day?" },
      { from: "me", text: "locked in. 5pm" },
      { from: "them", text: "bet, logging squats now" },
    ],
    []
  );

  const [reps, setReps] = React.useState(0);

  React.useEffect(() => {
    if (!hovered) {
      setReps(0);
      return;
    }
    const id = window.setInterval(() => {
      setReps((r) => (r >= 12 ? 12 : r + 1));
    }, 150);
    return () => window.clearInterval(id);
  }, [hovered]);

  return (
    <div className="mt-3 rounded-md border border-white/15 bg-white/5 p-3 relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-purple-300/15 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.55 : 0.2, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">Flextasy</div>
          <div className="mt-0.5 text-[11px] text-white/55">
            live chat • workout log
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.7 }}
            className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
          >
            WebSocket
          </motion.div>
        </div>
      </div>

      {/* phone frame */}
      <div className="relative mt-3 mx-auto w-full max-w-[220px] rounded-xl border border-white/15 bg-black/45 p-2.5 pb-3">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20" />

        {/* chat area */}
        <div className="space-y-1.5 min-h-[92px]">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: hovered ? 1 : i === 0 ? 0.75 : 0,
                y: hovered ? 0 : 6,
                scale: hovered ? 1 : 0.97,
              }}
              transition={{ duration: 0.24, delay: hovered ? 0.12 * i : 0, ease: "easeOut" }}
              className={[
                "max-w-[80%] rounded-lg px-2.5 py-1.5 text-[11px] leading-snug",
                m.from === "me"
                  ? "ml-auto bg-purple-300/25 text-white/90 border border-purple-200/20"
                  : "bg-white/10 text-white/80 border border-white/10",
              ].join(" ")}
            >
              {m.text}
            </motion.div>
          ))}
        </div>

        {/* workout ticker */}
        <div className="mt-2.5 rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5 flex items-center justify-between">
          <span className="text-[10px] text-white/55">Back Squat</span>
          <span className="text-[11px] text-white/90 font-medium tabular-nums">
            {reps} / 12 reps
          </span>
        </div>
      </div>

      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">Spring Boot backend</span>
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.16 }}
          className="text-white/75"
        >
          set logged → synced
        </motion.span>
      </div>
    </div>
  );
}

function HuddleThread({ hovered }: { hovered: boolean }) {
  const posts = useMemo(
    () => [
      { user: "@mike23", text: "CALL THE SCREEN. every time." },
      { user: "@jjhoops", text: "he has 12 straight, feed him" },
      { user: "@sara_v", text: "dagger three. ball game." },
    ],
    []
  );

  const score = hovered
    ? { line: "ISU 81 - KU 78", clock: "00:24 Q4" }
    : { line: "ISU 74 - KU 75", clock: "03:11 Q4" };

  return (
    <div className="mt-3 rounded-md border border-white/15 bg-white/5 p-3 relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-sky-300/15 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.55 : 0.2, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">The Huddle</div>
          <div className="mt-0.5 text-[11px] text-white/55">game thread</div>
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
        >
          LIVE
        </motion.div>
      </div>

      {/* score ticker */}
      <div className="relative mt-2 rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5 flex items-center justify-between">
        <motion.span
          key={score.line}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="text-[11px] text-white/90 font-medium tabular-nums"
        >
          {score.line}
        </motion.span>
        <span className="text-[10px] text-white/55 tabular-nums">{score.clock}</span>
      </div>

      {/* thread */}
      <div className="relative mt-2 space-y-1.5 min-h-[88px]">
        {posts.map((p, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              opacity: hovered ? 1 : i === 0 ? 0.7 : 0,
              x: hovered ? 0 : -8,
            }}
            transition={{ duration: 0.22, delay: hovered ? 0.13 * i : 0, ease: "easeOut" }}
            className="flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
          >
            <span className="text-[10px] text-sky-200/80 shrink-0">{p.user}</span>
            <span className="text-[11px] text-white/80 leading-snug">{p.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">fan chatter, live</span>
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.16 }}
          className="text-white/75"
        >
          thread heating up…
        </motion.span>
      </div>
    </div>
  );
}

function FaultLineScene({ hovered }: { hovered: boolean }) {
  const nodes = useMemo(
    () => [
      { key: "metrics", label: "Metrics" },
      { key: "logs", label: "Logs" },
      { key: "traces", label: "Traces" },
    ],
    []
  );

  // step: 0 idle, 1 paged, 2 investigating, 3 root cause, 4 pending approval
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (!hovered) {
      setStep(0);
      return;
    }
    const timers = [
      window.setTimeout(() => setStep(1), 120),
      window.setTimeout(() => setStep(2), 620),
      window.setTimeout(() => setStep(3), 1500),
      window.setTimeout(() => setStep(4), 2050),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hovered]);

  return (
    <div className="mt-3 rounded-md border border-rose-200/15 bg-rose-950/15 p-3 relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-rose-400/15 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.5 : 0.18, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">FaultLine</div>
          <div className="mt-0.5 text-[11px] text-white/55">incident arena</div>
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: step >= 1 ? 1 : 0.55,
            borderColor:
              step >= 1 ? "rgba(251,113,133,0.6)" : "rgba(255,255,255,0.15)",
          }}
          className="flex items-center gap-1.5 rounded-full border bg-black/40 px-2 py-0.5 text-[10px] text-rose-100/90"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-rose-400"
            animate={{ opacity: step >= 1 && step < 3 ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 0.7, repeat: step >= 1 && step < 3 ? Infinity : 0 }}
          />
          PAGED
        </motion.div>
      </div>

      {/* alert line */}
      <div className="relative mt-2 rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/55 tabular-nums">
            ALERT · db-pool-exhaustion
          </span>
          <motion.span
            initial={false}
            animate={{ opacity: step >= 1 ? 1 : 0.3 }}
            className="text-rose-200/80"
          >
            firing
          </motion.span>
        </div>
      </div>

      {/* tool nodes */}
      <div className="relative mt-2 grid grid-cols-3 gap-2">
        {nodes.map((n, i) => {
          const scanning = step === 2;
          return (
            <motion.div
              key={n.key}
              initial={false}
              animate={{
                borderColor: scanning
                  ? "rgba(255,255,255,0.35)"
                  : "rgba(255,255,255,0.1)",
                opacity: scanning ? [0.5, 1, 0.5] : step >= 3 ? 0.5 : 0.8,
              }}
              transition={{
                duration: 0.6,
                repeat: scanning ? Infinity : 0,
                delay: scanning ? i * 0.18 : 0,
              }}
              className="rounded-md border bg-white/[0.04] px-2 py-1.5 text-center text-[10px] text-white/70"
            >
              {n.label}
            </motion.div>
          );
        })}
      </div>

      {/* root cause */}
      <motion.div
        initial={false}
        animate={{
          opacity: step >= 3 ? 1 : 0,
          y: step >= 3 ? 0 : 6,
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative mt-2 rounded-md border border-amber-200/30 bg-amber-300/10 px-2.5 py-1.5"
      >
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-amber-100/90">root cause · connection pool</span>
          <span className="text-white/50">evidence ✓</span>
        </div>
      </motion.div>

      {/* footer */}
      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">agent diagnosing</span>
        <motion.span
          initial={false}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/75"
        >
          fix · pending approval
        </motion.span>
      </div>
    </div>
  );
}

function MatVisionScene({ hovered }: { hovered: boolean }) {
  const events = useMemo(
    () => [
      { t: 26, label: "Shot" },
      { t: 52, label: "TD" },
      { t: 78, label: "Esc" },
    ],
    []
  );

  const [takedowns, setTakedowns] = React.useState(0);
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (!hovered) {
      setTakedowns(0);
      setShown(0);
      return;
    }
    const timers = [
      window.setTimeout(() => setShown(1), 400),
      window.setTimeout(() => setShown(2), 900),
      window.setTimeout(() => {
        setShown(3);
        setTakedowns(1);
      }, 1400),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hovered]);

  return (
    <div className="mt-3 rounded-md border border-orange-200/15 bg-orange-950/10 p-3 relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-orange-400/15 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.5 : 0.18, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/70">MatVision</div>
          <div className="mt-0.5 text-[11px] text-white/55">film breakdown</div>
        </div>
        <div className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70">
          CV + pose
        </div>
      </div>

      {/* mat / tracking view */}
      <div className="relative mt-2 rounded-md border border-white/10 bg-black/40 overflow-hidden">
        <svg viewBox="0 0 260 96" className="block w-full h-[90px]">
          {/* mat rings */}
          <circle cx="130" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle cx="130" cy="48" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

          {/* wrestler A tracked box + skeleton */}
          <motion.g
            initial={false}
            animate={{ x: hovered ? [0, 10, 4] : 0, y: hovered ? [0, -4, 2] : 0 }}
            transition={{ duration: 2, repeat: hovered ? Infinity : 0, repeatType: "mirror" }}
          >
            <rect x="96" y="34" width="26" height="34" rx="3" fill="none" stroke="rgba(129,212,250,0.7)" strokeWidth="1.4" />
            <circle cx="109" cy="40" r="3" fill="rgba(129,212,250,0.9)" />
            <line x1="109" y1="43" x2="109" y2="56" stroke="rgba(129,212,250,0.8)" strokeWidth="1.4" />
            <line x1="109" y1="47" x2="102" y2="53" stroke="rgba(129,212,250,0.8)" strokeWidth="1.4" />
            <line x1="109" y1="47" x2="117" y2="52" stroke="rgba(129,212,250,0.8)" strokeWidth="1.4" />
            <line x1="109" y1="56" x2="104" y2="65" stroke="rgba(129,212,250,0.8)" strokeWidth="1.4" />
            <line x1="109" y1="56" x2="115" y2="65" stroke="rgba(129,212,250,0.8)" strokeWidth="1.4" />
          </motion.g>

          {/* wrestler B tracked box + skeleton */}
          <motion.g
            initial={false}
            animate={{ x: hovered ? [0, -8, -3] : 0, y: hovered ? [0, 3, -2] : 0 }}
            transition={{ duration: 2, repeat: hovered ? Infinity : 0, repeatType: "mirror" }}
          >
            <rect x="140" y="36" width="26" height="34" rx="3" fill="none" stroke="rgba(251,146,60,0.7)" strokeWidth="1.4" />
            <circle cx="153" cy="42" r="3" fill="rgba(251,146,60,0.9)" />
            <line x1="153" y1="45" x2="153" y2="58" stroke="rgba(251,146,60,0.8)" strokeWidth="1.4" />
            <line x1="153" y1="49" x2="146" y2="54" stroke="rgba(251,146,60,0.8)" strokeWidth="1.4" />
            <line x1="153" y1="49" x2="161" y2="55" stroke="rgba(251,146,60,0.8)" strokeWidth="1.4" />
            <line x1="153" y1="58" x2="148" y2="66" stroke="rgba(251,146,60,0.8)" strokeWidth="1.4" />
            <line x1="153" y1="58" x2="159" y2="66" stroke="rgba(251,146,60,0.8)" strokeWidth="1.4" />
          </motion.g>
        </svg>
      </div>

      {/* timeline with events */}
      <div className="relative mt-2">
        <div className="relative h-1.5 rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-orange-300/60"
            initial={false}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 1.6, ease: "linear" }}
          />
          {events.map((e, i) => (
            <motion.span
              key={e.label}
              className="absolute -top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-orange-200/40 bg-black/70 text-[7px] leading-[13px] text-center text-orange-100/90"
              style={{ left: `${e.t}%` }}
              initial={false}
              animate={{ opacity: shown > i ? 1 : 0, scale: shown > i ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              •
            </motion.span>
          ))}
        </div>
      </div>

      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">evidence-grounded</span>
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.16 }}
          className="text-white/75 tabular-nums"
        >
          takedowns: {takedowns}
        </motion.span>
      </div>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<Tab>("intro");
  const [sportsHovered, setSportsHovered] = useState(false);
  const [insiderHovered, setInsiderHovered] = useState(false);
  const [landHovered, setLandHovered] = useState(false);
  const [mathHovered, setMathHovered] = useState(false);
  const [tetrisHovered, setTetrisHovered] = useState(false);
  const [flexHovered, setFlexHovered] = useState(false);
  const [huddleHovered, setHuddleHovered] = useState(false);
  const [faultHovered, setFaultHovered] = useState(false);
  const [matHovered, setMatHovered] = useState(false);
  const TAB_IDS = React.useMemo<Tab[]>(
    () => ["intro", "experience", "projects", "tech", "publications"],
    []
  );

  /* select tab + keep URL hash shareable */
  const selectTab = React.useCallback(
    (id: Tab) => {
      setTab(id);
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${id}`);
      }
    },
    []
  );

  /* sync from hash on load / back / forward */
  React.useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "") as Tab;
      if (TAB_IDS.includes(h)) setTab(h);
    };
    fromHash();
    window.addEventListener("popstate", fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      window.removeEventListener("popstate", fromHash);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [TAB_IDS]);

  /* arrow-key tab navigation */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      const idx = TAB_IDS.indexOf(tab);
      if (e.key === "ArrowRight") selectTab(TAB_IDS[(idx + 1) % TAB_IDS.length]);
      if (e.key === "ArrowLeft")
        selectTab(TAB_IDS[(idx - 1 + TAB_IDS.length) % TAB_IDS.length]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, TAB_IDS, selectTab]);

  return (
    <>
      <FixedBg />
      <ParticleField />

      <DimensionHero active={tab} onSelect={selectTab} />

      <section className="relative z-10 text-white -mt-6 md:-mt-10">
        <div className="mx-auto max-w-4xl px-5 py-10 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="rounded-xl border border-white/15 bg-black/45 backdrop-blur-sm p-6 md:p-8">
                {/* INTRO TAB */}
                {tab === "intro" && (
                  <div className="prose prose-invert prose-zinc max-w-none text-center">
                    <div className="flex justify-center mb-6 mt-2">
                      <Image
                        src="/images/IMG_3919.PNG"
                        alt="Schon Huxley"
                        width={112}
                        height={112}
                        priority
                        className="w-28 h-28 rounded-full border border-white/30 shadow-lg object-cover"
                      />
                    </div>

                    <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                      Schon here,
                    </h1>

                    <p className="leading-relaxed text-white/90">
                      I’m an early-career Software Engineer and senior at Iowa
                      State University with a strong focus on Infrastructure,
                      Systems Reliability, and applied Machine Learning. I’m
                      passionate about building projects that bridge technical
                      depth with real-world impact. From designing full-stack
                      web applications to experimenting with machine learning
                      pipelines and applied AI systems. Outside of engineering,
                      you can find me in the gym lifting or hooping on the
                      courts. I always enjoy hanging with my friends and keeping
                      myself busy.  I’m on the path to excellence; the never-ending journey of
                      self-improvement.
                    </p>

                    {/* current position */}
                    <div className="mt-7 flex justify-center not-prose">
                      <span className="inline-flex items-center gap-2 rounded-full border border-red-400/35 bg-red-400/10 px-4 py-1.5 text-sm text-red-100/90">
                        <span className="h-2 w-2 rounded-full bg-red-400" />
                        Recently: AI Reliability &amp; DevOps Intern @ Lenovo | Qira AI Platform
                      </span>
                    </div>

                    {/* student status */}
                    <div className="mt-5 grid gap-3 sm:grid-cols-2 text-left not-prose">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                          Education
                        </div>
                        <div className="mt-2 text-sm font-medium text-white/95">
                          Iowa State University
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                          Senior • B.S. Software Engineering
                        </div>
                        <div className="text-sm text-white/70">
                          Minors in AI &amp; Computer Science
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                          Activities &amp; Societies
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {[
                            "Wrestling Club • Competitor",
                            "Phi Gamma Delta • Social Chair",
                            "AI & Machine Learning Club",
                            "Robotics Club",
                          ].map((a) => (
                            <span
                              key={a}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/75"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* EXPERIENCE TAB */}
{tab === "experience" && (
  <div>
    <h2 className="text-2xl font-semibold">Experience</h2>

    <motion.ul
      variants={staggerList}
      initial="initial"
      animate="animate"
      className="relative mt-6 space-y-5 pl-5 md:pl-6 before:absolute before:left-0 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-red-400/40 before:via-emerald-300/30 before:to-sky-300/30"
    >
      {/* LENOVO */}
      <motion.li
        variants={staggerItem}
        className="relative rounded-xl border border-white/10 border-l-2 border-l-red-400/50 bg-white/5 p-6"
      >
        <span className="absolute -left-[27px] md:-left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-lg">
              Lenovo | AI Reliability &amp; DevOps Intern
            </div>
            <div className="mt-1 text-sm text-white/70">
              Qira AI Platform
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/40 bg-red-400/10 px-2.5 py-0.5 text-[11px] font-medium text-red-200">
              Internship
            </span>
            <span className="text-xs text-white/50 tabular-nums">
              May 2026 – July 2026
            </span>
          </div>
        </div>

        <ul className="mt-4 list-disc pl-5 text-sm text-white/85 space-y-2">
          <li>
            Built 5 production quality signals in Rust for the AI runtime (retry storms, clarification rate, tool-call depth, loop latency, and task success), giving the SRE team its first real view into how the agent was behaving instead of just whether the service was up.
          </li>
          <li>
            Instrumented the cloud-to-local model fallback path across iOS, Android, and Windows, cutting the time to catch a cloud provider outage from about 10 minutes to under 2 with a clean reason label and Prometheus alerts.
          </li>
          <li>
            Built a thread-safe OpenTelemetry hot-reload system in Rust backed by Azure App Configuration, taking a collector endpoint change from a multi-day release down to under 60 seconds with no new deploy.
          </li>
          <li>
            Owned reliability across 6 AI experiences and 3 partner integrations, driving 23 instrumentation requirements into production and helping cut a core workflow’s P95 latency by about 65%.
          </li>
          <li>
            Found that a flagship AI feature’s main trigger path was emitting no telemetry at all, then took it from 0% to 100% span coverage after realizing every prior report had only measured internal test traffic.
          </li>
          <li>
            Stood up the platform’s first external uptime monitoring with Azure Functions, delivering sub-2-minute P1 paging from multiple regions.
          </li>
          <li>
            Built a multi-region Grafana dashboard that broke a 7-stage AI pipeline into its parts, tracing a 26-day latency spike to the server-side graph inference layer and ruling out the model itself.
          </li>
          <li>
            Investigated and helped fix 8 defects in the Expedia integration, shipping 6 fixes and 3 alerts and proving the slowdown was on the partner side, which cut flight-search P95 from 17.1s to 8.3s.
          </li>
        </ul>

        <div className="chip-row mt-4 flex flex-wrap gap-1.5">
          {["Rust", "OpenTelemetry", "Prometheus", "Grafana", "Azure", "Agentic AI", "SRE"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
              >
                {t}
              </span>
            )
          )}
        </div>
      </motion.li>

      {/* BERKLEY */}
      <motion.li
        variants={staggerItem}
        className="relative rounded-xl border border-white/10 border-l-2 border-l-emerald-300/50 bg-white/5 p-6"
      >
        <span className="absolute -left-[27px] md:-left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-lg">
              Berkley Technology Services | Site Reliability Engineer
            </div>
            <div className="mt-1 text-sm text-white/70">
              Reliability engineering, observability strategy, and automation across large-scale legacy systems.
            </div>
          </div>

          <span className="text-xs text-white/50 tabular-nums">
            May 2025 – April 2026
          </span>
        </div>

        {/* CO-OP */}
        <div className="mt-4">
          <div className="text-sm text-white/70 font-medium">
            Co-Op • Aug 2025 – April 2026
          </div>

          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
            <li>
              Designed an SRE-style reliability framework for a legacy multi-tenant insurance platform spanning 5+ environments and 25+ service dependencies, translating Tier-0 application flows into measurable SLIs and helping reduce mean time to resolution by 20% through dependency-aware triage.
            </li>
            <li>
              Mapped end-to-end business journeys to Tier-0 infrastructure and application dependencies (Kong, IBM Liberty, Db2, ACE), enabling dependency-aware monitoring and faster incident triage.
            </li>
            <li>
              Led a cross-functional redesign of AppDynamics monitoring for a critical Client Search (ACS) platform alongside InfoSec, Enterprise Architecture, and Database teams, reducing alert noise by 70%+ and refocusing pages on actual user-impacting failures.
            </li>
            <li>
              Defined user-centric reliability by anchoring SLIs to successful completion of customer workflows rather than infrastructure uptime, improving signal quality for on-call response.
            </li>
            <li>
              Automated a recurring AppDynamics SLO reporting workflow with scheduled exports and refreshes on monitored enterprise infrastructure, delivering updated reliability data every Monday morning.
            </li>
            <li>
              Represented the SRE team in PI Planning across BTS, presenting progress, dependencies, backlog, and risks to engineering and business stakeholders.
            </li>
          </ul>
        </div>

        {/* INTERN */}
        <div className="mt-5 pt-5 border-t border-white/10">
          <div className="text-sm text-white/70 font-medium">
            Intern • May 2025 – Aug 2025
          </div>

          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
            <li>
              Engineered secure credential-rotation automation integrating PowerShell, SQL, and REST APIs with Active Directory, Delinea, and SolarWinds, managing 500+ service accounts with 100% audit compliance.
            </li>
            <li>
              Designed a secure RPA-based credential rotation system for SolarWinds WPM synthetic monitoring, eliminating manual updates where no supported API existed.
            </li>
            <li>
              Built a hybrid automation architecture using Power Automate Cloud + Desktop to orchestrate UI-level credential updates through an RDP-launched fat client, with Delinea Secret Server APIs integrated via Microsoft Data Gateway.
            </li>
            <li>
              Developed reusable Ansible and PowerShell automation to standardize system configurations, reducing manual operational effort by 50% and configuration drift by 80%.
            </li>
            <li>
              Facilitated weekly stakeholder syncs across engineering, security, and operations, clarifying ownership, accelerating issue resolution, and strengthening knowledge sharing.
            </li>
          </ul>
        </div>
      </motion.li>

      {/* FREELANCE */}
      <motion.li
        variants={staggerItem}
        className="relative rounded-xl border border-white/10 border-l-2 border-l-sky-300/50 bg-white/5 p-6"
      >
        <span className="absolute -left-[27px] md:-left-[31px] top-7 h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_10px_rgba(125,211,252,0.8)]" />
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="font-semibold text-lg">
            Freelance Web Developer | Self-Employed
          </div>
          <span className="text-xs text-white/50 tabular-nums">
            Feb 2025 – Present
          </span>
        </div>

        {/* DT GROUP */}
        <div className="mt-4">
          <div className="text-sm text-white/80 font-semibold">
            DT Group LLC | Web Revamp & SEO Optimization
          </div>
          <div className="text-xs text-white/60 mt-0.5">
            Nov 2025 - Dec 2025
          </div>

          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
            <li>
              Led a full-scale website revamp and SEO cleanup, improving site structure, metadata consistency, and search engine visibility.
            </li>
            <li>
              Resolved complex Google Business Profile inconsistencies, consolidating duplicate listings and aligning business data across platforms to improve local SEO trust signals.
            </li>
          </ul>
        </div>

        {/* N&M */}
        <div className="mt-5 pt-5 border-t border-white/10">
          <div className="text-sm text-white/80 font-semibold">
            N&amp;M Landscaping LLC | Website
          </div>
          <div className="text-xs text-white/60 mt-0.5">
            Feb 2025 - Mar 2025
          </div>

          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
            <li>
              Designed, built, and deployed a full-stack business website using React, TypeScript, Tailwind CSS, and Supabase, hosted on Vercel.
            </li>
            <li>
              Implemented responsive UI, SEO optimization, and customer inquiry workflows with full CRUD booking flows, increasing client acquisition by 40%.
            </li>
          </ul>
        </div>
      </motion.li>
    </motion.ul>
  </div>
)}

                {/* PROJECTS TAB */}
                {tab === "projects" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Projects</h2>

                    <motion.div
                      variants={staggerList}
                      initial="initial"
                      animate="animate"
                      className="mt-6 grid gap-5 md:grid-cols-2"
                    >
                      {/* MatVision */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setMatHovered(true)}
                          onMouseLeave={() => setMatHovered(false)}
                        >
                          <div className="font-medium">
                            MatVision | AI Wrestling Film Intelligence
                          </div>
                          <div className="text-sm text-white/70">
                            Python, PyTorch, OpenCV, FastAPI, Next.js
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>
                              Athlete tracking, pose estimation, and temporal event
                              detection turn match film into stats and auto-clips.
                            </li>
                            <li>
                              Every coaching note links to a timestamp; the model only
                              explains facts the CV pipeline already verified.
                            </li>
                          </ul>

                          <MatVisionScene hovered={matHovered} />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <span
                            className="inline-block cursor-default rounded-md border border-white/20 px-3 py-1 text-sm font-medium text-white/40"
                            title="Demo coming soon"
                          >
                            Demo
                          </span>
                          <a
                            href="https://github.com/schonhux/MatVision"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Repo
                          </a>
                        </div>
                      </ProjectCard>

                      {/* FaultLine */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setFaultHovered(true)}
                          onMouseLeave={() => setFaultHovered(false)}
                        >
                          <div className="font-medium">
                            FaultLine | AI Incident-Response Arena
                          </div>
                          <div className="text-sm text-white/70">
                            Rust, Python, LangGraph, MCP, OpenTelemetry
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>
                              Injects real production outages into a live app, then
                              scores how an AI agent diagnoses them against ground truth.
                            </li>
                            <li>
                              Read-only telemetry tools via MCP; every fix blocks on
                              human approval before running.
                            </li>
                          </ul>

                          <FaultLineScene hovered={faultHovered} />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <span
                            className="inline-block cursor-default rounded-md border border-white/20 px-3 py-1 text-sm font-medium text-white/40"
                            title="Demo coming soon"
                          >
                            Demo
                          </span>
                          <a
                            href="https://github.com/schonhux/FaultLine"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Repo
                          </a>
                        </div>
                      </ProjectCard>

                      {/* Sports Betting Engine */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setSportsHovered(true)}
                          onMouseLeave={() => setSportsHovered(false)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium">
                                Real-Time Sports Betting Prediction Engine
                              </div>
                              <div className="text-sm text-white/70">
                                Python, LightGBM, Redis, DuckDB
                              </div>
                            </div>

                            <div className="shrink-0 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[11px] text-white/70">
                              Live
                            </div>
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>&lt;250 ms inference, calibrated probabilities.</li>
                            <li>EV/profit curves with real-time guardrails.</li>
                          </ul>

                          <CrowdJumbotron hovered={sportsHovered} />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <a
                            href="https://youtu.be/g5NZ6OFR-IE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Demo
                          </a>
                          <a
                            href="https://github.com/schonhux/In-Play-Edge-Engine-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Repo
                          </a>
                        </div>
                      </ProjectCard>

                      {/* InsiderEdge */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setInsiderHovered(true)}
                          onMouseLeave={() => setInsiderHovered(false)}
                        >
                          <div className="font-medium">
                            InsiderEdge | Insider Trading ML Platform
                          </div>
                          <div className="text-sm text-white/70">
                            C#, ML.NET, ASP.NET Core, Azure
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>
                              Detected anomalous insider trades via LightGBM +
                              SSA.
                            </li>
                            <li>
                              Ingested SEC filings, stock prices, and sentiment
                              data.
                            </li>
                            <li>
                              Automated retraining and Azure-hosted deployment.
                            </li>
                          </ul>

                          <InsiderEdgeSnapLine hovered={insiderHovered} />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <a
                            href="https://github.com/schonhux/InsiderEdge"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Repo
                          </a>
                        </div>
                      </ProjectCard>

                      {/* Flextasy */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setFlexHovered(true)}
                          onMouseLeave={() => setFlexHovered(false)}
                        >
                          <div className="font-medium">
                            Flextasy | Social Fitness App
                          </div>
                          <div className="text-sm text-white/70">
                            Java, Android, Spring Boot, MySQL, WebSockets
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Real-time messaging + friend updates via WebSockets.</li>
                            <li>JWT auth, workout &amp; meal tracking with MySQL.</li>
                          </ul>

                          <FlextasyPhone hovered={flexHovered} />
                        </div>

                        <a
                          href="https://github.com/schonhux/Flextasy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                        >
                          Repo
                        </a>
                      </ProjectCard>

                      {/* The Huddle */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setHuddleHovered(true)}
                          onMouseLeave={() => setHuddleHovered(false)}
                        >
                          <div className="font-medium">
                            The Huddle | Sports Community Hub
                          </div>
                          <div className="text-sm text-white/70">
                            JavaScript, Node.js, Full Stack
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Live game threads and fan discussion feeds.</li>
                            <li>Dynamic league &amp; team pages with favorites.</li>
                          </ul>

                          <HuddleThread hovered={huddleHovered} />
                        </div>

                        <a
                          href="https://github.com/schonhux/The-Huddle"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                        >
                          Repo
                        </a>
                      </ProjectCard>

                      {/* N&M Landscaping */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setLandHovered(true)}
                          onMouseLeave={() => setLandHovered(false)}
                        >
                          <div className="font-medium">
                            N&amp;M Landscaping Website
                          </div>
                          <div className="text-sm text-white/70">
                            React/TypeScript, Supabase, Tailwind
                          </div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Booking + admin dashboard with Supabase.</li>
                            <li>Increased clientele by 40%.</li>
                          </ul>

                          <LawnMowerJumbotron
                            hovered={landHovered}
                            href="https://nmlandscapingllc.com/"
                          />
                        </div>

                        <div className="mt-4 flex gap-3">
                          <a
                            href="https://github.com/schonhux/NM-Landscaping-LLC-Website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Repo
                          </a>
                          <a
                            href="https://nmlandscapingllc.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Website
                          </a>
                        </div>
                      </ProjectCard>

                      {/* MathMedic */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setMathHovered(true)}
                          onMouseLeave={() => setMathHovered(false)}
                        >
                          <div className="font-medium">
                            MathMedic | Graphing Calculator
                          </div>
                          <div className="text-sm text-white/70">
                            Flask, Matplotlib, Math Parsing
                          </div>

                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Dynamic math parsing + interactive graphing.</li>
                            <li>Temporary data sessions, future DB planned.</li>
                          </ul>

                          <AdditionOnlyCalc hovered={mathHovered} />
                        </div>

                        <a
                          href="https://github.com/schonhux/MathMedic"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                        >
                          Repo
                        </a>
                      </ProjectCard>

                      {/* Tetris */}
                      <ProjectCard>
                        <div
                          onMouseEnter={() => setTetrisHovered(true)}
                          onMouseLeave={() => setTetrisHovered(false)}
                        >
                          <div className="font-medium">
                            Tetris | Advanced OOP Implementation
                          </div>
                          <div className="text-sm text-white/70">
                            Java, OOP Design
                          </div>

                        
                          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Encapsulation + polymorphism for piece design.</li>
                            <li>Rotation edge cases validated with tests.</li>
                          </ul>

                  
                          <TetrisMini hovered={tetrisHovered} />
                        </div>

                        <a
                          href="https://github.com/schonhux/Tetris-"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                        >
                          Repo
                        </a>
                      </ProjectCard>

                      {/* Latent Space Portfolio */}
                      <ProjectCard>
                        <div>
                          <div className="font-medium">
                            The Latent Space | Personal Portfolio
                          </div>
                          <div className="text-sm text-white/70">
                            Next.js, TypeScript, Tailwind, Vercel
                          </div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>
                              This website. “Latent” symbolizes hidden
                              representations in ML.
                            </li>
                            <li>
                              Built with Next.js + Tailwind, deployed on Vercel.
                            </li>
                          </ul>
                        </div>
                        <a
                          href="https://github.com/schonhux/ml-journal"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                        >
                          Repo
                        </a>
                      </ProjectCard>
                    </motion.div>
                  </div>
                )}

                {/* TECH TAB */}
                {tab === "tech" && (
                  <div>
                    <SkillsGrid />
                  </div>
                )}

                {/* PUBLICATIONS TAB */}
                {tab === "publications" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Publications</h2>
                    <p className="mt-2 text-sm text-white/60">
                      Engineering notes from reliability, infrastructure, and ML
                      systems work. First entries are in progress.
                    </p>

                    <motion.ul
                      variants={staggerList}
                      initial="initial"
                      animate="animate"
                      className="mt-6 space-y-4"
                    >
                      {[
                        {
                          category: "Perspective",
                          title: "What is AI without Machine Learning?",
                          summary:
                            "Separating the hype from the systems: what actually powers modern AI products, and why the fundamentals still decide what works in production.",
                        },
                        {
                          category: "AI Infrastructure",
                          title:
                            "Building AI Platforms in Large-Scale Enterprise Environments",
                          summary:
                            "Reliability, observability, and operational lessons from working on enterprise AI platforms: what it takes to keep intelligent systems dependable at scale.",
                        },
                      ].map((pub) => (
                        <motion.li
                          key={pub.title}
                          variants={staggerItem}
                          className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/20 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-200/80">
                              {pub.category}
                            </span>
                            <span className="rounded-full border border-white/15 bg-black/30 px-2.5 py-0.5 text-[10px] text-white/55">
                              Coming soon
                            </span>
                          </div>
                          <div className="mt-2 font-medium text-white/95">
                            {pub.title}
                          </div>
                          <p className="mt-1.5 text-sm text-white/65 leading-relaxed">
                            {pub.summary}
                          </p>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SocialLinks />
    </>
  );
}
