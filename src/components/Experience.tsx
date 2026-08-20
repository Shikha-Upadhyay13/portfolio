"use client";

import { Award } from "lucide-react";
import { experiences } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Experience() {
  const openCertificate = (id: string) => {
    window.dispatchEvent(new CustomEvent("open-certificate", { detail: { id } }));
  };

  return (
    <section id="experience" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading
        title="Experience"
        subtitle="Professional experience and industry exposure."
      />

      {/* Experience timeline */}
      <div className="group/exp space-y-8">
        {experiences.map((exp, index) => (
          <Reveal key={index} direction="up">
            <Card
              accentRail
              padding="md"
              className="group-hover/exp:opacity-50 hover:!opacity-100"
            >
              <div className="pl-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <p className="text-accent">{exp.role}</p>
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  </div>

                  {exp.certificateId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openCertificate(exp.certificateId!)}
                      className="shrink-0"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Certificate
                    </Button>
                  )}
                </div>

                <ul className="space-y-2 text-gray-400">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-1">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
