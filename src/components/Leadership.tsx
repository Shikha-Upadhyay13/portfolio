"use client";

import Image from "next/image";
import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";

function ClubCard({
  club,
  role,
  description,
}: {
  club: string;
  role: string;
  description: string;
}) {
  return (
    <div className="border border-white/10 rounded-xl p-6 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-[#47F1FF]/50 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{club}</h3>
      <p className="text-sm text-gray-400 mb-4">{role}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="py-16 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Leadership & Activities
        </h2>
      </Reveal>

      <div className="group/lead space-y-16">
        {leadership.map((item, index) => {
          const cardOnLeft = index % 2 === 0;

          if (!item.photo) {
            return (
              <Reveal
                key={index}
                direction={cardOnLeft ? "right" : "left"}
                className={`max-w-xl ${cardOnLeft ? "mr-auto" : "ml-auto"}`}
              >
                <div className="group-hover/lead:opacity-50 hover:!opacity-100 transition-opacity">
                  <ClubCard {...item} />
                </div>
              </Reveal>
            );
          }

          return (
            <div key={index} className="grid md:grid-cols-2 items-center gap-8 md:gap-16">
              <Reveal
                direction={cardOnLeft ? "right" : "left"}
                className={cardOnLeft ? "md:order-1" : "md:order-2"}
              >
                <div className="group-hover/lead:opacity-50 hover:!opacity-100 transition-opacity">
                  <ClubCard {...item} />
                </div>
              </Reveal>

              <Reveal
                direction={cardOnLeft ? "left" : "right"}
                delay={0.1}
                className={`hidden md:flex ${cardOnLeft ? "md:order-2 justify-start" : "md:order-1 justify-end"}`}
              >
                <div className="relative w-full max-w-md aspect-[4/5]">
                  <div
                    aria-hidden
                    className="absolute -inset-8 -z-10 bg-[#47F1FF]/12 blur-3xl rounded-full"
                  />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-[1.03]">
                    <Image
                      src={item.photo.src}
                      alt={item.photo.alt}
                      fill
                      sizes="(max-width: 768px) 0px, 448px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
