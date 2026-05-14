"use client";

import { ArrowRight, Sparkles } from "lucide-react";

function OnboardingMockup() {
  const options = [
    { title: "Internal tools", body: "Dashboards and admin panels for the team" },
    { title: "Customer-facing app", body: "A product your customers log into" },
    { title: "Marketing site", body: "Pages, blog, and lead capture" },
    { title: "Something else", body: "We'll figure it out together" },
  ];

  return (
    <div className="bg-cream/40 p-6 sm:p-10">
      <div className="mx-auto max-w-[560px] rounded-2xl border border-ink-200/60 bg-white p-8 shadow-sm">
        {/*
          THE FLAW — progress indicator without a total.
          "Step 2 of ?" tells the user where they are but not how far
          they have to go. The progress bar reinforces the lie by
          drawing a confident "you're a third of the way through"
          fill against an unknown denominator.
        */}
        <div data-flaw="true" className="flex items-center gap-3">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
            Step 2 of ?
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink-200/40">
            <div className="h-full w-1/3 rounded-full bg-accent" />
          </div>
        </div>

        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-accent">
          <Sparkles size={20} />
        </div>

        <h2 className="mt-5 font-display text-[24px] font-normal leading-tight tracking-tight text-ink-900">
          Tell us what you&apos;re building.
        </h2>
        <p className="mt-3 font-sans text-[14px] leading-relaxed text-ink-600">
          We&apos;ll tune your workspace defaults and suggested integrations to
          match.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {options.map((opt) => (
            <button
              key={opt.title}
              type="button"
              tabIndex={-1}
              className="rounded-xl border border-ink-200/60 bg-white p-4 text-left transition-colors hover:border-ink-400"
            >
              <p className="font-sans text-[13px] font-medium text-ink-900">
                {opt.title}
              </p>
              <p className="mt-1 font-sans text-[12px] text-ink-500">
                {opt.body}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            tabIndex={-1}
            className="font-sans text-[13px] font-medium text-ink-500"
          >
            Back
          </button>
          <button
            type="button"
            tabIndex={-1}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 font-sans text-[13px] font-medium text-white"
          >
            Continue
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export const challenge = {
  id: "onboarding-unknown-total",
  title: "Onboarding Step",
  sin: "Progress indicator with no total",
  explanation:
    "'Step 2 of ?' tells the user where they are but not how far they have to go. Progress indicators work only when both numerator and denominator are present — otherwise it's a meaningless count that quietly erodes trust in the flow's length.",
  url: "welcome.arbor.io/setup",
  Component: OnboardingMockup,
};
