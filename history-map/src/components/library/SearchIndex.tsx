"use client";

import { LibraryItem } from "@/data/libraryItems";

interface SearchIndexProps {
  searchValue: string;
  onSearchChange: (v: string) => void;
  onIndexClick: (type: "chronology" | "geography" | "author") => void;
}

export default function SearchIndex({ searchValue, onSearchChange, onIndexClick }: SearchIndexProps) {
  const indices = [
    {
      type: "chronology" as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
      zh: "年代索引",
      en: "CHRONOLOGY",
      desc: "按时间顺序检索文献",
    },
    {
      type: "geography" as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
          <path d="M12 3v18" />
        </svg>
      ),
      zh: "地理坐标",
      en: "GEOGRAPHY",
      desc: "按地区分类浏览文献",
    },
    {
      type: "author" as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M9 7h6" />
        </svg>
      ),
      zh: "著者名录",
      en: "AUTHOR INDEX",
      desc: "按著者/来源检索文献",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative max-w-lg mx-auto mb-8">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="检索古代文献..."
          className="w-full px-6 py-3 text-sm tracking-wider rounded-full bg-surface border border-border text-foreground placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
        />
        <svg
          className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indices.map((idx) => (
          <button
            key={idx.type}
            onClick={() => onIndexClick(idx.type)}
            className="group flex flex-col items-center text-center p-5 rounded-lg border border-border/20 bg-surface/30 hover:border-accent/30 hover:bg-surface/60 transition-all duration-200"
          >
            <div className="text-text-muted/40 group-hover:text-accent/60 transition-colors duration-200 mb-3">
              {idx.icon}
            </div>
            <h3 className="text-sm font-display font-bold tracking-wider text-foreground mb-0.5">
              {idx.zh}
            </h3>
            <p className="text-[9px] tracking-[0.2em] text-accent/50 font-display mb-2">
              {idx.en}
            </p>
            <p className="text-[11px] text-text-muted/40 leading-relaxed">
              {idx.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}