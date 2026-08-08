"use client";

import Image from "next/image";
import { certifications } from "@/data/certifications";
import Reveal from "@/components/ui/Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Certifications
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Courses, simulations, and programs I've completed along the way.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 3) * 0.05}>
            <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-purple-400/50 hover:-translate-y-1">
              <div className="relative aspect-[4/3] bg-[#0c0c10]">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-contain"
                />
              </div>

              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="text-base font-semibold leading-snug">{cert.title}</h3>
                <p className="text-sm accent-text font-medium">{cert.issuer}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {cert.date}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mt-1">
                  {cert.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
