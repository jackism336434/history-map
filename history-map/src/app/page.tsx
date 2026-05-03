import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import Compass from "@/components/Compass";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background">
      <Header />
      <main className="flex flex-1 pt-16">
        <HeroSection />
      </main>
      <Timeline />
      <Compass />
    </div>
  );
}
