"use client";

import { motion } from "framer-motion";
import type { LibraryCategory } from "@/data/libraryItems";
import { CATEGORY_LABELS, LIBRARY_ITEMS } from "@/data/libraryItems";

const CATEGORY_COUNTS: Record<LibraryCategory, number> = {
  origins: LIBRARY_ITEMS.filter((i) => i.category === "origins").length,
  empires: LIBRARY_ITEMS.filter((i) => i.category === "empires").length,
  encounters: LIBRARY_ITEMS.filter((i) => i.category === "encounters").length,
};

function OriginsVisual() {
  const bars = [
    { x: 40, h: 120, opacity: 0.35 },
    { x: 65, h: 160, opacity: 0.18 },
    { x: 90, h: 90, opacity: 0.4 },
    { x: 115, h: 180, opacity: 0.15 },
    { x: 140, h: 140, opacity: 0.3 },
    { x: 165, h: 70, opacity: 0.45 },
    { x: 190, h: 200, opacity: 0.12 },
    { x: 215, h: 110, opacity: 0.25 },
    { x: 240, h: 155, opacity: 0.2 },
  ];
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={260 - bar.h - 30}
          width={18}
          height={bar.h}
          fill="#e8c88a"
          opacity={bar.opacity}
          rx="1"
        />
      ))}
      <rect x="30" y="250" width="240" height="0.5" fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

function EmpiresVisual() {
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      <line x1="40" y1="50" x2="120" y2="80" stroke="#e8c88a" strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="80" x2="200" y2="60" stroke="#e8c88a" strokeWidth="1" opacity="0.35" />
      <line x1="200" y1="60" x2="250" y2="100" stroke="#e8c88a" strokeWidth="1" opacity="0.25" />
      <line x1="120" y1="80" x2="80" y2="140" stroke="#e8c88a" strokeWidth="0.8" opacity="0.3" />
      <line x1="200" y1="60" x2="220" y2="150" stroke="#e8c88a" strokeWidth="0.8" opacity="0.2" />
      <line x1="80" y1="140" x2="140" y2="180" stroke="#e8c88a" strokeWidth="0.6" opacity="0.2" />
      <line x1="220" y1="150" x2="160" y2="210" stroke="#e8c88a" strokeWidth="0.6" opacity="0.15" />
      {[
        { cx: 40, cy: 50, r: 3 },
        { cx: 120, cy: 80, r: 4 },
        { cx: 200, cy: 60, r: 3.5 },
        { cx: 250, cy: 100, r: 2.5 },
        { cx: 80, cy: 140, r: 2 },
        { cx: 220, cy: 150, r: 2 },
        { cx: 140, cy: 180, r: 1.5 },
        { cx: 160, cy: 210, r: 1.5 },
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#e8c88a" opacity="0.6" />
      ))}
      <rect x="30" y="230" width="220" height="0.5" fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

function EncountersVisual() {
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      <path d="M80,80 Q140,40 200,100" fill="none" stroke="#e8c88a" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
      <path d="M60,160 Q140,120 220,140" fill="none" stroke="#5B9BBD" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
      <path d="M100,200 Q160,160 200,200" fill="none" stroke="#e8c88a" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 4" />
      {[
        { cx: 80, cy: 80, r: 10, color: "#e8c88a", opacity: 0.15 },
        { cx: 200, cy: 100, r: 12, color: "#5B9BBD", opacity: 0.12 },
        { cx: 60, cy: 160, r: 6, color: "#e8c88a", opacity: 0.2 },
        { cx: 220, cy: 140, r: 8, color: "#e8c88a", opacity: 0.15 },
      ].map((circle, i) => (
        <g key={i}>
          <circle cx={circle.cx} cy={circle.cy} r={circle.r} fill={circle.color} opacity={circle.opacity} />
          <circle cx={circle.cx} cy={circle.cy} r={2} fill={circle.color} opacity="0.6" />
        </g>
      ))}
      <rect x="30" y="230" width="220" height="0.5" fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

const VISUALS: Record<LibraryCategory, () => React.ReactNode> = {
  origins: OriginsVisual,
  empires: EmpiresVisual,
  encounters: EncountersVisual,
};

interface CategoryGridProps {
  selected: LibraryCategory | "all";
  onSelect: (cat: LibraryCategory | "all") => void;
}

export default function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  const categories: LibraryCategory[] = ["origins", "empires", "encounters"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
      {categories.map((cat, i) => {
        const isActive = selected === cat || selected === "all";
        const label = CATEGORY_LABELS[cat];
        const Visual = VISUALS[cat];
        const count = CATEGORY_COUNTS[cat];

        return (
          <motion.button
            key={cat}
            onClick={() => onSelect(isActive && selected === cat ? "all" : cat)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className={`group relative w-full rounded-xl border overflow-hidden transition-all duration-300 text-left ${
              isActive && selected === cat
                ? "border-accent/40 shadow-[0_0_30px_rgba(232,200,138,0.1)]"
                : "border-border/30 hover:border-accent/20"
            }`}
          >
            <div className="h-44 relative">
              <Visual />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
            </div>
            <div className="p-5 bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  isActive && selected === cat ? "bg-accent" : "bg-text-muted/30 group-hover:bg-accent/60"
                }`} />
                <span className="text-[9px] tracking-[0.2em] text-accent/60 font-display">
                  {label.en}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold tracking-wider text-foreground">
                {label.zh}
              </h3>
              <p className="text-[11px] text-text-muted/50 mt-1 mb-3">{label.zhSub}</p>
              <span className="text-[10px] tracking-widest text-text-muted/40">
                {count} {count === 1 ? "VOLUME" : "VOLUMES"}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}