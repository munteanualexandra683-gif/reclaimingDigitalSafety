"use client";

import { useEffect, useState } from "react";

export type Language = "en" | "es";
export type Dictionary = typeof en;

const en = {
  quickExit: "Quick exit",
  discreetMode: "Discreet mode",
  language: "Language",
  english: "English",
  spanish: "Spanish",
  guidedCase: "Start a guided case",
  prepareReport: "Prepare a report",
  dashboard: "Dashboard",
  deleteEverything: "Delete everything",
  back: "Back",
  continue: "Continue",
  saveLeave: "Save and leave",
  verifiedPending: "Pending verification",
  toBeVerified: "To be verified with a partner organisation before the pilot.",
  focusHeading: "Start here",
  stageDiscover: "Discover & assess",
  stageHelp: "Decide whether to seek help",
  stagePathway: "Reporting pathway",
  stagePrepare: "Prepare & submit",
  stageFollowup: "Follow-up & support",
  rightsTitle: "Is this abuse?",
  exposureTitle: "A safe exposure check",
  locationsTitle: "Where did you find it?",
  addLocation: "Add location",
  reportNow: "Report now",
  documentOnly: "Only document for now",
  talkFirst: "Talk to someone first",
  notNow: "Not now (save and leave)",
  supportDirectory: "Verified support directory (Spain)",
  priorityPlan: "Your priority action plan",
  evidenceTitle: "Evidence, URL first",
  describeOnce: "Describe once",
  disclosureTitle: "Review what will be shared",
  sendSelected: "Send selected",
  followupTitle: "Follow-up & support",
  appearedAgain: "The content appeared again",
  talkSomeone: "Talk to someone",
  noAnswerYet: "No answer yet",
  declined: "Declined",
  quickExitAdvice: "Press Esc twice or use the visible button to leave quickly.",
};

// Spanish translations are intentionally partial: missing keys fall back to English.
// TODO(review-es): Have all Spanish pilot copy reviewed with a Spanish partner.
const es: Partial<Dictionary> = {
  quickExit: "Salida rápida",
  discreetMode: "Modo discreto",
  language: "Idioma",
  english: "Inglés",
  spanish: "Español",
  guidedCase: "Iniciar un caso guiado",
  prepareReport: "Preparar un informe",
  dashboard: "Panel",
  deleteEverything: "Eliminar todo",
  back: "Atrás",
  continue: "Continuar",
  saveLeave: "Guardar y salir",
  verifiedPending: "Pendiente de verificación",
  toBeVerified: "Pendiente de verificar con una organización asociada antes del piloto.",
  rightsTitle: "¿Es esto abuso?",
  exposureTitle: "Comprobación segura",
  locationsTitle: "¿Dónde lo encontraste?",
  addLocation: "Añadir ubicación",
  reportNow: "Denunciar ahora",
  documentOnly: "Solo documentar por ahora",
  talkFirst: "Hablar antes con alguien",
  notNow: "Ahora no (guardar y salir)",
  supportDirectory: "Directorio de apoyo (España)",
  priorityPlan: "Tu plan de acciones prioritario",
  evidenceTitle: "Pruebas: primero los enlaces",
  describeOnce: "Describe una sola vez",
  disclosureTitle: "Revisa qué se compartirá",
  sendSelected: "Enviar seleccionados",
  followupTitle: "Seguimiento y apoyo",
  appearedAgain: "El contenido apareció de nuevo",
  talkSomeone: "Hablar con alguien",
  noAnswerYet: "Sin respuesta todavía",
  declined: "Denegado",
  stageDiscover: "Descubrir y evaluar",
  stageHelp: "Decidir si pedir ayuda",
  stagePathway: "Ruta de denuncia",
  stagePrepare: "Preparar y enviar",
  stageFollowup: "Seguimiento y apoyo",
};

export const LANG_STORAGE_KEY = "rds_language";
export const DISCREET_STORAGE_KEY = "rds_discreet";

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(LANG_STORAGE_KEY) === "es" ? "es" : "en";
}

export function setLanguage(language: Language) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANG_STORAGE_KEY, language);
    window.document.documentElement.lang = language;
    window.dispatchEvent(new CustomEvent("rds-language-change", { detail: language }));
  }
}

export function useT() {
  const [language, setLang] = useState<Language>("en");
  useEffect(() => {
    const current = getLanguage();
    setLang(current);
    document.documentElement.lang = current;
    const onChange = (event: Event) => {
      setLang((event as CustomEvent<Language>).detail);
    };
    window.addEventListener("rds-language-change", onChange);
    return () => window.removeEventListener("rds-language-change", onChange);
  }, []);

  return function t<K extends keyof Dictionary>(key: K): string {
    if (language === "es") return es[key] ?? en[key];
    return en[key];
  };
}

export { en };
