"use client";

import Image from "next/image";
import { education } from "@/data/education";
import Reveal from "@/components/ui/Reveal";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Education
        </h2>
      </Reveal>

      <div className="group/edu space-y-8 max-w-3xl mx-auto">
        {education.map((item, index) => (
          <Reveal key={index} direction="up">
            <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-purple-400/50 hover:-translate-y-1 group-hover/edu:opacity-50 hover:!opacity-100">
              <div className="relative w-full h-48 sm:h-auto sm:w-64 shrink-0">
                <Image
                  src={item.image}
                  alt={`${item.institution} campus`}
                  fill
                  sizes="(max-width: 640px) 100vw, 256px"
                  className="object-cover"
                />
              </div>

              <div className="relative flex-1 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-purple-400 to-blue-500" />

                <div className="sm:pl-4">
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                  <p className="text-purple-300">{item.institution}</p>
                  <p className="text-sm text-gray-400 mt-1">{item.score}</p>
                </div>
                <p className="text-sm text-gray-500 shrink-0 sm:pl-4">
                  {item.duration}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
