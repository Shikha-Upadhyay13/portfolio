"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Certification } from "@/data/certifications";
import { modalBackdrop, modalPanel, modalPanelTransition } from "@/lib/animations";

/** Full-image expand view for a certificate, shared by the home teaser and the full /certifications page. */
export default function CertificateLightbox({
  active,
  onClose,
}: {
  active: Certification | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  // Move focus into the dialog on open, return it to the trigger on close
  useEffect(() => {
    if (active) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    triggerRef.current?.focus?.();
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-lightbox-title"
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={modalPanelTransition}
            className="relative w-full max-w-4xl h-[85vh] rounded-2xl border border-white/10 bg-panel shadow-2xl overflow-hidden flex flex-col"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full glass accent-border text-gray-300 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative flex-1 min-h-0 bg-panel">
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
              <h3 id="certificate-lightbox-title" className="text-lg font-semibold">
                {active.title}
              </h3>
              <p className="text-sm accent-text font-medium mt-1">{active.issuer}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide mt-1">
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
