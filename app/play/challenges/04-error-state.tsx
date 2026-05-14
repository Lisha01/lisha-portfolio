"use client";

import { CreditCard, Download } from "lucide-react";

function ErrorStateMockup() {
  return (
    <div className="p-6 sm:p-10">
      <div className="mx-auto max-w-[640px]">
        <p className="eyebrow text-ink-400">Settings</p>
        <h1 className="mt-3 font-display text-[28px] font-normal leading-tight tracking-tight text-ink-900">
          Billing
        </h1>
        <p className="mt-3 font-sans text-[14px] text-ink-600">
          Manage payment methods, invoices, and plan changes.
        </p>

        <div className="mt-8 rounded-2xl border border-ink-200/60 bg-white p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-ink-400">Payment method</p>
            <button
              type="button"
              tabIndex={-1}
              className="font-sans text-[12px] font-medium text-accent"
            >
              Update
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-12 items-center justify-center rounded-md border border-ink-200 bg-cream">
              <CreditCard size={16} className="text-ink-600" />
            </div>
            <div>
              <p className="font-sans text-[13px] font-medium text-ink-900">
                Visa ending 4242
              </p>
              <p className="font-sans text-[12px] text-ink-500">
                Expired 03 / 2025
              </p>
            </div>
          </div>

          {/*
            THE FLAW — error message rendered as ordinary body text.
            Same color, weight, size as the surrounding copy. No icon,
            no border, no severity color. Reads as a footnote, not as a
            billing-blocking failure.
          */}
          <p
            data-flaw="true"
            className="mt-4 font-sans text-[13px] leading-relaxed text-ink-600"
          >
            We weren&apos;t able to charge your card on the last attempt.
            Please update your payment method to keep your subscription active.
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-ink-200/60">
          <div className="flex items-center justify-between border-b border-ink-200/60 bg-cream px-5 py-3">
            <p className="eyebrow text-ink-400">Invoices</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              Last 6 months
            </span>
          </div>
          {[
            { date: "May 1, 2026", amount: "$49.00", status: "Paid" },
            { date: "Apr 1, 2026", amount: "$49.00", status: "Paid" },
            { date: "Mar 1, 2026", amount: "$49.00", status: "Paid" },
          ].map((inv, i, arr) => (
            <div
              key={inv.date}
              className={`grid grid-cols-[1fr_88px_88px_24px] items-center gap-3 px-5 py-3 font-sans text-[13px] ${
                i !== arr.length - 1 ? "border-b border-ink-200/60" : ""
              }`}
            >
              <span className="text-ink-900">{inv.date}</span>
              <span className="text-ink-600 tabular-nums">{inv.amount}</span>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {inv.status}
              </span>
              <Download size={14} className="text-ink-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const challenge = {
  id: "error-no-treatment",
  title: "Billing Settings",
  sin: "Error message styled as body text",
  explanation:
    "The failed-charge notice sits inside the payment-method card with the same color, weight, and size as ordinary copy — no icon, no border, no severity color. A user scrolling past will read it as a footnote, not as a billing-blocking error.",
  url: "settings.helix.io/billing",
  Component: ErrorStateMockup,
};
