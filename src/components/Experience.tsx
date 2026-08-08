"use client";

import { Award } from "lucide-react";
import { experiences } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";

export default function Experience() {
  const openCertificate = (id: string) => {
    window.dispatchEvent(new CustomEvent("open-certificate", { detail: { id } }));
  };

  return (
    <section id="experience" className="py-24 px-6 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <Reveal className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Experience
        </h2>
        <p className="text-gray-400 mt-4">
          Professional experience and industry exposure.
        </p>
      </Reveal>

      {/* Experience timeline */}
      <div className="group/exp space-y-8">
        {experiences.map((exp, index) => (
          <Reveal key={index} direction="up">
            <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-[#47F1FF]/50 hover:-translate-y-1 group-hover/exp:opacity-50 hover:!opacity-100">
              {/* Accent rail */}
              <span className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-[#47F1FF]" />

              <div className="pl-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <p className="text-[#47F1FF]">{exp.role}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>

                  {exp.certificateId && (
                    <button
                      onClick={() => openCertificate(exp.certificateId!)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full glass accent-border text-gray-300 hover:text-white transition shrink-0"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Certificate
                    </button>
                  )}
                </div>

                <ul className="space-y-2 text-gray-400">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#47F1FF] mt-1">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
