/**
 * Dynamic DSA Notice-and-Action templating engine.
 *
 * Generates a standardized takedown notice aligned with the EU Digital Services
 * Act (Regulation (EU) 2022/2065), Article 16 (notice and action mechanisms).
 * Placeholders are filled from the intake form and the locally computed hash.
 *
 * This is a drafting aid only — not legal advice. The user reviews and edits
 * everything before submission.
 */

export interface TemplateInput {
  platformName: string;
  contentUrl: string;
  /** Where the content is hosted / how it was found. */
  contentDescription: string;
  /** SHA-256 fingerprint of the user's reference file (optional). */
  evidenceHash?: string;
  /** Display name the user wants to use in the notice (can be a pseudonym). */
  reporterName?: string;
  /** Contact for platform follow-up (the user controls what, if anything, to share). */
  contactEmail?: string;
  /** EU member state context, used only to frame the legal reference. */
  memberState?: string;
}

export interface CaseTemplateInput {
  description: string;
  urls: string[];
  account?: string;
  evidenceHash?: string;
  reporterName?: string;
  contactEmail?: string;
}

const DSA_REFERENCE =
  "Regulation (EU) 2022/2065 (Digital Services Act), Article 16 — Notice and action mechanisms";
const DIRECTIVE_REFERENCE =
  "Directive (EU) 2024/1385 on combating violence against women and domestic violence";

export function buildDsaNotice(input: TemplateInput): string {
  const today = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const reporter = input.reporterName?.trim() || "[Your name or chosen pseudonym]";
  const contact = input.contactEmail?.trim() || "[Optional: contact email for follow-up]";
  const url = input.contentUrl?.trim() || "[URL / link to the infringing content]";
  const location =
    input.contentDescription?.trim() ||
    "[Describe where the content appears and how it can be located]";
  const memberState = input.memberState?.trim() || "an EU Member State";

  const hashLine = input.evidenceHash
    ? `Evidence integrity fingerprint (SHA-256): ${input.evidenceHash}
(This cryptographic hash was computed on my own device. It can be used to check that a file has not been changed, without disclosing or transmitting the image itself.)`
    : "Evidence integrity fingerprint (SHA-256): [Not provided — you may generate one in the optional Evidence step]";

  return `NOTICE OF ILLEGAL CONTENT — NON-CONSENSUAL INTIMATE IMAGERY (NCII)

To: ${input.platformName} — Trust & Safety / Legal Notice Team
Date: ${today}

Legal basis:
- ${DSA_REFERENCE}
- ${DIRECTIVE_REFERENCE}

1. Nature of the content
I am submitting this notice regarding content that depicts me (or my likeness) in an intimate manner and that has been published and/or distributed without my consent. This includes AI-generated or synthetic ("deepfake") intimate imagery. This content may constitute illegal content under applicable EU and national law. Whether it is illegal depends on the circumstances and national law.

2. Location of the content
URL / link: ${url}
Where it appears: ${location}

3. Statement of non-consent
I did not consent to the creation, publication, or distribution of this content. I am requesting its expeditious removal or disabling of access in accordance with the platform's obligations under the Digital Services Act.

4. Evidence integrity (privacy-preserving)
${hashLine}

5. Good-faith statement
I confirm, in good faith, that the information in this notice is accurate and complete to the best of my knowledge, and that I am the person depicted or am authorised to act on their behalf.

6. Requested action
I request that you:
  a) remove or disable access to the content identified above without undue delay;
  b) prevent re-upload of the same content where technically feasible; and
  c) confirm the action taken and provide a statement of reasons, as required under the DSA.

Reporting individual: ${reporter}
Jurisdiction context: ${memberState}
Contact for follow-up: ${contact}

This notice is submitted under the notice-and-action mechanism of the Digital Services Act. It is a request for voluntary platform action and does not constitute legal proceedings or legal advice.`;
}

export function buildDsaNoticeForUrls(input: CaseTemplateInput): string {
  const urls = input.urls.length ? input.urls.join("\n") : "[URL]";
  return buildDsaNotice({
    platformName: "Hosting platform — Trust & Safety / Legal Notice Team",
    contentUrl: urls,
    contentDescription: input.description,
    evidenceHash: input.evidenceHash,
    reporterName: input.reporterName,
    contactEmail: input.contactEmail,
    memberState: "Spain",
  });
}

export function buildDeindexRequest(input: CaseTemplateInput): string {
  return `SEARCH RESULT DE-INDEXING REQUEST

I am asking for review of search results that expose intimate, sexual, or synthetic intimate content published or shared without my consent.

URLs:\n${input.urls.join("\n") || "[URL]"}

Description:\n${input.description || "[Describe the content and why it identifies me]"}

Reporting person: ${input.reporterName?.trim() || "[Name or pseudonym]"}
Contact: ${input.contactEmail?.trim() || "[Optional email]"}

Please review the result for removal or de-indexing under the search provider's current policy. This request may constitute illegal content under applicable EU and national law, but its legal status depends on the circumstances and national law. This content can be AI-generated or synthetic. It was created or shared without my consent.\n\nTo be verified with a partner organisation before the pilot.`;
}

export function buildHostAbuseReport(input: CaseTemplateInput): string {
  return `ABUSE REPORT TO HOSTING PROVIDER OR REGISTRAR

Subject: Request to review non-consensual intimate imagery

URLs:\n${input.urls.join("\n") || "[URL]"}

Description:\n${input.description || "[Describe the content]"}

I did not consent to the creation or publication of this intimate or sexual content. It may be AI-generated. Please review the location, preserve the information available to you under your policy, and remove or disable access where your applicable policy and law allow it.

Reporter: ${input.reporterName?.trim() || "[Name or pseudonym]"}
Contact: ${input.contactEmail?.trim() || "[Optional email]"}

This is not a guarantee of removal. I am asking you to check your abuse, hosting, or domain-registration process.\n\nTo be verified with a partner organisation before the pilot.`;
}

export function buildAepdSummary(input: CaseTemplateInput): string {
  return `AEPD CANAL PRIORITARIO — INFORMATION SUMMARY

Country: Spain
Content type: Possible AI-generated or synthetic intimate content published without consent

URLs:\n${input.urls.join("\n") || "[URL]"}

Description:\n${input.description || "[Describe the content]"}

Account or username: ${input.account || "[Not provided]"}
Reporter: ${input.reporterName?.trim() || "[Name or pseudonym]"}
Contact: ${input.contactEmail?.trim() || "[Optional email]"}

Please check the official AEPD page for current access requirements before submitting. This summary is not legal advice and does not promise removal.\n\nTo be verified with a partner organisation before the pilot.`;
}
