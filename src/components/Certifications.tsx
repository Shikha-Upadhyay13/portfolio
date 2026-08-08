"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { certifications } from "@/data/certifications";
import Reveal from "@/components/ui/Reveal";

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

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, close]);

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
        {certifications.map((cert, i) => (
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

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={close}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 bg-[#101015] shadow-2xl overflow-hidden flex flex-col"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full glass text-gray-300 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative flex-1 min-h-0 bg-[#0c0c10]">
                <Image
                  src={active.image}
                  alt={`${active.title} certificate`}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-5 sm:p-6 border-t border-white/10 shrink-0 max-h-[30vh] overflow-y-auto">
                <h3 className="text-lg font-semibold">{active.title}</h3>
                <p className="text-sm accent-text font-medium mt-1">{active.issuer}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  {active.date}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mt-2">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
