import { applyUrl } from "./applyUrls";
import { TESTS } from "./tests";
import { ALERTS, MCQS, MOCKS, PAST_PAPERS, SYLLABUS } from "./content";
import { publicMcqsFor } from "./publicMcqs";
import { mixFor } from "./mixQuestions";
import { matchesSubject, subjectsFor } from "./sections";
import { Alert, MCQ, MockConfig, PastPaper, PrepPack, SyllabusItem } from "@/lib/types";
import { patternFor } from "./patterns";

const YEARS = [2023, 2024, 2025];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function bankFor(testId: string): MCQ[] {
  const cat = TESTS.find((x) => x.id === testId)?.category ?? "Recruitment";
  const allowed = subjectsFor(testId, cat);
  const existing = [
    ...MCQS.filter((m) => m.test_id === testId),
    ...publicMcqsFor(testId),
    ...mixFor(testId, cat).map((m, i) => ({
      ...m,
      id: `${testId}-mix-${i}`,
      test_id: testId,
    })),
  ].filter((m) => matchesSubject(m.subject, allowed));
  return existing.length ? existing : publicMcqsFor(testId).filter((m) => matchesSubject(m.subject, allowed));
}

export const ALL_MCQS: MCQ[] = TESTS.flatMap((t) => bankFor(t.id));

export const ALL_SYL: SyllabusItem[] = TESTS.flatMap((t) => {
  const have = SYLLABUS.filter((s) => s.test_id === t.id);
  if (have.length) return have;
  const subs = subjectsFor(t.id, t.category);
  const w = Math.max(1, Math.round(100 / subs.length));
  return subs.map((subject, i) => ({
    id: `${t.id}-gen-sy-${i}`,
    test_id: t.id,
    subject,
    topic: `${subject} — current outline`,
    subtopic: `${patternFor(t.id)} (syllabus_version ${t.last_updated})`,
    weightage: w,
  }));
});

export const ALL_PAPERS: PastPaper[] = TESTS.flatMap((t) => {
  const years = YEARS.map((year) => ({
    id: `${t.id}-paper-${year}`,
    test_id: t.id,
    year,
    conducting_body_variant: `${t.conducting_body} · syllabus practice`,
    file_url: `/mock/${t.id}?year=${year}&n=1`,
    source: applyUrl(t.id, t.official_url),
    verified: false,
  }));
  return [
    ...years,
    {
      id: `${t.id}-official-hub`,
      test_id: t.id,
      year: 2025,
      conducting_body_variant: "Official site",
      file_url: applyUrl(t.id, t.official_url),
      source: applyUrl(t.id, t.official_url),
      verified: true,
    },
    ...PAST_PAPERS.filter((p) => p.test_id === t.id && p.file_url.startsWith("http")),
  ];
});

export const ALL_MOCKS: MockConfig[] = TESTS.map((t) => {
  const have = MOCKS.find((m) => m.test_id === t.id);
  return (
    have ?? {
      id: `mk-all-${t.id}`,
      test_id: t.id,
      time_limit_minutes: 15,
      negative_marking: t.category === "PSC" || t.category === "Recruitment",
      negative_value: 0.25,
      question_count: 12,
    }
  );
});

export const ALL_ALERTS: Alert[] = [
  ...ALERTS,
  ...TESTS.filter((t) => !ALERTS.some((a) => a.test_id === t.id)).map((t) => ({
    id: `al-gen-${t.id}`,
    test_id: t.id,
    type: "announcement" as const,
    title: `${t.name}: watch ${t.conducting_body}`,
    body: `Syllabus version ${t.last_updated}. Official: ${applyUrl(t.id, t.official_url)}`,
    source_url: applyUrl(t.id, t.official_url),
    published_at: "2026-08-01T08:00:00Z",
  })),
];

export const PREP_PACKS: PrepPack[] = TESTS.map((t) => ({
  test_id: t.id,
  documents: defaultDocs(t.category),
  challan: t.fee_info,
  apply_url: applyUrl(t.id, t.official_url),
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
  if (cat === "Armed Forces") return [...common, "Medical fitness awareness", "NOC if serving"];
  if (cat === "Police") return [...common, "Physical standard printout"];
  if (cat === "Professional") return [...common, "Institute registration number"];
  if (cat === "Admissions" || cat === "Admissions-Grad") return [...common, "HSSC / bachelor result card"];
  return common;
}

export function mockLevel(n: number): "easy" | "medium" | "hard" {
  if (n <= 3) return "easy";
  if (n <= 7) return "medium";
  return "hard";
}

/** Fresh draw every call so opening a mock is not the same paper twice. */
export function questionsForPaper(testId: string, year?: number, mockN = 1): MCQ[] {
  const cat = TESTS.find((x) => x.id === testId)?.category ?? "Recruitment";
  const allowed = subjectsFor(testId, cat);
  const unique = ALL_MCQS.filter((m) => m.test_id === testId && matchesSubject(m.subject, allowed));
  const n = Math.min(10, Math.max(1, mockN));
  const lvl = mockLevel(n);
  let pool = unique.filter((m) => (m.difficulty ?? "medium") === lvl);
  if (pool.length < 8) pool = unique;
  const picked = shuffle(pool).slice(0, 12);
  return picked.map((q) => ({
    ...q,
    topic: `${q.topic} · L${n} ${lvl} · ${year ?? 2025}`,
  }));
}

export const MOCK_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
