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

function Logo() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    </span>
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
        className="rounded-lg border border-calm-200 bg-white px-2 py-1.5 text-sm text-calm-800"
      >
        <option value="en" lang="en">{t("english")}</option>
        <option value="es" lang="es">{t("spanish")}</option>
      </select>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b border-lavender/60 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-sm backdrop-blur-lg" : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-deep-indigo">
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
                    ? "ml-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-hover"
                    : `rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent/5 hover:text-accent ${
                        isCurrent(link.href) ? "text-accent underline underline-offset-4" : "text-calm-800"
                      }`
                }
              >
                {label(link)}
              </Link>
            ))}
          </nav>
          {settings("desktop")}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-deep-indigo hover:bg-lavender/40 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {t("navMenu")}
          <span aria-hidden className="flex flex-col">
            <span className={`block h-0.5 w-5 bg-deep-indigo transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`mt-1 block h-0.5 w-5 bg-deep-indigo transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`mt-1 block h-0.5 w-5 bg-deep-indigo transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="absolute left-0 right-0 top-full border-b border-lavender bg-white shadow-lg lg:hidden">
          <nav aria-label={t("navLabel")} className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={
                  link.primary
                    ? "rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-white"
                    : "rounded-lg px-4 py-3 text-sm font-medium text-calm-800 hover:bg-accent/5"
                }
              >
                {label(link)}
              </Link>
            ))}
          </nav>
          <div className="border-t border-calm-100 px-4 py-4">{settings("mobile")}</div>
        </div>
      )}
    </header>
  );
}
