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

export const DIRECTORY_DE: DirectoryEntry[] = [];
