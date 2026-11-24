"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";

const EXIT_URL = "https://www.bbc.com/weather";

function quickExit() {
  // replace() so the Back button does not return to this page.
  window.location.replace(EXIT_URL);
}

/** Visible on every page (rendered in the root layout). */
export default function QuickExit() {
  const t = useT();
  const escCount = useRef(0);
  const escTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Esc is also used to close menus and pickers while typing, so the
      // double-Esc shortcut is ignored inside form fields.
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) {
        return;
      }
      escCount.current += 1;
      if (escTimer.current) clearTimeout(escTimer.current);
      escTimer.current = setTimeout(() => {
        escCount.current = 0;
      }, 700);
      if (escCount.current >= 2) quickExit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <button
      type="button"
      onClick={quickExit}
      className="fixed bottom-4 right-4 z-[70] rounded-xl bg-calm-900 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-calm-800"
      title={t("quickExitAdvice")}
      aria-describedby="quick-exit-advice"
    >
      {t("quickExit")}
      <span id="quick-exit-advice" className="sr-only">{t("quickExitAdvice")}</span>
    </button>
  );
}
