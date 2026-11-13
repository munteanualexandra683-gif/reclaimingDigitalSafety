"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* ============================================================ */}
      {/* SECTION 1: HERO / WELCOME BANNER                             */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-100/60 via-calm-50/40 to-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        {/* Soft background accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-lavender-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-soft-blue-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-calm-900 sm:text-5xl lg:text-6xl">
            Your safety. <span className="text-accent">Your privacy.</span> Your choice.
          </h1>

          <p className="mt-5 text-xl font-medium text-calm-700 sm:text-2xl">
            Take back control of your digital safety.
          </p>

          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-calm-200/60 bg-white/70 p-6 backdrop-blur-sm text-center shadow-xs">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              You deserve to feel safe online
            </p>
            <p className="mt-2 text-base leading-relaxed text-calm-700">
              If someone has created or shared an intimate image of you
              without your consent, including an AI-generated deepfake, you
              deserve clear information, supportive guidance, and the freedom
              to decide what happens next.
            </p>
          </div>

          {/* Two clear actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/report"
              className="rds-btn-primary w-full text-center sm:w-auto text-base px-8 py-3.5"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Prepare a report
            </Link>

            <a
              href="#begin"
              className="rds-btn-secondary w-full text-center sm:w-auto text-base px-8 py-3.5"
            >
              Explore my options
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-calm-500">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No account or login required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Files never leave your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-sage-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              EU Digital Services Act aligned
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: WHERE WOULD YOU LIKE TO BEGIN?                   */}
      {/* ============================================================ */}
      <section id="begin" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-accent">
            Where Would You Like to Begin?
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-calm-900 sm:text-4xl">
            Not sure what to do next? Start here.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-calm-600 sm:text-lg">
            Every situation is different. Whether you&apos;ve just discovered an
            AI-generated intimate image or have already tried to report it, you
            can explore the options available to you at your own pace.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1: Discovery */}
          <div className="rds-card flex flex-col justify-between border-t-4 border-t-lavender-400 hover:shadow-card-hover">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-100 text-lavender-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-calm-900">
                I&apos;ve discovered an intimate deepfake of myself
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-calm-600">
                Finding an image that was created or shared without your consent
                can be overwhelming. Learn about the first steps you can
                consider, ways to document what happened safely, and where to find
                support.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-calm-100">
              <a
                href="#understanding"
                className="rds-btn-secondary w-full text-center text-sm py-2.5"
              >
                Understand my options
              </a>
            </div>
          </div>

          {/* Card 2: Report */}
          <div className="rds-card flex flex-col justify-between border-t-4 border-t-accent hover:shadow-card-hover relative bg-gradient-to-b from-white to-lavender-50/30">
            <div className="absolute -top-3 right-5 rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold text-white uppercase tracking-wider">
              Recommended
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-calm-900">
                I want to report an image
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-calm-600">
                Not sure which platform or reporting procedure to use? Our guided
                reporting tool helps you identify a pathway and prepare a
                structured notice to review before using an official reporting
                channel.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-calm-100">
              <Link
                href="/report"
                className="rds-btn-primary w-full text-center text-sm py-2.5"
              >
                Prepare a report
              </Link>
            </div>
          </div>

          {/* Card 3: Follow up */}
          <div className="rds-card flex flex-col justify-between border-t-4 border-t-sage-500 hover:shadow-card-hover">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-calm-900">
                I want to follow up on a report
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-calm-600">
                Already taken action? Keep a personal record of your reports,
                important dates, and next steps in one place, without creating an
                online account. All data remains in your browser.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-calm-100">
              <Link
                href="/dashboard"
                className="rds-btn-secondary w-full text-center text-sm py-2.5"
              >
                View my case log
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: UNDERSTANDING AI-GENERATED INTIMATE IMAGE ABUSE   */}
      {/* ============================================================ */}
      <section
        id="understanding"
        className="border-y border-calm-200/60 bg-calm-50/50 py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-calm-200 bg-white p-8 sm:p-12 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-lavender-100 px-3.5 py-1 text-xs font-semibold text-lavender-800">
              Understanding AI-Generated NCII
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">
              Even if it is fake, the harm can still be real.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-calm-700">
              <p>
                <strong>AI-generated non-consensual intimate content</strong>{" "}
                refers to intimate or sexual content created, altered, or
                manipulated using artificial intelligence without consent. This
                may include images, videos, audio recordings, or any other forms
                of digital content that imitate or falsely represent an individual.
              </p>

              <p>
                Such content may appear realistic, even when the depicted events
                never occurred, or the person never participated in them.
                Victims affected by this form of digital abuse may experience
                emotional distress, uncertainty, fear of further distribution,
                and difficulties identifying appropriate reporting channels or
                accessing support.
              </p>

              <div className="my-6 rounded-2xl border-l-4 border-l-accent bg-lavender-50/70 p-5">
                <p className="font-semibold text-calm-900">
                  You have the right to explore your options and seek support.
                </p>
                <p className="mt-1 text-sm text-calm-700">
                  You are not at fault. Whether content is fully synthetic, face-swapped, or generated from public profile pictures, non-consensual manipulation is a violation of your personal dignity and rights.
                </p>
              </div>

              <p className="text-sm text-calm-600">
                <strong>Reclaiming Digital Safety</strong> was developed with a
                particular focus on young women aged 18–24 regardless of race,
                ethnicity, nationality, social background, profession or
                occupation in the European Union — a group identified by
                research and civil society as facing acute risks associated with
                technology-facilitated gender-based violence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: HOW DOES IT WORK? (FOUR-STAGE GUIDED JOURNEY)     */}
      {/* ============================================================ */}
      <section id="how-it-works" className="border-t border-calm-200/60 bg-gradient-to-b from-white to-lavender-50/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-calm-900 sm:text-4xl">
              Four steps. At your own pace.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-calm-600 sm:text-lg">
              Clearer steps, less confusion, and more control. You decide how
              far you want to go—the tool guides you through the reporting process
              without forcing you to take action before you are ready.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stage 1 */}
            <div className="rds-card flex flex-col justify-between border-t-4 border-t-calm-400 hover:shadow-card-hover transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-calm-100 text-sm font-bold text-calm-800">
                    01
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-calm-400">
                    Stage 1
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-calm-900">
                  Discover &amp; Assess
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-calm-600">
                  Identify where harmful content appears and understand your
                  options in a safe, non-judgmental space without pressure.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-calm-100 text-xs font-medium text-calm-500">
                Explore platform policies
              </div>
            </div>

            {/* Stage 2 */}
            <div className="rds-card flex flex-col justify-between border-t-4 border-t-lavender-500 hover:shadow-card-hover transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lavender-100 text-sm font-bold text-lavender-800">
                    02
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-lavender-600">
                    Stage 2
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-calm-900">
                  Document Privately
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-calm-600">
                  Create a cryptographic SHA-256 fingerprint on your device to
                  prove file integrity. Your original image is never uploaded.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-calm-100 text-xs font-medium text-lavender-700">
                In-browser cryptography
              </div>
            </div>

            {/* Stage 3 */}
            <div className="rds-card flex flex-col justify-between border-t-4 border-t-accent hover:shadow-card-hover transition-all bg-gradient-to-b from-white to-lavender-50/20">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent">
                    03
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                    Stage 3
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-calm-900">
                  Prepare a DSA Notice
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-calm-600">
                  Auto-generate a standardized Article 16 notice under the EU
                  Digital Services Act, with full freedom to review and edit.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-calm-100 text-xs font-medium text-accent">
                EU Regulation 2022/2065
              </div>
            </div>

            {/* Stage 4 */}
            <div className="rds-card flex flex-col justify-between border-t-4 border-t-sage-500 hover:shadow-card-hover transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100 text-sm font-bold text-sage-800">
                    04
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-sage-600">
                    Stage 4
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-calm-900">
                  Follow-up &amp; Sync
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-calm-600">
                  Keep notes and track status in your private browser log, with
                  encrypted QR code sync to transfer records directly to your phone.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-calm-100 text-xs font-medium text-sage-700">
                Peer-to-peer encrypted sync
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: YOUR PRIVACY MATTERS                              */}
      {/* Reassuring pale blue layout with 2x2 high-impact pillars     */}
      {/* ============================================================ */}
      <section
        id="privacy"
        className="border-y border-soft-blue-200 bg-pale-blue py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-soft-blue-300 bg-white px-3.5 py-1 text-xs font-semibold text-calm-700 shadow-sm">
              <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Zero-Knowledge Architecture
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-calm-900 sm:text-4xl">
              Your evidence. Your information. Your control.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-calm-700 sm:text-lg">
              Privacy is a central part of Reclaiming Digital Safety. Someone
              dealing with digital abuse should never have to expose sensitive data
              to another third-party service just to understand their reporting options.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Pillar 1 */}
            <div className="flex gap-4 rounded-2xl border border-soft-blue-200/90 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-soft-blue-100 text-calm-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-calm-900">
                  Your evidence stays strictly on your device
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-calm-600 sm:text-sm">
                  The tool generates a cryptographic fingerprint (SHA-256) of an image
                  within your browser memory. The original photo is{" "}
                  <strong>never uploaded, ingested, or transmitted</strong> to our system
                  or any cloud server.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4 rounded-2xl border border-soft-blue-200/90 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-soft-blue-100 text-calm-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-calm-900">
                  No accounts, passwords, or telemetry
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-calm-600 sm:text-sm">
                  You do not need to register, verify an email, or create a personal
                  profile. We collect zero tracking telemetry, meaning there are no
                  passwords or account databases that could ever be compromised.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4 rounded-2xl border border-soft-blue-200/90 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-soft-blue-100 text-calm-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-calm-900">
                  Private case log with peer-to-peer sync
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-calm-600 sm:text-sm">
                  Your reporting history and notes are saved exclusively in your browser&apos;s
                  local storage. You can transfer them directly to your phone via an encrypted
                  QR code without passing through any intermediate server.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex gap-4 rounded-2xl border border-soft-blue-200/90 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-soft-blue-100 text-calm-800">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-calm-900">
                  Full survivor sovereignty
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-calm-600 sm:text-sm">
                  You can prepare, inspect, and customize all information without
                  committing to a platform submission. Nothing is ever submitted to
                  external channels without your explicit, deliberate choice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: ABOUT & TRUSTED FLAGGER VISION                    */}
      {/* ============================================================ */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-calm-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-lavender-100 px-3.5 py-1 text-xs font-semibold text-lavender-800">
            About Our Mission &amp; Vision
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-calm-900">
            About Reclaiming Digital Safety
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-calm-700">
            <p>
              <strong>Reclaiming Digital Safety</strong> was developed with the
              goal of improving how people affected by AI-generated
              non-consensual intimate imagery navigate reporting procedures.
            </p>

            <p>
              We focus on women aged 18–24 across the European Union and explore
              how a privacy-preserving digital solution could reduce the time,
              uncertainty, and repeated effort associated with reporting
              intimate-image abuse.
            </p>

            <p>
              Our mission is to simplify this process through a
              privacy-preserving, survivor-centred digital solution that connects
              evidence documentation, reporting guidance, takedown notice
              preparation, and follow-up tools in one accessible environment.
            </p>

            <div className="mt-8 rounded-2xl bg-calm-50 p-6 border border-calm-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-calm-500">
                Global Impact &amp; Alignment
              </h4>
              <p className="mt-2 text-sm text-calm-700">
                The project contributes to the ambitions of the{" "}
                <strong>United Nations Sustainable Development Goals</strong>:
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-white p-3 text-center border border-calm-200/60 shadow-xs">
                  <span className="block text-lg font-bold text-calm-800">SDG 3</span>
                  <span className="text-xs text-calm-600">Good Health &amp; Well-being</span>
                </div>
                <div className="rounded-xl bg-white p-3 text-center border border-calm-200/60 shadow-xs">
                  <span className="block text-lg font-bold text-calm-800">SDG 5</span>
                  <span className="text-xs text-calm-600">Gender Equality</span>
                </div>
                <div className="rounded-xl bg-white p-3 text-center border border-calm-200/60 shadow-xs">
                  <span className="block text-lg font-bold text-calm-800">SDG 10</span>
                  <span className="text-xs text-calm-600">Reduced Inequalities</span>
                </div>
                <div className="rounded-xl bg-white p-3 text-center border border-calm-200/60 shadow-xs">
                  <span className="block text-lg font-bold text-calm-800">SDG 16</span>
                  <span className="text-xs text-calm-600">Peace, Justice &amp; Strong Institutions</span>
                </div>
              </div>
            </div>

            {/* Long term vision: Trusted Flagger */}
            <div className="mt-10 border-t border-calm-200 pt-8">
              <h3 className="text-xl font-bold text-calm-900">
                Our Long-Term Vision: Becoming a Trusted Flagger
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-calm-700">
                Our ambition goes beyond developing a functional reporting
                platform. In the long term, we aspire to build the expertise,
                partnerships, and organizational capacity needed to apply for
                official <strong>Trusted Flagger status</strong> under{" "}
                <strong>Article 22 of the European Union&apos;s Digital Services Act (DSA)</strong>.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-calm-200/80 bg-lavender-50/40 p-4">
                  <p className="text-xs font-semibold text-calm-900">
                    1. Rigorous Technology
                  </p>
                  <p className="mt-1 text-xs text-calm-600">
                    Develop and evaluate our privacy-preserving reporting technology to the highest security standards.
                  </p>
                </div>
                <div className="rounded-xl border border-calm-200/80 bg-lavender-50/40 p-4">
                  <p className="text-xs font-semibold text-calm-900">
                    2. Cross-Sector Alliances
                  </p>
                  <p className="mt-1 text-xs text-calm-600">
                    Build partnerships with victim-support organizations, legal experts, researchers, and digital rights initiatives.
                  </p>
                </div>
                <div className="rounded-xl border border-calm-200/80 bg-lavender-50/40 p-4">
                  <p className="text-xs font-semibold text-calm-900">
                    3. Designated Independence
                  </p>
                  <p className="mt-1 text-xs text-calm-600">
                    Establish the specialized expertise, independence, and reliable reporting procedures required for designation.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs italic text-calm-500">
                * Note: Trusted Flagger status is granted by the relevant national
                Digital Services Coordinator following an assessment of
                eligibility. It does not guarantee content removal, and
                Reclaiming Digital Safety does not currently hold this status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS (FAQ)                  */}
      {/* ============================================================ */}
      <section id="faq" className="border-t border-calm-200/60 bg-calm-50/40 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Clarification &amp; Answers
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-calm-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-calm-600">
              Everything you need to know about our privacy architecture, reporting mechanisms, and legal scope.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {[
              {
                q: "Does my image or video ever get uploaded to your servers?",
                a: "Never. The application uses the standard Web Crypto API (SubtleCrypto.digest) entirely within your browser memory. We compute a cryptographic fingerprint (SHA-256) locally. The raw media file never touches our infrastructure, and we maintain zero servers or databases.",
              },
              {
                q: "Do I have to use my legal name when preparing a report?",
                a: "No. You can use your legal name, a pseudonym, or leave it anonymous depending on platform requirements. Under Article 16 of the Digital Services Act, you are entitled to submit notices without disclosing identifying details if you reasonably believe it concerns non-consensual sexual content.",
              },
              {
                q: "Does preparing a notice guarantee that the content will be taken down?",
                a: "No digital tool can guarantee that an external platform will remove content. However, formatting your notice according to Article 16 of the EU Digital Services Act legally obligates platforms to acknowledge receipt, process the notice without undue delay, and provide a reasoned decision.",
              },
              {
                q: "Can I use this if I am outside the European Union?",
                a: "Yes. While the notice template is structured around the European Union Digital Services Act (Regulation EU 2022/2065), most major global platforms apply these standard notice procedures worldwide, and the local evidence hashing works anywhere in modern web browsers.",
              },
              {
                q: "How does the 'Sync to Phone' QR feature work without a cloud account?",
                a: "When you choose to sync, your local browser case log is encrypted with a passphrase using AES-GCM cryptography and encoded directly into an offline QR code. When you scan it with your other device, the data transfers peer-to-peer without ever being stored on any intermediary server.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-calm-200 bg-white transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between p-5 text-left font-medium text-calm-900 transition-colors hover:bg-calm-50/50"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-base">{faq.q}</span>
                  <span className="ml-4 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-calm-100 text-calm-700">
                    <svg
                      className={`h-4 w-4 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-calm-100 bg-calm-50/30 px-5 py-4 text-sm leading-relaxed text-calm-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 9: HUMAN SUPPORT & RESOURCES                         */}
      {/* Warmer background tone, approachable help categories        */}
      {/* Practical reporting tools and human support complement each  */}
      {/* ============================================================ */}
      <section
        id="support"
        className="border-y border-warm-200 bg-warm-50 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-warm-700">
              Care &amp; Guidance
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-calm-900 sm:text-4xl">
              You don&apos;t have to navigate this alone.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-calm-700 sm:text-lg">
              Practical reporting tools and human support complement each other.
              While this tool helps with notices and documentation, trained
              advocates, counselors, and helplines are available to listen,
              support your well-being, and guide you through legal steps.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Category 1: Crisis & Helplines */}
            <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-peach text-warm-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-calm-900">
                  Helplines &amp; Crisis Services
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-calm-600">
                  Free, confidential support across the EU. Contact <strong>116 006</strong> (Victims of Crime) or <strong>116 016</strong> (Helpline for Women) in member states.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-warm-100">
                <a
                  href="https://victim-support.eu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rds-btn-warm w-full text-center text-xs"
                >
                  <span>Victim Support Europe</span>
                  <svg className="ml-1.5 h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Category 2: Specialized NCII Initiatives */}
            <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-peach text-warm-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8 8 0 008 8m0 0a8 8 0 006-2.684" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-calm-900">
                  StopNCII &amp; Take It Down
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-calm-600">
                  Non-profit technologies creating proactive hash-sharing to block non-consensual images from being posted on participating tech platforms.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-warm-100">
                <a
                  href="https://stopncii.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rds-btn-warm w-full text-center text-xs"
                >
                  <span>Visit StopNCII.org</span>
                  <svg className="ml-1.5 h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Category 3: Legal & Digital Rights */}
            <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-peach text-warm-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-calm-900">
                  Legal &amp; Privacy Rights
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-calm-600">
                  European Digital Rights (EDRi) and Cyber Civil Rights Initiative (CCRI) provide legal guides and advocates who defend personal privacy online.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-warm-100">
                <a
                  href="https://edri.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rds-btn-warm w-full text-center text-xs"
                >
                  <span>Explore EDRi Network</span>
                  <svg className="ml-1.5 h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Category 4: Peer & Emotional Support */}
            <div className="rounded-2xl border border-warm-200 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-warm-peach text-warm-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-semibold text-calm-900">
                  Emotional Support &amp; Well-being
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-calm-600">
                  Technological abuse causes genuine psychological harm. Consider speaking with a trauma-informed therapist or trusted confidential peer.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-warm-100">
                <a
                  href="https://www.mentalhealtheurope.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rds-btn-warm w-full text-center text-xs"
                >
                  <span>Mental Health Europe</span>
                  <svg className="ml-1.5 h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 10: CLOSING MESSAGE & CALL TO ACTION                */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-white via-lavender-50/50 to-lavender-100/60 py-24 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-calm-900 sm:text-4xl lg:text-5xl">
            Your next step belongs to you.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-calm-700 sm:text-lg">
            You deserve clear information, privacy, and support when responding
            to digital sexual violence. Whether you want to explore your
            options, prepare a report, or simply understand how the process
            works, you can begin at your own pace.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#begin"
              className="rds-btn-primary w-full sm:w-auto text-base px-8 py-3.5"
            >
              Explore my options
            </a>

            <a
              href="#support"
              className="rds-btn-secondary w-full sm:w-auto text-base px-8 py-3.5"
            >
              Find support
            </a>
          </div>

          <p className="mt-8 text-xs text-calm-500">
            Reclaiming Digital Safety · Zero-Knowledge · Privacy First · Open Source
          </p>
        </div>
      </section>
    </div>
  );
}
