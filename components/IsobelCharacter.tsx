export function IsobelCharacter({ className }: { className?: string }) {
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
      {/* hair top */}
      <path d="M52 56 C 52 34, 70 22, 84 24 C 102 27, 114 42, 112 60" />
      {/* face */}
      <path d="M58 60 C 58 86, 68 96, 82 96 C 96 96, 106 86, 106 60" />
      {/* hair sides flowing down */}
      <path d="M52 56 C 46 78, 44 104, 50 130" />
      <path d="M112 60 C 118 80, 122 108, 116 132" />
      {/* hair strands */}
      <path d="M56 80 C 52 96, 52 110, 56 122" />
      <path d="M108 82 C 112 98, 112 112, 110 124" />
      {/* fringe */}
      <path d="M62 52 C 70 48, 78 50, 82 56" />
      <path d="M82 56 C 88 52, 96 50, 104 56" />
      {/* eyes */}
      <path d="M70 70 C 72 72, 74 72, 76 70" />
      <path d="M88 70 C 90 72, 92 72, 94 70" />
      {/* eyelashes */}
      <path d="M71 68 L 70 66" />
      <path d="M89 68 L 88 66" />
      {/* nose */}
      <path d="M82 74 L 82 80 L 84 82" />
      {/* mouth */}
      <path d="M76 87 C 80 89, 86 89, 90 87" />
      {/* earrings */}
      <circle cx="56" cy="80" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="108" cy="80" r="1.4" fill="currentColor" stroke="none" />
      {/* neck */}
      <path d="M76 96 L 76 104" />
      <path d="M88 96 L 88 104" />
      {/* dress top */}
      <path d="M76 104 C 62 108, 52 116, 48 132" />
      <path d="M88 104 C 102 108, 112 116, 116 132" />
      <path d="M76 104 L 82 112 L 88 104" />
      {/* dress flare */}
      <path d="M48 132 C 44 156, 40 178, 38 196 L 126 196 C 124 178, 120 156, 116 132" />
      {/* dress mid line */}
      <path d="M82 112 L 82 196" />
      {/* arms */}
      <path d="M52 128 C 44 148, 40 168, 42 186" />
      <path d="M112 128 C 120 148, 124 168, 122 186" />
      <circle cx="42" cy="189" r="3.5" />
      <circle cx="122" cy="189" r="3.5" />
      {/* legs */}
      <path d="M68 196 L 66 230" />
      <path d="M96 196 L 98 230" />
      {/* shoes */}
      <path d="M66 230 L 76 232 L 76 226" />
      <path d="M98 230 L 88 232 L 88 226" />
    </svg>
  );
}
