"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import StageIndicator, { type StageKey } from "@/components/StageIndicator";
import EvidenceModule from "@/components/EvidenceModule";
import DispatchPanel from "@/components/DispatchPanel";
import type { FileFingerprint } from "@/lib/hashing";
import { PLATFORMS, getPlatform } from "@/lib/platforms";
import { buildDsaNotice } from "@/lib/template";
import { addReport, makeId, type ReportRecord } from "@/lib/storage";

const EU_STATES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
  "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
  "Slovenia", "Spain", "Sweden",
];

export default function ReportPage() {
  const [fingerprint, setFingerprint] = useState<FileFingerprint | null>(null);
  const [platformId, setPlatformId] = useState<string>("");
  const [contentUrl, setContentUrl] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [memberState, setMemberState] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [noticeEdited, setNoticeEdited] = useState(false);
  const [saved, setSaved] = useState(false);

  const platform = getPlatform(platformId);

  const stage: StageKey = !platformId
    ? "pathway"
    : saved
      ? "followup"
      : "preparation";

  // Auto-generated notice (user can override by editing the textarea).
  const generatedNotice = useMemo(() => {
    if (!platform) return "";
    return buildDsaNotice({
      platformName: platform.name,
      contentUrl,
      contentDescription,
      evidenceHash: fingerprint?.sha256,
      reporterName,
      contactEmail,
      memberState,
    });
  }, [
    platform,
    contentUrl,
    contentDescription,
    fingerprint,
    reporterName,
    contactEmail,
    memberState,
  ]);

  const effectiveNotice = noticeEdited ? noticeText : generatedNotice;
  const canSubmit = Boolean(platform && contentUrl.trim());

  function handleSubmitted() {
    if (!platform) return;
    const now = new Date().toISOString();
    const record: ReportRecord = {
      id: makeId(),
      platformId: platform.id,
      platformName: platform.name,
      dispatch: platform.dispatch,
      status: platform.dispatch === "api" ? "submitted" : "follow-up",
      contentUrl: contentUrl.trim(),
      evidenceHash: fingerprint?.sha256,
      noticeText: effectiveNotice,
      createdAt: now,
      updatedAt: now,
    };
    addReport(record);
    setSaved(true);
  }

  return (
    <div>
      <StageIndicator current={stage} />

      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-calm-900">
          Prepare a takedown report
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-calm-600">
          Take it one step at a time. You can stop, edit, or start over whenever
          you need to. Nothing is sent until you choose to submit.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Step 1: Evidence */}
        <EvidenceModule
          fingerprint={fingerprint}
          onFingerprint={setFingerprint}
        />

        {/* Step 2: Triage — where is the content hosted? */}
        <div className="rds-card">
          <h2 className="text-lg font-semibold text-calm-800">
            2 · Where is the content hosted?
          </h2>
          <p className="mt-1 text-sm text-calm-600">
            This helps us choose the right reporting pathway.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="platform" className="rds-label">
                Platform or service
              </label>
              <select
                id="platform"
                value={platformId}
                onChange={(e) => {
                  setPlatformId(e.target.value);
                  setSaved(false);
                  setNoticeEdited(false);
                }}
                className="rds-input"
              >
                <option value="">Select where you found the content…</option>
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {platform && (
                <p className="mt-2 flex items-start gap-2 text-xs text-calm-500">
                  <span
                    className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      platform.dispatch === "api"
                        ? "bg-calm-100 text-calm-700"
                        : "bg-lavender-100 text-lavender-700"
                    }`}
                  >
                    {platform.dispatch === "api"
                      ? "Automated pathway"
                      : "Manual pathway"}
                  </span>
                  {platform.note}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="url" className="rds-label">
                Link to the content
              </label>
              <input
                id="url"
                type="url"
                inputMode="url"
                placeholder="https://…"
                value={contentUrl}
                onChange={(e) => {
                  setContentUrl(e.target.value);
                  setSaved(false);
                }}
                className="rds-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="desc" className="rds-label">
                Where it appears / how to find it{" "}
                <span className="font-normal text-calm-400">(optional)</span>
              </label>
              <textarea
                id="desc"
                rows={2}
                placeholder="e.g. Posted on a public profile; appears in a specific group or thread."
                value={contentDescription}
                onChange={(e) => {
                  setContentDescription(e.target.value);
                  setSaved(false);
                }}
                className="rds-input resize-y"
              />
            </div>

            <div>
              <label htmlFor="state" className="rds-label">
                Your EU country context{" "}
                <span className="font-normal text-calm-400">(optional)</span>
              </label>
              <select
                id="state"
                value={memberState}
                onChange={(e) => setMemberState(e.target.value)}
                className="rds-input"
              >
                <option value="">Prefer not to say</option>
                {EU_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className="rds-label">
                Name or pseudonym for the notice{" "}
                <span className="font-normal text-calm-400">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="You may use a pseudonym"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="rds-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="rds-label">
                Contact email for platform follow-up{" "}
                <span className="font-normal text-calm-400">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                placeholder="Only if you want the platform to reply to you"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="rds-input"
              />
            </div>
          </div>
        </div>

        {/* Step 3: DSA template (editable) */}
        {platform && (
          <div className="rds-card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-calm-800">
                3 · Review your DSA notice
              </h2>
              {noticeEdited && (
                <button
                  type="button"
                  onClick={() => {
                    setNoticeEdited(false);
                    setNoticeText("");
                  }}
                  className="text-xs font-medium text-calm-500 underline-offset-2 hover:underline"
                >
                  Reset to generated text
                </button>
              )}
            </div>
            <p className="mt-1 text-sm text-calm-600">
              This draft follows the EU Digital Services Act notice-and-action
              format. Read it carefully and edit anything you like before
              submitting.
            </p>
            <textarea
              aria-label="DSA takedown notice (editable)"
              rows={16}
              value={effectiveNotice}
              onChange={(e) => {
                setNoticeText(e.target.value);
                setNoticeEdited(true);
              }}
              className="rds-input mt-4 resize-y font-mono text-xs leading-relaxed"
            />
          </div>
        )}

        {/* Step 4: Dispatch */}
        {platform && (
          <DispatchPanel
            key={platform.id}
            platform={platform}
            noticeText={effectiveNotice}
            canSubmit={canSubmit}
            onSubmitted={handleSubmitted}
          />
        )}

        {saved && (
          <div className="rounded-2xl border border-sage-200 bg-sage-100 p-6 text-center">
            <p className="text-base font-semibold text-sage-700">
              Saved to your private case log
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-sage-700/90">
              You can track status, add notes, and sync to your phone from the
              dashboard.
            </p>
            <Link href="/dashboard" className="rds-btn-primary mt-4">
              Go to my case log
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
