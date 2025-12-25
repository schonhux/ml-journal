"use client";

import { Bot } from "lucide-react";

type SectionId = "intro" | "experience" | "projects" | "publications";

type DimensionHeroProps = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
};

export default function DimensionHero({
  active,
  onSelect,
}: DimensionHeroProps) {
  const Btn = ({ id, label }: { id: SectionId; label: string }) => (
    <button
      onClick={() => onSelect(id)}
      className={[
        "rounded border px-6 py-2 text-sm transition",
        "text-white border-white/70 hover:bg-white hover:text-black",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    <section className="relative min-h-[68vh] md:min-h-[64vh] isolate">
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 pt-20 pb-10 text-center text-white">
        {/* Robot Icon */}
        <div className="mx-auto mb-8 mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/70">
          <Bot
            size={48}
            className="text-white/90 hover:text-white transition-transform duration-300 hover:scale-110 animate-pulse"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-wide">
          Schon Huxley
        </h1>

        <div className="mt-4">
          <p className="text-base md:text-lg text-white/90">
            Software Engineer | ML, Infrastructure, Systems
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Btn id="intro" label="Intro" />
          <Btn id="experience" label="Experience" />
          <Btn id="projects" label="Projects" />
          <Btn id="publications" label="Publications" />
        </div>
      </div>
    </section>
  );
}
