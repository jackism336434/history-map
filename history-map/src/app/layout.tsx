import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "旧舆迷途 | 数字化的时空考古档案",
  description:
    "跨越千年时光，以交互式地图探索各国历史事件变迁。每一寸经纬背后，都是文明的回响。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
