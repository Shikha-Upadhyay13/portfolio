"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import { DESKTOP_NAV_LINKS, SCROLL_SPY_IDS } from "@/data/navLinks";
import { preferHomeTop } from "@/components/HomeScrollRestore";

export default function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    SCROLL_SPY_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-[var(--nav-scrolled)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold accent-text font-display"
          onClick={(e) => {
            preferHomeTop();
            if (pathname === "/") {
              e.preventDefault();
              if (window.location.hash) {
                window.history.replaceState(null, "", "/");
              }
              const reduce = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches;
              window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            }
          }}
        >
          Shikha.dev
        </Link>

        <div className="flex items-center gap-4 md:gap-8 text-sm">
          <div className="hidden md:flex items-center gap-6">
            {DESKTOP_NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                data-active={active === id}
                className={`nav-underline transition-colors ${
                  active === id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          <Button
            variant="ghost"
            size="md"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            aria-label="Open command palette"
          >
            <Search className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline text-[10px] border border-white/15 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </Button>

          <Button
            variant="ghost"
            size="md"
            onMouseEnter={() =>
              window.dispatchEvent(new CustomEvent("preload-resume-preview"))
            }
            onFocus={() =>
              window.dispatchEvent(new CustomEvent("preload-resume-preview"))
            }
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-resume-preview"))
            }
          >
            Resume
          </Button>

          <ThemeToggle />

          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
