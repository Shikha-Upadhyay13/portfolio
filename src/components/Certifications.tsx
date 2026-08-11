"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";
import { certifications } from "@/data/certifications";
import Reveal from "@/components/ui/Reveal";
import CertificateLightbox from "@/components/ui/CertificateLightbox";

const featured = certifications.filter((c) => c.featured);

export default function Certifications() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const active = certifications.find((c) => c.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  // Lets other sections (e.g. the Experience "Certificate" button) scroll to
  // and highlight a specific certificate here, without opening the lightbox
  // for them -- the user can expand it themselves if they want to.
  useEffect(() => {
    const onOpenCertificate = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (!id) return;
      document
        .getElementById(`cert-${id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightId(id);
      const t = setTimeout(() => setHighlightId(null), 2500);
      return () => clearTimeout(t);
    };
    window.addEventListener("open-certificate", onOpenCertificate);
    return () => window.removeEventListener("open-certificate", onOpenCertificate);
  }, []);

  return (
    <section id="certifications" className="py-24 px-6 max-w-[1400px] mx-auto">
      <Reveal className="mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold accent-text">
          Certifications
        </h2>
        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
          Courses, simulations, and programs I've completed along the way.
        </p>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((cert, i) => (
          <Reveal key={cert.id} delay={(i % 3) * 0.05}>
            <button
              id={`cert-${cert.id}`}
              onClick={() => setOpenId(cert.id)}
              className={`h-full w-full text-left flex flex-col rounded-2xl border bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#47F1FF]/50 hover:-translate-y-1 ${
                highlightId === cert.id
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
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {cert.date}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mt-1">
                  {cert.description}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15} className="mt-12 flex justify-center">
        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass accent-border text-sm font-medium text-gray-200 hover:text-white transition group"
        >
          View all {certifications.length} certifications
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <CertificateLightbox active={active} onClose={close} />
    </section>
  );
}
