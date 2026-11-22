"use client";

import { useState } from "react";
import { Award, ChevronDown } from "lucide-react";
import { experiences } from "@/data/experience";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const openCertificate = (id: string) => {
    window.dispatchEvent(
      new CustomEvent("open-certificate", { detail: { id } })
    );
  };

  return (
    <section id="experience" className="mx-auto max-w-[1400px] px-6 py-24">
      <SectionHeading
        title="Experience"
        subtitle="Click a role to expand the details."
      />

      <div className="group/exp space-y-4">
        {experiences.map((exp, index) => {
          const isOpen = openIndex === index;

          return (
            <Reveal key={index} direction="up">
              <Card
                accentRail
                padding="md"
                className={`group-hover/exp:opacity-50 hover:!opacity-100 transition-opacity ${
                  isOpen ? "border-accent/30" : ""
                }`}
              >
                <div className="pl-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <div className="min-w-0">
                      <h3 className="text-xl font-semibold">{exp.company}</h3>
                      <p className="text-accent">{exp.role}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      {!isOpen && (
                        <p className="mt-2 line-clamp-1 text-sm text-gray-500">
                          {exp.description[0]}
                        </p>
                      )}
                    </div>

                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition ${
                        isOpen
                          ? "border-accent/40 text-accent rotate-180"
                          : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4">
                        {exp.certificateId && (
                          <div className="mb-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                openCertificate(exp.certificateId!)
                              }
                              className="shrink-0"
                            >
                              <Award className="h-3.5 w-3.5" />
                              Certificate
                            </Button>
                          </div>
                        )}

                        <ul className="space-y-2 text-gray-400">
                          {exp.description.map((point, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 text-accent">▹</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
