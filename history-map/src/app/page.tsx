"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import Compass from "@/components/Compass";

export default function Home() {
  const [timelineValue, setTimelineValue] = useState(0.5);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background">
      <Header />
      <main className="flex flex-1 pt-16">
        <HeroSection timelineValue={timelineValue} />
      </main>
      <Timeline value={timelineValue} onChange={setTimelineValue} />
      <Compass />
    </div>
  );
}