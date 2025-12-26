"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import DimensionHero from "@/components/DimensionHero";
import FixedBg from "@/components/FixedBg";
import SocialLinks from "@/components/SocialLinks";
import SkillsGrid from "@/components/SkillsGrid";

type Tab = "intro" | "experience" | "projects" | "tech" | "publications";

/** Small helper for consistent project card behavior */
function ProjectCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={[
        "group rounded-lg border border-white/10 bg-white/5 p-4",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]",
        "hover:border-white/20 hover:bg-white/[0.06]",
        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
        "flex flex-col justify-between",
        "relative overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* subtle top glow */}
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
      awayScore: 89,
      homeScore: 89,
      clock: "01:42",
      period: "Q4",
      market: hovered ? "-140" : "-120",
      model: hovered ? "+120" : "+100",
      note: hovered ? "Turnover → line moves" : "Live pricing",
    }),
    [hovered]
  );

  return (
    <div className="mt-3 relative rounded-md border border-white/10 bg-black/25 p-3 overflow-hidden">
      {/* ambient glow (absolute => no layout changes) */}
      <motion.div
        className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-white/10 via-transparent to-transparent blur-2xl"
        initial={false}
        animate={{ opacity: hovered ? 0.5 : 0.18, scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      {/* header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-xs text-white/70">Live Sportsbook</div>

          {/* DraftKings logo */}
          <Image
            src="/logos/draftkings.svg"
            alt="DraftKings"
            width={90}
            height={16}
            className="h-4 w-auto opacity-70"
            draggable={false}
            unoptimized
          />
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
        className="relative mt-2 rounded-md border border-white/10 bg-black/40 p-2.5"
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0.92,
          boxShadow: hovered
            ? "0 0 0 1px rgba(255,255,255,0.10) inset"
            : "0 0 0 1px rgba(255,255,255,0.06) inset",
        }}
        transition={{ duration: 0.18 }}
      >
        {/* flicker overlay (absolute => no layout changes) */}
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
            <span className="text-white/40">—</span> {game.home} {game.homeScore}
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

  // Trend up → event → sharp drop → stabilize (stock-app vibe)
  const series = useMemo(
    () => [
      184.2, 184.9, 185.4, 186.1, 187.0, 188.2, 189.7, 191.4, 193.0, 194.6,
      196.2, 197.9, 199.4, 200.6, 201.3, 202.2, 201.8,
      // event + drop
      195.2, 193.4, 194.1, 194.8, 195.0,
    ],
    []
  );

  const min = Math.min(...series);
  const max = Math.max(...series);

  const pts = series.map((v, i) => {
    const x = padX + (i * (w - padX * 2)) / Math.max(1, series.length - 1);
    const t = (v - min) / Math.max(1e-6, max - min);
    const y = padY + (1 - t) * (h - padY * 2);
    return { x, y, v };
  });

  const snapIndex = 16; // where event happens (right before drop)
  const snapPt = pts[snapIndex];

  const postEventPts = pts.slice(snapIndex);
  const crashLow = postEventPts.reduce(
    (best, p) => (p.v < best.v ? p : best),
    postEventPts[0]
  );

  // Show event price by default; on hover show crash low (cursor moved into drop)
  const priceNow = hovered ? crashLow.v : snapPt.v;

  const start = pts[0].v;
  const change = priceNow - start;
  const changePct = (change / start) * 100;

  const prePath = pts
    .slice(0, snapIndex + 1)
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const postPath = pts
    .slice(snapIndex)
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const fullLinePath = pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const areaPath = `${fullLinePath} L ${w - padX} ${h - padY} L ${padX} ${h - padY} Z`;
  const crossX = hovered ? crashLow.x : snapPt.x;

  return (
    <div className="mt-3 rounded-md border border-white/15 bg-white/5 p-3 relative overflow-hidden">
      {/* top row */}
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

      {/* price row */}
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
      <div className="mt-3 relative">
        {/* crosshair line */}
        <motion.div
          className="pointer-events-none absolute top-0 bottom-[18px] w-px bg-white/20"
          style={{ left: `${(crossX / w) * 100}%` }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.16 }}
        />

        {/* crosshair label */}
        <motion.div
          className="pointer-events-none absolute -top-2"
          style={{ left: `calc(${(crossX / w) * 100}% - 22px)` }}
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.16 }}
        >
          <div className="rounded-md border border-white/15 bg-black/60 px-2 py-1 text-[10px] text-white/80 tabular-nums">
            {hovered ? "crash" : "event"}
          </div>
        </motion.div>

        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="block">
          <defs>
            <linearGradient id="areaFadeStocks" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
            </linearGradient>
          </defs>

          {/* subtle horizontal grid */}
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
            transition={{ duration: 0.16 }}
          />

          {/* crash segment animates in on hover */}
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

          {/* marker dot */}
          <motion.circle
            cx={hovered ? crashLow.x : snapPt.x}
            cy={hovered ? crashLow.y : snapPt.y}
            r="3.5"
            fill="white"
            initial={false}
            animate={{ r: hovered ? 4.4 : 3.5, opacity: hovered ? 1 : 0.75 }}
            transition={{ duration: 0.16 }}
          />
        </svg>

        {/* bottom row */}
        <div className="mt-2 min-h-[16px] text-[11px] text-white/60 flex items-center justify-between">
          <span className="text-white/55">market view</span>
          <motion.span
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.16 }}
            className="text-white/75"
          >
            {hovered ? "sell pressure → liquidity gap" : "anomaly spike detected"}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function LawnMowerJumbotron({ hovered, href }: { hovered: boolean; href: string }) {
  const W = 520;
  const H = 160;

  // mower moves left -> right, slower
  const mowerX = hovered ? 360 : 120;
  const mowWidth = hovered ? 330 : 40;

  // mower geometry pairing so the mow strip stays centered under the deck
  const mowerGroupBaseY = 92;
  const deckCenterY = mowerGroupBaseY + 34;
  const mowStripH = 46;
  const mowStripY = Math.round(deckCenterY - mowStripH / 2);

  // strip starts cleanly away from the house area
  const stripX = 120;

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
          <div className="text-xs text-white/80">N&amp;M Landscaping</div>
          <div className="mt-0.5 text-[11px] text-white/55">
            hover to mow • click to open
          </div>
        </div>

        <div className="rounded-full border border-emerald-200/20 bg-black/30 px-2.5 py-1 text-[10px] text-white/70">
          Live Site
        </div>
      </div>

      <div className="relative px-3 pb-3 pt-2">
        <div className="relative rounded-md border border-white/10 bg-black/25 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-[110px] w-full">
            <defs>
              <linearGradient id="nmLawnAll" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="rgba(16,185,129,0.44)" />
                <stop offset="1" stopColor="rgba(16,185,129,0.18)" />
              </linearGradient>

              <pattern
                id="nmStripesAll"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(18)"
              >
                <rect width="14" height="14" fill="rgba(0,0,0,0)" />
                <rect width="3" height="14" x="0" fill="rgba(255,255,255,0.05)" />
              </pattern>

              <pattern id="nmMowed" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="rgba(255,255,255,0)" />
                <rect width="10" height="2" y="0" fill="rgba(255,255,255,0.06)" />
              </pattern>

              <filter id="nmSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="2"
                  floodColor="rgba(0,0,0,0.45)"
                />
              </filter>
            </defs>

            {/* grass */}
            <rect x="0" y="0" width={W} height={H} fill="url(#nmLawnAll)" />
            <rect x="0" y="0" width={W} height={H} fill="url(#nmStripesAll)" opacity="0.9" />

            {/* mowed strip */}
            <motion.rect
              x={stripX}
              y={mowStripY}
              height={mowStripH}
              rx="12"
              fill="rgba(0,0,0,0.12)"
              initial={false}
              animate={{ width: mowWidth, opacity: hovered ? 0.92 : 0.45 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />
            <motion.rect
              x={stripX}
              y={mowStripY}
              height={mowStripH}
              rx="12"
              fill="url(#nmMowed)"
              initial={false}
              animate={{ width: mowWidth, opacity: hovered ? 0.55 : 0.18 }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            />

            {/* house */}
            <g filter="url(#nmSoftShadow)" transform="translate(22,22)">
              <path
                d="
                  M 10 44
                  L 46 16
                  L 82 44
                  L 82 86
                  Q 82 94 74 94
                  L 18 94
                  Q 10 94 10 86
                  Z
                "
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
                d="
                  M 42 94
                  L 42 70
                  Q 42 64 48 64
                  L 52 64
                  Q 58 64 58 70
                  L 58 94
                "
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

            {/* mower */}
            <motion.g
              initial={false}
              animate={{ x: mowerX }}
              transition={{ duration: 1.35, ease: "easeInOut" }}
            >
              <g transform="translate(70,92)">
                {/* handle */}
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

                {/* deck */}
                <path
                  d="M18 26
                     C20 18, 34 14, 48 18
                     C58 21, 60 34, 54 40
                     C48 46, 26 46, 18 40
                     C14 36, 14 31, 18 26 Z"
                  fill="rgba(255,255,255,0.14)"
                  stroke="rgba(255,255,255,0.34)"
                  strokeWidth="2"
                />

                {/* engine */}
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

                {/* wheels */}
                <circle cx="26" cy="44" r="6.2" fill="rgba(255,255,255,0.86)" />
                <circle cx="52" cy="44" r="6.2" fill="rgba(255,255,255,0.86)" />
                <circle cx="26" cy="44" r="2.2" fill="rgba(0,0,0,0.25)" />
                <circle cx="52" cy="44" r="2.2" fill="rgba(0,0,0,0.25)" />

                {/* clippings */}
                <motion.g
                  initial={false}
                  animate={{ opacity: hovered ? 0.65 : 0 }}
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
          <div className="mt-0.5 text-[11px] text-white/60">
            
          </div>
        </div>

        <div className="shrink-0 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] text-white/75">
         
        </div>
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






export default function Home() {
  const [tab, setTab] = useState<Tab>("intro");
  const [sportsHovered, setSportsHovered] = useState(false);
  const [insiderHovered, setInsiderHovered] = useState(false);
  const [landHovered, setLandHovered] = useState(false);
  const [mathHovered, setMathHovered] = useState(false);
  const [tetrisHovered, setTetrisHovered] = useState(false);



  return (
    <>
      <FixedBg />
      {/* ✅ removed "as any" to stop build failure */}
      <DimensionHero active={tab} onSelect={setTab} />

      <section className="relative z-10 text-white -mt-6 md:-mt-10">
        <div className="mx-auto max-w-4xl px-5 py-10 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
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
                      I’m an early-career Software Engineer and student at Iowa
                      State University with a strong focus on Infrastructure,
                      Systems Reliability, and applied Machine Learning. I’m
                      passionate about building projects that bridge technical
                      depth with real-world impact — from designing full-stack
                      web applications to experimenting with machine learning
                      pipelines and applied AI systems. Outside of engineering,
                      you can find me in the gym lifting or hooping on the
                      courts. I always enjoy hanging with my friends and keeping
                      myself busy. I bring a different perspective to the field,
                      one built on discipline, curiosity, and leadership. I’m on
                      a path to excellence — the never-ending journey of
                      self-improvement.
                    </p>
                  </div>
                )}

                {/* EXPERIENCE TAB */}
                {tab === "experience" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Experience</h2>

                    <ul className="mt-6 space-y-5">
                      <li className="rounded-xl border border-white/10 bg-white/5 p-6">
                        <div className="font-semibold text-lg">
                          Berkley Technology Services — Site Reliability Engineer
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-white/70 font-medium">
                            Co-Op • Aug 2025 – Present
                          </div>
                          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
                            <li>
                              Partnered with InfoSec, PIM, and Database teams on
                              Client Search pilots (ACS), collaborating to tune
                              noisy monitoring alerts—improving signal quality
                              and trust in observability.
                            </li>
                            <li>
                              Automated an AppDynamics reporting workflow for
                              ACS by scripting scheduled exports and table
                              refreshes (previously manual) using a shell script
                              + Windows Task Scheduler on a shared SolarWinds
                              main poller, saving every Monday morning with
                              failure notifications.
                            </li>
                            <li>
                              Participated in PI Planning across BTS to review
                              team progress, dependencies, backlog, and risks;
                              presented updates on behalf of the team—building a
                              stronger understanding of cross-team delivery and
                              how the business operates on the technical side.
                            </li>
                          </ul>
                        </div>

                        <div className="mt-5 pt-5 border-t border-white/10">
                          <div className="text-sm text-white/70 font-medium">
                            Intern • May 2025 – Aug 2025
                          </div>
                          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
                            <li>
                              Designed and automated secure credential workflows
                              by integrating PowerShell, SQL, and REST APIs with
                              AD, Delinea, and SolarWinds—reducing repetitive
                              toil.
                            </li>
                            <li>
                              Built Ansible playbooks to standardize system
                              configurations across teams, preventing drift and
                              enabling consistent deployments.
                            </li>
                            <li>
                              Facilitated weekly stakeholder syncs to align
                              engineers, managers, and partners—accelerating
                              delivery and knowledge sharing.
                            </li>
                            <li>
                              Grew hands-on in observability, CI/CD, and infra
                              automation; balanced compliance with usability to
                              drive adoption.
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="rounded-xl border border-white/10 bg-white/5 p-6">
                        <div className="font-semibold text-lg">
                          Freelance Web Developer — Self-Employed
                        </div>
                        <div className="text-sm text-white/70 font-medium mt-1">
                          2024 – Present
                        </div>

                        <div className="mt-4">
                          <div className="text-sm text-white/80 font-semibold">
                            DT Group LLC — Web Revamp & SEO Optimization
                          </div>
                          <div className="text-xs text-white/60 mt-0.5">
                            Nov 2025 - Dec 2025
                          </div>
                          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
                            <li>
                              Led a site revamp and performed heavy SEO cleanup
                              (technical + on-page), improving site structure,
                              metadata, and search readiness for a larger client.
                            </li>
                            <li>
                              Streamlined content organization and navigation to
                              improve discoverability and user flow while keeping
                              performance and responsiveness tight.
                            </li>
                          </ul>
                        </div>

                        <div className="mt-5 pt-5 border-t border-white/10">
                          <div className="text-sm text-white/80 font-semibold">
                            N&amp;M Landscaping LLC — Website
                          </div>
                          <div className="text-xs text-white/60 mt-0.5">
                            Feb 2025 - Mar 2025
                          </div>
                          <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-2">
                            <li>
                              Designed, built, and deployed the company website
                              using Next.js/TypeScript, Tailwind, and Supabase;
                              hosted on Vercel.
                            </li>
                            <li>
                              Shipped end-to-end: content structure, responsive
                              UI, SEO/analytics, and contact/booking flows to
                              improve lead conversion and site performance.
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                {/* PROJECTS TAB */}
                {tab === "projects" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Projects</h2>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                            InsiderEdge — Insider Trading ML Platform
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
                            href="https://youtu.be/YOUR_IMOVIE_LINK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black transition-colors"
                          >
                            Demo
                          </a>
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
    <div className="font-medium">MathMedic — Graphing Calculator</div>
    <div className="text-sm text-white/70">Flask, Matplotlib, Math Parsing</div>

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
    <div className="font-medium">Tetris — Advanced OOP Implementation</div>
    <div className="text-sm text-white/70">Java, OOP Design</div>

    {/* the square mini tetris visual */}
    <TetrisMini hovered={tetrisHovered} />

    <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-1">
      <li>Encapsulation + polymorphism for piece design.</li>
      <li>Rotation edge cases validated with tests.</li>
    </ul>
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
                            The Latent Space — Personal Portfolio
                          </div>
                          <div className="text-sm text-white/70">
                            Next.js, TypeScript, Tailwind, Vercel
                          </div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>
                              This website — “latent” symbolizing hidden
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
                    </div>
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
                  <div className="prose prose-invert prose-zinc max-w-none">
                    <h2>Publications</h2>
                    <p>
                      Coming soon: MDX write-ups with math and code. First up —
                      calibrated probabilities in LightGBM for real-time sports
                      inference, and a deep dive on the distinctions between
                      Artificial Intelligence and Machine Learning.
                    </p>
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
