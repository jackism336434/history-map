"use client";

import { useState } from "react";
import RegionFilter from "./RegionFilter";
import CategoryFilter from "./CategoryFilter";
import EraHistogram from "./EraHistogram";
import type { ArchiveRegion, ArchiveCategory } from "@/data/archiveItems";

interface ArchiveSidebarProps {
  regionFilter: ArchiveRegion | "all";
  onRegionChange: (r: ArchiveRegion | "all") => void;
  categoryFilter: ArchiveCategory | "all";
  onCategoryChange: (c: ArchiveCategory | "all") => void;
  eraRange: [number, number];
  onEraRangeChange: (r: [number, number]) => void;
}

export default function ArchiveSidebar({
  regionFilter,
  onRegionChange,
  categoryFilter,
  onCategoryChange,
  eraRange,
  onEraRangeChange,
}: ArchiveSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-40 flex flex-col border-r border-border/30 bg-background/95 backdrop-blur-sm transition-all duration-300 ${
        collapsed ? "w-10" : "w-64"
      }`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 flex items-center justify-center rounded-full bg-surface border border-border text-text-muted hover:text-accent transition-colors duration-200 z-10"
        aria-label={collapsed ? "展开" : "收起"}
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
                <path d="M12 3v18" />
              </svg>
              <span className="text-[9px] tracking-[0.2em] text-accent font-display">
                REGIONS · 地界限域
              </span>
            </div>
            <RegionFilter selected={regionFilter} onSelect={onRegionChange} />
          </div>

          <div className="h-px bg-border/30" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
              </svg>
              <span className="text-[9px] tracking-[0.2em] text-accent font-display">
                CATEGORIES · 史诗范畴
              </span>
            </div>
            <CategoryFilter selected={categoryFilter} onSelect={onCategoryChange} />
          </div>

          <div className="h-px bg-border/30" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
              <span className="text-[9px] tracking-[0.2em] text-accent font-display">
                ERA · 纪元跨度
              </span>
            </div>
            <EraHistogram
              range={eraRange}
              onRangeChange={onEraRangeChange}
            />
          </div>
        </div>
      )}
    </aside>
  );
}