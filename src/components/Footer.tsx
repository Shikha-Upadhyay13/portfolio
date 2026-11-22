"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/site";

const QUICK_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#hobbies", label: "Hobbies" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-0 border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Let’s keep in touch
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
              Shikha{" "}
              <span className="accent-text">Upadhyay</span>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
              AI Engineer crafting reliable RAG systems, agentic workflows, and
              production GenAI — with a little cafe warmth on the side.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
              >
                <Mail className="h-3.5 w-3.5" />
                Email
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-12">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Explore
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-muted transition hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Based in
              </h4>
              <p className="mt-4 text-sm leading-relaxed text-fg">
                Hyderabad, India
              </p>
              <p className="mt-2 text-sm text-muted">
                Open to AI / ML roles &amp; collaborations.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Shikha Upadhyay. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
            AI · Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
