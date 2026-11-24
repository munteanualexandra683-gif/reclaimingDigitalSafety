export type DirectoryEntryType =
  | "helpline"
  | "authority"
  | "legal-aid"
  | "police"
  | "dsc"
  | "ngo";

export interface DirectoryEntry {
  id: string;
  name: string;
  type: DirectoryEntryType;
  whatTheyDo: string;
  contact: string;
  url: string;
  languages: string[];
  cost: string;
  verified: false;
  lastVerified: null;
}

// All entries are candidates for the Spain pilot and remain unverified.
export const DIRECTORY_ES: DirectoryEntry[] = [
  {
    id: "aepd-canal-prioritario",
    name: "AEPD — Canal Prioritario",
    type: "authority",
    whatTheyDo: "Urgent removal of sexual or violent content published without consent. Check access requirements on the official page.",
    contact: "Use the official AEPD online form",
    url: "https://www.aepd.es/es",
    languages: ["Spanish", "English where available"],
    cost: "Free to check",
    verified: false,
    lastVerified: null,
  },
  {
    id: "016",
    name: "016 — helpline for violence against women",
    type: "helpline",
    whatTheyDo: "Support and information for all forms of violence against women.",
    contact: "016",
    url: "https://www.violenciagenero.igualdad.gob.es",
    languages: ["Spanish"],
    cost: "Free",
    verified: false,
    lastVerified: null,
  },
  {
    id: "incibe-017",
    name: "INCIBE 017 — Tu Ayuda en Ciberseguridad",
    type: "helpline",
    whatTheyDo: "Cybersecurity help, reporting guidance, and support.",
    contact: "017",
    url: "https://www.incibe.es/linea-de-ayuda-en-ciberseguridad",
    languages: ["Spanish"],
    cost: "Free",
    verified: false,
    lastVerified: null,
  },
  {
    id: "dsc-spain",
    name: "Spain Digital Services Coordinator",
    type: "dsc",
    whatTheyDo: "DSC role to verify. May receive Digital Services Act complaints and coordination matters.",
    contact: "Authority name and contact still to be verified",
    url: "https://digital-strategy.ec.europa.eu/en/policies/digital-services-act",
    languages: ["Spanish", "English where available"],
    cost: "May be free; verify",
    verified: false,
    lastVerified: null,
  },
  {
    id: "police-cybercrime",
    name: "Policía Nacional / Guardia Civil cybercrime reporting",
    type: "police",
    whatTheyDo: "Police routes for cybercrime and related reporting. Use official channels and emergency services for immediate danger.",
    contact: "Use an official Policía Nacional or Guardia Civil reporting channel",
    url: "https://www.policia.es/",
    languages: ["Spanish"],
    cost: "Free",
    verified: false,
    lastVerified: null,
  },
  {
    id: "free-legal-aid-placeholder",
    name: "Free legal-aid service",
    type: "legal-aid",
    whatTheyDo: "Placeholder for a partner organisation that can explain local legal-aid access.",
    contact: "Contact details to be filled by a partner",
    url: "https://www.administraciondejusticia.gob.es/",
    languages: ["To be confirmed"],
    cost: "Eligibility and cost to be confirmed",
    verified: false,
    lastVerified: null,
  },
];
