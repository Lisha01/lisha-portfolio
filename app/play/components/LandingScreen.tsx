"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight, Crosshair, Timer, Zap } from "lucide-react";
import { getBestScore } from "../lib/storage";

type Props = {
  onStart: () => void;
};

// useSyncExternalStore wants a subscribe; localStorage doesn't notify us, so
// this returns a no-op unsubscribe. The snapshot reads on every render, but
// returns the same primitive when storage hasn't changed — no re-render.
const noopSubscribe = () => () => {};

export function LandingScreen({ onStart }: Props) {
  const bestScore = useSyncExternalStore(
    noopSubscribe,
    () => getBestScore(),
    () => null,
  );

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      {/* Ambient accent halo behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-28 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,124,183,0.45), transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative mx-auto max-w-[720px] text-center">
        {/* Live-pulse eyebrow signals "this is timed / playable" */}
        <p className="eyebrow inline-flex items-center gap-2 text-ink-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Interactive · 8 rounds
        </p>
        <h1
          className="mt-5 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(48px, 6.4vw, 96px)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
          }}
        >
          Spot the <span className="accent-italic">bad UX.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[540px] font-sans text-[16px] leading-relaxed text-ink-600 md:text-[18px]">
          Eight UI mockups. Each has exactly one design flaw. Find it before
          the timer runs out.
        </p>

        {/* Rules pill — game stats in one compact row */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-ink-200/70 bg-white p-1.5 shadow-[0_8px_24px_-12px_rgba(14,23,41,0.18)]">
            <RulePill icon={Crosshair} label="8 mockups" />
            <Divider />
            <RulePill icon={Timer} label="30 s each" />
            <Divider />
            <RulePill icon={Zap} label="Speed bonus" />
          </div>
        </div>

        {/* Start CTA with breathing glow */}
        <div className="mt-14 flex justify-center">
          <div className="relative inline-block">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-accent/40 blur-xl"
              style={{
                animation: "start-glow 2.4s ease-in-out infinite",
              }}
            />
            <button
              type="button"
              onClick={onStart}
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-ink-900 px-10 py-4 font-sans text-[16px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Start playing
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {bestScore !== null && (
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            High score{" "}
            <span className="tabular-nums text-ink-700">
              {bestScore.toLocaleString()}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

function RulePill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-700">
      <Icon size={12} className="text-accent" />
      {label}
    </span>
  );
}

function Divider() {
  return <span aria-hidden className="h-3 w-px bg-ink-200" />;
}
