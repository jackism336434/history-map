"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type mapboxgl from "mapbox-gl";
import type { AncientCity } from "@/data/ancientCities";
import Header from "@/components/Header";
import MapBackground from "@/components/map/MapBackground";
import MapGlow from "@/components/map/MapGlow";
import HudFrame from "@/components/map/HudFrame";
import MapControls from "@/components/map/MapControls";
import TimelineBar from "@/components/map/TimelineBar";
import MapOverlay from "@/components/map/MapOverlay";
import CityPopup from "@/components/map/CityPopup";

export default function MapPage() {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [is3D, setIs3D] = useState(false);
  const [selectedCity, setSelectedCity] = useState<AncientCity | null>(null);

  const handleMapLoad = useCallback((loadedMap: mapboxgl.Map) => {
    setMap(loadedMap);
  }, []);

  const toggle3D = useCallback(() => {
    if (!map) return;
    setIs3D((prev) => {
      const next = !prev;
      map.easeTo({
        pitch: next ? 60 : 0,
        bearing: next ? -17.6 : 0,
        duration: 800,
      });
      return next;
    });
  }, [map]);

  const handleCitySelect = useCallback((city: AncientCity) => {
    setSelectedCity(city);
  }, []);

  const handleCityClose = useCallback(() => {
    setSelectedCity(null);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <Header />
      <MapBackground onMapLoad={handleMapLoad} onCitySelect={handleCitySelect} />
      <MapGlow />
      <HudFrame />
      <MapOverlay />
      <MapControls map={map} is3D={is3D} onToggle3D={toggle3D} />
      <CityPopup city={selectedCity} onClose={handleCityClose} />

      <Link
        href="/map/flat"
        className="fixed right-8 top-20 z-40 px-4 py-2 rounded-lg border text-xs tracking-widest font-display transition-all duration-300 bg-surface/80 backdrop-blur-sm border-accent/20 text-text-muted hover:text-accent hover:border-accent/50 hover:shadow-[0_0_8px_rgba(232,200,138,0.1)]"
      >
        2D Map
      </Link>

      <TimelineBar />
    </div>
  );
}
