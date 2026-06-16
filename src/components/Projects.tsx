"use client";

import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16 accent-text">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400 transition duration-300 hover:translate-y-[-4px]"
          >
            {/* Title */}
            <h3 className="text-xl font-semibold mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Github Link */}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm accent-text hover:underline"
            >
              View Repository →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}