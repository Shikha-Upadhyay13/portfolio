"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Certification } from "@/data/certifications";

/** Full-image expand view for a certificate, shared by the home teaser and the full /certifications page. */
export default function CertificateLightbox({
  active,
  onClose,
}: {
  active: Certification | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  return (
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
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 bg-[#101015] shadow-2xl overflow-hidden flex flex-col"
          >
            <button
              onClick={onClose}
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
  );
}
