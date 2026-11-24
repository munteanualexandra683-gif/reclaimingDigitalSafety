"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setLanguage, useLanguage, useT, type Language, type TKey } from "@/lib/i18n";
import { useHasSavedCase } from "@/lib/useSavedCase";

const NAV_LINKS: { label: TKey; href: string; primary?: boolean }[] = [
  { label: "startCase", href: "/case", primary: true },
  { label: "navCaseLog", href: "/dashboard" },
  { label: "navSupport", href: "/#support" },
  { label: "navPrivacy", href: "/#privacy" },
];

/** A closed exercise book: neutral on a shared screen. */
function Logo() {
  return (
    <svg aria-hidden width="22" height="26" viewBox="0 0 22 26" fill="none" className="flex-none">
      <rect x="1" y="1" width="20" height="24" rx="2.5" fill="#fff" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 1.8v22.4" stroke="#B84F68" strokeWidth="1.6" />
      <path d="M10 8h7M10 12h7M10 16h4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export default function SiteHeader() {
  const t = useT();
  const language = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hasCase = useHasSavedCase();
  const label = (link: (typeof NAV_LINKS)[number]) =>
    link.primary && hasCase ? t("continueCase") : t(link.label);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the route changes.
  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isCurrent = (href: string) => !href.includes("#") && pathname?.replace(/\/$/, "") === href;

  const settings = (idSuffix: string) => (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={`language-${idSuffix}`}>{t("language")}</label>
      <select
        id={`language-${idSuffix}`}
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="rounded-full border border-calm-300 bg-white px-3 py-1.5 text-sm text-calm-800 hover:border-calm-500"
      >
        <option value="en" lang="en">{t("english")}</option>
        <option value="es" lang="es">{t("spanish")}</option>
      </select>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-calm-200 bg-paper/95 backdrop-blur" : "border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-wide text-ink">
          <Logo />
          <span>{t("appName")}</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-4 lg:flex">
          <nav aria-label={t("navLabel")} className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={
                  link.primary
                    ? "ml-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
                    : `rounded-full px-3 py-2 text-sm font-semibold text-calm-800 hover:text-accent`
                }
              >
                {!link.primary && isCurrent(link.href) ? <span className="nest-highlight">{label(link)}</span> : label(link)}
              </Link>
            ))}
          </nav>
          {settings("desktop")}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 items-center gap-2 rounded-full border border-calm-300 bg-white px-4 text-sm font-semibold text-ink hover:border-calm-500 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {t("navMenu")}
          <span aria-hidden className="flex flex-col">
            <span className={`block h-0.5 w-5 bg-ink transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`mt-1 block h-0.5 w-5 bg-ink transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`mt-1 block h-0.5 w-5 bg-ink transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="absolute left-0 right-0 top-full border-b border-calm-200 bg-paper shadow-lift lg:hidden">
          <nav aria-label={t("navLabel")} className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={
                  link.primary
                    ? "rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
                    : "rounded-lg px-4 py-3 text-sm font-semibold text-calm-800 hover:bg-white"
                }
              >
                {!link.primary && isCurrent(link.href) ? <span className="nest-highlight">{label(link)}</span> : label(link)}
              </Link>
            ))}
          </nav>
          <div className="border-t border-calm-200 px-4 py-4">{settings("mobile")}</div>
        </div>
      )}
    </header>
  );
}
