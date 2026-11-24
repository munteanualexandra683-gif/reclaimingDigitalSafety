"use client";

import { useEffect, useState } from "react";
import { CASES_CHANGED_EVENT, caseHasContent, loadCases } from "@/lib/storage";

/**
 * Whether this browser holds a saved case with something in it. Used to label
 * the main button "Continue my case" instead of "Get started".
 */
export function useHasSavedCase(): boolean {
  const [hasCase, setHasCase] = useState(false);

  useEffect(() => {
    const check = () => setHasCase(loadCases().some(caseHasContent));
    check();
    window.addEventListener(CASES_CHANGED_EVENT, check);
    window.addEventListener("storage", check); // changes from another tab
    return () => {
      window.removeEventListener(CASES_CHANGED_EVENT, check);
      window.removeEventListener("storage", check);
    };
  }, []);

  return hasCase;
}
