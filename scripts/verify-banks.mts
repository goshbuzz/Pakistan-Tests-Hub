import { TESTS } from "../src/data/tests.ts";
import { ALL_MCQS, questionsForPaper, PREP_PACKS } from "../src/data/coverage.ts";
import { paperShape, slotCount } from "../src/data/mockShape.ts";
import { matchesSubject, subjectsFor } from "../src/data/sections.ts";
import { APPLY_URL } from "../src/data/applyUrls.ts";
import { EXAM_PATTERN } from "../src/data/patterns.ts";
import { STUDY_GUIDES } from "../src/data/studyGuides.ts";

const issues: string[] = [];

function add(msg: string) {
  issues.push(msg);
}

const FORBIDDEN: Record<string, string[]> = {
  International: ["pakistan studies", "islamiat", "biology", "banking gk", "gk"],
  Admissions: ["german", "ielts"],
};

for (const t of TESTS) {
  const allowed = subjectsFor(t.id, t.category);
  const bank = ALL_MCQS.filter((m) => m.test_id === t.id);
  const leak = bank.filter((m) => !matchesSubject(m.subject, allowed));
  if (leak.length) add(`${t.id} LEAK ${leak[0].subject} :: ${leak[0].question_text.slice(0, 50)}`);

  const mcq = bank.filter((m) => (m.kind ?? "mcq") === "mcq");
  const badKey = mcq.filter((m) => m.correct_answer < 0 || m.correct_answer >= m.options.length || m.options.length < 2);
  if (badKey.length) add(`${t.id} BAD_KEY ${badKey[0].question_text.slice(0, 50)}`);

  const dup = new Map<string, number>();
  for (const m of bank) dup.set(m.question_text, (dup.get(m.question_text) ?? 0) + 1);
  const dups = [...dup.entries()].filter(([, n]) => n > 3);
  if (dups.length) add(`${t.id} HEAVY_DUP ${dups[0][0].slice(0, 40)}`);

  if (t.category === "International" && bank.some((m) => /pakistan studies|islamiat/i.test(m.subject))) {
    add(`${t.id} INTL_CIVICS`);
  }
  if (["adm-01", "adm-14", "adm-15"].includes(t.id) && bank.some((m) => /quantitative|gat verbal|banking/i.test(m.subject))) {
    add(`${t.id} MDCAT_HAS_GAT`);
  }
  if (t.id.startsWith("int-0") && Number(t.id.slice(4)) >= 5 && Number(t.id.slice(4)) <= 10) {
    if (bank.some((m) => m.subject === "English" && !/german/i.test(m.question_text))) {
      /* english grammar on german via Grammar is ok; English subject is not */
    }
    if (bank.some((m) => matchesSubject(m.subject, ["Biology", "Pakistan Studies"]))) add(`${t.id} GERMAN_LEAK_PK`);
  }

  const shape = paperShape(t.id, t.category);
  const paper = questionsForPaper(t.id, 2025, 1, "verify");
  if (paper.length < Math.ceil(slotCount(shape) * 0.7)) {
    add(`${t.id} THIN_PAPER ${paper.length}/${slotCount(shape)}`);
  }
  const paperLeak = paper.filter((m) => !matchesSubject(m.subject, allowed));
  if (paperLeak.length) add(`${t.id} PAPER_LEAK ${paperLeak[0].subject}`);

  for (const sl of shape.slots) {
    if (sl.kind !== "mcq" || !sl.subject) continue;
    const n = paper.filter((p) => (p.kind ?? "mcq") === "mcq" && matchesSubject(p.subject, [sl.subject!])).length;
    if (n === 0) add(`${t.id} EMPTY_SLOT ${sl.subject}`);
  }

  if (!APPLY_URL[t.id]) add(`${t.id} NO_APPLY_URL`);
  if (!EXAM_PATTERN[t.id]) add(`${t.id} NO_PATTERN`);
  if (!PREP_PACKS.find((p) => p.test_id === t.id)) add(`${t.id} NO_PACK`);
  if (bank.length < 8) add(`${t.id} SMALL_BANK ${bank.length}`);
}

const missingGuide = TESTS.filter((t) => t.priority && !STUDY_GUIDES.some((g) => g.test_id === t.id));
for (const t of missingGuide) add(`${t.id} PRIORITY_NO_GUIDE`);

console.log("tests", TESTS.length, "mcqs", ALL_MCQS.length);
console.log("ISSUES", issues.length);
console.log(issues.join("\n") || "none");
if (issues.length) process.exitCode = 1;
