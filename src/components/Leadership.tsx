"use client";

import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";
import MediaFilmstrip from "@/components/ui/MediaFilmstrip";

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

          return (
            <div key={index} className={item.media ? "space-y-8" : undefined}>
              <Reveal
                direction={cardOnLeft ? "right" : "left"}
                className={`max-w-xl ${cardOnLeft ? "mr-auto" : "ml-auto"}`}
              >
                <div className="group-hover/lead:opacity-50 hover:!opacity-100 transition-opacity">
                  <ClubCard {...item} />
                </div>
              </Reveal>

              {/* Photos live with the club they actually belong to, shown as a
                  scattered strip rather than forced beside unrelated cards. */}
              {item.media && (
                <Reveal delay={0.1}>
                  <MediaFilmstrip items={item.media} center />
                </Reveal>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
