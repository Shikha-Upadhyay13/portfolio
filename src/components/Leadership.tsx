"use client";

import Image from "next/image";
import { leadership } from "@/data/leadership";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="border-y border-white/10 bg-[#121218] px-6 py-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          title="Leadership & Activities"
          subtitle="Clubs and campus roles beyond the build track."
          className="!mb-12"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {leadership.map((item, i) => (
            <Reveal
              key={item.club}
              delay={i * 0.05}
              className={item.media ? "sm:col-span-2" : undefined}
            >
              <Card
                padding="sm"
                accentRail={Boolean(item.media)}
                className="h-full !border-white/[0.08] !bg-white/[0.03] !p-5 md:!p-6"
              >
                <div
                  className={
                    item.media
                      ? "flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6"
                      : undefined
                  }
                >
                  <div className="min-w-0 md:max-w-xl">
                    <h3 className="text-lg font-semibold leading-snug">
                      {item.club}
                    </h3>
                    <p className="mt-1 text-sm text-accent/80">{item.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {item.media && (
                    <div className="flex shrink-0 gap-3">
                      {item.media.map((photo) => (
                        <div
                          key={photo.src}
                          className="relative h-28 w-24 overflow-hidden rounded-lg border border-white/10 sm:h-32 sm:w-28"
                        >
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
