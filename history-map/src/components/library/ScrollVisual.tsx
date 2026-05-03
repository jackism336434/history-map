"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollVisual() {
  const [unfurled, setUnfurled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setUnfurled(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden rounded-lg border border-border/20 bg-surface/50">
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface-light/30" />

      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 18px, #e8c88a 18px, #e8c88a 19px)`,
      }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(232,200,138,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex items-center">
        <motion.div
          initial={{ x: -8, opacity: 0.4 }}
          animate={unfurled ? { x: -4, opacity: 0.7 } : { x: -8, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-5 h-44 rounded-l-sm"
          style={{
            background: "linear-gradient(135deg, #a17c56 0%, #8B7355 50%, #6b5a42 100%)",
            boxShadow: "2px 0 4px rgba(0,0,0,0.3)",
          }}
        />

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={unfurled ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="w-56 origin-left"
          style={{
            background: "linear-gradient(180deg, #1a1510 0%, #1e1a14 30%, #201c15 70%, #1a1510 100%)",
            border: "0.5px solid #2a2520",
          }}
        >
          <div className="py-6 px-4 space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={unfurled ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="space-y-1.5"
              >
                {i === 2 ? (
                  <>
                    <div className="h-1.5 w-40 rounded-sm bg-accent/25" />
                    <div className="h-1.5 w-32 rounded-sm bg-accent/15" />
                    <div className="h-1.5 w-44 rounded-sm bg-accent/10" />
                  </>
                ) : (
                  <>
                    <div className="h-1 w-36 rounded-sm bg-text-muted/8" />
                    <div className="h-1 w-28 rounded-sm bg-text-muted/6" />
                    <div className="h-1 w-40 rounded-sm bg-text-muted/5" />
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 8, opacity: 0.4 }}
          animate={unfurled ? { x: 4, opacity: 0.7 } : { x: 8, opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-5 h-44 rounded-r-sm"
          style={{
            background: "linear-gradient(225deg, #a17c56 0%, #8B7355 50%, #6b5a42 100%)",
            boxShadow: "-2px 0 4px rgba(0,0,0,0.3)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={unfurled ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[7px] tracking-[0.3em] text-accent font-display"
      >
        SCROLL FRAGMENT · 卷轴残篇
      </motion.div>
    </div>
  );
}