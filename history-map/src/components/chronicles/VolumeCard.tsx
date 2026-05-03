"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Civilization } from "@/data/civilizations";
import { ERA_LABELS } from "@/data/civilizations";

interface VolumeCardProps {
  civ: Civilization;
  index: number;
  onClick: () => void;
}

export default function VolumeCard({ civ, index, onClick }: VolumeCardProps) {
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group w-72 flex-shrink-0 rounded-xl border border-border/40 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_24px_rgba(232,200,138,0.08)] text-left"
    >
      <div className="relative w-full h-[250px] overflow-hidden">
        <Image
          src={civ.coverImage}
          alt={civ.nameZh}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="288px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-[9px] tracking-[0.2em] text-accent/60 uppercase">
            VOL. {romanNumerals[index] ?? index + 1}
          </span>
        </div>
        <div className="absolute top-3 right-4">
          <span className="text-[9px] tracking-widest text-accent/50 border border-accent/30 px-2 py-0.5 rounded-full">
            {ERA_LABELS[civ.era].en}
          </span>
        </div>
      </div>

      <div className="p-5 bg-surface">
        <h3 className="text-xl font-display font-bold tracking-wider text-foreground mb-1">
          {civ.volumeTitle}
        </h3>
        <p className="text-[11px] tracking-widest text-accent/60 mb-2 uppercase">
          {civ.nameEn}
        </p>
        <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
          {civ.subtitle}
        </p>
      </div>
    </motion.button>
  );
}