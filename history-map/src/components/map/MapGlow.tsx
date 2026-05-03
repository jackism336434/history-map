export default function MapGlow() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 55% 50%, transparent 0%, rgba(12,10,9,0.5) 60%, rgba(12,10,9,0.95) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-10 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 55% 50%, rgba(232,200,138,0.04) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "conic-gradient(from 0deg at 55% 50%, transparent 0deg, rgba(232,200,138,0.015) 90deg, transparent 180deg, rgba(232,200,138,0.015) 270deg, transparent 360deg)",
        }}
      />
    </>
  );
}
