"use client";

import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
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
    <Card padding="sm" className="hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-2">{club}</h3>
      <p className="text-sm text-gray-400 mb-4">{role}</p>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </Card>
  );
}

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-6 max-w-[1400px] mx-auto">
      <SectionHeading title="Leadership & Activities" />

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
