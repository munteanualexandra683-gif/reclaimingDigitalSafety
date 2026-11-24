"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StageIndicator, { type StageKey } from "@/components/StageIndicator";
import EvidenceModule from "@/components/EvidenceModule";
import SupportDirectory from "@/components/SupportDirectory";
import type { FileFingerprint } from "@/lib/hashing";
import { formatDate, useLanguage, useT, type TKey } from "@/lib/i18n";
import { detectPlatformId, getPlatform, PLATFORMS } from "@/lib/platforms";
import { buildRoutes, describeRoute, officialUrl } from "@/lib/caseRoutes";
import {
  buildAepdSummary,
  buildDeindexRequest,
  buildDsaNoticeForUrls,
  buildHostAbuseReport,
  buildStopNciiHandoff,
} from "@/lib/template";
import {
  addOrUpdateCase,
  addReport,
  caseHasContent,
  deleteCaseAndReports,
  loadCases,
  makeId,
  updateReport,
  type Case,
  type Location,
  type ReportRecord,
  type Route,
} from "@/lib/storage";

const KEYS: StageKey[] = ["discover", "help", "pathway", "preparation", "followup"];
const STAGE_TITLES: TKey[] = ["stageDiscover", "stageHelp", "stagePathway", "stagePrepare", "stageFollowup"];
const DAY = 24 * 60 * 60 * 1000;

type View = "loading" | "resume" | "wizard" | "saved";
type Decision = NonNullable<Case["decision"]>;

const DECISIONS: { value: Decision; title: TKey; text: TKey }[] = [
  { value: "report-now", title: "caseDecideReportNow", text: "caseDecideReportNowText" },
  { value: "document-only", title: "caseDecideDocument", text: "caseDecideDocumentText" },
  { value: "talk-first", title: "caseDecideTalk", text: "caseDecideTalkText" },
  { value: "not-now", title: "caseDecideNotNow", text: "caseDecideNotNowText" },
];

interface SentItem {
  routeId: string;
  reportId: string;
  simulated: boolean;
  markedSent: boolean;
}

function newCase(): Case {
  const now = new Date().toISOString();
  return {
    id: makeId(), createdAt: now, updatedAt: now, country: "Spain",
    description: "", decision: undefined, locations: [], routes: [], reportIds: [], step: 0,
  };
}

export default function CasePage() {
  const t = useT();
  const language = useLanguage();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const repeatInputRef = useRef<HTMLInputElement>(null);
  // Always holds the latest case so several saves in a row never use stale data.
  const caseRef = useRef<Case | null>(null);

  const [view, setView] = useState<View>("loading");
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [stage, setStage] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Stage 1: location form
  const [locUrl, setLocUrl] = useState("");
  const [locPlatform, setLocPlatform] = useState("other");
  const [noLink, setNoLink] = useState(false);
  const [locAccount, setLocAccount] = useState("");
  const [locSeen, setLocSeen] = useState("");
  const [locNote, setLocNote] = useState("");

  // Stage 4: prepare. Name, email and edited texts are kept in memory only.
  const [fingerprint, setFingerprint] = useState<FileFingerprint | null>(null);
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [edited, setEdited] = useState<Record<string, string>>({});
  const [reviewed, setReviewed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<SentItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Stage 5
  const [showSupport, setShowSupport] = useState(false);
  const [repeatUrl, setRepeatUrl] = useState("");

  /* ----------------------------- Loading & saving ----------------------------- */

  function load(item: Case) {
    caseRef.current = item;
    setCaseData(item);
    setDescription(item.description);
    setStage(Math.min(Math.max(item.step ?? 0, 0), 4));
  }

  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get("go");
    const latest = loadCases()[0];
    if (!latest) {
      load(newCase());
      setView("wizard");
      return;
    }
    load(latest);
    if (intent === "again") {
      setStage(4);
      setView("wizard");
      setTimeout(() => repeatInputRef.current?.focus(), 50);
    } else if (intent === "continue" || !caseHasContent(latest)) {
      setView("wizard");
    } else {
      setView("resume");
    }
  }, []);

  useEffect(() => {
    if (view === "wizard" || view === "resume" || view === "saved") headingRef.current?.focus();
  }, [stage, view]);

  function save(patch: Partial<Case>) {
    const base = caseRef.current;
    if (!base) return;
    const next: Case = { ...base, ...patch, updatedAt: new Date().toISOString() };
    caseRef.current = next;
    setCaseData(next);
    addOrUpdateCase(next);
  }

  function goTo(index: number) {
    setStage(index);
    save({ step: index });
    window.scrollTo({ top: 0 });
  }

  function leave() {
    save({ step: stage });
    setView("saved");
    window.scrollTo({ top: 0 });
  }

  function startNew() {
    load(newCase());
    setDescription("");
    setFingerprint(null);
    setEdited({});
    setSent([]);
    setConfirmDelete(false);
    setView("wizard");
  }

  function deleteThisCase() {
    if (caseRef.current) deleteCaseAndReports(caseRef.current.id);
    startNew();
    setNotice(t("caseDeleted"));
  }

  /* ----------------------------- Stage 1: locations ----------------------------- */

  function addLocation() {
    const base = caseRef.current;
    if (!base) return;
    const url = noLink ? "" : locUrl.trim();
    const note = locNote.trim();
    if (!url && !note) return;
    const location: Location = {
      id: makeId(),
      url,
      platformId: locPlatform,
      account: locAccount.trim() || undefined,
      seenAt: locSeen || undefined,
      note: note || undefined,
    };
    const locations = [...base.locations, location];
    save({ locations, routes: buildRoutes(locations, base.routes) });
    setLocUrl(""); setLocPlatform("other"); setLocAccount(""); setLocSeen(""); setLocNote(""); setNoLink(false);
  }

  function removeLocation(id: string) {
    const base = caseRef.current;
    if (!base) return;
    const locations = base.locations.filter((item) => item.id !== id);
    save({ locations, routes: buildRoutes(locations, base.routes) });
  }

  /* ----------------------------- Stage 3/4: routes ----------------------------- */

  const locations = caseData?.locations ?? [];
  const routes = caseData?.routes ?? [];
  const selectedRoutes = routes.filter((route) => route.selected);

  function toggleRoute(id: string) {
    const base = caseRef.current;
    if (!base) return;
    save({ routes: base.routes.map((route) => (route.id === id ? { ...route, selected: !route.selected } : route)) });
  }

  function generatedText(route: Route): string {
    const location = locations.find((item) => item.id === route.locationId);
    const urls = route.locationId
      ? (location?.url ? [location.url] : [])
      : locations.map((item) => item.url).filter(Boolean);
    const input = {
      platformName: location ? getPlatform(location.platformId)?.name : undefined,
      description,
      urls,
      account: location?.account,
      reporterName,
      contactEmail,
      evidenceHash: fingerprint?.sha256,
    };
    if (route.type === "deindex") return buildDeindexRequest(input);
    if (route.type === "national") return buildAepdSummary(input);
    if (route.type === "host-abuse") return buildHostAbuseReport(input);
    if (route.type === "hash-handoff") return buildStopNciiHandoff();
    return buildDsaNoticeForUrls(input);
  }

  function textFor(route: Route): string {
    return edited[route.id] ?? generatedText(route);
  }

  function sharedItems(route: Route): string {
    if (route.type === "hash-handoff") return t("caseShareHash");
    const items = [
      reporterName.trim() ? t("caseShareName") : t("caseSharePlaceholder"),
      ...(contactEmail.trim() ? [t("caseShareEmail")] : []),
      t("caseShareLinks"),
      t("caseShareDescription"),
      ...(fingerprint ? [t("caseShareFingerprint")] : []),
    ];
    return items.join(", ");
  }

  async function sendSelected() {
    const base = caseRef.current;
    if (!base || !reviewed) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const now = new Date().toISOString();
    const items: SentItem[] = [];
    const reportIds = [...base.reportIds];

    const nextRoutes = base.routes.map((route) => {
      if (!route.selected) return route;
      const info = describeRoute(route, base.locations, t);
      const location = base.locations.find((item) => item.id === route.locationId);
      const platform = location ? getPlatform(location.platformId) : undefined;
      // Only platform notices to "api" platforms are "sent", and that is simulated.
      const simulated = platform?.dispatch === "api" && route.type === "dsa-notice";
      const record: ReportRecord = {
        id: makeId(),
        caseId: base.id,
        routeType: route.type,
        platformId: location?.platformId ?? route.type,
        platformName: info.recipient,
        dispatch: simulated ? "api" : "closed",
        status: simulated ? "submitted" : "draft",
        contentUrl: location?.url ?? "",
        evidenceHash: fingerprint?.sha256,
        noticeText: textFor(route),
        createdAt: now,
        updatedAt: now,
        expectedResponseBy: simulated ? new Date(Date.now() + 7 * DAY).toISOString() : undefined,
      };
      addReport(record);
      reportIds.push(record.id);
      items.push({ routeId: route.id, reportId: record.id, simulated, markedSent: simulated });
      return { ...route, selected: false, status: simulated ? ("submitted" as const) : ("prepared" as const) };
    });

    save({ routes: nextRoutes, reportIds });
    setSent(items);
    setReviewed(false);
    setSending(false);
  }

  async function copyAndOpen(item: SentItem) {
    const route = routes.find((r) => r.id === item.routeId);
    if (!route) return;
    try {
      await navigator.clipboard.writeText(textFor(route));
    } catch {
      /* clipboard may be blocked; the official page still opens */
    }
    setCopiedId(item.routeId);
    setTimeout(() => setCopiedId(null), 1800);
    const location = locations.find((l) => l.id === route.locationId);
    const url = officialUrl(route.type, location?.platformId);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  function markSent(item: SentItem) {
    updateReport(item.reportId, {
      status: "submitted",
      expectedResponseBy: new Date(Date.now() + 7 * DAY).toISOString(),
    });
    const base = caseRef.current;
    if (base) {
      save({ routes: base.routes.map((r) => (r.id === item.routeId ? { ...r, status: "submitted" as const } : r)) });
    }
    setSent((list) => list.map((s) => (s.routeId === item.routeId ? { ...s, markedSent: true } : s)));
  }

  /* ----------------------------- Stage 5: appeared again ----------------------------- */

  function addRepeat() {
    const base = caseRef.current;
    const url = repeatUrl.trim();
    if (!base || !url) return;
    const location: Location = {
      id: makeId(),
      url,
      platformId: detectPlatformId(url),
      seenAt: new Date().toISOString().slice(0, 10),
      note: t("caseRepeatNote"),
    };
    const nextLocations = [...base.locations, location];
    save({ locations: nextLocations, routes: buildRoutes(nextLocations, base.routes), decision: "report-now" });
    setRepeatUrl("");
    setSent([]);
    goTo(2);
  }

  /* ----------------------------- Rendering ----------------------------- */

  if (view === "loading" || !caseData) {
    return <div className="mx-auto max-w-3xl px-4 py-10 text-calm-700">{t("loading")}</div>;
  }

  const deleteControls = confirmDelete ? (
    <div className="mt-4 rounded-xl border border-lavender-300 bg-lavender-50 p-4" role="alert">
      <p className="text-sm text-calm-800">{t("caseDeleteConfirm")}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" className="rds-btn-secondary border-lavender-400 text-lavender-800" onClick={deleteThisCase}>
          {t("caseDeleteYes")}
        </button>
        <button type="button" className="rds-btn-secondary" onClick={() => setConfirmDelete(false)}>
          {t("cancel")}
        </button>
      </div>
    </div>
  ) : (
    <button
      type="button"
      className="mt-4 text-sm font-medium text-lavender-800 underline underline-offset-2"
      onClick={() => setConfirmDelete(true)}
    >
      {t("caseDelete")}
    </button>
  );

  /* Resume screen */
  if (view === "resume") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-32 pt-10 sm:px-6">
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl text-ink">
          {t("caseResumeTitle")}
        </h1>
        <p className="mt-2 text-calm-700">
          {t("caseResumeText", {
            date: formatDate(caseData.updatedAt, language),
            stage: t(STAGE_TITLES[stage]),
          })}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="rds-btn-primary" onClick={() => setView("wizard")}>
            {t("caseResumeContinue")}
          </button>
          <button type="button" className="rds-btn-secondary" onClick={startNew}>
            {t("caseResumeNew")}
          </button>
        </div>
        <p className="mt-3 text-xs text-calm-600">{t("caseResumeNewHint")}</p>
        {deleteControls}
      </div>
    );
  }

  /* Saved-and-left screen */
  if (view === "saved") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 pb-32 pt-10 sm:px-6">
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl text-ink">
          {t("caseSavedTitle")}
        </h1>
        <p className="mt-2 text-calm-700">{t("caseSavedText")}</p>
        <p className="mt-3 rounded-xl border border-sand-200 bg-sand-50 p-3 text-sm text-calm-700">
          {t("caseSavedShared")}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="rds-btn-primary">{t("caseSavedHome")}</Link>
          <button type="button" className="rds-btn-secondary" onClick={() => setView("wizard")}>
            {t("caseSavedBack")}
          </button>
        </div>
        {deleteControls}
      </div>
    );
  }

  const decision = caseData.decision;
  const documentMode = decision === "document-only";

  /* Primary action for the bottom bar, one per stage */
  let primary: { label: string; onClick: () => void; disabled?: boolean } | null = null;
  let hint: string | null = null;
  if (stage === 0) primary = { label: t("continue"), onClick: () => goTo(1) };
  if (stage === 1) {
    if (!decision) {
      primary = { label: t("continue"), onClick: () => undefined, disabled: true };
      hint = t("caseDecideHint");
    } else if (decision === "report-now") primary = { label: t("caseDecideGoRoutes"), onClick: () => goTo(2) };
    else if (decision === "document-only") primary = { label: t("caseDecideGoDocument"), onClick: () => goTo(3) };
    else primary = { label: t("saveLeave"), onClick: leave };
  }
  if (stage === 2) {
    primary = { label: t("casePathwayContinue"), onClick: () => goTo(3), disabled: selectedRoutes.length === 0 };
    if (selectedRoutes.length === 0 && routes.length > 0) hint = t("casePathwayChooseHint");
  }
  if (stage === 3 && documentMode) primary = { label: t("saveLeave"), onClick: leave };
  if (stage === 3 && !documentMode && sent.length > 0) primary = { label: t("casePrepareGoFollowup"), onClick: () => goTo(4) };
  const showLeaveLink = primary?.onClick !== leave;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-32 pt-6 sm:px-6 sm:pt-8">
      <StageIndicator current={KEYS[stage]} />

      {notice && (
        <p className="mb-4 rounded-xl bg-sage-100 px-4 py-3 text-sm text-sage-700" role="status">
          {notice}
        </p>
      )}

      <h1 ref={headingRef} tabIndex={-1} className="mb-3 text-3xl text-ink sm:text-[2.25rem]">
        {t(STAGE_TITLES[stage])}
      </h1>

      {/* ============================ Stage 1 ============================ */}
      {stage === 0 && (
        <div className="flex flex-col gap-5">
          <p className="text-calm-700">{t("caseDiscoverIntro")}</p>
          <p className="border-l-2 border-calm-300 pl-3 text-sm text-calm-700">{t("quickExitExplain")}</p>

          <section className="rds-card" aria-labelledby="where-title">
            <h2 id="where-title" className="text-lg font-semibold text-calm-900">{t("caseWhereTitle")}</h2>
            <p className="mt-1 text-sm text-calm-700">{t("caseWhereText")}</p>

            {locations.length > 0 && (
              <ul className="mt-4 space-y-2">
                {locations.map((location) => (
                  <li key={location.id} className="flex items-start justify-between gap-3 rounded-xl border border-calm-200 p-3 text-sm">
                    <div className="min-w-0">
                      <strong className="text-calm-900">{getPlatform(location.platformId)?.name ?? t("routeOtherPlatform")}</strong>
                      <p className="break-all text-calm-700">{location.url || location.note}</p>
                    </div>
                    <button
                      type="button"
                      className="flex-none text-sm font-medium text-lavender-800 underline underline-offset-2"
                      onClick={() => removeLocation(location.id)}
                      aria-label={t("caseWhereRemoveLabel", { place: getPlatform(location.platformId)?.name ?? t("routeOtherPlatform") })}
                    >
                      {t("caseWhereRemove")}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 grid gap-3">
              {!noLink && (
                <div>
                  <label className="rds-label" htmlFor="location-url">{t("caseWhereLink")}</label>
                  <input
                    id="location-url"
                    type="url"
                    inputMode="url"
                    placeholder="https://…"
                    className="rds-input"
                    value={locUrl}
                    onChange={(e) => {
                      setLocUrl(e.target.value);
                      setLocPlatform(detectPlatformId(e.target.value));
                    }}
                  />
                </div>
              )}
              <label className="flex items-center gap-2 text-sm text-calm-700">
                <input type="checkbox" checked={noLink} onChange={(e) => setNoLink(e.target.checked)} className="h-4 w-4" />
                {t("caseWhereNoLink")}
              </label>
              <div>
                <label className="rds-label" htmlFor="location-platform">{t("caseWherePlatform")}</label>
                <select id="location-platform" className="rds-input" value={locPlatform} onChange={(e) => setLocPlatform(e.target.value)}>
                  {PLATFORMS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              {noLink && (
                <div>
                  <label className="rds-label" htmlFor="location-note">{t("caseWhereDescribe")}</label>
                  <input id="location-note" className="rds-input" value={locNote} onChange={(e) => setLocNote(e.target.value)} placeholder={t("caseWhereDescribePlaceholder")} />
                </div>
              )}
              <details>
                <summary className="cursor-pointer text-sm font-medium text-accent">{t("caseWhereMore")}</summary>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="rds-label" htmlFor="location-account">{t("caseWhereAccount")}</label>
                    <input id="location-account" className="rds-input" value={locAccount} onChange={(e) => setLocAccount(e.target.value)} />
                  </div>
                  <div>
                    <label className="rds-label" htmlFor="location-date">{t("caseWhereDate")}</label>
                    <input id="location-date" type="date" className="rds-input" value={locSeen} onChange={(e) => setLocSeen(e.target.value)} />
                  </div>
                  {!noLink && (
                    <div className="sm:col-span-2">
                      <label className="rds-label" htmlFor="location-note-extra">{t("caseWhereNote")}</label>
                      <input id="location-note-extra" className="rds-input" value={locNote} onChange={(e) => setLocNote(e.target.value)} />
                    </div>
                  )}
                </div>
              </details>
            </div>
            <button
              type="button"
              className="rds-btn-secondary mt-4"
              disabled={noLink ? !locNote.trim() : !locUrl.trim()}
              onClick={addLocation}
            >
              {t("caseWhereAdd")}
            </button>
          </section>

          <details className="rds-card">
            <summary className="cursor-pointer font-semibold text-calm-900">{t("caseCheckTitle")}</summary>
            <p className="mt-2 text-sm text-calm-700">{t("caseCheckWarning")}</p>
            <ul className="mt-3 space-y-3 text-sm text-calm-700">
              {[
                { title: t("caseCheckImage"), text: t("caseCheckImageText"), links: [["Google Lens", "https://lens.google/"], ["Bing Visual Search", "https://www.bing.com/visualsearch"]] },
                { title: t("caseCheckName"), text: t("caseCheckNameText"), links: [["Google", "https://www.google.com/"], ["Bing", "https://www.bing.com/"]] },
                { title: t("caseCheckPlatforms"), text: t("caseCheckPlatformsText"), links: [] },
              ].map((item) => (
                <li key={item.title} className="rounded-xl border border-calm-200 p-3">
                  <strong className="text-calm-900">{item.title}</strong>
                  <p className="mt-1 text-calm-700">{item.text}</p>
                  {item.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-4">
                      {item.links.map(([label, href]) => (
                        <a key={href} className="font-medium text-accent underline underline-offset-2" href={href} target="_blank" rel="noopener noreferrer">
                          {t("caseCheckOpen", { name: label })}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </details>

          <section className="border-l-2 border-margin py-1 pl-5">
            <h2 className="font-semibold text-calm-900">{t("caseRightsTitle")}</h2>
            <p className="mt-1 text-sm text-calm-700">{t("caseRightsText")}</p>
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-accent">{t("caseRightsMore")}</summary>
              <p className="mt-2 text-sm text-calm-700">{t("caseRightsMoreText")}</p>
              <p className="mt-2 text-xs text-lavender-800">{t("toBeVerified")}</p>
            </details>
          </section>
        </div>
      )}

      {/* ============================ Stage 2 ============================ */}
      {stage === 1 && (
        <div className="flex flex-col gap-4">
          <p className="text-calm-700">{t("caseDecideIntro")}</p>
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label={t("caseDecideIntro")}>
            {DECISIONS.map((option) => {
              const active = decision === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    save({ decision: option.value });
                    setShowSupport(option.value === "talk-first");
                  }}
                  className={`rds-card text-left ${active ? "border-accent ring-2 ring-accent" : ""}`}
                >
                  <strong className="text-calm-900">{t(option.title)}</strong>
                  <p className="mt-1 text-sm text-calm-700">{t(option.text)}</p>
                </button>
              );
            })}
          </div>
          {(decision === "talk-first" || showSupport) && (
            <section className="rds-card" aria-labelledby="support-title">
              <h2 id="support-title" className="text-lg font-semibold text-calm-900">{t("caseSupportTitle")}</h2>
              <div className="mt-4"><SupportDirectory showEu={false} /></div>
              {decision === "talk-first" && (
                <button type="button" className="mt-4 text-sm font-medium text-accent underline underline-offset-2" onClick={() => goTo(2)}>
                  {t("caseDecideTalkRoutes")}
                </button>
              )}
            </section>
          )}
        </div>
      )}

      {/* ============================ Stage 3 ============================ */}
      {stage === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-calm-700">{t("casePathwayIntro")}</p>
          {routes.length === 0 && (
            <div className="rds-card text-sm text-calm-700">
              {t("casePathwayEmpty")}{" "}
              <button type="button" className="font-medium text-accent underline underline-offset-2" onClick={() => goTo(0)}>
                {t("casePathwayEmptyLink")}
              </button>
            </div>
          )}
          {routes.map((route, index) => {
            const info = describeRoute(route, locations, t);
            const done = route.status !== "draft";
            return (
              <div key={route.id} className={`rds-card ${route.selected ? "border-accent" : ""}`}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" checked={route.selected} onChange={() => toggleRoute(route.id)} className="mt-1 h-5 w-5 flex-none" />
                  <span>
                    <span className="block font-semibold text-calm-900">{index + 1}. {info.title}</span>
                    {done && (
                      <span className="mt-1 inline-block rounded-full bg-sage-200 px-2 py-0.5 text-xs font-medium text-sage-700">
                        {route.status === "submitted" ? t("casePathwayAlreadySent") : t("casePathwayAlreadyPrepared")}
                      </span>
                    )}
                    <span className="mt-1 block text-sm text-calm-700">{t("casePathwayNeeds", { items: info.needs.join(" · ") })}</span>
                  </span>
                </label>
                <details className="ml-8 mt-2">
                  <summary className="cursor-pointer text-sm font-medium text-accent">{t("learnMore")}</summary>
                  <p className="mt-2 text-sm text-calm-700">{info.about}</p>
                </details>
              </div>
            );
          })}
          {routes.length > 0 && (
            <details className="rounded-xl border border-calm-200 bg-calm-50 p-4 text-sm text-calm-700">
              <summary className="cursor-pointer font-medium text-calm-900">{t("casePathwayLawTitle")}</summary>
              <p className="mt-2">{t("casePathwayLawText")}</p>
            </details>
          )}
          {routes.length > 0 && <p className="text-xs text-lavender-800">{t("toBeVerified")}</p>}
        </div>
      )}

      {/* ============================ Stage 4 ============================ */}
      {stage === 3 && (
        <div className="flex flex-col gap-5">
          <p className="text-calm-700">{documentMode ? t("casePrepareIntroDocument") : t("casePrepareIntro")}</p>

          <section className="rds-card" aria-labelledby="evidence-title">
            <h2 id="evidence-title" className="text-lg font-semibold text-calm-900">{t("caseEvidenceTitle")}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-calm-700">
              <li>{t("caseEvidenceTip1")}</li>
              <li>{t("caseEvidenceTip2")}</li>
              <li>{t("caseEvidenceTip3")}</li>
            </ul>
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-accent">{t("caseEvidenceFingerprint")}</summary>
              <div className="mt-3"><EvidenceModule fingerprint={fingerprint} onFingerprint={setFingerprint} /></div>
            </details>
          </section>

          <section className="rds-card" aria-labelledby="describe-title">
            <h2 id="describe-title" className="text-lg font-semibold text-calm-900">{t("caseDescribeTitle")}</h2>
            <label className="rds-label mt-3" htmlFor="shared-description">{t("caseDescribeLabel")}</label>
            <textarea
              id="shared-description"
              rows={4}
              className="rds-input"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                save({ description: e.target.value });
              }}
            />
            {!documentMode && (
              <>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="rds-label" htmlFor="reporter-name">{t("caseDescribeName")}</label>
                    <input id="reporter-name" className="rds-input" autoComplete="off" value={reporterName} onChange={(e) => setReporterName(e.target.value)} />
                  </div>
                  <div>
                    <label className="rds-label" htmlFor="reporter-email">{t("caseDescribeEmail")}</label>
                    <input id="reporter-email" type="email" autoComplete="off" className="rds-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-calm-600">{t("caseDescribeNotSaved")}</p>
              </>
            )}
          </section>

          {!documentMode && sent.length === 0 && (
            <section className="rds-card" aria-labelledby="disclosure-title">
              <h2 id="disclosure-title" className="text-lg font-semibold text-calm-900">{t("caseDisclosureTitle")}</h2>
              <p className="mt-1 text-sm text-calm-700">{t("caseDisclosureIntro")}</p>
              {selectedRoutes.length === 0 && (
                <p className="mt-3 text-sm text-calm-700">
                  {t("caseDisclosureNone")}{" "}
                  <button type="button" className="font-medium text-accent underline underline-offset-2" onClick={() => goTo(2)}>
                    {t("caseDisclosureNoneLink")}
                  </button>
                </p>
              )}
              <ul className="mt-3 space-y-3">
                {selectedRoutes.map((route) => {
                  const info = describeRoute(route, locations, t);
                  return (
                    <li key={route.id} className="rounded-xl border border-calm-200 p-3">
                      <strong className="text-calm-900">{info.title}</strong>
                      <p className="mt-1 text-sm text-calm-700">
                        {t("caseDisclosureWillReceive", { recipient: info.recipient, items: sharedItems(route) })}
                      </p>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-medium text-accent">{t("caseDisclosureEdit")}</summary>
                        <textarea
                          aria-label={t("caseDisclosureEditLabel", { title: info.title })}
                          rows={10}
                          className="rds-input mt-2 font-mono text-xs"
                          value={textFor(route)}
                          onChange={(e) => setEdited((map) => ({ ...map, [route.id]: e.target.value }))}
                        />
                        {edited[route.id] !== undefined && (
                          <button
                            type="button"
                            className="mt-1 text-xs font-medium text-calm-700 underline underline-offset-2"
                            onClick={() => setEdited((map) => {
                              const next = { ...map };
                              delete next[route.id];
                              return next;
                            })}
                          >
                            {t("caseDisclosureReset")}
                          </button>
                        )}
                      </details>
                    </li>
                  );
                })}
              </ul>
              {selectedRoutes.length > 0 && (
                <>
                  <label className="mt-4 flex items-start gap-2 text-sm text-calm-800">
                    <input type="checkbox" className="mt-0.5 h-4 w-4" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} />
                    <span>{t("caseDisclosureReviewed")}</span>
                  </label>
                  <button
                    type="button"
                    className="rds-btn-primary mt-4 w-full sm:w-auto"
                    disabled={!reviewed || sending}
                    onClick={sendSelected}
                  >
                    {sending ? t("caseSending") : t("caseSend", { count: selectedRoutes.length })}
                  </button>
                  <p className="mt-2 text-xs text-calm-600">{t("caseSendSimulated")}</p>
                </>
              )}
            </section>
          )}

          {!documentMode && sent.length > 0 && (
            <section className="rds-card border-sage-300" aria-labelledby="sent-title" role="status">
              <h2 id="sent-title" className="text-lg font-semibold text-sage-700">{t("caseSentTitle")}</h2>
              <p className="mt-1 text-sm text-calm-700">{t("caseSentText")}</p>
              <ul className="mt-3 space-y-3">
                {sent.map((item) => {
                  const route = routes.find((r) => r.id === item.routeId);
                  if (!route) return null;
                  const info = describeRoute(route, locations, t);
                  return (
                    <li key={item.routeId} className="rounded-xl border border-calm-200 p-3 text-sm">
                      <strong className="text-calm-900">{info.title}</strong>
                      {item.simulated ? (
                        <p className="mt-1 text-calm-700">{t("caseSentSimulated", { recipient: info.recipient })}</p>
                      ) : (
                        <>
                          <p className="mt-1 text-calm-700">
                            {item.markedSent ? t("caseSentMarked") : t("caseSentManual", { recipient: info.recipient })}
                          </p>
                          {!item.markedSent && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => copyAndOpen(item)}>
                                {copiedId === item.routeId ? t("copied") : t("caseCopyOpen")}
                              </button>
                              <button type="button" className="rds-btn-secondary px-4 py-2 text-sm" onClick={() => markSent(item)}>
                                {t("caseMarkSent")}
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {documentMode && (
            <button type="button" className="text-left text-sm font-medium text-accent underline underline-offset-2" onClick={() => { save({ decision: "report-now" }); goTo(2); }}>
              {t("casePrepareSwitchToReport")}
            </button>
          )}
        </div>
      )}

      {/* ============================ Stage 5 ============================ */}
      {stage === 4 && (
        <div className="flex flex-col gap-5">
          <section className="rds-card">
            <h2 className="text-lg font-semibold text-calm-900">{t("caseFollowNextTitle")}</h2>
            <p className="mt-1 text-sm text-calm-700">{t("caseFollowNextText")}</p>
            <Link className="rds-btn-primary mt-4 w-full sm:w-auto" href="/dashboard">{t("caseFollowOpenLog")}</Link>
          </section>

          <section className="rds-card" aria-labelledby="again-title">
            <h2 id="again-title" className="text-lg font-semibold text-calm-900">{t("caseAgainTitle")}</h2>
            <p className="mt-1 text-sm text-calm-700">{t("caseAgainText")}</p>
            <label className="rds-label mt-3" htmlFor="repeat-url">{t("caseAgainLink")}</label>
            <input
              ref={repeatInputRef}
              id="repeat-url"
              type="url"
              inputMode="url"
              placeholder="https://…"
              className="rds-input"
              value={repeatUrl}
              onChange={(e) => setRepeatUrl(e.target.value)}
            />
            <button type="button" className="rds-btn-secondary mt-3" disabled={!repeatUrl.trim()} onClick={addRepeat}>
              {t("caseAgainAdd")}
            </button>
          </section>

          <section className="rds-card" aria-labelledby="talk-title">
            <h2 id="talk-title" className="text-lg font-semibold text-calm-900">{t("caseSupportTitle")}</h2>
            <p className="mt-1 text-sm text-calm-700">{t("caseFollowSupportText")}</p>
            {showSupport ? (
              <div className="mt-4"><SupportDirectory /></div>
            ) : (
              <button type="button" className="rds-btn-secondary mt-3" onClick={() => setShowSupport(true)}>
                {t("caseFollowShowSupport")}
              </button>
            )}
          </section>
        </div>
      )}

      {/* ============================ Bottom bar ============================ */}
      <nav aria-label={t("caseNavLabel")} className="mt-8 border-t border-calm-200 pt-5">
        {hint && <p className="mb-3 text-sm text-calm-700">{hint}</p>}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {stage > 0 && (
              <button type="button" className="rds-btn-secondary" onClick={() => goTo(stage === 3 && documentMode ? 1 : stage - 1)}>
                {t("back")}
              </button>
            )}
            {showLeaveLink && (
              <button type="button" className="text-sm font-medium text-calm-700 underline underline-offset-2" onClick={leave}>
                {t("saveLeave")}
              </button>
            )}
          </div>
          {primary && (
            <button type="button" className="rds-btn-primary" onClick={primary.onClick} disabled={primary.disabled}>
              {primary.label}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
