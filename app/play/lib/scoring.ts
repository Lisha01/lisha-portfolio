export const ROUND_DURATION_MS = 30_000;
export const REVEAL_DURATION_MS = 2_000;
export const TOTAL_ROUNDS = 8;

export type Outcome = "correct" | "wrong" | "timeout";

export type RoundResult = {
  challengeId: string;
  outcome: Outcome;
  timeRemainingMs: number;
  points: number;
};

// Speed bonus is normalized against ROUND_DURATION_MS so the per-round
// max stays ~100 regardless of how long a round is. Keeps the tier
// thresholds (1400 = Pixel Perfectionist) meaningful when the timer
// changes.
export function calculatePoints(
  outcome: Outcome,
  timeRemainingMs: number,
): number {
  if (outcome !== "correct") return 0;
  const speedBonus = Math.floor(
    (Math.max(0, timeRemainingMs) / ROUND_DURATION_MS) * 100,
  );
  return 100 + speedBonus;
}

export function totalScore(results: readonly RoundResult[]): number {
  return results.reduce((sum, r) => sum + r.points, 0);
}

export type Tier = {
  name: string;
  min: number;
  description: string;
};

export const TIERS: Tier[] = [
  {
    name: "Pixel Perfectionist",
    min: 1400,
    description:
      "You don't miss the small stuff. You felt the flaws before you read them.",
  },
  {
    name: "Solid Eye",
    min: 1000,
    description: "Strong instincts. The hard ones still slow you down.",
  },
  {
    name: "Design Curious",
    min: 600,
    description:
      "Some are obvious, some take a second look. You're learning the rules.",
  },
  {
    name: "Design Beginner",
    min: 0,
    description:
      "Slow down on the next round. Each mockup is breaking exactly one rule.",
  },
];

export function getTier(score: number): Tier {
  for (const tier of TIERS) {
    if (score >= tier.min) return tier;
  }
  return TIERS[TIERS.length - 1];
}
