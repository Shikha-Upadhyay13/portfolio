"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Lock, Search, Sparkles } from "lucide-react";
import { PLACEHOLDER_REPO, type Project } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { rememberHomeSection } from "@/components/HomeScrollRestore";

export const CATEGORY_STYLES: Record<string, string> = {
  "Generative AI": "text-accent/80 bg-accent/10 border-accent/20",
  "Web App": "text-sky-300/80 bg-sky-500/10 border-sky-400/20",
  "Full Stack": "text-violet-300/80 bg-violet-500/10 border-violet-400/20",
  Cybersecurity: "text-rose-300/80 bg-rose-500/10 border-rose-400/20",
  Security: "text-amber-300/80 bg-amber-500/10 border-amber-400/20",
  "Machine Learning": "text-emerald-300/80 bg-emerald-500/10 border-emerald-400/20",
};

export const CATEGORY_RAIL: Record<string, string> = {
  "Generative AI": "bg-accent",
  "Web App": "bg-sky-400",
  "Full Stack": "bg-violet-400",
  Cybersecurity: "bg-rose-400",
  Security: "bg-amber-400",
  "Machine Learning": "bg-emerald-400",
};

const CATEGORY_GLOW: Record<string, string> = {
  "Generative AI": "group-hover/card:shadow-[0_0_40px_-12px_rgba(71,241,255,0.35)]",
  "Web App": "group-hover/card:shadow-[0_0_40px_-12px_rgba(56,189,248,0.3)]",
  "Full Stack": "group-hover/card:shadow-[0_0_40px_-12px_rgba(167,139,250,0.3)]",
  Cybersecurity: "group-hover/card:shadow-[0_0_40px_-12px_rgba(251,113,133,0.3)]",
  Security: "group-hover/card:shadow-[0_0_40px_-12px_rgba(251,191,36,0.28)]",
  "Machine Learning":
    "group-hover/card:shadow-[0_0_40px_-12px_rgba(52,211,153,0.3)]",
};

const MAX_TECH = 5;

export default function ProjectCard({
  project,
  index = 0,
  isTopMatch = false,
  isDimmed = false,
  showFeaturedBadge = true,
  fullWidth = false,
  showIndex = false,
}: {
  project: Project;
  index?: number;
  isTopMatch?: boolean;
  isDimmed?: boolean;
  showFeaturedBadge?: boolean;
  /** Spans both grid columns — used for the home flagship card only. */
  fullWidth?: boolean;
  /** Show 01 / 02 style index (home featured grid). */
  showIndex?: boolean;
}) {
  const isPlaceholder = project.github.startsWith(PLACEHOLDER_REPO);
  const rail = CATEGORY_RAIL[project.category] ?? "bg-accent";
  const glow = CATEGORY_GLOW[project.category] ?? CATEGORY_GLOW["Generative AI"];
  const number = String(index + 1).padStart(2, "0");
  const visibleTech = project.tech.slice(0, MAX_TECH);
  const extraTech = project.tech.length - visibleTech.length;
  const primaryHref = project.caseStudy
    ? `/projects/${project.slug}`
    : isPlaceholder
      ? null
      : project.github;
  const primaryExternal = Boolean(primaryHref?.startsWith("http"));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.07,
        ease: EASE_OUT_EXPO,
        layout: { duration: 0.4, ease: EASE_OUT_EXPO },
      }}
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] border transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:bg-white/[0.05] group-hover/cards:opacity-40 hover:!opacity-100 ${glow} ${
        isTopMatch ? "border-accent/60" : "border-white/10"
      } ${isDimmed ? "opacity-30 saturate-50" : ""} ${
        fullWidth ? "md:col-span-2" : ""
      } ${primaryHref ? "cursor-pointer" : ""}`}
    >
      {/* Stretched hit target — whole card is the primary CTA */}
      {primaryHref &&
        (primaryExternal ? (
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-[1]"
            aria-label={`Open ${project.title}`}
          />
        ) : (
          <Link
            href={primaryHref}
            onClick={() => rememberHomeSection("projects")}
            className="absolute inset-0 z-[1]"
            aria-label={`Open ${project.title}`}
          />
        ))}
      {/* Soft category wash */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent`}
      />

      {/* Category accent rail */}
      <span
        aria-hidden
        className={`absolute left-0 top-0 bottom-0 w-[3px] ${rail} opacity-70 group-hover/card:opacity-100 transition-opacity`}
      />

      {/* Watermark index */}
      {showIndex && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-3 font-display text-[5.5rem] font-bold leading-none text-white/[0.035] select-none md:text-[6.5rem]"
        >
          {number}
        </span>
      )}

      <div
        className={`relative flex flex-1 flex-col p-6 pl-7 ${
          fullWidth ? "md:flex-row md:items-stretch md:gap-10 md:p-8 md:pl-9" : ""
        }`}
      >
        <div className={`flex flex-1 flex-col ${fullWidth ? "md:max-w-[62%]" : ""}`}>
          {/* Top row */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              {showIndex && (
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-gray-500">
                  {number}
                </span>
              )}
              <span
                className={`truncate rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-wider ${
                  CATEGORY_STYLES[project.category] ??
                  "border-accent/20 bg-accent/10 text-accent/80"
                }`}
              >
                {project.category}
              </span>
            </div>
            {isTopMatch ? (
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-accent">
                <Search className="h-3.5 w-3.5" />
                Best match
              </span>
            ) : (
              showFeaturedBadge &&
              project.featured && (
                <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-amber-300/90">
                  <Sparkles className="h-3.5 w-3.5" />
                  Featured
                </span>
              )
            )}
          </div>

          <h3
            className={`mb-2 font-display font-semibold ${
              fullWidth ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>

          <p className="mb-3 text-sm text-accent/80">→ {project.highlight}</p>

          <p
            className={`mb-5 flex-1 text-sm leading-relaxed text-gray-400 ${
              fullWidth ? "line-clamp-4 md:text-[15px]" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-500">
                +{extraTech}
              </span>
            )}
          </div>

          <div className="relative z-[2] mt-auto flex flex-wrap items-center gap-3">
            {project.caseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => rememberHomeSection("projects")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
              >
                View project
                <BookOpen className="h-4 w-4" />
              </Link>
            ) : isPlaceholder ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                Repo coming soon
              </span>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition hover:bg-accent/20"
              >
                View project
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.caseStudy && !isPlaceholder && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-400 transition hover:text-white"
              >
                Repository
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Flagship aside — highlight + stack, keeps height intentional */}
        {fullWidth && (
          <aside
            aria-hidden
            className="mt-6 hidden min-h-[160px] flex-1 flex-col justify-between rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-transparent p-6 md:mt-0 md:flex"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
                Flagship
              </p>
              <p className="mt-3 font-display text-lg font-medium leading-snug text-gray-200">
                {project.highlight}
              </p>
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-gray-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-display text-5xl font-bold leading-none text-white/[0.08]">
                {number}
              </span>
            </div>
          </aside>
        )}
      </div>
    </motion.div>
  );
}
