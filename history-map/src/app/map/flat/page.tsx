"use client";

import Link from "next/link";
import MapFlat from "@/components/map/MapFlat";

export default function FlatMapPage() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <MapFlat />

      <Link
        href="/map"
        className="fixed top-20 left-8 z-40 px-4 py-2 rounded-lg border text-xs tracking-widest font-display transition-all duration-300 bg-surface/80 backdrop-blur-sm border-accent/20 text-text-muted hover:text-accent hover:border-accent/50 hover:shadow-[0_0_8px_rgba(232,200,138,0.1)]"
      >
        3D Globe
      </Link>
    </div>
  );
}
