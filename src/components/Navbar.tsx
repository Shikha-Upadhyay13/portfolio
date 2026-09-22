"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/MobileNav";
import { NAV_LINKS, SCROLL_SPY_IDS } from "@/data/navLinks";

export default function Navbar() {
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "backdrop-blur-xl bg-black/50 border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold accent-text font-display">
          Shikha.dev
        </a>

        <div className="flex items-center gap-4 md:gap-8 text-sm">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                data-active={active === id}
                className={`nav-underline transition-colors ${
                  active === id ? "text-white" : "text-gray-400 hover:text-white"
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

          <Button href="/resume.pdf" download variant="ghost" size="md">
            Resume
          </Button>

          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
