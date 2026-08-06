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
import Aurora from "@/components/Aurora";
import SmoothCursor from "@/components/SmoothCursor";
import SocialLinks from "@/components/SocialLinks";
import SkillsGrid from "@/components/SkillsGrid";

const TAB_ACCENTS: Record<string, string> = {
  intro: "#a78bfa",
  experience: "#22d3ee",
  projects: "#fb923c",
  tech: "#4ade80",
  publications: "#f472b6",
};

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
  accent = "#ffffff",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16, mass: 0.3 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    rx.set((0.5 - py) * 6);
    ry.set((px - 0.5) * 6);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        ["--accent" as string]: accent,
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
      }}
      className={[
        "group rounded-lg border border-white/10 bg-white/5 p-4",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]",
        "hover:border-white/25 hover:bg-white/[0.06]",
        "hover:shadow-[0_14px_40px_rgba(0,0,0,0.4)]",
        "flex flex-col justify-between relative overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* cursor-follow spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), var(--accent), transparent 45%)",
          mixBlendMode: "soft-light",
        }}
      />
      {/* accent glow bleeding from the top-right on hover */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-25"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      {/* accent underline that wipes across the top on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          className="h-full w-full origin-left -translate-x-full transition-transform duration-500 group-hover:translate-x-0"
          style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
        />
      </div>
      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
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
            <linearGradient id="areaPre" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(125,211,252,0.28)" />
              <stop offset="1" stopColor="rgba(125,211,252,0.00)" />
            </linearGradient>
            <linearGradient id="areaPost" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(248,113,113,0.30)" />
              <stop offset="1" stopColor="rgba(248,113,113,0.00)" />
            </linearGradient>
            <filter id="dotGlow" x="-120%" y="-120%" width="340%" height="340%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid */}
          <g opacity="0.12">
            {Array.from({ length: 5 }).map((_, i) => {
              const y = (i * h) / 4;
              return <line key={`gh-${i}`} x1="0" x2={w} y1={y} y2={y} stroke="white" strokeWidth="0.6" />;
            })}
            {Array.from({ length: 6 }).map((_, i) => {
              const x = padX + (i * (w - padX * 2)) / 5;
              return <line key={`gv-${i}`} x1={x} x2={x} y1="0" y2={h - padY} stroke="white" strokeWidth="0.5" />;
            })}
          </g>

          {/* volume bars */}
          <g>
            {pts.map((p, i) => {
              if (i === 0) return null;
              const up = p.v >= pts[i - 1].v;
              const mag = Math.min(1, Math.abs(p.v - pts[i - 1].v) / 3);
              const bh = 3 + mag * 12;
              const past = i > snapIndex;
              return (
                <rect
                  key={`vol-${i}`}
                  x={p.x - 1.4}
                  y={h - padY - bh}
                  width={2.8}
                  height={bh}
                  rx={0.8}
                  fill={past ? "rgba(248,113,113,0.35)" : up ? "rgba(125,211,252,0.35)" : "rgba(148,163,184,0.28)"}
                />
              );
            })}
          </g>

          {/* area fills: pre (cyan) + post (red) */}
          <path
            d={`${prePath} L ${snapPt.x} ${h - padY} L ${padX} ${h - padY} Z`}
            fill="url(#areaPre)"
          />
          <motion.path
            d={`${postPath} L ${pts[n - 1].x} ${h - padY} L ${snapPt.x} ${h - padY} Z`}
            fill="url(#areaPost)"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
          />

          {/* anomaly marker at the event */}
          <line
            x1={snapPt.x}
            x2={snapPt.x}
            y1={padY}
            y2={h - padY}
            stroke="rgba(251,191,36,0.5)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <motion.circle
            cx={snapPt.x}
            cy={snapPt.y}
            r="4"
            fill="none"
            stroke="rgba(251,191,36,0.9)"
            strokeWidth="1.4"
            animate={{ r: hovered ? [4, 9, 4] : 4, opacity: hovered ? [0.9, 0, 0.9] : 0.7 }}
            transition={{ duration: 1.4, repeat: hovered ? Infinity : 0, ease: "easeOut" }}
          />
          <circle cx={snapPt.x} cy={snapPt.y} r="2.4" fill="#fbbf24" />

          {/* pre-event line (cyan) */}
          <motion.path
            d={prePath}
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ opacity: 0.95 }}
          />

          {/* crash segment (red, draws in on hover) */}
          <AnimatePresence>
            {hovered && (
              <motion.path
                d={postPath}
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.95 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* scrubbing dot with glow */}
          <motion.circle
            r="4"
            cx={mvX}
            cy={mvY}
            filter="url(#dotGlow)"
            style={{ fill: ui.t > snapIndex ? "#f87171" : "#7dd3fc", opacity: hovered ? 1 : 0.8 }}
          />
          <motion.circle r="1.6" cx={mvX} cy={mvY} fill="#0a0d1a" style={{ opacity: hovered ? 1 : 0.8 }} />
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
  const guyFrom = 24;
  const guyTo = 212;

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
        animate={{ opacity: hovered ? 0.5 : 0.22, scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      <div className="relative flex items-center justify-between px-3 pt-3">
        <div className="text-xs text-white/80">N&amp;M Landscaping LLC</div>
        <div className="rounded-full border border-emerald-200/20 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
          Live Site
        </div>
      </div>

      <div className="relative px-3 pb-3 pt-2">
        <div className="relative rounded-md border border-white/10 overflow-hidden">
          <svg viewBox="0 0 260 120" className="block h-[112px] w-full" shapeRendering="crispEdges">
            <defs>
              <linearGradient id="nmSky" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#2a4a72" />
                <stop offset="1" stopColor="#6f9fc0" />
              </linearGradient>
            </defs>

            {/* sky + ground */}
            <rect x="0" y="0" width="260" height="82" fill="url(#nmSky)" />
            <rect x="0" y="80" width="260" height="40" fill="#3f9455" />
            <rect x="0" y="80" width="260" height="3" fill="#4fa863" />

            {/* sun with gentle pulse */}
            <motion.g
              initial={false}
              animate={{ scale: hovered ? [1, 1.08, 1] : 1, opacity: hovered ? 1 : 0.9 }}
              transition={{ duration: 3, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
              style={{ transformOrigin: "224px 24px" }}
            >
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * Math.PI) / 4;
                return (
                  <rect
                    key={i}
                    x={224 + Math.cos(a) * 15 - 1.5}
                    y={24 + Math.sin(a) * 15 - 1.5}
                    width="3"
                    height="3"
                    fill="#ffd45e"
                  />
                );
              })}
              <circle cx="224" cy="24" r="9" fill="#ffdf7a" />
            </motion.g>

            {/* clouds */}
            <g fill="#dbe9f2" opacity="0.9">
              <rect x="150" y="20" width="22" height="5" rx="2" />
              <rect x="156" y="16" width="12" height="5" rx="2" />
              <rect x="96" y="34" width="18" height="4" rx="2" />
            </g>

            {/* house */}
            <g>
              <rect x="26" y="50" width="52" height="30" fill="#e6d6ad" />
              <rect x="26" y="50" width="52" height="30" fill="none" stroke="#00000022" strokeWidth="1" />
              <polygon points="20,50 52,28 84,50" fill="#b5533f" />
              <rect x="64" y="34" width="7" height="12" fill="#8a4636" />
              <rect x="46" y="62" width="13" height="18" fill="#7a4a2e" />
              <circle cx="56" cy="71" r="1" fill="#ffdf7a" />
              <rect x="32" y="56" width="10" height="10" fill="#bfe3ff" />
              <rect x="32" y="56" width="10" height="10" fill="none" stroke="#00000022" strokeWidth="1" />
            </g>

            {/* mowed lane that grows behind the mower */}
            <motion.rect
              x={guyFrom}
              y="92"
              height="14"
              fill="#5cbb70"
              initial={false}
              animate={{ width: hovered ? guyTo - guyFrom + 20 : 0 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
            <motion.rect
              x={guyFrom}
              y="95"
              height="2"
              fill="#79cf8a"
              initial={false}
              animate={{ width: hovered ? guyTo - guyFrom + 20 : 0 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />

            {/* the pixel mower + guy */}
            <motion.g
              initial={false}
              animate={{ x: hovered ? guyTo : guyFrom }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            >
              {/* walking bob */}
              <motion.g
                initial={false}
                animate={{ y: hovered ? [0, -1.5, 0] : 0 }}
                transition={{ duration: 0.42, repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
              >
                {/* mower ahead */}
                <rect x="12" y="94" width="16" height="8" fill="#c9ccd1" />
                <rect x="12" y="94" width="16" height="2" fill="#e4e7ea" />
                <line x1="26" y1="96" x2="14" y2="87" stroke="#9aa0a8" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="103" r="2.2" fill="#2b2f36" />
                <circle cx="25" cy="103" r="2.2" fill="#2b2f36" />

                {/* clippings puff */}
                <motion.g
                  initial={false}
                  animate={{ opacity: hovered ? [0.2, 0.7, 0.2] : 0 }}
                  transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
                >
                  <rect x="29" y="96" width="2" height="2" fill="#8fe0a1" />
                  <rect x="31" y="99" width="2" height="2" fill="#8fe0a1" />
                  <rect x="30" y="93" width="2" height="2" fill="#8fe0a1" />
                </motion.g>

                {/* guy */}
                <rect x="0" y="80" width="7" height="2" fill="#3a2a1e" />{/* cap brim */}
                <rect x="1" y="78" width="6" height="3" fill="#e0524d" />{/* cap */}
                <rect x="1" y="81" width="6" height="5" fill="#e8b98f" />{/* head */}
                <rect x="-1" y="86" width="9" height="8" fill="#e0524d" />{/* shirt */}
                <rect x="7" y="88" width="8" height="3" fill="#e8b98f" />{/* arm to handle */}
                <rect x="0" y="94" width="3" height="8" fill="#35507a" />{/* leg */}
                <rect x="4" y="94" width="3" height="8" fill="#2c4467" />{/* leg */}
                <rect x="0" y="102" width="3" height="2" fill="#22201e" />
                <rect x="4" y="102" width="3" height="2" fill="#22201e" />
              </motion.g>
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
              mowing…
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
  const [revealed, setRevealed] = React.useState(0);
  const [typing, setTyping] = React.useState(false);

  React.useEffect(() => {
    if (!hovered) {
      setReps(0);
      setRevealed(0);
      setTyping(false);
      return;
    }
    const timers: number[] = [];
    // reveal each message after a short "typing" beat
    messages.forEach((_, i) => {
      const base = 200 + i * 700;
      timers.push(window.setTimeout(() => setTyping(true), base));
      timers.push(
        window.setTimeout(() => {
          setTyping(false);
          setRevealed(i + 1);
        }, base + 450)
      );
    });
    // start rep counter once the convo lands
    const repStart = 200 + messages.length * 700;
    const id = window.setTimeout(() => {
      const iv = window.setInterval(() => {
        setReps((r) => {
          if (r >= 12) {
            window.clearInterval(iv);
            return 12;
          }
          return r + 1;
        });
      }, 130);
      timers.push(iv);
    }, repStart);
    timers.push(id);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hovered, messages]);

  const R = 15;
  const C = 2 * Math.PI * R;

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

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.7 }}
          className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
        >
          WebSocket
        </motion.div>
      </div>

      {/* phone frame */}
      <div className="relative mt-3 mx-auto w-full max-w-[220px] rounded-xl border border-white/15 bg-black/45 p-2.5 pb-3">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20" />

        {/* chat area */}
        <div className="space-y-1.5 min-h-[96px]">
          {messages.map((m, i) => (
            <AnimatePresence key={i}>
              {revealed > i && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className={[
                    "max-w-[80%] rounded-2xl px-2.5 py-1.5 text-[11px] leading-snug",
                    m.from === "me"
                      ? "ml-auto bg-purple-300/25 text-white/90 border border-purple-200/20 rounded-br-sm"
                      : "bg-white/10 text-white/80 border border-white/10 rounded-bl-sm",
                  ].join(" ")}
                >
                  {m.text}
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* typing indicator */}
          <AnimatePresence>
            {typing && revealed < messages.length && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className={[
                  "flex w-fit items-center gap-1 rounded-2xl px-2.5 py-2",
                  messages[revealed]?.from === "me"
                    ? "ml-auto bg-purple-300/20 rounded-br-sm"
                    : "bg-white/10 rounded-bl-sm",
                ].join(" ")}
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/60"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* workout log with rep ring */}
        <div className="mt-2.5 rounded-md border border-white/10 bg-black/40 px-2.5 py-2 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-white/85 font-medium">Back Squat</div>
            <div className="text-[9px] text-white/45">set 3 of 4</div>
          </div>
          <div className="relative h-10 w-10">
            <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
              <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
              <motion.circle
                cx="20"
                cy="20"
                r={R}
                fill="none"
                stroke="#c084fc"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={C}
                initial={false}
                animate={{ strokeDashoffset: C - (reps / 12) * C }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white/90 tabular-nums">
              {reps}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">Spring Boot backend</span>
        <motion.span
          initial={false}
          animate={{ opacity: reps >= 12 ? 1 : 0, y: reps >= 12 ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="text-white/75"
        >
          set logged, synced
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

  const [isu, setIsu] = React.useState(74);
  const [ku, setKu] = React.useState(75);
  const [revealed, setRevealed] = React.useState(0);
  const [likes, setLikes] = React.useState(128);

  React.useEffect(() => {
    if (!hovered) {
      setIsu(74);
      setKu(75);
      setRevealed(0);
      setLikes(128);
      return;
    }
    const timers: number[] = [];
    // roll the score up
    timers.push(window.setTimeout(() => setKu(78), 400));
    timers.push(window.setTimeout(() => setIsu(78), 900));
    timers.push(window.setTimeout(() => setIsu(81), 1500));
    // stream posts in
    posts.forEach((_, i) =>
      timers.push(window.setTimeout(() => setRevealed(i + 1), 500 + i * 550))
    );
    // likes tick up
    const iv = window.setInterval(() => setLikes((l) => l + Math.floor(Math.random() * 4) + 1), 300);
    timers.push(iv);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hovered, posts]);

  const RollNum = ({ n }: { n: number }) => (
    <span className="relative inline-block w-[2ch] overflow-hidden text-right align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={n}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block tabular-nums"
        >
          {n}
        </motion.span>
      </AnimatePresence>
    </span>
  );

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
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/70"
        >
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-red-400"
            animate={{ opacity: hovered ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 1.2, repeat: hovered ? Infinity : 0 }}
          />
          LIVE
        </motion.div>
      </div>

      {/* score ticker */}
      <div className="relative mt-2 rounded-md border border-white/10 bg-black/40 px-2.5 py-1.5 flex items-center justify-between">
        <span className="text-[11px] text-white/90 font-medium">
          ISU <RollNum n={isu} /> <span className="text-white/40">-</span> <RollNum n={ku} /> KU
        </span>
        <span className="text-[10px] text-white/55 tabular-nums">
          {hovered ? "00:24 Q4" : "03:11 Q4"}
        </span>
      </div>

      {/* thread */}
      <div className="relative mt-2 space-y-1.5 min-h-[92px]">
        {posts.map((p, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className="flex items-start gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
              >
                <span className="text-[10px] text-sky-200/80 shrink-0">{p.user}</span>
                <span className="text-[11px] text-white/80 leading-snug">{p.text}</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="relative mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
        <span className="text-white/55">fan chatter, live</span>
        <motion.span
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.16 }}
          className="flex items-center gap-1 text-sky-200/80 tabular-nums"
        >
          <span className="text-rose-300">♥</span> {likes}
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

  // step: 0 idle, 1 paged, 2 metrics, 3 logs, 4 traces + root cause, 5 approval
  const [step, setStep] = React.useState(0);
  const confidence = [8, 22, 44, 66, 90, 94][Math.min(step, 5)];

  React.useEffect(() => {
    if (!hovered) {
      setStep(0);
      return;
    }
    const timers = [
      window.setTimeout(() => setStep(1), 150),
      window.setTimeout(() => setStep(2), 650),
      window.setTimeout(() => setStep(3), 1100),
      window.setTimeout(() => setStep(4), 1650),
      window.setTimeout(() => setStep(5), 2250),
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

      {/* tool nodes with a pulse traveling the trace line */}
      <div className="relative mt-3">
        {/* connecting line + traveling pulse */}
        <div className="absolute left-[16.6%] right-[16.6%] top-[13px] h-px bg-white/10" />
        {step >= 2 && step <= 4 && (
          <motion.div
            className="absolute top-[10px] h-1.5 w-1.5 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(253,164,175,0.9)]"
            initial={{ left: "16.6%" }}
            animate={{ left: ["16.6%", "50%", "83.4%"] }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
          />
        )}

        <div className="relative grid grid-cols-3 gap-2">
          {nodes.map((n, i) => {
            const active = step === i + 2;
            const done = step > i + 2;
            return (
              <motion.div
                key={n.key}
                initial={false}
                animate={{
                  borderColor: active
                    ? "rgba(253,164,175,0.6)"
                    : done
                    ? "rgba(163,230,53,0.4)"
                    : "rgba(255,255,255,0.1)",
                  backgroundColor: active ? "rgba(253,164,175,0.10)" : "rgba(255,255,255,0.04)",
                }}
                transition={{ duration: 0.25 }}
                className="rounded-md border px-2 py-1.5 text-center text-[10px] text-white/75"
              >
                <span className="inline-flex items-center gap-1">
                  {done && <span className="text-lime-300">✓</span>}
                  {n.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* confidence meter */}
      <div className="relative mt-3">
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span>diagnosis confidence</span>
          <motion.span
            key={confidence}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="tabular-nums text-white/75"
          >
            {confidence}%
          </motion.span>
        </div>
        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-rose-400/70 to-lime-300/70"
            initial={false}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* root cause */}
      <motion.div
        initial={false}
        animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 6 }}
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
          animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 6 }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] text-white/75"
        >
          fix · pending approval
        </motion.span>
      </div>
    </div>
  );
}

function PixelWrestler({ singlet, trunks = "#2f2f33" }: { singlet: string; trunks?: string }) {
  const skin = "#e8b98f";
  return (
    <g shapeRendering="crispEdges">
      {/* shadow */}
      <ellipse cx="0" cy="1" rx="9" ry="2" fill="rgba(0,0,0,0.28)" />
      {/* hair + head */}
      <rect x="-3" y="-31" width="6" height="2" fill="#2b2b2b" />
      <rect x="-3" y="-29" width="6" height="6" fill={skin} />
      {/* torso singlet */}
      <rect x="-4" y="-23" width="8" height="11" fill={singlet} />
      <rect x="-4" y="-23" width="2" height="7" fill="rgba(0,0,0,0.15)" />
      {/* arms */}
      <rect x="-7" y="-22" width="3" height="8" fill={skin} />
      <rect x="4" y="-21" width="8" height="3" fill={skin} />
      {/* trunks */}
      <rect x="-4" y="-12" width="8" height="3" fill={trunks} />
      {/* legs */}
      <rect x="-4" y="-9" width="3" height="7" fill={skin} />
      <rect x="1" y="-9" width="3" height="7" fill={skin} />
      {/* shoes */}
      <rect x="-4" y="-2" width="3" height="2" fill="#22201e" />
      <rect x="1" y="-2" width="3" height="2" fill="#22201e" />
    </g>
  );
}

function MatVisionScene({ hovered }: { hovered: boolean }) {
  const events = useMemo(
    () => [
      { t: 24, label: "Shot", color: "#7dd3fc" },
      { t: 50, label: "TD", color: "#fb923c" },
      { t: 80, label: "Esc", color: "#a3e635" },
    ],
    []
  );

  // step drives the reveal: which events are detected + stat tallies
  const [shown, setShown] = React.useState(0);
  const [flash, setFlash] = React.useState<string | null>(null);
  const stats = useMemo(
    () => ({ shots: shown >= 1 ? 1 : 0, td: shown >= 2 ? 1 : 0, esc: shown >= 3 ? 1 : 0 }),
    [shown]
  );

  React.useEffect(() => {
    if (!hovered) {
      setShown(0);
      setFlash(null);
      return;
    }
    const fire = (n: number, label: string, at: number) => [
      window.setTimeout(() => {
        setShown(n);
        setFlash(label);
      }, at),
      window.setTimeout(() => setFlash(null), at + 700),
    ];
    const timers = [
      ...fire(1, "Shot detected", 500),
      ...fire(2, "Takedown", 1150),
      ...fire(3, "Escape", 1800),
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
          {/* mat */}
          <rect x="0" y="0" width="260" height="96" fill="#132a3a" />
          <circle cx="130" cy="60" r="42" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
          <circle cx="130" cy="60" r="24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
          <line x1="12" y1="80" x2="248" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* wrestler A (cyan), attacker */}
          <motion.g
            style={{ transformOrigin: "120px 80px" }}
            initial={false}
            animate={{
              x: hovered ? [0, 6, 12, 12, 2, 0] : 0,
              y: hovered ? [0, 1, 6, 8, 2, 0] : 0,
              rotate: hovered ? [0, 4, 12, 14, 4, 0] : 0,
            }}
            transition={{ duration: 3.2, times: [0, 0.22, 0.42, 0.62, 0.8, 1], repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <g transform="translate(120,80)">
              <PixelWrestler singlet="#38bdf8" />
            </g>
          </motion.g>

          {/* wrestler B (orange), defender, faces left */}
          <motion.g
            style={{ transformOrigin: "140px 80px" }}
            initial={false}
            animate={{
              x: hovered ? [0, -4, -8, -10, -3, 0] : 0,
              y: hovered ? [0, 0, 2, 12, 3, 0] : 0,
              rotate: hovered ? [0, -3, -8, -32, -8, 0] : 0,
            }}
            transition={{ duration: 3.2, times: [0, 0.22, 0.42, 0.62, 0.8, 1], repeat: hovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <g transform="translate(140,80) scale(-1,1)">
              <PixelWrestler singlet="#fb923c" />
            </g>
          </motion.g>
        </svg>

        {/* event detected flash chip */}
        <AnimatePresence>
          {flash && (
            <motion.div
              key={flash}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 top-2 -translate-x-1/2 rounded-full border border-orange-200/40 bg-black/70 px-2.5 py-0.5 text-[10px] text-orange-100/90 backdrop-blur-sm"
            >
              {flash}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* event track */}
      <div className="relative mt-3">
        <div className="relative h-1.5 rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-300/50 via-orange-300/60 to-lime-300/50"
            initial={false}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 1.9, ease: "linear" }}
          />
          {events.map((e, i) => (
            <motion.span
              key={e.label}
              className="absolute -top-[3px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-black/60"
              style={{ left: `${e.t}%`, background: e.color }}
              initial={false}
              animate={{
                opacity: shown > i ? 1 : 0.25,
                scale: shown > i ? [0.4, 1.4, 1] : 0.6,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-white/40">
          <span>0:00</span>
          <span>full match</span>
        </div>
      </div>

      {/* stat tally */}
      <div className="relative mt-2 grid grid-cols-3 gap-2">
        {[
          { k: "Shots", v: stats.shots, c: "#7dd3fc" },
          { k: "Takedowns", v: stats.td, c: "#fb923c" },
          { k: "Escapes", v: stats.esc, c: "#a3e635" },
        ].map((s) => (
          <div key={s.k} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-center">
            <div className="text-sm font-semibold tabular-nums" style={{ color: s.c }}>
              {s.v}
            </div>
            <div className="text-[9px] text-white/50">{s.k}</div>
          </div>
        ))}
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

  const accent = TAB_ACCENTS[tab] ?? "#a78bfa";
  const [dir, setDir] = useState(1);

  /* select tab + keep URL hash shareable */
  const selectTab = React.useCallback(
    (id: Tab) => {
      setTab((prev) => {
        setDir(TAB_IDS.indexOf(id) >= TAB_IDS.indexOf(prev) ? 1 : -1);
        return id;
      });
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${id}`);
      }
    },
    [TAB_IDS]
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
    <div className="accent-root" style={{ ["--accent" as string]: accent }}>
      <SmoothCursor />
      <FixedBg />
      <Aurora />
      <ParticleField />

      <DimensionHero active={tab} onSelect={selectTab} accent={accent} />

      <section className="relative z-10 text-white -mt-6 md:-mt-10">
        <div className="mx-auto max-w-4xl px-5 py-10 md:py-12">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={tab}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 44, filter: "blur(8px)" }),
                center: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
                },
                exit: (d: number) => ({
                  opacity: 0,
                  x: -d * 44,
                  filter: "blur(8px)",
                  transition: { duration: 0.24, ease: "easeIn" },
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
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
                      <ProjectCard accent="#fb923c">
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
                      <ProjectCard accent="#fb7185">
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
                      <ProjectCard accent="#34d399">
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
                      <ProjectCard accent="#fbbf24">
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
                      <ProjectCard accent="#c084fc">
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
                      <ProjectCard accent="#38bdf8">
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
                      <ProjectCard accent="#4ade80">
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
                      <ProjectCard accent="#2dd4bf">
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
                      <ProjectCard accent="#818cf8">
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
                      <ProjectCard accent="#a78bfa">
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
    </div>
  );
}
