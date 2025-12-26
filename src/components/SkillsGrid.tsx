"use client";

import type React from "react";
import {
  SiPython,
  SiCplusplus,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiDotnet,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiDatadog,
  SiApachekafka,
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { FaDatabase, FaCloud, FaJava } from "react-icons/fa";

/* ✅ GROUP NAMES (AS REQUESTED) */
type SkillGroup = "Languages" | "ML & Modeling" | "Backend" | "DevOps" | "Observability";

type Skill = {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  group: SkillGroup;
  color: string; // brand color
};

const skills: Skill[] = [
  /* ---------- LANGUAGES ---------- */
  { name: "Python", href: "https://www.python.org/", Icon: SiPython, group: "Languages", color: "#3776AB" },
  { name: "C / C++", href: "https://en.wikipedia.org/wiki/C%2B%2B", Icon: SiCplusplus, group: "Languages", color: "#00599C" },
  { name: "Java", href: "https://www.oracle.com/java/", Icon: FaJava, group: "Languages", color: "#E76F00" },
  { name: "C# / .NET", href: "https://learn.microsoft.com/en-us/dotnet/", Icon: SiDotnet, group: "Languages", color: "#512BD4" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/", Icon: SiTypescript, group: "Languages", color: "#3178C6" },
  { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", Icon: SiJavascript, group: "Languages", color: "#F7DF1E" },
  { name: "React", href: "https://react.dev/", Icon: SiReact, group: "Languages", color: "#61DAFB" },
  { name: "Node.js", href: "https://nodejs.org/", Icon: SiNodedotjs, group: "Languages", color: "#339933" },
  { name: "Next.js", href: "https://nextjs.org/", Icon: SiNextdotjs, group: "Languages", color: "#FFFFFF" },
  { name: "SQL", href: "https://learn.microsoft.com/en-us/sql/", Icon: FaDatabase, group: "Languages", color: "#4B8BBE" },

  /* ---------- ML ---------- */
  { name: "PyTorch", href: "https://pytorch.org/", Icon: SiPytorch, group: "ML & Modeling", color: "#EE4C2C" },
  { name: "scikit-learn", href: "https://scikit-learn.org/", Icon: SiScikitlearn, group: "ML & Modeling", color: "#F7931E" },

  /* ---------- BACKEND ---------- */
  { name: "FastAPI", href: "https://fastapi.tiangolo.com/", Icon: SiFastapi, group: "Backend", color: "#009688" },
  { name: "Kafka", href: "https://kafka.apache.org/", Icon: SiApachekafka, group: "Backend", color: "#FFFFFF" },
  { name: "Redis", href: "https://redis.io/", Icon: SiRedis, group: "Backend", color: "#DC382D" },
  { name: "PostgreSQL", href: "https://www.postgresql.org/", Icon: SiPostgresql, group: "Backend", color: "#4169E1" },

  /* ---------- DEVOPS ---------- */
  { name: "Azure", href: "https://azure.microsoft.com/", Icon: FaCloud, group: "DevOps", color: "#0078D4" },
  { name: "Docker", href: "https://www.docker.com/", Icon: SiDocker, group: "DevOps", color: "#2496ED" },
  { name: "Kubernetes", href: "https://kubernetes.io/", Icon: SiKubernetes, group: "DevOps", color: "#326CE5" },
  { name: "Linux", href: "https://www.kernel.org/", Icon: SiLinux, group: "DevOps", color: "#FCC624" },
  { name: "GitHub Actions", href: "https://github.com/features/actions", Icon: SiGithubactions, group: "DevOps", color: "#2088FF" },

  /* ---------- OBSERVABILITY ---------- */
  { name: "Git", href: "https://git-scm.com/", Icon: SiGit, group: "Observability", color: "#F05032" },
  { name: "GitHub", href: "https://github.com/", Icon: SiGithub, group: "Observability", color: "#FFFFFF" },
  { name: "Prometheus", href: "https://prometheus.io/", Icon: SiPrometheus, group: "Observability", color: "#E6522C" },
  { name: "Grafana", href: "https://grafana.com/", Icon: SiGrafana, group: "Observability", color: "#F46800" },
  { name: "Datadog", href: "https://www.datadoghq.com/", Icon: SiDatadog, group: "Observability", color: "#632CA6" },
];

const groups: SkillGroup[] = ["Languages", "ML & Modeling", "Backend", "DevOps", "Observability"];

export default function SkillsGrid() {
  return (
    <div className="space-y-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
      </div>

      {groups.map((group) => {
        const items = skills.filter((s) => s.group === group);
        if (!items.length) return null;

        return (
          <div key={group}>
            <div className="mb-3 text-sm font-semibold text-white/80">{group}</div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {items.map(({ name, href, Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group relative rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition
                             hover:border-white/25 hover:bg-white/10"
                >
                  {/* Animated glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 blur-xl transition duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(60% 60% at 50% 40%, ${color} 0%, transparent 70%)`,
                    }}
                  />

                  {/* lift + brand color */}
                  <div className="relative flex items-center justify-center transition duration-300 group-hover:-translate-y-0.5">
                    <Icon className="h-9 w-9 drop-shadow-sm transition duration-300" style={{ color }} />
                  </div>

                  {/* tooltip */}
                  <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 transition group-hover:opacity-100">
                    <div className="rounded-md border border-white/15 bg-black/70 px-2 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                      {name}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
