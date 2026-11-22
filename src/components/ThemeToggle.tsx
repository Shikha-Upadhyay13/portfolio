"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: {
  className?: string;
  /** Show Light/Dark text beside the icon (e.g. mobile menu). */
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`glass accent-border inline-flex items-center justify-center gap-2 rounded-full text-accent transition hover:text-accent ${
        showLabel ? "px-3 py-2 text-xs font-medium" : "h-9 w-9"
      } ${className}`}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      {showLabel && <span>{isLight ? "Dark" : "Light"}</span>}
    </button>
  );
}
