"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ArchiveItem } from "@/data/archiveItems";
import { CATEGORY_LABELS, REGION_LABELS } from "@/data/archiveItems";
import { CIVILIZATIONS } from "@/data/civilizations";

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
}

interface ArchiveDetailModalProps {
  item: ArchiveItem | null;
  onClose: () => void;
}

export default function ArchiveDetailModal({ item, onClose }: ArchiveDetailModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!item) return null;

  const civ = item.civId ? CIVILIZATIONS.find((c) => c.id === item.civId) : null;
  const regionLabel = REGION_LABELS[item.region];
  const categoryLabel = CATEGORY_LABELS[item.category];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-[80vw] max-w-4xl h-[80vh] rounded-2xl border border-accent/20 bg-surface/95 backdrop-blur-xl overflow-hidden shadow-2xl flex"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="关闭"
            >
              ✕
            </button>

            <div className="w-[45%] flex-shrink-0 relative overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-surface animate-pulse" />
              )}
              <Image
                src={item.coverImage}
                alt={item.titleZh}
                fill
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="45vw"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80" />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-[0.2em] text-accent/80 bg-background/50 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-accent/20 font-display">
                  {formatYear(item.year)}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-8 pb-4 border-b border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] tracking-[0.2em] text-accent/50 border border-accent/20 px-2 py-0.5 rounded-full">
                    {categoryLabel.zh} · {categoryLabel.en}
                  </span>
                  <span className="text-[9px] tracking-[0.15em] text-text-muted/40">
                    {regionLabel.zh}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-black tracking-wider text-foreground">
                  {item.titleZh}
                </h2>
                <p className="text-xs tracking-widest text-accent/50 mt-1 uppercase">
                  {item.titleEn}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-4 scrollbar-thin">
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[9px] tracking-widest text-text-muted/50 w-16 flex-shrink-0 mt-0.5">
                      TIME
                    </span>
                    <span className="text-sm text-foreground/80 font-display">
                      {formatYear(item.year)}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[9px] tracking-widest text-text-muted/50 w-16 flex-shrink-0 mt-0.5">
                      REGION
                    </span>
                    <span className="text-sm text-foreground/80">
                      {regionLabel.zh} · {regionLabel.en}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[9px] tracking-widest text-text-muted/50 w-16 flex-shrink-0 mt-0.5">
                      COORD
                    </span>
                    <span className="text-sm text-foreground/80 font-mono">
                      {Math.abs(item.lat).toFixed(4)}°{item.lat >= 0 ? "N" : "S"},{" "}
                      {Math.abs(item.lng).toFixed(4)}°{item.lng >= 0 ? "E" : "W"}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[9px] tracking-widest text-text-muted/50 w-16 flex-shrink-0 mt-0.5">
                      TAGS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] tracking-widest px-2 py-0.5 rounded-full border border-accent/20 text-accent/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {civ && (
                    <div className="flex items-start gap-3">
                      <span className="text-[9px] tracking-widest text-text-muted/50 w-16 flex-shrink-0 mt-0.5">
                        CIV
                      </span>
                      <span className="text-sm text-accent/70 font-display">
                        {civ.nameZh} · {civ.nameEn}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}