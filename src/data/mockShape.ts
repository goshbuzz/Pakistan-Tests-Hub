/** Timed paper shape (mini mock). Bank = untimed drill; mock = this structure. */

export type Slot = { kind: "mcq" | "short" | "long"; n: number; subject?: string };

export type PaperShape = {
  minutes: number;
  negative: boolean;
  negativeValue: number;
  slots: Slot[];
  note: string;
};

function s(kind: Slot["kind"], n: number, subject?: string): Slot {
  return { kind, n, subject };
}

export function paperShape(testId: string, category: string): PaperShape {
  if (["adm-01", "adm-09", "adm-10", "adm-13", "adm-14", "adm-15"].includes(testId)) {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "Mini MDCAT: MCQ only (real paper is ~180 MCQ, no essay). Weights follow Bio/Chem/Phy/Eng/LR.",
      slots: [s("mcq", 4, "Biology"), s("mcq", 3, "Chemistry"), s("mcq", 2, "Physics"), s("mcq", 1, "English"), s("mcq", 1, "Logical Reasoning")],
    };
  }
  if (["adm-02", "adm-03", "adm-12"].includes(testId)) {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "Mini engineering paper: MCQ only — Maths, Physics, Chemistry, English.",
      slots: [s("mcq", 3, "Mathematics"), s("mcq", 3, "Physics"), s("mcq", 2, "Chemistry"), s("mcq", 2, "English")],
    };
  }
  if (testId === "adm-04") {
    return {
      minutes: 15,
      negative: false,
      negativeValue: 0,
      note: "GIKI aptitude: Maths, Physics, English MCQ — no Chemistry.",
      slots: [s("mcq", 4, "Mathematics"), s("mcq", 3, "Physics"), s("mcq", 3, "English")],
    };
  }
  if (testId === "adm-06") {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "Mini LCAT: Verbal + Quantitative MCQ only (full LCAT ~2h40, several timed sections).",
      slots: [s("mcq", 6, "Verbal"), s("mcq", 6, "Mathematics")],
    };
  }
  if (testId === "adm-07") {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "IBA aptitude: English and Mathematics MCQ in equal weight.",
      slots: [s("mcq", 5, "English"), s("mcq", 5, "Mathematics")],
    };
  }
  if (testId === "adm-05") {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "FAST NU mini: Maths, English, Analytical MCQ (Physics/CS depends on programme).",
      slots: [s("mcq", 4, "Mathematics"), s("mcq", 3, "English"), s("mcq", 3, "Analytical")],
    };
  }
  if (["grd-01", "grd-03", "grd-05", "adm-08", "adm-11"].includes(testId)) {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "GAT/NAT/HAT/USAT mini: Verbal, Quantitative, Analytical MCQ (full GAT is 100q / 120 min).",
      slots: [s("mcq", 4, "English"), s("mcq", 3, "Quantitative"), s("mcq", 3, "Analytical")],
    };
  }
  if (testId === "grd-02") {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "GAT-Subject mini: subject MCQs plus a short analytical block.",
      slots: [s("mcq", 6, "Subject"), s("mcq", 4, "Analytical")],
    };
  }
  if (["grd-04", "pro-07", "pro-12"].includes(testId)) {
    return {
      minutes: 22,
      negative: false,
      negativeValue: 0,
      note: "LAT / Law-GAT mini: law MCQs + one short essay (HEC LAT often has an essay component).",
      slots: [s("mcq", 4, "Law"), s("mcq", 2, "English"), s("mcq", 2, "Pakistan Studies"), s("long", 1, "English")],
    };
  }
  if (["int-01", "int-02"].includes(testId)) {
    return {
      minutes: 25,
      negative: false,
      negativeValue: 0,
      note: "Mini IELTS: Listening/Reading MCQ + Writing (long) + Speaking (short). Full exam is ~2h45.",
      slots: [s("mcq", 3, "Listening"), s("mcq", 3, "Reading"), s("long", 1, "Writing"), s("short", 1, "Speaking")],
    };
  }
  if (["int-03", "int-04", "int-11", "int-12"].includes(testId)) {
    return {
      minutes: 22,
      negative: false,
      negativeValue: 0,
      note: "Integrated English test: MCQ skills + one writing + one speaking task.",
      slots: [s("mcq", 2, "Listening"), s("mcq", 2, "Reading"), s("mcq", 2, "Grammar"), s("long", 1, "Writing"), s("short", 1, "Speaking")],
    };
  }
  if (["int-05", "int-06", "int-07", "int-08", "int-09", "int-10"].includes(testId)) {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "Goethe-style four skills: Hören/Lesen MCQ + Schreiben + Sprechen. Not Pakistan GK.",
      slots: [s("mcq", 4, "German"), s("mcq", 2, "Grammar"), s("short", 1, "Writing"), s("short", 1, "Speaking")],
    };
  }
  if (testId === "int-13") {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "Mini GRE: Verbal + Quant MCQ + one Analytical Writing essay.",
      slots: [s("mcq", 4, "Verbal"), s("mcq", 4, "Quantitative"), s("long", 1, "Writing")],
    };
  }
  if (["psc-01", "psc-02", "psc-03", "psc-04", "psc-05"].includes(testId)) {
    return {
      minutes: 25,
      negative: true,
      negativeValue: 0.25,
      note: "CSS/PMS mix: a few MPT-style MCQs then written precis/short notes and one essay — not MCQ-only.",
      slots: [s("mcq", 4), s("short", 2), s("long", 1)],
    };
  }
  if (["psc-06", "psc-07", "psc-08"].includes(testId)) {
    return {
      minutes: 16,
      negative: true,
      negativeValue: 0.25,
      note: "PSC one-paper / general recruitment MCQ (English, Pak Studies, Islamiat, GK) — not CSS essays.",
      slots: [s("mcq", 2, "English"), s("mcq", 2, "Pakistan Studies"), s("mcq", 2, "Islamiat"), s("mcq", 2, "GK"), s("mcq", 2, "Urdu")],
    };
  }
  if (category === "Judicial") {
    return {
      minutes: 25,
      negative: false,
      negativeValue: 0,
      note: "Civil Judge: written law — short notes + judgment. Real exam is not an MCQ paper.",
      slots: [s("short", 2, "Law"), s("long", 1, "English")],
    };
  }
  if (testId === "arm-01") {
    return {
      minutes: 12,
      negative: false,
      negativeValue: 0,
      note: "ISSB screening slice: intelligence MCQ + WAT short sentences (not a long academic paper).",
      slots: [s("mcq", 4, "Intelligence"), s("short", 3, "ISSB")],
    };
  }
  if (["arm-02", "arm-03"].includes(testId)) {
    return {
      minutes: 16,
      negative: false,
      negativeValue: 0,
      note: "PMA/Navy initial: intelligence + academic MCQ (English, maths, Islamiat, Pak Studies).",
      slots: [s("mcq", 3, "Intelligence"), s("mcq", 2, "English"), s("mcq", 2, "Mathematics"), s("mcq", 2, "Pakistan Studies"), s("mcq", 1, "Islamiat")],
    };
  }
  if (testId === "arm-04") {
    return {
      minutes: 16,
      negative: false,
      negativeValue: 0,
      note: "PAF e-testing mini: intelligence + Physics/Maths/English (not ISSB WAT).",
      slots: [s("mcq", 3, "Intelligence"), s("mcq", 3, "Physics"), s("mcq", 2, "Mathematics"), s("mcq", 2, "English")],
    };
  }
  if (["pro-01", "pro-02", "pro-03"].includes(testId)) {
    return {
      minutes: 20,
      negative: false,
      negativeValue: 0,
      note: "Professional paper: objective items plus one constructed-response scenario.",
      slots: [s("mcq", 6, "Accounting"), s("long", 1, "FA")],
    };
  }
  if (testId === "pro-04") {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "CFA L1-style: independent MCQs (Ethics, FRA, Quant) — no essay.",
      slots: [s("mcq", 3, "Ethics"), s("mcq", 3, "FRA"), s("mcq", 2, "Quant"), s("mcq", 2, "FM")],
    };
  }
  if (testId === "pro-09") {
    return {
      minutes: 18,
      negative: false,
      negativeValue: 0,
      note: "NLE mini: clinical/basic science MCQs — not CSS GK.",
      slots: [s("mcq", 6, "Biology"), s("mcq", 2, "English"), s("mcq", 2, "Logical Reasoning")],
    };
  }
  if (category === "Banking") {
    return {
      minutes: 16,
      negative: false,
      negativeValue: 0,
      note: "Bank MTO mini: English, Quant, Analytical, Banking GK.",
      slots: [s("mcq", 3, "English"), s("mcq", 3, "Quantitative"), s("mcq", 2, "Analytical"), s("mcq", 2, "Banking GK")],
    };
  }
  if (category === "Police") {
    return {
      minutes: 15,
      negative: false,
      negativeValue: 0,
      note: "Police written mini: Urdu, English, Islamiat, Pak Studies, GK (after physical).",
      slots: [s("mcq", 2, "English"), s("mcq", 2, "Urdu"), s("mcq", 2, "Islamiat"), s("mcq", 2, "Pakistan Studies"), s("mcq", 2, "GK")],
    };
  }
  if (category === "Teaching") {
    return {
      minutes: 16,
      negative: false,
      negativeValue: 0,
      note: "Educators / SESE mini: English, Pedagogy, subject, GK/Islamiat/Pak Studies.",
      slots: [s("mcq", 2, "English"), s("mcq", 3, "Pedagogy"), s("mcq", 2, "Subject"), s("mcq", 1, "GK"), s("mcq", 1, "Islamiat"), s("mcq", 1, "Pakistan Studies")],
    };
  }
  if (testId === "rec-09") {
    return {
      minutes: 16,
      negative: true,
      negativeValue: 0.25,
      note: "IT cadre mini: English, analytical, computer/IT MCQs.",
      slots: [s("mcq", 3, "English"), s("mcq", 3, "Analytical"), s("mcq", 4, "Computer")],
    };
  }
  if (category === "Recruitment") {
    return {
      minutes: 15,
      negative: true,
      negativeValue: 0.25,
      note: "Testing-service screening: English, Analytical, GK, job-related MCQ.",
      slots: [s("mcq", 3, "English"), s("mcq", 2, "Analytical"), s("mcq", 2, "GK"), s("mcq", 2, "Pakistan Studies"), s("mcq", 1, "Job related")],
    };
  }
  return {
    minutes: 15,
    negative: false,
    negativeValue: 0,
    note: "Timed MCQ in this test’s syllabus subjects.",
    slots: [s("mcq", 10)],
  };
}

export function slotCount(shape: PaperShape) {
  return shape.slots.reduce((a, b) => a + b.n, 0);
}
