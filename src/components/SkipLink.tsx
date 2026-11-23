"use client";

import { useT } from "@/lib/i18n";

export default function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-accent focus:shadow-card focus:ring-2 focus:ring-accent"
    >
      {t("skipToContent")}
    </a>
  );
}
