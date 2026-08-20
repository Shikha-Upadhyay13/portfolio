import type { ReactNode } from "react";

type BadgeTone = "accent" | "amber" | "neutral";

const TONE_CLASSES: Record<BadgeTone, string> = {
  accent: "text-accent bg-accent/10 border-accent/20",
  amber: "text-amber-300/90 bg-amber-500/10 border-amber-400/20",
  neutral: "text-gray-300 bg-white/5 border-white/10",
};

/**
 * Shared pill-chip primitive. Unifies ProjectCard's category chip, Hackathons'
 * award chip, and Achievements' stat chip, which previously each hand-rolled
 * their own border/bg/text combination.
 */
export default function Badge({
  tone = "accent",
  icon,
  children,
  className = "",
}: {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${TONE_CLASSES[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
