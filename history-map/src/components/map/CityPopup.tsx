"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { AncientCity } from "@/data/ancientCities";

interface CityPopupProps {
  city: AncientCity | null;
  onClose: () => void;
}

export default function CityPopup({ city, onClose }: CityPopupProps) {
  return (
    <AnimatePresence>
      {city && (
        <motion.div
          key={city.nameEn}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 right-24 -translate-y-1/2 z-50 w-80 pointer-events-auto"
        >
          <div className="relative rounded-xl border border-accent/30 bg-surface/80 backdrop-blur-xl shadow-2xl overflow-hidden">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-background/60 text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="关闭"
            >
              ✕
            </button>

            <div className="p-6 pb-4">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-2xl font-bold tracking-wider text-foreground font-display">
                  {city.nameZh}
                </h2>
                <span className="text-xs tracking-widest text-text-muted">
                  {city.nameEn}
                </span>
              </div>

              <p className="text-[10px] tracking-wider text-accent/70 uppercase mb-4">
                {city.period}
              </p>

              <p className="text-[11px] leading-relaxed tracking-wide text-accent/60 italic mb-4 font-display">
                {city.ancientName}
              </p>

              <div className="w-full h-32 rounded-lg bg-background/60 border border-border/30 mb-4 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-accent/20 text-3xl mb-1">🗺</div>
                  <span className="text-[9px] tracking-wider text-text-muted/40">
                    古地图残卷
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-foreground/80">
                {city.description}
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

            <div className="px-6 py-3 flex items-center justify-between">
              <span className="text-[9px] tracking-widest text-text-muted/50 uppercase">
                {city.nameEn} · {city.nameZh}
              </span>
              <button
                onClick={onClose}
                className="text-[10px] tracking-wider text-accent/60 hover:text-accent transition-colors duration-200"
              >
                返回地图
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
