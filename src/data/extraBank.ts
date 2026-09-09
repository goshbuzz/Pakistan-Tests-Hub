import { MCQ } from "@/lib/types";

function q(
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  difficulty: MCQ["difficulty"] = "medium"
): Omit<MCQ, "id" | "test_id"> {
  return {
    kind: "mcq",
    subject,
    topic,
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    source: "official",
  };
}

export const BANKING_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Banking GK", "SBP", "Monetary policy in Pakistan is announced by:", ["Ministry of Finance only", "State Bank of Pakistan", "SECP", "FBR"], 1, "SBP is the monetary authority."),
  q("Banking GK", "AML", "KYC in banks stands for:", ["Know Your Customer", "Keep Your Cash", "Karachi Yield Curve", "Key Year Credit"], 0, "Customer due diligence.", "easy"),
  q("Banking GK", "Products", "A current account typically:", ["pays high profit like a term deposit", "is for day-to-day transactions", "is only for minors", "cannot have a cheque book"], 1, "Transactional account.", "easy"),
  q("Banking GK", "Risk", "NPL means:", ["new personal loan", "non-performing loan", "national pension levy", "net profit line"], 1, "Loan past due / impaired."),
  q("Banking GK", "Digital", "Raast in Pakistan is:", ["a football league", "SBP instant payment system", "a tax form", "an insurance product"], 1, "Instant payments."),
  q("Computer", "Office", "In Excel, a formula starts with:", ["#", "=", "@", "/"], 1, "Equals sign.", "easy"),
];

export const TEACH_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Pedagogy", "Bloom", "Applying a formula to a new word problem is Bloom’s:", ["Remember", "Apply", "Create only", "Affective"], 1, "Application level."),
  q("Pedagogy", "Assessment", "Formative assessment is mainly to:", ["rank students once a year", "guide teaching during learning", "punish errors", "replace the syllabus"], 1, "Ongoing feedback."),
  q("Pedagogy", "Classroom", "Inclusive education means:", ["only high achievers", "learners of diverse needs in the same system", "no exams ever", "only private schools"], 1, "Access for all."),
  q("Subject", "Maths pedagogy", "Concrete–pictorial–abstract is a sequence for teaching:", ["history dates", "early mathematics", "sports only", "law"], 1, "CPA approach."),
];

export const LAW_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Law", "PPC", "Theft is generally defined in PPC around section:", ["302", "378", "420 only", "144"], 1, "s.378 PPC (confirm text)."),
  q("Law", "CrPC", "FIR is recorded under CrPC section:", ["154", "161", "173", "190"], 0, "s.154 information relating to cognizable offence."),
  q("Law", "CPC", "A plaint is:", ["the defendant’s reply", "the plaintiff’s statement of claim", "a police report", "an FIR"], 1, "Civil pleading."),
  q("Law", "Evidence", "Hearsay is generally:", ["always admissible", "inadmissible unless an exception applies", "the best evidence", "a decree"], 1, "Rule against hearsay."),
  q("Constitution", "FR", "Fundamental rights are mainly in Constitution Part:", ["II", "III", "VIII", "IX"], 0, "Part II (Arts 8–28 theme)."),
  q("Civil law", "Limitation", "Limitation law mainly bars:", ["the right itself always", "the remedy after time", "criminal appeals only", "ISSB"], 1, "Remedy, not always the right."),
  q("Criminal law", "Bail", "Bail in a bailable offence is:", ["discretionary always", "a right of the accused as a rule", "never granted", "only for civil suits"], 1, "Bailable vs non-bailable distinction."),
];

export const PROF_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Accounting", "Equation", "Assets equal:", ["Liabilities only", "Equity only", "Liabilities + equity", "Revenue − expenses"], 2, "Accounting equation."),
  q("FA", "Accrual", "Accrual accounting records revenue when:", ["cash is received always", "it is earned", "the director wishes", "tax is paid"], 1, "Earned, not necessarily cash."),
  q("Ethics", "CFA", "The CFA Institute Code requires putting:", ["your bonus first", "clients’ interests first", "the firm’s marketing first", "social media first"], 1, "Client first."),
  q("FRA", "Statements", "The statement of financial position shows:", ["cash flows only", "assets, liabilities, equity at a date", "only last year’s sales", "HR roster"], 1, "Balance sheet."),
  q("Quant", "TVM", "Present value of a future cash flow uses:", ["addition of interest only", "discounting", "ignoring time", "GDP"], 1, "Discounting."),
  q("FM", "Risk", "Diversification mainly reduces:", ["systematic market risk completely", "unsystematic / idiosyncratic risk", "inflation to zero", "tax"], 1, "Idiosyncratic."),
  q("AA", "Audit", "An unmodified audit opinion means the statements are:", ["guaranteed profit", "fairly presented in material respects", "tax-cleared", "fraud-proof"], 1, "Reasonable assurance."),
];

export const GAT_VERBAL: Omit<MCQ, "id" | "test_id">[] = [
  q("Verbal", "Analogy", "MALLEABLE : METAL ::", ["flexible : rubber", "brittle : water", "loud : silence", "dark : lamp"], 0, "Property of the material."),
  q("Verbal", "Antonym", "Antonym of “paucity”:", ["scarcity", "abundance", "lack", "dearth"], 1, "Abundance."),
  q("Verbal", "Completion", "The report was so ___ that the board asked for a one-page summary.", ["concise", "verbose", "brief", "pithy"], 1, "Verbose = wordy."),
  q("Verbal", "Reading", "Main idea questions ask you to:", ["pick a tiny detail", "state the passage’s central point", "invent facts", "translate to Urdu"], 1, "Central claim."),
  q("Quantitative", "Word", "15% of 240 is:", ["24", "36", "48", "30"], 1, "0.15×240=36.", "easy"),
  q("Quantitative", "Algebra", "If 3x = 18, x =", ["3", "6", "9", "15"], 1, "x=6.", "easy"),
];

export const IT_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Computer", "Network", "TCP is associated with:", ["reliable transport", "only physical cables", "printer ink", "CSS essays"], 0, "Transmission Control Protocol."),
  q("Computer", "DB", "Primary key uniquely identifies:", ["a column type only", "a row in a table", "a CSS optional", "an IELTS band"], 1, "Unique identifier."),
  q("Computer", "OS", "RAM is:", ["permanent disk only", "volatile working memory", "a printer", "BIOS chip always"], 1, "Volatile."),
  q("Job related", "IT", "SQL SELECT is used to:", ["delete the server OS", "query rows", "compile C++", "format CSS papers"], 1, "Query."),
];

export const ISSB_Q: Omit<MCQ, "id" | "test_id">[] = [
  q("Intelligence", "Verbal", "Find the next: ACE, BDF, CEG, ?", ["DFH", "DEF", "GHI", "ABC"], 0, "Each letter +1."),
  q("Intelligence", "Non-verbal", "If all figures rotate 90° clockwise, you should:", ["ignore orientation", "apply the same transform", "guess Pakistan capital", "write an essay"], 1, "Consistent transform."),
  q("ISSB", "GTO", "In a group task the selector mainly watches:", ["who shouts loudest", "cooperation, planning, and leadership under time", "memorised GK lists", "calligraphy"], 1, "Officer-like qualities."),
];

export function extraFor(allowed: string[]): Omit<MCQ, "id" | "test_id">[] {
  const low = allowed.map((a) => a.toLowerCase());
  const hit = (sub: string) =>
    low.some((a) => {
      const s = sub.toLowerCase();
      return s === a || a.includes(s) || s.includes(a.split(" ")[0]);
    });
  const all = [...BANKING_Q, ...TEACH_Q, ...LAW_Q, ...PROF_Q, ...GAT_VERBAL, ...IT_Q, ...ISSB_Q];
  return all.filter((x) => hit(x.subject));
}
