"use client";

import { useMemo, useRef, useCallback } from "react";
import { ARCHIVE_ITEMS } from "@/data/archiveItems";

const BINS = [
  { label: "3000\nBC", start: -3000, end: -2000 },
  { label: "2000\nBC", start: -2000, end: -1000 },
  { label: "1000\nBC", start: -1000, end: 0 },
  { label: "1\nAD", start: 0, end: 500 },
  { label: "500", start: 500, end: 1000 },
  { label: "1000", start: 1000, end: 1500 },
  { label: "1500", start: 1500, end: 2024 },
];

interface EraHistogramProps {
  range: [number, number];
  onRangeChange: (r: [number, number]) => void;
}

export default function EraHistogram({ range, onRangeChange }: EraHistogramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"start" | "end" | null>(null);

  const bins = useMemo(() => {
    return BINS.map((bin) => ({
      ...bin,
      count: ARCHIVE_ITEMS.filter((i) => i.year >= bin.start && i.year < bin.end).length,
    }));
  }, []);

  const maxCount = Math.max(...bins.map((b) => b.count), 1);

  const yearToX = useCallback(
    (year: number) => {
      const totalRange = 2024 - -3000;
      return ((year - -3000) / totalRange) * 100;
    },
    []
  );

  const xToYear = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return 0;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return Math.round(pct * (2024 - -3000) + -3000);
    },
    []
  );

  const handleMouseDown = (handle: "start" | "end") => {
    dragging.current = handle;
    const handleMove = (e: MouseEvent) => {
      const year = xToYear(e.clientX);
      if (dragging.current === "start") {
        onRangeChange([Math.min(year, range[1]), range[1]]);
      } else {
        onRangeChange([range[0], Math.max(year, range[0])]);
      }
    };
    const handleUp = () => {
      dragging.current = null;
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const startPct = yearToX(range[0]);
  const endPct = yearToX(range[1]);

  return (
    <div className="mt-2">
      <div ref={containerRef} className="relative pt-6 pb-2 select-none">
        <div className="absolute left-0 right-0 top-6 flex items-end gap-[2px] h-16 px-0.5">
          {bins.map((bin) => {
            const height = (bin.count / maxCount) * 100;
            const inRange = bin.end > range[0] && bin.start < range[1];
            return (
              <div
                key={bin.start}
                className="flex-1 flex flex-col items-center justify-end"
              >
                <div
                  className={`w-full rounded-t-[2px] transition-colors duration-200 ${
                    inRange
                      ? "bg-accent/70"
                      : "bg-surface-light/60"
                  }`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute top-6 bottom-2 bg-accent/8 border-y border-accent/20 rounded-sm transition-all duration-75"
          style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
        />

        <div
          className="absolute top-4 bottom-1 w-[3px] bg-accent rounded-full cursor-ew-resize hover:bg-accent-bright transition-colors z-10"
          style={{ left: `calc(${startPct}% - 1.5px)` }}
          onMouseDown={() => handleMouseDown("start")}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-accent rounded-full" />
        </div>

        <div
          className="absolute top-4 bottom-1 w-[3px] bg-accent rounded-full cursor-ew-resize hover:bg-accent-bright transition-colors z-10"
          style={{ left: `calc(${endPct}% - 1.5px)` }}
          onMouseDown={() => handleMouseDown("end")}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-accent rounded-full" />
        </div>

        <div className="flex justify-between mt-1">
          {bins.map((bin) => (
            <div key={bin.start} className="flex-1 text-center">
              <span className="text-[7px] tracking-wider text-text-muted/40 leading-tight whitespace-pre-line font-display">
                {bin.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        <span className="text-[9px] tracking-wider text-accent/60 font-display">
          {range[0] < 0 ? `${Math.abs(range[0])} BC` : `${range[0]} AD`}
        </span>
        <span className="text-[9px] tracking-wider text-text-muted/40">—</span>
        <span className="text-[9px] tracking-wider text-accent/60 font-display">
          {range[1] < 0 ? `${Math.abs(range[1])} BC` : `${range[1]} AD`}
        </span>
      </div>
    </div>
  );
}