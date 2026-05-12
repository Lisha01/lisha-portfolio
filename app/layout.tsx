import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsPageView } from "@/components/analytics-page-view";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lisha Lokwani — Senior Product Designer",
  description:
    "I'm an AI-focused senior product designer working at the intersection of data and intelligent systems, making complex products easy to understand.",
  openGraph: {
    title: "Lisha Lokwani — Senior Product Designer",
    description:
      "Designing clarity into complex products. 7+ years across AI, data, and 0→1 product design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-cream text-ink-900 min-h-screen">
        <AnalyticsPageView />
        {children}
      </body>
    </html>
  );
}
