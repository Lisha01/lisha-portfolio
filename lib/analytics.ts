"use client";

import mixpanel from "mixpanel-browser";

export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    mixpanel.track(event, props);
  } catch {
    // Swallow analytics errors — never break the UI on a tracking failure.
  }
}

export function trackPageView(path: string, extra?: Record<string, unknown>) {
  track("Page View", { path, ...extra });
}
