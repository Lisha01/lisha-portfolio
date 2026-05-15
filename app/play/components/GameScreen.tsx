"use client";

import { useEffect, useState } from "react";
import { challenges } from "../challenges";
import { ChallengeFrame } from "./ChallengeFrame";
import { RevealOverlay } from "./RevealOverlay";
import {
  REVEAL_DURATION_MS,
  ROUND_DURATION_MS,
  TOTAL_ROUNDS,
  calculatePoints,
  totalScore,
  type Outcome,
  type RoundResult,
} from "../lib/scoring";

type Props = {
  onFinish: (results: RoundResult[]) => void;
  onQuit: () => void;
};

type Mode =
  | { kind: "playing"; startTime: number }
  | { kind: "reveal"; lastResult: RoundResult };

export function GameScreen({ onFinish, onQuit }: Props) {
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [mode, setMode] = useState<Mode>(() => ({
    kind: "playing",
    startTime: Date.now(),
  }));
  const [now, setNow] = useState<number>(() => Date.now());

  const challenge = challenges[round];

  // Per-round timeout — if no click lands within 10s, fire timeout.
  useEffect(() => {
    if (mode.kind !== "playing") return;
    const id = setTimeout(() => {
      setMode({
        kind: "reveal",
        lastResult: {
          challengeId: challenges[round].id,
          outcome: "timeout",
          timeRemainingMs: 0,
          points: 0,
        },
      });
    }, ROUND_DURATION_MS);
    return () => clearTimeout(id);
  }, [mode, round]);

  // Tick to drive the numeric countdown display.
  useEffect(() => {
    if (mode.kind !== "playing") return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [mode]);

  // Auto-advance from reveal — either to the next round or to results.
  useEffect(() => {
    if (mode.kind !== "reveal") return;
    const id = setTimeout(() => {
      const finalRoundResults = [...results, mode.lastResult];
      if (round + 1 >= TOTAL_ROUNDS) {
        onFinish(finalRoundResults);
        return;
      }
      setResults(finalRoundResults);
      setRound((r) => r + 1);
      setMode({ kind: "playing", startTime: Date.now() });
    }, REVEAL_DURATION_MS);
    return () => clearTimeout(id);
  }, [mode, results, round, onFinish]);

  function handleOutcome(outcome: Outcome) {
    if (mode.kind !== "playing") return;
    const elapsed = Date.now() - mode.startTime;
    const timeRemainingMs =
      outcome === "correct" ? Math.max(0, ROUND_DURATION_MS - elapsed) : 0;
    setMode({
      kind: "reveal",
      lastResult: {
        challengeId: challenge.id,
        outcome,
        timeRemainingMs,
        points: calculatePoints(outcome, timeRemainingMs),
      },
    });
  }

  const playing = mode.kind === "playing";
  const elapsedMs = playing ? now - mode.startTime : 0;
  const remainingMs = playing ? Math.max(0, ROUND_DURATION_MS - elapsedMs) : 0;
  const remainingSec = playing ? Math.ceil(remainingMs / 1000) : 0;
  const urgent = playing && remainingSec <= 3 && remainingSec > 0;
  const runningScore = totalScore(results);
  const popPoints =
    mode.kind === "reveal" && mode.lastResult.outcome === "correct"
      ? mode.lastResult.points
      : null;

  return (
    <section className="flex min-h-[calc(100vh-68px)] flex-col">
      {/* Sticky header — stays below the fixed nav (top: 68px) so timer,
          round dots, and score are always visible while the mockup
          scrolls under it. */}
      <div className="sticky top-[68px] z-30 bg-cream shadow-[0_4px_12px_-6px_rgba(14,23,41,0.08)]">
        <div className="mx-auto max-w-[1080px] px-6 pb-4 pt-3 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div
              className="flex items-center gap-1.5"
              aria-label={`Round ${round + 1} of ${TOTAL_ROUNDS}`}
            >
              {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
                <RoundDot key={i} state={dotState(i, round, mode, results)} />
              ))}
            </div>

            {/* Timer */}
            <div className="flex items-baseline gap-1.5">
              <span
                className={`font-display font-medium tabular-nums leading-none transition-colors ${
                  urgent ? "text-red-500" : "text-ink-900"
                }`}
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  letterSpacing: "-0.02em",
                  animation: urgent
                    ? "timer-tick 1s ease-in-out infinite"
                    : undefined,
                }}
              >
                {playing ? remainingSec : 0}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                sec
              </span>
            </div>

            {/* Score */}
            <div className="relative flex items-baseline gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                Score
              </span>
              <span
                key={`score-${runningScore}`}
                className="font-display text-[22px] font-medium tabular-nums text-ink-900"
                style={{
                  animation:
                    runningScore > 0
                      ? "score-flash 600ms ease-out forwards"
                      : undefined,
                }}
              >
                {runningScore.toLocaleString()}
              </span>
              {popPoints !== null && (
                <span
                  key={`pop-${round}`}
                  className="pointer-events-none absolute -top-1 right-0 font-mono text-[12px] font-semibold tabular-nums text-accent"
                  style={{
                    animation:
                      "score-pop 1.4s cubic-bezier(0.16,1,0.3,1) forwards",
                  }}
                >
                  +{popPoints}
                </span>
              )}
            </div>
          </div>

          {/* Countdown bar */}
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-200/30">
            <div
              key={`bar-${round}`}
              className={`h-full transition-colors ${
                urgent ? "bg-red-500" : "bg-accent"
              }`}
              style={{
                animation: `countdown-shrink ${ROUND_DURATION_MS}ms linear forwards`,
                animationPlayState: playing ? "running" : "paused",
              }}
            />
          </div>
        </div>
      </div>

      {/* Middle — scrollable challenge area, grows to fill space between
          the sticky bars. */}
      <div className="mx-auto w-full max-w-[1080px] flex-1 px-6 py-8 md:px-10">
        <div className="flex justify-center">
          <ChallengeFrame
            key={challenge.id}
            url={challenge.url}
            revealed={mode.kind === "reveal"}
            onCorrect={() => handleOutcome("correct")}
            onWrong={() => handleOutcome("wrong")}
          >
            <challenge.Component />
          </ChallengeFrame>
        </div>
      </div>

      {/* Sticky footer — End game stays reachable at the viewport bottom
          whenever the section is taller than the visible area. */}
      <div className="sticky bottom-0 z-30 bg-cream shadow-[0_-4px_12px_-6px_rgba(14,23,41,0.08)]">
        <div className="mx-auto flex max-w-[1080px] justify-center px-6 py-3 md:px-10">
          <button
            type="button"
            onClick={onQuit}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 underline-offset-4 hover:text-accent hover:underline"
          >
            End game
          </button>
        </div>
      </div>

      {mode.kind === "reveal" && (
        <RevealOverlay
          result={mode.lastResult}
          sin={challenge.sin}
          explanation={challenge.explanation}
        />
      )}
    </section>
  );
}

type DotState = "future" | "active" | "correct" | "wrong";

function dotState(
  i: number,
  round: number,
  mode: Mode,
  results: RoundResult[],
): DotState {
  if (i < round) {
    return results[i]?.outcome === "correct" ? "correct" : "wrong";
  }
  if (i === round) {
    if (mode.kind === "playing") return "active";
    return mode.lastResult.outcome === "correct" ? "correct" : "wrong";
  }
  return "future";
}

function RoundDot({ state }: { state: DotState }) {
  if (state === "future") {
    return (
      <span
        aria-hidden
        className="h-2 w-2 rounded-full border border-ink-300 bg-transparent"
      />
    );
  }
  if (state === "active") {
    return (
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
        <span className="relative h-2 w-2 rounded-full bg-accent" />
      </span>
    );
  }
  if (state === "correct") {
    return (
      <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
    );
  }
  return <span aria-hidden className="h-2 w-2 rounded-full bg-ink-300" />;
}
