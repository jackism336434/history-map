"use client";

const SIDEBAR_ITEMS = [
  { id: "archive", label: "ARCHIVE V.01", icon: "archive" },
  { id: "era", label: "ERA", icon: "era" },
  { id: "region", label: "REGION", icon: "region" },
  { id: "culture", label: "CULTURE", icon: "culture" },
  { id: "legacy", label: "LEGACY", icon: "legacy" },
] as const;

const ACTIVE_ITEM = "era";

function SidebarIcon({ type, active }: { type: string; active: boolean }) {
  const cls = active
    ? "text-accent"
    : "text-text-muted/30";

  switch (type) {
    case "archive":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-5 h-5 ${cls}`}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 9h16" />
          <path d="M9 4v5" />
        </svg>
      );
    case "era":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-5 h-5 ${cls}`}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "region":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-5 h-5 ${cls}`}>
          <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
          <path d="M12 3v18" />
        </svg>
      );
    case "culture":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-5 h-5 ${cls}`}>
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
        </svg>
      );
    case "legacy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-5 h-5 ${cls}`}>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M9 7h6" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-14 z-40 flex flex-col items-center pt-8 gap-6 border-r border-border/30 bg-background/60 backdrop-blur-sm">
      {SIDEBAR_ITEMS.map((item) => {
        const active = item.id === ACTIVE_ITEM;
        return (
          <button
            key={item.id}
            disabled={!active}
            className={`group relative flex flex-col items-center gap-1 transition-colors duration-200 ${
              active
                ? "text-accent"
                : "text-text-muted/30 cursor-default"
            }`}
          >
            {active && (
              <div className="absolute -left-[calc(1.75rem+1px)] top-1/2 -translate-y-1/2 w-[2px] h-5 bg-accent rounded-full" />
            )}
            <SidebarIcon type={item.icon} active={active} />
            <span className="text-[8px] tracking-widest">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}