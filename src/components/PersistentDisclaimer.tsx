"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "rds_disclaimer_dismissed";

export default function PersistentDisclaimer() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem(STORAGE_KEY) === "true";
    setDismissed(isDismissed);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      /* ignore storage write failures */
    }
  }

  if (dismissed) return null;

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-calm-200 bg-sand-50/95 backdrop-blur transition-all">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-lavender-100 text-lavender-700"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 11v5M12 7.5h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="text-xs leading-relaxed text-calm-600">
            This tool does not provide legal or clinical advice and does not
            guarantee content removal. It helps you organise and prepare reports;
            decisions and outcomes rest with the platforms and relevant
            authorities. If you are in immediate danger, contact local emergency
            services.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="flex-none self-end rounded-lg border border-calm-200 bg-white px-3 py-1.5 text-xs font-medium text-calm-700 shadow-sm transition-all hover:border-lavender-400 hover:bg-lavender-50/60 hover:text-calm-900 hover:ring-2 hover:ring-lavender-300/50 focus-visible:outline-none sm:self-center"
        >
          I understand
        </button>
      </div>
    </footer>
  );
}
