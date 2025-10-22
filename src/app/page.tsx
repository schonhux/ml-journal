"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DimensionHero from "@/components/DimensionHero";
import FixedBg from "@/components/FixedBg";
import SocialLinks from "@/components/SocialLinks";

type Tab = "intro" | "experience" | "projects" | "publications";

export default function Home() {
  const [tab, setTab] = useState<Tab>("intro");

  return (
    <>
      {/* Shared fixed background */}
      <FixedBg />

      {/* Hero */}
      <DimensionHero active={tab} onSelect={setTab} />

      {/* Panels overlay */}
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
    {/* Profile Image */}
    <div className="flex justify-center mb-6 mt-2">
      <img
        src="/images/IMG_3919.PNG"
        alt="Schon Huxley"
        className="w-28 h-28 rounded-full border border-white/30 shadow-lg object-cover"
      />
    </div>

    {/* Intro Heading */}
    <h1 className="text-2xl md:text-3xl font-semibold mb-4">
      ~ Welcome To My Research Journal Portfolio ~
    </h1>

    {/* Paragraphs */}
    <p className="leading-relaxed text-white/90">
      I’m Schon Huxley, a junior software engineering student at Iowa State University
      with a strong focus on applied machine learning, full-stack development, and systems
      reliability. I’m passionate about building projects that merge technical depth with
      real-world impact — from designing full-stack web applications to experimenting with
      machine learning pipelines and applied AI systems.
    </p>

    <p className="mt-4 leading-relaxed text-white/90">
      This site serves as both my personal portfolio and research journal — a space to
      showcase the projects I build, the problems I solve, and the ideas that drive me forward.
      As I continue exploring ML and AI applications, I’ll be releasing detailed writeups that
      highlight my experiments, insights, and findings. My goal is to share not only what I build,
      but also the thought process and curiosity that fuel my growth as an engineer.
    </p>

    <p className="mt-4 leading-relaxed text-white/90">
      Outside of engineering, I stay grounded through lifting, wrestling, basketball, and time
      spent with friends — balance that keeps me sharp and focused. I bring a different perspective
      to the field, one built on discipline, curiosity, and leadership. I’m on a path to excellence —
      the never-ending journey of self-improvement through code, creativity, and consistency.
    </p>
  </div>
)}


                {/* EXPERIENCE TAB */}
                {tab === "experience" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Experience</h2>

                    <ul className="mt-6 space-y-5">
                      {/* Berkley SRE Intern */}
                      <li className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <div className="font-medium">
                          Berkley Technology Services — Site Reliability Engineer (SRE) Intern
                        </div>
                        <div className="text-sm text-white/70">May 2025 – Present</div>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-1">
                          <li>
                            Designed and automated secure credential workflows by integrating PowerShell, SQL, and REST APIs with AD, Delinea, and SolarWinds—reducing repetitive toil.
                          </li>
                          <li>
                            Built Ansible playbooks to standardize system configurations across teams, preventing drift and enabling consistent deployments.
                          </li>
                          <li>
                            Partnered with InfoSec, PIM, and application teams to tune noisy AppDynamics alerts, improving signal quality and trust in monitoring.
                          </li>
                          <li>
                            Facilitated weekly stakeholder syncs to align engineers, managers, and partners—accelerating delivery and knowledge sharing.
                          </li>
                          <li>
                            Grew hands-on in observability, CI/CD, and infra automation; balanced compliance with usability to drive adoption.
                          </li>
                        </ul>
                      </li>

                      {/* Freelance Web Developer */}
                      <li className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <div className="font-medium">Freelance Web Developer — Self-Employed</div>
                        <div className="text-sm text-white/70">2024 – Present</div>
                        <ul className="mt-3 list-disc pl-5 text-sm text-white/85 space-y-1">
                          <li>
                            Design, build, and deploy small-business sites (landscaping, home inspection, and more) using Next.js/TypeScript, Tailwind, and Supabase; hosted on Vercel.
                          </li>
                          <li>
                            Ship end-to-end: content structure, responsive UI, basic SEO/analytics, contact/booking flows; improved lead conversion and site performance for clients.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                )}

                {/* PROJECTS TAB */}
                {tab === "projects" && (
                  <div>
                    <h2 className="text-2xl font-semibold">Projects</h2>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      {/* Real-Time Sports ML Engine */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">Real-Time Sports Betting Prediction Engine</div>
                          <div className="text-sm text-white/70">Python, LightGBM, Redis, DuckDB</div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>&lt;250 ms inference, calibrated probabilities.</li>
                            <li>EV/profit curves with real-time guardrails.</li>
                          </ul>
                        </div>
                        <a
                          href="https://your-demo-link.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                        >
                          Demo
                        </a>
                      </div>

                      {/* N&M Landscaping */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">N&amp;M Landscaping Website</div>
                          <div className="text-sm text-white/70">React/TypeScript, Supabase, Tailwind</div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Booking + admin dashboard with Supabase.</li>
                            <li>Increased clientele by 40%.</li>
                          </ul>
                        </div>

                        <div className="mt-4 flex gap-3">
                          <a
                            href="https://github.com/schonhux/NM-Landscaping-LLC-Website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                          >
                            Repo
                          </a>
                          <a
                            href="https://nmlandscapingllc.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                          >
                            Website
                          </a>
                        </div>
                      </div>

                      {/* MathMedic */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">MathMedic — Graphing Calculator</div>
                          <div className="text-sm text-white/70">Flask, Matplotlib, Math Parsing</div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Dynamic math parsing + interactive graphing.</li>
                            <li>Temporary data sessions, future DB planned.</li>
                          </ul>
                        </div>
                        <a
                          href="https://github.com/schonhux/MathMedic"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                        >
                          Repo
                        </a>
                      </div>

                      {/* Tetris */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">Tetris — Advanced OOP Implementation</div>
                          <div className="text-sm text-white/70">Java, OOP Design</div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>Encapsulation, inheritance, and polymorphism for piece design.</li>
                            <li>Fixed rotation overlap/edge cases via testing.</li>
                          </ul>
                        </div>
                        <a
                          href="https://github.com/schonhux/Tetris-"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                        >
                          Repo
                        </a>
                      </div>

                      {/* Latent Space Portfolio */}
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                        <div>
                          <div className="font-medium">The Latent Space — Personal Portfolio</div>
                          <div className="text-sm text-white/70">Next.js, TypeScript, Tailwind, Vercel</div>
                          <ul className="mt-2 list-disc pl-5 text-sm text-white/85 space-y-1">
                            <li>This website — “latent” symbolizing hidden representations in ML.</li>
                            <li>Built with Next.js + Tailwind, deployed on Vercel.</li>
                          </ul>
                        </div>
                        <a
                          href="https://github.com/schonhux/ml-journal"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-md border border-white/50 px-3 py-1 text-sm font-medium hover:bg-white hover:text-black"
                        >
                          Repo
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* PUBLICATIONS TAB */}
                {tab === "publications" && (
                  <div className="prose prose-invert prose-zinc max-w-none">
                    <h2>Publications</h2>
                    <p>
                      Coming soon: MDX write-ups with math and code. First up — calibrated probabilities
                      in LightGBM for real-time sports inference, and a deep dive on the distinctions
                      between Artificial Intelligence and Machine Learning.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Social Links */}
      <SocialLinks />
    </>
  );
}
