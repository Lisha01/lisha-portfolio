"use client";

import { useState } from "react";
import { NavBar } from "@/components/nav-bar";
import { LandingScreen } from "./components/LandingScreen";
import { GameScreen } from "./components/GameScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import type { RoundResult } from "./lib/scoring";

type Phase = "landing" | "playing" | "results";

export default function PlayPage() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [runId, setRunId] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  function startNewRun() {
    setRunId((n) => n + 1);
    setResults([]);
    setPhase("playing");
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-cream">
        {phase === "landing" && <LandingScreen onStart={startNewRun} />}

        {phase === "playing" && (
          <GameScreen
            key={runId}
            onFinish={(r) => {
              setResults(r);
              setPhase("results");
            }}
            onQuit={() => setPhase("landing")}
          />
        )}

        {phase === "results" && (
          <ResultsScreen results={results} onPlayAgain={startNewRun} />
        )}
      </main>
    </>
  );
}
