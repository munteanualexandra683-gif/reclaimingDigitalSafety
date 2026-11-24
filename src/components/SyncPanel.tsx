"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useT } from "@/lib/i18n";
import {
  decryptSyncedLog,
  encryptLogForSync,
  loadReports,
  loadCases,
  saveCases,
  payloadFitsInQr,
  saveReports,
  type Case,
  type EncryptedPayload,
  type ReportRecord,
} from "@/lib/storage";

type Mode = "closed" | "send" | "receive";

const MIN_PASSPHRASE = 6;
/** Older versions encrypted with this when the passphrase was left empty. */
const LEGACY_EMPTY_PASSPHRASE = "sync";

interface SyncPanelProps {
  reports: ReportRecord[];
  cases?: Case[];
  onReceived: (reports: ReportRecord[]) => void;
  onCasesReceived?: (cases: Case[]) => void;
}

function PassphraseInput({
  id, label, value, onChange, show, onToggle, showLabel, hideLabel, hint,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; showLabel: string; hideLabel: string; hint?: string;
}) {
  return (
    <div className="max-w-sm">
      <label htmlFor={id} className="rds-label">{label}</label>
      <div className="flex gap-2">
        <input
          id={id}
          type={show ? "text" : "password"}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rds-input"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        <button type="button" onClick={onToggle} className="rds-btn-secondary flex-none px-3 text-sm" aria-pressed={show}>
          {show ? hideLabel : showLabel}
        </button>
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-calm-600">{hint}</p>}
    </div>
  );
}

export default function SyncPanel({ reports, cases = [], onReceived, onCasesReceived }: SyncPanelProps) {
  const t = useT();
  const [mode, setMode] = useState<Mode>("closed");
  const [showPass, setShowPass] = useState(false);

  const [sendPass, setSendPass] = useState("");
  const [payload, setPayload] = useState<string | null>(null);
  const [sendBusy, setSendBusy] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const [recvPass, setRecvPass] = useState("");
  const [recvRaw, setRecvRaw] = useState("");
  const [recvMsg, setRecvMsg] = useState<string | null>(null);
  const [recvError, setRecvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fits = payload ? payloadFitsInQr(payload) : false;
  const passOk = sendPass.trim().length >= MIN_PASSPHRASE;

  function close() {
    setMode("closed");
    setPayload(null);
    setSendPass("");
    setSendError(null);
    setRecvRaw("");
    setRecvPass("");
    setRecvMsg(null);
    setRecvError(null);
    setShowPass(false);
  }

  async function generatePayload() {
    if (!passOk) return;
    setSendBusy(true);
    setSendError(null);
    setPayload(null);
    try {
      const encrypted = await encryptLogForSync(reports, sendPass, cases);
      setPayload(JSON.stringify(encrypted));
    } catch {
      setSendError(t("syncPrepareError"));
    } finally {
      setSendBusy(false);
    }
  }

  function downloadEncryptedFile() {
    if (!payload) return;
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `nest-backup-${stamp}.rdsync`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function importFromText(raw: string) {
    setRecvError(null);
    setRecvMsg(null);
    try {
      const parsed = JSON.parse(raw) as EncryptedPayload;
      const incoming = await decryptSyncedLog(parsed, recvPass || LEGACY_EMPTY_PASSPHRASE);
      const existing = loadReports();
      const existingIds = new Set(existing.map((r) => r.id));
      const added = incoming.reports.filter((r) => !existingIds.has(r.id));
      const merged = [...added, ...existing];
      saveReports(merged);
      onReceived(merged);

      const existingCases = loadCases();
      const existingCaseIds = new Set(existingCases.map((item) => item.id));
      const addedCases = incoming.cases.filter((item) => !existingCaseIds.has(item.id));
      const mergedCases = [...addedCases, ...existingCases];
      saveCases(mergedCases);
      onCasesReceived?.(mergedCases);

      setRecvMsg(t("syncImported", { reports: incoming.reports.length, cases: incoming.cases.length, added: added.length + addedCases.length }));
      setRecvRaw("");
    } catch {
      setRecvError(t("syncImportError"));
    }
  }

  async function handleFileUpload(file: File | undefined) {
    if (!file) return;
    await importFromText(await file.text());
  }

  if (mode === "closed") {
    return (
      <section className="rds-card" aria-labelledby="sync-title">
        <h2 id="sync-title" className="text-lg font-semibold text-calm-900">{t("syncTitle")}</h2>
        <p className="mt-1 max-w-xl text-sm text-calm-700">{t("syncIntro")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setMode("send")} className="rds-btn-secondary">{t("syncSend")}</button>
          <button type="button" onClick={() => setMode("receive")} className="rds-btn-secondary">{t("syncReceive")}</button>
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-accent">{t("homePrivacyTechTitle")}</summary>
          <p className="mt-1 text-sm text-calm-700">{t("syncTech")}</p>
        </details>
      </section>
    );
  }

  if (mode === "send") {
    return (
      <section className="rds-card" aria-labelledby="sync-send-title">
        <div className="flex items-center justify-between">
          <h2 id="sync-send-title" className="text-lg font-semibold text-calm-900">{t("syncSend")}</h2>
          <button type="button" onClick={close} className="text-sm font-medium text-calm-700 underline underline-offset-2">{t("syncClose")}</button>
        </div>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-calm-700">
          <li>{t("syncSendStep1")}</li>
          <li>{t("syncSendStep2")}</li>
          <li>{t("syncSendStep3")}</li>
        </ol>
        <div className="mt-4">
          <PassphraseInput
            id="send-pass"
            label={t("syncPassphrase")}
            value={sendPass}
            onChange={(v) => { setSendPass(v); setPayload(null); setSendError(null); }}
            show={showPass}
            onToggle={() => setShowPass(!showPass)}
            showLabel={t("syncShow")}
            hideLabel={t("syncHide")}
            hint={t("syncPassphraseHint", { min: MIN_PASSPHRASE })}
          />
          <button type="button" onClick={generatePayload} disabled={sendBusy || !passOk} className="rds-btn-primary mt-3">
            {sendBusy ? t("syncPreparing") : payload ? t("syncPrepareAgain") : t("syncPrepare")}
          </button>
        </div>

        {sendError && <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800" role="alert">{sendError}</p>}

        {payload && fits && (
          <div className="mt-6 flex flex-col items-center">
            <div className="rounded-2xl border border-calm-200 bg-white p-4 shadow-soft">
              <QRCodeCanvas value={payload} size={240} level="L" marginSize={2} aria-label={t("syncQrLabel")} />
            </div>
            <p className="mt-3 max-w-sm text-center text-sm text-calm-700">{t("syncQrText")}</p>
            <button type="button" onClick={downloadEncryptedFile} className="rds-btn-secondary mt-4 text-sm">{t("syncDownloadInstead")}</button>
          </div>
        )}

        {payload && !fits && (
          <div className="mt-6">
            <p className="rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-calm-800">{t("syncTooBig")}</p>
            <button type="button" onClick={downloadEncryptedFile} className="rds-btn-primary mt-3">{t("syncDownload")}</button>
          </div>
        )}

        {payload && <p className="mt-3 max-w-md text-xs text-calm-600">{t("syncFileAdvice")}</p>}
      </section>
    );
  }

  return (
    <section className="rds-card" aria-labelledby="sync-recv-title">
      <div className="flex items-center justify-between">
        <h2 id="sync-recv-title" className="text-lg font-semibold text-calm-900">{t("syncReceive")}</h2>
        <button type="button" onClick={close} className="text-sm font-medium text-calm-700 underline underline-offset-2">{t("syncClose")}</button>
      </div>
      <p className="mt-1 text-sm text-calm-700">{t("syncReceiveIntro")}</p>

      <div className="mt-4 grid gap-4">
        <PassphraseInput
          id="recv-pass"
          label={t("syncPassphrase")}
          value={recvPass}
          onChange={setRecvPass}
          show={showPass}
          onToggle={() => setShowPass(!showPass)}
          showLabel={t("syncShow")}
          hideLabel={t("syncHide")}
        />
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".rdsync,application/json,text/plain"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => void handleFileUpload(e.target.files?.[0])}
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="rds-btn-primary">
            {t("syncChooseFile")}
          </button>
        </div>
        <details>
          <summary className="cursor-pointer text-sm font-medium text-accent">{t("syncPasteTitle")}</summary>
          <label htmlFor="recv-raw" className="rds-label mt-2">{t("syncPasteLabel")}</label>
          <textarea
            id="recv-raw"
            rows={4}
            value={recvRaw}
            onChange={(e) => setRecvRaw(e.target.value)}
            className="rds-input resize-y font-mono text-xs"
          />
          <button type="button" onClick={() => void importFromText(recvRaw)} disabled={!recvRaw.trim()} className="rds-btn-secondary mt-2">
            {t("syncImport")}
          </button>
        </details>
      </div>

      {recvMsg && <p className="mt-3 rounded-xl bg-sage-100 px-4 py-3 text-sm font-medium text-sage-700" role="status">{recvMsg}</p>}
      {recvError && <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800" role="alert">{recvError}</p>}
    </section>
  );
}
