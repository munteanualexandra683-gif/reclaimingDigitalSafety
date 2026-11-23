"use client";

import { DISCREET_STORAGE_KEY } from "@/lib/i18n";

/**
 * Discreet mode. The tab title is always the neutral "NEST" (in both modes);
 * discreet mode additionally swaps the tab icon for a plain blank square.
 */

const BLANK_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23ffffff'/%3E%3C/svg%3E";
const ICON_ID = "nest-discreet-icon";

export function getDiscreet(): boolean {
  try {
    return window.localStorage.getItem(DISCREET_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function applyDiscreet(enabled: boolean) {
  document.title = "NEST";
  const existing = document.getElementById(ICON_ID);
  if (!enabled) {
    existing?.remove();
    return;
  }
  if (existing) return;
  const icon = document.createElement("link");
  icon.id = ICON_ID;
  icon.rel = "icon";
  icon.href = BLANK_ICON;
  document.head.appendChild(icon);
}

export function setDiscreet(enabled: boolean) {
  try {
    window.localStorage.setItem(DISCREET_STORAGE_KEY, String(enabled));
  } catch {
    /* storage may be blocked; still apply for this page view */
  }
  applyDiscreet(enabled);
}
