import type { CategoryId } from "@/lib/types";

interface CategoryIconProps {
  id: CategoryId;
  className?: string;
}

const COMMON = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 2 as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 32 32",
};

export function CategoryIcon({ id, className }: CategoryIconProps) {
  switch (id) {
    case "restaurant":
      return (
        <svg {...COMMON} className={className} aria-hidden="true">
          {/* Pizza slice pointing down with a curved crust */}
          <path d="M8 8 L 24 8 L 16 27 Z" fill="#f6f1e7" />
          <path d="M7.5 8 Q 16 3.5 24.5 8" />
          {/* pepperoni */}
          <circle cx="13.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="19" cy="13.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );

    case "grocery":
      return (
        <svg {...COMMON} className={className} aria-hidden="true">
          {/* Market basket: handle + tapered body + woven slats */}
          <path d="M11 11 C 11 6.5, 21 6.5, 21 11" />
          <path d="M6 11 H 26 L 23.5 24 H 8.5 Z" fill="#f6f1e7" />
          <line x1="6" y1="11" x2="26" y2="11" />
          <line x1="11.5" y1="13.5" x2="11" y2="22" />
          <line x1="16" y1="13.5" x2="16" y2="22" />
          <line x1="20.5" y1="13.5" x2="21" y2="22" />
          <line x1="7.5" y1="17.5" x2="24.5" y2="17.5" />
        </svg>
      );

    case "visits":
      return (
        <svg {...COMMON} className={className} aria-hidden="true">
          {/* Balloon on a string — a fun little outing */}
          <path
            d="M16 4 C 21 4, 23.5 8, 23.5 12.5 C 23.5 17, 19 20, 16 21 C 13 20, 8.5 17, 8.5 12.5 C 8.5 8, 11 4, 16 4 Z"
            fill="#f6f1e7"
          />
          {/* knot */}
          <path d="M14.6 21 L 16 23 L 17.4 21 Z" fill="currentColor" stroke="none" />
          {/* string */}
          <path d="M16 23 C 17.5 25, 14.5 26.5, 16 29" />
        </svg>
      );

    case "train":
      return (
        <svg {...COMMON} className={className} aria-hidden="true">
          {/* Locomotive front-on */}
          <path d="M7 7 H 25 V 22 Q 25 24, 23 24 H 9 Q 7 24, 7 22 Z" fill="#f6f1e7" />
          {/* roof line */}
          <line x1="6" y1="7" x2="26" y2="7" />
          {/* window */}
          <rect x="11" y="10" width="10" height="6" rx="1.2" fill="#f6f1e7" />
          {/* headlight */}
          <circle cx="16" cy="20" r="1.3" fill="currentColor" stroke="none" />
          {/* wheels */}
          <circle cx="11" cy="27" r="2" fill="#f6f1e7" />
          <circle cx="21" cy="27" r="2" fill="#f6f1e7" />
          {/* tracks */}
          <line x1="4" y1="29" x2="28" y2="29" />
        </svg>
      );

    case "misc":
      return (
        <svg {...COMMON} className={className} aria-hidden="true">
          {/* Receipt with zigzag bottom */}
          <path
            d="M9 4 H 23 V 26 L 21 24 L 19 26 L 17 24 L 15 26 L 13 24 L 11 26 L 9 24 Z"
            fill="#f6f1e7"
          />
          <line x1="12" y1="9" x2="20" y2="9" />
          <line x1="12" y1="13" x2="20" y2="13" />
          <line x1="12" y1="17" x2="18" y2="17" />
        </svg>
      );

    default:
      return null;
  }
}
