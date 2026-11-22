"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, FileText, X } from "lucide-react";

export const RESUME_SRC = "/resume.pdf";
export const RESUME_PREVIEW_SRC = "/images/resume-preview.webp";
export const RESUME_FILENAME = "Shikha-Upadhyay-Resume.pdf";
export const OPEN_RESUME_PREVIEW = "open-resume-preview";
export const PRELOAD_RESUME_PREVIEW = "preload-resume-preview";

export function openResumePreview() {
  window.dispatchEvent(new CustomEvent(OPEN_RESUME_PREVIEW));
}

export function preloadResumePreview() {
  window.dispatchEvent(new CustomEvent(PRELOAD_RESUME_PREVIEW));
}

/**
 * Resume preview modal — static raster preview (instant), Download = real PDF.
 */
export default function ResumePreview() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Warm the preview image into cache on mount / hover.
  useEffect(() => {
    const img = new window.Image();
    img.decoding = "async";
    img.src = RESUME_PREVIEW_SRC;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = RESUME_PREVIEW_SRC;
    document.head.appendChild(link);

    return () => link.remove();
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onPreload = () => {
      const img = new window.Image();
      img.src = RESUME_PREVIEW_SRC;
    };
    window.addEventListener(OPEN_RESUME_PREVIEW, onOpen);
    window.addEventListener(PRELOAD_RESUME_PREVIEW, onPreload);
    return () => {
      window.removeEventListener(OPEN_RESUME_PREVIEW, onOpen);
      window.removeEventListener(PRELOAD_RESUME_PREVIEW, onPreload);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      const t = setTimeout(() => closeButtonRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
    triggerRef.current?.focus?.();
  }, [open]);

  // Stay mounted — toggling visibility avoids open delay from remount/animation.
  return (
    <div
      className={`fixed inset-0 z-[110] items-center justify-center p-3 sm:p-6 md:p-10 ${
        open ? "flex" : "hidden"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-preview-title"
        className="relative flex h-[min(92vh,880px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#f8f8f9] shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-black/8 bg-white px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2
                id="resume-preview-title"
                className="truncate text-sm font-semibold text-stone-900 sm:text-base"
              >
                Shikha Upadhyay - Resume
              </h2>
              <p className="text-xs text-stone-500">PDF Document</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={RESUME_SRC}
              download={RESUME_FILENAME}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0d9488] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#0f766e]"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close resume preview"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 transition hover:bg-[#0d9488]/15 hover:text-[#0d9488]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-[#1a1a1c] p-2 sm:p-3">
          <div className="relative flex h-full items-start justify-center overflow-auto rounded-lg border border-white/10 bg-[#111113]">
            <Image
              src={RESUME_PREVIEW_SRC}
              alt="Shikha Upadhyay resume preview"
              width={1200}
              height={1600}
              priority
              className="h-auto w-full max-w-3xl bg-white object-contain shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
