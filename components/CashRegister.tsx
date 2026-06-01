"use client";

import { useEffect, useState } from "react";

interface CashRegisterProps {
  total: number;
  shareLabel: string;
  shareValue: number;
}

const VB = { w: 360, h: 340 };

interface SlotLayout {
  cx: number;
  y: number;
  slotW: number;
  slotH: number;
  gap: number;
  pattern: string[];
  fontSize: number;
}

const TOTAL: SlotLayout = {
  cx: 180,
  y: 96,
  slotW: 22,
  slotH: 32,
  gap: 3,
  pattern: ["$", "d", "d", "d", "d", ".", "d", "d"],
  fontSize: 24,
};

const SHARE: SlotLayout = {
  cx: 180,
  y: 150,
  slotW: 15,
  slotH: 22,
  gap: 2,
  pattern: ["$", "d", "d", "d", ".", "d", "d"],
  fontSize: 16,
};

function slotWidthFor(kind: string, layout: SlotLayout) {
  // The decimal point has no box, so it only needs a slim gap.
  if (kind === ".") return Math.round(layout.slotW * 0.5);
  return layout.slotW;
}

function buildSlots(layout: SlotLayout) {
  const widths = layout.pattern.map((k) => slotWidthFor(k, layout));
  const total =
    widths.reduce((a, b) => a + b, 0) + (layout.pattern.length - 1) * layout.gap;
  let cursor = layout.cx - total / 2;
  return layout.pattern.map((kind, i) => {
    const w = widths[i];
    const slot = { kind, x: cursor, y: layout.y, w, h: layout.slotH };
    cursor += w + layout.gap;
    return slot;
  });
}

function digitsForValue(value: number, intCount: number, decCount: number) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const fixed = safe.toFixed(decCount);
  const [intRaw, decRaw = ""] = fixed.split(".");
  const intPadded = intRaw.padStart(intCount, "0").slice(-intCount);
  const decPadded = decRaw.padEnd(decCount, "0").slice(0, decCount);
  return { int: intPadded.split(""), dec: decPadded.split("") };
}

function valueChars(value: number, layout: SlotLayout, mounted: boolean) {
  const intCount = layout.pattern.filter((p) => p === "d").length - 2;
  const { int, dec } = digitsForValue(value, intCount, 2);
  const digits = mounted ? [...int, ...dec] : Array(intCount + 2).fill("0");
  let cursor = 0;
  return layout.pattern.map((kind) => {
    if (kind === "d") return digits[cursor++];
    return kind;
  });
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

// A single rolling digit, rendered entirely in SVG so it behaves
// identically across browsers (Safari mishandles <foreignObject>).
// Ten <text> digits are stacked vertically and clipped to the slot;
// the strip is translated to bring the active digit to the centre.
function RollingDigit({
  digit,
  slot,
  fontSize,
  clipId,
}: {
  digit: string;
  slot: { x: number; y: number; w: number; h: number };
  fontSize: number;
  clipId: string;
}) {
  const n = Number.isFinite(Number(digit)) ? Number(digit) : 0;
  const cx = slot.x + slot.w / 2;
  const cy = slot.y + slot.h / 2;
  return (
    <>
      <clipPath id={clipId}>
        <rect
          x={slot.x}
          y={slot.y}
          width={slot.w}
          height={slot.h}
          rx="3"
        />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <g
          style={{
            transform: `translateY(${-n * slot.h}px)`,
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {Array.from({ length: 10 }).map((_, d) => (
            <text
              key={d}
              x={cx}
              y={cy + d * slot.h}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={MONO}
              fontSize={fontSize}
              fontWeight={700}
              fill="#f6f1e7"
              stroke="none"
            >
              {d}
            </text>
          ))}
        </g>
      </g>
    </>
  );
}

function SlotRow({
  layout,
  value,
  mounted,
  idPrefix,
}: {
  layout: SlotLayout;
  value: number;
  mounted: boolean;
  idPrefix: string;
}) {
  const slots = buildSlots(layout);
  const chars = valueChars(value, layout, mounted);
  return (
    <g>
      {slots.map((s, i) => {
        const kind = layout.pattern[i];
        const c = chars[i];
        const isDigit = kind === "d";
        const isDot = kind === ".";
        return (
          <g key={i}>
            {!isDot && (
              <rect
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx="3"
                fill="#1a1a1a"
                stroke="#1a1a1a"
                strokeWidth="0.6"
              />
            )}
            {isDigit ? (
              <RollingDigit
                digit={c}
                slot={s}
                fontSize={layout.fontSize}
                clipId={`${idPrefix}-clip-${i}`}
              />
            ) : (
              <text
                x={s.x + s.w / 2}
                y={s.y + s.h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily={MONO}
                fontSize={layout.fontSize}
                fontWeight={700}
                fill={isDot ? "#1a1a1a" : "#f6f1e7"}
                stroke="none"
              >
                {c}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function CashRegister({ total, shareLabel, shareValue }: CashRegisterProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
        <rect x="36" y="48" width="288" height="232" rx="14" fill="#efe3c4" />

        {/* display window — taller, fits two distinct rows */}
        <rect
          x="52"
          y="62"
          width="256"
          height="120"
          rx="8"
          fill="#fbf5e1"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        {/* inner bezel */}
        <rect
          x="56"
          y="66"
          width="248"
          height="112"
          rx="6"
          fill="#fbf5e1"
          stroke="#cdb87a"
          strokeWidth="1"
        />

        {/* labels */}
        <text
          x={VB.w / 2}
          y="84"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="8"
          letterSpacing="2"
          fill="#3a3327"
          stroke="none"
        >
          OUR TOTAL
        </text>
        <text
          x={VB.w / 2}
          y="140"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="6.5"
          letterSpacing="1.6"
          fill="#3a3327"
          stroke="none"
        >
          {shareLabel.toUpperCase()}
        </text>

        {/* digit slots — total */}
        <SlotRow layout={TOTAL} value={total} mounted={mounted} idPrefix="total" />
        {/* digit slots — share */}
        <SlotRow layout={SHARE} value={shareValue} mounted={mounted} idPrefix="share" />

        {/* keys grid */}
        {Array.from({ length: 4 }).map((_, col) =>
          Array.from({ length: 3 }).map((_, row) => (
            <circle
              key={`k-${col}-${row}`}
              cx={70 + col * 26}
              cy={210 + row * 14}
              r="5"
              fill="#fbf5e1"
            />
          ))
        )}

        {/* big lever key on right */}
        <rect x="200" y="204" width="100" height="36" rx="6" fill="#d9c48a" />
        <line x1="216" y1="222" x2="284" y2="222" />

        {/* drawer */}
        <rect x="30" y="280" width="300" height="44" rx="8" fill="#e6d6a8" />
        <rect
          x="160"
          y="296"
          width="40"
          height="10"
          rx="2"
          fill="#b8862c"
          stroke="none"
        />

        {/* side crank */}
        <line x1="324" y1="138" x2="346" y2="156" />
        <circle cx="348" cy="158" r="6" fill="#d9c48a" />

        {/* base feet */}
        <line x1="56" y1="324" x2="56" y2="336" />
        <line x1="304" y1="324" x2="304" y2="336" />
      </svg>
    </div>
  );
}
