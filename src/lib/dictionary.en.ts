/**
 * English: the default language and the complete source of every
 * user-facing string. Add every new key here first.
 */
export const en = {
  /* ------------------------------------------------------------------ */
  /* Common                                                              */
  /* ------------------------------------------------------------------ */
  appName: "NEST",
  quickExit: "Quick exit",
  quickExitAdvice: "Leave this site right away. You can also press Esc twice.",
  discreetMode: "Discreet mode",
  on: "On",
  off: "Off",
  language: "Language",
  english: "English",
  spanish: "Español",
  back: "Back",
  continue: "Continue",
  saveLeave: "Save and leave",
  cancel: "Cancel",
  copy: "Copy",
  copied: "Copied",
  loading: "Loading…",
  learnMore: "Learn more",
  openOfficialSite: "Open official website",
  verifiedPending: "Pending verification",
  toBeVerified: "To be verified with a partner organisation before the pilot.",

  /* Stage names: the same everywhere (home, wizard, case log) */
  stageDiscover: "Discover & assess",
  stageHelp: "Decide whether to seek help",
  stagePathway: "Reporting pathway",
  stagePrepare: "Prepare & submit",
  stageFollowup: "Follow-up & support",
  stageOf: "Step {current} of {total}",
  progressLabel: "Your progress",

  /* ------------------------------------------------------------------ */
  /* Header, footer, disclaimer                                          */
  /* ------------------------------------------------------------------ */
  skipToContent: "Skip to main content",
  navLabel: "Main",
  navMenu: "Menu",
  navStart: "Start or continue",
  navCaseLog: "My case log",
  navSupport: "Support",
  navPrivacy: "Privacy",
  discreetModeHint: "Shows a plain tab icon. The tab title is always the neutral “NEST”.",
  footerNavLabel: "Footer",
  footerHome: "Home",
  footerHow: "How it works",
  footerQuestions: "Questions",
  footerTagline: "Clear steps, at your own pace. Everything stays on your device.",
  footerDisclaimer: "NEST does not give legal or medical advice and cannot guarantee that content is removed.",
  disclaimerLabel: "Important information",
  disclaimerText:
    "NEST does not give legal or medical advice and cannot guarantee that content is removed. Platforms and authorities make those decisions. If you are in immediate danger, call 112.",
  disclaimerDismiss: "I understand",

  /* ------------------------------------------------------------------ */
  /* File fingerprint (optional)                                         */
  /* ------------------------------------------------------------------ */
  evidenceIntro:
    "If you already have the file, NEST can create a fingerprint of it: a code that identifies this exact file, so you can later show it is the same one.",
  evidenceStaysLocal: "The file stays on this device. It is never uploaded or shown.",
  evidenceChoose: "Choose a file",
  evidenceBusy: "Working on this device…",
  evidenceError: "This file could not be read on this device. You can continue without a fingerprint.",
  evidenceDone: "Fingerprint created",
  evidenceRemove: "Remove",
  evidenceFile: "File: {name} ({size}). Only the fingerprint is kept.",
  evidenceShowCode: "Show the fingerprint code",
  evidenceTech: "SHA-256 hash, calculated in your browser.",

  /* ------------------------------------------------------------------ */
  /* Move to another device                                              */
  /* ------------------------------------------------------------------ */
  syncTitle: "Move your case to another device",
  syncIntro:
    "For example from a shared laptop to your own phone. Your case is locked with a passphrase you choose, then moved as a QR code or a file. No account and no server.",
  syncTech:
    "The data is encrypted on this device with AES-GCM, using a key made from your passphrase (PBKDF2). The QR code or file cannot be read without the passphrase.",
  syncSend: "Send to another device",
  syncReceive: "Receive from another device",
  syncClose: "Close",
  syncSendStep1: "Choose a passphrase you will remember.",
  syncSendStep2: "Scan the QR code with your other device, or save the file.",
  syncSendStep3: "On the other device, open NEST › My case log › Receive, and type the same passphrase.",
  syncPassphrase: "Passphrase",
  syncPassphraseHint: "At least {min} characters. Don't write it down next to the file.",
  syncShow: "Show",
  syncHide: "Hide",
  syncPrepare: "Lock and prepare",
  syncPrepareAgain: "Prepare again",
  syncPreparing: "Locking…",
  syncPrepareError: "This could not be prepared on this device.",
  syncQrLabel: "Locked copy of your case log",
  syncQrText: "Scan this with your other device's camera, then paste the text on its Receive screen with the same passphrase.",
  syncDownloadInstead: "Save as a file instead",
  syncTooBig: "Your case log is too big for one QR code. Save it as a file instead.",
  syncDownload: "Save locked file",
  syncFileAdvice:
    "Move the file directly to your other device, for example with a cable or nearby sharing, and delete it afterwards. Sending it through a messaging or cloud service stores a copy there (still locked).",
  syncReceiveIntro: "Type the passphrase you chose, then choose the saved file. Older backups made without a passphrase: leave it empty.",
  syncChooseFile: "Choose the saved file",
  syncPasteTitle: "I scanned a QR code instead",
  syncPasteLabel: "Paste the text from the QR code",
  syncImport: "Import",
  syncImported: "Imported {reports} report(s) and {cases} case(s) ({added} new).",
  syncImportError: "This could not be opened. Check the passphrase and that the whole file or code was used.",

  /* ------------------------------------------------------------------ */
  /* Home                                                                */
  /* ------------------------------------------------------------------ */
  homeHeroTitle: "You decide what happens next.",
  homeHeroText:
    "If an intimate image of you was made or shared without your consent, even one made with AI, NEST helps you take clear, calm steps at your own pace.",
  homeStart: "Start or continue",
  homeAlreadyReported: "I've already reported",
  homeTalkFirst: "Talk to someone first",

  homeFaultTitle: "It's not your fault.",
  homeFaultText:
    "Even if the image is fake, the harm is real. Making or sharing an intimate image of someone without their consent is abuse, and the person who did it is responsible, not you.",
  homeFaultMoreTitle: "What kind of images does this cover?",
  homeFaultMoreText:
    "Any sexual or intimate image, video or audio of you that was made, changed or shared without your consent. This includes “deepfakes”: images made or edited with AI, for example by putting your face on someone else's body, or by creating a picture from your public photos.",

  homeHowTitle: "Five steps, at your own pace",
  homeHowText: "You can stop, go back, or save and leave at any step.",
  homeHowDiscover: "Write down where the image appears. You only need links, not the image.",
  homeHowHelp: "Report now, only keep a record, talk to someone first, or stop for now. Every choice is okay.",
  homeHowPathway: "See where you can ask for it to be removed, and choose the places you want.",
  homeHowPrepare: "Describe what happened once. Check exactly what each place will receive before anything is sent.",
  homeHowFollowup: "Keep track of answers, ask again if a report is declined, and act if it appears again.",

  homePrivacyTitle: "Your privacy, in plain words",
  homePrivacyNoAccount: "No account and no sign-up.",
  homePrivacyLocal:
    "What you write stays in this browser, on this device. Nothing is sent to us, and we have no server.",
  homePrivacyChoice:
    "Nothing goes to a platform unless you choose it. In this prototype, sending is only simulated.",
  homePrivacySharedDevice:
    "On a shared device: your notes are saved without encryption in this browser. When you are done, use “Delete everything” in your case log, or use a private window.",
  homePrivacyTechTitle: "Technical details",
  homePrivacyTechText:
    "NEST is a static website: there is no backend, no analytics and no tracking. Your case is kept in the browser's localStorage. If you choose, NEST can create a SHA-256 fingerprint of a file on your device; the file itself is never uploaded. Moving your case to another device uses AES-GCM encryption with a key made from your passphrase (PBKDF2).",

  homeSupportTitle: "You don't have to do this alone",
  homeSupportText:
    "Talking to someone can help, before, during or after any step. These services are free or low-cost.",

  homeFaqTitle: "Questions",
  homeFaqUploadQ: "Do I need to upload the image?",
  homeFaqUploadA:
    "No. NEST works with links and your own description. If you want, you can create a fingerprint of a file you already have; the file stays on your device.",
  homeFaqRemovalQ: "Will the content definitely be removed?",
  homeFaqRemovalA:
    "No one can promise that: the platforms decide. In the EU, platforms have to look at reports of illegal content and tell you what they decided.",
  homeFaqNameQ: "Do I have to give my real name?",
  homeFaqNameA:
    "A report to a platform normally asks for a name and an email address. You choose what to give, and NEST shows you exactly what each place will receive before anything is sent. Whether a report without your real name is accepted depends on the platform.",
  homeFaqPauseQ: "Can I stop and come back later?",
  homeFaqPauseA:
    "Yes. NEST saves your case in this browser. Open NEST again on the same device and choose “Start or continue”.",

  /* ------------------------------------------------------------------ */
  /* Guided case (/case)                                                 */
  /* ------------------------------------------------------------------ */
  caseNavLabel: "Case steps",
  caseDeleted: "Your case was deleted from this browser.",
  caseDelete: "Delete this case",
  caseDeleteConfirm:
    "This removes the case and its reports from this browser. It can't be undone. Delete it?",
  caseDeleteYes: "Yes, delete it",

  caseResumeTitle: "Welcome back",
  caseResumeText: "You have a saved case, last changed on {date}. You were at: {stage}.",
  caseResumeContinue: "Continue my case",
  caseResumeNew: "Start a new case",
  caseResumeNewHint: "Starting a new case keeps the old one in your case log.",

  caseSavedTitle: "Your case is saved",
  caseSavedText:
    "It is saved in this browser on this device. When you're ready, open NEST again and choose “Start or continue”. Nothing has been sent.",
  caseSavedShared:
    "On a shared device, anyone using this browser could open it. You can delete it below, or use Quick exit at any time.",
  caseSavedHome: "Go to the home page",
  caseSavedBack: "Back to my case",

  caseDiscoverIntro:
    "Take your time. Start by noting where you saw it. You don't need to look at the image again.",
  caseWhereTitle: "Where did you see it?",
  caseWhereText: "Add each place separately. Links are enough; you never need to upload the image.",
  caseWhereLink: "Link (web address)",
  caseWhereNoLink: "I don't have a link",
  caseWherePlatform: "Which platform or website?",
  caseWhereDescribe: "Describe where it is",
  caseWhereDescribePlaceholder: "For example: the name of the Telegram group",
  caseWhereMore: "Add more details (optional)",
  caseWhereAccount: "Account or username that posted it",
  caseWhereDate: "Date you saw it",
  caseWhereNote: "Short note",
  caseWhereAdd: "Add this place",
  caseWhereRemove: "Remove",
  caseWhereRemoveLabel: "Remove {place}",

  caseCheckTitle: "Not sure where it appears? Safe ways to check",
  caseCheckWarning:
    "You may see the image while checking. If you'd rather not, a person you trust can do these checks for you.",
  caseCheckImage: "Search with an image",
  caseCheckImageText: "Look for copies of a picture with an image search.",
  caseCheckName: "Search your name",
  caseCheckNameText: "Search your name, in quotes, in Google and Bing.",
  caseCheckPlatforms: "Check the platforms you use",
  caseCheckPlatformsText: "Look at your accounts and at groups where people you know may share things.",
  caseCheckOpen: "Open {name}",

  caseRightsTitle: "Is this abuse?",
  caseRightsText:
    "Yes. Making or sharing an intimate image of someone without consent is abuse, even if the image is fake or made with AI. It is not your fault, and you don't need to decide anything now.",
  caseRightsMore: "What can be done?",
  caseRightsMoreText:
    "You can ask platforms and search engines to remove it. In Spain there are also national services that can act quickly and support you. You'll see these options in step 3.",

  caseDecideIntro: "What would you like to do now? Every choice is okay, and you can change your mind later.",
  caseDecideReportNow: "Report now",
  caseDecideReportNowText: "See where you can ask for it to be removed, and prepare the reports.",
  caseDecideDocument: "Only keep a record for now",
  caseDecideDocumentText: "Write down what happened and save it, without reporting anything.",
  caseDecideTalk: "Talk to someone first",
  caseDecideTalkText: "See support services you can contact before deciding.",
  caseDecideNotNow: "Not now",
  caseDecideNotNowText: "Save what you have and leave. You can come back whenever you are ready.",
  caseDecideHint: "Choose one option above to continue.",
  caseDecideGoRoutes: "See reporting options",
  caseDecideGoDocument: "Continue to write it down",
  caseDecideTalkRoutes: "Look at reporting options anyway",
  caseSupportTitle: "Talk to someone",

  casePathwayIntro:
    "These are the places you can ask for help with removal. We've selected the ones that fit what you added. Choose the ones you want.",
  casePathwayEmpty: "Add at least one place in step 1 first.",
  casePathwayEmptyLink: "Go to step 1",
  casePathwayNeeds: "You'll need: {items}",
  casePathwayAlreadySent: "Already sent",
  casePathwayAlreadyPrepared: "Already prepared",
  casePathwayChooseHint: "Choose at least one option to continue.",
  casePathwayContinue: "Continue to prepare",
  casePathwayLawTitle: "About the law",
  casePathwayLawText:
    "In the EU, the Digital Services Act requires platforms to review reports about illegal content. Whether an AI-made intimate image is illegal currently depends on national law. An EU directive (2024/1385) must be applied in all member states by June 2027.",

  casePrepareIntro:
    "Describe what happened once; NEST uses it for every report. Then check what each place will receive.",
  casePrepareIntroDocument: "Write down what happened. Nothing will be sent.",
  casePrepareGoFollowup: "Continue to follow-up",
  casePrepareSwitchToReport: "I'd like to report after all",

  caseEvidenceTitle: "Keep a record before it changes",
  caseEvidenceTip1: "Save the links and usernames before you block or report an account. Posts and disappearing messages can vanish.",
  caseEvidenceTip2: "Don't forward the image, and don't keep it in a shared cloud folder.",
  caseEvidenceTip3: "On a shared device, use a private window.",
  caseEvidenceFingerprint: "Optional: create a fingerprint of a file you already have",

  caseDescribeTitle: "Describe it once",
  caseDescribeLabel: "What happened, and where does it appear?",
  caseDescribeName: "Your name or a pseudonym",
  caseDescribeEmail: "Email for replies (optional)",
  caseDescribeNotSaved:
    "Your name and email are not saved on this device. If you leave, you'll need to type them again.",

  caseDisclosureTitle: "Check what will be shared",
  caseDisclosureIntro:
    "A report to a platform normally includes your name and email; without them it may not be processed. Platforms may tell the reported account that a report was made. Check what each place will receive.",
  caseDisclosureNone: "No options are selected.",
  caseDisclosureNoneLink: "Choose options in step 3",
  caseDisclosureWillReceive: "{recipient} will receive: {items}.",
  caseDisclosureEdit: "View or edit the text",
  caseDisclosureEditLabel: "Text for: {title}",
  caseDisclosureReset: "Go back to the original text",
  caseDisclosureReviewed: "I've checked what will be shared",
  caseShareName: "your name or pseudonym",
  caseSharePlaceholder: "a placeholder instead of your name",
  caseShareEmail: "your email",
  caseShareLinks: "the links",
  caseShareDescription: "your description",
  caseShareFingerprint: "the file fingerprint",
  caseShareHash: "nothing from NEST. You use StopNCII yourself, only if you choose to",
  caseSend: "Send selected ({count})",
  caseSending: "Preparing…",
  caseSendSimulated: "This is a prototype: nothing is really sent. Sending is simulated.",

  caseSentTitle: "Saved to your case log",
  caseSentText: "Here is what happened with each option.",
  caseSentSimulated: "{recipient}: sending simulated. In this prototype nothing leaves your device.",
  caseSentManual: "{recipient}: ready for you to send. Copy the text and paste it into the official form.",
  caseSentMarked: "Marked as sent.",
  caseCopyOpen: "Copy text and open the official form",
  caseMarkSent: "I've sent it",

  caseFollowNextTitle: "What happens next",
  caseFollowNextText:
    "Platforms often reply within a few days, but it can take longer. NEST sets a reminder date 7 days after you send. In your case log you can note answers, get a reminder message, or ask for a review if a report is declined.",
  caseFollowOpenLog: "Open my case log",
  caseFollowSupportText: "Support services can help with how you feel, and with legal questions.",
  caseFollowShowSupport: "Show support services",
  caseAgainTitle: "It appeared again",
  caseAgainText: "Add the new link and NEST will prepare a new report. Reports you already made stay as they are.",
  caseAgainLink: "New link",
  caseAgainAdd: "Add and prepare a new report",
  caseRepeatNote: "Appeared again",
  reportMoved: "This page has moved. Taking you to your case…",

  /* Reporting routes */
  routeOtherPlatform: "Other platform",
  routeDsaTitle: "Report to {platform}",
  routeDsaAbout:
    "Platforms in the EU have to review reports about illegal content. Whether they accept reports about AI-made images when you don't know who made them still needs to be checked with each platform.",
  routeDeindexTitle: "Ask Google or Bing to hide search results",
  routeDeindexRecipient: "Google or Bing",
  routeDeindexAbout:
    "This hides the result in search, but does not delete the image from the website where it is. Check the search engine's current policy for AI-made intimate images.",
  routeNationalTitle: "AEPD priority channel (Spain)",
  routeNationalRecipient: "AEPD",
  routeNationalAbout:
    "Spain's data protection authority (AEPD) has a fast channel for sexual content published without consent. Check on its website what it needs and whether it accepts AI-made images.",
  routeHashTitle: "StopNCII: help stop it being uploaded again",
  routeHashRecipient: "StopNCII",
  routeHashAbout:
    "StopNCII creates a fingerprint of an image on your own device and shares only the fingerprint with participating platforms. You do this yourself on their website, and only if you have the image. If the image was made when you were under 18, Take It Down is the service for that.",
  routeHostTitle: "Report to the website host",
  routeHostRecipient: "Website host or registrar",
  routeHostAbout:
    "If the image is on an independent website, the company that hosts the website may remove it. A public lookup tool can show who hosts a website.",
  routeNeedLink: "the link",
  routeNeedLinks: "the links",
  routeNeedAccount: "the account name, if you know it",
  routeNeedDate: "the date you saw it",
  routeNeedDescription: "a short description",
  routeNeedSearchLink: "the link to the search result",
  routeNeedSearchWords: "the words you searched for",
  routeNeedName: "your name or a pseudonym",
  routeNeedEmailOptional: "an email (optional)",
  routeNeedFileOptional: "the image file on your device, only if you have it and want to use it",
  routeNeedWebsite: "the website's name",

  /* ------------------------------------------------------------------ */
  /* Case log (/dashboard)                                               */
  /* ------------------------------------------------------------------ */
  logTitle: "My case log",
  logIntro: "Saved only in this browser, on this device. Nothing here is sent anywhere.",
  logEmptyTitle: "Nothing here yet",
  logEmptyText: "When you prepare reports in your case, they appear here so you can follow up at your own pace.",
  logCaseTitle: "Case started {date}",
  logCaseCounts: "{places} place(s) · {reports} report(s)",
  logCaseNoReports: "No reports yet. Your notes are saved and you can continue whenever you want.",
  logCaseDeleted: "The case was deleted from this browser.",
  logOtherReports: "Other reports",
  logAgainText: "Found it somewhere new? Add the new link and NEST will prepare a new report.",
  logAgainButton: "Add a new link",

  logStatus: "Status",
  logStatusDraft: "Ready to send",
  logStatusSubmitted: "Sent",
  logStatusSubmittedSimulated: "Sent (simulated)",
  logStatusAcknowledged: "They replied",
  logStatusFollowUp: "Waiting for an answer",
  logStatusRemoved: "Content removed",
  logStatusDeclined: "Declined",
  logRoutePlatform: "Report to a platform",
  logRouteSearch: "Search results",
  logRouteNational: "National authority",
  logRouteHash: "StopNCII",
  logRouteHost: "Website host",
  logNoLink: "No link recorded",
  logPrepared: "Prepared {date}",
  logExpected: "answer expected by {date}",

  logReadyText: "You still need to send this yourself. Copy the text and paste it into the official form.",
  logCopyText: "Copy text",

  logNoAnswerTitle: "No answer yet?",
  logNoAnswerText: "The expected date has passed. You can send a short reminder:",
  logReminderTemplate:
    "I am following up on my report from {date}. My reference is {reference}. Please confirm the status and any next step.",
  logReminderSent: "I sent a reminder",
  logReminderDone: "Reminder sent on {date}",

  logDeclinedTitle: "They said no",
  logDeclinedText: "That is not the end. You can ask them to look at their decision again:",
  logReviewTemplate:
    "I ask you to review your decision to decline my report from {date} (reference {reference}). Please look again at the report and the reasons I gave, and tell me the outcome.",
  logReviewSent: "I sent this request",
  logReviewDone: "Review requested on {date}",
  logDeclinedMore:
    "Under the EU Digital Services Act, platforms must offer an internal complaint system for their decisions (Article 20). You can also use a certified out-of-court dispute settlement body (Article 21), or complain to the national Digital Services Coordinator (Article 53).",
  logReferencePlaceholder: "[reference]",

  logDetails: "Details and notes",
  logReference: "Reference number",
  logExpectedLabel: "Answer expected by",
  logNotes: "Private notes",
  logNotesPlaceholder: "For example: the date they replied, what they said",
  logFingerprint: "File fingerprint (SHA-256)",
  logShowText: "Show the text that was prepared",
  logDeleteReport: "Delete this report",
  logDeleteReportConfirm: "Delete this report from this browser? It can't be undone.",

  logDeleteAllTitle: "Delete everything",
  logDeleteAllText: "Remove all cases, reports and notes from this browser at any time.",
  logDeleteAll: "Delete everything",
  logDeleteAllConfirm: "This removes all cases, reports and notes from this browser. It can't be undone. Are you sure?",
  logDeleteAllYes: "Yes, delete everything",
  logAllDeleted: "Everything was deleted from this browser.",

  /* ------------------------------------------------------------------ */
  /* Support directory (shared by home and the guided case)              */
  /* ------------------------------------------------------------------ */
  supportSpainTitle: "In Spain",
  supportEuTitle: "Anywhere in the EU",
  supportEu116006: "116 006: helpline for victims of crime",
  supportEu116006Text: "One number in several EU countries. Check whether it works in your country.",
  supportEu116016: "116 016: helpline for women who experience violence",
  supportEu116016Text: "One number in several EU countries. Check whether it works in your country.",
  supportCost: "Cost: {cost}",
  supportLanguages: "Languages: {languages}",
  supportContact: "Contact: {contact}",
};
