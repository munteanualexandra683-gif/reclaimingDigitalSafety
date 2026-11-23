"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useT } from "@/lib/i18n";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Privacy", href: "/#privacy" },
  { label: "Support", href: "/#support" },
  { label: "Report", href: "/report" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Case", href: "/case" },
];

export default function SiteHeader() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route navigation
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      } border-b border-lavender/60`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-deep-indigo tracking-tight text-lg group"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <span>{t("appName")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isButton =
              link.href === "/report" || link.href === "/dashboard";
            if (isButton) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`ml-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    link.href === "/report"
                      ? "bg-accent text-white hover:bg-accent/90 shadow-sm"
                      : "border border-accent/30 text-accent hover:bg-accent/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-deep-indigo/60 hover:text-accent rounded-lg hover:bg-accent/5 transition-all"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-lavender/40 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-deep-indigo transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-deep-indigo mt-1 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-deep-indigo mt-1 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-lavender shadow-lg animate-fade-in">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((link) => {
              const isInternal =
                link.href === "/report" || link.href === "/dashboard";
              if (isInternal) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      link.href === "/report"
                        ? "bg-accent text-white text-center"
                        : "border border-accent/30 text-accent text-center"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-deep-indigo/70 hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
