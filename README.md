# NEST

> **About the name.** NEST is deliberately neutral: the name, the browser-tab
> title, and the icon do not reveal what the app is for, so it is safer to
> have open on a shared device. Always write it in capitals. There is no long
> form. Internal identifiers (`localStorage` keys such as `rds.cases.v1`, the
> `.rdsync` sync format, CSS classes such as `rds-card`) keep their old `rds`
> prefix on purpose so that existing saved cases still load.

A **privacy-preserving, client-side-only** digital navigator that helps EU-based
women (aged 18–24) who are survivors of non-consensual intimate imagery (NCII)
prepare, submit, and track platform takedown reports.

> **This tool does not provide legal or clinical advice and does not guarantee
> content removal.** It is a structured navigation and drafting aid. For
> emotional support or legal guidance, please contact a trusted person or an
> accredited support organisation in your country. If you are in immediate
> danger, contact local emergency services.

---

## Core architectural guarantee: client-side only

This application runs **entirely in the browser**. It is configured for Next.js
[static export](https://nextjs.org/docs/app/guides/static-exports) (`output:
"export"`), so there is **no server runtime** that could receive, process, or
store any data.

- **No images needed, and files never leave the device.** The flow works with
  links. Fingerprinting a file is optional and happens locally with the
  browser's [Web Crypto API](https://developer.mozilla.org/docs/Web/API/Web_Crypto_API)
  (SHA-256); the file is never uploaded or displayed.
- **No accounts, no analytics, no telemetry.** There is no sign-up and no
  cloud database, and no user data is placed in any network request.
- **The case log lives only in `localStorage`, unencrypted.** It is readable
  by anyone using the same browser profile, which matters on a shared device.
  The UI says so and offers "Delete everything" (with confirmation). Name and
  email typed for a report are kept in memory only and are never stored.
- **Moving the log to another device is encrypted.** The QR code / `.rdsync`
  file is encrypted with AES-GCM (key from a passphrase of at least 6
  characters via PBKDF2). There is no default passphrase.
- **Platform sending is simulated.** Nothing is sent to any platform; the UI
  labels it "simulated". Manual routes are copied and submitted by the person
  on the official form.

## Features

| Area | What it does |
| --- | --- |
| **Guided case (`/case`)** | Five stages (below). Records where the content appears (links only), lets the person decide what to do (report now, keep a record only, talk to someone first, not now), suggests reporting routes per platform, prepares the texts once, shows exactly what each recipient would receive, and saves everything locally. Save-and-leave and resume at any step. |
| **Case log (`/dashboard`)** | Tracks each report's status, reference and expected answer date; shows a reminder text when no answer has arrived, a review-request text when a report is declined, and records escalations. "It appeared again" starts a new report without touching earlier ones. |
| **Move to another device** | Encrypted QR code or `.rdsync` file, passphrase required. |
| **Safety** | Quick exit on every page (button or Esc twice outside form fields; opens a weather site and Back does not return), explained on the home page and in step 1; neutral tab title "NEST" on every page; English with Spanish backup. |

`/report` (the former single-report flow) now redirects to `/case`.

## User flow (stages)

`Discover & assess` → `Decide whether to seek help` → `Reporting pathway` →
`Prepare & submit` → `Follow-up & support`

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

Open your browser's DevTools → **Network** tab, then go through a case and
"send" it. You will see **no outbound request carrying case data**: all
processing is local. Links to official forms open in a new tab without a
referrer and carry no case data (the text is copied to the clipboard instead).

## Project structure

```
src/
  app/
    layout.tsx          # Root layout: header, footer, disclaimer, quick exit
    page.tsx            # Home
    case/page.tsx       # Guided five-stage case
    dashboard/page.tsx  # Case log + move to another device
    report/page.tsx     # Redirect to /case (old links keep working)
    globals.css         # Theme tokens and component classes
  components/
    EvidenceModule.tsx       # Optional local file fingerprint
    PersistentDisclaimer.tsx
    QuickExit.tsx
    SiteFooter.tsx
    SiteHeader.tsx           # Navigation and language
    StageIndicator.tsx       # Five-stage progress (compact on phones)
    SupportDirectory.tsx     # Spain directory + EU numbers (unverified)
    SyncPanel.tsx            # Encrypted QR / file transfer
  data/
    directory.es.ts     # Spain support directory (unverified candidates)
  lib/
    caseRoutes.ts       # Route suggestions; merging keeps earlier choices
    dictionary.en.ts    # English strings (default, complete)
    dictionary.es.ts    # Spanish strings (backup; falls back to English)
    hashing.ts          # Web Crypto SHA-256 fingerprinting
    i18n.ts             # t(), language switching, date formatting
    platforms.ts        # Platform catalog (simulated vs. manual sending)
    storage.ts          # localStorage CRUD + AES-GCM encryption for transfer
    useSavedCase.ts     # "Get started" vs "Continue my case"
    template.ts         # Notice texts sent to platforms (English)
```

## Disclaimer

This is a prototype / MVP built for a defined pilot context (Spain). Legal
content, support resources and platform endpoints are marked "to be verified
with a partner organisation" and must be verified before any real-world use.
Sending is **simulated**: no reports are actually sent to platforms. Spanish
copy marked `TODO(review-es)` needs review by a Spanish partner.

## About the project

*(Moved here from the home page, which now speaks only to the person using
NEST.)*

NEST was developed to improve how people affected by AI-generated
non-consensual intimate imagery navigate reporting procedures. It focuses on
women aged 18–24 across the European Union, regardless of race, ethnicity,
nationality, social background, profession or occupation, a group identified
by research and civil society as facing acute risks of technology-facilitated
gender-based violence.

The aim is to reduce the time, uncertainty and repeated effort involved in
reporting intimate-image abuse, through a privacy-preserving, survivor-centred
tool that connects evidence documentation, reporting guidance, notice
preparation and follow-up in one place.

**UN Sustainable Development Goals.** The project contributes to SDG 3 (Good
Health & Well-being), SDG 5 (Gender Equality), SDG 10 (Reduced Inequalities)
and SDG 16 (Peace, Justice & Strong Institutions).

**Long-term vision: Trusted Flagger.** In the long term the team aims to build
the expertise, partnerships and organisational capacity needed to apply for
Trusted Flagger status under Article 22 of the EU Digital Services Act:

1. *Rigorous technology*: develop and evaluate the privacy-preserving
   reporting technology to high security standards.
2. *Cross-sector alliances*: partnerships with victim-support organisations,
   legal experts, researchers and digital-rights initiatives.
3. *Designated independence*: the expertise, independence and reliable
   reporting procedures required for designation.

Trusted Flagger status is granted by the national Digital Services
Coordinator after an eligibility assessment. It does not guarantee content
removal, and NEST does not currently hold this status.
