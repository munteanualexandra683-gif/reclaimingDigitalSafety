"use client";

import { DIRECTORY_ES } from "@/data/directory.es";
import { useT } from "@/lib/i18n";

/**
 * Single rendering of the support directory, used on the home page and in the
 * guided case. Every entry is unverified and is labelled as such.
 */
export default function SupportDirectory({ showEu = true }: { showEu?: boolean }) {
  const t = useT();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-base font-semibold text-calm-900">{t("supportSpainTitle")}</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {DIRECTORY_ES.map((entry) => (
            <li key={entry.id} className="rounded-xl border border-calm-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <strong className="text-sm text-calm-900">{entry.name}</strong>
                <span className="rounded-full bg-lavender-100 px-2 py-0.5 text-xs text-lavender-800">
                  {t("verifiedPending")}
                </span>
              </div>
              <p className="mt-1 text-sm text-calm-700">{entry.whatTheyDo}</p>
              <p className="mt-1 text-xs text-calm-600">
                {t("supportContact", { contact: entry.contact })} ·{" "}
                {t("supportCost", { cost: entry.cost })} ·{" "}
                {t("supportLanguages", { languages: entry.languages.join(", ") })}
              </p>
              <a
                className="mt-2 inline-block text-sm font-medium text-accent underline underline-offset-2"
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("openOfficialSite")}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {showEu && (
        <div>
          <h3 className="text-base font-semibold text-calm-900">{t("supportEuTitle")}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              [t("supportEu116006"), t("supportEu116006Text")],
              [t("supportEu116016"), t("supportEu116016Text")],
            ].map(([title, text]) => (
              <li key={title} className="rounded-xl border border-calm-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <strong className="text-sm text-calm-900">{title}</strong>
                  <span className="rounded-full bg-lavender-100 px-2 py-0.5 text-xs text-lavender-800">
                    {t("verifiedPending")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-calm-700">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="rounded-xl bg-lavender-50 px-3 py-2 text-xs text-lavender-800">
        {t("toBeVerified")}
      </p>
    </div>
  );
}
