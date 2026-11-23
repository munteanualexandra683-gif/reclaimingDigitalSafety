"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import StageIndicator, { type StageKey } from "@/components/StageIndicator";
import EvidenceModule from "@/components/EvidenceModule";
import { DIRECTORY_ES } from "@/data/directory.es";
import type { FileFingerprint } from "@/lib/hashing";
import { useT } from "@/lib/i18n";
import { detectPlatformId, getPlatform, PLATFORMS } from "@/lib/platforms";
import { generateRoutes, describeRoute } from "@/lib/caseRoutes";
import {
  buildAepdSummary,
  buildDeindexRequest,
  buildDsaNoticeForUrls,
  buildHostAbuseReport,
} from "@/lib/template";
import {
  addOrUpdateCase,
  addReport,
  loadCases,
  makeId,
  updateReport,
  loadReports,
  type Case,
  type Location,
  type Route,
  type ReportRecord,
} from "@/lib/storage";

const KEYS: StageKey[] = ["discover", "help", "pathway", "preparation", "followup"];

export default function CasePage() {
  const t = useT();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [locationUrl, setLocationUrl] = useState("");
  const [locationPlatform, setLocationPlatform] = useState("other");
  const [locationAccount, setLocationAccount] = useState("");
  const [locationSeen, setLocationSeen] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [fingerprint, setFingerprint] = useState<FileFingerprint | null>(null);
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [reviewed, setReviewed] = useState(false);
  const [dispatching, setDispatching] = useState(false);
  const [sent, setSent] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [reReportUrl, setReReportUrl] = useState("");

  useEffect(() => {
    const existing = loadCases();
    if (existing[0]) {
      setCaseData(existing[0]);
      setDescription(existing[0].description);
      setStageIndex(existing[0].step ?? 0);
    } else {
      const now = new Date().toISOString();
      const fresh: Case = {
        id: makeId(), createdAt: now, updatedAt: now, country: "Spain",
        description: "", decision: undefined, locations: [], routes: [], reportIds: [], step: 0,
      };
      setCaseData(fresh);
      addOrUpdateCase(fresh);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) headingRef.current?.focus();
  }, [stageIndex, hydrated]);

  function persist(patch: Partial<Case>) {
    if (!caseData) return;
    const next = { ...caseData, ...patch, updatedAt: new Date().toISOString(), step: stageIndex };
    setCaseData(next);
    addOrUpdateCase(next);
  }

  function goNext() {
    if (stageIndex < 4) {
      persist({ step: stageIndex + 1 });
      setStageIndex((value) => value + 1);
    }
  }

  function goBack() {
    setStageIndex((value) => Math.max(0, value - 1));
  }

  function addLocation() {
    if (!caseData || !locationUrl.trim()) return;
    const location: Location = {
      id: makeId(), url: locationUrl.trim(), platformId: locationPlatform,
      account: locationAccount.trim() || undefined,
      seenAt: locationSeen || undefined,
      note: locationNote.trim() || undefined,
    };
    const locations = [...caseData.locations, location];
    persist({ locations, routes: generateRoutes(locations) });
    setLocationUrl(""); setLocationPlatform("other"); setLocationAccount(""); setLocationSeen(""); setLocationNote("");
  }

  const routes = caseData?.routes ?? [];
  const selectedRoutes = routes.filter((route) => route.selected);

  function toggleRoute(id: string) {
    if (!caseData) return;
    persist({ routes: routes.map((route) => route.id === id ? { ...route, selected: !route.selected } : route) });
  }

  function routeText(route: Route): string {
    const urls = route.locationId
      ? caseData?.locations.filter((item) => item.id === route.locationId).map((item) => item.url) ?? []
      : caseData?.locations.map((item) => item.url) ?? [];
    const input = { description, urls, reporterName, contactEmail, evidenceHash: fingerprint?.sha256 };
    if (route.type === "deindex") return buildDeindexRequest(input);
    if (route.type === "national") return buildAepdSummary(input);
    if (route.type === "host-abuse") return buildHostAbuseReport(input);
    if (route.type === "hash-handoff") return `STOPNCII HAND-OFF\n\nStopNCII is a service that may allow a person to create a hash-based record without uploading intimate imagery. The prototype does not hash or submit for you. If the content was created when you were under 18, ask the official Take It Down guidance too.\n\nOfficial StopNCII: https://stopncii.org/\nTake It Down (under-18 context): https://takeitdown.ncmec.org/\n\nTo be verified with a partner organisation before the pilot.`;
    return buildDsaNoticeForUrls(input);
  }

  async function sendSelected() {
    if (!caseData || !reviewed) return;
    setDispatching(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const now = new Date().toISOString();
    const expected = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const createdIds: string[] = [];

    for (const route of selectedRoutes) {
      const location = caseData.locations.find((item) => item.id === route.locationId);
      const platform = location ? getPlatform(location.platformId) : undefined;
      const isApi = platform?.dispatch === "api" && route.type === "dsa-notice";
      const record: ReportRecord = {
        id: makeId(),
        caseId: caseData.id,
        routeType: route.type,
        platformId: location?.platformId ?? (route.type === "deindex" ? "google-search" : route.type),
        platformName: platform?.name ?? (
          route.type === "deindex" ? "Google / Bing" :
          route.type === "national" ? "AEPD" :
          route.type === "hash-handoff" ? "StopNCII" :
          route.type === "host-abuse" ? "Host / registrar" : "Platform"
        ),
        dispatch: isApi ? "api" : "closed",
        status: isApi ? "submitted" : "follow-up",
        contentUrl: location?.url ?? "",
        evidenceHash: fingerprint?.sha256,
        noticeText: routeText(route),
        createdAt: now,
        updatedAt: now,
        expectedResponseBy: expected,
      };
      addReport(record);
      createdIds.push(record.id);
      const nextRoute = { ...route, status: isApi ? "submitted" as const : "prepared" as const };
      const nextRoutes = caseData.routes.map((item) => item.id === route.id ? nextRoute : item);
      persist({ routes: nextRoutes, reportIds: [...caseData.reportIds, record.id] });
    }
    setDispatching(false); setSent(true);
  }

  async function copyManual(route: Route) {
    await navigator.clipboard.writeText(routeText(route)).catch(() => undefined);
    const location = route.locationId ? caseData?.locations.find((item) => item.id === route.locationId) : undefined;
    let url = "";
    if (route.type === "national") url = "https://www.aepd.es/es";
    else if (route.type === "hash-handoff") url = "https://stopncii.org/";
    else if (route.type === "host-abuse") url = "https://lookup.icann.org/";
    else if (route.type === "deindex") url = "https://support.google.com/websearch/troubleshooter/3111061";
    else if (location) url = getPlatform(location.platformId)?.reportUrl ?? "";
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  function reReport() {
    if (!caseData || !reReportUrl.trim()) return;
    const location: Location = {
      id: makeId(), url: reReportUrl.trim(), platformId: detectPlatformId(reReportUrl.trim()),
      seenAt: new Date().toISOString().slice(0, 10), note: "Added as repeated appearance",
    };
    const locations = [...caseData.locations, location];
    persist({ locations, routes: generateRoutes(locations) });
    setReReportUrl("");
    setStageIndex(2);
  }

  if (!hydrated || !caseData) return <div className="mx-auto max-w-4xl px-4 py-10">Loading…</div>;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-32 pt-8 sm:px-6">
      <StageIndicator current={KEYS[stageIndex]} />
      <header className="mb-6">
        <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-calm-900">
          {stageIndex === 0 ? t("stageDiscover") : stageIndex === 1 ? t("stageHelp") : stageIndex === 2 ? t("stagePathway") : stageIndex === 3 ? t("stagePrepare") : t("stageFollowup")}
        </h1>
      </header>

      {stageIndex === 0 && (
        <div className="flex flex-col gap-6">
          <section className="rds-card">
            <h2 className="text-lg font-semibold text-calm-800">{t("rightsTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-calm-700">
              AI-generated intimate content made or shared without consent is abuse, even if the image is fake. It is not your fault.
            </p>
            <p className="mt-2 text-sm text-calm-600">You can report to platforms under the EU Digital Services Act or use national routes in Spain. You do not need to decide now.</p>
            <p className="mt-3 rounded-xl bg-lavender-50 px-3 py-2 text-xs text-lavender-800">{t("toBeVerified")}</p>
          </section>

          <section className="rds-card">
            <h2 className="text-lg font-semibold text-calm-800">{t("exposureTitle")}</h2>
            <p className="mt-2 text-sm text-calm-600">You may come across the content while checking. A trusted person can do these checks instead.</p>
            <ul className="mt-4 space-y-3 text-sm text-calm-700">
              {[
                ["Reverse-image search", "Check Google Lens or Bing Visual Search.", "https://lens.google/", "https://www.bing.com/visualsearch"],
                ["Search your name", "Search your name in Google and Bing.", "https://www.google.com/", "https://www.bing.com/"],
                ["Check the platforms you use", "Look at Instagram, Telegram, and your other accounts.", "https://www.instagram.com/", "https://telegram.org/"],
              ].map(([title, copy, first, second]) => (
                <li key={title} className="rounded-xl border border-calm-100 p-3">
                  <strong>{title}</strong><p className="mt-1 text-xs text-calm-600">{copy}</p>
                  <div className="mt-2 flex gap-3 text-xs">
                    <a className="underline" href={first} target="_blank" rel="noopener noreferrer">Open official check</a>
                    <a className="underline" href={second} target="_blank" rel="noopener noreferrer">Alternative</a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rds-card">
            <h2 className="text-lg font-semibold text-calm-800">{t("locationsTitle")}</h2>
            <p className="mt-1 text-sm text-calm-600">Record links, not images. No file upload is needed.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2"><label className="rds-label" htmlFor="location-url">URL *</label><input id="location-url" type="url" required className="rds-input" value={locationUrl} onChange={(e) => { setLocationUrl(e.target.value); setLocationPlatform(detectPlatformId(e.target.value)); }} /></div>
              <div><label className="rds-label" htmlFor="location-platform">Platform</label><select id="location-platform" className="rds-input" value={locationPlatform} onChange={(e) => setLocationPlatform(e.target.value)}>{PLATFORMS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
              <div><label className="rds-label" htmlFor="location-account">Account / username (optional)</label><input id="location-account" className="rds-input" value={locationAccount} onChange={(e) => setLocationAccount(e.target.value)} /></div>
              <div><label className="rds-label" htmlFor="location-date">Date seen (optional)</label><input id="location-date" type="date" className="rds-input" value={locationSeen} onChange={(e) => setLocationSeen(e.target.value)} /></div>
              <div><label className="rds-label" htmlFor="location-note">Short note (optional)</label><input id="location-note" className="rds-input" value={locationNote} onChange={(e) => setLocationNote(e.target.value)} /></div>
            </div>
            <button type="button" className="rds-btn-secondary mt-4" disabled={!locationUrl.trim()} onClick={addLocation}>{t("addLocation")}</button>
            {caseData.locations.length > 0 && <ul className="mt-4 space-y-2">{caseData.locations.map((location) => <li key={location.id} className="rounded-xl border border-calm-100 p-3 text-sm"><strong>{getPlatform(location.platformId)?.name ?? "Other"}</strong><p className="break-all text-calm-600">{location.url}</p></li>)}</ul>}
          </section>
        </div>
      )}

      {stageIndex === 1 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["report-now", t("reportNow"), "Start reports and decide each route as you go."],
            ["document-only", t("documentOnly"), "Save links and descriptions now without submitting."],
            ["talk-first", t("talkFirst"), "Open the support directory before deciding what to do."],
            ["not-now", t("notNow"), "Save this case locally and come back whenever you are ready."],
          ].map(([value, title, copy]) => (
            <button key={value} type="button" onClick={() => { persist({ decision: value as Case["decision"] }); if (value === "talk-first") setDirectoryOpen(true); }} className={`rds-card text-left ${caseData.decision === value ? "ring-2 ring-accent" : ""}`}>
              <strong className="text-calm-900">{title}</strong><p className="mt-2 text-sm text-calm-600">{copy}</p>
            </button>
          ))}
          {directoryOpen && <section className="rds-card sm:col-span-2"><h2 className="text-lg font-semibold">{t("supportDirectory")}</h2><ul className="mt-4 space-y-3">{DIRECTORY_ES.map((entry) => <li key={entry.id} className="rounded-xl border border-calm-100 p-3"><div className="flex flex-wrap justify-between gap-2"><strong>{entry.name}</strong><span className="rounded-full bg-lavender-100 px-2 py-0.5 text-xs text-lavender-800">{t("verifiedPending")}</span></div><p className="mt-1 text-sm text-calm-600">{entry.whatTheyDo}</p><p className="mt-1 text-xs text-calm-500">{entry.cost} · {entry.languages.join(", ")}</p><a className="mt-2 inline-block text-sm underline" href={entry.url} target="_blank" rel="noopener noreferrer">Open official resource</a></li>)}</ul></section>}
        </div>
      )}

      {stageIndex === 2 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-calm-600">Suggested order: 1 capture evidence · 2 report hosting platforms · 3 de-index search results · 4 StopNCII hand-off · 5 national route · optional support.</p>
          {routes.map((route) => {
            const suggestion = describeRoute(route, caseData.locations);
            return <label key={route.id} className="rds-card block"><div className="flex items-start gap-3"><input type="checkbox" checked={route.selected} onChange={() => toggleRoute(route.id)} className="mt-1 h-4 w-4" /><div><h2 className="font-semibold text-calm-900">{suggestion.order}. {suggestion.title}</h2><p className="mt-1 text-sm text-calm-600">Needs: {suggestion.evidence.join(" · ")}</p><p className="mt-2 text-xs text-lavender-800">{suggestion.acceptance}</p><p className="mt-1 text-xs text-calm-500">{t("toBeVerified")}</p></div></div></label>;
          })}
          {routes.length === 0 && <div className="rds-card text-sm text-calm-600">Add at least one location in Stage 1 before generating routes.</div>}
          <p className="rounded-xl border border-calm-200 bg-calm-50 p-3 text-xs text-calm-600">Whether a deepfake counts as illegal content depends on national law until Directive (EU) 2024/1385 is transposed (deadline June 2027). {t("toBeVerified")}</p>
        </div>
      )}

      {stageIndex === 3 && (
        <div className="flex flex-col gap-6">
          <section className="rds-card"><h2 className="text-lg font-semibold">{t("evidenceTitle")}</h2><p className="mt-2 text-sm text-calm-600">Capture links and usernames before blocking or deleting the account; disappearing messages can erase evidence.</p><p className="mt-2 text-sm text-calm-600">Don&apos;t forward the content, don&apos;t keep it in shared cloud folders, and use private browsing on shared devices.</p><details className="mt-4"><summary className="cursor-pointer text-sm font-medium">Optional: fingerprint a file you already have</summary><EvidenceModule fingerprint={fingerprint} onFingerprint={setFingerprint} /></details></section>
          <section className="rds-card"><h2 className="text-lg font-semibold">{t("describeOnce")}</h2><label className="rds-label mt-4" htmlFor="shared-description">Describe what happened and where it appears</label><textarea id="shared-description" rows={5} className="rds-input" value={description} onChange={(e) => { setDescription(e.target.value); persist({ description: e.target.value }); }} /><div className="mt-3 grid gap-3 sm:grid-cols-2"><div><label className="rds-label" htmlFor="reporter-name">Name or pseudonym</label><input id="reporter-name" className="rds-input" value={reporterName} onChange={(e) => setReporterName(e.target.value)} /></div><div><label className="rds-label" htmlFor="reporter-email">Email (optional)</label><input id="reporter-email" type="email" className="rds-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} /></div></div></section>
          <section className="rds-card"><h2 className="text-lg font-semibold">{t("disclosureTitle")}</h2><p className="mt-2 text-sm text-calm-600">A DSA notice normally includes the reporter&apos;s name and email. Leaving them out may weaken the notice. Check what each platform says it may share with the reported account.</p>{selectedRoutes.map((route) => <article key={route.id} className="mt-3 rounded-xl border border-calm-100 p-3"><strong>{describeRoute(route, caseData.locations).title}</strong><p className="mt-1 text-sm text-calm-600">Shared: {reporterName ? "name/pseudonym" : "pseudonym placeholder"}{contactEmail ? ", email" : ""}, URLs, description{fingerprint ? ", SHA-256 fingerprint" : ""}. Recipient: {route.type === "national" ? "AEPD" : route.type === "deindex" ? "Google or Bing" : route.type === "hash-handoff" ? "StopNCII" : route.type === "host-abuse" ? "Host or registrar" : "Platform trust & safety team"}.</p><textarea aria-label={`Editable text for ${describeRoute(route, caseData.locations).title}`} rows={8} className="rds-input mt-3 font-mono text-xs" defaultValue={routeText(route)} /></article>)}<label className="mt-4 flex items-start gap-2 text-sm"><input type="checkbox" checked={reviewed} onChange={(e) => setReviewed(e.target.checked)} /><span>I&apos;ve reviewed what will be shared</span></label></section>
          <button type="button" className="rds-btn-primary" disabled={!reviewed || dispatching || selectedRoutes.length === 0} onClick={sendSelected}>{dispatching ? "Preparing…" : t("sendSelected")}</button>
          {sent && <div className="rds-card border-sage-200"><p className="font-semibold text-sage-700">Selected routes prepared or dispatched locally.</p><div className="mt-3 flex flex-wrap gap-2">{selectedRoutes.map((route) => <button key={route.id} type="button" className="rds-btn-secondary text-sm" onClick={() => copyManual(route)}>Copy and open official form</button>)}</div></div>}
        </div>
      )}

      {stageIndex === 4 && (
        <div className="flex flex-col gap-4">
          <div className="rds-card"><h2 className="text-lg font-semibold">{t("followupTitle")}</h2><p className="mt-2 text-sm text-calm-600">View report records and follow-up dates in the dashboard. Declined reports can receive an Article 20 complaint template.</p><Link className="rds-btn-primary mt-4" href="/dashboard">Open dashboard</Link><a className="rds-btn-secondary ml-2 mt-4" href="#support-directory" onClick={() => setDirectoryOpen(true)}>{t("talkSomeone")}</a></div>
          {directoryOpen && <div id="support-directory" className="rds-card"><h2 className="text-lg font-semibold">{t("supportDirectory")}</h2><ul className="mt-3 space-y-2">{DIRECTORY_ES.map((entry) => <li key={entry.id} className="rounded-xl border border-calm-100 p-3 text-sm"><strong>{entry.name}</strong> — <span className="text-lavender-800">Pending verification</span><br /><a className="underline" href={entry.url} target="_blank" rel="noopener noreferrer">Open official page</a></li>)}</ul></div>}
          <div className="rds-card"><h2 className="text-lg font-semibold">{t("appearedAgain")}</h2><label className="rds-label mt-3" htmlFor="repeat-url">New URL</label><input id="repeat-url" type="url" className="rds-input" value={reReportUrl} onChange={(e) => setReReportUrl(e.target.value)} /><button type="button" className="rds-btn-secondary mt-3" disabled={!reReportUrl.trim()} onClick={reReport}>Add and regenerate notice</button></div>
        </div>
      )}

      <nav className="mt-6 flex items-center justify-between">
        <button type="button" className="rds-btn-secondary" disabled={stageIndex === 0} onClick={goBack}>{t("back")}</button>
        {stageIndex < 4 && <button type="button" className="rds-btn-primary" onClick={goNext}>{stageIndex === 1 ? t("saveLeave") : t("continue")}</button>}
      </nav>
    </div>
  );
}
