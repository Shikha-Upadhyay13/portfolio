"use client";

import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";

export default function Leadership() {
  return (
    <section id="leadership" className="py-16 px-6 max-w-6xl mx-auto">
      {/* Section Title */}
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Leadership & Activities
        </h2>
      </Reveal>

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
