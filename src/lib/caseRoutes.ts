import { makeId, type Location, type Route } from "@/lib/storage";

export interface RouteSuggestion {
  route: Route;
  title: string;
  order: number;
  evidence: string[];
  acceptance: string;
}

export function generateRoutes(locations: Location[]): Route[] {
  const routes: Route[] = [];
  for (const location of locations) {
    if (location.platformId === "google-search") {
      routes.push({ id: makeId(), locationId: location.id, type: "deindex", selected: true, status: "draft" });
    } else {
      routes.push({ id: makeId(), locationId: location.id, type: "dsa-notice", selected: true, status: "draft" });
    }
  }
  if (locations.length > 0) {
    routes.push({ id: makeId(), type: "hash-handoff", selected: true, status: "draft" });
    routes.push({ id: makeId(), type: "national", selected: true, status: "draft" });
    routes.push({ id: makeId(), type: "host-abuse", selected: true, status: "draft" });
  }
  return routes;
}

export function describeRoute(route: Route, locations: Location[]): RouteSuggestion {
  const location = locations.find((item) => item.id === route.locationId);
  switch (route.type) {
    case "dsa-notice":
      return {
        route,
        title: "Report to the hosting platform",
        order: 2,
        evidence: ["The content URL", "Platform or account name", "Date seen", "A short description"],
        acceptance: "AI-generated imagery and an unknown perpetrator may be accepted, but this is to be verified with the platform.",
      };
    case "deindex":
      return {
        route,
        title: "Ask Google or Bing to de-index results",
        order: 3,
        evidence: ["The search-result URL", "The search query", "Date seen"],
        acceptance: "Search de-indexing for AI-generated intimate imagery is to be verified with Google or Bing.",
      };
    case "hash-handoff":
      return {
        route,
        title: "Hand off to StopNCII",
        order: 4,
        evidence: ["A file you already have, only if you choose", "The StopNCII process guidance"],
        acceptance: "StopNCII may accept some intimate-image cases. Take It Down is mentioned only if the content was created when she was under 18. Eligibility is to be verified.",
      };
    case "national":
      return {
        route,
        title: "National route: AEPD Canal Prioritario",
        order: 5,
        evidence: ["URLs", "Description", "Your chosen reporter identity", "Optional email"],
        acceptance: "AEPD access requirements and whether it accepts AI-generated cases must be checked on the official page.",
      };
    case "host-abuse":
      return {
        route,
        title: "Host or registrar abuse report",
        order: 6,
        evidence: ["Unknown host URL", "Domain or account details", "Date seen"],
        acceptance: "Unknown-host and unknown-perpetrator abuse reporting for AI imagery is to be verified with the provider.",
      };
  }
}
