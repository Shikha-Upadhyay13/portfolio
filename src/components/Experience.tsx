"use client";

import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Experience</h2>
        <p className="text-gray-400 mt-4">
          Professional experience and industry exposure.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-10">
        {experiences.map((exp, index) => (
          <div key={index} className="p-8 border rounded-xl">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{exp.company}</h3>
              <p className="text-gray-400">{exp.role}</p>
              <p className="text-sm text-gray-500">{exp.duration}</p>
            </div>

            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {exp.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
