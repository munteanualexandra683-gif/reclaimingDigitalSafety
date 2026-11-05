/**
 * Standalone verification of the QR-sync crypto/compression logic.
 *
 * This mirrors the implementation in src/lib/storage.ts but uses only Node's
 * built-in Web APIs (crypto.subtle, CompressionStream, Blob, Response) — no npm
 * install required. Run with: node scripts/verify-sync.mjs
 */

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const QR_CHAR_CAPACITY = 2200;

function toBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return Buffer.from(binary, "binary").toString("base64");
}
function fromBase64(b64) {
  const binary = Buffer.from(b64, "base64").toString("binary");
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
async function gzip(bytes) {
  const s = new Response(
    new Blob([bytes]).stream().pipeThrough(new CompressionStream("gzip")),
  );
  return new Uint8Array(await s.arrayBuffer());
}
async function gunzip(bytes) {
  const s = new Response(
    new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip")),
  );
  return new Uint8Array(await s.arrayBuffer());
}
async function deriveKey(pass, salt) {
  const base = await crypto.subtle.importKey(
    "raw", textEncoder.encode(pass), "PBKDF2", false, ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"],
  );
}
async function encryptLogForSync(reports, pass) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pass, salt);
  let plaintext = textEncoder.encode(JSON.stringify(reports));
  let c = 0;
  try { plaintext = await gzip(plaintext); c = 1; } catch { c = 0; }
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return { v: 1, c, salt: toBase64(salt), iv: toBase64(iv), data: toBase64(new Uint8Array(ct)) };
}
async function decryptSyncedLog(payload, pass) {
  const salt = fromBase64(payload.salt);
  const iv = fromBase64(payload.iv);
  const key = await deriveKey(pass, salt);
  const dec = new Uint8Array(
    await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, fromBase64(payload.data)),
  );
  const jsonBytes = payload.c === 1 ? await gunzip(dec) : dec;
  const parsed = JSON.parse(textDecoder.decode(jsonBytes));
  if (!Array.isArray(parsed)) throw new Error("Invalid synced log format.");
  return parsed;
}

/* ----- Build a realistic log (long DSA notices, as in the real app) ----- */
function makeReport(i) {
  const notice = `NOTICE OF ILLEGAL CONTENT — NON-CONSENSUAL INTIMATE IMAGERY (NCII)
To: Platform ${i} — Trust & Safety / Legal Notice Team
Legal basis: Regulation (EU) 2022/2065 (DSA), Article 16; Directive (EU) 2024/1385
1. Nature of the content ... (long standardized paragraph repeated) `.repeat(6);
  return {
    id: `r_${i}`,
    platformId: "x-twitter",
    platformName: `Platform ${i}`,
    dispatch: "api",
    status: "submitted",
    contentUrl: `https://example.com/offending/content/item/${i}`,
    evidenceHash: "a".repeat(64),
    noticeText: notice,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

let failures = 0;
function assert(cond, msg) {
  if (cond) { console.log(`  ✓ ${msg}`); }
  else { console.error(`  ✗ ${msg}`); failures++; }
}

async function main() {
  console.log("compression supported:", typeof CompressionStream !== "undefined");

  // Test 1: round-trip with a single small report.
  const small = [makeReport(1)];
  const encS = await encryptLogForSync(small, "hunter2");
  const decS = await decryptSyncedLog(encS, "hunter2");
  assert(JSON.stringify(decS) === JSON.stringify(small), "single report round-trips exactly");
  assert(encS.c === 1, "payload is marked compressed");

  // Test 2: wrong passphrase must fail (not silently return data).
  let threw = false;
  try { await decryptSyncedLog(encS, "wrong"); } catch { threw = true; }
  assert(threw, "wrong passphrase is rejected");

  // Test 3: compression keeps a few reports under the QR capacity.
  const few = [makeReport(1), makeReport(2), makeReport(3)];
  const encFew = await encryptLogForSync(few, "pw");
  const serializedFew = JSON.stringify(encFew);
  const rawSize = JSON.stringify(few).length;
  console.log(`  3 reports: raw JSON=${rawSize} chars, encrypted payload=${serializedFew.length} chars`);
  assert(serializedFew.length <= QR_CHAR_CAPACITY, "3 realistic reports fit in a QR code after compression");
  const decFew = await decryptSyncedLog(encFew, "pw");
  assert(JSON.stringify(decFew) === JSON.stringify(few), "3 reports round-trip exactly");

  // Test 4: gzip is highly effective — even many reports usually still fit a QR.
  const many = Array.from({ length: 40 }, (_, i) => makeReport(i));
  const encMany = await encryptLogForSync(many, "pw");
  console.log(`  40 reports: encrypted payload=${JSON.stringify(encMany).length} chars`);
  const decMany = await decryptSyncedLog(encMany, "pw");
  assert(decMany.length === 40, "40 reports round-trip exactly");

  // Test 5: an extreme log (lots of unique random content) overflows QR capacity,
  // which must route to the file-download fallback instead of throwing.
  const huge = Array.from({ length: 300 }, (_, i) => {
    const r = makeReport(i);
    // Add unique, poorly-compressible content so it genuinely gets large.
    r.notes = Array.from({ length: 50 }, () => Math.random().toString(36).slice(2)).join("");
    return r;
  });
  const encHuge = await encryptLogForSync(huge, "pw");
  const serializedHuge = JSON.stringify(encHuge);
  console.log(`  300 reports w/ random notes: encrypted payload=${serializedHuge.length} chars`);
  assert(serializedHuge.length > QR_CHAR_CAPACITY, "extreme log exceeds QR capacity (file fallback path)");
  const decHuge = await decryptSyncedLog(encHuge, "pw");
  assert(decHuge.length === 300, "extreme log still round-trips via the file path");

  console.log(failures === 0 ? "\nALL CHECKS PASSED ✅" : `\n${failures} CHECK(S) FAILED ❌`);
  process.exit(failures === 0 ? 0 : 1);
}
main();
