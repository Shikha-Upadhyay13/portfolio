"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { projects, PLACEHOLDER_REPO } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";

const CATEGORY_STYLES: Record<string, string> = {
  "Generative AI": "text-[#47F1FF]/80 bg-[#47F1FF]/10 border-[#47F1FF]/20",
  "Web App": "text-sky-300/80 bg-sky-500/10 border-sky-400/20",
  Security: "text-amber-300/80 bg-amber-500/10 border-amber-400/20",
  "Machine Learning": "text-emerald-300/80 bg-emerald-500/10 border-emerald-400/20",
};

export default function Projects() {
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

      {/* Bento grid — featured projects span both columns. Sibling cards dim
          on hover so the focused one stands out. */}
      <div className="group/cards grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const isPlaceholder = project.github.startsWith(PLACEHOLDER_REPO);

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (index % 2) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group/card relative flex flex-col p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-[#47F1FF]/60 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_-20px_rgba(71,241,255,0.35)] group-hover/cards:opacity-50 hover:!opacity-100 ${
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
                {project.featured && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-300/90">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured
                  </span>
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
