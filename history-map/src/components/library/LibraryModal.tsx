"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { LibraryItem } from "@/data/libraryItems";
import { CATEGORY_LABELS } from "@/data/libraryItems";

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
}

interface LibraryModalProps {
  item: LibraryItem | null;
  onClose: () => void;
}

export default function LibraryModal({ item, onClose }: LibraryModalProps) {
  if (!item) return null;

  const label = CATEGORY_LABELS[item.category];

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
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[85vw] max-w-5xl h-[85vh] rounded-2xl border border-accent/20 bg-surface/95 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="关闭"
            >
              ✕
            </button>

            <div className="px-8 pt-6 pb-4 border-b border-border/30 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] tracking-[0.2em] text-accent/50 border border-accent/20 px-2 py-0.5 rounded-full">
                    {label.zh} · {label.en}
                  </span>
                  <span className="text-[9px] tracking-[0.15em] text-text-muted/30 font-mono">
                    {item.reference}
                  </span>
                </div>
                <h2 className="text-2xl font-display font-black tracking-wider text-foreground">
                  {item.titleZh}
                </h2>
                <p className="text-xs tracking-widest text-accent/50 mt-0.5 uppercase">
                  {item.titleEn}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-widest text-text-muted/40">DATE</p>
                <p className="text-sm font-display text-accent/70">{formatYear(item.year)}</p>
                <p className="text-[10px] tracking-widest text-text-muted/40 mt-1.5">REGION</p>
                <p className="text-xs text-foreground/70">{item.regionZh} · {item.regionEn}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              <div className="max-w-none">
                <div className="mb-4 p-3 rounded-md bg-background/40 border border-border/10">
                  <p className="text-[13px] text-accent/70 italic leading-relaxed">
                    「{item.excerpt}」
                  </p>
                  <p className="text-[10px] text-text-muted/40 mt-2 font-mono text-right">
                    — {item.authorZh} · {item.authorEn}
                  </p>
                </div>

                <div className="prose-custom">
                  <ReactMarkdown>{item.fullText}</ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="px-8 py-3 border-t border-border/20 flex items-center justify-between">
              <span className="text-[9px] tracking-[0.15em] text-text-muted/30 font-mono">
                ARCHIVE REF: {item.reference}
              </span>
              <span className="text-[9px] tracking-widest text-text-muted/30">
                {item.authorZh}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}