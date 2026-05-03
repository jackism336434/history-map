"use client";

import type mapboxgl from "mapbox-gl";

interface MapControlsProps {
  map: mapboxgl.Map | null;
  is3D: boolean;
  onToggle3D: () => void;
}

export default function MapControls({ map, is3D, onToggle3D }: MapControlsProps) {
  function zoomIn() {
    map?.zoomIn({ duration: 300 });
  }

  function zoomOut() {
    map?.zoomOut({ duration: 300 });
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
      <ControlButton
        onClick={onToggle3D}
        active={is3D}
        label="3D"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
          </svg>
        }
      />
      <div className="h-px bg-accent/20 mx-2" />
      <ControlButton onClick={zoomIn} label="+" icon={<span className="text-lg leading-none">+</span>} />
      <ControlButton onClick={zoomOut} label="-" icon={<span className="text-lg leading-none">-</span>} />
    </div>
  );
}

function ControlButton({
  onClick,
  active,
  label,
  icon,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 ${
        active
          ? "bg-accent/20 border-accent text-accent shadow-[0_0_12px_rgba(232,200,138,0.2)]"
          : "bg-surface/80 backdrop-blur-sm border-accent/20 text-text-muted hover:text-accent hover:border-accent/50 hover:shadow-[0_0_8px_rgba(232,200,138,0.1)]"
      }`}
    >
      {icon}
    </button>
  );
}
