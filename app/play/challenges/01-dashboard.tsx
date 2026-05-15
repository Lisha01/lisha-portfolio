"use client";

import {
  ArrowUpRight,
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";

function DashboardMockup() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="hidden w-[180px] shrink-0 border-r border-ink-200/60 bg-cream p-4 sm:block">
        <div className="flex items-center gap-2 px-2 pb-6">
          <span className="block h-5 w-5 rounded-md bg-ink-900" />
          <span className="font-display text-[14px] font-medium text-ink-900">
            Northwind
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {[
            { icon: LayoutDashboard, label: "Overview" },
            { icon: FolderKanban, label: "Projects", active: true },
            { icon: Users, label: "Team" },
            { icon: BarChart3, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map((it) => (
            <button
              key={it.label}
              type="button"
              tabIndex={-1}
              className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-left font-sans text-[12px] font-medium ${
                it.active
                  ? "bg-ink-900/5 text-ink-900"
                  : "text-ink-600"
              }`}
            >
              <it.icon size={14} />
              {it.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-400">Workspace</p>
            <h1 className="mt-2 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
              Projects
            </h1>
          </div>

          {/*
            THE FLAW — primary CTA at ~1.6:1 contrast.
            ink-200 (#C7D0DE) on white fails WCAG AA (needs 4.5:1).
            Position and shape read as "button" but the label is invisible.
          */}
          <button
            type="button"
            tabIndex={-1}
            data-flaw="true"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 font-sans text-[13px] font-medium text-ink-200"
          >
            <Plus size={14} />
            New project
          </button>
        </div>

        {/* Search row */}
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-ink-200/60 bg-white px-3 py-2">
          <Search size={14} className="text-ink-400" />
          <input
            type="text"
            readOnly
            tabIndex={-1}
            placeholder="Search projects"
            className="flex-1 bg-transparent font-sans text-[13px] text-ink-900 placeholder:text-ink-400 outline-none [pointer-events:none]"
          />
          <span className="rounded border border-ink-200 px-1.5 py-0.5 font-mono text-[10px] text-ink-400">
            ⌘K
          </span>
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Active", value: "24", delta: "+3" },
            { label: "Shipped", value: "112", delta: "+8" },
            { label: "Velocity", value: "92%", delta: "+2%" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-ink-200/60 bg-white p-4"
            >
              <p className="eyebrow text-ink-400">{s.label}</p>
              <p className="mt-2 font-display text-[22px] font-medium text-ink-900">
                {s.value}
              </p>
              <p className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                <ArrowUpRight size={10} /> {s.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Recent table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-ink-200/60">
          <div className="grid grid-cols-[minmax(0,1fr)_56px_64px_20px] gap-2 border-b border-ink-200/60 bg-cream px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 sm:grid-cols-[1fr_88px_88px_24px] sm:gap-3 sm:px-4">
            <span>Name</span>
            <span>Owner</span>
            <span>Status</span>
            <span />
          </div>
          {[
            { name: "Atlas redesign", owner: "LL", status: "Active", tone: "accent" as const },
            { name: "Q4 onboarding", owner: "SR", status: "Review", tone: "neutral" as const },
            { name: "Pricing v3", owner: "JM", status: "Active", tone: "accent" as const },
          ].map((r, i, arr) => (
            <div
              key={r.name}
              className={`grid grid-cols-[minmax(0,1fr)_56px_64px_20px] items-center gap-2 px-3 py-3 font-sans text-[13px] text-ink-900 sm:grid-cols-[1fr_88px_88px_24px] sm:gap-3 sm:px-4 ${
                i !== arr.length - 1 ? "border-b border-ink-200/60" : ""
              }`}
            >
              <span className="truncate font-medium">{r.name}</span>
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 font-mono text-[10px] text-accent">
                {r.owner}
              </span>
              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${
                  r.tone === "accent"
                    ? "bg-sky-100 text-accent"
                    : "bg-ink-200/40 text-ink-600"
                }`}
              >
                <span
                  className={`h-1 w-1 rounded-full ${
                    r.tone === "accent" ? "bg-accent" : "bg-ink-400"
                  }`}
                />
                {r.status}
              </span>
              <MoreHorizontal size={14} className="text-ink-400" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export const challenge = {
  id: "dashboard-contrast",
  title: "SaaS Dashboard",
  sin: "Low-contrast primary CTA",
  explanation:
    "The 'New project' button label is ink-200 on white — about 1.6:1 contrast, well below the WCAG AA minimum of 4.5:1. A user scanning for the primary action will miss it entirely.",
  url: "app.northwind.io/projects",
  Component: DashboardMockup,
};
