"use client";

import { ANCIENT_CITIES } from "@/data/ancientCities";
import type { ArchiveItem } from "@/data/archiveItems";

const SVG_W = 360;
const SVG_H = 180;

function lngToX(lng: number): number {
  return ((lng + 180) / 360) * SVG_W;
}

function latToY(lat: number): number {
  return ((90 - lat) / 180) * SVG_H;
}

const LANDMASS = "M0,62 L5,65 12,60 18,62 22,56 30,54 36,56 42,52 50,58 56,76 62,84 68,88 72,92 67,94 63,90 59,96 54,100 58,106 64,108 70,118 72,128 70,134 78,120 84,110 88,102 94,96 100,94 105,88 108,90 110,92 114,80 118,76 122,72 126,68 130,64 136,60 138,62 140,66 142,72 148,82 150,78 146,70 148,64 144,56 140,48 136,42 132,36 128,32 124,28 120,24 116,22 112,24 106,18 102,20 96,28 92,20 88,12 86,10 84,18 82,26 78,26 74,24 70,28 68,34 64,24 60,18 58,20 52,28 47,38 43,42 38,48 34,52 32,55 25,58 21,60 15,62 5,64 0,62Z";

export default function WorldDotMap({
  items,
  activeItem,
}: {
  items: ArchiveItem[];
  activeItem: ArchiveItem | null;
}) {
  const allDots = ANCIENT_CITIES.map((c) => ({
    x: lngToX(c.lng),
    y: latToY(c.lat),
    active: false,
  }));

  const itemDots = items.map((i) => ({
    x: lngToX(i.lng),
    y: latToY(i.lat),
    active: activeItem?.id === i.id,
  }));

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      className="w-full h-auto"
      style={{ filter: "drop-shadow(0 0 6px rgba(232,200,138,0.15))" }}
    >
      <defs>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8c88a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e8c88a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dotGlowActive" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0d48a" stopOpacity="1" />
          <stop offset="100%" stopColor="#e8c88a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse
        cx={SVG_W / 2}
        cy={SVG_H / 2}
        rx={SVG_W / 2 - 2}
        ry={SVG_H / 2 - 2}
        fill="none"
        stroke="#2a2520"
        strokeWidth={0.5}
      />

      {[-60, -30, 0, 30, 60].map((lat) => (
        <line
          key={`lat-${lat}`}
          x1={lngToX(-180)}
          y1={latToY(lat)}
          x2={lngToX(180)}
          y2={latToY(lat)}
          stroke="#1c1917"
          strokeWidth={0.3}
        />
      ))}

      {[-120, -60, 0, 60, 120].map((lng) => (
        <line
          key={`lng-${lng}`}
          x1={lngToX(lng)}
          y1={latToY(90)}
          x2={lngToX(lng)}
          y2={latToY(-90)}
          stroke="#1c1917"
          strokeWidth={0.3}
        />
      ))}

      <path d={LANDMASS} fill="#1a1815" stroke="#292420" strokeWidth={0.5} opacity={0.7} />

      {allDots.map((dot, i) => (
        <circle
          key={`city-${i}`}
          cx={dot.x}
          cy={dot.y}
          r={0.8}
          fill="#2a2520"
        />
      ))}

      {itemDots.map((dot, i) => (
        <g key={`item-${i}`}>
          <circle
            cx={dot.x}
            cy={dot.y}
            r={dot.active ? 4 : 2}
            fill={dot.active ? "url(#dotGlowActive)" : "url(#dotGlow)"}
            className="transition-all duration-300"
          />
          <circle
            cx={dot.x}
            cy={dot.y}
            r={dot.active ? 1.5 : 0.8}
            fill={dot.active ? "#f0d48a" : "#e8c88a"}
            className="transition-all duration-300"
          />
          {dot.active && (
            <circle
              cx={dot.x}
              cy={dot.y}
              r={6}
              fill="none"
              stroke="#e8c88a"
              strokeWidth={0.3}
              opacity={0.5}
              className="animate-breathe"
            />
          )}
        </g>
      ))}
    </svg>
  );
}