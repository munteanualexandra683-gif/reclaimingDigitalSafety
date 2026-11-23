"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StageIndicator from "@/components/StageIndicator";
import SyncPanel from "@/components/SyncPanel";
import {
  clearAllData,
  deleteReport,
  loadCases,
  loadReports,
  updateReport,
  type Case,
  type ReportRecord,
  type ReportStatus,
} from "@/lib/storage";

const STATUS_OPTIONS: { value: ReportStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "follow-up", label: "Awaiting follow-up" },
  { value: "removed", label: "Content removed" },
  { value: "declined", label: "Declined" },
];

const STATUS_STYLES: Record<ReportStatus, string> = {
  draft: "bg-calm-100 text-calm-600",
  submitted: "bg-calm-200 text-calm-700",
  acknowledged: "bg-lavender-100 text-lavender-700",
  "follow-up": "bg-sand-200 text-calm-700",
  removed: "bg-sage-200 text-sage-700",
  declined: "bg-lavender-200 text-lavender-800",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DashboardPage() {
  const [reports, setReports] = useState<ReportRecord[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setReports(loadReports());
    setCases(loadCases());
    setHydrated(true);
  }, []);

  function handleStatus(id: string, status: ReportStatus) {
    setReports(updateReport(id, { status }));
  }

  function handleNotes(id: string, notes: string) {
    setReports(updateReport(id, { notes }));
  }

  function handleDelete(id: string) {
    setReports(deleteReport(id));
  }

  function handleClearAll() {
    clearAllData();
    setReports([]);
    setCases([]);
  }

  function handleReference(id: string, referenceNumber: string) {
    setReports(updateReport(id, { referenceNumber }));
  }

  function handleExpectedDate(id: string, expectedResponseBy: string) {
    setReports(updateReport(id, { expectedResponseBy }));
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-32 pt-8 sm:px-6">
      <StageIndicator current="followup" />

      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-calm-900">My case log</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-calm-600">
            Everything here is stored only in this browser. Track each report,
            keep private notes, and sync to another device whenever you like.
          </p>
        </div>
        <Link href="/report" className="rds-btn-primary">
          Prepare a new report
        </Link>
      </header>

      {!hydrated ? (
        <div className="rds-card text-sm text-calm-500">Loading your log…</div>
      ) : reports.length === 0 ? (
        <div className="rds-card text-center">
          <p className="text-base font-medium text-calm-800">
            Your case log is empty
          </p>
          <p className="mx-auto mt-1 max-w-md text-sm text-calm-600">
            When you prepare and submit a report, it will appear here so you can
            follow up at your own pace.
          </p>
          <Link href="/report" className="rds-btn-primary mt-4">
            Prepare your first report
          </Link>
        </div>
      ) : (
        <>
          {cases.map((item) => {
            const grouped = reports.filter((report) => report.caseId === item.id);
            if (!grouped.length) return null;
            return (
              <section key={item.id} className="rds-card mb-4">
                <h2 className="text-base font-semibold text-calm-900">
                  Case · {item.country}
                </h2>
                <p className="mt-1 text-xs text-calm-500">
                  Created {formatDate(item.createdAt)} ·{" "}
                  {grouped.length} linked report(s)
                </p>
                <ul className="mt-3 space-y-2">
                  {grouped.map((report) => (
                    <li
                      key={report.id}
                      className="rounded-xl border border-calm-100 p-3 text-sm"
                    >
                      <strong>{report.platformName}</strong>
                      <span className="ml-2 text-xs text-calm-500">
                        {report.routeType ?? "report"}
                      </span>
                      <p className="mt-1 break-all text-calm-600">
                        {report.contentUrl || "Manual route prepared"}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          <ul className="flex flex-col gap-4">
            {reports.map((r) => {
              const open = expanded === r.id;
              return (
                <li key={r.id} className="rds-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-calm-800">
                          {r.platformName}
                        </h2>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[r.status]}`}
                        >
                          {STATUS_OPTIONS.find((s) => s.value === r.status)
                            ?.label ?? r.status}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm text-calm-500">
                        {r.contentUrl || "No link recorded"}
                      </p>
                      <p className="mt-0.5 text-xs text-calm-400">
                        Created {formatDate(r.createdAt)} · Updated{" "}
                        {formatDate(r.updatedAt)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <label className="sr-only" htmlFor={`status-${r.id}`}>
                        Update status
                      </label>
                      <select
                        id={`status-${r.id}`}
                        value={r.status}
                        onChange={(e) =>
                          handleStatus(r.id, e.target.value as ReportStatus)
                        }
                        className="rds-input w-auto px-3 py-2 text-sm"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setExpanded(open ? null : r.id)}
                        className="text-xs font-medium text-calm-500 underline-offset-2 hover:underline"
                      >
                        {open ? "Hide details" : "View details"}
                      </button>
                    </div>
                  </div>

                  {open && (
                    <div className="mt-4 border-t border-calm-100 pt-4">
                      <div className="mb-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`reference-${r.id}`} className="rds-label">
                            Reference number
                          </label>
                          <input
                            id={`reference-${r.id}`}
                            className="rds-input"
                            value={r.referenceNumber ?? ""}
                            onChange={(e) =>
                              handleReference(r.id, e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor={`expected-${r.id}`} className="rds-label">
                            Expected response by
                          </label>
                          <input
                            id={`expected-${r.id}`}
                            type="date"
                            className="rds-input"
                            value={
                              (r.expectedResponseBy ?? new Date(
                                new Date(r.createdAt).getTime() + 7 * 86400000
                              ).toISOString())
                                .slice(0, 10)
                            }
                            onChange={(e) =>
                              handleExpectedDate(
                                r.id,
                                new Date(e.target.value).toISOString()
                              )
                            }
                          />
                        </div>
                      </div>
                      {r.status !== "removed" &&
                        (r.expectedResponseBy ?? new Date(
                          new Date(r.createdAt).getTime() + 7 * 86400000
                        ).toISOString()) < new Date().toISOString() && (
                          <div className="mb-3 rounded-xl border border-lavender-200 bg-lavender-50 p-3 text-sm">
                            <strong>No answer yet.</strong> Reminder template: “I am
                            following up on my report from{" "}
                            {formatDate(r.createdAt)}. My reference is{" "}
                            {r.referenceNumber || "[reference]"}.
                            Please confirm the status and any next step.”
                          </div>
                        )}
                      {r.status === "declined" && (
                        <div className="mb-3 rounded-xl border border-calm-200 bg-calm-50 p-3 text-sm">
                          <strong>DSA Article 20 internal complaint template</strong>
                          <p className="mt-1">
                            “I ask you to reconsider your decision to decline this
                            notice. Please review the notice, evidence, and reasons
                            provided, and explain the result of the internal
                            complaint process.”
                          </p>
                          <p className="mt-2">
                            Article 21 allows out-of-court dispute settlement. A
                            complaint may also be considered by the Digital Services
                            Coordinator under Article 53. All routes and eligibility
                            are to be verified with a partner organisation before the
                            pilot.
                          </p>
                        </div>
                      )}
                      {r.evidenceHash && (
                        <div className="mb-3">
                          <p className="text-xs text-calm-500">
                            Evidence fingerprint (SHA-256)
                          </p>
                          <code className="mt-1 block break-all rounded-lg bg-calm-50 px-3 py-2 font-mono text-xs text-calm-700">
                            {r.evidenceHash}
                          </code>
                        </div>
                      )}

                      <div className="mb-3">
                        <label
                          htmlFor={`notes-${r.id}`}
                          className="rds-label"
                        >
                          Private notes
                        </label>
                        <textarea
                          id={`notes-${r.id}`}
                          rows={2}
                          value={r.notes ?? ""}
                          placeholder="e.g. Reference number, date of platform reply…"
                          onChange={(e) => handleNotes(r.id, e.target.value)}
                          className="rds-input resize-y"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor={`reference-${r.id}`}
                          className="rds-label"
                        >
                          Reference number
                        </label>
                        <input
                          id={`reference-${r.id}`}
                          type="text"
                          value={r.referenceNumber ?? ""}
                          placeholder="e.g. 1234-5678"
                          onChange={(e) =>
                            handleReference(r.id, e.target.value)
                          }
                          className="rds-input"
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor={`expected-response-${r.id}`}
                          className="rds-label"
                        >
                          Expected response by
                        </label>
                        <input
                          id={`expected-response-${r.id}`}
                          type="date"
                          value={
                            r.expectedResponseBy
                              ? formatDate(r.expectedResponseBy)
                              : ""
                          }
                          onChange={(e) =>
                            handleExpectedDate(r.id, e.target.value)
                          }
                          className="rds-input"
                        />
                      </div>

                      <details className="mb-3">
                        <summary className="cursor-pointer text-sm font-medium text-calm-600">
                          Show submitted notice text
                        </summary>
                        <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-calm-50 p-3 font-mono text-xs text-calm-700">
                          {r.noticeText}
                        </pre>
                      </details>

                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="text-xs font-medium text-lavender-700 underline-offset-2 hover:underline"
                      >
                        Delete this report
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Sync */}
      <div className="mt-6">
        <SyncPanel
          reports={reports}
          cases={cases}
          onReceived={setReports}
          onCasesReceived={setCases}
        />
      </div>

      {/* Danger-free data controls */}
      {reports.length > 0 && (
        <div className="mt-6 rounded-2xl border border-calm-200 bg-sand-50 p-6">
          <h2 className="text-base font-semibold text-calm-800">
            Your data, your choice
          </h2>
          <p className="mt-1 text-sm text-calm-600">
            You can permanently remove everything from this device at any time.
            This cannot be undone.
          </p>
          <button
            type="button"
            onClick={handleClearAll}
            className="rds-btn-secondary mt-3 border-lavender-300 text-lavender-700 hover:bg-lavender-50"
          >
            Delete my entire case log
          </button>
        </div>
      )}
    </div>
  );
}
