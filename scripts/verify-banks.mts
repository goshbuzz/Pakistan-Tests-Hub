import { TESTS } from "../src/data/tests.ts";
import { ALL_MCQS, questionsForPaper } from "../src/data/coverage.ts";
import { paperShape, slotCount } from "../src/data/mockShape.ts";
import { matchesSubject, subjectsFor } from "../src/data/sections.ts";

const issues: string[] = [];
const summary: string[] = [];

for (const t of TESTS) {
  const allowed = subjectsFor(t.id, t.category);
  const bank = ALL_MCQS.filter((m) => m.test_id === t.id);
  const leak = bank.filter((m) => !matchesSubject(m.subject, allowed));
  if (leak.length) issues.push(`${t.id} LEAK ${leak.length} e.g. ${leak[0].subject} :: ${leak[0].question_text.slice(0, 60)}`);

  const bySub: Record<string, number> = {};
  for (const m of bank) bySub[m.subject] = (bySub[m.subject] ?? 0) + 1;
  const mcq = bank.filter((m) => (m.kind ?? "mcq") === "mcq");
  const badKey = mcq.filter((m) => m.correct_answer < 0 || m.correct_answer >= m.options.length || m.options.length !== 4);
  if (badKey.length) issues.push(`${t.id} BAD_KEY ${badKey.length} ${badKey[0].question_text.slice(0, 50)}`);

  const shape = paperShape(t.id, t.category);
  const paper = questionsForPaper(t.id, 2025, 1, "verify");
  if (paper.length < slotCount(shape) * 0.5) {
    issues.push(`${t.id} THIN_PAPER got ${paper.length} want ~${slotCount(shape)} note=${shape.note.slice(0, 40)}`);
  }
  const paperLeak = paper.filter((m) => !matchesSubject(m.subject, allowed));
  if (paperLeak.length) issues.push(`${t.id} PAPER_LEAK ${paperLeak.map((x) => x.subject).join(",")}`);

  const missingSlots = shape.slots.filter((sl) => {
    if (sl.kind !== "mcq" || !sl.subject) return false;
    const n = paper.filter((p) => (p.kind ?? "mcq") === "mcq" && matchesSubject(p.subject, [sl.subject!])).length;
    return n === 0;
  });
  if (missingSlots.length) {
    issues.push(`${t.id} EMPTY_SLOT ${missingSlots.map((s) => s.subject).join(",")} bankSubjects=${Object.keys(bySub).join("|")}`);
  }

  summary.push(
    `${t.id.padEnd(8)} ${t.name.padEnd(28)} bank=${String(bank.length).padStart(3)} paper=${paper.length} subs=${Object.keys(bySub).slice(0, 6).join(",")}`
  );
}

console.log(summary.join("\n"));
console.log("\nISSUES", issues.length);
console.log(issues.join("\n") || "none");
if (issues.length) process.exitCode = 1;
