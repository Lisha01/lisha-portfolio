"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { RoundResult } from "../lib/scoring";

type Props = {
  result: RoundResult;
  sin: string;
  explanation: string;
};

const CELEBRATION_EMOJIS = ["🎉", "✨", "🎊", "🥳"];

export function RevealOverlay({ result, sin, explanation }: Props) {
  const ok = result.outcome === "correct";
  const timedOut = result.outcome === "timeout";
  const Icon = ok ? CheckCircle2 : timedOut ? Clock : XCircle;
  const label = ok ? "Nice catch" : timedOut ? "Time's up" : "Off by a bit";
  const moodEmoji = ok ? null : timedOut ? "⏱️" : "😔";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-6 sm:px-6 sm:pb-8">
      <div
        className={`pointer-events-auto relative mx-auto max-w-[640px] rounded-2xl border bg-white p-5 shadow-[0_30px_80px_-20px_rgba(14,23,41,0.35)] ${
          ok ? "border-accent/40" : "border-ink-200/60"
        }`}
        style={{
          animation: "reveal-rise 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Celebration burst — only for correct answers. Sits above the
            card; overflow-visible (default on this card) lets it spill. */}
        {ok && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-2 flex justify-center gap-2 text-[28px]"
          >
            {CELEBRATION_EMOJIS.map((emoji, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: "emoji-burst 1.8s ease-out forwards",
                  animationDelay: `${i * 90}ms`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-start gap-4">
          <div
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              ok ? "bg-accent text-white" : "bg-ink-200/40 text-ink-600"
            }`}
          >
            <Icon size={18} aria-hidden />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow inline-flex items-center gap-1.5 text-ink-400">
                {label}
                {moodEmoji && (
                  <span aria-hidden className="text-[14px] leading-none">
                    {moodEmoji}
                  </span>
                )}
              </p>
              {ok && (
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent tabular-nums">
                  +{result.points}
                </span>
              )}
            </div>
            <p className="mt-1.5 font-display text-[18px] font-medium leading-tight tracking-tight text-ink-900">
              {sin}
            </p>
            <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-600">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
