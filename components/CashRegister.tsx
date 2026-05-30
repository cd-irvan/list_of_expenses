"use client";

import { RollingNumber } from "./RollingNumber";

interface CashRegisterProps {
  total: number;
  shareLabel: string;
  shareValue: number;
}

// Display window in viewBox coordinates — used both for the SVG rect
// and for the overlay div so the two stay perfectly aligned.
const VB = { w: 360, h: 300 };
const DISPLAY = { x: 56, y: 60, w: 248, h: 104 };

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  left: `${(DISPLAY.x / VB.w) * 100}%`,
  top: `${(DISPLAY.y / VB.h) * 100}%`,
  width: `${(DISPLAY.w / VB.w) * 100}%`,
  height: `${(DISPLAY.h / VB.h) * 100}%`,
};

export function CashRegister({ total, shareLabel, shareValue }: CashRegisterProps) {
  return (
    <div className="relative mx-auto w-full max-w-md select-none">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="block h-auto w-full text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* bell on top */}
        <circle cx="180" cy="10" r="5" fill="currentColor" stroke="none" />
        <line x1="180" y1="15" x2="180" y2="34" />
        {/* dome */}
        <path d="M 70 48 Q 180 4 290 48" />
        <path d="M 88 50 Q 180 22 272 50" strokeDasharray="3 4" />

        {/* main body */}
        <rect x="36" y="48" width="288" height="190" rx="14" fill="#efe3c4" />

        {/* display window */}
        <rect
          x={DISPLAY.x}
          y={DISPLAY.y}
          width={DISPLAY.w}
          height={DISPLAY.h}
          rx="8"
          fill="#fbf5e1"
        />
        {/* display dividers (very subtle, bracket the centered amount) */}
        <line
          x1={DISPLAY.x + 6}
          y1={DISPLAY.y + 34}
          x2={DISPLAY.x + DISPLAY.w - 6}
          y2={DISPLAY.y + 34}
          stroke="#d9c48a"
          strokeWidth="1.2"
        />
        <line
          x1={DISPLAY.x + 6}
          y1={DISPLAY.y + 70}
          x2={DISPLAY.x + DISPLAY.w - 6}
          y2={DISPLAY.y + 70}
          stroke="#d9c48a"
          strokeWidth="1.2"
        />

        {/* keys grid */}
        {Array.from({ length: 4 }).map((_, col) =>
          Array.from({ length: 3 }).map((_, row) => (
            <circle
              key={`k-${col}-${row}`}
              cx={70 + col * 26}
              cy={184 + row * 14}
              r="5"
              fill="#fbf5e1"
            />
          ))
        )}

        {/* big lever key on right */}
        <rect x="200" y="178" width="100" height="36" rx="6" fill="#d9c48a" />
        <line x1="216" y1="196" x2="284" y2="196" />

        {/* drawer */}
        <rect x="30" y="238" width="300" height="44" rx="8" fill="#e6d6a8" />
        <rect x="160" y="254" width="40" height="10" rx="2" fill="#b8862c" stroke="none" />

        {/* side crank */}
        <line x1="324" y1="118" x2="346" y2="136" />
        <circle cx="348" cy="138" r="6" fill="#d9c48a" />

        {/* base feet */}
        <line x1="56" y1="282" x2="56" y2="294" />
        <line x1="304" y1="282" x2="304" y2="294" />
      </svg>

      {/* Display overlay — positioned to match the SVG display rect exactly.
          Uses a 3-row grid (1fr | auto | 1fr) so the big amount is dead-center
          vertically, with the label sitting above and the share sitting below. */}
      <div style={overlayStyle} className="pointer-events-none">
        <div className="grid h-full w-full grid-rows-[1fr_auto_1fr] px-3 leading-none">
          <div className="flex items-end justify-center pb-1">
            <span className="text-[8px] uppercase tracking-[0.3em] text-ink/60">
              Our total
            </span>
          </div>
          <div className="flex items-center justify-center">
            <RollingNumber
              value={total}
              minIntegerDigits={4}
              className="text-2xl sm:text-3xl"
            />
          </div>
          <div className="flex items-start justify-center gap-2 pt-1">
            <span className="text-[8px] uppercase tracking-[0.25em] text-ink/60">
              {shareLabel}
            </span>
            <RollingNumber
              value={shareValue}
              minIntegerDigits={3}
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
