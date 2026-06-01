"use client";

import { useEffect, useState } from "react";

interface RollingNumberProps {
  value: number; // amount as a number (e.g. 1234.5)
  currency?: string; // prefix symbol
  minIntegerDigits?: number; // pad integer side, e.g. 4 -> 0012.34
  className?: string;
}

function formatParts(
  value: number,
  currency: string,
  minIntegerDigits: number
) {
  const safe = Number.isFinite(value) ? Math.max(0, value) : 0;
  const fixed = safe.toFixed(2); // "1234.50"
  const [intRaw, dec] = fixed.split(".");
  const intPadded = intRaw.padStart(minIntegerDigits, "0");
  return { currency, intPadded, dec };
}

export function Digit({ digit }: { digit: string }) {
  const n = Number(digit);
  const offset = `-${n}em`;
  return (
    <span className="digit-window">
      <span className="digit-strip" style={{ transform: `translateY(${offset})` }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i}>{i}</span>
        ))}
      </span>
    </span>
  );
}

export function RollingNumber({
  value,
  currency = "$",
  minIntegerDigits = 4,
  className,
}: RollingNumberProps) {
  // Defer to client-side mount so SSR mismatch never flashes
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { intPadded, dec } = formatParts(value, currency, minIntegerDigits);
  const displayInt = mounted ? intPadded : intPadded.replace(/./g, "0");
  const displayDec = mounted ? dec : "00";

  return (
    <span
      className={
        "inline-flex items-baseline font-mono tabular-nums leading-none " +
        (className ?? "")
      }
    >
      <span className="mr-1 opacity-80">{currency}</span>
      {displayInt.split("").map((d, i) => (
        <Digit key={`i-${i}`} digit={d} />
      ))}
      <span className="opacity-80">.</span>
      {displayDec.split("").map((d, i) => (
        <Digit key={`d-${i}`} digit={d} />
      ))}
    </span>
  );
}
