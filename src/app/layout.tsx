import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PersistentDisclaimer from "@/components/PersistentDisclaimer";
import QuickExit from "@/components/QuickExit";
import SkipLink from "@/components/SkipLink";

export const metadata: Metadata = {
  // Neutral on purpose: the tab title and description are visible in browser
  // history and on shared screens, so they must not reveal what the app is for.
  title: "NEST",
  description: "NEST: private notes and next steps, kept on your own device.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: browser extensions (e.g. Grammarly) add attributes
    // to <body> before React loads, and NEST changes <html lang> when the
    // language is switched. This only ignores attribute differences on these
    // two elements, not their children.
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-white font-sans text-deep-indigo antialiased selection:bg-lavender-200 selection:text-deep-indigo">
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
