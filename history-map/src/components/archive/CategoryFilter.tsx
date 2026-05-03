"use client";

import { CATEGORY_LABELS, ARCHIVE_ITEMS } from "@/data/archiveItems";
import type { ArchiveCategory } from "@/data/archiveItems";

const CATEGORIES: (ArchiveCategory | "all")[] = [
  "all",
  "empire",
  "silkroad",
  "maritime",
  "belief",
  "science",
  "documentary",
  "artifact",
];

const CATEGORY_ICONS: Record<string, string> = {
  empire: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  silkroad: "M3 12h18M3 6l18 6M3 18l18-6",
  maritime: "M2 17c1-2 3-4 6-4s5 2 6 4 4 4 7 4 5-2 6-4M2 11c1-2 3-4 6-4s5 2 6 4 4 4 7 4",
  belief: "M12 2v20M5 7h14M8 2h8",
  science: "M12 2a7 7 0 017 7c0 5-7 11-7 11S5 14 5 9a7 7 0 017-7z",
  documentary: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  artifact: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
};

interface CategoryFilterProps {
  selected: ArchiveCategory | "all";
  onSelect: (c: ArchiveCategory | "all") => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="space-y-1">
      {CATEGORIES.map((c) => {
        const isActive = selected === c;
        const count =
          c === "all"
            ? ARCHIVE_ITEMS.length
            : ARCHIVE_ITEMS.filter((i) => i.category === c).length;
        const label =
          c === "all"
            ? { zh: "全部范畴", en: "ALL CATEGORIES" }
            : CATEGORY_LABELS[c];

        return (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-all duration-200 ${
              isActive
                ? "bg-accent/10 text-accent"
                : "text-text-muted/70 hover:text-foreground hover:bg-surface-light/50"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 flex-shrink-0 ${
                isActive ? "text-accent" : "text-text-muted/40"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  c === "all"
                    ? "M3 7l9-4 9 4v10l-9 4-9-4V7zM12 3v18"
                    : CATEGORY_ICONS[c] || CATEGORY_ICONS.documentary
                }
              />
            </svg>
            <div className="flex-1 flex flex-col">
              <span className="text-[11px] tracking-wider font-display">{label.zh}</span>
              <span className="text-[8px] tracking-widest opacity-50">{label.en}</span>
            </div>
            <span
              className={`text-[10px] tabular-nums tracking-wider flex-shrink-0 ${
                isActive ? "text-accent/70" : "text-text-muted/40"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}