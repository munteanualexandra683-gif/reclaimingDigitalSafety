"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const STORAGE_KEY = "rds_disclaimer_dismissed";

export default function PersistentDisclaimer() {
  const t = useT();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setDismissed(false);
    }
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
    <aside
      aria-label={t("disclaimerLabel")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-calm-200 bg-sand-50/95 backdrop-blur"
    >
      {/* Right padding on small screens keeps the text and button clear of the Quick exit button. */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-3 py-3 pl-4 pr-32 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pr-36">
        <p className="text-xs leading-relaxed text-calm-700">{t("disclaimerText")}</p>
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-none rounded-lg border border-calm-300 bg-white px-3 py-1.5 text-xs font-medium text-calm-800 shadow-sm hover:border-lavender-400 hover:bg-lavender-50/60"
        >
          {t("disclaimerDismiss")}
        </button>
      </div>
    </aside>
  );
}
