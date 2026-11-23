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

export default function StageIndicator({ current }: { current: StageKey }) {
  const t = useT();
  const currentIndex = STAGES.findIndex((s) => s.key === current);

  return (
    <div className="mb-6">
      {/* Phones: one compact line plus a progress bar */}
      <div className="sm:hidden" aria-hidden>
        <p className="text-sm font-medium text-calm-700">
          {t("stageOf", { current: currentIndex + 1, total: STAGES.length })}
        </p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-calm-100">
          <div
            className="h-1.5 rounded-full bg-accent transition-all"
            style={{ width: `${((currentIndex + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Larger screens (and screen readers on every screen): the full list */}
      <ol aria-label={t("progressLabel")} className="sr-only sm:not-sr-only sm:flex sm:items-center">
        {STAGES.map((stage, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <li key={stage.key} className="flex items-center gap-2 sm:flex-1" aria-current={active ? "step" : undefined}>
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold ${
                  active ? "bg-calm-600 text-white" : done ? "bg-sage-300 text-sage-700" : "bg-calm-100 text-calm-700"
                }`}
              >
                {done ? (
                  <svg aria-hidden className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={`text-sm ${active ? "font-semibold text-calm-900" : done ? "text-sage-700" : "text-calm-600"}`}>
                {t(stage.label)}
              </span>
              {i < STAGES.length - 1 && <span aria-hidden className="mx-2 hidden h-px flex-1 bg-calm-200 sm:block" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
