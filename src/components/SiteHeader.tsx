"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/report", label: "Prepare a report" },
  { href: "/dashboard", label: "My case log" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-calm-200 bg-calm-50/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-calm-400 to-lavender-400 text-white shadow-soft"
          >
            {/* shield glyph */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l7 3v5c0 4.5-3 8.2-7 9-4-0.8-7-4.5-7-9V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-semibold leading-tight text-calm-800">
            Reclaiming
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Digital Safety
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 font-medium transition-colors ${
                  active
                    ? "bg-white text-calm-700 shadow-card"
                    : "text-calm-600 hover:bg-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
