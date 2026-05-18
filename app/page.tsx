"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  SiAnsible,
  SiApachekafka,
  SiC,
  SiConfluence,
  SiCplusplus,
  SiDatadog,
  SiDocker,
  SiDotnet,
  SiDuckdb,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGo,
  SiGrafana,
  SiJavascript,
  SiJira,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiModelcontextprotocol,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrometheus,
  SiPytorch,
  SiPython,
  SiReact,
  SiRedis,
  SiRiscv,
  SiScikitlearn,
  SiSharp,
  SiSupabase,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { FaAws, FaChartLine, FaCode, FaDatabase, FaJava, FaMicrosoft, FaProjectDiagram, FaTerminal } from "react-icons/fa";

/* ─── file tree types ─── */
type FileItem = {
  name: string;
  icon: string;
  color: string;
  id: string;
  indent: number;
  isFolder?: boolean;
  isOpen?: boolean;
  desc?: string;
};

const FILES: FileItem[] = [
  { name: "schon-huxley", icon: "▾", color: "#e8ab53", id: "root", indent: 0, isFolder: true, isOpen: true },
  { name: "Welcome", icon: "◈", color: "#007acc", id: "welcome", indent: 1, desc: "Home — About me, quick links" },
  { name: "about.md", icon: "M↓", color: "#519aba", id: "about", indent: 1, desc: "Bio, education, interests" },
  { name: "experience.md", icon: "M↓", color: "#519aba", id: "experience", indent: 1, desc: "SRE @ Berkley, Incoming @ Lenovo" },
  { name: "projects", icon: "▾", color: "#e8ab53", id: "proj-folder", indent: 1, isFolder: true, isOpen: true },
  { name: "betting-engine.tsx", icon: "TS", color: "#519aba", id: "proj-betting", indent: 2, desc: "Real-time ML betting predictions" },
  { name: "insider-edge.tsx", icon: "TS", color: "#519aba", id: "proj-insider", indent: 2, desc: "SEC insider trading detection" },
  { name: "landscaping.tsx", icon: "TS", color: "#519aba", id: "proj-landscaping", indent: 2, desc: "N&M Landscaping business site" },
  { name: "mathmedic.tsx", icon: "TS", color: "#519aba", id: "proj-math", indent: 2, desc: "Interactive graphing calculator" },
  { name: "tetris.tsx", icon: "TS", color: "#519aba", id: "proj-tetris", indent: 2, desc: "OOP Tetris in Java" },
  { name: "skills.json", icon: "{}", color: "#e8ab53", id: "skills", indent: 1, desc: "Languages, tools, platforms" },
  { name: "contact.ts", icon: "TS", color: "#519aba", id: "contact", indent: 1, desc: "GitHub, LinkedIn, Email" },
  { name: "resume.pdf", icon: "◉", color: "#f44747", id: "resume", indent: 1, desc: "Download / view resume" },
];

/* ─── tab icon helper ─── */
function tabIcon(id: string) {
  if (id === "welcome") return "◈";
  if (id === "skills") return "{}";
  if (id === "resume") return "◉";
  if (id.startsWith("about") || id.startsWith("experience")) return "M↓";
  return "TS";
}
function tabColor(id: string) {
  if (id === "welcome") return "#007acc";
  if (id === "skills") return "#e8ab53";
  if (id === "resume") return "#f44747";
  if (id.startsWith("about") || id.startsWith("experience")) return "#519aba";
  return "#519aba";
}

/* ═══════════════════════════════════════════════════════ */
/*  COLLAPSIBLE SECTION                                    */
/* ═══════════════════════════════════════════════════════ */
function Collapsible({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-2">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <span className={`chevron ${isOpen ? "open" : ""}`}>▶</span>
        <h3 style={{ color: "#ccc", fontSize: "0.9rem", fontWeight: 600 }}>{title}</h3>
      </div>
      <div className={`collapsible-body ${isOpen ? "open" : "closed"}`}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  FILE CONTENT RENDERERS                                 */
/* ═══════════════════════════════════════════════════════ */

function WelcomeTab({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="p-8 max-w-3xl mx-auto font-sans">
      <div className="flex items-center gap-6 mb-6">
        <Image src="/images/profile.png" alt="Schon Huxley" width={90} height={90}
          className="rounded-full border-2 border-[#007acc] shadow-lg object-cover" />
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Schon Huxley</h1>
          <p className="text-[#ccc] text-sm font-medium">
            Incoming Reliability &amp; DevOps Intern @ <span className="text-[#c586c0]">Lenovo</span>
          </p>
          <p className="text-[#888] text-xs mt-0.5">
            Former SRE Intern @ <span className="text-[#4ec9b0]">Berkley Technology Services</span>
          </p>
          <p className="text-[#666] text-xs mt-1">Iowa State University · B.S. Software Engineering · May 2027</p>
        </div>
      </div>

      <p className="text-[#999] text-sm mb-6 leading-relaxed max-w-lg font-sans">
        I build systems where the backend, data flow, reliability layer, and user-facing product all connect.
        Focused on infrastructure, observability, and applied ML.
      </p>

      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-[#888] mb-3 font-sans">Start</h2>
        <div className="space-y-1">
          <button className="welcome-link" onClick={() => onOpen("about")}>
            <span className="text-[#519aba] text-xs font-mono">M↓</span> About Me
          </button>
          <button className="welcome-link" onClick={() => onOpen("experience")}>
            <span className="text-[#519aba] text-xs font-mono">M↓</span> Experience
          </button>
          <button className="welcome-link" onClick={() => onOpen("proj-betting")}>
            <span className="text-[#519aba] text-xs font-mono">TS</span> Projects
          </button>
          <button className="welcome-link" onClick={() => onOpen("skills")}>
            <span className="text-[#e8ab53] text-xs font-mono">{"{}"}</span> Tech Stack
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-[#888] mb-3 font-sans">Recent Projects</h2>
        <div className="space-y-1">
          <button className="welcome-project-card" onClick={() => onOpen("proj-betting")}>
            <div className="project-name">
              <span className="text-[#4ec9b0]">●</span> Real-Time Sports Betting Engine
              <span className="text-[10px] text-[#4ec9b0] ml-1 border border-[#4ec9b044] px-1.5 rounded">LIVE</span>
            </div>
            <div className="project-desc">ML-powered prediction engine with sub-250ms inference</div>
            <div className="project-stack">Python · LightGBM · Redis · DuckDB</div>
          </button>
          <button className="welcome-project-card" onClick={() => onOpen("proj-insider")}>
            <div className="project-name">
              <span className="text-[#e8ab53]">●</span> InsiderEdge — Insider Trading Detection
            </div>
            <div className="project-desc">Anomaly detection on SEC filings with ML.NET</div>
            <div className="project-stack">C# · .NET · ML.NET · Azure</div>
          </button>
          <button className="welcome-project-card" onClick={() => onOpen("proj-landscaping")}>
            <div className="project-name">
              <span className="text-[#4ec9b0]">●</span> N&amp;M Landscaping Website
              <span className="text-[10px] text-[#4ec9b0] ml-1 border border-[#4ec9b044] px-1.5 rounded">LIVE</span>
            </div>
            <div className="project-desc">Full-stack business site with booking and lead gen</div>
            <div className="project-stack">React · TypeScript · Supabase · Tailwind</div>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-widest text-[#888] mb-3 font-sans">Links</h2>
        <div className="flex gap-4 text-sm">
          <a href="https://github.com/schonhux" target="_blank" rel="noopener noreferrer" className="text-[#3794ff] hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/schon-huxley/" target="_blank" rel="noopener noreferrer" className="text-[#3794ff] hover:underline">LinkedIn</a>
          <a href="https://www.instagram.com/schonhux/" target="_blank" rel="noopener noreferrer" className="text-[#3794ff] hover:underline">Instagram</a>
          <a href="mailto:schon.huxley@gmail.com" className="text-[#3794ff] hover:underline">Email</a>
        </div>
      </div>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="md-preview p-6 max-w-3xl font-sans">
      <div className="flex items-center gap-4 mb-6">
        <Image src="/images/profile.png" alt="Schon Huxley" width={64} height={64}
          className="rounded-full border border-[#444] object-cover" />
        <div>
          <h1>Schon Huxley</h1>
          <p className="text-sm" style={{marginBottom:0}}>Software Engineer · Seattle, WA</p>
        </div>
      </div>

      <p>
        I build systems where the <strong>backend, data flow, reliability layer, and user-facing product</strong> all connect.
        Focused on infrastructure, observability, and applied ML.
      </p>

      <h2>Education</h2>
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <strong>Iowa State University</strong>
          </div>
          <span className="exp-date">Aug 2023 – May 2027</span>
        </div>
        <ul className="mt-2">
          <li>Phi Gamma Delta (Social Chair)</li>
          <li>AI &amp; ML Club</li>
          <li>Robotics Club</li>
          <li>Wrestling Club</li>
        </ul>
      </div>
    </div>
  );
}

function ExperienceTab() {
  return (
    <div className="md-preview p-6 max-w-3xl font-sans">
      <h1>Experience</h1>

      {/* ── Lenovo ── */}
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <strong>Lenovo</strong> <span className="badge badge-purple">Incoming</span>
            <div className="exp-role">Reliability &amp; DevOps Intern — Qira AI Platform</div>
          </div>
          <span className="exp-date">May 2026 – July 2026</span>
        </div>
        <ul className="mt-2">
          <li>Incoming intern on Lenovo&apos;s <strong>Qira AI Platform</strong> team, focused on reliability engineering, DevOps automation, observability, and operational support for cross-device AI systems.</li>
        </ul>
      </div>

      {/* ── Berkley ── */}
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <strong>Berkley Technology Services</strong>
            <div className="exp-role">Site Reliability Engineer</div>
          </div>
          <span className="exp-date">May 2025 – Present</span>
        </div>

        <div className="impact-tags">
          <span className="impact-tag">Observability</span>
          <span className="impact-tag">SRE Automation</span>
          <span className="impact-tag">AppDynamics</span>
          <span className="impact-tag">SolarWinds</span>
          <span className="impact-tag">SLIs / SLOs</span>
          <span className="impact-tag">Grafana</span>
        </div>

        <Collapsible title="Reliability Discovery Hub" defaultOpen={true}>
          <ul>
            <li>Designed and implemented an SRE-style reliability framework for a legacy multi-tenant insurance platform spanning <strong>5+ environments</strong> and <strong>25+ service dependencies</strong>, translating critical workflows into measurable SLIs and service boundaries.</li>
            <li>Mapped end-to-end application flows to Tier-0 infrastructure and dependencies (Kong, IBM Liberty, Db2, ACE), enabling dependency-aware monitoring and reducing mean time to triage for production incidents.</li>
            <li>Anchored reliability signals to successful customer workflow completion rather than raw infrastructure uptime, improving the quality of alerts used by on-call teams.</li>
          </ul>
        </Collapsible>

        <Collapsible title="Observability Strategy & SLO Reporting">
          <ul>
            <li>Designed an MVP observability strategy using SolarWinds synthetics, AppDynamics, and Grafana to capture top-line SLIs and deep diagnostic signals across legacy production systems.</li>
            <li>Led a cross-functional AppDynamics monitoring redesign for a critical ACS platform, reducing alert noise by <strong>70%+</strong>, eliminating false positives, and refocusing alerts on real failures.</li>
            <li>Partnered with application, middleware, database, and RSS teams to define ownership, escalation paths, and failure domains across a complex legacy architecture.</li>
          </ul>
        </Collapsible>

        <Collapsible title="Credential Rotation Automation">
          <ul>
            <li>Engineered a secure automated credential rotation system integrating Active Directory, Delinea Secret Server, and SolarWinds WPM, managing <strong>500+ service accounts</strong> with <strong>100% audit compliance</strong>.</li>
            <li>Built a hybrid automation architecture using Power Automate Cloud + Desktop to orchestrate UI-level credential updates through an RDP-launched fat client where APIs were unavailable.</li>
            <li>Integrated Delinea Secret Server APIs with on-prem automation via Microsoft Data Gateway, enabling secure dynamic credential retrieval and reducing operational risk from expired credentials.</li>
          </ul>
        </Collapsible>

        <Collapsible title="Infrastructure & Automation">
          <ul>
            <li>Built infrastructure automation and CI/CD pipelines with Ansible and PowerShell, reducing manual operational effort by <strong>50%</strong> and configuration drift by <strong>80%</strong> across production systems.</li>
            <li>Standardized repeatable system configuration workflows across environments, improving release consistency and reducing manual maintenance burden.</li>
          </ul>
        </Collapsible>
      </div>

      {/* ── Freelance ── */}
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <strong>Freelance Web Developer</strong>
            <div className="exp-role">Self-Employed</div>
          </div>
          <span className="exp-date">March 2025 – Present</span>
        </div>

        <Collapsible title="DT Group LLC — Web Revamp & SEO" defaultOpen={true}>
          <p className="text-xs" style={{color:"#666", marginBottom:"0.5rem"}}>Nov 2025 – Dec 2025</p>
          <ul>
            <li>Led a full-scale website revamp and SEO cleanup, improving site structure, metadata consistency, and search engine visibility.</li>
            <li>Resolved complex Google Business Profile inconsistencies, consolidating duplicate listings and aligning business data across platforms to improve local SEO trust signals.</li>
          </ul>
        </Collapsible>

        <Collapsible title="N&M Landscaping LLC — Website">
          <p className="text-xs" style={{color:"#666", marginBottom:"0.5rem"}}>Feb 2025 – Mar 2025</p>
          <ul>
            <li>Designed, built, and deployed a production booking platform with full CRUD workflows using React, TypeScript, Tailwind CSS, and Supabase, hosted on Vercel.</li>
            <li>Implemented responsive UI, SEO optimization, and customer inquiry workflows, increasing client acquisition by <strong>40%</strong>.</li>
          </ul>
        </Collapsible>
      </div>
    </div>
  );
}

/* ─── syntax-highlighted project components ─── */
function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex leading-6 hover:bg-[#2a2d2e]">
      <span className="line-number text-xs shrink-0">{n}</span>
      <span className="text-sm">{children}</span>
    </div>
  );
}
function Kw({ children }: { children: React.ReactNode }) { return <span className="text-vsc-keyword">{children}</span>; }
function Str({ children }: { children: React.ReactNode }) { return <span className="text-vsc-string">{children}</span>; }
function Fn({ children }: { children: React.ReactNode }) { return <span className="text-vsc-function">{children}</span>; }
function Cm({ children }: { children: React.ReactNode }) { return <span className="text-vsc-comment">{children}</span>; }
function Tp({ children }: { children: React.ReactNode }) { return <span className="text-vsc-type">{children}</span>; }
function Nm({ children }: { children: React.ReactNode }) { return <span className="text-vsc-number">{children}</span>; }
function Vr({ children }: { children: React.ReactNode }) { return <span className="text-vsc-variable">{children}</span>; }

const TECH_COLORS: Record<string, string> = {
  Python: "#3776AB",
  LightGBM: "#4EC9B0",
  Redis: "#FF4438",
  DuckDB: "#FFF000",
  FastAPI: "#009688",
  "C#": "#512BD4",
  ".NET": "#512BD4",
  "ML.NET": "#512BD4",
  "Azure Functions": "#0078D4",
  SSA: "#C586C0",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  Supabase: "#3ECF8E",
  "Tailwind CSS": "#38BDF8",
  Vercel: "#FFFFFF",
  Flask: "#FFFFFF",
  Matplotlib: "#11557C",
  "Math Parsing": "#DCDCaa",
  Java: "#F89820",
  "OOP Design": "#D7BA7D",
  JUnit: "#25A162",
};

function techStyle(name: string): React.CSSProperties {
  return { "--tech-color": TECH_COLORS[name] || "#4ec9b0" } as React.CSSProperties;
}

function ProjectSummary({ problem, architecture, stack, impact, links }: {
  problem: string;
  architecture: string;
  stack: string[];
  impact: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="project-summary">
      <h3>Problem</h3>
      <p>{problem}</p>
      <h3>Architecture</h3>
      <p>{architecture}</p>
      <h3>Tech Stack</h3>
      <div className="tech-pills">
        {stack.map((s) => <span key={s} className="tech-pill" style={techStyle(s)}>{s}</span>)}
      </div>
      <h3>Impact / What I Learned</h3>
      <p>{impact}</p>
      {links.length > 0 && (
        <>
          <h3>Links</h3>
          <div className="flex gap-3 mt-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1 text-xs rounded border border-[#555] text-[#3794ff] hover:bg-[#2a2d2e] transition font-sans">
                {l.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectBetting() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// Real-Time Sports Betting Prediction Engine"}</Cm></CodeLine>
      <CodeLine n={2}><Cm>{"// Python, LightGBM, Redis, DuckDB"}</Cm></CodeLine>
      <CodeLine n={3}>&nbsp;</CodeLine>
      <CodeLine n={4}><Kw>{"import"}</Kw>{" { "}<Tp>{"PredictionEngine"}</Tp>{", "}<Tp>{"Pipeline"}</Tp>{" } "}<Kw>{"from"}</Kw>{" "}<Str>{'"@schon/ml-core"'}</Str>{";"}</CodeLine>
      <CodeLine n={5}><Kw>{"import"}</Kw>{" { "}<Tp>{"RedisCache"}</Tp>{", "}<Tp>{"DuckDB"}</Tp>{" } "}<Kw>{"from"}</Kw>{" "}<Str>{'"@schon/data"'}</Str>{";"}</CodeLine>
      <CodeLine n={6}>&nbsp;</CodeLine>
      <CodeLine n={7}><Kw>{"export const"}</Kw>{" "}<Fn>{"config"}</Fn>{" = {"}</CodeLine>
      <CodeLine n={8}>{"  name: "}<Str>{'"Real-Time Sports Betting Prediction Engine"'}</Str>{","}</CodeLine>
      <CodeLine n={9}>{"  status: "}<Str>{'"LIVE"'}</Str>{","}</CodeLine>
      <CodeLine n={10}>{"  latency: "}<Str>{'"<250ms"'}</Str>{","}</CodeLine>
      <CodeLine n={11}>{"  stack: ["}<Str>{'"Python"'}</Str>{", "}<Str>{'"LightGBM"'}</Str>{", "}<Str>{'"Redis"'}</Str>{", "}<Str>{'"DuckDB"'}</Str>{"],"}</CodeLine>
      <CodeLine n={12}>{"}"}</CodeLine>
      <CodeLine n={13}>&nbsp;</CodeLine>
      <CodeLine n={14}><Kw>{"export class"}</Kw>{" "}<Tp>{"BettingEngine"}</Tp>{" "}<Kw>{"extends"}</Kw>{" "}<Tp>{"PredictionEngine"}</Tp>{" {"}</CodeLine>
      <CodeLine n={15}>{"  "}<Kw>{"private"}</Kw>{" "}<Vr>{"cache"}</Vr>{" = "}<Kw>{"new"}</Kw>{" "}<Tp>{"RedisCache"}</Tp>{"();"}</CodeLine>
      <CodeLine n={16}>{"  "}<Kw>{"private"}</Kw>{" "}<Vr>{"db"}</Vr>{" = "}<Kw>{"new"}</Kw>{" "}<Tp>{"DuckDB"}</Tp>{"();"}</CodeLine>
      <CodeLine n={17}>&nbsp;</CodeLine>
      <CodeLine n={18}>{"  "}<Cm>{"// Low-latency inference with calibrated probabilities"}</Cm></CodeLine>
      <CodeLine n={19}>{"  "}<Kw>{"async"}</Kw>{" "}<Fn>{"predict"}</Fn>{"("}<Vr>{"odds"}</Vr>{": "}<Tp>{"LiveOdds"}</Tp>{", "}<Vr>{"stream"}</Vr>{": "}<Tp>{"PlayByPlay"}</Tp>{") {"}</CodeLine>
      <CodeLine n={20}>{"    "}<Kw>{"const"}</Kw>{" "}<Vr>{"features"}</Vr>{" = "}<Kw>{"await"}</Kw>{" "}<Kw>{"this"}</Kw>{"."}<Fn>{"extractFeatures"}</Fn>{"("}<Vr>{"odds"}</Vr>{", "}<Vr>{"stream"}</Vr>{");"}</CodeLine>
      <CodeLine n={21}>{"    "}<Kw>{"const"}</Kw>{" "}<Vr>{"signal"}</Vr>{" = "}<Kw>{"await"}</Kw>{" "}<Kw>{"this"}</Kw>{"."}<Vr>{"model"}</Vr>{"."}<Fn>{"infer"}</Fn>{"("}<Vr>{"features"}</Vr>{");"}</CodeLine>
      <CodeLine n={22}>{"    "}<Kw>{"return"}</Kw>{" { "}<Vr>{"signal"}</Vr>{", ev: "}<Kw>{"this"}</Kw>{"."}<Fn>{"calcEV"}</Fn>{"("}<Vr>{"signal"}</Vr>{", "}<Vr>{"odds"}</Vr>{") };"}</CodeLine>
      <CodeLine n={23}>{"  }"}</CodeLine>
      <CodeLine n={24}>&nbsp;</CodeLine>
      <CodeLine n={25}>{"  "}<Cm>{"// EV/profit curves with real-time guardrails"}</Cm></CodeLine>
      <CodeLine n={26}>{"  "}<Fn>{"calcEV"}</Fn>{"("}<Vr>{"signal"}</Vr>{": "}<Tp>{"Signal"}</Tp>{", "}<Vr>{"odds"}</Vr>{": "}<Tp>{"LiveOdds"}</Tp>{"): "}<Tp>{"number"}</Tp>{" {"}</CodeLine>
      <CodeLine n={27}>{"    "}<Kw>{"return"}</Kw>{" "}<Vr>{"signal"}</Vr>{".prob * "}<Vr>{"odds"}</Vr>{".payout - ("}<Nm>{"1"}</Nm>{" - "}<Vr>{"signal"}</Vr>{".prob);"}</CodeLine>
      <CodeLine n={28}>{"  }"}</CodeLine>
      <CodeLine n={29}>{"}"}</CodeLine>

      <ProjectSummary
        problem="Sportsbook odds move in real-time during live games. I wanted to build a system that could detect +EV opportunities faster than the market corrects."
        architecture="Live odds stream feeds into a feature extraction pipeline, processed by a LightGBM model for calibrated probability output. Redis handles sub-250ms caching, DuckDB stores historical features for backtesting."
        stack={["Python", "LightGBM", "Redis", "DuckDB", "FastAPI"]}
        impact="Built an end-to-end ML pipeline from data ingestion to real-time inference. Learned how to balance model accuracy with latency constraints in a live system."
        links={[
          { label: "▶ Demo", href: "https://youtu.be/g5NZ6OFR-IE" },
          { label: "⌥ Repo", href: "https://github.com/schonhux/In-Play-Edge-Engine-" },
        ]}
      />
    </div>
  );
}

function ProjectInsider() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// InsiderEdge — Insider Trading Detection Platform"}</Cm></CodeLine>
      <CodeLine n={2}><Cm>{"// C#, .NET, ML.NET, Azure"}</Cm></CodeLine>
      <CodeLine n={3}>&nbsp;</CodeLine>
      <CodeLine n={4}><Kw>{"using"}</Kw>{" "}<Tp>{"Microsoft.ML"}</Tp>{";"}</CodeLine>
      <CodeLine n={5}><Kw>{"using"}</Kw>{" "}<Tp>{"Azure.Functions"}</Tp>{";"}</CodeLine>
      <CodeLine n={6}>&nbsp;</CodeLine>
      <CodeLine n={7}><Kw>{"namespace"}</Kw>{" "}<Tp>{"InsiderEdge"}</Tp>{" {"}</CodeLine>
      <CodeLine n={8}>{"  "}<Kw>{"public class"}</Kw>{" "}<Tp>{"AnomalyDetector"}</Tp>{" {"}</CodeLine>
      <CodeLine n={9}>{"    "}<Cm>{"// LightGBM + SSA time-series anomaly detection"}</Cm></CodeLine>
      <CodeLine n={10}>{"    "}<Kw>{"private"}</Kw>{" "}<Tp>{"MLContext"}</Tp>{" "}<Vr>{"_ml"}</Vr>{" = "}<Kw>{"new"}</Kw>{" "}<Tp>{"MLContext"}</Tp>{"();"}</CodeLine>
      <CodeLine n={11}>&nbsp;</CodeLine>
      <CodeLine n={12}>{"    "}<Kw>{"public async"}</Kw>{" "}<Tp>{"Task"}</Tp>{"<"}<Tp>{"Detection"}</Tp>{">"}{" "}<Fn>{"Analyze"}</Fn>{"("}<Tp>{"SECFiling"}</Tp>{" "}<Vr>{"filing"}</Vr>{") {"}</CodeLine>
      <CodeLine n={13}>{"      "}<Kw>{"var"}</Kw>{" "}<Vr>{"features"}</Vr>{" = "}<Fn>{"ExtractFeatures"}</Fn>{"("}<Vr>{"filing"}</Vr>{");"}</CodeLine>
      <CodeLine n={14}>{"      "}<Kw>{"var"}</Kw>{" "}<Vr>{"prediction"}</Vr>{" = "}<Vr>{"_model"}</Vr>{"."}<Fn>{"Predict"}</Fn>{"("}<Vr>{"features"}</Vr>{");"}</CodeLine>
      <CodeLine n={15}>{"      "}<Kw>{"return"}</Kw>{" "}<Kw>{"new"}</Kw>{" "}<Tp>{"Detection"}</Tp>{" { Score = "}<Vr>{"prediction"}</Vr>{".Score };"}</CodeLine>
      <CodeLine n={16}>{"    }"}</CodeLine>
      <CodeLine n={17}>&nbsp;</CodeLine>
      <CodeLine n={18}>{"    "}<Cm>{"// Ingested SEC filings, stock prices, sentiment data"}</Cm></CodeLine>
      <CodeLine n={19}>{"    "}<Cm>{"// Near real-time feature generation for high-volume processing"}</Cm></CodeLine>
      <CodeLine n={20}>{"    "}<Cm>{"// Automated retraining + Azure-hosted deployment"}</Cm></CodeLine>
      <CodeLine n={21}>{"  }"}</CodeLine>
      <CodeLine n={22}>{"}"}</CodeLine>

      <ProjectSummary
        problem="Insider trading is hard to detect because the signals are buried in legitimate market noise. I wanted to build a system that could flag anomalous trading patterns around SEC filings."
        architecture="SEC EDGAR filings are ingested and cross-referenced with stock price movements. LightGBM classifies anomalous trading patterns, while SSA handles time-series decomposition. Azure Functions orchestrate the pipeline."
        stack={["C#", ".NET", "ML.NET", "Azure Functions", "LightGBM", "SSA"]}
        impact="Learned to work with real financial data pipelines, feature engineering from unstructured SEC filings, and deploying ML models to Azure for automated retraining."
        links={[
          { label: "⌥ Repo", href: "https://github.com/schonhux/InsiderEdge" },
        ]}
      />
    </div>
  );
}

function ProjectLandscaping() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// N&M Landscaping LLC — Business Website"}</Cm></CodeLine>
      <CodeLine n={2}><Cm>{"// React, TypeScript, Supabase, Tailwind"}</Cm></CodeLine>
      <CodeLine n={3}>&nbsp;</CodeLine>
      <CodeLine n={4}><Kw>{"import"}</Kw>{" { "}<Tp>{"createClient"}</Tp>{" } "}<Kw>{"from"}</Kw>{" "}<Str>{'"@supabase/supabase-js"'}</Str>{";"}</CodeLine>
      <CodeLine n={5}>&nbsp;</CodeLine>
      <CodeLine n={6}><Kw>{"export const"}</Kw>{" "}<Fn>{"project"}</Fn>{" = {"}</CodeLine>
      <CodeLine n={7}>{"  name: "}<Str>{'"N&M Landscaping Website"'}</Str>{","}</CodeLine>
      <CodeLine n={8}>{"  status: "}<Str>{'"LIVE"'}</Str>{","}</CodeLine>
      <CodeLine n={9}>{"  url: "}<Str>{'"https://nmlandscapingllc.com"'}</Str>{","}</CodeLine>
      <CodeLine n={10}>{"  impact: "}<Str>{'"40% increase in client acquisition"'}</Str>{","}</CodeLine>
      <CodeLine n={11}>{"  stack: ["}<Str>{'"TypeScript"'}</Str>{", "}<Str>{'"React"'}</Str>{", "}<Str>{'"Supabase"'}</Str>{", "}<Str>{'"Tailwind"'}</Str>{"],"}</CodeLine>
      <CodeLine n={12}>{"  features: ["}</CodeLine>
      <CodeLine n={13}>{"    "}<Str>{'"Production booking platform with full CRUD"'}</Str>{","}</CodeLine>
      <CodeLine n={14}>{"    "}<Str>{'"Customer inquiry workflows"'}</Str>{","}</CodeLine>
      <CodeLine n={15}>{"    "}<Str>{'"Responsive UI + SEO optimization"'}</Str>{","}</CodeLine>
      <CodeLine n={16}>{"  ]"}</CodeLine>
      <CodeLine n={17}>{"}"}</CodeLine>

      <ProjectSummary
        problem="A local landscaping business had no web presence and was losing leads to competitors with online booking."
        architecture="React SPA with Supabase backend for booking management, customer inquiry forms, and admin dashboard. Deployed on Vercel with SEO optimization."
        stack={["React", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"]}
        impact="Delivered a production site that drove a 40% increase in client acquisition. First freelance project — learned to manage client requirements, timelines, and iterative feedback."
        links={[
          { label: "◎ Live Site", href: "https://nmlandscapingllc.com" },
          { label: "⌥ Repo", href: "https://github.com/schonhux/NM-Landscaping-LLC-Website" },
        ]}
      />
    </div>
  );
}

function ProjectMath() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// MathMedic — Graphing Calculator"}</Cm></CodeLine>
      <CodeLine n={2}><Cm>{"// Flask, Matplotlib, Math Parsing"}</Cm></CodeLine>
      <CodeLine n={3}>&nbsp;</CodeLine>
      <CodeLine n={4}><Kw>{"from"}</Kw>{" flask "}<Kw>{"import"}</Kw>{" Flask, render_template"}</CodeLine>
      <CodeLine n={5}><Kw>{"from"}</Kw>{" matplotlib "}<Kw>{"import"}</Kw>{" pyplot "}<Kw>{"as"}</Kw>{" plt"}</CodeLine>
      <CodeLine n={6}>&nbsp;</CodeLine>
      <CodeLine n={7}><Vr>{"project"}</Vr>{" = {"}</CodeLine>
      <CodeLine n={8}>{"  "}<Str>{'"name"'}</Str>{": "}<Str>{'"MathMedic"'}</Str>{","}</CodeLine>
      <CodeLine n={9}>{"  "}<Str>{'"desc"'}</Str>{": "}<Str>{'"Dynamic math parsing + interactive graphing"'}</Str>{","}</CodeLine>
      <CodeLine n={10}>{"  "}<Str>{'"stack"'}</Str>{": ["}<Str>{'"Flask"'}</Str>{", "}<Str>{'"Matplotlib"'}</Str>{", "}<Str>{'"Math Parsing"'}</Str>{"],"}</CodeLine>
      <CodeLine n={11}>{"}"}</CodeLine>

      <ProjectSummary
        problem="Wanted a lightweight web-based graphing calculator that could parse arbitrary math expressions and render them interactively."
        architecture="Flask backend handles expression parsing and validation. Matplotlib generates graph images server-side, rendered in the browser with interactive controls."
        stack={["Python", "Flask", "Matplotlib", "Math Parsing"]}
        impact="Built a full-stack Python web app from scratch. Learned server-side rendering, math expression parsing, and how to handle edge cases in user input."
        links={[
          { label: "⌥ Repo", href: "https://github.com/schonhux/MathMedic" },
        ]}
      />
    </div>
  );
}

function ProjectTetris() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// Tetris — Advanced OOP Implementation"}</Cm></CodeLine>
      <CodeLine n={2}><Cm>{"// Java, OOP Design"}</Cm></CodeLine>
      <CodeLine n={3}>&nbsp;</CodeLine>
      <CodeLine n={4}><Kw>{"public class"}</Kw>{" "}<Tp>{"Tetris"}</Tp>{" "}<Kw>{"extends"}</Kw>{" "}<Tp>{"GameEngine"}</Tp>{" {"}</CodeLine>
      <CodeLine n={5}>{"  "}<Kw>{"private"}</Kw>{" "}<Tp>{"Board"}</Tp>{" "}<Vr>{"board"}</Vr>{";"}</CodeLine>
      <CodeLine n={6}>{"  "}<Kw>{"private"}</Kw>{" "}<Tp>{"Piece"}</Tp>{" "}<Vr>{"current"}</Vr>{";"}</CodeLine>
      <CodeLine n={7}>&nbsp;</CodeLine>
      <CodeLine n={8}>{"  "}<Cm>{"// Encapsulation + polymorphism for piece design"}</Cm></CodeLine>
      <CodeLine n={9}>{"  "}<Cm>{"// Rotation edge cases validated with tests"}</Cm></CodeLine>
      <CodeLine n={10}>&nbsp;</CodeLine>
      <CodeLine n={11}>{"  "}<Kw>{"public void"}</Kw>{" "}<Fn>{"rotate"}</Fn>{"("}<Tp>{"Piece"}</Tp>{" "}<Vr>{"p"}</Vr>{") {"}</CodeLine>
      <CodeLine n={12}>{"    "}<Vr>{"p"}</Vr>{"."}<Fn>{"applyRotation"}</Fn>{"("}<Tp>{"Direction"}</Tp>{".CW);"}</CodeLine>
      <CodeLine n={13}>{"    "}<Kw>{"if"}</Kw>{" (!"}<Vr>{"board"}</Vr>{"."}<Fn>{"isValid"}</Fn>{"("}<Vr>{"p"}</Vr>{")) "}<Vr>{"p"}</Vr>{"."}<Fn>{"revert"}</Fn>{"();"}</CodeLine>
      <CodeLine n={14}>{"  }"}</CodeLine>
      <CodeLine n={15}>{"}"}</CodeLine>

      <ProjectSummary
        problem="Academic project to build a fully playable Tetris game using advanced OOP principles — encapsulation, inheritance, and polymorphism."
        architecture="Game engine with modular piece system, board state management, collision detection, and rotation with wall-kick validation. All pieces extend a base Piece class."
        stack={["Java", "OOP Design", "JUnit"]}
        impact="Deepened understanding of OOP design patterns, state machines, and test-driven development. All rotation edge cases validated with unit tests."
        links={[
          { label: "⌥ Repo", href: "https://github.com/schonhux/Tetris-" },
        ]}
      />
    </div>
  );
}

/* ─── skills with rendered grid + JSON toggle ─── */
type Skill = {
  name: string;
  href: string;
  color: string;
  Icon: IconType;
};

type SkillSection = {
  title: string;
  items: Skill[];
};

const SKILL_SECTIONS: SkillSection[] = [
  {
    title: "Languages",
    items: [
      { name: "Python", href: "https://www.python.org/", color: "#3776AB", Icon: SiPython },
      { name: "Go", href: "https://go.dev/", color: "#00ADD8", Icon: SiGo },
      { name: "C", href: "https://www.open-std.org/jtc1/sc22/wg14/", color: "#A8B9CC", Icon: SiC },
      { name: "C++", href: "https://isocpp.org/", color: "#00599C", Icon: SiCplusplus },
      { name: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/", color: "#512BD4", Icon: SiSharp },
      { name: ".NET", href: "https://dotnet.microsoft.com/", color: "#512BD4", Icon: SiDotnet },
      { name: "Java", href: "https://www.java.com/", color: "#F89820", Icon: FaJava },
      { name: "TypeScript", href: "https://www.typescriptlang.org/", color: "#3178C6", Icon: SiTypescript },
      { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E", Icon: SiJavascript },
      { name: "SQL", href: "https://www.iso.org/standard/76583.html", color: "#6CA6D9", Icon: FaDatabase },
      { name: "PowerShell", href: "https://learn.microsoft.com/en-us/powershell/", color: "#5391FE", Icon: FaTerminal },
    ],
  },
  {
    title: "ML & Modeling",
    items: [
      { name: "PyTorch", href: "https://pytorch.org/", color: "#EE4C2C", Icon: SiPytorch },
      { name: "Scikit-learn", href: "https://scikit-learn.org/", color: "#F7931E", Icon: SiScikitlearn },
      { name: "LightGBM", href: "https://lightgbm.readthedocs.io/", color: "#4EC9B0", Icon: FaProjectDiagram },
      { name: "ML.NET", href: "https://dotnet.microsoft.com/en-us/apps/machinelearning-ai/ml-dotnet", color: "#512BD4", Icon: SiDotnet },
      { name: "LangChain", href: "https://www.langchain.com/", color: "#1C3C3C", Icon: SiLangchain },
      { name: "MCP", href: "https://modelcontextprotocol.io/", color: "#FFFFFF", Icon: SiModelcontextprotocol },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "FastAPI", href: "https://fastapi.tiangolo.com/", color: "#009688", Icon: SiFastapi },
      { name: "Node.js", href: "https://nodejs.org/", color: "#5FA04E", Icon: SiNodedotjs },
      { name: "Next.js", href: "https://nextjs.org/", color: "#FFFFFF", Icon: SiNextdotjs },
      { name: "React", href: "https://react.dev/", color: "#61DAFB", Icon: SiReact },
      { name: "Redis", href: "https://redis.io/", color: "#FF4438", Icon: SiRedis },
      { name: "DuckDB", href: "https://duckdb.org/", color: "#FFF000", Icon: SiDuckdb },
      { name: "Kafka", href: "https://kafka.apache.org/", color: "#FFFFFF", Icon: SiApachekafka },
      { name: "PostgreSQL", href: "https://www.postgresql.org/", color: "#4169E1", Icon: SiPostgresql },
      { name: "MongoDB", href: "https://www.mongodb.com/", color: "#47A248", Icon: SiMongodb },
      { name: "Firebase", href: "https://firebase.google.com/", color: "#FFCA28", Icon: SiFirebase },
      { name: "Supabase", href: "https://supabase.com/", color: "#3ECF8E", Icon: SiSupabase },
    ],
  },
  {
    title: "DevOps",
    items: [
      { name: "AWS", href: "https://aws.amazon.com/", color: "#FF9900", Icon: FaAws },
      { name: "Azure", href: "https://azure.microsoft.com/", color: "#0078D4", Icon: FaMicrosoft },
      { name: "Terraform", href: "https://www.terraform.io/", color: "#844FBA", Icon: SiTerraform },
      { name: "Docker", href: "https://www.docker.com/", color: "#2496ED", Icon: SiDocker },
      { name: "Kubernetes", href: "https://kubernetes.io/", color: "#326CE5", Icon: SiKubernetes },
      { name: "Linux", href: "https://www.kernel.org/", color: "#FCC624", Icon: SiLinux },
      { name: "Ansible", href: "https://www.ansible.com/", color: "#EE0000", Icon: SiAnsible },
      { name: "GitHub Actions", href: "https://github.com/features/actions", color: "#2088FF", Icon: SiGithubactions },
    ],
  },
  {
    title: "Observability",
    items: [
      { name: "Git", href: "https://git-scm.com/", color: "#F05032", Icon: SiGit },
      { name: "GitHub", href: "https://github.com/", color: "#FFFFFF", Icon: SiGithub },
      { name: "Prometheus", href: "https://prometheus.io/", color: "#E6522C", Icon: SiPrometheus },
      { name: "Grafana", href: "https://grafana.com/", color: "#F46800", Icon: SiGrafana },
      { name: "Datadog", href: "https://www.datadoghq.com/", color: "#632CA6", Icon: SiDatadog },
      { name: "AppDynamics", href: "https://www.appdynamics.com/", color: "#00A0DF", Icon: FaChartLine },
      { name: "SolarWinds", href: "https://www.solarwinds.com/", color: "#F99D1C", Icon: FaProjectDiagram },
    ],
  },
  {
    title: "Engineering Tools",
    items: [
      { name: "Jira", href: "https://www.atlassian.com/software/jira", color: "#0052CC", Icon: SiJira },
      { name: "Confluence", href: "https://www.atlassian.com/software/confluence", color: "#172B4D", Icon: SiConfluence },
      { name: "Vercel", href: "https://vercel.com/", color: "#FFFFFF", Icon: SiNextdotjs },
    ],
  },
  {
    title: "Hardware & Architecture",
    items: [
      { name: "RISC-V", href: "https://riscv.org/", color: "#283272", Icon: SiRiscv },
      { name: "VHDL", href: "https://standards.ieee.org/ieee/1076/6843/", color: "#F7DF1E", Icon: FaCode },
      { name: "Verilog", href: "https://standards.ieee.org/ieee/1800/6700/", color: "#4EC9B0", Icon: FaCode },
      { name: "ModelSim", href: "https://eda.sw.siemens.com/en-US/ic/modelsim/", color: "#00AEEF", Icon: FaCode },
    ],
  },
];

function SkillsGridView() {
  return (
    <div className="skills-showcase">
      {SKILL_SECTIONS.map((section) => (
        <section key={section.title} className="skills-section">
          <h2>{section.title}</h2>
          <div className="skill-icon-grid">
            {section.items.map(({ name, href, color, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-icon-card"
                aria-label={`Open official ${name} site`}
                title={name}
                style={{ "--skill-color": color } as React.CSSProperties}
              >
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SkillsJsonView() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}>{"{"}</CodeLine>
      <CodeLine n={2}>{"  "}<Str>{'"languages"'}</Str>{": ["}<Str>{'"Python"'}</Str>{", "}<Str>{'"Go"'}</Str>{", "}<Str>{'"C/C++"'}</Str>{", "}<Str>{'"C#"'}</Str>{", "}<Str>{'".NET"'}</Str>{", "}<Str>{'"Java"'}</Str>{","}</CodeLine>
      <CodeLine n={3}>{"    "}<Str>{'"TypeScript"'}</Str>{", "}<Str>{'"JavaScript"'}</Str>{", "}<Str>{'"SQL"'}</Str>{", "}<Str>{'"PowerShell"'}</Str>{"],"}</CodeLine>
      <CodeLine n={4}>&nbsp;</CodeLine>
      <CodeLine n={5}>{"  "}<Str>{'"backend"'}</Str>{": ["}<Str>{'"FastAPI"'}</Str>{", "}<Str>{'"Node.js"'}</Str>{", "}<Str>{'"Next.js"'}</Str>{", "}<Str>{'"Redis"'}</Str>{", "}<Str>{'"DuckDB"'}</Str>{"],"}</CodeLine>
      <CodeLine n={6}>&nbsp;</CodeLine>
      <CodeLine n={7}>{"  "}<Str>{'"cloud_devops"'}</Str>{": ["}<Str>{'"AWS"'}</Str>{", "}<Str>{'"Azure"'}</Str>{", "}<Str>{'"Terraform"'}</Str>{", "}<Str>{'"Docker"'}</Str>{", "}<Str>{'"Kubernetes"'}</Str>{"],"}</CodeLine>
      <CodeLine n={8}>&nbsp;</CodeLine>
      <CodeLine n={9}>{"  "}<Str>{'"ai_ml"'}</Str>{": ["}<Str>{'"PyTorch"'}</Str>{", "}<Str>{'"Scikit-learn"'}</Str>{", "}<Str>{'"LightGBM"'}</Str>{", "}<Str>{'"ML.NET"'}</Str>{", "}<Str>{'"MCP"'}</Str>{"],"}</CodeLine>
      <CodeLine n={10}>&nbsp;</CodeLine>
      <CodeLine n={11}>{"  "}<Str>{'"observability"'}</Str>{": ["}<Str>{'"Prometheus"'}</Str>{", "}<Str>{'"Grafana"'}</Str>{", "}<Str>{'"AppDynamics"'}</Str>{", "}<Str>{'"Datadog"'}</Str>{", "}<Str>{'"SolarWinds"'}</Str>{"]"}</CodeLine>
      <CodeLine n={12}>{"}"}</CodeLine>
    </div>
  );
}

function SkillsTab() {
  const [view, setView] = useState<"grid" | "json">("grid");
  return (
    <div>
      <div className="px-4 pt-4">
        <div className="view-toggle">
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Grid</button>
          <button className={view === "json" ? "active" : ""} onClick={() => setView("json")}>JSON</button>
        </div>
      </div>
      {view === "grid" ? <SkillsGridView /> : <SkillsJsonView />}
    </div>
  );
}

function ContactTab() {
  return (
    <div className="p-4 font-mono text-sm overflow-x-auto">
      <CodeLine n={1}><Cm>{"// contact.ts — Get in touch"}</Cm></CodeLine>
      <CodeLine n={2}>&nbsp;</CodeLine>
      <CodeLine n={3}><Kw>{"export const"}</Kw>{" "}<Fn>{"contact"}</Fn>{" = {"}</CodeLine>
      <CodeLine n={4}>{"  github: "}<a href="https://github.com/schonhux" target="_blank" rel="noopener noreferrer" className="text-vsc-string hover:underline">{'"https://github.com/schonhux"'}</a>{","}</CodeLine>
      <CodeLine n={5}>{"  linkedin: "}<a href="https://www.linkedin.com/in/schon-huxley/" target="_blank" rel="noopener noreferrer" className="text-vsc-string hover:underline">{'"https://linkedin.com/in/schon-huxley"'}</a>{","}</CodeLine>
      <CodeLine n={6}>{"  instagram: "}<a href="https://www.instagram.com/schonhux/" target="_blank" rel="noopener noreferrer" className="text-vsc-string hover:underline">{'"https://instagram.com/schonhux"'}</a>{","}</CodeLine>
      <CodeLine n={7}>{"  email: "}<a href="mailto:schon.huxley@gmail.com" className="text-vsc-string hover:underline">{'"schon.huxley@gmail.com"'}</a>{","}</CodeLine>
      <CodeLine n={8}>{"  website: "}<a href="https://schonhuxley.com" target="_blank" rel="noopener noreferrer" className="text-vsc-string hover:underline">{'"https://schonhuxley.com"'}</a>{","}</CodeLine>
      <CodeLine n={9}>{"}"}</CodeLine>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  COMMAND PALETTE                                        */
/* ═══════════════════════════════════════════════════════ */
type CmdItem = { label: string; icon: string; action: string; shortcut?: string };

const CMD_ITEMS: CmdItem[] = [
  { label: "Open Resume", icon: "◉", action: "resume", shortcut: "R" },
  { label: "Open Experience", icon: "M↓", action: "experience" },
  { label: "Open Projects", icon: "TS", action: "proj-betting" },
  { label: "Open Skills", icon: "{}", action: "skills" },
  { label: "Open About", icon: "M↓", action: "about" },
  { label: "Open Contact", icon: "TS", action: "contact" },
  { label: "Open GitHub", icon: "⌥", action: "ext:https://github.com/schonhux" },
  { label: "Open LinkedIn", icon: "↗", action: "ext:https://www.linkedin.com/in/schon-huxley/" },
  { label: "Copy Email", icon: "@", action: "copy:schon.huxley@gmail.com" },
  { label: "Toggle Terminal", icon: ">_", action: "terminal" },
  { label: "Toggle Sidebar", icon: "☰", action: "sidebar" },
];

function CommandPalette({ onAction, onClose }: { onAction: (action: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CMD_ITEMS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); return; }
    if (e.key === "Enter" && filtered[activeIdx]) {
      onAction(filtered[activeIdx].action);
      onClose();
    }
  };

  return (
    <div className="cmd-palette-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIdx(0);
          }}
          onKeyDown={handleKey}
          placeholder="Type a command..."
        />
        <div className="cmd-palette-results">
          {filtered.map((c, i) => (
            <div
              key={c.action}
              className={`cmd-palette-item ${i === activeIdx ? "active" : ""}`}
              onClick={() => { onAction(c.action); onClose(); }}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span className="text-xs font-mono text-[#888] w-5 text-center">{c.icon}</span>
              <span>{c.label}</span>
              {c.shortcut && <span className="shortcut">{c.shortcut}</span>}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="cmd-palette-item" style={{ color: "#666" }}>No results found</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  TERMINAL PANEL                                         */
/* ═══════════════════════════════════════════════════════ */
type TermLine = { type: "input" | "output"; text: string };

function TerminalPanel({ onNavigate, onClose }: { onNavigate: (id: string) => void; onClose: () => void }) {
  const [history, setHistory] = useState<TermLine[]>([
    { type: "output", text: "Welcome to Schon's portfolio terminal. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: TermLine[] = [...history, { type: "input", text: cmd }];

    const responses: Record<string, string | (() => void)> = {
      help: "Available commands: whoami, about, experience, projects, skills, resume, contact, clear, exit",
      whoami: "Schon Huxley — SWE @ Iowa State, SRE intern, systems builder",
      about: () => { onNavigate("about"); newHistory.push({ type: "output", text: "Opening about.md..." }); },
      experience: () => { onNavigate("experience"); newHistory.push({ type: "output", text: "Opening experience.md..." }); },
      projects: () => { onNavigate("proj-betting"); newHistory.push({ type: "output", text: "Opening projects/betting-engine.tsx..." }); },
      skills: () => { onNavigate("skills"); newHistory.push({ type: "output", text: "Opening skills.json..." }); },
      resume: () => { window.open("/images/SchonHux - Resume.pdf", "_blank"); newHistory.push({ type: "output", text: "Opening resume in new tab..." }); },
      contact: () => { onNavigate("contact"); newHistory.push({ type: "output", text: "Opening contact.ts..." }); },
      clear: "CLEAR",
      exit: () => { newHistory.push({ type: "output", text: "Closing terminal..." }); onClose(); },
      close: () => { newHistory.push({ type: "output", text: "Closing terminal..." }); onClose(); },
    };

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const resp = responses[trimmed];
    if (resp === undefined) {
      newHistory.push({ type: "output", text: `command not found: ${trimmed}. Type 'help' for available commands.` });
    } else if (typeof resp === "string") {
      newHistory.push({ type: "output", text: resp });
    } else {
      resp();
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="terminal-panel" style={{ height: "180px" }}>
      <div className="terminal-header">
        <span className="tab-active">TERMINAL</span>
        <span className="terminal-shell-label">bash</span>
        <button className="terminal-close" onClick={onClose} aria-label="Close terminal" title="Close terminal">✕</button>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {history.map((line, i) => (
          <div key={i} className="terminal-line">
            {line.type === "input" ? (
              <><span className="prompt">schon@portfolio</span><span className="text-[#888]">:</span><span className="accent">~</span><span className="text-[#888]">$ </span><span className="cmd">{line.text}</span></>
            ) : (
              <span className="output">{line.text}</span>
            )}
          </div>
        ))}
        <div className="terminal-input-line terminal-line">
          <span className="prompt">schon@portfolio</span><span className="text-[#888]">:</span><span className="accent">~</span><span className="text-[#888]">$ </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") execute(input); }}
            autoFocus={false}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  MAIN VS CODE SHELL                                     */
/* ═══════════════════════════════════════════════════════ */
export default function VSCodePortfolio() {
  const [activeFile, setActiveFile] = useState("welcome");
  const [openTabs, setOpenTabs] = useState<string[]>(["welcome"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPalette, setShowPalette] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);

  const openFile = useCallback((id: string) => {
    if (id === "resume") {
      window.open("/images/SchonHux - Resume.pdf", "_blank");
      return;
    }
    if (id === "root" || id === "proj-folder") return;
    setActiveFile(id);
    setOpenTabs((tabs) => tabs.includes(id) ? tabs : [...tabs, id]);
  }, []);

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== id);
    setOpenTabs(newTabs);
    if (activeFile === id) setActiveFile(newTabs[newTabs.length - 1] || "welcome");
    if (newTabs.length === 0) { setOpenTabs(["welcome"]); setActiveFile("welcome"); }
  };

  const fileName = (id: string) => FILES.find((f) => f.id === id)?.name || id;

  const handlePaletteAction = useCallback((action: string) => {
    if (action === "terminal") { setShowTerminal((t) => !t); return; }
    if (action === "sidebar") { setSidebarOpen((s) => !s); return; }
    if (action.startsWith("ext:")) { window.open(action.slice(4), "_blank"); return; }
    if (action.startsWith("copy:")) {
      navigator.clipboard.writeText(action.slice(5));
      return;
    }
    if (action === "resume") { window.open("/images/SchonHux - Resume.pdf", "_blank"); return; }
    openFile(action);
  }, [openFile]);

  /* keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowPalette((p) => !p);
      }
      if (e.key === "Escape") {
        setShowPalette(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "`") {
        e.preventDefault();
        setShowTerminal((t) => !t);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const renderContent = () => {
    switch (activeFile) {
      case "welcome": return <WelcomeTab onOpen={openFile} />;
      case "about": return <AboutTab />;
      case "experience": return <ExperienceTab />;
      case "proj-betting": return <ProjectBetting />;
      case "proj-insider": return <ProjectInsider />;
      case "proj-landscaping": return <ProjectLandscaping />;
      case "proj-math": return <ProjectMath />;
      case "proj-tetris": return <ProjectTetris />;
      case "skills": return <SkillsTab />;
      case "contact": return <ContactTab />;
      default: return <WelcomeTab onOpen={openFile} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-vsc-bg overflow-hidden">
      {showPalette && <CommandPalette onAction={handlePaletteAction} onClose={() => setShowPalette(false)} />}

      {/* ── Title Bar ── */}
      <div className="flex items-center h-9 bg-vsc-sidebar border-b border-vsc-border px-3 shrink-0 select-none">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-xs text-vsc-text-dim">
          Schon Huxley — Portfolio
        </div>
        <button onClick={() => setShowPalette(true)} className="text-[10px] text-[#888] hover:text-white transition hide-mobile" title="Command Palette (Cmd+K)">
          ⌘K
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Activity Bar ── */}
        <div className="w-12 bg-vsc-sidebar border-r border-vsc-border flex flex-col items-center py-2 gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-8 h-8 rounded flex items-center justify-center text-lg transition ${sidebarOpen ? "text-white bg-vsc-active" : "text-vsc-text-dim hover:text-white"}`}>
            ☰
          </button>
          <button onClick={() => openFile("welcome")}
            className="w-8 h-8 rounded flex items-center justify-center text-sm text-vsc-text-dim hover:text-white transition" title="Home">⌂</button>
          <button onClick={() => setShowPalette(true)}
            className="w-8 h-8 rounded flex items-center justify-center text-sm text-vsc-text-dim hover:text-white transition" title="Command Palette">⌘</button>
          <button onClick={() => setShowTerminal(!showTerminal)}
            className={`w-8 h-8 rounded flex items-center justify-center text-xs transition ${showTerminal ? "text-white bg-vsc-active" : "text-vsc-text-dim hover:text-white"}`} title="Terminal">
            {">_"}
          </button>
          <div className="mt-auto mb-2">
            <Image src="/images/profile.png" alt="Schon" width={28} height={28}
              className="rounded-full border border-[#555] object-cover cursor-pointer" onClick={() => openFile("about")} />
          </div>
        </div>

        {/* ── Sidebar ── */}
        {sidebarOpen && (
          <div className="w-56 bg-vsc-sidebar border-r border-vsc-border overflow-y-auto shrink-0 select-none hide-mobile">
            <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-vsc-text-dim font-semibold">Explorer</div>
            {FILES.map((f) => (
              <div key={f.id} className="relative">
                <button
                  onClick={() => openFile(f.id)}
                  onMouseEnter={() => setHoveredFile(f.id)}
                  onMouseLeave={() => setHoveredFile(null)}
                  className={`w-full text-left px-2 py-[3px] text-[13px] flex items-center gap-2 transition hover:bg-vsc-active ${activeFile === f.id ? "bg-vsc-active text-white" : "text-vsc-text"}`}
                  style={{ paddingLeft: `${f.indent * 16 + 8}px` }}
                >
                  <span className="text-[10px] font-mono shrink-0" style={{ color: f.color }}>{f.icon}</span>
                  <span className="truncate">{f.name}</span>
                  {f.id === "resume" && <span className="ml-auto text-[10px] text-vsc-text-dim">↗</span>}
                </button>
                {hoveredFile === f.id && f.desc && !f.isFolder && (
                  <div className="absolute left-full top-0 ml-2 z-50 bg-[#2d2d2d] border border-[#555] rounded px-3 py-1.5 text-[11px] text-[#ccc] whitespace-nowrap shadow-lg pointer-events-none font-sans">
                    {f.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Editor Area ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="flex h-9 bg-vsc-tab-inactive border-b border-vsc-border overflow-x-auto shrink-0">
            {openTabs.map((id) => (
              <button
                key={id}
                onClick={() => setActiveFile(id)}
                className={`flex items-center gap-2 px-3 h-full text-[13px] border-r border-vsc-border shrink-0 transition ${
                  activeFile === id
                    ? "bg-vsc-tab-active text-white border-t-2 border-t-vsc-accent"
                    : "text-vsc-text-dim hover:bg-vsc-active"
                }`}
              >
                <span className="text-[10px] font-mono" style={{ color: tabColor(id) }}>{tabIcon(id)}</span>
                <span className="max-w-[120px] truncate">{fileName(id)}</span>
                <span onClick={(e) => closeTab(id, e)} className="ml-1 text-[10px] text-vsc-text-dim hover:text-white rounded px-1 hover:bg-[#555] transition">✕</span>
              </button>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="h-6 bg-vsc-bg border-b border-vsc-border px-4 flex items-center text-[11px] text-vsc-text-dim shrink-0">
            <span className="text-vsc-yellow">schon-huxley</span>
            <span className="mx-1 text-[#555]">/</span>
            {activeFile.startsWith("proj-") && <><span className="text-vsc-yellow">projects</span><span className="mx-1 text-[#555]">/</span></>}
            <span className="text-vsc-text">{fileName(activeFile)}</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {renderContent()}
          </div>

          {/* Terminal */}
          {showTerminal && <TerminalPanel onNavigate={openFile} onClose={() => setShowTerminal(false)} />}
        </div>
      </div>

      {/* ── Status Bar ── */}
      <div className="h-6 bg-vsc-accent flex items-center px-3 text-[11px] text-white shrink-0 select-none justify-between">
        <div className="flex items-center gap-4">
          <span>⎇ main</span>
          <span>✓ 0 problems</span>
          <span className="status-link hide-mobile" onClick={() => setShowTerminal(!showTerminal)}>{">_"} Terminal</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="status-link hide-mobile" onClick={() => openFile("experience")}>Open to SWE/SRE Internships</span>
          <a href="/images/SchonHux - Resume.pdf" target="_blank" rel="noopener noreferrer" className="status-link hover:opacity-80">Resume</a>
          <a href="https://www.linkedin.com/in/schon-huxley/" target="_blank" rel="noopener noreferrer" className="status-link hover:opacity-80 hide-mobile">LinkedIn</a>
          <a href="https://github.com/schonhux" target="_blank" rel="noopener noreferrer" className="status-link hover:opacity-80 hide-mobile">GitHub</a>
        </div>
      </div>
    </div>
  );
}
