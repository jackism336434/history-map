"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "寰宇图志", href: "/map" },
  { label: "万国史卷", href: "#" },
  { label: "全球归档", href: "#" },
  { label: "藏书阁", href: "#" },
];

export default function Header() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="text-xl font-bold tracking-widest text-accent">
        旧舆迷途
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm text-text-muted hover:text-foreground transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="探索古地名..."
            className="w-48 px-4 py-2 text-sm rounded-full bg-surface border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent/60 transition-colors duration-200"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <Link
          href="/map"
          className="px-5 py-2 text-sm font-medium rounded-full bg-foreground text-background hover:bg-accent hover:text-background transition-colors duration-200"
        >
          开启时空
        </Link>
      </div>
    </header>
  );
}
