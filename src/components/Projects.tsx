"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Search, Sparkles } from "lucide-react";
import { projects, PLACEHOLDER_REPO, type Project } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";

const CATEGORY_STYLES: Record<string, string> = {
  "Generative AI": "text-[#47F1FF]/80 bg-[#47F1FF]/10 border-[#47F1FF]/20",
  "Web App": "text-sky-300/80 bg-sky-500/10 border-sky-400/20",
  Security: "text-amber-300/80 bg-amber-500/10 border-amber-400/20",
  "Machine Learning": "text-emerald-300/80 bg-emerald-500/10 border-emerald-400/20",
};

// Query expansion so a search feels like retrieval rather than plain
// substring matching — a small, honest stand-in for embedding similarity,
// not a real model. Loosely mirrors how a RAG pipeline widens a query.
const QUERY_EXPANSIONS: Record<string, string[]> = {
  chatbot: ["rag", "llm", "conversational", "agent"],
  ai: ["llm", "rag", "generative", "agent", "ml"],
  security: ["password", "vault", "credential", "secure"],
  game: ["dom", "interactive", "javascript"],
  data: ["classification", "pandas", "ml"],
  image: ["pillow", "flask", "compress"],
  web: ["react", "html", "css", "flask"],
  math: ["formula", "solver", "reasoning"],
  video: ["multimodal", "audio"],
};

function projectText(project: Project) {
  return [
    project.title,
    project.description,
    project.highlight,
    project.category,
    ...project.tech,
  ]
    .join(" ")
    .toLowerCase();
}

/** Lightweight relevance score: direct term hits plus expanded-term hits. */
function scoreProject(project: Project, query: string) {
  const haystack = projectText(project);
  const terms = query.split(/\s+/).filter(Boolean);
  let score = 0;

  for (const term of terms) {
    if (haystack.includes(term)) score += 3;
    for (const expansion of QUERY_EXPANSIONS[term] ?? []) {
      if (haystack.includes(expansion)) score += 1;
    }
  }

  return score;
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();
  const hasQuery = trimmed.length > 0;

  const ranked = useMemo(() => {
    if (!hasQuery) return projects.map((project) => ({ project, score: 0 }));
    return [...projects]
      .map((project) => ({ project, score: scoreProject(project, trimmed) }))
      .sort((a, b) => b.score - a.score);
  }, [hasQuery, trimmed]);

  const matchCount = ranked.filter((r) => r.score > 0).length;
  const topScore = Math.max(0, ...ranked.map((r) => r.score));

  return (
    <section id="projects" className="py-24 px-8 max-w-[1400px] mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Projects
        </h2>
        <p className="text-gray-400 mt-4">
          Practical AI systems and applications, not just experiments.
        </p>
      </Reveal>

      {/* Live retrieval-style search — ranks & highlights cards by relevance
          as you type, a small hands-on echo of the RAG systems described below. */}
      <Reveal delay={0.05} className="max-w-lg mx-auto mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects — try “security” or “chatbot”"
            className="glass w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#47F1FF]/50 placeholder:text-gray-500"
          />
        </div>
      </Reveal>
      <p className="text-xs text-gray-500 text-center mb-12 h-4">
        {hasQuery &&
          (matchCount > 0
            ? `${matchCount} match${matchCount === 1 ? "" : "es"}, ranked by relevance — like a lightweight retrieval pass`
            : "No matches — try a different word")}
      </p>

      {/* Bento grid — featured projects span both columns. Sibling cards dim
          on hover so the focused one stands out; a search query re-ranks and
          highlights cards live via framer-motion's layout animation. */}
      <div className="group/cards grid md:grid-cols-2 gap-6">
        {ranked.map(({ project, score }, index) => {
          const isPlaceholder = project.github.startsWith(PLACEHOLDER_REPO);
          const isTopMatch = hasQuery && score > 0 && score === topScore;
          const isDimmed = hasQuery && score === 0;

          return (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (index % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
                layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              className={`group/card relative flex flex-col p-6 rounded-2xl bg-white/5 backdrop-blur-xl border transition-all duration-300 hover:border-[#47F1FF]/60 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_-20px_rgba(71,241,255,0.35)] group-hover/cards:opacity-50 hover:!opacity-100 ${
                isTopMatch
                  ? "border-[#47F1FF]/70 shadow-[0_20px_60px_-20px_rgba(71,241,255,0.4)]"
                  : "border-white/10"
              } ${isDimmed ? "opacity-30 saturate-50" : ""} ${
                project.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Top row: category + featured marker */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    CATEGORY_STYLES[project.category] ??
                    "text-[#47F1FF]/80 bg-[#47F1FF]/10 border-[#47F1FF]/20"
                  }`}
                >
                  {project.category}
                </span>
                {isTopMatch ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#47F1FF]">
                    <Search className="w-3.5 h-3.5" />
                    Best match
                  </span>
                ) : (
                  project.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/90">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured
                    </span>
                  )
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

              {/* Highlight / outcome chip */}
              <p className="text-sm text-[#47F1FF]/80 mb-3">
                → {project.highlight}
              </p>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-5 leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              {isPlaceholder ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  Repo coming soon
                </span>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[#47F1FF] hover:text-[#8AF6FF] font-medium group-hover/card:gap-2 transition-all"
                >
                  View Repository
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
