"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ANCIENT_CITIES } from "@/data/ancientCities";

const GOLD = "#e8c88a";
const GOLD_DIM = "#a17c56";
const GOLD_FAINT = "#3d3020";
const BG = "#0c0a09";

function buildGridGeoJSON(): GeoJSON.FeatureCollection {
  const lines: GeoJSON.Feature[] = [];

  for (let lat = -60; lat <= 60; lat += 30) {
    lines.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: Array.from({ length: 73 }, (_, i) => [-180 + i * 5, lat]),
      },
      properties: {},
    });
  }

  for (let lng = -180; lng <= 180; lng += 30) {
    lines.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [lng, -60],
          [lng, 60],
        ],
      },
      properties: {},
    });
  }

  return { type: "FeatureCollection", features: lines };
}

function buildCitiesGeoJSON(): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = ANCIENT_CITIES.map((city) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [city.lng, city.lat] },
    properties: { nameZh: city.nameZh, nameEn: city.nameEn },
  }));

  return { type: "FeatureCollection", features };
}

export default function MapFlat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [40, 25],
      zoom: 2,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      maxZoom: 18,
      minZoom: 1,
      projection: "mercator",
      maxBounds: [[-180, -85], [180, 85]],
      renderWorldCopies: false,
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

    map.on("load", () => {
      map.setProjection("mercator");

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
                0.4,
                3, 0.6,
                5, 1,
              ]);
            } catch {}
          }
        }
      }

      map.addSource("grid", { type: "geojson", data: buildGridGeoJSON() });
      map.addLayer({
        id: "grid-lines",
        type: "line",
        source: "grid",
        paint: {
          "line-color": GOLD_DIM,
          "line-opacity": 0.15,
          "line-width": 0.5,
        },
      });

      map.addSource("cities", { type: "geojson", data: buildCitiesGeoJSON() });
      map.addLayer({
        id: "city-dots",
        type: "circle",
        source: "cities",
        paint: {
          "circle-radius": [
            "interpolate", ["linear"], ["zoom"],
            2, 3,
            5, 6,
            8, 10,
          ],
          "circle-color": GOLD,
          "circle-opacity": 0.85,
          "circle-stroke-color": BG,
          "circle-stroke-width": 1,
        },
      });
      map.addLayer({
        id: "city-labels-zh",
        type: "symbol",
        source: "cities",
        layout: {
          "text-field": ["get", "nameZh"],
          "text-offset": [0, 1.2],
          "text-anchor": "top",
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            3, 10,
            6, 14,
          ],
        },
        paint: {
          "text-color": GOLD,
          "text-halo-color": BG,
          "text-halo-width": 1,
          "text-opacity": [
            "step", ["zoom"],
            0,
            3, 0.7,
            5, 1,
          ],
        },
      });
      map.addLayer({
        id: "city-labels-en",
        type: "symbol",
        source: "cities",
        layout: {
          "text-field": ["get", "nameEn"],
          "text-offset": [0, 2.2],
          "text-anchor": "top",
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            4, 8,
            7, 11,
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
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: BG }}
    />
  );
}
