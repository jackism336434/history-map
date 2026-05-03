"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TimeNode {
  year: number;
  label: string;
}

const TIME_NODES: TimeNode[] = [
  { year: -1200, label: "1200 BCE" },
  { year: -800, label: "800 BCE" },
  { year: -400, label: "400 BCE" },
  { year: 0, label: "0 CE" },
  { year: 200, label: "200 CE" },
  { year: 400, label: "400 CE" },
];

interface TimelineBarProps {
  onYearChange?: (year: number) => void;
}

export default function TimelineBar({ onYearChange }: TimelineBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(3);

  function handleSelect(index: number) {
    setSelectedIndex(index);
    onYearChange?.(TIME_NODES[index].year);
  }

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
      <div className="relative flex items-center gap-0 px-4">
        <div className="absolute top-1/2 left-4 right-4 h-px bg-accent/30 -translate-y-1/2" />

        {TIME_NODES.map((node, i) => {
          const isActive = i === selectedIndex;
          return (
            <button
              key={node.year}
              onClick={() => handleSelect(i)}
              className="relative flex flex-col items-center gap-2 px-4 sm:px-6 group"
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: isActive ? 14 : 8,
                  height: isActive ? 14 : 8,
                  backgroundColor: isActive ? "#e8c88a" : "#1c1917",
                  borderColor: isActive ? "#e8c88a" : "#3d3020",
                  boxShadow: isActive
                    ? "0 0 12px rgba(232,200,138,0.4)"
                    : "0 0 0px transparent",
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.25 }}
                style={{ borderWidth: 2, borderStyle: "solid" }}
              />

              <motion.span
                className="text-[10px] tracking-wider whitespace-nowrap font-display"
                animate={{
                  color: isActive ? "#e8c88a" : "#a8a29e",
                }}
                transition={{ duration: 0.25 }}
              >
                {node.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
