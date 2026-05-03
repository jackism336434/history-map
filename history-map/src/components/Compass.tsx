export default function Compass() {
  return (
    <div className="fixed bottom-8 right-8 z-40 w-16 h-16 opacity-40 hover:opacity-70 transition-opacity duration-300">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" className="text-text-muted" />
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.3" className="text-text-muted" />
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.3" className="text-text-muted" />

        <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.3" className="text-text-muted" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-text-muted" />
        <line x1="18" y1="18" x2="82" y2="82" stroke="currentColor" strokeWidth="0.2" className="text-text-muted" />
        <line x1="82" y1="18" x2="18" y2="82" stroke="currentColor" strokeWidth="0.2" className="text-text-muted" />

        <polygon points="50,10 46,30 54,30" fill="currentColor" className="text-accent" />
        <polygon points="50,90 46,70 54,70" fill="currentColor" className="text-text-muted" />

        <text x="50" y="8" textAnchor="middle" fill="currentColor" fontSize="5" className="text-accent">
          N
        </text>
        <text x="50" y="98" textAnchor="middle" fill="currentColor" fontSize="4" className="text-text-muted">
          S
        </text>
        <text x="96" y="52" textAnchor="end" fill="currentColor" fontSize="4" className="text-text-muted">
          E
        </text>
        <text x="6" y="52" textAnchor="start" fill="currentColor" fontSize="4" className="text-text-muted">
          W
        </text>

        <circle cx="50" cy="50" r="2" fill="currentColor" className="text-accent" />
      </svg>
    </div>
  );
}
