"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Lock, Search, Sparkles } from "lucide-react";
import { PLACEHOLDER_REPO, type Project } from "@/data/projects";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { rememberHomeSection } from "@/components/HomeScrollRestore";

export const CATEGORY_STYLES: Record<string, string> = {
  "Generative AI": "text-accent/90 bg-accent/10 border-accent/20",
  "Web App": "text-sky-300/90 bg-sky-500/10 border-sky-400/20",
  "Full Stack": "text-violet-300/90 bg-violet-500/10 border-violet-400/20",
  Cybersecurity: "text-rose-300/90 bg-rose-500/10 border-rose-400/20",
  Security: "text-amber-300/90 bg-amber-500/10 border-amber-400/20",
  "Machine Learning": "text-emerald-300/90 bg-emerald-500/10 border-emerald-400/20",
};

export const CATEGORY_RAIL: Record<string, string> = {
  "Generative AI": "bg-accent",
  "Web App": "bg-sky-400",
  "Full Stack": "bg-violet-400",
  Cybersecurity: "bg-rose-400",
  Security: "bg-amber-400",
  "Machine Learning": "bg-emerald-400",
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
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-2xl border bg-panel/70 transition-all duration-300 hover:-translate-y-1 hover:bg-panel hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] group-hover/cards:opacity-45 hover:!opacity-100 ${
        isTopMatch ? "border-accent/50" : "border-line hover:border-accent/30"
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

      {/* Soft top shine — neutral, not tinted */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />

      {/* Category accent rail */}
      <span
        aria-hidden
        className={`absolute bottom-5 left-0 top-5 w-[3px] rounded-full ${rail} opacity-70 transition-opacity group-hover/card:opacity-100`}
      />

      {/* Watermark index */}
      {showIndex && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-3 select-none font-display text-[5.5rem] font-bold leading-none text-fg/[0.06] md:text-[6.5rem]"
        >
          {number}
        </span>
      )}

      <div
        className={`relative flex flex-1 flex-col p-6 pl-7 ${
          fullWidth ? "md:grid md:grid-cols-[1.4fr_1fr] md:gap-10 md:p-8 md:pl-9" : ""
        }`}
      >
        <div className="flex flex-1 flex-col">
          {/* Top row */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              {showIndex && (
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-gray-500">
                  {number}
                </span>
              )}
              <span
                className={`truncate rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                  CATEGORY_STYLES[project.category] ??
                  "border-line bg-page/60 text-muted"
                }`}
              >
                {project.category}
              </span>
            </div>
            {isTopMatch ? (
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] text-gray-300">
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
            className={`mb-2 font-display font-semibold tracking-tight text-fg ${
              fullWidth ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>

          <p className="mb-3 text-sm text-gray-300">
            <span className="text-gray-500">Outcome · </span>
            {project.highlight}
          </p>

          <p
            className={`mb-5 flex-1 text-sm leading-relaxed text-gray-400 ${
              fullWidth ? "line-clamp-4 md:text-[15px] md:leading-7" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
        </div>

        <div
          className={`flex flex-col ${
            fullWidth ? "md:justify-between md:border-l md:border-line md:pl-8" : ""
          }`}
        >
          <div className={`mb-5 flex flex-wrap gap-1.5 ${fullWidth ? "md:mb-0" : ""}`}>
            {visibleTech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-line bg-page/50 px-2.5 py-1 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="rounded-md border border-line bg-page/40 px-2.5 py-1 text-xs text-muted">
                +{extraTech}
              </span>
            )}
          </div>

          <div className="relative z-[2] mt-auto flex flex-wrap items-center gap-3">
            {project.caseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => rememberHomeSection("projects")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-page/70 px-3.5 py-2 text-sm font-medium text-fg transition hover:border-accent/40 hover:bg-accent/10"
              >
                View project
                <BookOpen className="h-4 w-4" />
              </Link>
            ) : isPlaceholder ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                <Lock className="h-4 w-4" />
                Repo coming soon
              </span>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-page/70 px-3.5 py-2 text-sm font-medium text-fg transition hover:border-accent/40 hover:bg-accent/10"
              >
                View project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
              </a>
            )}
            {project.caseStudy && !isPlaceholder && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-fg"
              >
                Repository
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
