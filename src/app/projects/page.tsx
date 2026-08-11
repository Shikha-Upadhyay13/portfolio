"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/data/projects";

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

const CATEGORIES = ["All", ...new Set(projects.map((p) => p.category))];

export default function ProjectsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();
  const hasQuery = trimmed.length > 0;

  const inCategory = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  const ranked = useMemo(() => {
    if (!hasQuery) return inCategory.map((project) => ({ project, score: 0 }));
    return [...inCategory]
      .map((project) => ({ project, score: scoreProject(project, trimmed) }))
      .sort((a, b) => b.score - a.score);
  }, [inCategory, hasQuery, trimmed]);

  const matchCount = ranked.filter((r) => r.score > 0).length;
  const topScore = Math.max(0, ...ranked.map((r) => r.score));

  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <Reveal>
          <h1 className="text-3xl md:text-4xl font-semibold accent-text">
            All Projects
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl">
            {projects.length} projects across {CATEGORIES.length - 1}{" "}
            categories — search ranks them live, like a lightweight
            retrieval pass.
          </p>
        </Reveal>

        {/* Category filter pills */}
        <Reveal delay={0.05} className="flex flex-wrap gap-2 mt-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                category === c
                  ? "border-[#47F1FF]/60 bg-[#47F1FF]/15 text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {/* Search */}
        <Reveal delay={0.08} className="max-w-lg mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects — try “security” or “chatbot”"
              className="glass w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-1 focus:ring-[#47F1FF]/50 placeholder:text-gray-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 h-4">
            {hasQuery &&
              (matchCount > 0
                ? `${matchCount} match${matchCount === 1 ? "" : "es"}, ranked by relevance`
                : "No matches — try a different word")}
          </p>
        </Reveal>

        <div className="group/cards grid md:grid-cols-2 gap-6 mt-8">
          {ranked.map(({ project, score }, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isTopMatch={hasQuery && score > 0 && score === topScore}
              isDimmed={hasQuery && score === 0}
            />
          ))}
        </div>

        {ranked.length === 0 && (
          <p className="text-gray-500 text-sm mt-8">
            No projects in this category.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
