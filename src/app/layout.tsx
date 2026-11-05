import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PersistentDisclaimer from "@/components/PersistentDisclaimer";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reclaiming Digital Safety",
  description:
    "A privacy-preserving digital navigator that helps you prepare, submit, and track takedown reports for non-consensual intimate imagery — entirely on your own device.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-calm-700 focus:shadow-card"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-5xl px-4 pb-32 pt-8 sm:px-6">
          {children}
        </main>
        <PersistentDisclaimer />
      </body>
    </html>
  );
}
