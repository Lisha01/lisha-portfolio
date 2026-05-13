"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { track } from "@/lib/analytics";

// Two sources: some browsers reject specific AAC profiles in the .m4a (e.g. HE-AAC),
// so we list .mp3 as a fallback. Browser picks the first <source> it can decode.
const AUDIO_SOURCES: ReadonlyArray<{ src: string; type: string }> = [
  { src: "/audio/lisha-intro-clean.m4a", type: "audio/mp4" },
  { src: "/audio/lisha-intro.mp3", type: "audio/mpeg" },
];

export function IntroVoiceButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = document.createElement("audio");
    audio.preload = "metadata";
    for (const { src, type } of AUDIO_SOURCES) {
      const source = document.createElement("source");
      source.src = src;
      source.type = type;
      audio.appendChild(source);
    }
    audio.load();
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      track("Intro Audio Ended", {
        duration_seconds: Number.isFinite(audio.duration) ? audio.duration : null,
      });
    };
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
    // Recover from a prior media error (e.g. a transient network failure during preload)
    if (audio.error) audio.load();
    const result = audio.play();
    setIsPlaying(true);
    track("Intro Audio Play", {
      duration_seconds: Number.isFinite(audio.duration) ? audio.duration : null,
    });
    if (result && typeof result.catch === "function") {
      result.catch((err: unknown) => {
        setIsPlaying(false);
        const name = err instanceof DOMException ? err.name : undefined;
        // AbortError = pause() ran before play() resolved (rapid Stop click or unmount). User intent, not failure.
        if (name === "AbortError") return;
        const message = err instanceof Error ? err.message : String(err);
        track("Intro Audio Play Failed", {
          error_name: name ?? "Unknown",
          error_message: message,
          media_error_code: audio.error?.code ?? null,
          ready_state: audio.readyState,
          network_state: audio.networkState,
        });
      });
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const playedSeconds = audio.currentTime;
    const totalSeconds = Number.isFinite(audio.duration) ? audio.duration : null;
    audio.pause();
    audio.currentTime = 0;
    // setIsPlaying(false) will fire via the `pause` event listener
    track("Intro Audio Stop", {
      played_seconds: playedSeconds,
      duration_seconds: totalSeconds,
      percent_listened:
        totalSeconds && totalSeconds > 0 ? Math.round((playedSeconds / totalSeconds) * 100) : null,
    });
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
