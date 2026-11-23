"use client";

import Link from "next/link";
import { useT, type TKey } from "@/lib/i18n";

const FOOTER_LINKS: { label: TKey; href: string }[] = [
  { label: "footerHome", href: "/" },
  { label: "footerHow", href: "/#how-it-works" },
  { label: "navPrivacy", href: "/#privacy" },
  { label: "navSupport", href: "/#support" },
  { label: "footerQuestions", href: "/#faq" },
];

export default function SiteFooter() {
  const t = useT();
  return (
    <footer className="border-t border-calm-200/80 bg-white pb-28 pt-10 text-calm-700">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <Link href="/" className="text-lg font-bold tracking-tight text-calm-900">
            {t("appName")}
          </Link>
          <p className="mt-2 text-sm text-calm-700">{t("footerTagline")}</p>
          <p className="mt-2 text-xs text-calm-600">{t("footerDisclaimer")}</p>
        </div>
        <nav aria-label={t("footerNavLabel")}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-calm-800 hover:text-accent">
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
