"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modalBackdrop, modalPanel, modalPanelTransition } from "@/lib/animations";
import {
  Command,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  BadgeCheck,
  GraduationCap,
  Trophy,
  Users,
  Heart,
  Mail,
  FileDown,
  Github,
  Linkedin,
} from "lucide-react";

type Item = {
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const go = (hash: string) => () => {
    setOpen(false);
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Section doesn't exist on this page (e.g. opened from /certifications) — go home to it.
      window.location.href = `/#${hash}`;
    }
  };

  const openExternal = (url: string) => () => {
    setOpen(false);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const items: Item[] = useMemo(
    () => [
      { label: "About", hint: "Jump to section", icon: User, action: go("about") },
      { label: "Skills", hint: "Jump to section", icon: Wrench, action: go("skills") },
      { label: "Projects", hint: "Jump to section", icon: FolderGit2, action: go("projects") },
      { label: "Experience", hint: "Jump to section", icon: Briefcase, action: go("experience") },
      { label: "Education", hint: "Jump to section", icon: GraduationCap, action: go("education") },
      { label: "Achievements", hint: "Jump to section", icon: Award, action: go("achievements") },
      { label: "Certifications", hint: "Jump to section", icon: BadgeCheck, action: go("certifications") },
      { label: "Hackathons", hint: "Jump to section", icon: Trophy, action: go("hackathons") },
      { label: "Leadership", hint: "Jump to section", icon: Users, action: go("leadership") },
      { label: "Hobbies & Passion", hint: "Jump to section", icon: Heart, action: go("hobbies") },
      { label: "Contact", hint: "Jump to section", icon: Mail, action: go("contact") },
      {
        label: "Download Résumé",
        hint: "PDF",
        icon: FileDown,
        action: () => {
          setOpen(false);
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "Shikha-Upadhyay-Resume.pdf";
          a.click();
        },
      },
      { label: "GitHub", hint: "Open profile", icon: Github, action: openExternal("https://github.com/Shikha-Upadhyay13") },
      { label: "LinkedIn", hint: "Open profile", icon: Linkedin, action: openExternal("https://www.linkedin.com/in/shikha-upadhyay-2955aa2b8") },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => i.label.toLowerCase().includes(q));
  }, [items, query]);

  // Toggle with Cmd/Ctrl+K; close with Escape; open via custom event (button)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  // Reset + focus on open; return focus to whatever triggered it on close
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActiveIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    triggerRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[activeIndex]?.action();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          variants={modalBackdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            variants={modalPanel}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={modalPanelTransition}
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-panel/95 shadow-2xl overflow-hidden"
            onKeyDown={onListKey}
          >
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Command className="w-4 h-4 text-accent" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-results"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
              />
              <kbd className="text-[10px] text-gray-500 border border-white/10 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              id="command-palette-results"
              role="listbox"
              className="max-h-72 overflow-y-auto py-2"
            >
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-gray-500">
                  No results
                </p>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    role="option"
                    aria-selected={i === activeIndex}
                    onClick={item.action}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition ${
                      i === activeIndex
                        ? "bg-accent/15 text-white"
                        : "text-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-accent" />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.hint}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
