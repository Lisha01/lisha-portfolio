"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, RotateCcw, XCircle } from "lucide-react";
import { challenges } from "../challenges";
import {
  TOTAL_ROUNDS,
  getTier,
  totalScore,
  type RoundResult,
} from "../lib/scoring";
import { getBestScore, saveBestScore } from "../lib/storage";
import { track } from "@/lib/analytics";

const LINKEDIN_URL = "https://www.linkedin.com/in/lisha-lokwani-39b01518b/";

// Inline LinkedIn glyph — same path as the one in nav-bar.tsx, since
// lucide-react v1.14 doesn't export a Linkedin icon.
function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 17.4H5.5v-7H8v7Zm-1.25-8.1a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM18.5 17.4H16V13.7c0-.95-.02-2.18-1.33-2.18-1.34 0-1.54 1.04-1.54 2.11v3.77H10.6v-7h2.42v.96h.03a2.65 2.65 0 0 1 2.39-1.31c2.55 0 3.02 1.68 3.02 3.86v3.49Z" />
    </svg>
  );
}

type Props = {
  results: RoundResult[];
  onPlayAgain: () => void;
};

const TIER_EMOJI: Record<string, string> = {
  "Pixel Perfectionist": "👑",
  "Solid Eye": "🎯",
  "Design Curious": "🧠",
  "Design Beginner": "🌱",
};

export function ResultsScreen({ results, onPlayAgain }: Props) {
  const score = totalScore(results);
  const tier = getTier(score);
  const correct = results.filter((r) => r.outcome === "correct").length;

  // Captured once at mount — never reflects the value we're about to write,
  // so "New best" doesn't flicker off after saveBestScore.
  const [prevBest] = useState<number | null>(() => getBestScore());
  const isNewBest = prevBest === null || score > prevBest;

  useEffect(() => {
    saveBestScore(score);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [score]);

  return (
    <section className="px-6 pb-32 pt-28 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[1080px]">
        {/* Hero */}
        <div className="mx-auto max-w-[680px] text-center">
          <p className="eyebrow text-ink-400">
            {isNewBest ? "New best score" : "Round complete"}
          </p>
          <h1
            className="mt-4 font-display font-normal tabular-nums text-ink-900"
            style={{
              fontSize: "clamp(72px, 9vw, 120px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {score.toLocaleString()}
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            <span className="tabular-nums text-ink-700">{correct}</span>{" "}
            <span className="text-ink-300">/ {TOTAL_ROUNDS} caught</span>
            {prevBest !== null && !isNewBest && (
              <>
                {" · best "}
                <span className="tabular-nums text-ink-700">
                  {prevBest.toLocaleString()}
                </span>
              </>
            )}
          </p>

          <div className="mt-12">
            {/* Animated tier emoji — bursts in on mount, then settles into a
                gentle float-and-tilt loop so it stays alive on the page. */}
            <span
              aria-hidden
              className="inline-block text-[72px] leading-none"
              style={{
                animation:
                  "tier-entry 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards, tier-float 2.6s ease-in-out 1.2s infinite",
              }}
            >
              {TIER_EMOJI[tier.name] ?? "✨"}
            </span>
            <h2
              className="mt-6 font-display font-normal text-ink-900"
              style={{
                fontSize: "clamp(28px, 3.6vw, 44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              <span className="accent-italic">{tier.name}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] font-sans text-[15px] leading-relaxed text-ink-600">
              {tier.description}
            </p>
          </div>

          {/* Actions — Play again first, then a microcopy line, then LinkedIn */}
          <div className="mt-10 flex flex-col items-center">
            <button
              type="button"
              onClick={onPlayAgain}
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 font-sans text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <RotateCcw size={14} />
              Play again
            </button>

            <p className="mt-12 font-sans text-[14px] text-ink-600">
              Liked my work? Let&apos;s connect.
            </p>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("Social Link Click", {
                  label: "LinkedIn",
                  href: LINKEDIN_URL,
                  location: "results",
                })
              }
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-6 py-3 font-sans text-[14px] font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:border-ink-400"
            >
              <LinkedInIcon size={14} />
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Recap */}
        <div className="mt-24">
          <p className="eyebrow text-ink-400">Recap</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((r, i) => (
              <RecapCard key={r.challengeId} result={r} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecapCard({ result, index }: { result: RoundResult; index: number }) {
  const challenge = challenges.find((c) => c.id === result.challengeId);
  if (!challenge) return null;

  const ok = result.outcome === "correct";
  const timedOut = result.outcome === "timeout";
  const Icon = ok ? CheckCircle2 : timedOut ? Clock : XCircle;
  const ariaLabel = ok ? "Caught" : timedOut ? "Timed out" : "Missed";

  return (
    <article
      className={`flex flex-col rounded-2xl border p-5 ${
        ok
          ? "border-ink-200/60 bg-white"
          : "border-ink-200/40 bg-cream/60"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-label={ariaLabel}
          className={`flex h-7 w-7 items-center justify-center rounded-full ${
            ok ? "bg-sky-100 text-accent" : "bg-ink-200/40 text-ink-600"
          }`}
        >
          <Icon size={14} aria-hidden />
        </span>
      </div>
      <p className="mt-4 font-sans text-[13px] font-medium text-ink-900">
        {challenge.title}
      </p>
      <p className="mt-1.5 font-sans text-[12px] leading-relaxed text-ink-600">
        {challenge.sin}
      </p>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
        {ok ? (
          <span className="tabular-nums text-accent">+{result.points}</span>
        ) : timedOut ? (
          "Timed out"
        ) : (
          "Missed"
        )}
      </p>
    </article>
  );
}
