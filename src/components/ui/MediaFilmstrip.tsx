"use client";

import Image from "next/image";
import type { MediaItem } from "@/types/media";

const TILTS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1", "rotate-1"];

const FRAME: Record<"classic" | "neon", string> = {
  classic:
    "border-4 border-white/95 bg-white shadow-xl shadow-black/50",
  neon:
    "border-2 border-accent/70 bg-[#0b0b0f] shadow-[0_0_18px_rgba(71,241,255,0.35),0_0_40px_rgba(71,241,255,0.12)] ring-1 ring-accent/30",
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
 * Filmstrip for 2+ media items.
 * `variant="neon"` — cyan glow border for a futuristic look (hackathons / clubs).
 */
export default function MediaFilmstrip({
  items,
  center = false,
  variant = "classic",
}: {
  items: MediaItem[];
  center?: boolean;
  variant?: "classic" | "neon";
}) {
  const frame = FRAME[variant];

  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="flex justify-center">
        <div
          className={`relative aspect-video w-full max-w-lg overflow-hidden rounded-lg ${frame}`}
        >
          {item.type === "video" ? (
            <video
              className="h-full w-full object-contain bg-black"
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
              className="object-contain bg-black"
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
          className={`relative h-60 w-48 shrink-0 snap-center overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-105 hover:z-10 sm:h-72 sm:w-56 ${frame} ${
            variant === "classic" ? TILTS[i % TILTS.length] : "rotate-0"
          } ${
            variant === "neon"
              ? "hover:border-accent hover:shadow-[0_0_28px_rgba(71,241,255,0.5)]"
              : ""
          }`}
        >
          <MediaFrame
            item={item}
            className={
              item.type === "video"
                ? "h-full w-full object-cover bg-black"
                : "object-cover"
            }
          />
        </div>
      ))}
    </div>
  );
}
