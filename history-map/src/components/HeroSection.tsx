"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ANCIENT_CITIES } from "@/data/ancientCities";

const START_YEAR = -221;
const END_YEAR = 2024;

interface HeroSectionProps {
  timelineValue: number;
}

interface EraContent {
  zh: string;
  en: string;
  sub: string;
  bgFrom: string;
  bgTo: string;
}

const ERA_CONTENT: Record<string, EraContent> = {
  ancient: {
    zh: "文明的曙光",
    en: "DAWN OF CIVILIZATION",
    sub: "尼罗河畔的金字塔，两河流域的楔形文字，印度河谷的砖城——人类最初的伟大实验",
    bgFrom: "#0c0a09",
    bgTo: "#1a1510",
  },
  classical: {
    zh: "帝国与城邦",
    en: "EMPIRES & POLEIS",
    sub: "罗马的鹰旗、波斯的万王之王、汉家的丝路——铁与法的世界秩序",
    bgFrom: "#0a0c14",
    bgTo: "#101520",
  },
  medieval: {
    zh: "世界之间的桥梁",
    en: "WORLDS IN CONTACT",
    sub: "长安的驼铃、巴格达的智慧宫、维京的长船——文明在碰撞中重塑自身",
    bgFrom: "#100a12",
    bgTo: "#1a1018",
  },
};

interface CityDatum {
  nameZh: string;
  nameEn: string;
  lng: number;
  lat: number;
  era: string;
  order: number;
}

function getCityEra(year: number): string {
  if (year < 0) return "ancient";
  if (year < 500) return "classical";
  return "medieval";
}

const CITY_DATA: CityDatum[] = ANCIENT_CITIES.map((city, i) => {
  const yearStr = city.period.match(/前?(\d+)/);
  const yearNum = yearStr ? parseInt(yearStr[1]) : 0;
  const isBC = city.period.includes("前") || city.period.includes("BC");
  const year = isBC ? -yearNum : yearNum;
  return {
    nameZh: city.nameZh,
    nameEn: city.nameEn,
    lng: city.lng,
    lat: city.lat,
    era: getCityEra(year),
    order: i,
  };
});

function lngLatToSvg(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

const ERA_ORDER: Record<string, number> = { ancient: 0, classical: 1, medieval: 2 };

function getEraFromValue(v: number): string {
  if (v < 0.33) return "ancient";
  if (v < 0.66) return "classical";
  return "medieval";
}

const CONTINENT_PATHS = [
  "M12,18 L18,12 L25,10 L30,8 L36,10 L40,15 L42,22 L38,28 L35,35 L38,40 L35,45 L30,50 L25,52 L20,48 L15,42 L12,35 L10,28 Z",
  "M44,10 L50,6 L58,8 L64,12 L68,18 L70,25 L66,30 L60,35 L55,38 L48,35 L44,28 L42,20 Z",
  "M44,42 L50,40 L58,42 L64,48 L66,55 L62,62 L56,65 L48,62 L44,55 Z",
  "M72,18 L80,12 L88,14 L94,20 L92,28 L86,34 L78,36 L72,30 L70,24 Z",
  "M76,50 L82,48 L88,52 L90,60 L86,68 L80,72 L74,68 L72,60 Z",
  "M30,58 L36,54 L44,56 L46,62 L42,68 L34,70 L28,66 Z",
];

export default function HeroSection({ timelineValue }: HeroSectionProps) {
  const era = getEraFromValue(timelineValue);
  const content = ERA_CONTENT[era];

  type EraKey = "ancient" | "classical" | "medieval";
  const eraIdx = ERA_ORDER[era] as number;

  const bgColor = useMemo(() => {
    const fromParts = content.bgFrom.match(/[0-9a-f]{2}/gi)!.map((h) => parseInt(h, 16));
    const toParts = content.bgTo.match(/[0-9a-f]{2}/gi)!.map((h) => parseInt(h, 16));
    const from = `rgb(${fromParts[0]}, ${fromParts[1]}, ${fromParts[2]})`;
    const to = `rgb(${toParts[0]}, ${toParts[1]}, ${toParts[2]})`;
    return { from, to };
  }, [content]);

  const mapOpacity = useMemo(() => {
    const fadeStart = 0.1;
    const fadeEnd = 0.35;
    if (timelineValue < fadeStart) return 0;
    if (timelineValue > fadeEnd) return 0.35;
    return ((timelineValue - fadeStart) / (fadeEnd - fadeStart)) * 0.35;
  }, [timelineValue]);

  const sortedCities = useMemo(
    () => [...CITY_DATA].sort((a, b) => ERA_ORDER[a.era] - ERA_ORDER[b.era]),
    []
  );

  return (
    <section
      className="relative flex flex-1 flex-col items-center justify-center text-center px-8 overflow-hidden transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, ${bgColor.from}, ${bgColor.to})`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: mapOpacity, transition: "opacity 0.3s ease" }}
      >
        <g opacity="0.15">
          {CONTINENT_PATHS.map((d, i) => (
            <path key={i} d={d} fill="#e8c88a" stroke="#e8c88a" strokeWidth="0.15" />
          ))}
        </g>
        <line x1="0" y1="5" x2="100" y2="5" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />
        <line x1="0" y1="95" x2="100" y2="95" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />
        <line x1="17" y1="0" x2="17" y2="100" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />
        <line x1="83" y1="0" x2="83" y2="100" stroke="#e8c88a" strokeWidth="0.06" opacity="0.1" />

        {sortedCities.map((city) => {
          const pos = lngLatToSvg(city.lng, city.lat);
          const cityEraIdx = ERA_ORDER[city.era] as number;
          const shouldShow = eraIdx >= cityEraIdx;
          const dotOpacity = shouldShow ? (eraIdx === cityEraIdx ? 0.9 : 0.4) : 0;
          const dotR = shouldShow ? (eraIdx === cityEraIdx ? 0.9 : 0.6) : 0;

          return (
            <g key={city.nameEn}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={dotR}
                fill={eraIdx === cityEraIdx ? "#e8c88a" : "#e8c88a"}
                opacity={dotOpacity}
              />
              {eraIdx === cityEraIdx && shouldShow && (
                <text
                  x={pos.x + 1.2}
                  y={pos.y - 1.2}
                  fill="#e8c88a"
                  opacity="0.55"
                  fontSize="1.4"
                  fontFamily="'Noto Serif SC','SimSun',serif"
                >
                  {city.nameZh}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={era}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm tracking-[0.3em] text-accent mb-6 uppercase">
              {content.en}
            </p>

            <h1 className="text-6xl md:text-8xl font-black tracking-[0.15em] text-foreground mb-4">
              {content.zh}
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-text-muted mb-12">
              {content.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <Link
            href="/map"
            className="px-8 py-3 text-sm font-medium tracking-wider rounded-full bg-foreground text-background hover:bg-accent transition-colors duration-200"
          >
            进入地图
            <span className="ml-2 text-xs opacity-60">ENTER MAP</span>
          </Link>

          <Link
            href="/library"
            className="px-8 py-3 text-sm font-medium tracking-wider rounded-full border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
          >
            查看史卷
          </Link>
        </div>
      </div>
    </section>
  );
}