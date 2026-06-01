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

function RollingDigit({
  digit,
  size,
  slotH,
}: {
  digit: string;
  size: number;
  slotH: number;
}) {
  const n = Number.isFinite(Number(digit)) ? Number(digit) : 0;
  return (
    <div
      style={{
        width: "100%",
        height: `${slotH}px`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${n * slotH}px)`,
          transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: `${slotH}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: `${size}px`,
              fontWeight: 700,
              lineHeight: 1,
              color: "#f6f1e7",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlotRow({
  layout,
  value,
  mounted,
}: {
  layout: SlotLayout;
  value: number;
  mounted: boolean;
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
            <foreignObject x={s.x} y={s.y} width={s.w} height={s.h}>
              <div
                style={{
                  width: `${s.w}px`,
                  height: `${s.h}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: `${layout.fontSize}px`,
                  fontWeight: 700,
                  color: isDot ? "#1a1a1a" : "#f6f1e7",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {isDigit ? (
                  <RollingDigit digit={c} size={layout.fontSize} slotH={s.h} />
                ) : (
                  <span style={{ opacity: isDot ? 1 : 0.85 }}>{c}</span>
                )}
              </div>
            </foreignObject>
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
        <SlotRow layout={TOTAL} value={total} mounted={mounted} />
        {/* digit slots — share */}
        <SlotRow layout={SHARE} value={shareValue} mounted={mounted} />

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
