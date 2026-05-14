"use client";

import { Check } from "lucide-react";

function PricingMockup() {
  return (
    <div className="p-8 sm:p-12">
      <div className="text-center">
        <p className="eyebrow text-ink-400">Pricing</p>
        <h1 className="mt-3 font-display text-[28px] font-normal leading-tight tracking-tight text-ink-900">
          Simple plans, no surprises.
        </h1>
        <p className="mt-3 font-sans text-[14px] text-ink-600">
          Pick a tier. Switch anytime.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Starter — clean baseline card */}
        <div className="rounded-2xl border border-ink-200/60 bg-white p-6 shadow-sm">
          <p className="eyebrow text-ink-400">Starter</p>
          <p className="mt-3 font-display text-[28px] font-medium text-ink-900">
            $9
            <span className="font-sans text-[13px] font-normal text-ink-400">
              /mo
            </span>
          </p>
          <p className="mt-2 font-sans text-[13px] text-ink-600">
            For solo builders shipping side projects.
          </p>
          <ul className="mt-5 space-y-2 font-sans text-[13px] text-ink-700">
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" /> 1
              workspace
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" /> 5
              projects
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" />{" "}
              Community support
            </li>
          </ul>
          <button
            type="button"
            tabIndex={-1}
            className="mt-6 w-full rounded-full border border-ink-200 bg-white px-4 py-2 font-sans text-[13px] font-medium text-ink-900"
          >
            Start free
          </button>
        </div>

        {/*
          THE FLAW — "Pro" card carries the "Most popular" badge but is
          rendered washed-out (muted bg, no shadow, ink-400 typography,
          flat outline), while the Business card gets the prominent
          treatment. Visual hierarchy contradicts the label.
        */}
        <div
          data-flaw="true"
          className="rounded-2xl border border-ink-200/40 bg-cream/60 p-6"
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow text-ink-400">Pro</p>
            <span className="inline-flex items-center rounded-full bg-ink-200/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-400">
              Most popular
            </span>
          </div>
          <p className="mt-3 font-display text-[28px] font-medium text-ink-400">
            $29
            <span className="font-sans text-[13px] font-normal text-ink-300">
              /mo
            </span>
          </p>
          <p className="mt-2 font-sans text-[13px] text-ink-400">
            For growing teams shipping in parallel.
          </p>
          <ul className="mt-5 space-y-2 font-sans text-[13px] text-ink-400">
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-ink-300" /> 10
              workspaces
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-ink-300" />{" "}
              Unlimited projects
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-ink-300" /> Email
              support
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-ink-300" />{" "}
              Custom domains
            </li>
          </ul>
          <button
            type="button"
            tabIndex={-1}
            className="mt-6 w-full rounded-full border border-ink-200 bg-cream px-4 py-2 font-sans text-[13px] font-medium text-ink-400"
          >
            Start free
          </button>
        </div>

        {/* Business — heavy accent treatment that visually reads as recommended */}
        <div className="rounded-2xl border-2 border-accent bg-white p-6 shadow-[0_18px_40px_-18px_rgba(74,124,183,0.45)]">
          <p className="eyebrow text-accent">Business</p>
          <p className="mt-3 font-display text-[28px] font-medium text-ink-900">
            $99
            <span className="font-sans text-[13px] font-normal text-ink-400">
              /mo
            </span>
          </p>
          <p className="mt-2 font-sans text-[13px] text-ink-600">
            For organizations with audit and SSO needs.
          </p>
          <ul className="mt-5 space-y-2 font-sans text-[13px] text-ink-700">
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" />{" "}
              Everything in Pro
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" /> SSO &
              SCIM
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" /> Audit
              log
            </li>
            <li className="flex gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-accent" />{" "}
              Dedicated support
            </li>
          </ul>
          <button
            type="button"
            tabIndex={-1}
            className="mt-6 w-full rounded-full bg-ink-900 px-4 py-2 font-sans text-[13px] font-medium text-white"
          >
            Contact sales
          </button>
        </div>
      </div>
    </div>
  );
}

export const challenge = {
  id: "pricing-inverted-hierarchy",
  title: "Pricing Page",
  sin: "'Most Popular' plan visually de-emphasized",
  explanation:
    "The Pro tier wears the 'Most popular' badge but is rendered washed-out — muted background, no shadow, ink-400 typography — while Business gets the accent border, drop shadow, and dark CTA. The eye lands on the tier the page never recommended.",
  url: "lumen.co/pricing",
  Component: PricingMockup,
};
