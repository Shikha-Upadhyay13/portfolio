"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SCROLL_SPY_IDS } from "@/data/navLinks";

const SCROLL_Y_KEY = "portfolio-home-scroll-y";
const SECTION_KEY = "portfolio-home-section";

function smoothScrollTo(top: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

/** Remember which home section was in view before navigating away. */
export function rememberHomeSection(sectionId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SECTION_KEY, sectionId);
  sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));
}

/**
 * On the home page: restore the section/hash you came back from,
 * and keep saving scroll position while you browse.
 */
export default function HomeScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    // Prefer URL hash, then last remembered section / Y.
    const hash = window.location.hash.replace(/^#/, "");
    const savedSection = sessionStorage.getItem(SECTION_KEY) ?? "";
    const savedY = Number(sessionStorage.getItem(SCROLL_Y_KEY) ?? "");

    const restore = () => {
      if (hash && smoothScrollToId(hash)) return;
      if (savedSection && smoothScrollToId(savedSection)) return;
      if (Number.isFinite(savedY) && savedY > 0) smoothScrollTo(savedY);
    };

    // Skip restore while first-visit intro is still on screen — still track scroll after.
    const introPending =
      sessionStorage.getItem("portfolio-intro-seen") !== "1";

    let t1 = 0;
    let t2 = 0;
    if (!introPending) {
      // Wait a tick for layout / images to settle, then ease back.
      t1 = window.setTimeout(restore, 40);
      t2 = window.setTimeout(restore, 280);
    }

    const onScroll = () => {
      sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY));

      // Track nearest section for back-navigation without a hash.
      let current = "home";
      for (const id of SCROLL_SPY_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.35) current = id;
      }
      sessionStorage.setItem(SECTION_KEY, current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hash changes from nav / footer while already on home.
    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) {
        sessionStorage.setItem(SECTION_KEY, id);
        // Let the browser attempt first; reinforce with smooth scroll.
        window.setTimeout(() => smoothScrollToId(id), 0);
      }
    };
    window.addEventListener("hashchange", onHash);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
    };
  }, [pathname]);

  return null;
}
