"use client";

import { featuredProject, otherProjects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Projects</h2>
        <p className="text-gray-400 mt-4">
          Selected work showcasing AI systems, ML models, and full-stack
          applications.
        </p>
      </div>

      {/* Featured Project */}
      <div className="mb-20">
        <div className="glass p-6 rounded-2xl hover-lift transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <h3 className="text-2xl font-semibold mb-4">
            {featuredProject.title}
          </h3>

          <p className="text-gray-400 mb-6">{featuredProject.description}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {featuredProject.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm border rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-6 text-sm">
            <a href={featuredProject.github}>GitHub</a>
            <a href={featuredProject.demo}>Live Demo</a>
          </div>
        </div>
      </div>

      {/* Other Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {otherProjects.map((project, index) => (
          <div key={index} className="p-6 border rounded-xl">
            <h3 className="text-lg font-semibold mb-3">{project.title}</h3>

            <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 text-xs border rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
