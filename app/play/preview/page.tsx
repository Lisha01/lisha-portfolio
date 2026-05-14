"use client";

/*
  Temporary preview route — composes ChallengeFrame + each challenge so we
  can validate mockups in isolation before the game shell exists.
  Delete once /play is wired up.
*/

import { useState } from "react";
import { challenges } from "../challenges/index";
import { ChallengeFrame } from "../components/ChallengeFrame";

export default function PlayPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const active = challenges[activeIndex];
  const Mockup = active.Component;

  function selectChallenge(i: number) {
    setActiveIndex(i);
    setStatus("idle");
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <p className="eyebrow text-ink-400">Preview · all challenges</p>
        <h1
          className="mt-4 font-display font-normal text-ink-900"
          style={{
            fontSize: "clamp(32px, 3.6vw, 48px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Spot the <span className="accent-italic">bad UX.</span>
        </h1>

        {/* Challenge selector */}
        <div className="mt-8 flex flex-wrap gap-2">
          {challenges.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectChallenge(i)}
              className={`rounded-full border px-3 py-1.5 font-sans text-[12px] font-medium transition-colors ${
                i === activeIndex
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-400"
              }`}
            >
              <span className="mr-1.5 font-mono text-[10px] text-ink-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              {c.title}
            </button>
          ))}
        </div>

        {/* Status + meta */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
              status === "correct"
                ? "border-accent/40 bg-accent/10 text-accent"
                : status === "wrong"
                ? "border-ink-200 bg-white text-ink-600"
                : "border-ink-200 bg-white text-ink-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === "correct"
                  ? "bg-accent"
                  : status === "wrong"
                  ? "bg-ink-400"
                  : "bg-ink-200"
              }`}
            />
            {status === "correct"
              ? "Hotspot hit"
              : status === "wrong"
              ? "Wrong click"
              : "Click anywhere on the mockup"}
          </span>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400 underline-offset-4 hover:text-accent hover:underline"
          >
            Reset
          </button>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            {active.url}
          </span>
        </div>

        <div className="mt-8 flex justify-center">
          <ChallengeFrame
            key={active.id}
            url={active.url}
            onCorrect={() => setStatus("correct")}
            onWrong={() => setStatus("wrong")}
          >
            <Mockup />
          </ChallengeFrame>
        </div>

        {status !== "idle" && (
          <div className="mx-auto mt-8 max-w-[680px] rounded-2xl border border-ink-200/60 bg-white p-6">
            <p className="eyebrow text-ink-400">The flaw</p>
            <p className="mt-2 font-display text-[20px] font-medium tracking-tight text-ink-900">
              {active.sin}
            </p>
            <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-600">
              {active.explanation}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
