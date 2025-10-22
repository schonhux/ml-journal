// src/components/DimensionHero.tsx
"use client";

type Tab = "intro" | "experience" | "projects" | "publications";

export default function DimensionHero({
  active,
  onSelect = () => {},
}: {
  active: Tab;
  onSelect?: (t: Tab) => void;
}) {
  const Btn = ({ t, label }: { t: Tab; label: string }) => (
    <button
      onClick={() => onSelect(t)}
      className={[
        "rounded border px-6 py-2 text-sm transition",
        active === t
          ? "bg-white text-black border-white"
          : "text-white border-white/70 hover:bg-white hover:text-black",
      ].join(" ")}
    >
      {label}
    </button>
  );

  return (
    // no background here; transparent hero
    <section className="relative min-h-[68vh] md:min-h-[64vh] isolate">
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 pt-20 pb-10 text-center text-white">
        <div className="mx-auto mb-8 mt-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/70">
          <span className="text-3xl">◇</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-wide">Schon Huxley</h1>

        <div className="mt-4">
          <p className="text-base md:text-lg text-white/90">
            Software Engineer | ML, Infrastructure, Systems
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Btn t="intro" label="Intro" />
          <Btn t="experience" label="Experience" />
          <Btn t="projects" label="Projects" />
          <Btn t="publications" label="Publications" />
        </div>

        <div className="mt-8 text-xs text-white/70">
         
        </div>
      </div>
    </section>
  );
}
