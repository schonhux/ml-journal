"use client";

import { Bot, User, Briefcase, FolderGit2, Cpu, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

type SectionId = "intro" | "experience" | "projects" | "tech" | "publications";

type DimensionHeroProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  accent: string;
};

const TABS: { id: SectionId; label: string; Icon: typeof User }[] = [
  { id: "intro", label: "Intro", Icon: User },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: FolderGit2 },
  { id: "tech", label: "Tech Stack", Icon: Cpu },
  { id: "publications", label: "Publications", Icon: BookOpen },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DimensionHero({ active, onSelect, accent }: DimensionHeroProps) {
  return (
    <section className="relative min-h-[68vh] md:min-h-[64vh] isolate">
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 pt-20 pb-10 text-center text-white">
        {/* Robot Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto mb-8 mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/[0.03] backdrop-blur-[2px]"
          style={{ boxShadow: `0 0 44px ${accent}22` }}
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
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
          role="tablist"
          aria-label="Portfolio sections"
        >
          {TABS.map((t) => {
            const isActive = active === t.id;
            const Icon = t.Icon;
            return (
              <Magnetic key={t.id} strength={0.3}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelect(t.id)}
                  className={[
                    "relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-colors",
                    isActive ? "text-white" : "text-white/60 hover:text-white",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="hero-tab-pill"
                      className="absolute inset-0 rounded-xl border"
                      style={{
                        background: `${accent}22`,
                        borderColor: `${accent}66`,
                        boxShadow: `0 0 22px ${accent}44`,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon size={15} className="relative z-10" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              </Magnetic>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
