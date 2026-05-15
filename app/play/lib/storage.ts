const BEST_SCORE_KEY = "play.bestScore";

export function getBestScore(): number | null {
  try {
    const v = localStorage.getItem(BEST_SCORE_KEY);
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function saveBestScore(score: number): boolean {
  try {
    const current = getBestScore() ?? 0;
    if (score > current) {
      localStorage.setItem(BEST_SCORE_KEY, String(score));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
