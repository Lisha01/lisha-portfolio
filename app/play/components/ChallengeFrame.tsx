"use client";

import { ReactNode, useRef } from "react";

type Props = {
  url: string;
  onCorrect: () => void;
  onWrong: () => void;
  children: ReactNode;
  revealed?: boolean;
};

/*
  Shared shell for every challenge mockup.

  Owns the outer card, browser chrome (traffic lights + URL bar), and the
  single onClick that routes clicks via closest('[data-flaw="true"]').
  Each challenge file just authors the inner mockup JSX and marks the
  flawed element with `data-flaw="true"`. preventDefault swallows native
  link/form behavior so a stray <a> can't navigate the page.

  When `revealed` is true the click handler is suppressed and the wrapper
  gets `reveal-active` — globals.css applies a pulsing accent halo to any
  descendant with data-flaw="true".

  When playing, a custom "game cursor" (accent ring) follows the mouse
  inside the frame. Position is updated imperatively via ref so we don't
  re-render the whole subtree on every mousemove. Native cursor is
  hidden via media-query CSS so the custom cursor stands alone.
*/
export function ChallengeFrame({
  url,
  onCorrect,
  onWrong,
  children,
  revealed = false,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const wrapper = wrapperRef.current;
    const cursor = cursorRef.current;
    if (!wrapper || !cursor) return;
    const rect = wrapper.getBoundingClientRect();
    cursor.style.transform = `translate3d(${e.clientX - rect.left}px, ${
      e.clientY - rect.top
    }px, 0)`;
    cursor.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={revealed ? undefined : handleMouseMove}
      onMouseLeave={revealed ? undefined : handleMouseLeave}
      onClick={
        revealed
          ? undefined
          : (e) => {
              e.preventDefault();
              const target = e.target as HTMLElement;
              if (target.closest('[data-flaw="true"]')) {
                onCorrect();
              } else {
                onWrong();
              }
            }
      }
      className={`relative w-full max-w-[920px] overflow-hidden rounded-2xl border border-ink-200/70 bg-white shadow-[0_30px_80px_-30px_rgba(14,23,41,0.25)] select-none ${
        revealed ? "reveal-active cursor-default" : "challenge-playing"
      }`}
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

      {!revealed && (
        <div
          ref={cursorRef}
          aria-hidden
          className="game-cursor pointer-events-none absolute left-0 top-0 z-50 -ml-4 -mt-4 opacity-0 transition-opacity duration-150 will-change-transform"
        >
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border-2 border-accent bg-accent/15 shadow-[0_0_0_3px_rgba(255,255,255,0.7),0_6px_14px_-4px_rgba(74,124,183,0.5)]" />
            <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          </div>
        </div>
      )}
    </div>
  );
}
