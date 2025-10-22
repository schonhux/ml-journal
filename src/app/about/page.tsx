export const metadata = { title: "About — Schon Huxley" };

export default function About() {
  return (
    <>
      {/* Dimension-style hero */}
      <section className="relative h-[48vh] min-h-[360px]">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/Background.jpg")' }}
        />
        {/* dark overlay + subtle tiled overlay (uses .bg-overlay we added in globals.css) */}
        <div className="absolute inset-0 bg-black/60 bg-overlay" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/70">
            <span className="text-2xl">◇</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-wide">About</h1>
          <p className="mt-2 max-w-2xl text-white/85">
            A brief intro to who I am and what this research journal is about.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="prose prose-zinc max-w-none">
          <p>
            I’m a Software Engineering student at Iowa State and a 2025 SRE Intern at Berkley
            Technology Services. I work across SRE/DevOps and applied ML—especially calibration,
            real-time inference, and observability.
          </p>
          <p>
            This site is my research journal: concise papers, experiments, and lessons learned from
            building ML systems end-to-end (data → features → models → calibration → evaluation → deployment).
          </p>
          <p>
            Contact: <a href="mailto:schon.huxley@gmail.com">schon.huxley@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
