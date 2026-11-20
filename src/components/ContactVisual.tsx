"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Contact section illustration — stylized handset + signal arcs.
 * Pure SVG so it stays sharp and on-brand (no stock icon cliché).
 */
export default function ContactVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full aspect-[5/4] max-h-[240px] mx-auto select-none"
      aria-hidden
    >
      {/* Soft stage glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full bg-[#47F1FF]/10 blur-3xl" />
      </div>

      <svg
        viewBox="0 0 320 256"
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faint grid — engineering sketch feel */}
        <g opacity="0.12" stroke="#47F1FF" strokeWidth="0.6">
          {[40, 80, 120, 160, 200, 240, 280].map((x) => (
            <line key={`v${x}`} x1={x} y1="16" x2={x} y2="240" />
          ))}
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={`h${y}`} x1="24" y1={y} x2="296" y2={y} />
          ))}
        </g>

        {/* Signal arcs (right of handset) */}
        <g
          stroke="#47F1FF"
          strokeLinecap="round"
          fill="none"
          className={reduceMotion ? "" : "contact-signal"}
        >
          <path
            d="M210 78c18 10 30 28 30 50s-12 40-30 50"
            strokeWidth="2"
            opacity="0.85"
          />
          <path
            d="M228 58c28 16 46 42 46 70s-18 54-46 70"
            strokeWidth="1.6"
            opacity="0.45"
          />
          <path
            d="M246 40c36 22 60 56 60 88s-24 66-60 88"
            strokeWidth="1.25"
            opacity="0.22"
          />
        </g>

        {/* Cable from bottom */}
        <path
          d="M98 198c-8 18-6 28 4 36 14 10 42 6 58-4"
          stroke="#47F1FF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.55"
        />

        {/* Handset body — tilted */}
        <g transform="translate(150 130) rotate(-28) translate(-150 -130)">
          {/* Earpiece */}
          <rect
            x="78"
            y="72"
            width="52"
            height="38"
            rx="12"
            fill="#121218"
            stroke="#47F1FF"
            strokeWidth="2"
          />
          <rect
            x="86"
            y="80"
            width="36"
            height="22"
            rx="8"
            fill="#0b0b0f"
            stroke="rgba(71,241,255,0.35)"
            strokeWidth="1"
          />

          {/* Bridge */}
          <path
            d="M104 110c2 28 4 52 6 72"
            stroke="#47F1FF"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M104 110c2 28 4 52 6 72"
            stroke="#0b0b0f"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Mouthpiece */}
          <rect
            x="86"
            y="178"
            width="52"
            height="38"
            rx="12"
            fill="#121218"
            stroke="#47F1FF"
            strokeWidth="2"
          />
          <circle
            cx="112"
            cy="197"
            r="7"
            fill="rgba(71,241,255,0.2)"
            stroke="#47F1FF"
            strokeWidth="1.2"
          />
        </g>

        {/* Pulse dots along a soft orbit */}
        <g fill="#47F1FF">
          <circle cx="248" cy="88" r="2.5" opacity="0.9">
            {!reduceMotion && (
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur="2.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="268" cy="128" r="2" opacity="0.55">
            {!reduceMotion && (
              <animate
                attributeName="opacity"
                values="0.2;0.85;0.2"
                dur="2.8s"
                begin="0.4s"
                repeatCount="indefinite"
              />
            )}
          </circle>
          <circle cx="252" cy="168" r="2.2" opacity="0.7">
            {!reduceMotion && (
              <animate
                attributeName="opacity"
                values="0.25;1;0.25"
                dur="2.2s"
                begin="0.8s"
                repeatCount="indefinite"
              />
            )}
          </circle>
        </g>

        {/* Tiny label plate */}
        <rect
          x="24"
          y="214"
          width="72"
          height="22"
          rx="6"
          fill="#121218"
          stroke="rgba(71,241,255,0.35)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="229"
          textAnchor="middle"
          fill="#47F1FF"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.12em"
        >
          REACH OUT
        </text>
      </svg>
    </div>
  );
}
