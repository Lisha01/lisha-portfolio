"use client";

import { Database, MoreHorizontal } from "lucide-react";

function ModalMockup() {
  return (
    <div className="relative">
      {/* Background page — dimmed to suggest modal context */}
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-ink-400">Workspace</p>
            <h1 className="mt-2 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
              Databases
            </h1>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="rounded-full border border-ink-200 bg-white px-3 py-1.5 font-sans text-[12px] font-medium text-ink-700"
          >
            New database
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {["production", "staging", "analytics", "archive"].map((name) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border border-ink-200/60 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Database size={14} className="text-ink-600" />
                <span className="font-mono text-[13px] text-ink-900">
                  {name}
                </span>
              </div>
              <MoreHorizontal size={14} className="text-ink-400" />
            </div>
          ))}
        </div>
      </div>

      {/*
        The modal layout container is full-screen (absolute inset-0). It
        catches the cursor when the player hovers empty space around the
        card — without an opt-out, the hover-affordance CSS paints an
        outline across the whole canvas. The `.nohover` class excludes
        it from the rule. Keep pointer-events on (default) so the cursor
        doesn't fall through to the dimmed page rows beneath the
        backdrop.
      */}
      <div className="absolute inset-0 bg-ink-900/40" />

      {/* Modal — the card is also .nohover so empty padding inside the
          card (between the paragraph and the action row) doesn't paint
          a full-card outline. Buttons and text inside still match the
          hover rule because they don't carry the class. */}
      <div className="nohover absolute inset-0 flex items-center justify-center px-6">
        <div className="nohover w-full max-w-[420px] rounded-2xl border border-ink-200/60 bg-white p-6 shadow-[0_30px_80px_-20px_rgba(14,23,41,0.45)]">
          <h2 className="font-display text-[20px] font-medium tracking-tight text-ink-900">
            Delete database?
          </h2>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-600">
            <span className="font-mono text-ink-900">production</span> will be
            permanently deleted along with all of its tables, indexes, and
            connections. This action cannot be undone.
          </p>
          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="button"
              tabIndex={-1}
              className="rounded-full bg-transparent px-4 py-2 font-sans text-[13px] font-medium text-ink-400"
            >
              Cancel
            </button>
            {/*
              THE FLAW — destructive action gets the affirmative-primary
              treatment (dark fill, white text). Cancel — the safe path
              — is muted and easy to miss. Eye and habit both land on
              "Delete," which here erases the production database.
            */}
            <button
              type="button"
              tabIndex={-1}
              data-flaw="true"
              className="rounded-full bg-ink-900 px-4 py-2 font-sans text-[13px] font-medium text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const challenge = {
  id: "modal-destructive-primary",
  title: "Delete Confirmation",
  sin: "Destructive action styled as primary",
  explanation:
    "'Delete' is rendered with the dark, filled, primary-button treatment; 'Cancel' is a muted ghost. Habit and visual weight both pull the user toward 'Delete' — which here would erase the production database. Destructive actions should look distinctly destructive, and the safe escape should be the easy click.",
  url: "admin.heron.app/databases",
  Component: ModalMockup,
};
