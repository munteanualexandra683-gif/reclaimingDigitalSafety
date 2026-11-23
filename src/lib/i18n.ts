"use client";

import { useCallback, useEffect, useState } from "react";
import { en } from "./dictionary.en";
import { es } from "./dictionary.es";

/**
 * Minimal client-side i18n.
 *
 * English (`dictionary.en.ts`) is the default and the complete source of every
 * user-facing string. Spanish (`dictionary.es.ts`) is the backup translation;
 * any key missing there falls back to English.
 *
 * Placeholders use `{name}` and are filled with `t(key, { name: "…" })`.
 */

export type Language = "en" | "es";
export type Dictionary = typeof en;
export type TKey = keyof Dictionary;
export type TFunction = (key: TKey, vars?: Record<string, string | number>) => string;

export const LANG_STORAGE_KEY = "rds_language";
export const DISCREET_STORAGE_KEY = "rds_discreet";
const LANGUAGE_EVENT = "rds-language-change";

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

export function setLanguage(language: Language) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, language);
  } catch {
    /* storage may be blocked; the choice still applies to this page view */
  }
  window.document.documentElement.lang = language;
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: language }));
}

export function translate(
  language: Language,
  key: TKey,
  vars?: Record<string, string | number>,
): string {
  const template = (language === "es" ? es[key] : undefined) ?? en[key];
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

/** Current UI language; updates when the user switches language anywhere. */
export function useLanguage(): Language {
  const [language, setLang] = useState<Language>("en");
  useEffect(() => {
    const current = getLanguage();
    setLang(current);
    document.documentElement.lang = current;
    const onChange = (event: Event) => {
      setLang((event as CustomEvent<Language>).detail);
    };
    window.addEventListener(LANGUAGE_EVENT, onChange);
    return () => window.removeEventListener(LANGUAGE_EVENT, onChange);
  }, []);
  return language;
}

export function useT(): TFunction {
  const language = useLanguage();
  return useCallback<TFunction>(
    (key, vars) => translate(language, key, vars),
    [language],
  );
}

/** Format an ISO date in the current UI language (e.g. "23 Nov 2026"). */
export function formatDate(iso: string | undefined, language: Language): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(language === "es" ? "es-ES" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export { en };
