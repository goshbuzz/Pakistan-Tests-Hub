import type { Faq } from "./faqs";

/**
 * Page-relevant FAQ blocks for AEO/GEO (Master Prompt Phase 6): every indexable page
 * answers its own visitors' questions in the first sentence, in plain self-contained
 * language. These sets are deliberately disjoint from each other and from the global
 * /faq page so each page gives answer engines something distinct to cite.
 */
export const PAGE_FAQS: Record<string, Faq[]> = {
  explore: [
    {
      q: "How many tests can I practise here for free?",
      a: "All of them — the hub lists 100+ Pakistani exams across 11 categories, and every syllabus, MCQ bank and timed mock behind those cards is free with no signup required.",
    },
    {
      q: "Which filter should I use first — category or career stage?",
      a: "Start with career stage if you know where you stand (Intermediate, Graduate, Job Seeker, Professional); switch to category when you already know the exam body, like PPSC one-paper jobs or NTS GAT. Filters stack.",
    },
    {
      q: "Do international exams like IELTS or SAT count toward the same streak?",
      a: "Yes. International tests use the same ticklists, MCQ drill and timed-mock scoring as local exams, so points and day streaks apply to every test in the list.",
    },
    {
      q: "What happens when I open a test card?",
      a: "Each card opens a full prep page with nine tabs — overview, study guide, syllabus, past-paper pointers, MCQ bank, mock player, matched job ads, official apply link and alerts for that test.",
    },
  ],
  jobs: [
    {
      q: "Are these real government job advertisements?",
      a: "Yes — listings are transcribed from official FPSC, PPSC, NTS, PTS, police and bank advertisement pages, and every card links straight to that official source. Pakistan Tests Hub never collects applications.",
    },
    {
      q: "Can I apply for a job directly on this site?",
      a: "No, and that is intentional. Applications happen only on the conducting body's own portal (fpsc.gov.pk, ppsc.gop.pk, nts.org.pk, departmental sites). Use the “Open official apply page” link on each ad.",
    },
    {
      q: "How do I prepare for the written test after applying?",
      a: "Each ad is linked to its test page — the matching syllabus ticklist, free MCQ bank and 10 timed mocks shaped to that paper's real subject mix — so one listing becomes a complete study plan.",
    },
    {
      q: "How often are listings refreshed?",
      a: "Listings are synced from official sources regularly, and every card shows the sync date. If a last date looks close, treat the official site's copy as authoritative — newspaper ads occasionally shift deadlines.",
    },
  ],
  alerts: [
    {
      q: "What kinds of exam alerts appear on this feed?",
      a: "Admit-card releases, exam date sheets, result announcements, fee-deadline extensions and eligibility corrections — the notice types that actually change what a candidate must do next.",
    },
    {
      q: "Where do these alerts come from?",
      a: "Each alert is restyled from an official conducting-body notice (FPSC, PPSC, NTS, UHS, PMDC, provincial police, universities). The source site is always one tap away and is the final word.",
    },
    {
      q: "Can I get only alerts for my saved tests?",
      a: "Yes — save the tests you're sitting on the hub, then switch the feed to “Saved only”. Signed-in users on Android/Chrome can additionally turn on local browser notifications from the Profile screen.",
    },
    {
      q: "Is an alert here proof that my application was accepted?",
      a: "No. Alerts summarise public notices, not individual statuses. Check your roll-number slip or application status on the conducting body's own portal.",
    },
  ],
  about: [
    {
      q: "Who runs Pakistan Tests Hub?",
      a: "GoshBuzz (goshbuzz.com), a digital publishing project. The hub is its education line: free, ad-supported, unofficial exam-prep material for Pakistan.",
    },
    {
      q: "Is Pakistan Tests Hub affiliated with FPSC, PPSC, NTS or any board?",
      a: "No. It is an independent study aid that links to official bodies; it has no authority to issue papers, results or admissions.",
    },
    {
      q: "Why is everything free?",
      a: "Because prep material shouldn't gate on price. The site runs on non-intrusive display ads instead of academy fees, and practice data stays on your device rather than being harvested.",
    },
    {
      q: "How do you write questions without past papers?",
      a: "Original items are authored against each exam's last publicly described pattern — subject weights, difficulty spread and section mix — never copied from copyrighted or leaked papers.",
    },
  ],
  contact: [
    {
      q: "How do I report a wrong syllabus or an outdated exam pattern?",
      a: "Use the “Suggest an update” box at the bottom of the affected test page — it queues your note with the current test ID for editorial review; email is listed on this page as a fallback.",
    },
    {
      q: "Can I request a new test be added to the hub?",
      a: "Yes. Describe the exam, its conducting body and the public pattern document on the contact email; popular requests are prioritised in the next content batch.",
    },
    {
      q: "I'm stuck on an official portal's apply page — can you help?",
      a: "We can't act on behalf of the commission, but tell us where you got stuck and we'll link the correct official helpdesk or guide; the application itself always belongs to the conducting body.",
    },
    {
      q: "What response time should I expect?",
      a: "Editorial replies typically take a few working days. Time-sensitive deadline issues flagged from alerts pages are checked first.",
    },
  ],
  privacy: [
    {
      q: "Where is my account, streak and mock history stored?",
      a: "Only inside this browser, in IndexedDB on your own device. Pakistan Tests Hub runs no user database on any server, so there is nothing to breach, sell or hand over.",
    },
    {
      q: "Are passwords sent anywhere?",
      a: "No. Sign-up hashes the password with PBKDF2-SHA256 locally before storing it, and login compares the hash on-device. The password never leaves your phone or laptop.",
    },
    {
      q: "What do the cookies and Google ads mean for me?",
      a: "Google AdSense may use cookies to serve ads based on prior visits. You can review and opt out at Google Ads Settings (adssettings.google.com); the cookie bar links straight to it.",
    },
    {
      q: "How do I erase everything?",
      a: "Clear site data for this domain in your browser settings (or uninstall the installed app) — that wipes the IndexedDB database, your saved tests and scores in one action.",
    },
  ],
  terms: [
    {
      q: "Is information on this site official?",
      a: "No — every pattern, fee and date is unofficial summary material. The authoritative text lives on the conducting body's website, and each page links to it.",
    },
    {
      q: "Are my mock scores equivalent to real results?",
      a: "They measure practice only. Real scoring, negative marking and normalization follow each board's current rules, which can change per cycle.",
    },
    {
      q: "Why don't you host past-paper PDFs?",
      a: "Past papers are usually copyrighted exam-board property, and “leaked” copies are unreliable. Original questions aligned to the public pattern give the same training value without legal or accuracy risk.",
    },
    {
      q: "Can I copy your MCQs into my academy's handouts?",
      a: "Not without permission — the content belongs to GoshBuzz. Linking to a page instead of copying it is always welcome and keeps answers current.",
    },
  ],
};

export type PageFaqKey = keyof typeof PAGE_FAQS;
