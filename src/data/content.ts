import { Alert, MCQ, MockConfig, PastPaper, SyllabusItem } from "@/lib/types";

const subjects: Record<string, { subject: string; topics: string[]; w: number }[]> = {
  "adm-01": [
    { subject: "Biology", topics: ["Cell Biology", "Bioenergetics", "Biodiversity", "Human Physiology", "Genetics"], w: 34 },
    { subject: "Chemistry", topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"], w: 27 },
    { subject: "Physics", topics: ["Mechanics", "Waves", "Electricity", "Modern Physics"], w: 27 },
    { subject: "English", topics: ["Vocabulary", "Grammar", "Comprehension"], w: 9 },
    { subject: "Logical Reasoning", topics: ["Critical Thinking", "Analytical"], w: 3 },
  ],
  "adm-02": [
    { subject: "Mathematics", topics: ["Calculus", "Algebra", "Trigonometry"], w: 30 },
    { subject: "Physics", topics: ["Mechanics", "Electricity", "Waves"], w: 30 },
    { subject: "Chemistry", topics: ["Physical", "Organic"], w: 20 },
    { subject: "English", topics: ["Grammar", "Comprehension"], w: 20 },
  ],
  "adm-03": [
    { subject: "Mathematics", topics: ["Calculus", "Algebra"], w: 40 },
    { subject: "Physics", topics: ["Mechanics", "EM"], w: 30 },
    { subject: "Chemistry", topics: ["General Chemistry"], w: 15 },
    { subject: "English", topics: ["Usage"], w: 10 },
    { subject: "Intelligence", topics: ["Patterns"], w: 5 },
  ],
  "psc-01": [
    { subject: "English Essay", topics: ["Structure", "Argument"], w: 8 },
    { subject: "English Precis", topics: ["Precis", "Comprehension"], w: 8 },
    { subject: "GSA", topics: ["Everyday Science", "GK"], w: 8 },
    { subject: "Current Affairs", topics: ["Pakistan", "World"], w: 8 },
    { subject: "Pakistan Affairs", topics: ["History", "Constitution"], w: 8 },
    { subject: "Islamiat", topics: ["Quran", "Fiqh"], w: 8 },
    { subject: "Optional", topics: ["Political Science", "IR"], w: 52 },
  ],
  "psc-02": [
    { subject: "English", topics: ["Essay", "Precis"], w: 20 },
    { subject: "Pakistan Studies", topics: ["History", "Geography"], w: 15 },
    { subject: "Islamiat", topics: ["Basics"], w: 10 },
    { subject: "Urdu", topics: ["Essay"], w: 15 },
    { subject: "General Knowledge", topics: ["Current", "Science"], w: 20 },
    { subject: "Optional", topics: ["As advertised"], w: 20 },
  ],
  "rec-01": [
    { subject: "English", topics: ["Grammar", "Vocab"], w: 25 },
    { subject: "Analytical", topics: ["Reasoning", "Quant"], w: 25 },
    { subject: "General Knowledge", topics: ["Pakistan", "World"], w: 25 },
    { subject: "Job Related", topics: ["Subject"], w: 25 },
  ],
  "arm-01": [
    { subject: "Intelligence", topics: ["Verbal", "Non-verbal"], w: 30 },
    { subject: "Psychology", topics: ["TAT", "WAT", "SRT"], w: 30 },
    { subject: "GTO", topics: ["Group Discussion", "Command Task"], w: 25 },
    { subject: "Interview", topics: ["Personality", "Current Affairs"], w: 15 },
  ],
  "pro-01": [
    { subject: "BT", topics: ["Business & Technology"], w: 10 },
    { subject: "MA", topics: ["Management Accounting"], w: 10 },
    { subject: "FA", topics: ["Financial Accounting"], w: 10 },
    { subject: "LW", topics: ["Corporate Law"], w: 10 },
    { subject: "PM", topics: ["Performance Management"], w: 12 },
    { subject: "FR", topics: ["Financial Reporting"], w: 16 },
    { subject: "AA", topics: ["Audit & Assurance"], w: 12 },
    { subject: "FM", topics: ["Financial Management"], w: 10 },
  ],
  "pro-02": [
    { subject: "PRC", topics: ["Accounting", "Economics", "Quant"], w: 25 },
    { subject: "CAF", topics: ["FAR", "Tax", "Audit"], w: 40 },
    { subject: "CFAP", topics: ["Advanced Accounting", "Business Strategy"], w: 25 },
    { subject: "MSA", topics: ["Multi-subject"], w: 10 },
  ],
  "pro-04": [
    { subject: "Ethics", topics: ["Code of Ethics", "GIPS"], w: 15 },
    { subject: "Quant", topics: ["TVM", "Stats"], w: 10 },
    { subject: "Economics", topics: ["Micro", "Macro"], w: 10 },
    { subject: "FRA", topics: ["Income Statement", "Balance Sheet"], w: 15 },
    { subject: "Corporate Issuers", topics: ["Governance"], w: 8 },
    { subject: "Equity", topics: ["Valuation"], w: 12 },
    { subject: "Fixed Income", topics: ["Bonds"], w: 12 },
    { subject: "Derivatives", topics: ["Forwards", "Options"], w: 8 },
    { subject: "Alt Investments", topics: ["RE", "PE"], w: 5 },
    { subject: "Portfolio", topics: ["CAPM"], w: 5 },
  ],
  "bnk-01": [
    { subject: "English", topics: ["Grammar", "Comprehension"], w: 25 },
    { subject: "Quantitative", topics: ["Arithmetic", "Data"], w: 25 },
    { subject: "Analytical", topics: ["Logic"], w: 20 },
    { subject: "Banking GK", topics: ["SBP", "Products"], w: 30 },
  ],
};

export const SYLLABUS: SyllabusItem[] = Object.entries(subjects).flatMap(([tid, subs]) =>
  subs.flatMap((s, si) =>
    s.topics.map((t, ti) => ({
      id: `${tid}-sy-${si}-${ti}`,
      test_id: tid,
      subject: s.subject,
      topic: t,
      subtopic: `${t} core concepts`,
      weightage: Math.round(s.w / s.topics.length),
    }))
  )
);

export const PAST_PAPERS: PastPaper[] = [
  "adm-01", "adm-02", "adm-03", "psc-01", "psc-02", "rec-01", "arm-01", "pro-01", "pro-02", "pro-04", "bnk-01",
].flatMap((tid) =>
  [2022, 2023, 2024, 2025].map((y) => ({
    id: `${tid}-pp-${y}`,
    test_id: tid,
    year: y,
    conducting_body_variant: "Official / aggregator archive",
    file_url: "#",
    source: "aggregator",
    verified: y >= 2024,
  }))
);

function q(
  id: string,
  test_id: string,
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  difficulty: MCQ["difficulty"] = "medium"
): MCQ {
  return {
    id, test_id, subject, topic, question_text, options, correct_answer, explanation, difficulty, source: "ai_generated",
  };
}

export const MCQS: MCQ[] = [
  q("m1", "adm-01", "Biology", "Cell Biology", "Which organelle is the primary site of ATP synthesis in eukaryotic cells?", ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"], 1, "Oxidative phosphorylation occurs in mitochondria."),
  q("m2", "adm-01", "Biology", "Genetics", "In Mendelian inheritance, a heterozygous monohybrid cross yields which phenotypic ratio?", ["1:1", "3:1", "9:3:3:1", "1:2:1"], 1, "Dominant:recessive phenotypes appear 3:1."),
  q("m3", "adm-01", "Chemistry", "Physical Chemistry", "The pH of a 0.001 M HCl solution is approximately:", ["1", "2", "3", "4"], 2, "pH = −log[H+] = 3."),
  q("m4", "adm-01", "Physics", "Mechanics", "A body of mass 2 kg accelerates at 3 m/s². Net force is:", ["1.5 N", "5 N", "6 N", "9 N"], 2, "F = ma = 6 N."),
  q("m5", "adm-01", "English", "Grammar", "Choose the correct sentence:", ["He don't know.", "He doesn't knows.", "He doesn't know.", "He not know."], 2, "Third-person singular uses doesn't + base verb."),
  q("m6", "adm-01", "Logical Reasoning", "Critical Thinking", "All roses are flowers. Some flowers fade quickly. Therefore:", ["All roses fade quickly", "Some roses fade quickly", "No valid conclusion about roses fading", "No flowers are roses"], 2, "The 'some flowers' set may not include roses."),
  q("m7", "adm-01", "Biology", "Human Physiology", "The pacemaker of the heart is the:", ["AV node", "SA node", "Purkinje fibres", "Bundle of His"], 1, "SA node initiates the cardiac impulse."),
  q("m8", "adm-01", "Chemistry", "Organic Chemistry", "The functional group of ketones is:", ["–CHO", "–COOH", ">C=O", "–OH"], 2, "Carbonyl bonded to two carbons."),
  q("m9", "adm-01", "Physics", "Electricity", "SI unit of electric charge is:", ["Volt", "Ampere", "Coulomb", "Ohm"], 2, "Charge is measured in coulomb."),
  q("m10", "adm-01", "Biology", "Bioenergetics", "Light-dependent reactions of photosynthesis occur in the:", ["Stroma", "Thylakoid membrane", "Cytoplasm", "Nucleus"], 1, "Thylakoids house photosystems."),
  q("e1", "adm-02", "Mathematics", "Calculus", "d/dx (x³) equals:", ["x²", "2x²", "3x²", "3x"], 2, "Power rule."),
  q("e2", "adm-02", "Physics", "Mechanics", "Work done by a constant force F over displacement s (same direction) is:", ["F/s", "F+s", "F·s", "F−s"], 2, "W = Fs when parallel."),
  q("e3", "adm-02", "Chemistry", "Physical", "Avogadro's number is approximately:", ["6.02 × 10²³", "3.14 × 10⁸", "9.8 × 10⁹", "1.6 × 10⁻¹⁹"], 0, "Particles per mole."),
  q("e4", "adm-02", "English", "Grammar", "Synonym of 'rapid' is:", ["slow", "quick", "late", "weak"], 1, "Rapid means quick."),
  q("e5", "adm-02", "Mathematics", "Algebra", "If 2x + 4 = 10, x =", ["2", "3", "4", "6"], 1, "2x = 6 ⇒ x = 3."),
  q("n1", "adm-03", "Mathematics", "Algebra", "The roots of x² − 5x + 6 = 0 are:", ["1 and 6", "2 and 3", "−2 and −3", "0 and 5"], 1, "Factors (x−2)(x−3)."),
  q("n2", "adm-03", "Physics", "Mechanics", "Acceleration due to gravity on Earth is about:", ["8.9 m/s", "9.8 m/s²", "10 N", "6.67 × 10⁻¹¹"], 1, "g ≈ 9.8 m/s²."),
  q("n3", "adm-03", "English", "Usage", "Choose the correctly spelled word:", ["Recieve", "Receive", "Receve", "Receeve"], 1, "i before e except after c — receive."),
  q("n4", "adm-03", "Intelligence", "Patterns", "2, 6, 12, 20, 30, ?", ["36", "40", "42", "44"], 2, "Differences +4,+6,+8,+10,+12."),
  q("n5", "adm-03", "Chemistry", "General Chemistry", "Atomic number equals:", ["Neutrons", "Protons", "Mass number", "Electrons + neutrons"], 1, "Z = proton count."),
  q("c1", "psc-01", "Current Affairs", "Pakistan", "The Constitution of Pakistan currently in force was adopted in:", ["1956", "1962", "1973", "1985"], 2, "1973 Constitution."),
  q("c2", "psc-01", "Pakistan Affairs", "History", "Pakistan Resolution was passed in:", ["1930 Lahore", "1940 Lahore", "1946 Delhi", "1947 Karachi"], 1, "23 March 1940."),
  q("c3", "psc-01", "GSA", "Everyday Science", "Vitamin C deficiency causes:", ["Beriberi", "Scurvy", "Rickets", "Night blindness"], 1, "Scurvy from ascorbate lack."),
  q("c4", "psc-01", "Islamiat", "Quran", "The first revealed verses of the Quran are generally identified with Surah:", ["Al-Baqarah", "Al-Fatiha", "Al-Alaq", "Ya-Sin"], 2, "Iqra (Al-Alaq)."),
  q("c5", "psc-01", "English Precis", "Comprehension", "A précis should primarily be:", ["Longer than the original", "A concise restatement of core ideas", "A critique", "A quotation list"], 1, "Condensed faithful summary."),
  q("p1", "psc-02", "Pakistan Studies", "History", "Allama Iqbal's Allahabad Address was delivered in:", ["1928", "1930", "1940", "1947"], 1, "1930 Allahabad."),
  q("p2", "psc-02", "General Knowledge", "Current", "The currency of Pakistan is the:", ["Rupee", "Taka", "Riyal", "Dirham"], 0, "Pakistani rupee."),
  q("p3", "psc-02", "Islamiat", "Basics", "Zakat is payable at the rate of:", ["1.0%", "2.5%", "5%", "10% on all wealth"], 1, "2.5% of nisab-eligible wealth."),
  q("p4", "psc-02", "English", "Essay", "A thesis statement in an essay is:", ["The conclusion only", "The controlling idea of the essay", "A quotation", "The bibliography"], 1, "It states the central claim."),
  q("r1", "rec-01", "English", "Grammar", "Antonym of 'scarce' is:", ["rare", "abundant", "little", "tiny"], 1, "Scarce vs abundant."),
  q("r2", "rec-01", "Analytical", "Quant", "15% of 200 is:", ["15", "20", "30", "35"], 2, "0.15×200=30."),
  q("r3", "rec-01", "General Knowledge", "Pakistan", "The highest peak in Pakistan is:", ["Nanga Parbat", "K2", "Broad Peak", "Gasherbrum I"], 1, "K2 (Godwin-Austen)."),
  q("r4", "rec-01", "Job Related", "Subject", "A public-sector job advertisement in Pakistan is typically published in:", ["Only social media", "Newspapers / official websites", "Private WhatsApp groups only", "None"], 1, "Official channels and newspapers."),
  q("i1", "arm-01", "Intelligence", "Verbal", "Odd one out: Apple, Mango, Carrot, Banana", ["Apple", "Mango", "Carrot", "Banana"], 2, "Carrot is a root vegetable."),
  q("i2", "arm-01", "Psychology", "WAT", "In WAT, candidates should write:", ["Long essays", "First natural association as a short sentence", "Copied slogans only", "Nothing"], 1, "Word Association Test uses brief spontaneous sentences."),
  q("i3", "arm-01", "GTO", "Group Discussion", "In GTO group discussion, a strong candidate typically:", ["Dominates by interrupting", "Listens, contributes with facts, and helps consensus", "Stays silent", "Argues personally"], 1, "Leadership with cooperation."),
  q("i4", "arm-01", "Interview", "Current Affairs", "ISSB interviews often probe:", ["Only sports trivia", "Motivation for forces, awareness, and personality", "Only family income", "Coding skills only"], 1, "Officer-like qualities and motivation."),
  q("a1", "pro-01", "FA", "Financial Accounting", "The accounting equation is:", ["Assets = Liabilities − Equity", "Assets = Liabilities + Equity", "Assets + Liabilities = Equity", "Revenue = Assets"], 1, "A = L + E."),
  q("a2", "pro-01", "MA", "Management Accounting", "A variable cost per unit typically:", ["Rises as volume rises", "Stays constant per unit as volume changes", "Is always zero", "Equals fixed cost"], 1, "Variable cost per unit is constant; total varies."),
  q("a3", "pro-01", "AA", "Audit & Assurance", "An unmodified audit opinion means:", ["Financial statements are free of all error with certainty", "Fair presentation in all material respects", "The company is profitable", "Internal audit failed"], 1, "Reasonable assurance of fair presentation."),
  q("a4", "pro-01", "FM", "Financial Management", "NPV decision rule for a conventional project: accept if NPV is:", ["Negative", "Zero only", "Positive", "Equal to IRR"], 2, "Positive NPV adds value."),
  q("ca1", "pro-02", "PRC", "Accounting", "Double-entry bookkeeping requires that every transaction:", ["Affects only cash", "Has equal debits and credits", "Is recorded once", "Skips the ledger"], 1, "Debits = credits."),
  q("ca2", "pro-02", "CAF", "Tax", "In Pakistan, income tax is administered primarily by:", ["SBP", "FBR", "SECP", "SBP BSC"], 1, "Federal Board of Revenue."),
  q("ca3", "pro-02", "CAF", "Audit", "Independence of the external auditor is required to:", ["Increase fees", "Support unbiased opinion", "Replace management", "Prepare tax returns"], 1, "Credibility of the opinion."),
  q("cf1", "pro-04", "Ethics", "Code of Ethics", "CFA Institute Standard I(A) relates to:", ["Loyalty to employer", "Knowledge of the law", "Fair dealing", "Performance presentation"], 1, "Knowledge of the Law."),
  q("cf2", "pro-04", "Quant", "TVM", "If interest is compounded more frequently, the effective annual rate:", ["Falls", "Stays identical always", "Rises (for a given nominal rate)", "Becomes negative"], 2, "More compounding → higher EAR."),
  q("cf3", "pro-04", "FRA", "Income Statement", "Revenue is recognized when:", ["Cash is always received", "Performance obligations are satisfied (IFRS 15)", "The contract is signed only", "The year ends"], 1, "IFRS 15 control transfer."),
  q("cf4", "pro-04", "Equity", "Valuation", "A high P/E relative to peers may indicate:", ["Always a bargain", "Higher growth expectations or overvaluation", "Zero risk", "Negative earnings only"], 1, "Multiple reflects growth and/or mispricing."),
  q("b1", "bnk-01", "Banking GK", "SBP", "The central bank of Pakistan is:", ["NBP", "HBL", "SBP", "SECP"], 2, "State Bank of Pakistan."),
  q("b2", "bnk-01", "Quantitative", "Arithmetic", "Simple interest on 10,000 at 10% for 2 years is:", ["1,000", "2,000", "2,100", "1,200"], 1, "SI = PRT/100 = 2000."),
  q("b3", "bnk-01", "English", "Grammar", "Fill in: She has been working here ___ 2020.", ["since", "for", "from", "at"], 0, "Since + point in time."),
  q("b4", "bnk-01", "Analytical", "Logic", "If all MTOs are graduates and some graduates are MBAs, then:", ["All MTOs are MBAs", "Some MTOs may be MBAs", "No MTO is an MBA", "All MBAs are MTOs"], 1, "Overlap is possible, not necessary."),
];

export const MOCKS: MockConfig[] = [
  { id: "mk-adm-01", test_id: "adm-01", time_limit_minutes: 20, negative_marking: false, negative_value: 0, question_count: 10 },
  { id: "mk-adm-02", test_id: "adm-02", time_limit_minutes: 10, negative_marking: false, negative_value: 0, question_count: 5 },
  { id: "mk-adm-03", test_id: "adm-03", time_limit_minutes: 10, negative_marking: false, negative_value: 0, question_count: 5 },
  { id: "mk-psc-01", test_id: "psc-01", time_limit_minutes: 12, negative_marking: true, negative_value: 0.25, question_count: 5 },
  { id: "mk-psc-02", test_id: "psc-02", time_limit_minutes: 10, negative_marking: true, negative_value: 0.25, question_count: 4 },
  { id: "mk-rec-01", test_id: "rec-01", time_limit_minutes: 8, negative_marking: true, negative_value: 0.25, question_count: 4 },
  { id: "mk-arm-01", test_id: "arm-01", time_limit_minutes: 8, negative_marking: false, negative_value: 0, question_count: 4 },
  { id: "mk-pro-01", test_id: "pro-01", time_limit_minutes: 10, negative_marking: false, negative_value: 0, question_count: 4 },
  { id: "mk-pro-02", test_id: "pro-02", time_limit_minutes: 8, negative_marking: false, negative_value: 0, question_count: 3 },
  { id: "mk-pro-04", test_id: "pro-04", time_limit_minutes: 10, negative_marking: false, negative_value: 0, question_count: 4 },
  { id: "mk-bnk-01", test_id: "bnk-01", time_limit_minutes: 8, negative_marking: true, negative_value: 0.25, question_count: 4 },
];

export const ALERTS: Alert[] = [
  { id: "al1", test_id: "adm-01", type: "new_date", title: "MDCAT 2026 registration window (indicative)", body: "Provincial boards typically open MDCAT registration in summer. Confirm on PMDC/UHS portals.", source_url: "https://pmdc.pk", published_at: "2026-08-20T09:00:00Z" },
  { id: "al2", test_id: "psc-01", type: "announcement", title: "CSS MPT cycle — check FPSC", body: "FPSC publishes CSS calendar, MPT and CE dates on fpsc.gov.pk. Save this test for alerts.", source_url: "https://www.fpsc.gov.pk", published_at: "2026-08-28T10:00:00Z" },
  { id: "al3", test_id: "rec-01", type: "new_date", title: "New NTS project advertisements", body: "NTS posts rolling recruitment projects. Visit nts.org.pk and portal.nts.org.pk for roll slips.", source_url: "https://nts.org.pk", published_at: "2026-09-01T08:00:00Z" },
  { id: "al4", test_id: "adm-03", type: "announcement", title: "NUST NET series schedule", body: "Multiple NET sessions each year. Apply early on the NUST admissions portal.", source_url: "https://nust.edu.pk/admissions", published_at: "2026-08-01T08:00:00Z" },
  { id: "al5", test_id: "psc-02", type: "roll_slip", title: "PPSC PMS screening — roll number slips", body: "Download slips from ppsc.gop.pk when the notice is live.", source_url: "https://www.ppsc.gop.pk", published_at: "2026-08-12T11:00:00Z" },
  { id: "al6", test_id: "bnk-01", type: "new_date", title: "Commercial bank MTO drives", body: "Large banks often use IBP-style tests. Watch careers pages and ibp.org.pk.", source_url: "https://ibp.org.pk", published_at: "2026-08-15T09:00:00Z" },
  { id: "al7", test_id: "arm-01", type: "announcement", title: "ISSB centres operational", body: "Kohat, Gujranwala, Malir, Quetta. Report dates are issued after initial tests.", source_url: "https://www.joinpakarmy.gov.pk", published_at: "2026-08-05T09:00:00Z" },
  { id: "al8", test_id: "pro-04", type: "new_date", title: "CFA exam windows", body: "Level I/II/III offered in multiple windows. Register at cfainstitute.org.", source_url: "https://www.cfainstitute.org", published_at: "2026-07-20T09:00:00Z" },
  { id: "al9", test_id: "pro-01", type: "result", title: "ACCA exam results release pattern", body: "Results follow CBE and session exams on ACCA dates. Check myACCA.", source_url: "https://www.accaglobal.com/pk/en.html", published_at: "2026-08-08T09:00:00Z" },
  { id: "al10", test_id: "pro-02", type: "announcement", title: "ICAP exam diet", body: "Summer/Winter diets — see student.icap.org.pk for admit cards.", source_url: "https://student.icap.org.pk", published_at: "2026-08-02T09:00:00Z" },
  { id: "al11", test_id: "adm-02", type: "new_date", title: "ECAT / UET entry cycle", body: "UET Lahore announces ECAT each summer. Confirm on uet.edu.pk.", source_url: "https://uet.edu.pk", published_at: "2026-07-22T09:00:00Z" },
];

export const LEADERBOARD = [
  { name: "Ayesha K.", points: 2840, streak: 21, category: "Admissions" },
  { name: "Hassan R.", points: 2610, streak: 14, category: "PSC" },
  { name: "Fatima S.", points: 2490, streak: 30, category: "Professional" },
  { name: "Bilal M.", points: 2210, streak: 9, category: "Recruitment" },
  { name: "Zainab A.", points: 2105, streak: 12, category: "Admissions" },
  { name: "Usman T.", points: 1980, streak: 7, category: "Armed Forces" },
  { name: "Noor I.", points: 1875, streak: 18, category: "Banking" },
  { name: "Hamza Q.", points: 1760, streak: 4, category: "PSC" },
];
