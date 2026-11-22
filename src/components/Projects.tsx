"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { rememberHomeSection } from "@/components/HomeScrollRestore";

const featured = projects.filter((p) => p.featured);
const [flagship, ...rest] = featured;

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24 md:px-8"
    >
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal className="mb-12 md:mb-14">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                Selected work
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Projects
              </h2>
              <p className="mt-2.5 max-w-lg text-sm text-gray-400 md:text-base">
                {featured.length} featured builds · 30+ repos on GitHub
              </p>
            </div>
            <a
              href="https://github.com/Shikha-Upadhyay13?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-gray-300 transition hover:border-white/25 hover:text-white"
            >
              All repositories
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="group/cards grid auto-rows-fr gap-5 md:grid-cols-2 md:gap-6">
          {flagship && (
            <ProjectCard
              project={flagship}
              index={0}
              showFeaturedBadge={false}
              showIndex
              fullWidth
            />
          )}

          {rest.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 1}
              showFeaturedBadge={false}
              showIndex
            />
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10 flex justify-center">
          <Link
            href="/projects"
            onClick={() => rememberHomeSection("projects")}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          >
            View all {projects.length} listed projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
