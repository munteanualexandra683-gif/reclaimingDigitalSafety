"use client";

import { useRef, useState } from "react";
import {
  computeFileFingerprint,
  formatBytes,
  type FileFingerprint,
} from "@/lib/hashing";

interface EvidenceModuleProps {
  fingerprint: FileFingerprint | null;
  onFingerprint: (fp: FileFingerprint | null) => void;
}

export default function EvidenceModule({
  fingerprint,
  onFingerprint,
}: EvidenceModuleProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const fp = await computeFileFingerprint(file);
      onFingerprint(fp);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not process the file locally.",
      );
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
      /* clipboard may be blocked; ignore silently */
    }
  }

  return (
    <div className="rds-card">
      <h2 className="text-lg font-semibold text-calm-800">
        1 · Evidence (optional, stays on your device)
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-calm-600">
        If you have the image, you can create a secure fingerprint of it. This
        proves the file&apos;s integrity for your notice without the picture ever
        leaving your device.
      </p>

      {/* Strong privacy disclaimer */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-sage-200 bg-sage-100 px-4 py-3">
        <span aria-hidden className="text-sage-700">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3l7 3v5c0 4.5-3 8.2-7 9-4-0.8-7-4.5-7-9V6l7-3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-sm font-medium text-sage-700">
          Your file never leaves this device. Only a one-way SHA-256 fingerprint
          is created locally.
        </p>
      </div>

      {!fingerprint && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Select an image to fingerprint locally"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            void handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver
              ? "border-calm-400 bg-calm-50"
              : "border-calm-200 bg-calm-50/50 hover:border-calm-300"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <span className="text-sm font-medium text-calm-700">
            {busy ? "Processing locally…" : "Click to choose an image, or drop it here"}
          </span>
          <span className="mt-1 text-xs text-calm-500">
            Nothing is uploaded — processing happens entirely in your browser.
          </span>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-lavender-50 px-4 py-3 text-sm text-lavender-800">
          {error}
        </p>
      )}

      {fingerprint && (
        <div className="mt-4 rounded-2xl border border-calm-200 bg-calm-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-calm-800">
              Fingerprint created locally ✓
            </p>
            <button
              type="button"
              onClick={() => {
                onFingerprint(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="text-xs font-medium text-calm-500 underline-offset-2 hover:underline"
            >
              Remove &amp; choose another
            </button>
          </div>

          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-calm-500">File (stays local)</dt>
              <dd className="font-medium text-calm-800">
                {fingerprint.fileName}
              </dd>
            </div>
            <div>
              <dt className="text-calm-500">Size</dt>
              <dd className="font-medium text-calm-800">
                {formatBytes(fingerprint.sizeBytes)}
              </dd>
            </div>
          </dl>

          <div className="mt-3">
            <dt className="text-sm text-calm-500">SHA-256 fingerprint</dt>
            <div className="mt-1 flex items-start gap-2">
              <code className="block flex-1 break-all rounded-lg bg-white px-3 py-2 font-mono text-xs text-calm-800">
                {fingerprint.sha256}
              </code>
              <button
                type="button"
                onClick={copyHash}
                className="rds-btn-secondary flex-none px-3 py-2 text-sm"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
