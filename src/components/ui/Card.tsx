import type { ReactNode } from "react";

type CardProps = {
  /** Lift + accent border on hover. Default on — the recipe every card in the app already shares. */
  hoverLift?: boolean;
  /** Left accent rail, e.g. Experience's timeline marker. */
  accentRail?: boolean;
  padding?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

const PADDING_CLASSES = { sm: "p-6", md: "p-8" };

/**
 * Shared "glass card" primitive. Unifies the 3-4 near-duplicate recipes found
 * across Experience/Education/Leadership (each with a different bg-opacity
 * literal and border-radius) into one consistent card.
 */
export default function Card({
  hoverLift = true,
  accentRail = false,
  padding = "md",
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-accent/50 ${
        hoverLift ? "hover:-translate-y-1" : ""
      } ${PADDING_CLASSES[padding]} ${className}`}
    >
      {accentRail && (
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-accent"
        />
      )}
      {children}
    </div>
  );
}
