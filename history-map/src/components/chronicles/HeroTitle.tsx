export default function HeroTitle() {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <h1 className="text-5xl md:text-6xl font-display font-black tracking-[0.15em] text-foreground mb-4">
        文明的回响
      </h1>
      <p className="text-sm tracking-widest text-text-muted max-w-md">
        穿越时间的尘埃，聆听每一座古城的低语
      </p>
      <div className="mt-6 w-32 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}