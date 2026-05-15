"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SpotTheBadUxThumb } from "./work-thumbnails";
import { track } from "@/lib/analytics";

type Project = {
  slug: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  Thumb: React.ComponentType;
};

const projects: Project[] = [
  {
    slug: "spot-the-bad-ux",
    tag: "INTERACTIVE",
    title: "Spot the bad UX",
    description:
      "A small interactive piece to test the eye — eight UI mockups, one design flaw on each, before the timer runs out.",
    href: "/play",
    cta: "Play now",
    Thumb: SpotTheBadUxThumb,
  },
];

export function AIWork() {
  return (
    <section
      id="ai-work"
      className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-[120px]"
    >
      <header className="mb-12 max-w-[680px] md:mb-16">
        <p className="eyebrow text-ink-400">AI · Personal</p>
        <h2
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(36px, 4.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Building with <span className="accent-italic">AI.</span>
        </h2>
        <p className="mt-5 max-w-[600px] font-sans text-[16px] leading-relaxed text-ink-600">
          Personal experiments at the intersection of design and intelligent
          systems.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.slug} className="lg:col-span-2">
            <FeatureCard project={p} />
          </div>
        ))}
        <div className="lg:col-span-1">
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}

function ComingSoonCard() {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-7 text-white"
      style={{
        background:
          "linear-gradient(155deg, hsl(245, 65%, 11%) 0%, hsl(260, 50%, 16%) 100%)",
      }}
    >
      {/* Visual banner — generative mesh */}
      <div className="relative mb-6 h-36 overflow-hidden rounded-xl md:h-44">
        {/* Mesh gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 15% 22%, hsla(240, 90%, 65%, 0.85) 0px, transparent 50%),
              radial-gradient(at 82% 14%, hsla(282, 82%, 72%, 0.78) 0px, transparent 52%),
              radial-gradient(at 90% 72%, hsla(320, 88%, 70%, 0.6) 0px, transparent 45%),
              radial-gradient(at 22% 85%, hsla(198, 95%, 62%, 0.65) 0px, transparent 55%),
              linear-gradient(135deg, hsl(245, 72%, 14%) 0%, hsl(265, 60%, 19%) 100%)
            `,
          }}
        />

        {/* Conic halo top-right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-70"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #A78BFA 80deg, #F9A8D4 160deg, #93C5FD 240deg, transparent 320deg)",
            filter: "blur(18px)",
          }}
        />

        {/* Aurora light columns */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[35%] w-[2px] opacity-50"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(233,213,255,0.9) 45%, rgba(252,165,165,0.6) 70%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-[64%] w-px opacity-40"
          style={{
            background:
              "linear-gradient(180deg, transparent 10%, rgba(186,230,253,0.9) 50%, transparent 95%)",
            filter: "blur(1px)",
          }}
        />

        {/* Particle dots */}
        {[
          { top: "18%", left: "70%", size: 3, op: 0.95 },
          { top: "30%", left: "12%", size: 2, op: 0.7 },
          { top: "52%", left: "88%", size: 2, op: 0.85 },
          { top: "74%", left: "20%", size: 1.5, op: 0.6 },
          { top: "85%", left: "62%", size: 2, op: 0.75 },
          { top: "12%", left: "44%", size: 1.5, op: 0.55 },
        ].map((p, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.op,
            }}
          />
        ))}

        {/* Focal glass chip — "AI · Generating" */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full border border-white/30 bg-white/[0.12] px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-fuchsia-300" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
              </span>
              AI · Generating
            </span>
          </div>
        </div>

        {/* Grain */}
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-25" />
      </div>

      {/* Text */}
      <p className="eyebrow text-white/55">Personal · In progress</p>
      <h3 className="mt-3 font-display text-[22px] font-medium leading-tight tracking-tight md:text-[24px] lg:text-[28px]">
        More{" "}
        <span className="font-light italic" style={{ color: "#E9D5FF" }}>
          AI
        </span>{" "}
        projects.
      </h3>
      <p className="mt-3 font-sans text-[14px] leading-relaxed text-white/65">
        More personal explorations at the intersection of design and
        intelligent systems are in the works — stay tuned.
      </p>

      <div className="mt-auto pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-white" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Coming soon
        </span>
      </div>
    </div>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      onClick={() =>
        track("AI Work Click", {
          slug: project.slug,
          title: project.title,
          tag: project.tag,
          href: project.href,
        })
      }
      className="group relative grid h-full grid-cols-1 overflow-hidden rounded-2xl border border-ink-200/60 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-400 hover:bg-sky-100 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <project.Thumb />
        </div>
      </div>
      <div className="flex flex-col p-7 md:p-10">
        <p className="eyebrow text-accent">{project.tag}</p>
        <h3
          className="mt-4 font-display font-medium leading-tight tracking-tight text-ink-900"
          style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}
        </h3>
        <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-600 md:text-[16px]">
          {project.description}
        </p>

        <div className="mt-auto inline-flex items-center gap-1.5 pt-8 font-sans text-[14px] font-medium text-accent">
          <span>{project.cta}</span>
          <ArrowUpRight
            size={15}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  );
}
