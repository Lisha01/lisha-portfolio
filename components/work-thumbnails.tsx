const SKY_GRADIENT =
  "linear-gradient(180deg, #1E3A6B 0%, #335C99 12%, #4A7CB7 28%, #77A9DA 50%, #BECFE1 75%, #EEEFF3 100%)";

function Backdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full" style={{ background: SKY_GRADIENT }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-20" />
      {children}
    </div>
  );
}

/* ============================================================
   1. WORKBOOK — vertical journey, wide cards on a numbered spine
   Fills the tall tile properly: numbered spine on the left,
   substantial cards on the right covering the available width.
============================================================ */
export function WorkbookThumb() {
  const stages: Array<{
    n: number;
    label: string;
    state: "done" | "pending" | "focal";
  }> = [
    { n: 1, label: "Query", state: "done" },
    { n: 2, label: "Plan", state: "done" },
    { n: 3, label: "Report", state: "done" },
    { n: 4, label: "Insight", state: "focal" },
  ];

  return (
    <Backdrop>
      {/* Atmospheric sparkles */}
      <span
        aria-hidden
        className="absolute right-[10%] top-[6%] h-[3px] w-[3px] rounded-full bg-white opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.7)]"
      />
      <span
        aria-hidden
        className="absolute left-[8%] top-[12%] h-1 w-1 rounded-full bg-white opacity-55"
      />
      <span
        aria-hidden
        className="absolute right-[6%] bottom-[14%] h-[2px] w-[2px] rounded-full bg-white opacity-60"
      />

      <div className="absolute inset-0 grid grid-cols-[auto_1fr] gap-3 p-10 md:gap-4">
        {/* ─── Vertical numbered spine ─── */}
        <div className="relative flex flex-col items-end justify-between py-1.5 pr-1">
          {/* Dashed connecting line traveling the whole spine */}
          <span
            aria-hidden
            className="absolute right-[13px] top-3 bottom-3 w-px"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.55) 50%, transparent 50%)",
              backgroundSize: "1px 5px",
            }}
          />
          {stages.map((s) => (
            <div key={s.n} className="relative flex items-center gap-2">
              <span
                className={`font-mono text-[8px] font-semibold uppercase tracking-[0.18em] ${
                  s.state === "focal" ? "text-white" : "text-white/75"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full font-mono text-[7px] font-semibold ${
                  s.state === "focal"
                    ? "bg-white text-accent shadow-[0_0_14px_rgba(255,255,255,0.85)]"
                    : s.state === "done"
                    ? "bg-white/90 text-accent"
                    : "border border-white/50 bg-white/15 text-white"
                }`}
              >
                {s.n}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Cards column, stretched to full height ─── */}
        <div className="flex flex-col justify-between gap-2">
          {/* QUERY */}
          <Card>
            <CardEyebrow accent left="ask" right="workbook" />
            <p
              className="mt-1.5 font-display leading-[1.15] text-ink-900"
              style={{ fontSize: "12px", letterSpacing: "-0.01em" }}
            >
              Why did{" "}
              <span className="font-light italic text-accent">
                Q1 pipeline
              </span>{" "}
              slow down?
            </p>
            <div className="mt-2 flex items-center gap-1 border-t border-ink-100 pt-1.5">
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-ink-400">
                Petavue · sales hub
              </span>
              <span className="ml-auto font-mono text-[6px] uppercase tracking-[0.14em] text-ink-400">
                ↵ run
              </span>
            </div>
          </Card>

          {/* PLAN */}
          <Card>
            <CardEyebrow left="plan · 5 steps" right="3 / 5 done" />
            <div className="mt-1.5 flex flex-col gap-[3px]">
              {[
                { n: 1, label: "Closed Won metrics", done: true },
                { n: 2, label: "Completed activities", done: true },
                { n: 3, label: "Effectiveness analysis", done: true },
                { n: 4, label: "Impact patterns", done: false },
                { n: 5, label: "Segment by deal size", done: false, active: true },
              ].map((step) => (
                <div
                  key={step.n}
                  className={`flex items-center gap-1.5 rounded px-1 py-[1px] ${
                    step.active ? "bg-accent/10" : ""
                  }`}
                >
                  <span
                    className={`flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full font-mono text-[5px] font-semibold ${
                      step.done
                        ? "bg-accent text-white"
                        : step.active
                        ? "bg-white border border-accent text-accent"
                        : "border border-ink-300 bg-white text-ink-400"
                    }`}
                  >
                    {step.n}
                  </span>
                  <span
                    className={`font-sans text-[8px] leading-tight ${
                      step.done
                        ? "text-ink-700 line-through decoration-ink-300"
                        : step.active
                        ? "font-semibold text-accent"
                        : "text-ink-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* REPORT */}
          <Card>
            <CardEyebrow accent left="memo · key findings" right="auto-drafted" />
            <div className="mt-1.5 space-y-[3px]">
              <div className="h-[2px] w-full rounded-full bg-ink-200" />
              <div className="h-[2px] w-[88%] rounded-full bg-ink-200" />
              <div className="h-[2px] w-[72%] rounded-full bg-ink-200" />
              <div className="my-1 flex items-center gap-1.5 rounded bg-accent/8 px-1.5 py-1">
                <span className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                <div className="h-[2px] flex-1 rounded-full bg-accent/70" />
                <div className="h-[2px] w-[20%] rounded-full bg-accent/40" />
              </div>
              <div className="h-[2px] w-[80%] rounded-full bg-ink-200" />
              <div className="h-[2px] w-[55%] rounded-full bg-ink-200" />
            </div>
          </Card>

          {/* INSIGHT — focal */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-1 rounded-xl bg-white/25 blur-md"
            />
            <div className="relative rounded-lg border border-white/40 bg-accent px-3 py-2 text-white shadow-[0_22px_44px_-18px_rgba(14,23,41,0.75)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-white/80">
                  Insight
                </span>
                <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-white/60">
                  step 5 · large deals
                </span>
              </div>
              <div className="mt-1 flex items-end justify-between gap-3">
                <p
                  className="font-display font-medium leading-none"
                  style={{ fontSize: "26px", letterSpacing: "-0.025em" }}
                >
                  +18.4%
                </p>
                <svg
                  aria-hidden
                  viewBox="0 0 60 16"
                  className="h-4 w-16"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="wb-spark-v2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 13 L10 11 L20 12 L30 8 L40 9 L50 5 L60 1 L60 16 L0 16 Z"
                    fill="url(#wb-spark-v2)"
                  />
                  <path
                    d="M0 13 L10 11 L20 12 L30 8 L40 9 L50 5 L60 1"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="60" cy="1" r="1.6" fill="white" />
                </svg>
              </div>
              <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-white/85">
                avg cycle ↓ · meetings win on segments above $50K
              </p>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/70 bg-white px-3 py-2 shadow-[0_12px_28px_-12px_rgba(14,23,41,0.55)] backdrop-blur-sm">
      {children}
    </div>
  );
}

function CardEyebrow({
  left,
  right,
  accent = false,
}: {
  left: string;
  right: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`font-mono text-[7px] font-semibold uppercase tracking-[0.14em] ${
          accent ? "text-accent" : "text-ink-700"
        }`}
      >
        {left}
      </span>
      <span className="font-mono text-[6px] uppercase tracking-[0.14em] text-ink-400">
        {right}
      </span>
    </div>
  );
}

/* ============================================================
   2. DESIGN SYSTEM — kept; refined spacing only
============================================================ */
export function DesignSystemThumb() {
  return (
    <Backdrop>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="grid h-[74%] w-[78%] grid-cols-4 grid-rows-3 gap-2">
          <div className="rounded-md bg-[#1E3A6B] shadow-sm ring-1 ring-white/40" />
          <div className="rounded-md bg-[#335C99] shadow-sm ring-1 ring-white/40" />
          <div className="rounded-md bg-[#4A7CB7] shadow-sm ring-1 ring-white/40" />
          <div className="rounded-md bg-white shadow-sm ring-1 ring-ink-900/10" />

          <div className="col-span-2 flex items-center gap-1.5 rounded-md border border-white/70 bg-white/85 p-1.5 backdrop-blur-sm">
            <span className="rounded-sm bg-accent px-2 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-white">
              Button
            </span>
            <span className="rounded-sm border border-ink-200 px-1.5 py-1 font-mono text-[7px] uppercase tracking-[0.16em] text-ink-600">
              Tag
            </span>
          </div>
          <div className="col-span-2 flex items-center justify-around rounded-md border border-white/70 bg-white/85 p-1.5 backdrop-blur-sm">
            <Toggle on />
            <Toggle on={false} />
            <Toggle on />
          </div>

          <div className="col-span-2 rounded-md border border-white/70 bg-white/85 p-1.5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-ink-600">
                Select
              </span>
              <span className="font-mono text-[8px] text-ink-400">▾</span>
            </div>
            <div className="mt-1 space-y-0.5">
              <div className="h-0.5 w-3/4 rounded-full bg-ink-200" />
              <div className="h-0.5 w-1/2 rounded-full bg-ink-200" />
            </div>
          </div>
          <div className="flex items-center justify-center rounded-md bg-accent/90 ring-1 ring-white/40">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white">
              Aa
            </span>
          </div>
          <div className="flex items-center justify-center rounded-md border border-white/70 bg-white/85 backdrop-blur-sm">
            <div className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-white" />
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`flex h-2.5 w-5 items-center rounded-full p-0.5 ${
        on ? "justify-end bg-accent" : "justify-start bg-ink-200"
      }`}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}

/* ============================================================
   3. AI AGENT PLAYBOOK — editorial book cover
   Inspiration: Stripe Press, Cal.com case cards. One headline, two
   ornaments, depth from stacked page edges. Reads at any size.
============================================================ */
export function AIAgentPlaybookThumb() {
  return (
    <Backdrop>
      {/* Sparse doodles — only two */}
      <Sparkle className="absolute left-[14%] top-[18%]" size={11} />
      <Sparkle className="absolute right-[12%] bottom-[22%]" size={9} />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative aspect-[5/3] w-full max-w-[260px]">
          {/* Page edges behind — depth */}
          <div
            aria-hidden
            className="absolute -bottom-1 left-1.5 right-1.5 h-[6px] rounded-b-lg bg-white/40"
          />
          <div
            aria-hidden
            className="absolute -bottom-2 left-3 right-3 h-[4px] rounded-b-lg bg-white/25"
          />

          {/* Cover */}
          <div className="relative flex h-full w-full flex-col justify-between rounded-lg border border-white/80 bg-white p-3.5 shadow-[0_30px_60px_-24px_rgba(14,23,41,0.55)]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-accent">
                Playbook
              </span>
              <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-ink-400">
                03 parts
              </span>
            </div>

            <p
              className="font-display font-normal leading-[1.02] text-ink-900"
              style={{ fontSize: "18px", letterSpacing: "-0.015em" }}
            >
              So you want to{" "}
              <span className="font-light italic text-accent">
                hire an AI agent
              </span>
              ?
            </p>

            <div className="flex items-center gap-1.5">
              <span className="h-1 w-4 rounded-full bg-accent" />
              <span className="h-1 w-2 rounded-full bg-ink-200" />
              <span className="h-1 w-2 rounded-full bg-ink-200" />
              <span className="ml-auto font-mono text-[7px] uppercase tracking-[0.16em] text-ink-400">
                Part 1
              </span>
            </div>
          </div>
        </div>
      </div>

    </Backdrop>
  );
}

function Sparkle({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
    >
      <path
        d="M6 0 L6.9 5.1 L12 6 L6.9 6.9 L6 12 L5.1 6.9 L0 6 L5.1 5.1 Z"
        fill="white"
        fillOpacity="0.85"
      />
    </svg>
  );
}

/* ============================================================
   5. SPOT THE BAD UX — frozen frame of the game in motion
   Round progress dots across the top, a browser mockup with one
   accent-haloed CTA (the "flaw"), and the game cursor centered on
   that pill with a subtle bob so the whole composition reads as
   "a player about to click."
============================================================ */
export function SpotTheBadUxThumb() {
  const dotStates: Array<"done" | "active" | "future"> = [
    "done",
    "done",
    "done",
    "active",
    "future",
    "future",
    "future",
    "future",
  ];

  return (
    <Backdrop>
      {/* Round progress dots — current round pulses */}
      <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-1.5">
        {dotStates.map((s, i) => {
          if (s === "active") {
            return (
              <span key={i} className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-white" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            );
          }
          if (s === "done") {
            return (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-white/90"
              />
            );
          }
          return (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full border border-white/40 bg-transparent"
            />
          );
        })}
      </div>

      {/* Atmospheric sparkles */}
      <Sparkle className="absolute left-[10%] top-[38%]" size={10} />
      <Sparkle className="absolute right-[12%] bottom-[22%]" size={8} />
      <Sparkle className="absolute right-[18%] top-[24%]" size={5} />

      {/* Browser frame */}
      <div className="absolute inset-0 flex items-center justify-center p-6 pt-12">
        <div className="relative w-full max-w-[300px] overflow-hidden rounded-md border border-white/80 bg-white shadow-[0_24px_56px_-18px_rgba(14,23,41,0.65)]">
          {/* Chrome */}
          <div className="flex items-center gap-1 border-b border-ink-200/60 bg-cream px-2 py-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-200" />
            <span className="h-1 w-1 rounded-full bg-ink-200" />
            <span className="h-1 w-1 rounded-full bg-ink-200" />
            <div className="ml-1 h-2 flex-1 rounded-sm bg-white/80" />
          </div>

          {/* Body */}
          <div className="px-3.5 py-3">
            <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-ink-400">
              Workspace
            </p>
            <p className="mt-1 font-display text-[13px] font-medium leading-tight text-ink-900">
              Projects
            </p>

            <div className="mt-2.5 space-y-1">
              <div className="h-[2px] w-full rounded-full bg-ink-200" />
              <div className="h-[2px] w-[78%] rounded-full bg-ink-200" />
              <div className="h-[2px] w-[88%] rounded-full bg-ink-200" />
            </div>

            <div className="mt-3.5 flex items-center justify-end gap-1.5">
              <div className="h-3.5 w-10 rounded-full border border-ink-200 bg-white" />
              {/* Focal "flaw" pill — accent fill, animated halo, custom cursor centered on it */}
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-1.5 rounded-full bg-accent/40 blur-md"
                  style={{ animation: "start-glow 2.4s ease-in-out infinite" }}
                />
                <div
                  className="relative h-3.5 w-11 rounded-full bg-accent"
                  style={{
                    boxShadow:
                      "0 0 0 1.5px var(--color-accent), 0 0 12px rgba(74, 124, 183, 0.7)",
                  }}
                />
                {/* Game cursor centered on the pill */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ animation: "bob 1.8s ease-in-out infinite" }}
                >
                  <div className="relative h-5 w-5">
                    <div className="absolute inset-0 rounded-full border-2 border-accent bg-accent/30 shadow-[0_0_0_2px_rgba(255,255,255,0.65),0_4px_10px_-2px_rgba(74,124,183,0.55)]" />
                    <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

/* ============================================================
   4. ZI SCRIPT — four → one
   Grid-driven so chips, curves, and target card share one
   coordinate system (no more drift between SVG and HTML).
============================================================ */
export function ZIScriptThumb() {
  const products = ["FormComplete", "Chat", "Schedule", "WebSights"];

  return (
    <Backdrop>
      {/* SVG sits behind both chips and card so curves visually feed into the target */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="zi-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Curve origins match chip-row centers (≈13, 37.5, 62.5, 87 in %).
            All four converge at (78, 50) — just inside the card's left edge. */}
        {[13, 37.5, 62.5, 87].map((y) => (
          <path
            key={y}
            d={`M 22 ${y} C 50 ${y}, 60 50, 78 50`}
            stroke="url(#zi-line)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Convergence pulse just inside the card */}
        <circle cx="78" cy="50" r="1.4" fill="white" />
        <circle cx="78" cy="50" r="3.5" fill="white" fillOpacity="0.18" />
      </svg>

      {/* Left — chips, absolutely positioned and evenly distributed */}
      <div className="absolute inset-y-4 left-5 flex flex-col justify-between">
        {products.map((p) => (
          <div
            key={p}
            className="flex items-center gap-1.5 rounded-md border border-white/70 bg-white px-2 py-1 shadow-[0_4px_12px_-6px_rgba(14,23,41,0.45)]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-800">
              {p}
            </span>
          </div>
        ))}
      </div>

      {/* Right — single focal card, vertically centered */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 rounded-xl border border-white/80 bg-white px-3.5 py-2.5 shadow-[0_20px_50px_-20px_rgba(14,23,41,0.6)]">
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-accent">
          One install
        </p>
        <p
          className="mt-1 font-display font-medium leading-none text-ink-900"
          style={{ fontSize: "16px", letterSpacing: "-0.015em" }}
        >
          ZI Script
        </p>
        <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-ink-400">
          4 products · 1 source
        </p>
      </div>

    </Backdrop>
  );
}
