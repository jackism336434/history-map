"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/chronicles/Sidebar";
import HeroTitle from "@/components/chronicles/HeroTitle";
import FilterBar from "@/components/chronicles/FilterBar";
import VolumeCard from "@/components/chronicles/VolumeCard";
import CivilizationModal from "@/components/chronicles/CivilizationModal";
import ChronTimeline from "@/components/chronicles/ChronTimeline";
import { CIVILIZATIONS } from "@/data/civilizations";
import type { Era, Civilization } from "@/data/civilizations";

export default function ChroniclesPage() {
  const [eraFilter, setEraFilter] = useState<Era | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedCiv, setSelectedCiv] = useState<Civilization | null>(null);
  const [timelineIndex, setTimelineIndex] = useState(0);

  const filtered = useMemo(() => {
    let list = CIVILIZATIONS;
    if (eraFilter !== "all") {
      list = list.filter((c) => c.era === eraFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.nameZh.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q) ||
          c.volumeTitle.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [eraFilter, search]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header pageContext="chronicles" />

      <div className="flex flex-1 pt-16">
        <Sidebar />

        <main className="flex-1 ml-14 px-8 pb-8">
          <HeroTitle />

          <FilterBar
            selected={eraFilter}
            onSelect={setEraFilter}
            searchValue={search}
            onSearchChange={setSearch}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center pb-12">
            {filtered.map((civ, i) => (
              <VolumeCard
                key={civ.id}
                civ={civ}
                index={i}
                onClick={() => setSelectedCiv(civ)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-muted text-sm tracking-wider">未找到匹配的文明</p>
            </div>
          )}

          <div className="relative py-8 border-t border-border/30">
            <ChronTimeline selectedIndex={timelineIndex} onSelect={setTimelineIndex} />
          </div>
        </main>
      </div>

      <CivilizationModal civ={selectedCiv} onClose={() => setSelectedCiv(null)} />
    </div>
  );
}