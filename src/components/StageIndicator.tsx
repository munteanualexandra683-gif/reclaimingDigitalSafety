"use client";

import { useT, type TKey } from "@/lib/i18n";

export type StageKey = "discover" | "help" | "pathway" | "preparation" | "followup";

/** Stage names come from the dictionary, so they match the home page and headings. */
const STAGES: { key: StageKey; label: TKey }[] = [
  { key: "discover", label: "stageDiscover" },
  { key: "help", label: "stageHelp" },
  { key: "pathway", label: "stagePathway" },
  { key: "preparation", label: "stagePrepare" },
  { key: "followup", label: "stageFollowup" },
];

function Tick() {
  return (
    <svg aria-hidden className="h-3.5 w-4" viewBox="0 0 20 16" fill="none">
      <path d="M2 9.2c1.6 1.2 3 2.7 4.2 4.6C9 8.6 12.8 4.5 18 1.8" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StageIndicator({ current }: { current: StageKey }) {
  const t = useT();
  const currentIndex = STAGES.findIndex((s) => s.key === current);

  return (
    <div className="mb-8 border-b border-calm-200 pb-5">
      {/* Phones: one line plus five squares of the notebook grid */}
      <div className="sm:hidden" aria-hidden>
        <p className="text-sm font-semibold text-calm-700">
          {t("stageOf", { current: currentIndex + 1, total: STAGES.length })}
          <br />
          <span className="nest-highlight text-base text-ink">{t(STAGES[currentIndex].label)}</span>
        </p>
        <div className="mt-3 flex gap-1">
          {STAGES.map((stage, i) => (
            <span
              key={stage.key}
              className={`h-2.5 flex-1 rounded-[2px] border ${
                i < currentIndex
                  ? "border-ink bg-ink"
                  : i === currentIndex
                    ? "border-ink bg-highlight"
                    : "border-calm-300 bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Larger screens (and screen readers on every screen): the full list */}
      <ol aria-label={t("progressLabel")} className="sr-only sm:not-sr-only sm:grid sm:grid-cols-5 sm:gap-3">
        {STAGES.map((stage, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li
              key={stage.key}
              aria-current={active ? "step" : undefined}
              className={`border-t-2 pt-2 ${active ? "border-ink" : done ? "border-sage-700" : "border-calm-200"}`}
            >
              <span className="flex items-baseline gap-1.5">
                <span
                  className={`font-display text-lg leading-none ${
                    active ? "text-ink" : done ? "text-sage-700" : "text-calm-500"
                  }`}
                >
                  {done ? <Tick /> : i + 1}
                </span>
                <span
                  className={`text-[0.8125rem] leading-snug ${
                    active ? "font-semibold text-ink" : done ? "text-sage-700" : "text-calm-600"
                  }`}
                >
                  {active ? <span className="nest-highlight">{t(stage.label)}</span> : t(stage.label)}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
