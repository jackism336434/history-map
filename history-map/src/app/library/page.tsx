"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import LibraryHero from "@/components/library/LibraryHero";
import CategoryGrid from "@/components/library/CategoryGrid";
import RevelationSection from "@/components/library/RevelationSection";
import SearchIndex from "@/components/library/SearchIndex";
import LibraryModal from "@/components/library/LibraryModal";
import { LIBRARY_ITEMS } from "@/data/libraryItems";
import type { LibraryCategory, LibraryItem } from "@/data/libraryItems";

interface IndexModalState {
  type: "chronology" | "geography" | "author";
  items: LibraryItem[];
}

export default function LibraryPage() {
  const [categoryFilter, setCategoryFilter] = useState<LibraryCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [indexModal, setIndexModal] = useState<IndexModalState | null>(null);

  const filtered = useMemo(() => {
    let list = LIBRARY_ITEMS;
    if (categoryFilter !== "all") {
      list = list.filter((i) => i.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.titleZh.toLowerCase().includes(q) ||
          i.titleEn.toLowerCase().includes(q) ||
          i.excerpt.toLowerCase().includes(q) ||
          i.authorZh.toLowerCase().includes(q) ||
          i.regionZh.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryFilter, search]);

  const revelation = useMemo(() => {
    return LIBRARY_ITEMS[Math.floor(Math.random() * LIBRARY_ITEMS.length)];
  }, []);

  const handleIndexClick = (type: "chronology" | "geography" | "author") => {
    let items: LibraryItem[];
    switch (type) {
      case "chronology":
        items = [...LIBRARY_ITEMS].sort((a, b) => a.year - b.year);
        break;
      case "geography":
        items = [...LIBRARY_ITEMS].sort((a, b) => a.regionZh.localeCompare(b.regionZh));
        break;
      case "author":
        items = [...LIBRARY_ITEMS].sort((a, b) => a.authorZh.localeCompare(b.authorZh));
        break;
    }
    setIndexModal({ type, items });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header pageContext="library" />

      <main className="flex-1 pt-16 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <LibraryHero />

          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8" />

          <CategoryGrid selected={categoryFilter} onSelect={setCategoryFilter} />

          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-10" />

          {categoryFilter === "all" && (
            <>
              <RevelationSection
                item={revelation}
                onReadMore={() => setSelectedItem(revelation)}
              />

              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-10" />
            </>
          )}

          {categoryFilter !== "all" && filtered.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-bold tracking-wider text-foreground">
                    {filtered.length} {filtered.length === 1 ? "VOLUME" : "VOLUMES"}
                  </h2>
                  <p className="text-[10px] tracking-widest text-text-muted/40 mt-0.5">
                    已检索到{filtered.length}卷文献数据
                  </p>
                </div>
                <button
                  onClick={() => setCategoryFilter("all")}
                  className="text-[10px] tracking-widest text-accent/50 hover:text-accent border border-accent/20 hover:border-accent/40 px-3 py-1 rounded-full transition-all duration-200"
                >
                  VIEW ALL · 查看全部
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group text-left p-4 rounded-lg border border-border/20 bg-surface/30 hover:border-accent/30 hover:bg-surface/60 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] tracking-[0.2em] text-accent/40 font-display">
                          {item.reference}
                        </span>
                        <h3 className="text-base font-display font-bold tracking-wider text-foreground mt-0.5 leading-snug">
                          {item.titleZh}
                        </h3>
                        <p className="text-[10px] tracking-widest text-accent/40 mt-0.5 uppercase truncate">
                          {item.titleEn}
                        </p>
                        <p className="text-[11px] text-text-muted/60 leading-relaxed mt-2 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <span className="text-[10px] tracking-wider text-accent/50 font-display">
                          {formatYear(item.year)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <SearchIndex
            searchValue={search}
            onSearchChange={setSearch}
            onIndexClick={handleIndexClick}
          />
        </div>
      </main>

      <LibraryModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {indexModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setIndexModal(null)}
        >
          <div
            className="relative w-[80vw] max-w-3xl max-h-[80vh] rounded-2xl border border-accent/20 bg-surface/95 backdrop-blur-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold tracking-wider text-foreground">
                  {indexModal.type === "chronology" ? "年代索引 · CHRONOLOGY" : indexModal.type === "geography" ? "地理坐标 · GEOGRAPHY" : "著者名录 · AUTHOR INDEX"}
                </h2>
              </div>
              <button
                onClick={() => setIndexModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-background/60 text-text-muted hover:text-accent transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto max-h-[65vh] p-6 space-y-3">
              {indexModal.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItem(item); setIndexModal(null); }}
                  className="group w-full text-left p-3 rounded-lg border border-border/10 hover:border-accent/30 hover:bg-surface/60 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <span className="text-[8px] tracking-[0.15em] text-text-muted/30 font-mono mr-2">{item.reference}</span>
                      <span className="text-sm font-display font-bold tracking-wider text-foreground">
                        {item.titleZh}
                      </span>
                      <span className="text-[9px] tracking-widest text-text-muted/40 ml-2 uppercase">
                        {item.titleEn}
                      </span>
                    </div>
                    <span className="text-[10px] tracking-wider text-accent/50 font-display flex-shrink-0 ml-3">
                      {formatYear(item.year)}
                    </span>
                  </div>
                  <p className="text-[10px] text-text-muted/40 mt-0.5 truncate">
                    {item.authorZh} · {item.regionZh}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
}