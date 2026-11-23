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

  /* Legacy keys still used by the guided case (replaced in the /case update) */
  rightsTitle: "Is this abuse?",
  exposureTitle: "A safe exposure check",
  locationsTitle: "Where did you find it?",
  addLocation: "Add location",
  reportNow: "Report now",
  documentOnly: "Only document for now",
  talkFirst: "Talk to someone first",
  notNow: "Not now (save and leave)",
  supportDirectory: "Verified support directory (Spain)",
  evidenceTitle: "Evidence, URL first",
  describeOnce: "Describe once",
  disclosureTitle: "Review what will be shared",
  sendSelected: "Send selected",
  followupTitle: "Follow-up & support",
  appearedAgain: "The content appeared again",
  talkSomeone: "Talk to someone",

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
