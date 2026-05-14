import { challenge as c1 } from "./01-dashboard";
import { challenge as c2 } from "./02-pricing-card";
import { challenge as c3 } from "./03-form";
import { challenge as c4 } from "./04-error-state";
import { challenge as c5 } from "./05-mobile-nav";
import { challenge as c6 } from "./06-data-table";
import { challenge as c7 } from "./07-modal";
import { challenge as c8 } from "./08-onboarding";

export const challenges = [c1, c2, c3, c4, c5, c6, c7, c8] as const;

export type Challenge = (typeof challenges)[number];
