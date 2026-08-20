import type { Transition, Variants } from "framer-motion";

/**
 * The "ease out expo"-ish cubic-bezier every reveal/modal transition in the
 * app was independently hardcoding (Reveal, ProjectCard, CommandPalette,
 * CertificateLightbox). Centralized here so it only needs to change once.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Single fade-up item, e.g. for a heading or paragraph entrance. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Parent variant that staggers `fadeUp` (or any `show`/`hidden` child) children in. */
export function staggerContainer(staggerMs = 0.12, delayChildren = 0.1): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: staggerMs, delayChildren } },
  };
}

/** Shared enter/exit for floating dialogs (command palette, lightbox, popovers). */
export const modalPanel: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const modalPanelTransition: Transition = { duration: 0.18, ease: EASE_OUT_EXPO };

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
