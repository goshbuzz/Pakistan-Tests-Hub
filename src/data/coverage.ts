import { TESTS } from "./tests";
import { ALERTS, MCQS, MOCKS, PAST_PAPERS, SYLLABUS } from "./content";
import { Alert, MCQ, MockConfig, PastPaper, PrepPack, SyllabusItem } from "@/lib/types";

const YEARS = [2023, 2024, 2025];

const CAT_SYL: Record<string, [string, string, string, number][]> = {
  Admissions: [
    ["English", "Usage", "Grammar and comprehension", 20],
    ["Quantitative / sciences", "Core", "As per programme (maths/physics/bio)", 50],
    ["Intelligence", "IQ", "Patterns and analysis", 15],
    ["Interview / merit", "Board policy", "Confirm on official admissions page", 15],
  ],
  "Admissions-Grad": [
    ["Verbal", "English", "GAT/NAT style", 30],
    ["Quantitative", "Maths", "Arithmetic and algebra", 35],
    ["Analytical", "Reasoning", "Arguments and data", 35],
  ],
  Recruitment: [
    ["English", "MCQ", "Testing-service battery", 25],
    ["Analytical", "IQ + quant", "Screening", 25],
    ["GK", "Pakistan & current", "As advertised", 20],
    ["Job related", "Subject", "Per project ad", 30],
  ],
  PSC: [
    ["English", "Essay / precis / MCQ", "Commission pattern", 25],
    ["Pakistan Studies / Islamiat / GK", "General", "Screening + written", 35],
    ["Optional / professional", "As advertised", "PMS / general recruitment", 40],
  ],
  Banking: [
    ["English", "Comprehension", "MTO/OG", 25],
    ["Quantitative", "Numeracy", "Interest, data", 25],
    ["Banking GK", "SBP & products", "AML/CFT basics", 30],
    ["IQ", "Analytical", "Logic", 20],
  ],
  Police: [
    ["Physical", "Standards", "As per rank advertisement", 30],
    ["Written", "GK / Islamiat / Pak Studies / English", "MCQ", 50],
    ["Interview", "Board", "After written", 20],
  ],
  Judicial: [
    ["Civil law", "CPC / Contract", "High Court syllabus", 30],
    ["Criminal law", "PPC / CrPC", "Written", 30],
    ["Constitution", "Pakistan", "Jurisprudence", 20],
    ["Judgment writing / viva", "Language", "English & Urdu", 20],
  ],
  Teaching: [
    ["English", "Language", "Educators paper", 20],
    ["Pedagogy", "Methods & assessment", "Classroom", 30],
    ["Subject content", "As per scale", "SESE/SSE/etc.", 30],
    ["GK / Islamiat / Pak Studies", "General", "One-paper", 20],
  ],
  "Armed Forces": [
    ["Intelligence", "Verbal / non-verbal", "Initial test", 30],
    ["Academic", "English, maths, GK, Islamiat", "MCQ", 30],
    ["Physical", "Running / strength", "As notified", 20],
    ["ISSB / medical", "Board", "After shortlist", 20],
  ],
  Professional: [
    ["Core papers", "Professional syllabus", "See official body", 60],
    ["Ethics / law", "Standards", "As applicable", 20],
    ["Electives", "Options", "Per institute", 20],
  ],
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function bankFor(testId: string, name: string): MCQ[] {
  const existing = MCQS.filter((m) => m.test_id === testId);
  const seeds: MCQ[] = [
    q(testId, "English", "Grammar", `For ${name}: choose the correct article — “He is ___ honest officer.”`, ["a", "an", "the", "no article"], 1, "honest begins with a vowel sound."),
    q(testId, "GK", "Pakistan", `National poet of Pakistan is generally regarded as:`, ["Mir Taqi Mir", "Allama Iqbal", "Ghalib", "Faiz only as national poet"], 1, "Allama Iqbal."),
    q(testId, "Quant", "Arithmetic", `12.5% of 80 =`, ["8", "10", "12", "16"], 1, "10."),
    q(testId, "Analytical", "Series", `2, 5, 10, 17, 26, ?`, ["35", "37", "39", "41"], 1, "+3,+5,+7,+9,+11 → 37."),
    q(testId, "Islamiat", "Basics", `There are how many pillars of Islam?`, ["4", "5", "6", "7"], 1, "Five."),
    q(testId, "Current", "Orgs", `Pakistan joined the UN in:`, ["1945", "1947", "1948", "1956"], 1, "30 September 1947."),
    q(testId, "English", "Vocab", `Synonym of “brief”:`, ["lengthy", "concise", "noisy", "rare"], 1, "concise."),
    q(testId, "Quant", "Ratio", `Divide 90 in 2:1. Larger part is:`, ["30", "45", "60", "75"], 2, "60."),
  ];
  const merged = [...existing];
  seeds.forEach((s) => {
    if (!merged.some((m) => m.question_text === s.question_text)) merged.push(s);
  });
  return merged;
}

function q(
  test_id: string,
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string
): MCQ {
  return {
    id: `${test_id}-${hash(question_text).toString(16)}`,
    test_id,
    subject,
    topic,
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty: "medium",
    source: "ai_generated",
  };
}

export const ALL_MCQS: MCQ[] = TESTS.flatMap((t) => {
  const bank = bankFor(t.id, t.name);
  const extras: MCQ[] = [];
  YEARS.forEach((year) => {
    bank.slice(0, 8).forEach((m, i) => {
      extras.push({
        ...m,
        id: `${m.id}-y${year}-${i}`,
        topic: `${m.topic} · ${year} pattern paper`,
        source: "ai_generated",
      });
    });
  });
  return [...bank, ...extras];
});

export const ALL_SYL: SyllabusItem[] = TESTS.flatMap((t) => {
  const have = SYLLABUS.filter((s) => s.test_id === t.id);
  if (have.length) return have;
  const rows = CAT_SYL[t.category] ?? CAT_SYL.Recruitment;
  return rows.map((r, i) => ({
    id: `${t.id}-gen-sy-${i}`,
    test_id: t.id,
    subject: r[0],
    topic: r[1],
    subtopic: r[2],
    weightage: r[3],
  }));
});

export const ALL_PAPERS: PastPaper[] = TESTS.flatMap((t) => {
  const have = PAST_PAPERS.filter((p) => p.test_id === t.id);
  const years = YEARS.map((year) => ({
    id: `${t.id}-paper-${year}`,
    test_id: t.id,
    year,
    conducting_body_variant: `${t.conducting_body} · pattern practice (not a leaked official PDF)`,
    file_url: `/mock/${t.id}?year=${year}`,
    source: t.official_url,
    verified: false,
  }));
  const official = {
    id: `${t.id}-official-hub`,
    test_id: t.id,
    year: 2025,
    conducting_body_variant: "Official conducting-body site",
    file_url: t.official_url,
    source: t.official_url,
    verified: true,
  };
  return [...years, official, ...have.filter((p) => !years.some((y) => y.year === p.year && p.file_url.startsWith("http") === false))];
});

export const ALL_MOCKS: MockConfig[] = TESTS.map((t) => {
  const have = MOCKS.find((m) => m.test_id === t.id);
  if (have) return have;
  return {
    id: `mk-all-${t.id}`,
    test_id: t.id,
    time_limit_minutes: 12,
    negative_marking: t.category === "PSC" || t.category === "Recruitment",
    negative_value: t.category === "PSC" || t.category === "Recruitment" ? 0.25 : 0,
    question_count: 8,
  };
});

export const ALL_ALERTS: Alert[] = [
  ...ALERTS,
  ...TESTS.filter((t) => !ALERTS.some((a) => a.test_id === t.id)).map((t) => ({
    id: `al-gen-${t.id}`,
    test_id: t.id,
    type: "announcement" as const,
    title: `${t.name}: watch ${t.conducting_body}`,
    body: `Registration, roll slips and results are only valid from ${t.official_url}. Sync jobs for saved tests in the Jobs tab.`,
    source_url: t.official_url,
    published_at: "2026-08-01T08:00:00Z",
  })),
];

export const PREP_PACKS: PrepPack[] = TESTS.map((t) => ({
  test_id: t.id,
  documents: defaultDocs(t.category),
  challan: t.fee_info,
  apply_url: t.official_url,
  apply_label: `Apply / register on ${t.conducting_body}`,
}));

function defaultDocs(cat: string): string[] {
  const common = [
    "CNIC / B-form (original + copies)",
    "Recent photographs (passport size)",
    "Domicile / PRC as required",
    "Educational certificates & transcripts",
    "Paid fee challan / bank deposit slip",
    "Email & mobile registered in your name",
  ];
  if (cat === "Armed Forces")
    return [...common, "Medical fitness awareness (eyes, BMI)", "NOC if already serving", "Hope certificate if result awaited"];
  if (cat === "Police") return [...common, "Physical standard printout", "Character certificate if asked"];
  if (cat === "Professional") return [...common, "Institute registration number", "Exemption letters if any"];
  if (cat === "Admissions" || cat === "Admissions-Grad")
    return [...common, "HSSC / bachelor result card", "Equivalence (IBCC/HEC) if foreign"];
  return common;
}

export function questionsForPaper(testId: string, year?: number): MCQ[] {
  const all = ALL_MCQS.filter((m) => m.test_id === testId);
  if (year) {
    const tagged = all.filter((m) => m.topic.includes(String(year)));
    if (tagged.length) return tagged.slice(0, 8);
  }
  const unique = all.filter((m) => !m.topic.includes("pattern paper"));
  return (unique.length ? unique : all).slice(0, 8);
}
