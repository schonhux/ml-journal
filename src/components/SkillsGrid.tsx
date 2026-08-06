"use client";

import type React from "react";
import {
  SiRust,
  SiPython,
  SiSharp,
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiRedis,
  SiDuckdb,
  SiLinux,
  SiAmazonwebservices,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiGithubactions,
  SiLangchain,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiAnthropic,
  SiUnity,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiSupabase,
  SiOpentelemetry,
  SiPrometheus,
  SiGrafana,
  SiDatadog,
  SiJira,
  SiConfluence,
  SiRiscv,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure, VscTerminalPowershell } from "react-icons/vsc";
import { TbSql } from "react-icons/tb";
import { motion } from "framer-motion";

type SkillGroup =
  | "Languages"
  | "Systems & Backend"
  | "Cloud & DevOps"
  | "AI & ML"
  | "Databases"
  | "Observability & Tooling"
  | "Hardware";

type Skill = {
  name: string;
  href: string;
  group: SkillGroup;
  Icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  img?: string; // path to a real SVG logo when no react-icon exists
  color?: string;
};

const skills: Skill[] = [
  /* ---------- LANGUAGES ---------- */
  { name: "Rust", href: "https://www.rust-lang.org/", Icon: SiRust, group: "Languages", color: "#DEA584" },
  { name: "Python", href: "https://www.python.org/", Icon: SiPython, group: "Languages", color: "#3776AB" },
  { name: "Java", href: "https://www.java.com/", Icon: FaJava, group: "Languages", color: "#E76F00" },
  { name: "C#", href: "https://learn.microsoft.com/en-us/dotnet/csharp/", Icon: SiSharp, group: "Languages", color: "#68217A" },
  { name: "C / C++", href: "https://isocpp.org/", Icon: SiCplusplus, group: "Languages", color: "#00599C" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/", Icon: SiTypescript, group: "Languages", color: "#3178C6" },
  { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", Icon: SiJavascript, group: "Languages", color: "#F7DF1E" },
  { name: "PowerShell", href: "https://learn.microsoft.com/en-us/powershell/", Icon: VscTerminalPowershell, group: "Languages", color: "#5391FE" },
  { name: "SQL", href: "https://en.wikipedia.org/wiki/SQL", Icon: TbSql, group: "Languages", color: "#E38C00" },

  /* ---------- SYSTEMS & BACKEND ---------- */
  { name: "FastAPI", href: "https://fastapi.tiangolo.com/", Icon: SiFastapi, group: "Systems & Backend", color: "#009688" },
  { name: "React", href: "https://react.dev/", Icon: SiReact, group: "Systems & Backend", color: "#61DAFB" },
  { name: "Next.js", href: "https://nextjs.org/", Icon: SiNextdotjs, group: "Systems & Backend", color: "#FFFFFF" },
  { name: "Redis", href: "https://redis.io/", Icon: SiRedis, group: "Systems & Backend", color: "#FF4438" },
  { name: "DuckDB", href: "https://duckdb.org/", Icon: SiDuckdb, group: "Systems & Backend", color: "#FFF000" },
  { name: "Linux", href: "https://www.kernel.org/", Icon: SiLinux, group: "Systems & Backend", color: "#FCC624" },

  /* ---------- CLOUD & DEVOPS ---------- */
  { name: "Azure", href: "https://azure.microsoft.com/", Icon: VscAzure, group: "Cloud & DevOps", color: "#0078D4" },
  { name: "AWS", href: "https://aws.amazon.com/", Icon: SiAmazonwebservices, group: "Cloud & DevOps", color: "#FF9900" },
  { name: "Docker", href: "https://www.docker.com/", Icon: SiDocker, group: "Cloud & DevOps", color: "#2496ED" },
  { name: "Kubernetes", href: "https://kubernetes.io/", Icon: SiKubernetes, group: "Cloud & DevOps", color: "#326CE5" },
  { name: "Terraform", href: "https://developer.hashicorp.com/terraform", Icon: SiTerraform, group: "Cloud & DevOps", color: "#844FBA" },
  { name: "Ansible", href: "https://www.ansible.com/", Icon: SiAnsible, group: "Cloud & DevOps", color: "#EE0000" },
  { name: "GitHub Actions", href: "https://github.com/features/actions", Icon: SiGithubactions, group: "Cloud & DevOps", color: "#2088FF" },

  /* ---------- AI & ML ---------- */
  { name: "PyTorch", href: "https://pytorch.org/", Icon: SiPytorch, group: "AI & ML", color: "#EE4C2C" },
  { name: "scikit-learn", href: "https://scikit-learn.org/", Icon: SiScikitlearn, group: "AI & ML", color: "#F7931E" },
  { name: "OpenCV", href: "https://opencv.org/", Icon: SiOpencv, group: "AI & ML", color: "#5C3EE8" },
  { name: "LangChain", href: "https://www.langchain.com/", Icon: SiLangchain, group: "AI & ML", color: "#1C3C3C" },
  { name: "LangGraph", href: "https://langchain-ai.github.io/langgraph/", Icon: SiLangchain, group: "AI & ML", color: "#4B8BBE" },
  { name: "MCP", href: "https://modelcontextprotocol.io/", Icon: SiAnthropic, group: "AI & ML", color: "#D97757" },
  { name: "ML-Agents", href: "https://unity.com/products/machine-learning-agents", Icon: SiUnity, group: "AI & ML", color: "#FFFFFF" },

  /* ---------- DATABASES ---------- */
  { name: "PostgreSQL", href: "https://www.postgresql.org/", Icon: SiPostgresql, group: "Databases", color: "#4169E1" },
  { name: "MongoDB", href: "https://www.mongodb.com/", Icon: SiMongodb, group: "Databases", color: "#47A248" },
  { name: "Firebase", href: "https://firebase.google.com/", Icon: SiFirebase, group: "Databases", color: "#FFCA28" },
  { name: "Supabase", href: "https://supabase.com/", Icon: SiSupabase, group: "Databases", color: "#3FCF8E" },

  /* ---------- OBSERVABILITY & TOOLING ---------- */
  { name: "OpenTelemetry", href: "https://opentelemetry.io/", Icon: SiOpentelemetry, group: "Observability & Tooling", color: "#F5A800" },
  { name: "Prometheus", href: "https://prometheus.io/", Icon: SiPrometheus, group: "Observability & Tooling", color: "#E6522C" },
  { name: "Grafana", href: "https://grafana.com/", Icon: SiGrafana, group: "Observability & Tooling", color: "#F46800" },
  { name: "Datadog", href: "https://www.datadoghq.com/", Icon: SiDatadog, group: "Observability & Tooling", color: "#632CA6" },
  { name: "AppDynamics", href: "https://www.appdynamics.com/", img: "/logos/appdynamics.svg", group: "Observability & Tooling" },
  { name: "Jira", href: "https://www.atlassian.com/software/jira", Icon: SiJira, group: "Observability & Tooling", color: "#0052CC" },
  { name: "Confluence", href: "https://www.atlassian.com/software/confluence", Icon: SiConfluence, group: "Observability & Tooling", color: "#2684FF" },

  /* ---------- HARDWARE ---------- */
  { name: "RISC-V", href: "https://riscv.org/", Icon: SiRiscv, group: "Hardware", color: "#8A93A0" },
];

const groups: SkillGroup[] = [
  "Languages",
  "Systems & Backend",
  "Cloud & DevOps",
  "AI & ML",
  "Databases",
  "Observability & Tooling",
  "Hardware",
];

export default function SkillsGrid() {
  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <span className="text-xs text-white/45">click any skill for its docs</span>
      </div>

      {groups.map((group) => {
        const items = skills.filter((s) => s.group === group);
        if (!items.length) return null;

        return (
          <div key={group}>
            <div className="mb-3 text-sm font-semibold text-white/80">{group}</div>

            <div className="skill-grid grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {items.map(({ name, href, Icon, img, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  whileHover={{ y: -6, scale: 1.07 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18, mass: 0.5 }}
                  className="group relative flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm
                             hover:border-white/25 hover:bg-white/10"
                  style={{ ["--tile" as string]: color ?? "#7D3CC9" }}
                >
                  {/* Animated glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(60% 60% at 50% 40%, var(--tile) 0%, transparent 70%)`,
                    }}
                  />
                  {/* accent ring on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 1px var(--tile)` }}
                  />

                  {/* icon */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {Icon ? (
                      <Icon className="h-9 w-9 drop-shadow-sm" style={{ color }} />
                    ) : img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={name} className="h-9 w-9 drop-shadow-sm" />
                    ) : null}
                  </motion.div>

                  {/* tooltip */}
                  <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
                    <div className="whitespace-nowrap rounded-md border border-white/15 bg-black/80 px-2 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                      {name}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
