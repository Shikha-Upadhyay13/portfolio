"use client";

import Image from "next/image";
import type { MediaItem } from "@/types/media";

const TILTS = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1", "rotate-1"];

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
 * Scattered-polaroid filmstrip for 2+ items (drag/scroll horizontally).
 * A single item gets one larger, straight-on card instead of a tiny tilted strip.
 *
 * `center`: when the items comfortably fit the container (few items), center
 * them instead of bunching to the left -- only use this when you're sure the
 * row won't need to overflow-scroll, since centering an overflowing flex row
 * can make the start of the scroll unreachable in some browsers.
 */
export default function MediaFilmstrip({
  items,
  center = false,
}: {
  items: MediaItem[];
  center?: boolean;
}) {
  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="flex justify-center">
        <div className="relative w-full max-w-lg aspect-video rounded-sm overflow-hidden border-4 border-white/95 bg-white shadow-xl shadow-black/50">
          {item.type === "video" ? (
            <video
              className="w-full h-full object-contain bg-black"
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
      className={`flex gap-6 overflow-x-auto no-scrollbar fade-x py-8 px-4 snap-x snap-mandatory ${
        center ? "justify-center" : ""
      }`}
    >
      {items.map((item, i) => (
        <div
          key={item.src}
          className={`relative shrink-0 w-48 h-60 sm:w-56 sm:h-72 snap-center rounded-sm overflow-hidden border-4 border-white/95 bg-white shadow-xl shadow-black/50 transition-transform duration-300 ease-out hover:!rotate-0 hover:scale-105 hover:z-10 ${TILTS[i % TILTS.length]}`}
        >
          <MediaFrame
            item={item}
            className={
              item.type === "video"
                ? "w-full h-full object-cover bg-black"
                : "object-cover"
            }
          />
        </div>
      ))}
    </div>
  );
}
