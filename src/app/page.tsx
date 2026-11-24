"use client";

import Link from "next/link";
import SupportDirectory from "@/components/SupportDirectory";
import { useT, type TKey } from "@/lib/i18n";
import { useHasSavedCase } from "@/lib/useSavedCase";

const HOW_STEPS: { title: TKey; text: TKey }[] = [
  { title: "stageDiscover", text: "homeHowDiscover" },
  { title: "stageHelp", text: "homeHowHelp" },
  { title: "stagePathway", text: "homeHowPathway" },
  { title: "stagePrepare", text: "homeHowPrepare" },
  { title: "stageFollowup", text: "homeHowFollowup" },
];

const FAQ: { q: TKey; a: TKey; verify?: boolean }[] = [
  { q: "homeFaqUploadQ", a: "homeFaqUploadA" },
  { q: "homeFaqRemovalQ", a: "homeFaqRemovalA", verify: true },
  { q: "homeFaqNameQ", a: "homeFaqNameA", verify: true },
  { q: "homeFaqPauseQ", a: "homeFaqPauseA" },
];

function CheckIcon() {
  return (
    <svg aria-hidden className="mt-0.5 h-5 w-5 flex-none text-sage-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

export default function HomePage() {
  const t = useT();
  const hasCase = useHasSavedCase();

  return (
    <div className="w-full">
      {/* 1. Hero: one message, one primary action */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-100/60 via-calm-50/40 to-white pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-lavender-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-calm-900 sm:text-5xl">
            {t("homeHeroTitle")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-calm-700 sm:text-lg">
            {t("homeHeroText")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link href="/case" className="rds-btn-primary w-full px-8 py-3.5 text-base sm:w-auto">
              {hasCase ? t("continueCase") : t("startCase")}
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <Link href="/dashboard" className="text-accent underline underline-offset-4">
                {t("homeAlreadyReported")}
              </Link>
              <a href="#support" className="text-accent underline underline-offset-4">
                {t("homeTalkFirst")}
              </a>
            </div>
            <p className="mx-auto max-w-xl text-sm text-calm-700">{t("quickExitExplain")}</p>
          </div>
        </div>
      </section>

      {/* 2. Not your fault */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border-l-4 border-l-accent bg-lavender-50/70 p-6">
          <h2 className="text-xl font-bold text-calm-900 sm:text-2xl">{t("homeFaultTitle")}</h2>
          <p className="mt-2 text-base leading-relaxed text-calm-700">{t("homeFaultText")}</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-accent">
              {t("homeFaultMoreTitle")}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-calm-700">{t("homeFaultMoreText")}</p>
          </details>
        </div>
      </section>

      {/* 3. How it works: the five stages */}
      <section id="how-it-works" className="border-y border-calm-200/60 bg-calm-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">{t("homeHowTitle")}</h2>
          <p className="mt-2 text-base text-calm-700">{t("homeHowText")}</p>
          <ol className="mt-8 flex flex-col gap-3">
            {HOW_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-calm-200 bg-white p-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-lavender-100 text-sm font-bold text-lavender-800">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-calm-900">{t(step.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-calm-700">{t(step.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Privacy in plain words */}
      <section id="privacy" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">{t("homePrivacyTitle")}</h2>
        <ul className="mt-6 flex flex-col gap-3 text-base text-calm-800">
          {(["homePrivacyNoAccount", "homePrivacyLocal", "homePrivacyChoice"] as TKey[]).map((key) => (
            <li key={key} className="flex gap-3">
              <CheckIcon />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-xl border border-sand-200 bg-sand-50 p-4 text-sm text-calm-700">
          {t("homePrivacySharedDevice")}
        </p>
        <details className="mt-4">
          <summary className="cursor-pointer text-sm font-medium text-accent">{t("homePrivacyTechTitle")}</summary>
          <p className="mt-2 text-sm leading-relaxed text-calm-700">{t("homePrivacyTechText")}</p>
        </details>
      </section>

      {/* 5. Support */}
      <section id="support" className="border-y border-warm-200 bg-warm-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">{t("homeSupportTitle")}</h2>
          <p className="mt-2 text-base text-calm-700">{t("homeSupportText")}</p>
          <div className="mt-8">
            <SupportDirectory />
          </div>
        </div>
      </section>

      {/* 6. Questions */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight text-calm-900 sm:text-3xl">{t("homeFaqTitle")}</h2>
        <div className="mt-6 flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-calm-200 bg-white">
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-calm-900">
                <span>{t(item.q)}</span>
                <svg aria-hidden className="h-4 w-4 flex-none transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-calm-100 px-5 py-4 text-sm leading-relaxed text-calm-700">
                <p>{t(item.a)}</p>
                {item.verify && <p className="mt-2 text-xs text-lavender-800">{t("toBeVerified")}</p>}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
