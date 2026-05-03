"use client";

import { REGION_LABELS, ARCHIVE_ITEMS } from "@/data/archiveItems";
import type { ArchiveRegion } from "@/data/archiveItems";

const REGIONS: (ArchiveRegion | "all")[] = [
  "all",
  "asia",
  "europe",
  "africa",
  "americas",
  "oceania",
];

interface RegionFilterProps {
  selected: ArchiveRegion | "all";
  onSelect: (r: ArchiveRegion | "all") => void;
}

export default function RegionFilter({ selected, onSelect }: RegionFilterProps) {
  return (
    <div className="space-y-1">
      {REGIONS.map((r) => {
        const isActive = selected === r;
        const count =
          r === "all"
            ? ARCHIVE_ITEMS.length
            : ARCHIVE_ITEMS.filter((i) => i.region === r).length;
        const label =
          r === "all"
            ? { zh: "全部界域", en: "ALL REGIONS" }
            : REGION_LABELS[r];

        return (
          <button
            key={r}
            onClick={() => onSelect(r)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-all duration-200 group ${
              isActive
                ? "bg-accent/10 text-accent"
                : "text-text-muted/70 hover:text-foreground hover:bg-surface-light/50"
            }`}
          >
            <div className="flex flex-col">
              <span className="text-xs tracking-wider font-display">{label.zh}</span>
              <span className="text-[9px] tracking-widest opacity-60">{label.en}</span>
            </div>
            <span
              className={`text-[10px] tabular-nums tracking-wider ${
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