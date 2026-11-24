"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SyncPanel from "@/components/SyncPanel";
import { officialUrl } from "@/lib/caseRoutes";
import { formatDate, useLanguage, useT, type TKey } from "@/lib/i18n";
import {
  clearAllData,
  deleteCaseAndReports,
  deleteReport,
  loadCases,
  loadReports,
  updateReport,
  type Case,
  type ReportRecord,
  type ReportStatus,
  type Route,
} from "@/lib/storage";

const DAY = 24 * 60 * 60 * 1000;

const STATUS_LABELS: Record<ReportStatus, TKey> = {
  draft: "logStatusDraft",
  submitted: "logStatusSubmitted",
  acknowledged: "logStatusAcknowledged",
  "follow-up": "logStatusFollowUp",
  removed: "logStatusRemoved",
  declined: "logStatusDeclined",
};

const STATUS_ORDER: ReportStatus[] = ["draft", "submitted", "follow-up", "acknowledged", "removed", "declined"];

const STATUS_STYLES: Record<ReportStatus, string> = {
  draft: "bg-sand-200 text-calm-800",
  submitted: "bg-calm-200 text-calm-800",
  acknowledged: "bg-lavender-100 text-lavender-800",
  "follow-up": "bg-calm-100 text-calm-800",
  removed: "bg-sage-200 text-sage-700",
  declined: "bg-lavender-200 text-lavender-800",
};

const ROUTE_LABELS: Record<Route["type"], TKey> = {
  "dsa-notice": "logRoutePlatform",
  deindex: "logRouteSearch",
  national: "logRouteNational",
  "hash-handoff": "logRouteHash",
  "host-abuse": "logRouteHost",
};

const WAITING: ReportStatus[] = ["submitted", "acknowledged", "follow-up"];

function expectedBy(r: ReportRecord): string | undefined {
  if (r.expectedResponseBy) return r.expectedResponseBy;
  if (r.status === "draft") return undefined;
  return new Date(new Date(r.createdAt).getTime() + 7 * DAY).toISOString();
}

export default function DashboardPage() {
  const t = useT();
  const language = useLanguage();
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [confirmAll, setConfirmAll] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setReports(loadReports());
    setCases(loadCases());
    setHydrated(true);
  }, []);

  const date = (iso?: string) => formatDate(iso, language);
  const patch = (id: string, value: Partial<ReportRecord>) => setReports(updateReport(id, value));

  async function copy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      /* clipboard may be blocked */
    }
  }

  function addEscalation(r: ReportRecord, kind: "reminder" | "review") {
    patch(r.id, { escalations: [...(r.escalations ?? []), `${kind}|${new Date().toISOString()}`] });
  }

  function removeCase(id: string) {
    const next = deleteCaseAndReports(id);
    setCases(next.cases);
    setReports(next.reports);
    setConfirmId(null);
    setNotice(t("logCaseDeleted"));
  }

  function removeAll() {
    clearAllData();
    setReports([]);
    setCases([]);
    setConfirmAll(false);
    setNotice(t("logAllDeleted"));
  }

  const hasData = reports.length > 0 || cases.length > 0;
  const caseIds = new Set(cases.map((c) => c.id));
  const otherReports = reports.filter((r) => !r.caseId || !caseIds.has(r.caseId));

  function confirmBox(id: string, message: string, onYes: () => void, yesLabel: string) {
    if (confirmId !== id) return null;
    return (
      <div className="mt-3 rounded-xl border border-lavender-300 bg-lavender-50 p-3" role="alert">
        <p className="text-sm text-calm-800">{message}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className="rds-btn-secondary border-lavender-400 px-4 py-2 text-sm text-lavender-800" onClick={onYes}>
            {yesLabel}
          </button>
          <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => setConfirmId(null)}>
            {t("cancel")}
          </button>
        </div>
      </div>
    );
  }

  // A render function (not a nested component) so inputs keep focus while typing.
  function renderReport(r: ReportRecord) {
    const due = expectedBy(r);
    const overdue = WAITING.includes(r.status) && due !== undefined && due < new Date().toISOString();
    const statusLabel =
      r.status === "submitted" && r.dispatch === "api" ? t("logStatusSubmittedSimulated") : t(STATUS_LABELS[r.status]);
    const reference = r.referenceNumber?.trim() || t("logReferencePlaceholder");
    const reminderText = t("logReminderTemplate", { date: date(r.createdAt), reference });
    const reviewText = t("logReviewTemplate", { date: date(r.createdAt), reference });
    const formUrl = officialUrl(r.routeType, r.platformId);

    return (
      <li key={r.id} className="rds-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-calm-900">{r.platformName}</h3>
            <p className="text-xs text-calm-600">{t(ROUTE_LABELS[r.routeType ?? "dsa-notice"])}</p>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}>{statusLabel}</span>
        </div>
        <p className="mt-2 break-all text-sm text-calm-700">{r.contentUrl || t("logNoLink")}</p>
        <p className="mt-1 text-xs text-calm-600">
          {t("logPrepared", { date: date(r.createdAt) })}
          {due && ` · ${t("logExpected", { date: date(due) })}`}
        </p>

        {/* Ready to send (manual route) */}
        {r.status === "draft" && (
          <div className="mt-3 rounded-xl border border-sand-200 bg-sand-50 p-3 text-sm">
            <p className="text-calm-800">{t("logReadyText")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="rds-btn-secondary px-4 py-2 text-sm"
                onClick={() => {
                  void copy(`send-${r.id}`, r.noticeText);
                  if (formUrl) window.open(formUrl, "_blank", "noopener,noreferrer");
                }}
              >
                {copiedKey === `send-${r.id}` ? t("copied") : formUrl ? t("caseCopyOpen") : t("logCopyText")}
              </button>
              <button
                type="button"
                className="rds-btn-secondary px-4 py-2 text-sm"
                onClick={() => patch(r.id, { status: "submitted", expectedResponseBy: new Date(Date.now() + 7 * DAY).toISOString() })}
              >
                {t("caseMarkSent")}
              </button>
            </div>
          </div>
        )}

        {/* No answer yet */}
        {overdue && (
          <div className="mt-3 rounded-xl border border-lavender-200 bg-lavender-50 p-3 text-sm">
            <p className="font-semibold text-calm-900">{t("logNoAnswerTitle")}</p>
            <p className="mt-1 text-calm-700">{t("logNoAnswerText")}</p>
            <blockquote className="mt-2 rounded-lg bg-white p-2 text-calm-800">{reminderText}</blockquote>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => copy(`rem-${r.id}`, reminderText)}>
                {copiedKey === `rem-${r.id}` ? t("copied") : t("copy")}
              </button>
              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => addEscalation(r, "reminder")}>
                {t("logReminderSent")}
              </button>
            </div>
          </div>
        )}

        {/* Declined */}
        {r.status === "declined" && (
          <div className="mt-3 rounded-xl border border-calm-200 bg-calm-50 p-3 text-sm">
            <p className="font-semibold text-calm-900">{t("logDeclinedTitle")}</p>
            <p className="mt-1 text-calm-700">{t("logDeclinedText")}</p>
            <blockquote className="mt-2 rounded-lg bg-white p-2 text-calm-800">{reviewText}</blockquote>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => copy(`rev-${r.id}`, reviewText)}>
                {copiedKey === `rev-${r.id}` ? t("copied") : t("copy")}
              </button>
              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => addEscalation(r, "review")}>
                {t("logReviewSent")}
              </button>
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer font-medium text-accent">{t("learnMore")}</summary>
              <p className="mt-1 text-calm-700">{t("logDeclinedMore")}</p>
              <p className="mt-1 text-xs text-lavender-800">{t("toBeVerified")}</p>
            </details>
            <Link href="/#support" className="mt-2 inline-block font-medium text-accent underline underline-offset-2">
              {t("caseSupportTitle")}
            </Link>
          </div>
        )}

        {/* Escalation history */}
        {(r.escalations ?? []).length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-calm-700">
            {(r.escalations ?? []).map((entry) => {
              const [kind, when] = entry.split("|");
              return (
                <li key={entry}>
                  {kind === "review" ? t("logReviewDone", { date: date(when) }) : t("logReminderDone", { date: date(when) })}
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-3">
          <label className="rds-label" htmlFor={`status-${r.id}`}>{t("logStatus")}</label>
          <select
            id={`status-${r.id}`}
            value={r.status}
            onChange={(e) => patch(r.id, { status: e.target.value as ReportStatus })}
            className="rds-input w-full py-2 text-sm sm:w-auto"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{t(STATUS_LABELS[s])}</option>
            ))}
          </select>
        </div>

        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-accent">{t("logDetails")}</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`reference-${r.id}`} className="rds-label">{t("logReference")}</label>
              <input
                id={`reference-${r.id}`}
                className="rds-input"
                value={r.referenceNumber ?? ""}
                placeholder="1234-5678"
                onChange={(e) => patch(r.id, { referenceNumber: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor={`expected-${r.id}`} className="rds-label">{t("logExpectedLabel")}</label>
              <input
                id={`expected-${r.id}`}
                type="date"
                className="rds-input"
                value={due ? due.slice(0, 10) : ""}
                onChange={(e) =>
                  patch(r.id, {
                    expectedResponseBy: e.target.value ? new Date(`${e.target.value}T12:00:00`).toISOString() : undefined,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`notes-${r.id}`} className="rds-label">{t("logNotes")}</label>
              <textarea
                id={`notes-${r.id}`}
                rows={2}
                value={r.notes ?? ""}
                placeholder={t("logNotesPlaceholder")}
                onChange={(e) => patch(r.id, { notes: e.target.value })}
                className="rds-input resize-y"
              />
            </div>
          </div>
          {r.evidenceHash && (
            <div className="mt-3">
              <p className="text-xs text-calm-600">{t("logFingerprint")}</p>
              <code className="mt-1 block break-all rounded-lg bg-calm-50 px-3 py-2 font-mono text-xs text-calm-700">{r.evidenceHash}</code>
            </div>
          )}
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium text-calm-700">{t("logShowText")}</summary>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-calm-50 p-3 font-mono text-xs text-calm-700">{r.noticeText}</pre>
          </details>
          <button
            type="button"
            onClick={() => setConfirmId(`report-${r.id}`)}
            className="mt-3 text-sm font-medium text-lavender-800 underline underline-offset-2"
          >
            {t("logDeleteReport")}
          </button>
          {confirmBox(`report-${r.id}`, t("logDeleteReportConfirm"), () => {
            setReports(deleteReport(r.id));
            setConfirmId(null);
          }, t("caseDeleteYes"))}
        </details>
      </li>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32 pt-8 sm:px-6">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">{t("stageFollowup")}</p>
        <h1 className="mt-1 text-2xl font-semibold text-calm-900">{t("logTitle")}</h1>
        <p className="mt-1 text-sm text-calm-700">{t("logIntro")}</p>
        {hydrated && (
          <Link href={cases.length ? "/case?go=continue" : "/case"} className="rds-btn-primary mt-4 w-full sm:w-auto">
            {cases.length ? t("continueCase") : t("startCase")}
          </Link>
        )}
      </header>

      {notice && (
        <p className="mb-4 rounded-xl bg-sage-100 px-4 py-3 text-sm text-sage-700" role="status">{notice}</p>
      )}

      {!hydrated ? (
        <div className="rds-card text-sm text-calm-700">{t("loading")}</div>
      ) : !hasData ? (
        <div className="rds-card text-center">
          <p className="text-base font-medium text-calm-900">{t("logEmptyTitle")}</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-calm-700">{t("logEmptyText")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {cases.map((item) => {
            const grouped = reports.filter((r) => r.caseId === item.id);
            return (
              <section key={item.id} aria-labelledby={`case-${item.id}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 id={`case-${item.id}`} className="text-lg font-semibold text-calm-900">
                    {t("logCaseTitle", { date: date(item.createdAt) })}
                  </h2>
                  <p className="text-xs text-calm-600">
                    {t("logCaseCounts", { places: item.locations.length, reports: grouped.length })}
                  </p>
                </div>
                {grouped.length === 0 ? (
                  <p className="mt-2 rounded-xl border border-calm-200 bg-white p-4 text-sm text-calm-700">{t("logCaseNoReports")}</p>
                ) : (
                  <ul className="mt-3 flex flex-col gap-4">
                    {grouped.map(renderReport)}
                  </ul>
                )}
                <button
                  type="button"
                  className="mt-3 text-sm font-medium text-lavender-800 underline underline-offset-2"
                  onClick={() => setConfirmId(`case-${item.id}`)}
                >
                  {t("caseDelete")}
                </button>
                {confirmBox(`case-${item.id}`, t("caseDeleteConfirm"), () => removeCase(item.id), t("caseDeleteYes"))}
              </section>
            );
          })}

          {otherReports.length > 0 && (
            <section aria-labelledby="other-reports">
              <h2 id="other-reports" className="text-lg font-semibold text-calm-900">{t("logOtherReports")}</h2>
              <ul className="mt-3 flex flex-col gap-4">
                {otherReports.map(renderReport)}
              </ul>
            </section>
          )}

          {cases.length > 0 && (
            <section className="rds-card" aria-labelledby="again-title">
              <h2 id="again-title" className="text-lg font-semibold text-calm-900">{t("caseAgainTitle")}</h2>
              <p className="mt-1 text-sm text-calm-700">{t("logAgainText")}</p>
              <Link href="/case?go=again" className="rds-btn-secondary mt-3">{t("logAgainButton")}</Link>
            </section>
          )}
        </div>
      )}

      {hydrated && hasData && (
        <div className="mt-8">
          <SyncPanel reports={reports} cases={cases} onReceived={setReports} onCasesReceived={setCases} />
        </div>
      )}

      {hydrated && hasData && (
        <section className="mt-6 rounded-2xl border border-calm-200 bg-sand-50 p-6" aria-labelledby="delete-all">
          <h2 id="delete-all" className="text-base font-semibold text-calm-900">{t("logDeleteAllTitle")}</h2>
          <p className="mt-1 text-sm text-calm-700">{t("logDeleteAllText")}</p>
          {confirmAll ? (
            <div className="mt-3 rounded-xl border border-lavender-300 bg-lavender-50 p-3" role="alert">
              <p className="text-sm text-calm-800">{t("logDeleteAllConfirm")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button type="button" className="rds-btn-secondary border-lavender-400 text-lavender-800" onClick={removeAll}>
                  {t("logDeleteAllYes")}
                </button>
                <button type="button" className="rds-btn-secondary" onClick={() => setConfirmAll(false)}>{t("cancel")}</button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirmAll(true)} className="rds-btn-secondary mt-3 border-lavender-300 text-lavender-800">
              {t("logDeleteAll")}
            </button>
          )}
        </section>
      )}
    </div>
  );
}
