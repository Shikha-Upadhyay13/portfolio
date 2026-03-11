"use client";

import { useEffect } from "react";

export default function CursorRipple() {
  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      const ripple = document.createElement("span");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      document.addEventListener("mousedown", () => {
        document.body.classList.add("cursor-click");
      });

      document.addEventListener("mouseup", () => {
        document.body.classList.remove("cursor-click");
      });

      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    window.addEventListener("click", createRipple);

    return () => {
      window.removeEventListener("click", createRipple);
    };
  }, []);

  return null;
}
