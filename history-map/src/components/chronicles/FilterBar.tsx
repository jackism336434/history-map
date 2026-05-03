"use client";

import type { Era } from "@/data/civilizations";
import { ERA_LABELS } from "@/data/civilizations";

interface FilterBarProps {
  selected: Era | "all";
  onSelect: (era: Era | "all") => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
}

const FILTER_ITEMS: { value: Era | "all"; labelZh: string; labelEn: string }[] = [
  { value: "all", labelZh: "全部", labelEn: "ALL PERIODS" },
  { value: "ancient", labelZh: "远古", labelEn: ERA_LABELS.ancient.en },
  { value: "classical", labelZh: "古典", labelEn: ERA_LABELS.classical.en },
  { value: "medieval", labelZh: "中世纪", labelEn: ERA_LABELS.medieval.en },
];

export default function FilterBar({ selected, onSelect, searchValue, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_ITEMS.map((item) => {
          const active = selected === item.value;
          return (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              className={`px-4 py-1.5 rounded-full text-[11px] tracking-widest border transition-all duration-200 ${
                active
                  ? "bg-accent/20 text-accent border-accent/40"
                  : "bg-surface text-text-muted border-border hover:text-foreground hover:border-accent/30"
              }`}
            >
              {item.labelEn}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="探索古文明..."
          className="w-44 px-4 py-1.5 text-[11px] tracking-wider rounded-full bg-surface border border-border text-foreground placeholder:text-text-muted/60 focus:outline-none focus:border-accent/60 transition-colors duration-200"
        />
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}