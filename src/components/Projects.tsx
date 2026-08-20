"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";

const featured = projects.filter((p) => p.featured);

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-8 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Projects"
        subtitle="Practical AI systems and applications, not just experiments."
      />

      {/* Flagship cards span both columns. Sibling cards dim on hover so the
          focused one stands out. */}
      <div className="group/cards grid md:grid-cols-2 gap-6">
        {featured.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            showFeaturedBadge={false}
            fullWidth
          />
        ))}
      </div>

      <Reveal delay={0.15} className="mt-12 flex justify-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass accent-border text-sm font-medium text-gray-200 hover:text-white transition group"
        >
          View all {projects.length} projects
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}
