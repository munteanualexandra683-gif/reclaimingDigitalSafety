import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Literata } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PersistentDisclaimer from "@/components/PersistentDisclaimer";
import QuickExit from "@/components/QuickExit";
import SkipLink from "@/components/SkipLink";

// next/font downloads these at build time and serves them from this site, so
// no request ever goes to a font provider while someone is using N.E.S.T.
const display = Literata({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const sans = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  // Next.js has no metrics for this (newer) font, so it cannot build a
  // size-matched fallback and logs an error. Name plain fallbacks instead.
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  // Neutral on purpose: the tab title and description are visible in browser
  // history and on shared screens, so they must not reveal what the app is for.
  title: "N.E.S.T.",
  description: "N.E.S.T.: private notes and next steps, kept on your own device.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes
    // to <body> before React loads, and N.E.S.T. changes <html lang> when the
    // language is switched. This only ignores attribute differences on these
    // two elements, not their children.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-paper font-sans text-ink antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <PersistentDisclaimer />
        <QuickExit />
      </body>
    </html>
  );
}
