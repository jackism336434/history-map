"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "寰宇图志", href: "/map" },
  { label: "万国史卷", href: "/chronicles" },
  { label: "全球归档", href: "/archive" },
  { label: "藏书阁", href: "/library" },
];

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  "/archive": "探索未触达之史...",
  "/chronicles": "探索古文明...",
  "/map": "搜索城市...",
  "/library": "检索古代文献...",
};

interface HeaderProps {
  pageContext?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
}

export default function Header({ pageContext, searchValue: externalSearch, onSearchChange }: HeaderProps) {
  const [internalSearch, setInternalSearch] = useState("");
  const pathname = usePathname();

  const searchValue = externalSearch !== undefined ? externalSearch : internalSearch;
  const handleSearchChange = onSearchChange ?? setInternalSearch;

  const placeholder =
    (pageContext && SEARCH_PLACEHOLDERS[`/${pageContext}`]) ||
    SEARCH_PLACEHOLDERS[pathname] ||
    "探索古地名...";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <Link href="/" className="text-xl font-bold tracking-widest text-accent">
        旧舆迷途
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive =
            item.href === pathname ||
            (item.href !== "#" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors duration-200 ${
                isActive
                  ? "text-accent"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={placeholder}
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