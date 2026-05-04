"use client";

import type { Era } from "@/data/civilizations";
import { ERA_LABELS } from "@/data/civilizations";

interface FilterBarProps {
  selected: Era | "all";
  onSelect: (era: Era | "all") => void;
}

const FILTER_ITEMS: { value: Era | "all"; labelZh: string; labelEn: string }[] = [
  { value: "all", labelZh: "全部", labelEn: "ALL PERIODS" },
  { value: "ancient", labelZh: "远古", labelEn: ERA_LABELS.ancient.en },
  { value: "classical", labelZh: "古典", labelEn: ERA_LABELS.classical.en },
  { value: "medieval", labelZh: "中世纪", labelEn: ERA_LABELS.medieval.en },
];

export default function FilterBar({ selected, onSelect }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-8">
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
  );
}