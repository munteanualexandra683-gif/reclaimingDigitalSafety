export type StageKey = "discover" | "pathway" | "preparation" | "followup";

const STAGES: { key: StageKey; label: string }[] = [
  { key: "discover", label: "Discover & Assess" },
  { key: "pathway", label: "Reporting Pathway" },
  { key: "preparation", label: "Report Preparation" },
  { key: "followup", label: "Follow-up" },
];

export default function StageIndicator({ current }: { current: StageKey }) {
  const currentIndex = STAGES.findIndex((s) => s.key === current);

  return (
    <ol
      aria-label="Your progress"
      className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0"
    >
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li
            key={stage.key}
            className="flex items-center gap-2 sm:flex-1"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                active
                  ? "bg-calm-600 text-white"
                  : done
                    ? "bg-sage-300 text-sage-700"
                    : "bg-calm-100 text-calm-400"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`text-sm ${
                active
                  ? "font-semibold text-calm-800"
                  : done
                    ? "text-sage-700"
                    : "text-calm-400"
              }`}
            >
              {stage.label}
            </span>
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className="mx-2 hidden h-px flex-1 bg-calm-200 sm:block"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
