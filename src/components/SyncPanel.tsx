"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  decryptSyncedLog,
  encryptLogForSync,
  loadReports,
  payloadFitsInQr,
  saveReports,
  type EncryptedPayload,
  type ReportRecord,
} from "@/lib/storage";

type Mode = "closed" | "send" | "receive";

interface SyncPanelProps {
  reports: ReportRecord[];
  onReceived: (reports: ReportRecord[]) => void;
}

export default function SyncPanel({ reports, onReceived }: SyncPanelProps) {
  const [mode, setMode] = useState<Mode>("closed");

  /* ----- Send ----- */
  const [sendPass, setSendPass] = useState("");
  const [payload, setPayload] = useState<string | null>(null);
  const [sendBusy, setSendBusy] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  /* ----- Receive ----- */
  const [recvPass, setRecvPass] = useState("");
  const [recvRaw, setRecvRaw] = useState("");
  const [recvMsg, setRecvMsg] = useState<string | null>(null);
  const [recvError, setRecvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Whether the current payload is small enough to show as a QR code.
  const fits = payload ? payloadFitsInQr(payload) : false;

  async function generatePayload() {
    setSendBusy(true);
    setSendError(null);
    setPayload(null);
    try {
      const encrypted = await encryptLogForSync(reports, sendPass || "sync");
      setPayload(JSON.stringify(encrypted));
    } catch (e) {
      setSendError(
        e instanceof Error
          ? e.message
          : "Could not prepare the sync data on this device.",
      );
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
    a.download = `digital-safety-caselog-${stamp}.rdsync`;
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
      const incoming = await decryptSyncedLog(parsed, recvPass || "sync");
      // Merge: keep existing, add any records with new ids from the incoming log.
      const existing = loadReports();
      const existingIds = new Set(existing.map((r) => r.id));
      const added = incoming.filter((r) => !existingIds.has(r.id));
      const merged = [...added, ...existing];
      saveReports(merged);
      onReceived(merged);
      setRecvMsg(
        `Imported ${incoming.length} record(s) (${added.length} new). Your log is now in sync on this device.`,
      );
      setRecvRaw("");
    } catch {
      setRecvError(
        "Could not read that data. Check the passphrase, and make sure the full code or file was provided.",
      );
    }
  }

  async function handleFileUpload(file: File | undefined) {
    if (!file) return;
    const text = await file.text();
    await importFromText(text);
  }

  /* ----------------------------- Closed ----------------------------- */
  if (mode === "closed") {
    return (
      <div className="rds-card">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-calm-800">
              Sync to another device
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-calm-600">
              Move your case log to your phone (or another browser) without any
              cloud account. Your log is encrypted on this device and shared as
              a QR code or an encrypted file. It is never stored on a server.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode("send")}
            className="rds-btn-primary"
          >
            Sync to phone
          </button>
          <button
            type="button"
            onClick={() => setMode("receive")}
            className="rds-btn-secondary"
          >
            Receive from another device
          </button>
        </div>
      </div>
    );
  }

  /* ----------------------------- Send ----------------------------- */
  if (mode === "send") {
    return (
      <div className="rds-card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-calm-800">Sync to phone</h2>
          <button
            type="button"
            onClick={() => {
              setMode("closed");
              setPayload(null);
              setSendPass("");
              setSendError(null);
            }}
            className="text-sm text-calm-500 underline-offset-2 hover:underline"
          >
            Close
          </button>
        </div>

        <p className="mt-1 text-sm text-calm-600">
          Choose a passphrase to protect the transfer. Your log is encrypted on
          this device and transferred directly, with no cloud account.
        </p>

        <div className="mt-4 max-w-sm">
          <label htmlFor="send-pass" className="rds-label">
            Transfer passphrase
          </label>
          <input
            id="send-pass"
            type="text"
            value={sendPass}
            placeholder="e.g. a word you'll remember"
            onChange={(e) => {
              setSendPass(e.target.value);
              setPayload(null);
              setSendError(null);
            }}
            className="rds-input"
          />
          {sendError && (
            <p className="mt-2 text-sm text-lavender-800">{sendError}</p>
          )}
          <button
            type="button"
            onClick={generatePayload}
            disabled={sendBusy}
            className="rds-btn-primary mt-3"
          >
            {sendBusy
              ? "Encrypting…"
              : payload
                ? "Regenerate"
                : "Prepare secure transfer"}
          </button>
        </div>

        {sendError && (
          <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800">
            {sendError}
          </p>
        )}

        {payload && fits && (
          <div className="mt-6 flex flex-col items-center">
            <div className="rounded-2xl border border-calm-200 bg-white p-4 shadow-soft">
              <QRCodeCanvas
                value={payload}
                size={240}
                level="L"
                marginSize={2}
                aria-label="Encrypted case log QR code"
              />
            </div>
            <p className="mt-3 max-w-sm text-center text-xs text-calm-500">
              This code contains your log encrypted with AES-GCM. It&apos;s
              useless without the passphrase. On your other device, open the
              “Receive” screen and enter the same passphrase.
            </p>
            <button
              type="button"
              onClick={downloadEncryptedFile}
              className="rds-btn-secondary mt-4 text-sm"
            >
              Or download as an encrypted file
            </button>
          </div>
        )}

        {payload && !fits && (
          <div className="mt-6">
            <div className="rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-lavender-900/80">
              Your case log is too large to fit in a single QR code. No problem —
              download it as an encrypted file instead and open it on your other
              device&apos;s “Receive” screen.
            </div>
            <button
              type="button"
              onClick={downloadEncryptedFile}
              className="rds-btn-primary mt-3"
            >
              Download encrypted sync file
            </button>
            <p className="mt-2 max-w-md text-xs text-calm-500">
              The file (.rdsync) is encrypted with AES-GCM and is useless without
              your passphrase. Transfer it to your other device (e.g. via a
              private message to yourself or a USB/cable), then import it there.
            </p>
          </div>
        )}
      </div>
    );
  }

  /* ----------------------------- Receive ----------------------------- */
  return (
    <div className="rds-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-calm-800">
          Receive from another device
        </h2>
        <button
          type="button"
          onClick={() => {
            setMode("closed");
            setRecvRaw("");
            setRecvPass("");
            setRecvMsg(null);
            setRecvError(null);
          }}
          className="text-sm text-calm-500 underline-offset-2 hover:underline"
        >
          Close
        </button>
      </div>

      <p className="mt-1 text-sm text-calm-600">
        Enter the same passphrase you used on the other device, then either
        upload the encrypted file or paste the scanned QR code contents.
      </p>

      <div className="mt-4 grid gap-4">
        <div>
          <label htmlFor="recv-pass" className="rds-label">
            Transfer passphrase
          </label>
          <input
            id="recv-pass"
            type="text"
            value={recvPass}
            onChange={(e) => setRecvPass(e.target.value)}
            className="rds-input max-w-sm"
          />
        </div>

        <div>
          <span className="rds-label">Option A — upload encrypted file</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".rdsync,application/json,text/plain"
            className="sr-only"
            onChange={(e) => void handleFileUpload(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rds-btn-secondary text-sm"
          >
            Choose .rdsync file
          </button>
        </div>

        <div>
          <label htmlFor="recv-raw" className="rds-label">
            Option B — paste scanned QR code contents
          </label>
          <textarea
            id="recv-raw"
            rows={4}
            value={recvRaw}
            placeholder='{"v":1,"c":1,"salt":"…","iv":"…","data":"…"}'
            onChange={(e) => setRecvRaw(e.target.value)}
            className="rds-input resize-y font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => void importFromText(recvRaw)}
            disabled={!recvRaw.trim()}
            className="rds-btn-primary mt-2 w-fit"
          >
            Import pasted data
          </button>
        </div>
      </div>

      {recvMsg && (
        <p className="mt-3 rounded-xl bg-sage-100 px-4 py-3 text-sm font-medium text-sage-700">
          {recvMsg}
        </p>
      )}
      {recvError && (
        <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800">
          {recvError}
        </p>
      )}
    </div>
  );
}
