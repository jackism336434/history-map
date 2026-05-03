import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center px-8">
      <p className="text-sm tracking-[0.3em] text-accent mb-6 uppercase">
        数字化的时空考古档案
      </p>

      <h1 className="text-6xl md:text-8xl font-black tracking-[0.15em] text-foreground mb-8">
        旧舆迷途
      </h1>

      <p className="max-w-xl text-base leading-relaxed text-text-muted mb-12">
        跨越千年时光，以交互式地图探索各国历史事件变迁。
        <br />
        每一寸经纬背后，都是文明的回响。
      </p>

      <div className="flex items-center gap-4">
        <Link
          href="/map"
          className="px-8 py-3 text-sm font-medium tracking-wider rounded-full bg-foreground text-background hover:bg-accent transition-colors duration-200"
        >
          进入地图
          <span className="ml-2 text-xs opacity-60">ENTER MAP</span>
        </Link>

        <Link
          href="#"
          className="px-8 py-3 text-sm font-medium tracking-wider rounded-full border border-border text-foreground hover:border-accent hover:text-accent transition-colors duration-200"
        >
          查看史卷
        </Link>
      </div>
    </section>
  );
}
