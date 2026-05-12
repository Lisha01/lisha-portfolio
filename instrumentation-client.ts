import mixpanel from "mixpanel-browser";

// Mixpanel project token — public by design (exposed in every browser request).
const MIXPANEL_TOKEN = "7a66485ba83e6810032169ee7793e143";

mixpanel.init(MIXPANEL_TOKEN, {
  debug: process.env.NODE_ENV !== "production",
  track_pageview: false,
  persistence: "localStorage",
  api_host: "https://api.mixpanel.com",
});

mixpanel.register({
  site: "lisha-portfolio",
});
