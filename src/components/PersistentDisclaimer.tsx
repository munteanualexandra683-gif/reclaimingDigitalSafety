"use client";

/**
 * A persistent, non-dismissible footer disclaimer shown on every screen.
 * Intentionally calm (no alarming colors) but always present.
 */
export default function PersistentDisclaimer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-calm-200 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-start gap-3 px-4 py-3 sm:px-6">
        <span
          aria-hidden
          className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-lavender-100 text-lavender-700"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path
              d="M12 11v5M12 7.5h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="text-xs leading-relaxed text-calm-600">
          This tool does not provide legal or clinical advice and does not
          guarantee content removal. It helps you organise and prepare reports;
          decisions and outcomes rest with the platforms and relevant
          authorities. If you are in immediate danger, contact local emergency
          services.
        </p>
      </div>
    </footer>
  );
}
