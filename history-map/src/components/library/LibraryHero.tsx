export default function LibraryHero() {
  return (
    <div className="flex flex-col items-center text-center pt-12 pb-8">
      <h1 className="text-5xl md:text-6xl font-display font-black tracking-[0.15em] text-foreground mb-3">
        藏书阁
      </h1>
      <p className="text-sm tracking-[0.3em] text-accent/70 font-display mb-1">
        THE LIBRARY
      </p>
      <p className="text-xs tracking-widest text-text-muted/50 max-w-md">
        CHRONICLES OF THE ETHEREAL ARCHIVE · 空灵档案编年史
      </p>
      <div className="mt-8 w-40 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}