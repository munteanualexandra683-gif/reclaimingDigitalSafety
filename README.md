# Reclaiming Digital Safety

A **privacy-preserving, client-side-only** digital navigator that helps EU-based
women (aged 18–24) who are survivors of non-consensual intimate imagery (NCII)
prepare, submit, and track platform takedown reports.

> **This tool does not provide legal or clinical advice and does not guarantee
> content removal.** It is a structured navigation and drafting aid. For
> emotional support or legal guidance, please contact a trusted person or an
> accredited support organisation in your country. If you are in immediate
> danger, contact local emergency services.

---

## Core architectural guarantee: zero-knowledge, client-side only

This application runs **entirely in the browser**. It is configured for Next.js
[static export](https://nextjs.org/docs/app/guides/static-exports) (`output:
"export"`), so there is **no server runtime** that could receive, process, or
store any uploaded file.

- **Images never leave the device.** Files are fingerprinted locally with the
  browser's [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API)
  (SHA-256). The raw image bytes are read into memory and discarded — never
  uploaded or transmitted.
- **No accounts, no telemetry.** There is no sign-up and no cloud database.
- **Your case log lives only in `localStorage`** and can be permanently deleted
  by you at any time.
- **Cross-device sync is end-to-end encrypted.** The "Sync to Phone" feature
  encrypts your log with AES-GCM (key derived from your passphrase via PBKDF2)
  and renders it as a QR code. The data transfers device-to-device with no
  cloud account and no server copy.

## Features

| Module | What it does |
| --- | --- |
| **1. Zero-Knowledge Evidence** | Select an image; a SHA-256 fingerprint is computed locally and displayed, with a clear "Your file never leaves this device" disclaimer. |
| **2. Dynamic Triage & DSA Templating** | A multi-step intake form asks where the content is hosted and auto-populates a standardized EU Digital Services Act (Reg. (EU) 2022/2065, Art. 16) takedown notice with placeholders for the hash, date, and platform. Fully editable before submission. |
| **3. Automated API Dispatch (mocked)** | "Submit Report" simulates an automated Notice-and-Action API call with a 2-second loading state and a success confirmation. For **closed platforms**, it generates a pre-filled text block with a "Copy to Clipboard & Open Official Form" action. |
| **4. Encrypted Local Follow-Up Log & QR Sync** | A dashboard tracks report status in `localStorage`. "Sync to Phone" encrypts the log and shows it as a QR code for cloud-free multi-device transfer. |

## User flow (stages)

`Discover & Assess` → `Reporting Pathway Identification` → `Report Preparation` → `Follow-up`

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, configured for static export / client-side rendering)
- [React 19](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [qrcode.react](https://github.com/zpao/qrcode.react) for QR generation
- Browser [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API) for hashing and encryption

## Getting started

Requires Node.js 18+ (tested with Node 22).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

> **Note on the Web Crypto API:** `crypto.subtle` requires a *secure context*.
> `http://localhost` counts as secure, so local development works. If you deploy,
> serve the site over **HTTPS** or hashing/encryption will be unavailable.

### Production build (static export)

```bash
npm run build
```

The fully static site is emitted to `out/`. Serve it from any static host
(GitHub Pages, Netlify, S3, etc.) over HTTPS. No backend required.

## Cross-device sync (QR + encrypted file)

The log is gzip-compressed (via the browser's built-in `CompressionStream`) and
then encrypted with AES-GCM before being shared. Thanks to compression, a
typical log of dozens of reports fits comfortably in a **single QR code**. For
very large logs that exceed a QR code's capacity, the UI automatically offers an
**encrypted `.rdsync` file download** instead of attempting (and failing) to
render an oversized QR code. The receiving device can import either the scanned
QR text or the `.rdsync` file. The passphrase never leaves your device.

You can validate the sync cryptography without installing dependencies (it uses
only built-in Web APIs available in Node 18+):

```bash
node scripts/verify-sync.mjs
```

This exercises encrypt → compress → decrypt round-trips, wrong-passphrase
rejection, QR-capacity sizing, and the large-log file-fallback path.

## Verifying the privacy guarantee

Open your browser's DevTools → **Network** tab, then upload an image and submit a
report. You will see **no outbound request carrying the image or report data** —
all processing is local. This is the "network inspection" check described in the
project's evaluation plan.

## Project structure

```
src/
  app/
    layout.tsx          # Root layout, persistent disclaimer, header
    page.tsx            # Home — Discover & Assess
    report/page.tsx     # Intake → DSA template → dispatch
    dashboard/page.tsx  # Encrypted local follow-up log + QR sync
    globals.css         # Trauma-informed theme tokens
  components/
    EvidenceModule.tsx    # Local SHA-256 hashing UI
    DispatchPanel.tsx     # Mocked API dispatch / closed-platform copy flow
    SyncPanel.tsx         # Encrypted QR sync (send/receive)
    StageIndicator.tsx    # 4-stage progress indicator
    SiteHeader.tsx
    PersistentDisclaimer.tsx
  lib/
    hashing.ts          # Web Crypto SHA-256 fingerprinting
    platforms.ts        # Platform catalog (api vs. closed dispatch)
    template.ts         # DSA Notice-and-Action templating engine
    storage.ts          # localStorage CRUD + AES-GCM encryption for sync
```

## Disclaimer

This is a prototype / MVP built for a defined pilot context. Support resources
and platform endpoints should be verified with accredited regional
organisations before any real-world deployment. The dispatch layer is
**mocked** — no reports are actually sent to platforms.
