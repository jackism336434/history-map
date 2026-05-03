"use client";

import { useMemo, useState, useEffect } from "react";
import WorldDotMap from "./WorldDotMap";
import type { ArchiveItem } from "@/data/archiveItems";

const STATUS_MESSAGES = [
  "SYNCING ARCHIVE DATABASE...",
  "正在同步归档数据库...",
  "SCANNING FRAGMENT INTEGRITY...",
  "正在扫描碎片完整性...",
  "CROSS-REFERENCING TEMPORAL INDEX...",
  "交叉校验时间索引...",
  "RECOVERED 3 NEW FRAGMENTS...",
  "已恢复3个新碎片...",
  "VERIFYING COORDINATE ALIGNMENT...",
  "正在校验坐标对齐...",
];

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
}

interface ArchiveInfoWidgetProps {
  items: ArchiveItem[];
  activeItem: ArchiveItem | null;
  total: number;
}

export default function ArchiveInfoWidget({
  items,
  activeItem,
  total,
}: ArchiveInfoWidgetProps) {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const coords = useMemo(() => {
    if (!activeItem) return null;
    const latDir = activeItem.lat >= 0 ? "N" : "S";
    const lngDir = activeItem.lng >= 0 ? "E" : "W";
    return {
      lat: `${Math.abs(activeItem.lat).toFixed(4)}° ${latDir}`,
      lng: `${Math.abs(activeItem.lng).toFixed(4)}° ${lngDir}`,
    };
  }, [activeItem]);

  return (
    <aside className="fixed right-0 top-16 bottom-0 w-72 flex-shrink-0 border-l border-border/30 bg-background/95 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
            <path d="M12 3v18" />
          </svg>
          <span className="text-[9px] tracking-[0.2em] text-accent font-display">
            COORDINATE MAP
          </span>
        </div>
        <p className="text-[8px] tracking-widest text-text-muted/40">
          动态坐标图 · 时空定位系统
        </p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="rounded-lg bg-surface/80 border border-border/20 p-2 overflow-hidden">
          <WorldDotMap items={items} activeItem={activeItem} />
        </div>

        {coords && (
          <div className="mt-3 p-3 rounded-md bg-surface/40 border border-border/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-breathe" />
              <span className="text-[9px] tracking-[0.15em] text-accent/70 font-display">
                REAL-TIME COORDINATES
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-widest text-text-muted/50">LAT</span>
                <span className="text-[11px] tracking-wider text-accent/80 font-mono">
                  {coords.lat}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-widest text-text-muted/50">LNG</span>
                <span className="text-[11px] tracking-wider text-accent/80 font-mono">
                  {coords.lng}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] tracking-widest text-text-muted/50">ERA</span>
                <span className="text-[11px] tracking-wider text-accent/80 font-display">
                  {formatYear(activeItem!.year)}
                </span>
              </div>
            </div>
          </div>
        )}

        {!coords && (
          <div className="mt-3 text-center py-4">
            <p className="text-[9px] tracking-widest text-text-muted/30">
              SELECT AN ITEM TO VIEW COORDINATES
            </p>
          </div>
        )}

        {activeItem && (
          <div className="mt-3 p-3 rounded-md bg-surface/60 border border-border/15">
            <h4 className="text-xs font-display font-bold tracking-wider text-foreground line-clamp-1">
              {activeItem.titleZh}
            </h4>
            <p className="text-[9px] tracking-widest text-accent/50 mt-0.5 uppercase line-clamp-1">
              {activeItem.titleEn}
            </p>
            <p className="text-[10px] text-text-muted/60 leading-relaxed mt-1.5 line-clamp-3">
              {activeItem.description}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border/20 flex-shrink-0">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-breathe" />
          <span className="text-[9px] tracking-[0.15em] text-accent/60 font-display">
            ACTIVE DISCOVERY
          </span>
        </div>
        <p className="text-[10px] text-text-muted/40 leading-relaxed font-mono">
          {STATUS_MESSAGES[statusIndex]}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[9px] tracking-wider text-text-muted/30">
            {total} / {items.length} FRAGMENTS
          </span>
        </div>
      </div>
    </aside>
  );
}