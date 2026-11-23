"use client";

import { useEffect, useRef, useState } from "react";
import { DISCREET_STORAGE_KEY, getLanguage, setLanguage, useT, type Language } from "@/lib/i18n";

export default function QuickExit() {
  const t = useT();
  const escCount = useRef(0);
  const escTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [discreet, setDiscreet] = useState(false);
  const [language, setLang] = useState<Language>("en");

  useEffect(() => {
    setLang(getLanguage());
    const enabled = localStorage.getItem(DISCREET_STORAGE_KEY) === "true";
    setDiscreet(enabled);
    applyDiscreet(enabled);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      escCount.current += 1;
      if (escTimer.current) clearTimeout(escTimer.current);
      escTimer.current = setTimeout(() => { escCount.current = 0; }, 700);
      if (escCount.current >= 2) window.location.replace("https://www.bbc.com/weather");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function applyDiscreet(enabled: boolean) {
    if (enabled) {
      document.title = "Notes";
      let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!icon) {
        icon = document.createElement("link");
        icon.rel = "icon";
        document.head.appendChild(icon);
      }
      icon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23ffffff'/%3E%3C/svg%3E";
    } else {
      document.title = t("appName");
    }
  }

  function toggleDiscreet() {
    const next = !discreet;
    setDiscreet(next);
    localStorage.setItem(DISCREET_STORAGE_KEY, String(next));
    applyDiscreet(next);
  }

  function changeLanguage(next: Language) {
    setLang(next);
    setLanguage(next);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => window.location.replace("https://www.bbc.com/weather")}
        className="fixed bottom-5 right-5 z-[70] rounded-xl bg-calm-900 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-calm-800"
        aria-label={t("quickExit")}
        title={t("quickExitAdvice")}
      >
        {t("quickExit")}
      </button>
      <div className="fixed bottom-5 left-5 z-[70] hidden items-center gap-2 rounded-xl border border-calm-200 bg-white p-2 shadow-sm sm:flex">
        <button type="button" onClick={toggleDiscreet} className="rounded-lg px-2 py-1 text-xs font-medium text-calm-700">
          {t("discreetMode")}: {discreet ? "On" : "Off"}
        </button>
        <label className="sr-only" htmlFor="global-language">{t("language")}</label>
        <select
          id="global-language"
          value={language}
          onChange={(event) => changeLanguage(event.target.value as Language)}
          className="rounded-lg border border-calm-200 px-2 py-1 text-xs text-calm-700"
        >
          <option value="en">{t("english")}</option>
          <option value="es">{t("spanish")}</option>
        </select>
      </div>
    </>
  );
}
