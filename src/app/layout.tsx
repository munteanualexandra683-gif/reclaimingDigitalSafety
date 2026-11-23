import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PersistentDisclaimer from "@/components/PersistentDisclaimer";
import QuickExit from "@/components/QuickExit";

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
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-deep-indigo antialiased selection:bg-lavender-200 selection:text-deep-indigo">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-accent focus:shadow-card focus:ring-2 focus:ring-accent"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">
          {children}
        </main>
        <SiteFooter />
        <PersistentDisclaimer />
        <QuickExit />
      </body>
    </html>
  );
}
