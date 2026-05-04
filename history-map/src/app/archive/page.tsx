"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import ArchiveSidebar from "@/components/archive/ArchiveSidebar";
import ArchiveCard from "@/components/archive/ArchiveCard";
import ArchiveInfoWidget from "@/components/archive/ArchiveInfoWidget";
import ArchiveDetailModal from "@/components/archive/ArchiveDetailModal";
import { ARCHIVE_ITEMS } from "@/data/archiveItems";
import type { ArchiveRegion, ArchiveCategory, ArchiveItem } from "@/data/archiveItems";

export default function ArchivePage() {
  const [regionFilter, setRegionFilter] = useState<ArchiveRegion | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<ArchiveCategory | "all">("all");
  const [eraRange, setEraRange] = useState<[number, number]>([-3000, 1500]);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<ArchiveItem | null>(null);

  const filtered = useMemo(() => {
    let list = ARCHIVE_ITEMS;
    if (regionFilter !== "all") {
      list = list.filter((i) => i.region === regionFilter);
    }
    if (categoryFilter !== "all") {
      list = list.filter((i) => i.category === categoryFilter);
    }
    list = list.filter((i) => i.year >= eraRange[0] && i.year <= eraRange[1]);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.titleZh.toLowerCase().includes(q) ||
          i.titleEn.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [regionFilter, categoryFilter, eraRange, search]);

  const mapItems = useMemo(() => {
    return hoveredItem ? [hoveredItem] : filtered;
  }, [hoveredItem, filtered]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header pageContext="archive" searchValue={search} onSearchChange={setSearch} />

      <div className="flex flex-1 pt-16">
        <ArchiveSidebar
          regionFilter={regionFilter}
          onRegionChange={setRegionFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          eraRange={eraRange}
          onEraRangeChange={setEraRange}
        />

        <main className="flex-1 ml-64 mr-72 px-6 pb-8">
          <div className="flex items-center justify-between mb-4 pt-6">
            <div>
              <h1 className="text-3xl font-display font-black tracking-[0.12em] text-foreground">
                全球归档
              </h1>
              <p className="text-xs tracking-widest text-text-muted mt-1">
                GLOBAL ARCHIVE · RECOVERING LOST FRAGMENTS
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-2xl font-display font-bold text-accent">
                  {filtered.length}
                </span>
                <span className="text-[10px] tracking-widest text-text-muted ml-2">
                  ITEMS RECOVERED
                </span>
                <span className="text-[10px] tracking-widest text-text-muted/40 ml-1">
                  已检索到{filtered.length}项数据
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <ArchiveCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setSelectedItem(item)}
                onHover={() => setHoveredItem(item)}
                onLeave={() => setHoveredItem(null)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted/60 text-sm tracking-widest">
                NO FRAGMENTS RECOVERED
              </p>
              <p className="text-text-muted/40 text-xs mt-1">
                未检索到匹配的归档数据
              </p>
            </div>
          )}
        </main>

        <ArchiveInfoWidget
          items={mapItems}
          activeItem={hoveredItem || selectedItem}
          total={filtered.length}
        />
      </div>

      <ArchiveDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}