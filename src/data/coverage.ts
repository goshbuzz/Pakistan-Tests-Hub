import { applyUrl } from "./applyUrls";
import { TESTS } from "./tests";
import { ALERTS, MCQS, PAST_PAPERS, SYLLABUS } from "./content";
import { publicMcqsFor } from "./publicMcqs";
import { mixFor } from "./mixQuestions";
import { matchesSubject, subjectsFor } from "./sections";
import { outlineFor } from "./syllabusOutlines";
import { Alert, MCQ, MockConfig, PastPaper, PrepPack, SyllabusItem } from "@/lib/types";
import { patternFor } from "./patterns";
import { paperShape, slotCount } from "./mockShape";

export { paperShape } from "./mockShape";

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
  const mix = mixFor(testId, cat).map((m, i) => ({
    ...m,
    id: `${testId}-mix-${i}`,
    test_id: testId,
  }));
  const pub = cat === "International" ? [] : publicMcqsFor(testId);
  return [...MCQS.filter((m) => m.test_id === testId), ...pub, ...mix].filter((m) => matchesSubject(m.subject, allowed));
}

export const ALL_MCQS: MCQ[] = TESTS.flatMap((t) => bankFor(t.id));

export const ALL_SYL: SyllabusItem[] = TESTS.flatMap((t) => {
  const have = SYLLABUS.filter((s) => s.test_id === t.id);
  const outline = outlineFor(t.id, t.category);
  const rows =
    outline && outline.length >= (have.length || 0)
      ? outline
      : have.length
        ? have
        : subjectsFor(t.id, t.category).map((subject) => ({
            subject,
            topic: `${subject} — current outline`,
            subtopic: patternFor(t.id),
            weightage: Math.max(1, Math.round(100 / subjectsFor(t.id, t.category).length)),
          }));
  return rows.map((r, i) => ({
    id: `${t.id}-gen-sy-${i}`,
    test_id: t.id,
    subject: r.subject,
    topic: r.topic,
    subtopic: `${r.subtopic} · v${t.last_updated}`,
    weightage: r.weightage,
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
  const shape = paperShape(t.id, t.category);
  return {
    id: `mk-all-${t.id}`,
    test_id: t.id,
    time_limit_minutes: shape.minutes,
    negative_marking: shape.negative,
    negative_value: shape.negativeValue,
    question_count: slotCount(shape),
  };
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
  if (cat === "International")
    return [
      "Valid passport (name must match the test ID)",
      "Passport-size photos if the centre asks",
      "Booking confirmation / candidate ID",
      "Payment receipt",
      "For UKVI/SELT: the exact test type written on the visa form",
    ];
  return common;
}

export function mockLevel(n: number): "easy" | "medium" | "hard" {
  if (n <= 3) return "easy";
  if (n <= 7) return "medium";
  return "hard";
}

function takeKind(pool: MCQ[], kind: MCQ["kind"], n: number, subject?: string): MCQ[] {
  const want = kind ?? "mcq";
  let rows = pool.filter((m) => (m.kind ?? "mcq") === want);
  if (subject) rows = rows.filter((m) => matchesSubject(m.subject, [subject]));
  return shuffle(rows).slice(0, n);
}

function writtenStub(testId: string, kind: "short" | "long", subject: string, i: number): MCQ {
  const long = kind === "long";
  return {
    id: `${testId}-stub-${kind}-${subject}-${i}`,
    test_id: testId,
    subject,
    topic: long ? "Written paper" : "Short answer",
    question_text: long
      ? `Write a structured ${subject} answer as this exam requires (introduction, 3 points, conclusion).`
      : `Write a short note (6–10 lines) on a core ${subject} point from this paper’s syllabus.`,
    options: ["Write your answer", "See model answer", "Skip", "Mark for review"],
    correct_answer: 1,
    explanation: "Written item — compare with the model; not an MCQ.",
    difficulty: "medium",
    source: "ai_generated",
    kind,
    model_answer: long
      ? "Intro (paraphrase the task) → two or three evidenced paragraphs → short conclusion that answers the question directly."
      : "Definition → one example → why it matters in this exam.",
  };
}

/** Timed paper in this test’s real mix (MCQ / short / long). Not the same as the drill bank. */
export function questionsForPaper(testId: string, year?: number, mockN = 1, salt = ""): MCQ[] {
  const cat = TESTS.find((x) => x.id === testId)?.category ?? "Recruitment";
  const allowed = subjectsFor(testId, cat);
  const unique = ALL_MCQS.filter((m) => m.test_id === testId && matchesSubject(m.subject, allowed));
  const n = Math.min(10, Math.max(1, mockN));
  const lvl = mockLevel(n);
  const shape = paperShape(testId, cat);
  const out: MCQ[] = [];
  const used = new Set<string>();
  shape.slots.forEach((slot, si) => {
    const leftover = unique.filter((m) => !used.has(m.question_text));
    let got = takeKind(leftover, slot.kind, slot.n, slot.subject);
    if (got.length < slot.n && slot.kind === "mcq") {
      got = got.concat(takeKind(leftover.filter((m) => !got.includes(m)), "mcq", slot.n - got.length));
    }
    while ((slot.kind === "short" || slot.kind === "long") && got.length < slot.n) {
      got.push(writtenStub(testId, slot.kind, slot.subject ?? allowed[0] ?? "Writing", got.length + si));
    }
    got.forEach((q) => {
      used.add(q.question_text);
      out.push({
        ...q,
        id: `${q.id}-m${n}-${salt || "x"}-${out.length}`,
        difficulty: lvl,
        topic: `${q.topic} · ${slot.kind.toUpperCase()} · L${n} ${lvl} · ${year ?? 2025}`,
      });
    });
  });
  return out;
}

export const MOCK_SLOTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
