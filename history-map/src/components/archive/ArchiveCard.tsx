"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ArchiveItem } from "@/data/archiveItems";

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
}

interface ArchiveCardProps {
  item: ArchiveItem;
  index: number;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export default function ArchiveCard({
  item,
  index,
  onClick,
  onHover,
  onLeave,
}: ArchiveCardProps) {
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.6) }}
      whileHover={{ y: -3 }}
      className="group w-full text-left rounded-lg border border-border/30 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(232,200,138,0.06)]"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={item.coverImage}
          alt={item.titleZh}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

        <div className="absolute top-2 right-2">
          <span className="text-[9px] tracking-[0.15em] text-accent/80 bg-background/60 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-accent/20 font-display">
            {formatYear(item.year)}
          </span>
        </div>

        <div className="absolute bottom-2 left-2 flex gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[7px] tracking-widest text-foreground/50 bg-background/50 backdrop-blur-sm px-1.5 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 bg-surface">
        <h3 className="text-sm font-display font-bold tracking-wider text-foreground leading-snug line-clamp-1">
          {item.titleZh}
        </h3>
        <p className="text-[9px] tracking-widest text-accent/50 mt-0.5 uppercase line-clamp-1">
          {item.titleEn}
        </p>
        <p className="text-[11px] text-text-muted/70 leading-relaxed mt-1.5 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.button>
  );
}