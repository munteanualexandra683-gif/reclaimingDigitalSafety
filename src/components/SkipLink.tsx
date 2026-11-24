"use client";

import { useT } from "@/lib/i18n";

export default function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:font-semibold focus:text-accent focus:shadow-lift focus:ring-2 focus:ring-accent"
    >
      {t("skipToContent")}
    </a>
  );
}
