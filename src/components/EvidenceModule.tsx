"use client";

import { useRef, useState } from "react";
import { computeFileFingerprint, formatBytes, type FileFingerprint } from "@/lib/hashing";
import { useT } from "@/lib/i18n";

interface EvidenceModuleProps {
  fingerprint: FileFingerprint | null;
  onFingerprint: (fp: FileFingerprint | null) => void;
}

/**
 * Optional fingerprint of a file the person already has. The file is read in
 * the browser only; just the SHA-256 digest is kept. Nothing is uploaded and
 * no image is ever displayed.
 */
export default function EvidenceModule({ fingerprint, onFingerprint }: EvidenceModuleProps) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      onFingerprint(await computeFileFingerprint(file));
    } catch {
      setError(t("evidenceError"));
      onFingerprint(null);
    } finally {
      setBusy(false);
    }
  }

  async function copyHash() {
    if (!fingerprint) return;
    try {
      await navigator.clipboard.writeText(fingerprint.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked */
    }
  }

  return (
    <div>
      <p className="text-sm text-calm-700">{t("evidenceIntro")}</p>
      <p className="mt-2 text-sm font-medium text-sage-700">{t("evidenceStaysLocal")}</p>

      {!fingerprint && (
        <>
          <input
            ref={inputRef}
            id="evidence-file"
            type="file"
            accept="image/*,video/*"
            className="sr-only"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <label
            htmlFor="evidence-file"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              void handleFile(e.dataTransfer.files?.[0]);
            }}
            className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-calm-300 bg-calm-50/50 px-6 py-6 text-center hover:border-calm-400"
          >
            <span className="text-sm font-medium text-calm-800">{busy ? t("evidenceBusy") : t("evidenceChoose")}</span>
          </label>
        </>
      )}

      {error && <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800" role="alert">{error}</p>}

      {fingerprint && (
        <div className="mt-3 rounded-2xl border border-calm-200 bg-calm-50 p-4" role="status">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-sage-700">{t("evidenceDone")}</p>
            <button
              type="button"
              onClick={() => {
                onFingerprint(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-sm font-medium text-calm-700 underline underline-offset-2"
            >
              {t("evidenceRemove")}
            </button>
          </div>
          <p className="mt-2 text-sm text-calm-700">
            {t("evidenceFile", { name: fingerprint.fileName, size: formatBytes(fingerprint.sizeBytes) })}
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-accent">{t("evidenceShowCode")}</summary>
            <div className="mt-2 flex items-start gap-2">
              <code className="block flex-1 break-all rounded-lg bg-white px-3 py-2 font-mono text-xs text-calm-800">
                {fingerprint.sha256}
              </code>
              <button type="button" onClick={copyHash} className="rds-btn-secondary flex-none px-3 py-2 text-sm">
                {copied ? t("copied") : t("copy")}
              </button>
            </div>
            <p className="mt-1 text-xs text-calm-600">{t("evidenceTech")}</p>
          </details>
        </div>
      )}
    </div>
  );
}
