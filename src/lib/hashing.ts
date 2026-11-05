/**
 * Zero-knowledge local hashing.
 *
 * All computation happens in the browser via the Web Crypto API. The raw file
 * bytes are read into memory with FileReader/ArrayBuffer and are NEVER sent
 * anywhere. Only the resulting SHA-256 digest (a one-way fingerprint) is ever
 * surfaced to the rest of the app.
 */

export interface FileFingerprint {
  /** SHA-256 digest rendered as lowercase hex. */
  sha256: string;
  /** Original file name (stays local — used only for the user's own records). */
  fileName: string;
  /** File size in bytes. */
  sizeBytes: number;
  /** MIME type reported by the browser. */
  mimeType: string;
  /** ISO timestamp of when the fingerprint was computed. */
  computedAt: string;
}

/** Convert an ArrayBuffer to a lowercase hex string. */
function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const hex: string[] = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    hex[i] = bytes[i].toString(16).padStart(2, "0");
  }
  return hex.join("");
}

/**
 * Compute a SHA-256 fingerprint of a file entirely on-device.
 *
 * @throws if the Web Crypto API is unavailable (e.g. a non-secure context).
 */
export async function computeFileFingerprint(
  file: File,
): Promise<FileFingerprint> {
  if (
    typeof window === "undefined" ||
    !window.crypto ||
    !window.crypto.subtle
  ) {
    throw new Error(
      "Secure hashing is unavailable in this browser context. The Web Crypto API requires a secure (https) origin.",
    );
  }

  // Read the whole file into memory locally. This buffer never leaves the device.
  const arrayBuffer = await file.arrayBuffer();
  const digest = await window.crypto.subtle.digest("SHA-256", arrayBuffer);

  return {
    sha256: bufferToHex(digest),
    fileName: file.name,
    sizeBytes: file.size,
    mimeType: file.type || "unknown",
    computedAt: new Date().toISOString(),
  };
}

/** Human-friendly byte formatting for display. */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
