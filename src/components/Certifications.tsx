"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certifications } from "@/data/certifications";
import Reveal from "@/components/ui/Reveal";
import CertificateLightbox from "@/components/ui/CertificateLightbox";
import CertificationCard from "@/components/ui/CertificationCard";

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
            <CertificationCard
              cert={cert}
              isHighlighted={highlightId === cert.id}
              onOpen={() => setOpenId(cert.id)}
            />
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
