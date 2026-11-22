"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileText, X } from "lucide-react";

export const RESUME_SRC = "/resume.pdf";
/** High-res PNG of all PDF pages stacked for sharp, fast preview. */
export const RESUME_PREVIEW_SRC = "/images/resume-preview.png";
export const RESUME_FILENAME = "Shikha-Upadhyay-Resume.pdf";
export const OPEN_RESUME_PREVIEW = "open-resume-preview";
export const PRELOAD_RESUME_PREVIEW = "preload-resume-preview";

/** Intrinsic size of the stacked 2-page preview PNG. */
const PREVIEW_WIDTH = 1488;
const PREVIEW_HEIGHT = 4234;

export function openResumePreview() {
  window.dispatchEvent(new CustomEvent(OPEN_RESUME_PREVIEW));
}

export function preloadResumePreview() {
  window.dispatchEvent(new CustomEvent(PRELOAD_RESUME_PREVIEW));
}

/**
 * Resume preview modal — thin white chrome + dark stage,
 * scrollable full multi-page preview.
 */
export default function ResumePreview() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

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
    // Reset scroll so page 1 is visible when reopening
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    });
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
        className="relative flex h-[min(94vh,920px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white p-2 shadow-2xl sm:p-2.5"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 rounded-t-xl bg-white px-3 pb-3 pt-1 sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2
                id="resume-preview-title"
                className="truncate text-sm font-semibold text-stone-900 sm:text-base"
              >
                Shikha Upadhyay - Resume
              </h2>
              <p className="text-xs text-stone-500">
                2 pages · scroll to see both
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={RESUME_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>
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

        {/* Dark stage — explicit scroll so both pages are reachable */}
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-[#2a2a2e]">
          <div
            ref={scrollRef}
            tabIndex={0}
            className="min-h-0 flex-1 overflow-y-scroll overscroll-contain px-3 py-4 sm:px-6 sm:py-5 [scrollbar-gutter:stable]"
          >
            <div className="mx-auto w-full max-w-[820px] space-y-0 pb-8">
              <Image
                src={RESUME_PREVIEW_SRC}
                alt="Shikha Upadhyay resume — page 1 and page 2"
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
                priority
                quality={100}
                unoptimized
                className="h-auto w-full rounded-sm bg-white shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
