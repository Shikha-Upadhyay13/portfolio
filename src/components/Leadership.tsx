"use client";

import Image from "next/image";
import { leadership, leadershipPhotos } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";

export default function Leadership() {
  return (
    <section id="leadership" className="py-16 px-6 max-w-[1400px] mx-auto">
      {/* Section header: title on the left, a photo strip on the right */}
      <div className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <Reveal className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold accent-text">
            Leadership & Activities
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center md:justify-end gap-3">
          {leadershipPhotos.map((photo) => (
            <div
              key={photo.src}
              className="relative w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shrink-0 transition-transform duration-300 hover:-translate-y-1"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 30vw, 144px"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      </div>

      <div className="group/lead space-y-16">
        {leadership.map((item, index) => (
          <Reveal
            key={index}
            direction={index % 2 === 0 ? "right" : "left"}
            className={`max-w-xl ${index % 2 === 0 ? "mr-auto" : "ml-auto"}`}
          >
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-purple-400/50 hover:-translate-y-1 hover:shadow-lg group-hover/lead:opacity-50 hover:!opacity-100">
              <h3 className="text-lg font-semibold mb-2">{item.club}</h3>

              <p className="text-sm text-gray-400 mb-4">{item.role}</p>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
