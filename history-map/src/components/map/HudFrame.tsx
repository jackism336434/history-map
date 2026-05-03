export default function HudFrame() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-accent/30" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-accent/30" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-accent/30" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-accent/30" />

      <span className="absolute top-7 left-20 text-[9px] tracking-widest text-accent/40 font-mono animate-hud-flicker">
        32°N 34°E
      </span>
      <span className="absolute top-7 right-20 text-[9px] tracking-widest text-accent/40 font-mono animate-hud-flicker">
        ZONE 36N
      </span>
      <span className="absolute bottom-7 left-20 text-[9px] tracking-widest text-accent/40 font-mono animate-hud-flicker">
        ELEV. 0M
      </span>
      <span className="absolute bottom-7 right-20 text-[9px] tracking-widest text-accent/40 font-mono animate-hud-flicker">
        SCALE 1:50M
      </span>

      <svg
        className="absolute top-7 left-1/2 -translate-x-1/2 w-5 h-5 text-accent/40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" />
        <circle cx="12" cy="12" r="3" />
      </svg>

      <div className="absolute top-1/2 -translate-y-1/2 left-3 flex flex-col gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-1.5 h-px bg-accent/20" />
        ))}
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-3 flex flex-col gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-1.5 h-px bg-accent/20" />
        ))}
      </div>
    </div>
  );
}
