"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const START_YEAR = -221;
const END_YEAR = 2024;

function yearToLabel(year: number): string {
  if (year < 0) return `BC ${Math.abs(year)}`;
  if (year === 0) return "AD 1";
  return `AD ${year}`;
}

export default function Timeline() {
  const [value, setValue] = useState(0.5);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const currentYear = Math.round(START_YEAR + value * (END_YEAR - START_YEAR));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateValue(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updateValue(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  function updateValue(e: React.PointerEvent) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, y / rect.height));
    setValue(ratio);
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 h-[60vh] select-none">
      <span className="text-[10px] tracking-wider text-text-muted">
        {yearToLabel(START_YEAR)}
      </span>

      <div
        ref={trackRef}
        className="relative flex-1 w-px bg-border cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="absolute top-0 left-0 w-full bg-accent/40" style={{ height: `${value * 100}%` }} />

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background shadow-lg cursor-grab active:cursor-grabbing"
          style={{ top: `${value * 100}%` }}
          whileHover={{ scale: 1.3 }}
        />
      </div>

      <span className="text-[10px] tracking-wider text-text-muted">
        {yearToLabel(END_YEAR)}
      </span>

      <motion.div
        className="mt-2 px-3 py-1 text-xs tracking-wider text-accent bg-surface rounded-full border border-border"
        key={currentYear}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {yearToLabel(currentYear)}
      </motion.div>
    </div>
  );
}
