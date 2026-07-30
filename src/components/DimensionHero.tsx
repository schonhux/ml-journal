"use client";

import { Bot } from "lucide-react";
import { motion } from "framer-motion";

type SectionId = "intro" | "experience" | "projects" | "tech" | "publications";

type DimensionHeroProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

const TABS: { id: SectionId; label: string }[] = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech Stack" },
  { id: "publications", label: "Publications" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DimensionHero({ active, onSelect }: DimensionHeroProps) {
  return (
    <section className="relative min-h-[68vh] md:min-h-[64vh] isolate">
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 pt-20 pb-10 text-center text-white">
        {/* Robot Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto mb-8 mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/[0.03] backdrop-blur-[2px]"
        >
          <Bot
            size={48}
            className="text-white/90 hover:text-white transition-transform duration-300 hover:scale-110 animate-pulse"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="text-5xl md:text-6xl font-semibold tracking-wide"
        >
          Schon Huxley
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
          className="mt-4"
        >
          <p className="text-base md:text-lg text-white/90">
            Software Engineer | ML, Infrastructure, Systems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          role="tablist"
          aria-label="Portfolio sections"
        >
          {TABS.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(t.id)}
                className={[
                  "relative rounded border px-6 py-2 text-sm transition-colors",
                  isActive
                    ? "border-white"
                    : "border-white/70 hover:border-white hover:bg-white/10",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="hero-tab-pill"
                    className="absolute inset-0 rounded bg-white shadow-[0_2px_18px_rgba(255,255,255,0.25)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className={[
                    "relative z-10 transition-colors duration-200",
                    isActive ? "text-black font-medium" : "text-white",
                  ].join(" ")}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
