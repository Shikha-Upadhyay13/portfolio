"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { hobbies } from "@/data/hobbies";

/** Alternating tilts so the filmstrip reads like scattered printed photos, not a grid. */
const TILTS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1", "rotate-1"];

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Hobbies & Passion
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Life beyond the terminal — the pursuits that keep me curious and grounded.
        </p>
      </Reveal>

      <div className="space-y-20">
        {hobbies.map((hobby) => (
          <div key={hobby.title} className="space-y-8">
            <Reveal className="max-w-2xl mx-auto text-center space-y-3">
              <h3 className="text-2xl font-semibold">{hobby.title}</h3>
              <p className="accent-text font-medium text-sm uppercase tracking-wide">
                {hobby.tagline}
              </p>
              <p className="text-gray-300 leading-relaxed">{hobby.description}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-6 overflow-x-auto no-scrollbar fade-x py-8 px-4 snap-x snap-mandatory">
                {hobby.photos.map((photo, i) => (
                  <div
                    key={photo.src}
                    className={`relative shrink-0 w-48 h-60 sm:w-56 sm:h-72 snap-center rounded-sm overflow-hidden border-4 border-white/95 bg-white shadow-xl shadow-black/50 transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-105 hover:z-10 ${TILTS[i % TILTS.length]}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 60vw, 224px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
