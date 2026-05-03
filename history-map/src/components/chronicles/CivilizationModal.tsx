"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { Civilization } from "@/data/civilizations";
import { ERA_LABELS } from "@/data/civilizations";
import type { AncientCity } from "@/data/ancientCities";
import { ANCIENT_CITIES } from "@/data/ancientCities";

interface CivilizationModalProps {
  civ: Civilization | null;
  onClose: () => void;
}

export default function CivilizationModal({ civ, onClose }: CivilizationModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!civ) return null;

  const relatedCities = civ.cities
    .map((name) => ANCIENT_CITIES.find((c) => c.nameEn === name))
    .filter((c): c is AncientCity => c !== undefined);

  return (
    <AnimatePresence>
      {civ && (
        <motion.div
          key={civ.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[90vw] max-w-5xl h-[85vh] rounded-2xl border border-accent/20 bg-surface/95 backdrop-blur-xl overflow-hidden shadow-2xl flex"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/60 text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="关闭"
            >
              ✕
            </button>

            <div className="w-[40%] flex-shrink-0 relative overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-surface animate-pulse" />
              )}
              <Image
                src={civ.coverImage}
                alt={civ.nameZh}
                fill
                className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="40vw"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] tracking-[0.2em] text-accent/60 uppercase border border-accent/30 px-2 py-0.5 rounded-full">
                  {ERA_LABELS[civ.era].en}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-8 pb-4 border-b border-border/30">
                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="text-3xl font-display font-black tracking-wider text-foreground">
                    {civ.nameZh}
                  </h2>
                  <span className="text-xs tracking-widest text-text-muted">
                    {civ.nameEn}
                  </span>
                </div>
                <p className="text-sm italic text-accent/70 font-display">
                  {civ.subtitle}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-6 scrollbar-thin">
                <div className="prose-custom">
                  <ReactMarkdown>{civ.content}</ReactMarkdown>
                </div>
              </div>

              {relatedCities.length > 0 && (
                <div className="p-6 border-t border-border/30">
                  <span className="text-[9px] tracking-[0.2em] text-text-muted/60 uppercase block mb-2">
                    所属城市
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {relatedCities.map((city) => (
                      <Link
                        key={city.nameEn}
                        href={`/map`}
                        className="text-[11px] tracking-wider px-3 py-1 rounded-full border border-accent/20 text-accent/70 hover:text-accent hover:border-accent/40 transition-colors duration-200"
                      >
                        {city.nameZh} · {city.nameEn}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}