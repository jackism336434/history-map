"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ANCIENT_CITIES } from "@/data/ancientCities";
import type { AncientCity } from "@/data/ancientCities";

const GOLD = "#e8c88a";
const GOLD_DIM = "#a17c56";
const GOLD_FAINT = "#3d3020";
const BG = "#0c0a09";

function buildCitiesGeoJSON(): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = ANCIENT_CITIES.map((city) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [city.lng, city.lat] },
    properties: { nameZh: city.nameZh, nameEn: city.nameEn },
  }));
  return { type: "FeatureCollection", features };
}

interface MapBackgroundProps {
  onMapLoad?: (map: mapboxgl.Map) => void;
  onCitySelect?: (city: AncientCity) => void;
}

export default function MapBackground({ onMapLoad, onCitySelect }: MapBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [15, 20],
      zoom: 2.5,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      maxZoom: 18,
      minZoom: 1,
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    map.on("load", () => {
      map.setFog({
        color: BG,
        "horizon-blend": 0.1,
        "high-color": "#1a1510",
        "space-color": BG,
        "star-intensity": 0.3,
      });

      const style = map.getStyle();
      if (style && style.layers) {
        for (const layer of style.layers) {
          const id = layer.id;

          if (id === "background" || id === "land" || id === "land-use" || id === "park") {
            try { map.setPaintProperty(id, "fill-color", BG); } catch {}
            try { map.setPaintProperty(id, "fill-outline-color", GOLD_FAINT); } catch {}
          }

          if (id === "water" || id === "waterway" || id === "water-label") {
            try { map.setPaintProperty(id, "fill-color", "#0f0d0b"); } catch {}
            try { map.setPaintProperty(id, "line-color", GOLD_FAINT); } catch {}
          }

          if (id.includes("border") || id.includes("boundary")) {
            try { map.setPaintProperty(id, "line-color", GOLD_DIM); } catch {}
            try { map.setPaintProperty(id, "line-opacity", 0.45); } catch {}
            try { map.setPaintProperty(id, "line-width", 1); } catch {}
          }

          if (id.includes("road") || id.includes("street") || id.includes("highway")) {
            try { map.setPaintProperty(id, "line-color", GOLD_FAINT); } catch {}
            try { map.setPaintProperty(id, "line-opacity", 0.08); } catch {}
          }

          if (id.includes("label") || id.includes("name")) {
            try { map.setPaintProperty(id, "text-color", GOLD); } catch {}
            try { map.setPaintProperty(id, "text-halo-color", BG); } catch {}
            try { map.setPaintProperty(id, "text-halo-width", 1); } catch {}
            try {
              map.setPaintProperty(id, "text-opacity", [
                "step", ["zoom"],
                0.5,
                3, 0.7,
                5, 1,
              ]);
            } catch {}
          }
        }
      }

      map.addSource("hotspots", {
        type: "geojson",
        data: buildCitiesGeoJSON(),
      });

      map.addLayer({
        id: "hotspot-pulse",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": 25,
          "circle-color": GOLD,
          "circle-opacity": 0.15,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "hotspot-glow",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": 16,
          "circle-color": GOLD,
          "circle-opacity": 0.2,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "hotspot-ring",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, 8,
            5, 10,
            8, 12,
          ],
          "circle-color": "transparent",
          "circle-opacity": 1,
          "circle-stroke-color": GOLD,
          "circle-stroke-width": 1.5,
          "circle-stroke-opacity": 0.7,
        },
      });

      map.addLayer({
        id: "hotspot-core",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, 5,
            5, 6,
            8, 7,
          ],
          "circle-color": GOLD,
          "circle-opacity": 0.95,
          "circle-stroke-color": GOLD_DIM,
          "circle-stroke-width": 1,
        },
      });

      map.addLayer({
        id: "hotspot-hit",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": 25,
          "circle-color": "transparent",
          "circle-opacity": 0,
        },
      });

      function animatePulse() {
        const opacity = 0.05 + 0.25 * (0.5 + 0.5 * Math.sin(Date.now() / 2000 * Math.PI));
        try {
          map.setPaintProperty("hotspot-pulse", "circle-opacity", opacity);
        } catch {}
        rafRef.current = requestAnimationFrame(animatePulse);
      }
      rafRef.current = requestAnimationFrame(animatePulse);

      map.addLayer({
        id: "hotspot-label-zh",
        type: "symbol",
        source: "hotspots",
        layout: {
          "text-field": ["get", "nameZh"],
          "text-offset": [0, 1.8],
          "text-anchor": "top",
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            2, 9,
            5, 12,
          ],
        },
        paint: {
          "text-color": GOLD,
          "text-halo-color": BG,
          "text-halo-width": 1.5,
          "text-opacity": [
            "step", ["zoom"],
            0.4,
            2, 0.7,
            4, 1,
          ],
        },
      });

      map.addLayer({
        id: "hotspot-label-en",
        type: "symbol",
        source: "hotspots",
        layout: {
          "text-field": ["get", "nameEn"],
          "text-offset": [0, 2.8],
          "text-anchor": "top",
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            3, 7,
            6, 10,
          ],
        },
        paint: {
          "text-color": GOLD_DIM,
          "text-halo-color": BG,
          "text-halo-width": 1,
          "text-opacity": [
            "step", ["zoom"],
            0,
            3, 0.5,
            5, 0.8,
          ],
        },
      });

      map.on("mouseenter", "hotspot-hit", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "hotspot-hit", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "hotspot-hit", (e) => {
        if (!e.features || !e.features.length) return;
        const feature = e.features[0];
        const props = feature.properties as { nameZh: string; nameEn: string };
        const city = ANCIENT_CITIES.find(
          (c) => c.nameZh === props.nameZh && c.nameEn === props.nameEn
        );
        if (city) {
          map.flyTo({
            center: [city.lng, city.lat],
            zoom: 5,
            pitch: 30,
            bearing: -10,
            duration: 1500,
          });
          onCitySelect?.(city);
        }
      });

      onMapLoad?.(map);
    });

    mapRef.current = map;

    return () => {
      cancelAnimationFrame(rafRef.current);
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: BG }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,200,138,0.06) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
