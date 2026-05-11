"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const AUDIO_SRC = "/audio/lisha-intro-clean.m4a";

export function IntroVoiceButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(AUDIO_SRC);
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handleMetadata = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadedmetadata", handleMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audioRef.current = null;
    };
  }, []);

  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Always restart from the top — explicit user requirement
    audio.currentTime = 0;
    const result = audio.play();
    setIsPlaying(true);
    if (result && typeof result.catch === "function") {
      // If the file is missing or autoplay is blocked, fail soft
      result.catch(() => setIsPlaying(false));
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    // setIsPlaying(false) will fire via the `pause` event listener
  };

  return (
    <button
      type="button"
      onClick={isPlaying ? stop : start}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Stop the audio intro" : "Play the audio intro"}
      className="group mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-6 py-3 font-sans text-[14px] font-medium text-ink-900 shadow-lg shadow-ink-900/20 transition-transform hover:-translate-y-0.5"
    >
      {isPlaying ? (
        <>
          <PlayingIndicator />
          <span>Stop</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            listening
          </span>
        </>
      ) : (
        <>
          <Play
            size={13}
            fill="currentColor"
            className="transition-transform group-hover:translate-x-0.5"
          />
          <span>Hear my intro</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            {formatDuration(duration)}
          </span>
        </>
      )}
    </button>
  );
}

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "~ 50s";
  const rounded = Math.max(5, Math.round(seconds / 5) * 5);
  return `~ ${rounded}s`;
}

/** Three animated bars that read as "speaking" without a real audio meter. */
function PlayingIndicator() {
  return (
    <span
      aria-hidden
      className="flex h-3 items-end gap-[2px]"
      style={{ width: 12 }}
    >
      <span className="w-[2px] origin-bottom animate-[voiceBar_900ms_ease-in-out_infinite] rounded-full bg-accent" />
      <span
        className="w-[2px] origin-bottom animate-[voiceBar_900ms_ease-in-out_infinite] rounded-full bg-accent"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-[2px] origin-bottom animate-[voiceBar_900ms_ease-in-out_infinite] rounded-full bg-accent"
        style={{ animationDelay: "300ms" }}
      />
      <style>{`
        @keyframes voiceBar {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}</style>
    </span>
  );
}
