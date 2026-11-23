import { makeId, type Location, type Route } from "@/lib/storage";
import { getPlatform } from "@/lib/platforms";
import type { TFunction } from "@/lib/i18n";

export interface RouteSuggestion {
  route: Route;
  /** Plain-language title that names the platform, e.g. "Report to Telegram". */
  title: string;
  /** Who receives the text (shown in the disclosure preview and the case log). */
  recipient: string;
  /** What the person needs to have ready. */
  needs: string[];
  /** Optional background, shown behind "Learn more". */
  about: string;
}

/** Display order of route types (lower first). */
const ORDER: Record<Route["type"], number> = {
  "dsa-notice": 1,
  deindex: 2,
  national: 3,
  "hash-handoff": 4,
  "host-abuse": 5,
};

/** Platforms whose host is unknown, so a host/registrar report may help. */
const UNKNOWN_HOST_PLATFORMS = new Set(["independent-host", "other"]);

/**
 * Build the routes for a set of locations, keeping everything the person has
 * already decided: an existing route for the same type and location keeps its
 * id, its selection and its status (so re-reporting never resets reports that
 * were already prepared or sent).
 *
 * Pre-selection for new routes: the platform and search routes, plus the
 * national route (Spain pilot). StopNCII needs the image file, so it is
 * offered but not pre-selected. The host/registrar route only appears when a
 * location is on an independent or unknown website.
 */
export function buildRoutes(locations: Location[], existing: Route[] = []): Route[] {
  const wanted: Array<Pick<Route, "type" | "locationId" | "selected">> = [];

  for (const location of locations) {
    wanted.push({
      type: location.platformId === "google-search" ? "deindex" : "dsa-notice",
      locationId: location.id,
      selected: true,
    });
  }
  if (locations.length > 0) {
    wanted.push({ type: "national", selected: true });
    wanted.push({ type: "hash-handoff", selected: false });
    if (locations.some((item) => UNKNOWN_HOST_PLATFORMS.has(item.platformId))) {
      wanted.push({ type: "host-abuse", selected: true });
    }
  }

  return wanted
    .map((item) => {
      const match = existing.find(
        (route) =>
          route.type === item.type &&
          (route.locationId ?? null) === (item.locationId ?? null),
      );
      if (match) return match;
      return { id: makeId(), ...item, status: "draft" as const };
    })
    .sort((a, b) => ORDER[a.type] - ORDER[b.type]);
}

export function describeRoute(route: Route, locations: Location[], t: TFunction): RouteSuggestion {
  const location = locations.find((item) => item.id === route.locationId);
  const platformName = location ? getPlatform(location.platformId)?.name ?? t("routeOtherPlatform") : "";

  switch (route.type) {
    case "dsa-notice":
      return {
        route,
        title: t("routeDsaTitle", { platform: platformName }),
        recipient: platformName,
        needs: [t("routeNeedLink"), t("routeNeedAccount"), t("routeNeedDate"), t("routeNeedDescription")],
        about: t("routeDsaAbout"),
      };
    case "deindex":
      return {
        route,
        title: t("routeDeindexTitle"),
        recipient: t("routeDeindexRecipient"),
        needs: [t("routeNeedSearchLink"), t("routeNeedSearchWords"), t("routeNeedDate")],
        about: t("routeDeindexAbout"),
      };
    case "national":
      return {
        route,
        title: t("routeNationalTitle"),
        recipient: t("routeNationalRecipient"),
        needs: [t("routeNeedLinks"), t("routeNeedDescription"), t("routeNeedName"), t("routeNeedEmailOptional")],
        about: t("routeNationalAbout"),
      };
    case "hash-handoff":
      return {
        route,
        title: t("routeHashTitle"),
        recipient: t("routeHashRecipient"),
        needs: [t("routeNeedFileOptional")],
        about: t("routeHashAbout"),
      };
    case "host-abuse":
      return {
        route,
        title: t("routeHostTitle"),
        recipient: t("routeHostRecipient"),
        needs: [t("routeNeedLink"), t("routeNeedWebsite"), t("routeNeedDate")],
        about: t("routeHostAbout"),
      };
  }
}

/** Official page where the person submits a manual route themselves. */
export function officialUrl(
  routeType: Route["type"] | undefined,
  platformId: string | undefined,
): string {
  if (routeType === "national") return "https://www.aepd.es/es";
  if (routeType === "hash-handoff") return "https://stopncii.org/";
  if (routeType === "host-abuse") return "https://lookup.icann.org/";
  if (routeType === "deindex") return "https://support.google.com/websearch/troubleshooter/3111061";
  return platformId ? getPlatform(platformId)?.reportUrl ?? "" : "";
}
