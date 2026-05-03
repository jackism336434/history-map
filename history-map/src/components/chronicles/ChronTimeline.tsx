"use client";

import { motion } from "framer-motion";

const TIME_NODES = [
  { year: -3000, label: "3000 BC" },
  { year: -1000, label: "1000 BC" },
  { year: 0, label: "0" },
  { year: 500, label: "500 AD" },
  { year: 1500, label: "1500" },
  { year: 2024, label: "Today" },
];

interface ChronTimelineProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ChronTimeline({ selectedIndex, onSelect }: ChronTimelineProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-0 px-4">
        <div className="absolute left-4 right-4 h-px bg-accent/20" />
        {TIME_NODES.map((node, i) => {
          const isActive = i === selectedIndex;
          return (
            <button
              key={node.year}
              onClick={() => onSelect(i)}
              className="relative flex flex-col items-center gap-2 px-3 sm:px-5 group"
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  backgroundColor: isActive ? "#e8c88a" : "#292524",
                  borderColor: isActive ? "#e8c88a" : "#3d3020",
                  boxShadow: isActive
                    ? "0 0 10px rgba(232,200,138,0.3)"
                    : "0 0 0 transparent",
                }}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
                style={{ borderWidth: 1.5, borderStyle: "solid" }}
              />
              <motion.span
                className="text-[9px] tracking-widest whitespace-nowrap font-display"
                animate={{ color: isActive ? "#e8c88a" : "#78716c" }}
                transition={{ duration: 0.2 }}
              >
                {node.label}
              </motion.span>
            </button>
          );
        })}
      </div>

      <button className="px-5 py-2 text-[10px] tracking-[0.2em] rounded-full border border-accent/30 text-accent/70 hover:text-accent hover:border-accent/60 transition-colors duration-200 font-display">
        DISCOVER MORE
      </button>
    </div>
  );
}