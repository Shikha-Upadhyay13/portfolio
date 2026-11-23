"use client";

import Image from "next/image";
import type { MediaItem } from "@/types/media";

const TILTS = [
  "-rotate-3",
  "rotate-2",
  "-rotate-2",
  "rotate-3",
  "-rotate-1",
  "rotate-1",
];

const FRAME: Record<"classic" | "soft", string> = {
  classic:
    "rounded-lg border-4 border-white/95 bg-white shadow-xl shadow-black/50",
  soft: "rounded-lg bg-transparent shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent-1)_18%,transparent),0_12px_28px_-12px_color-mix(in_srgb,var(--accent-1)_28%,transparent)]",
};

function MediaFrame({ item, className }: { item: MediaItem; className: string }) {
  if (item.type === "video") {
    return (
      <video
        className={className}
        controls
        muted
        loop
        playsInline
        preload="none"
        poster={item.poster}
        aria-label={item.alt}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }
  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes="(max-width: 640px) 60vw, 224px"
      className={className}
    />
  );
}

/**
 * Filmstrip for media items.
 * `classic` = white frame + tilt (hackathons); `soft` = straight brown halo (hobbies).
 * `neon` aliases `classic`.
 */
export default function MediaFilmstrip({
  items,
  center = false,
  variant = "classic",
}: {
  items: MediaItem[];
  center?: boolean;
  variant?: "classic" | "neon" | "soft";
}) {
  const style = variant === "soft" ? "soft" : "classic";
  const frame = FRAME[style];
  const mediaBg = style === "soft" ? "bg-page" : "bg-black";
  const tilted = style === "classic";

  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="flex justify-center">
        <div className={`relative aspect-video w-full max-w-lg overflow-hidden ${frame}`}>
          {item.type === "video" ? (
            <video
              className={`h-full w-full object-contain ${mediaBg}`}
              controls
              muted
              loop
              playsInline
              preload="none"
              poster={item.poster}
              aria-label={item.alt}
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 90vw, 512px"
              className={`object-contain ${mediaBg}`}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`no-scrollbar fade-x flex gap-6 overflow-x-auto px-4 py-8 snap-x snap-mandatory ${
        center ? "justify-center" : ""
      }`}
    >
      {items.map((item, i) => (
        <div
          key={item.src}
          className={`relative h-60 w-48 shrink-0 snap-center overflow-hidden transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-105 hover:z-10 sm:h-72 sm:w-56 ${frame} ${
            tilted ? TILTS[i % TILTS.length] : "rotate-0"
          }`}
        >
          <MediaFrame
            item={item}
            className={
              item.type === "video"
                ? `h-full w-full object-cover ${mediaBg}`
                : "object-cover"
            }
          />
        </div>
      ))}
    </div>
  );
}
