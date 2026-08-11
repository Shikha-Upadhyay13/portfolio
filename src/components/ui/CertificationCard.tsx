"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { Certification } from "@/data/certifications";

/** Image-forward certificate card, shared by the home teaser and the full /certifications page. */
export default function CertificationCard({
  cert,
  isHighlighted = false,
  onOpen,
}: {
  cert: Certification;
  isHighlighted?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      id={`cert-${cert.id}`}
      onClick={onOpen}
      className={`h-full w-full text-left flex flex-col rounded-2xl border bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#47F1FF]/50 hover:-translate-y-1 ${
        isHighlighted
          ? "border-[#47F1FF] ring-2 ring-[#47F1FF]/60 shadow-[0_0_40px_-8px_rgba(71,241,255,0.6)]"
          : "border-white/10"
      }`}
    >
      <div className="group relative aspect-[4/3] bg-[#0c0c10]">
        <Image
          src={cert.image}
          alt={`${cert.title} certificate`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
          <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-semibold leading-snug">{cert.title}</h3>
        <p className="text-sm accent-text font-medium">{cert.issuer}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{cert.date}</p>
        <p className="text-sm text-gray-400 leading-relaxed mt-1">
          {cert.description}
        </p>
      </div>
    </button>
  );
}
