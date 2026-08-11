"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Frosted background once the user scrolls past the hero
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll-spy: highlight whichever section is centered in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    links.forEach(({ id }) => {
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
        {/* Logo */}
        <a href="/" className="text-lg font-semibold accent-text">
          Shikha.dev
        </a>

        {/* Right Side */}
        <div className="flex items-center gap-6 md:gap-8 text-sm">
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ id, label }) => (
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

          {/* Command palette trigger — icon-only on mobile (also doubles as
              mobile section navigation, since the link list above is
              desktop-only), full "Search ⌘K" hint from sm and up */}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            aria-label="Open command palette"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg glass text-gray-400 transition accent-border hover:text-white"
          >
            <Search className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline text-xs">Search</span>
            <kbd className="hidden sm:inline text-[10px] border border-white/15 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>

          <a
            href="/resume.pdf"
            download
            className="px-4 py-2 rounded-lg glass transition accent-border"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
