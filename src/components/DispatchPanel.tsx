"use client";

import { useState } from "react";
import type { Platform } from "@/lib/platforms";

type DispatchState = "idle" | "sending" | "success";

interface DispatchPanelProps {
  platform: Platform;
  noticeText: string;
  onSubmitted: () => void;
  canSubmit: boolean;
}

export default function DispatchPanel({
  platform,
  noticeText,
  onSubmitted,
  canSubmit,
}: DispatchPanelProps) {
  const [state, setState] = useState<DispatchState>("idle");
  const [copied, setCopied] = useState(false);

  // Mocked automated dispatch: simulates an API Notice-and-Action call.
  async function simulateApiDispatch() {
    setState("sending");
    // No network request is made — this is a local simulation only.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setState("success");
    onSubmitted();
  }

  async function copyAndOpen() {
    try {
      await navigator.clipboard.writeText(noticeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be blocked */
    }
    if (platform.reportUrl) {
      window.open(platform.reportUrl, "_blank", "noopener,noreferrer");
    }
    setState("success");
    onSubmitted();
  }

  /* ----- Closed platform: copy-to-clipboard + open official form ----- */
  if (platform.dispatch === "closed") {
    return (
      <div className="rds-card">
        <h2 className="text-lg font-semibold text-calm-800">
          4 · Submit via the official form
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-calm-600">
          {platform.name} doesn&apos;t offer an automated interface. We&apos;ve
          prepared your notice so you can paste it straight into their official
          form.
        </p>

        <div className="mt-4 rounded-xl border border-lavender-200 bg-lavender-50 px-4 py-3 text-sm text-lavender-900/80">
          You stay in control: review the text above, then copy it and submit it
          yourself through the official channel.
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={copyAndOpen}
            className="rds-btn-primary"
          >
            {copied ? "Copied ✓" : "Copy to clipboard"}
            {platform.reportUrl ? " & open official form" : ""}
          </button>
          {!platform.reportUrl && (
            <span className="self-center text-xs text-calm-500">
              No standard URL — send the copied notice to the host&apos;s abuse
              contact.
            </span>
          )}
        </div>

        {state === "success" && (
          <p className="mt-3 rounded-xl bg-sage-100 px-4 py-3 text-sm font-medium text-sage-700">
            Logged. We&apos;ve saved this report to your private case log so you
            can track the follow-up.
          </p>
        )}
      </div>
    );
  }

  /* ----- Open platform: mocked automated API dispatch ----- */
  return (
    <div className="rds-card">
      <h2 className="text-lg font-semibold text-calm-800">4 · Submit report</h2>
      <p className="mt-1 text-sm leading-relaxed text-calm-600">
        We&apos;ll dispatch your DSA Notice-and-Action request to{" "}
        {platform.name}.{" "}
        <span className="text-calm-500">
          (In this prototype the dispatch is simulated — no data is sent over the
          network.)
        </span>
      </p>

      <div className="mt-4">
        {state !== "success" ? (
          <button
            type="button"
            disabled={!canSubmit || state === "sending"}
            onClick={simulateApiDispatch}
            className="rds-btn-primary"
          >
            {state === "sending" ? (
              <>
                <Spinner /> Dispatching securely…
              </>
            ) : (
              "Submit report"
            )}
          </button>
        ) : (
          <div className="rounded-xl border border-sage-200 bg-sage-100 px-4 py-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-sage-700">
              <span aria-hidden>✓</span> Report dispatched successfully
            </p>
            <p className="mt-1 text-sm text-sage-700/90">
              {platform.name} has received your notice reference. We&apos;ve added
              it to your private case log so you can follow up.
            </p>
          </div>
        )}
      </div>

      {!canSubmit && (
        <p className="mt-3 text-xs text-calm-500">
          Add a content link above to enable submission.
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
