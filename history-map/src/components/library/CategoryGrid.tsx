"use client";

import { motion } from "framer-motion";
import type { LibraryCategory } from "@/data/libraryItems";
import { CATEGORY_LABELS, LIBRARY_ITEMS } from "@/data/libraryItems";

const CATEGORY_COUNTS: Record<LibraryCategory, number> = {
  normative: LIBRARY_ITEMS.filter((i) => i.category === "normative").length,
  narrative: LIBRARY_ITEMS.filter((i) => i.category === "narrative").length,
  documentary: LIBRARY_ITEMS.filter((i) => i.category === "documentary").length,
};

function NormativeVisual() {
  const pillars = [
    { x: 60, w: 14, h: 160, opacity: 0.3 },
    { x: 90, w: 18, h: 190, opacity: 0.2 },
    { x: 125, w: 14, h: 170, opacity: 0.35 },
    { x: 160, w: 18, h: 185, opacity: 0.25 },
    { x: 195, w: 14, h: 155, opacity: 0.3 },
  ];
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      {pillars.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={260 - p.h - 30} width={p.w} height={p.h} fill="#e8c88a" opacity={p.opacity} rx="1" />
          <rect x={p.x - 3} y={260 - p.h - 30 - 8} width={p.w + 6} height={8} fill="#e8c88a" opacity={p.opacity + 0.1} rx="1" />
        </g>
      ))}
      <rect x="40" y="230" width="200" height={1} fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

function NarrativeVisual() {
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      <path d="M40,200 Q80,80 120,120 T200,100 T260,180" fill="none" stroke="#e8c88a" strokeWidth="1" opacity="0.35" />
      <path d="M40,180 Q100,60 150,140 Q200,200 260,150" fill="none" stroke="#e8c88a" strokeWidth="0.8" opacity="0.25" />
      {[
        { cx: 120, cy: 120, r: 4 },
        { cx: 200, cy: 100, r: 3 },
        { cx: 150, cy: 140, r: 3.5 },
      ].map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#e8c88a" opacity="0.6" />
      ))}
      <rect x="40" y="230" width="200" height={1} fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

function DocumentaryVisual() {
  const rows = [
    { y: 80, items: [40, 80, 120, 160, 200, 240] },
    { y: 120, items: [60, 100, 140, 180, 220] },
    { y: 160, items: [50, 90, 130, 170, 210] },
    { y: 200, items: [70, 110, 150, 190, 230] },
  ];
  return (
    <svg viewBox="0 0 280 260" className="w-full h-full">
      {rows.map((row, ri) =>
        row.items.map((x, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect x={x} y={row.y} width={28} height={4} fill="#e8c88a" opacity={0.15 + ri * 0.03} rx="1" />
            <circle cx={x + 14} cy={row.y - 4} r={1.5} fill="#e8c88a" opacity={0.3 + ri * 0.05} />
          </g>
        ))
      )}
      <rect x="30" y="230" width="220" height={1} fill="#e8c88a" opacity="0.2" />
    </svg>
  );
}

const VISUALS: Record<LibraryCategory, () => React.ReactNode> = {
  normative: NormativeVisual,
  narrative: NarrativeVisual,
  documentary: DocumentaryVisual,
};

interface CategoryGridProps {
  selected: LibraryCategory | "all";
  onSelect: (cat: LibraryCategory | "all") => void;
}

export default function CategoryGrid({ selected, onSelect }: CategoryGridProps) {
  const categories: LibraryCategory[] = ["normative", "narrative", "documentary"];

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