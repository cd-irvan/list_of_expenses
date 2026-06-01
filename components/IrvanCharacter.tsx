export function IrvanCharacter({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* messy hair — base mass */}
      <path d="M52 56 C 48 34, 64 18, 82 22 C 100 25, 114 36, 112 56" />
      {/* tufts sticking up */}
      <path d="M60 27 L 55 17" />
      <path d="M70 22 L 67 11" />
      <path d="M82 21 L 85 10" />
      <path d="M94 24 L 100 14" />
      <path d="M104 31 L 112 25" />
      {/* unruly strands across the forehead */}
      <path d="M58 50 C 64 42, 72 44, 76 51" />
      <path d="M77 49 C 83 42, 92 44, 98 51" />
      <path d="M100 51 C 104 46, 108 48, 109 54" />
      {/* head */}
      <path d="M55 52 C 55 78, 65 92, 82 92 C 99 92, 108 78, 108 52" />
      {/* ears */}
      <path d="M55 65 C 51 65, 50 70, 53 73" />
      <path d="M108 65 C 112 65, 113 70, 110 73" />
      {/* eyes */}
      <circle cx="72" cy="66" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="93" cy="66" r="1.6" fill="currentColor" stroke="none" />
      {/* nose */}
      <path d="M82 70 L 82 76 L 84 78" />
      {/* mouth */}
      <path d="M76 82 C 80 85, 86 85, 90 82" />
      {/* glasses (subtle) */}
      <circle cx="72" cy="66" r="5" />
      <circle cx="93" cy="66" r="5" />
      <path d="M77 66 L 88 66" />
      {/* neck */}
      <path d="M76 92 L 76 100" />
      <path d="M88 92 L 88 100" />
      {/* shirt */}
      <path d="M76 100 C 60 104, 48 116, 46 140 L 56 140" />
      <path d="M88 100 C 104 104, 116 116, 118 140 L 108 140" />
      <path d="M76 100 L 82 108 L 88 100" />
      <path d="M56 140 L 56 168 L 108 168 L 108 140" />
      {/* arms */}
      <path d="M48 130 C 36 150, 32 170, 38 186" />
      <path d="M116 130 C 128 150, 132 170, 126 186" />
      {/* both hands */}
      <circle cx="38" cy="189" r="3.5" />
      <circle cx="126" cy="189" r="3.5" />
      {/* pants */}
      <path d="M58 168 L 62 230" />
      <path d="M106 168 L 102 230" />
      <path d="M82 168 L 82 226" />
      {/* shoes */}
      <path d="M58 230 L 70 232 L 70 226" />
      <path d="M106 230 L 94 232 L 94 226" />
    </svg>
  );
}
