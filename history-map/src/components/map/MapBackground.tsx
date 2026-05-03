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
        id: "hotspot-glow",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": 10,
          "circle-color": GOLD,
          "circle-opacity": 0.15,
          "circle-blur": 1,
        },
      });

      map.addLayer({
        id: "hotspot-dot",
        type: "circle",
        source: "hotspots",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, 4,
            5, 6,
            8, 8,
          ],
          "circle-color": GOLD,
          "circle-opacity": 0.85,
          "circle-stroke-color": BG,
          "circle-stroke-width": 1.5,
        },
      });

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
            0,
            3, 0.6,
            5, 1,
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
            4, 0.5,
            6, 0.8,
          ],
        },
      });

      map.on("mouseenter", "hotspot-dot", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "hotspot-dot", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "hotspot-dot", (e) => {
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
