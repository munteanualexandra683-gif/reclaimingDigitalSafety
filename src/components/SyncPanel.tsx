"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  decryptSyncedLog,
  encryptLogForSync,
  loadReports,
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

  /* ----- Send (generate QR) ----- */
  const [sendPass, setSendPass] = useState("");
  const [payload, setPayload] = useState<string | null>(null);
  const [sendBusy, setSendBusy] = useState(false);

  /* ----- Receive (paste scanned payload) ----- */
  const [recvPass, setRecvPass] = useState("");
  const [recvRaw, setRecvRaw] = useState("");
  const [recvMsg, setRecvMsg] = useState<string | null>(null);
  const [recvError, setRecvError] = useState<string | null>(null);

  async function generateQr() {
    setSendBusy(true);
    setPayload(null);
    try {
      const encrypted = await encryptLogForSync(reports, sendPass || "sync");
      setPayload(JSON.stringify(encrypted));
    } finally {
      setSendBusy(false);
    }
  }

  async function importPayload() {
    setRecvError(null);
    setRecvMsg(null);
    try {
      const parsed = JSON.parse(recvRaw) as EncryptedPayload;
      const incoming = await decryptSyncedLog(parsed, recvPass || "sync");
      // Merge: keep existing, add any new ids from the incoming log.
      const existing = loadReports();
      const existingIds = new Set(existing.map((r) => r.id));
      const merged = [
        ...incoming.filter((r) => !existingIds.has(r.id)),
        ...existing,
      ];
      saveReports(merged);
      onReceived(merged);
      setRecvMsg(
        `Imported ${incoming.length} record(s). Your log is now in sync on this device.`,
      );
      setRecvRaw("");
    } catch {
      setRecvError(
        "Could not read that code. Check the passphrase and make sure the full code was pasted.",
      );
    }
  }

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
              cloud account. Your log is encrypted on this device and shown as a
              QR code. Scanning it transfers the data directly — it is never
              stored on a server.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setMode("send")}
            className="rds-btn-primary"
          >
            Sync to phone (show QR)
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

  if (mode === "send") {
    return (
      <div className="rds-card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-calm-800">
            Sync to phone
          </h2>
          <button
            type="button"
            onClick={() => {
              setMode("closed");
              setPayload(null);
              setSendPass("");
            }}
            className="text-sm text-calm-500 underline-offset-2 hover:underline"
          >
            Close
          </button>
        </div>

        <p className="mt-1 text-sm text-calm-600">
          Choose a passphrase to protect the transfer, then scan the QR code
          from your other device&apos;s camera or sync screen. Scanning
          transfers your case log directly, with no cloud account.
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
            }}
            className="rds-input"
          />
          <button
            type="button"
            onClick={generateQr}
            disabled={sendBusy}
            className="rds-btn-primary mt-3"
          >
            {sendBusy ? "Encrypting…" : payload ? "Regenerate code" : "Generate QR code"}
          </button>
        </div>

        {payload && (
          <div className="mt-6 flex flex-col items-center">
            <div className="rounded-2xl border border-calm-200 bg-white p-4 shadow-soft">
              <QRCodeCanvas
                value={payload}
                size={240}
                level="M"
                marginSize={2}
                aria-label="Encrypted case log QR code"
              />
            </div>
            <p className="mt-3 max-w-sm text-center text-xs text-calm-500">
              This code contains your log encrypted with AES-GCM. It&apos;s
              useless without the passphrase. On your other device, open this
              tool&apos;s “Receive” screen and enter the same passphrase.
            </p>
          </div>
        )}
      </div>
    );
  }

  // receive
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
        Scan the QR code shown on your other device with your camera, then paste
        the decoded text below and enter the same passphrase.
      </p>

      <div className="mt-4 grid gap-3">
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
          <label htmlFor="recv-raw" className="rds-label">
            Scanned code contents
          </label>
          <textarea
            id="recv-raw"
            rows={4}
            value={recvRaw}
            placeholder='{"v":1,"salt":"…","iv":"…","data":"…"}'
            onChange={(e) => setRecvRaw(e.target.value)}
            className="rds-input resize-y font-mono text-xs"
          />
        </div>
        <button
          type="button"
          onClick={importPayload}
          disabled={!recvRaw.trim()}
          className="rds-btn-primary w-fit"
        >
          Import into this device
        </button>
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
