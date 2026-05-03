"use client";

import { useMemo } from "react";
import ScrollVisual from "./ScrollVisual";
import type { LibraryItem } from "@/data/libraryItems";
import { CATEGORY_LABELS } from "@/data/libraryItems";

interface RevelationSectionProps {
  item: LibraryItem;
  onReadMore: () => void;
}

export default function RevelationSection({ item, onReadMore }: RevelationSectionProps) {
  const label = CATEGORY_LABELS[item.category];

  const yearDisplay = useMemo(() => {
    if (item.year < 0) return `${Math.abs(item.year)} BC`;
    if (item.year === 0) return "1 AD";
    return `${item.year} AD`;
  }, [item.year]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-breathe" />
        <h2 className="text-[11px] tracking-[0.25em] text-accent/70 font-display">
          TODAY&apos;S REVELATION · 每日启示
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="order-2 md:order-1">
          <ScrollVisual />
        </div>

        <div className="order-1 md:order-2 flex flex-col justify-center">
          <span className="text-[9px] tracking-[0.2em] text-accent/50 border border-accent/20 px-2 py-0.5 rounded-full inline-block w-fit mb-3">
            {label.zh} · {label.en}
          </span>

          <h3 className="text-2xl font-display font-black tracking-wider text-foreground mb-1">
            {item.titleZh}
          </h3>
          <p className="text-xs tracking-widest text-accent/50 mb-4 uppercase">
            {item.titleEn}
          </p>

          <div className="space-y-1.5 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-widest text-text-muted/40 w-14">DATE</span>
              <span className="text-xs text-accent/70 font-display">{yearDisplay}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-widest text-text-muted/40 w-14">REGION</span>
              <span className="text-xs text-foreground/70">{item.regionZh} · {item.regionEn}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] tracking-widest text-text-muted/40 w-14">AUTHOR</span>
              <span className="text-xs text-foreground/70">{item.authorZh}</span>
            </div>
          </div>

          <p className="text-[13px] text-text-muted/80 leading-relaxed italic mb-4 line-clamp-4">
            「{item.excerpt}」
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onReadMore}
              className="px-5 py-2 text-[11px] tracking-widest rounded-full border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-200 font-display"
            >
              READ FULL TEXT
            </button>
            <span className="text-[9px] tracking-[0.15em] text-text-muted/30 font-mono">
              ARCHIVE REF: {item.reference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}