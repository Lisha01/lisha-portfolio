"use client";

import { ArrowRight } from "lucide-react";

function FormMockup() {
  return (
    <div className="p-8 sm:p-12">
      <div className="mx-auto max-w-[420px]">
        <p className="eyebrow text-ink-400">Create your account</p>
        <h1 className="mt-3 font-display text-[28px] font-normal leading-tight tracking-tight text-ink-900">
          Get started in <span className="accent-italic">60 seconds.</span>
        </h1>
        <p className="mt-3 font-sans text-[14px] text-ink-600">
          Free for the first 14 days. No credit card required.
        </p>

        <form className="mt-7 space-y-4">
          <div>
            <label
              htmlFor="first"
              className="font-sans text-[12px] font-medium text-ink-700"
            >
              First name
            </label>
            <input
              id="first"
              type="text"
              readOnly
              tabIndex={-1}
              defaultValue="Lisha"
              className="mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 font-sans text-[13px] text-ink-900 outline-none [pointer-events:none]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="font-sans text-[12px] font-medium text-ink-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              readOnly
              tabIndex={-1}
              defaultValue="lisha@northwind.io"
              className="mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 font-sans text-[13px] text-ink-900 outline-none [pointer-events:none]"
            />
          </div>

          {/*
            THE FLAW — password field has only a placeholder, no label.
            On focus the "Password" text disappears and the user is left
            with no indication of what the field is for.
          */}
          <div data-flaw="true">
            <input
              id="password"
              type="password"
              readOnly
              tabIndex={-1}
              placeholder="Password"
              className="block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 font-sans text-[13px] text-ink-900 placeholder:text-ink-400 outline-none [pointer-events:none]"
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="font-sans text-[12px] font-medium text-ink-700"
            >
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              readOnly
              tabIndex={-1}
              defaultValue="resetme123"
              className="mt-1.5 block w-full rounded-lg border border-ink-200 bg-white px-3 py-2 font-sans text-[13px] text-ink-900 outline-none [pointer-events:none]"
            />
          </div>

          <button
            type="button"
            tabIndex={-1}
            className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink-900 px-4 py-2.5 font-sans text-[13px] font-medium text-white"
          >
            Create account
            <ArrowRight size={14} />
          </button>
        </form>

        <p className="mt-5 text-center font-sans text-[12px] text-ink-500">
          Already a member?{" "}
          <span className="font-medium text-accent underline-offset-4">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export const challenge = {
  id: "form-placeholder-as-label",
  title: "Signup Form",
  sin: "Placeholder used as the only label",
  explanation:
    "Four fields carry labels above their inputs; the password field has none. The placeholder text 'Password' disappears the moment the user focuses the field, leaving them with no indication of what they were filling in. Placeholders supplement labels — they don't replace them.",
  url: "join.coralapp.com",
  Component: FormMockup,
};
