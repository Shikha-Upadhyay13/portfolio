"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9999] border border-purple-400/40 backdrop-blur-sm transition-transform duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Inner Dot */}
      <div
        className="fixed w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] bg-purple-400"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
