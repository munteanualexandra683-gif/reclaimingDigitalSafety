/**
 * Encrypted local follow-up log.
 *
 * Case records are stored ONLY in the browser's localStorage. Nothing is sent
 * to any server. For the cross-device "Sync to Phone" feature, the log is
 * encrypted with AES-GCM (derived from a passphrase via PBKDF2) using the Web
 * Crypto API before being encoded into a QR payload.
 */

export type ReportStatus =
  | "draft"
  | "submitted"
  | "acknowledged"
  | "removed"
  | "declined"
  | "follow-up";

export interface ReportRecord {
  id: string;
  platformId: string;
  platformName: string;
  dispatch: "api" | "closed";
  status: ReportStatus;
  contentUrl: string;
  evidenceHash?: string;
  noticeText: string;
  createdAt: string;
  updatedAt: string;
  /** Free-form notes the survivor keeps for their own records. */
  notes?: string;
}

const STORAGE_KEY = "rds.reports.v1";

/* ----------------------------- CRUD (localStorage) ----------------------------- */

export function loadReports(): ReportRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ReportRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveReports(reports: ReportRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function addReport(report: ReportRecord): ReportRecord[] {
  const reports = loadReports();
  const next = [report, ...reports];
  saveReports(next);
  return next;
}

export function updateReport(
  id: string,
  patch: Partial<ReportRecord>,
): ReportRecord[] {
  const reports = loadReports().map((r) =>
    r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r,
  );
  saveReports(reports);
  return reports;
}

export function deleteReport(id: string): ReportRecord[] {
  const reports = loadReports().filter((r) => r.id !== id);
  saveReports(reports);
  return reports;
}

export function clearAllReports(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/* ----------------------------- Encryption (QR sync) ----------------------------- */

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function fromBase64(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/* ----- Optional gzip compression (built-in, no dependency) ----- */

function supportsCompression(): boolean {
  return (
    typeof CompressionStream !== "undefined" &&
    typeof DecompressionStream !== "undefined"
  );
}

async function gzip(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new Response(
    new Blob([bytes as BlobPart]).stream().pipeThrough(
      new CompressionStream("gzip"),
    ),
  );
  return new Uint8Array(await stream.arrayBuffer());
}

async function gunzip(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new Response(
    new Blob([bytes as BlobPart]).stream().pipeThrough(
      new DecompressionStream("gzip"),
    ),
  );
  return new Uint8Array(await stream.arrayBuffer());
}

async function deriveKey(
  passphrase: string,
  salt: Uint8Array,
): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150_000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export interface EncryptedPayload {
  v: 1;
  /** 1 = payload was gzip-compressed before encryption. */
  c?: 0 | 1;
  salt: string;
  iv: string;
  data: string;
}

/**
 * Practical capacity (in characters of the JSON string) that a single QR code
 * can reliably hold at error-correction level "M". Above this we switch to an
 * encrypted file download instead of rendering a QR code, so the UI never
 * throws "Data too long".
 */
export const QR_CHAR_CAPACITY = 2200;

/** True when the serialized payload is small enough to render as one QR code. */
export function payloadFitsInQr(serialized: string): boolean {
  return serialized.length <= QR_CHAR_CAPACITY;
}

/**
 * Encrypt the current log into a compact JSON payload.
 *
 * The plaintext JSON is gzip-compressed (when the browser supports it) before
 * encryption, which dramatically shrinks the payload — the long DSA notice
 * texts compress very well. The passphrase never leaves the device.
 */
export async function encryptLogForSync(
  reports: ReportRecord[],
  passphrase: string,
): Promise<EncryptedPayload> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  let plaintext = textEncoder.encode(JSON.stringify(reports));
  let compressed: 0 | 1 = 0;
  if (supportsCompression()) {
    try {
      plaintext = await gzip(plaintext);
      compressed = 1;
    } catch {
      // Fall back to uncompressed if compression fails for any reason.
      plaintext = textEncoder.encode(JSON.stringify(reports));
      compressed = 0;
    }
  }

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext,
  );
  return {
    v: 1,
    c: compressed,
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(ciphertext)),
  };
}

/** Decrypt a payload scanned or imported from another device. */
export async function decryptSyncedLog(
  payload: EncryptedPayload,
  passphrase: string,
): Promise<ReportRecord[]> {
  const salt = fromBase64(payload.salt);
  const iv = fromBase64(payload.iv);
  const key = await deriveKey(passphrase, salt);
  const decrypted = new Uint8Array(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      fromBase64(payload.data),
    ),
  );

  const jsonBytes =
    payload.c === 1 ? await gunzip(decrypted) : decrypted;
  const parsed = JSON.parse(textDecoder.decode(jsonBytes));
  if (!Array.isArray(parsed)) throw new Error("Invalid synced log format.");
  return parsed as ReportRecord[];
}
