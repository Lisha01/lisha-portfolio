"use client";

import { FileText, HelpCircle, Plus, Settings, UserPlus } from "lucide-react";

function QuickActionsMockup() {
  const actions = [
    { icon: Plus, label: "New project" },
    { icon: UserPlus, label: "Invite team" },
    { icon: FileText, label: "Generate report" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help center" },
  ];

  return (
    <div className="p-6 sm:p-10">
      <div>
        <p className="eyebrow text-ink-400">Dashboard</p>
        <h1 className="mt-2 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
          Good morning, <span className="accent-italic">Lisha.</span>
        </h1>
        <p className="mt-2 font-sans text-[14px] text-ink-600">
          Pick up where you left off, or start something new.
        </p>
      </div>

      <p className="eyebrow mt-8 text-ink-400">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {actions.map((a, i) => {
          const isFlaw = i === 2;
          return (
            <button
              key={a.label}
              type="button"
              tabIndex={-1}
              data-flaw={isFlaw ? "true" : undefined}
              className={`inline-flex items-center gap-2 border border-ink-200 bg-white px-4 py-2 font-sans text-[13px] font-medium text-ink-800 ${
                isFlaw ? "rounded-none" : "rounded-full"
              }`}
            >
              <a.icon size={14} className="text-accent" />
              {a.label}
            </button>
          );
        })}
      </div>

      <p className="eyebrow mt-10 text-ink-400">Recent projects</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { name: "Atlas redesign", date: "Edited 2h ago" },
          { name: "Q4 onboarding", date: "Edited yesterday" },
          { name: "Pricing v3", date: "Edited 3d ago" },
        ].map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-ink-200/60 bg-white p-4"
          >
            <p className="font-sans text-[13px] font-medium text-ink-900">
              {p.name}
            </p>
            <p className="mt-1 font-sans text-[11px] text-ink-500">{p.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const challenge = {
  id: "actions-shape-mismatch",
  title: "Dashboard Actions",
  sin: "One button breaks the pill rhythm",
  explanation:
    "Four of the five Quick action buttons are rounded pills; 'Generate report' is square. In a horizontal row, the shape language has to be uniform — a one-off rectangle reads as 'someone forgot to apply the style' or 'this button is special for a reason no one explained.' Pick one shape and commit.",
  url: "app.kepler.co",
  Component: QuickActionsMockup,
};
