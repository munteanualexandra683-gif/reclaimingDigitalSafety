/**
 * Catalog of platforms a survivor might report to.
 *
 * `dispatch: "api"`    — the MVP simulates an automated Notice-and-Action API call.
 * `dispatch: "closed"` — no automated interface; we generate a pre-filled text
 *                        block and link the user to the platform's official form.
 */

export type DispatchMethod = "api" | "closed";

export interface Platform {
  id: string;
  name: string;
  category: "social" | "search" | "hosting" | "messaging" | "other";
  dispatch: DispatchMethod;
  /** Official reporting URL (opened for closed platforms). */
  reportUrl: string;
  /** Short note shown to the user about what to expect. */
  note: string;
}

export const PLATFORMS: Platform[] = [
  {
    id: "meta-instagram",
    name: "Instagram (Meta)",
    category: "social",
    dispatch: "api",
    reportUrl: "https://help.instagram.com/contact/584460464379557",
    note: "Automated Notice-and-Action dispatch is simulated for this platform.",
  },
  {
    id: "meta-facebook",
    name: "Facebook (Meta)",
    category: "social",
    dispatch: "api",
    reportUrl: "https://www.facebook.com/help/contact/144059062408922",
    note: "Automated Notice-and-Action dispatch is simulated for this platform.",
  },
  {
    id: "x-twitter",
    name: "X (formerly Twitter)",
    category: "social",
    dispatch: "api",
    reportUrl: "https://help.x.com/en/forms/safety-and-sensitive-content",
    note: "Automated Notice-and-Action dispatch is simulated for this platform.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "social",
    dispatch: "api",
    reportUrl: "https://www.tiktok.com/legal/report/feedback",
    note: "Automated Notice-and-Action dispatch is simulated for this platform.",
  },
  {
    id: "google-search",
    name: "Google Search (de-indexing)",
    category: "search",
    dispatch: "api",
    reportUrl:
      "https://support.google.com/websearch/troubleshooter/3111061",
    note: "Removes eligible results from search without deleting content at the host.",
  },
  {
    id: "reddit",
    name: "Reddit",
    category: "social",
    dispatch: "closed",
    reportUrl: "https://www.reddit.com/report",
    note: "No automated interface — a pre-filled report is generated for the official form.",
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "messaging",
    dispatch: "closed",
    reportUrl: "https://telegram.org/support",
    note: "No automated interface — a pre-filled report is generated for the official form.",
  },
  {
    id: "independent-host",
    name: "Independent website / hosting provider",
    category: "hosting",
    dispatch: "closed",
    reportUrl: "",
    note: "Contact the host's abuse address directly using the generated notice.",
  },
  {
    id: "other",
    name: "Other platform",
    category: "other",
    dispatch: "closed",
    reportUrl: "",
    note: "A generic DSA notice is generated for you to submit via official channels.",
  },
];

export function getPlatform(id: string): Platform | undefined {
  return PLATFORMS.find((p) => p.id === id);
}
