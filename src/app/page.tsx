"use client";

import Link from "next/link";
import HeroNest from "@/components/HeroNest";
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

/** A pen tick, slightly uneven, like one made by hand. */
function Tick() {
  return (
    <svg aria-hidden className="mt-1 h-4 w-5 flex-none text-sage-700" viewBox="0 0 20 16" fill="none">
      <path d="M2 9.2c1.6 1.2 3 2.7 4.2 4.6C9 8.6 12.8 4.5 18 1.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Shared column. On larger screens the writing area starts after a 6rem margin. */
const COLUMN = "mx-auto max-w-4xl px-4 sm:px-6";

export default function HomePage() {
  const t = useT();
  const hasCase = useHasSavedCase();

  return (
    <div className="w-full">
      {/* 1. One message, one action, and the woven nest beside it */}
      <section className="overflow-hidden border-b border-calm-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_26rem]">
          <div className="relative z-10 py-14 sm:py-24 lg:pl-10">
            <p className="mb-3 flex flex-wrap items-center gap-x-2 text-xs font-semibold tracking-wider text-calm-600 sm:text-sm">
              <span className="font-display font-semibold tracking-normal text-ink">N.E.S.T.</span>
              <span className="text-calm-400" aria-hidden>·</span>
              <span className="font-normal text-calm-600">{t("appTagline")}</span>
            </p>
            <h1 className="max-w-[14ch] text-[2.5rem] font-medium leading-[1.08] text-ink sm:text-[4rem]">
              {t("homeHeroTitle")}
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-calm-700">
              {t("homeHeroText")}
            </p>
            <div className="mt-9 flex flex-col items-start gap-5">
              <Link href="/case" className="rds-btn-primary w-full px-8 py-3.5 text-base sm:w-auto">
                {hasCase ? t("continueCase") : t("startCase")}
              </Link>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] font-semibold">
                <Link href="/dashboard" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {t("homeAlreadyReported")}
                </Link>
                <a href="#support" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                  {t("homeTalkFirst")}
                </a>
              </div>
              <p className="max-w-[34rem] text-sm leading-relaxed text-calm-700">{t("quickExitExplain")}</p>
            </div>
          </div>
          <HeroNest className="-mt-4 mb-10 w-full max-w-[22rem] justify-self-center lg:my-0 lg:max-w-none" />
        </div>
      </section>

      {/* 2. Not your fault: a note beside the rose margin line */}
      <section className={`${COLUMN} py-14`}>
        <div className="border-l-2 border-margin pl-5 sm:ml-[3.5rem] sm:pl-10">
          <h2 className="text-2xl text-ink sm:text-[1.75rem]">{t("homeFaultTitle")}</h2>
          <p className="mt-3 max-w-[38rem] text-base leading-relaxed text-calm-700">{t("homeFaultText")}</p>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-accent">{t("homeFaultMoreTitle")}</summary>
            <p className="mt-2 max-w-[38rem] text-sm leading-relaxed text-calm-700">{t("homeFaultMoreText")}</p>
          </details>
        </div>
      </section>

      {/* 3. How it works: a real sequence, numbered in the margin */}
      <section id="how-it-works" className="border-y border-calm-200 bg-white py-14 sm:py-20">
        <div className={COLUMN}>
          <div className="sm:pl-24">
            <h2 className="text-[1.75rem] text-ink sm:text-4xl">{t("homeHowTitle")}</h2>
            <p className="mt-2 text-base text-calm-700">{t("homeHowText")}</p>
          </div>
          <ol className="mt-10 border-t border-grid">
            {HOW_STEPS.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] border-b border-grid sm:grid-cols-[6rem_1fr]">
                <span
                  aria-hidden
                  className="border-r-2 border-margin/50 pr-3 pt-5 text-right font-display text-2xl leading-none text-calm-500 sm:pr-8 sm:text-3xl"
                >
                  {i + 1}
                </span>
                <div className="py-5 pl-4 sm:pl-8">
                  <h3 className="font-semibold text-ink">{t(step.title)}</h3>
                  <p className="mt-1 max-w-[36rem] text-[0.95rem] leading-relaxed text-calm-700">{t(step.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Privacy in plain words */}
      <section id="privacy" className={`${COLUMN} py-14 sm:py-20`}>
        <div className="sm:pl-24">
          <h2 className="text-[1.75rem] text-ink sm:text-4xl">{t("homePrivacyTitle")}</h2>
          <ul className="mt-6 flex max-w-[38rem] flex-col gap-3 text-base text-calm-800">
            {(["homePrivacyNoAccount", "homePrivacyLocal", "homePrivacyChoice"] as TKey[]).map((key) => (
              <li key={key} className="flex gap-3">
                <Tick />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[38rem] border-l-2 border-margin pl-4 text-sm leading-relaxed text-calm-700">
            {t("homePrivacySharedDevice")}
          </p>
          <details className="mt-5">
            <summary className="cursor-pointer text-sm font-semibold text-accent">{t("homePrivacyTechTitle")}</summary>
            <p className="mt-2 max-w-[38rem] text-sm leading-relaxed text-calm-700">{t("homePrivacyTechText")}</p>
          </details>
        </div>
      </section>

      {/* 5. Support */}
      <section id="support" className="border-y border-calm-200 bg-sand-100 py-14 sm:py-20">
        <div className={COLUMN}>
          <div className="sm:pl-24">
            <h2 className="text-[1.75rem] text-ink sm:text-4xl">{t("homeSupportTitle")}</h2>
            <p className="mt-2 max-w-[38rem] text-base text-calm-700">{t("homeSupportText")}</p>
            <div className="mt-8">
              <SupportDirectory />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Questions: ruled lines, no boxes */}
      <section id="faq" className={`${COLUMN} py-14 sm:py-20`}>
        <div className="sm:pl-24">
          <h2 className="text-[1.75rem] text-ink sm:text-4xl">{t("homeFaqTitle")}</h2>
          <div className="mt-6 border-t border-calm-300">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-calm-300">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-ink hover:no-underline [&::-webkit-details-marker]:hidden">
                  <span>{t(item.q)}</span>
                  <span aria-hidden className="flex h-6 w-6 flex-none items-center justify-center text-xl leading-none text-accent">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="max-w-[38rem] pb-5 text-[0.95rem] leading-relaxed text-calm-700">
                  <p>{t(item.a)}</p>
                  {item.verify && <p className="mt-2 text-sm text-lavender-800">{t("toBeVerified")}</p>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
