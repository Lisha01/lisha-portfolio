"use client";

import { ReactNode } from "react";

type Props = {
  url: string;
  onCorrect: () => void;
  onWrong: () => void;
  children: ReactNode;
};

/*
  Shared shell for every challenge mockup.

  Owns:
   - Outer card (rounded, border, shadow, max-width, white bg)
   - Browser chrome (traffic lights + URL bar)
   - The single click handler — routes via closest('[data-flaw="true"]')

  Each challenge file just authors the inner mockup JSX and marks the
  flawed element with `data-flaw="true"`. preventDefault on the wrapper
  swallows native link/form behavior so a stray <a> can't navigate.
*/
export function ChallengeFrame({ url, onCorrect, onWrong, children }: Props) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.closest('[data-flaw="true"]')) {
          onCorrect();
        } else {
          onWrong();
        }
      }}
      className="w-full max-w-[920px] overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-[0_30px_80px_-30px_rgba(14,23,41,0.25)] select-none"
    >
      <div className="flex items-center gap-2 border-b border-ink-200/60 bg-cream px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
        <div className="ml-3 flex h-6 flex-1 items-center justify-center rounded-md bg-white/80 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
          {url}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
