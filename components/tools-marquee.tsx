"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AdobeIcon,
  ClaudeIcon,
  DescriptIcon,
  FigmaIcon,
  FramerIcon,
  LovableIcon,
  NotionIcon,
  PerplexityIcon,
} from "./tool-icons";

type Tool = {
  name: string;
  role: string;
  Icon: React.ComponentType<{ size?: number }>;
  brand: string;
};

const tools: Tool[] = [
  { name: "Figma", role: "Design", Icon: FigmaIcon, brand: "#F24E1E" },
  { name: "Adobe", role: "Design", Icon: AdobeIcon, brand: "#FA0F00" },
  { name: "Claude Code", role: "AI coding", Icon: ClaudeIcon, brand: "#D97757" },
  { name: "Lovable", role: "AI prototyping", Icon: LovableIcon, brand: "#FF5C5C" },
  { name: "Framer", role: "Web builder", Icon: FramerIcon, brand: "#0099FF" },
  { name: "Notion", role: "Productivity", Icon: NotionIcon, brand: "#191919" },
  { name: "Descript", role: "Video editing", Icon: DescriptIcon, brand: "#FF5C5C" },
  { name: "Perplexity", role: "AI research", Icon: PerplexityIcon, brand: "#20808D" },
];

export function ToolsMarquee() {
  const reduced = useReducedMotion();
  return (
    <section
      id="tools"
      className="relative overflow-hidden border-y border-ink-200/60 bg-cream py-20 md:py-[120px]"
    >
      {/* Ambient layer: dotted grid + soft accent aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(74,124,183,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,124,183,0.35), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <header className="relative mx-auto mb-12 max-w-[1280px] px-6 md:mb-16 md:px-10">
        <p className="eyebrow text-ink-400">Stack · Tools Behind The Work</p>
        <h2
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(28px, 3vw, 36px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          What I <span className="accent-italic">use.</span>
        </h2>
        <p className="mt-5 max-w-[560px] font-sans text-[15px] leading-relaxed text-ink-600">
          The kit I reach for daily — for shipping interfaces, exploring with
          AI, and pulling the whole story together.
        </p>
      </header>

      {/* Stagger-reveal grid */}
      <motion.div
        className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-3 px-6 sm:grid-cols-2 md:grid-cols-4 md:gap-4 md:px-10"
        initial={reduced ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: {
            transition: { staggerChildren: reduced ? 0 : 0.06 },
          },
        }}
      >
        {tools.map((t) => (
          <ToolCard key={t.name} tool={t} reduced={reduced ?? false} />
        ))}
      </motion.div>
    </section>
  );
}

function ToolCard({ tool, reduced }: { tool: Tool; reduced: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative isolate overflow-hidden rounded-2xl border border-ink-200/70 bg-white/85 p-4 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 md:p-5"
      style={{
        boxShadow: hovered
          ? `0 18px 40px -20px ${tool.brand}55, 0 0 0 1px ${tool.brand}30 inset`
          : "0 1px 2px rgba(14,23,41,0.04)",
      }}
    >
      {/* Cursor-follow spotlight in the brand color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(180px circle at ${pos.x}% ${pos.y}%, ${tool.brand}22, transparent 65%)`,
        }}
      />

      {/* Bottom-corner aurora that animates in on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: tool.brand }}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 ease-out group-hover:scale-110 md:h-12 md:w-12"
          style={{
            background: `${tool.brand}14`,
            boxShadow: hovered ? `0 0 18px ${tool.brand}55` : "none",
            transition: "box-shadow 500ms ease, transform 500ms ease",
          }}
        >
          <tool.Icon size={22} />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-[17px] font-medium leading-tight text-ink-900 md:text-[18px]">
            {tool.name}
          </h3>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 md:text-[11px]">
            {tool.role}
          </p>
        </div>
      </div>

      {/* Thin accent edge — a future-UI signature line that appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${tool.brand}, transparent)`,
        }}
      />
    </motion.div>
  );
}
