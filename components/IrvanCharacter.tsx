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
      {/* hair */}
      <path d="M52 50 C 55 30, 75 22, 88 26 C 102 30, 112 38, 112 52" />
      <path d="M58 44 C 62 38, 70 36, 78 38" />
      <path d="M88 38 C 94 38, 100 42, 104 48" />
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
      <path d="M48 130 C 36 150, 32 170, 38 188" />
      <path d="M116 130 C 124 142, 130 152, 130 168" />
      {/* waving hand */}
      <path d="M38 188 C 34 184, 32 178, 34 174" />
      <path d="M38 188 C 36 192, 36 196, 40 198" />
      {/* other hand */}
      <circle cx="131" cy="171" r="3.5" />
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
