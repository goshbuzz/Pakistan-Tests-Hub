/** Which subjects belong on this test. Used so MDCAT never gets GAT quant, etc. */
export function subjectsFor(testId: string, category: string): string[] {
  if (["adm-01", "adm-09", "adm-10", "adm-13", "adm-14", "adm-15"].includes(testId)) {
    return ["Biology", "Chemistry", "Physics", "English", "Logical Reasoning"];
  }
  if (["adm-02", "adm-03", "adm-12"].includes(testId)) {
    return ["Mathematics", "Physics", "Chemistry", "English", "Intelligence"];
  }
  if (testId === "adm-04") return ["Mathematics", "Physics", "English"];
  if (testId === "adm-05") {
    return ["Mathematics", "English", "Analytical", "Physics", "Computer"];
  }
  if (testId === "adm-07") return ["English", "Mathematics", "Analytical"];
  if (testId === "adm-06") return ["Verbal", "Mathematics"];
  if (testId === "adm-08" || testId === "adm-11") {
    return ["English", "Mathematics", "Analytical"];
  }
  if (["grd-01", "grd-03", "grd-05"].includes(testId)) {
    return ["English", "Verbal", "Quantitative", "Mathematics", "Analytical"];
  }
  if (["grd-02"].includes(testId)) return ["Subject", "Analytical", "English"];
  if (["grd-04", "pro-07", "pro-12"].includes(testId)) return ["Law", "English", "Pakistan Studies", "Islamiat"];
  if (category === "Recruitment" || testId.startsWith("rec-")) {
    return ["English", "Analytical", "Quantitative", "GK", "Islamiat", "Pakistan Studies", "Job related"];
  }
  if (testId === "psc-01") {
    return ["English", "Current Affairs", "Pakistan Affairs", "GSA", "Islamiat", "Optional"];
  }
  if (category === "PSC") {
    return ["English", "Urdu", "Pakistan Studies", "Islamiat", "GK", "Optional"];
  }
  if (category === "Banking") {
    return ["English", "Quantitative", "Analytical", "Banking GK", "Computer"];
  }
  if (category === "Police") {
    return ["English", "Urdu", "Islamiat", "Pakistan Studies", "GK"];
  }
  if (category === "Judicial") {
    return ["Civil law", "Criminal law", "Constitution", "Law", "English"];
  }
  if (category === "Teaching") {
    return ["English", "Pedagogy", "Subject", "GK", "Islamiat", "Pakistan Studies"];
  }
  if (category === "Armed Forces") {
    return ["Intelligence", "English", "Mathematics", "Islamiat", "Pakistan Studies", "GK", "Physics"];
  }
  if (["pro-01", "pro-02", "pro-03", "pro-04"].includes(testId)) {
    return ["FA", "MA", "AA", "FM", "Ethics", "Quant", "FRA", "Accounting"];
  }
  if (["int-01", "int-02", "int-03", "int-04", "int-11", "int-12"].includes(testId)) {
    return ["Listening", "Reading", "Writing", "Speaking", "Grammar", "Vocabulary"];
  }
  if (["int-05", "int-06", "int-07", "int-08", "int-09", "int-10"].includes(testId)) {
    return ["German", "Grammar", "Vocabulary", "Listening", "Reading", "Writing", "Speaking"];
  }
  if (testId === "int-13") return ["Verbal", "Quantitative", "Writing", "Vocabulary"];
  return ["English", "GK", "Pakistan Studies", "Islamiat"];
}

export function allowMix(testId: string, category: string) {
  if (category === "International" && testId !== "int-13") {
    return { english: false, maths: false, analytical: false };
  }
  const s = subjectsFor(testId, category).map((x) => x.toLowerCase());
  return {
    english: s.some((x) => x.includes("english") || x.includes("verbal")),
    maths: s.some((x) => x.includes("math") || x.includes("quant") || x.includes("gsa")),
    analytical: s.some((x) => x.includes("analytic") || x.includes("intelligence") || x.includes("logical")),
  };
}

const ALIASES: Record<string, string[]> = {
  analytical: ["analytical", "logical reasoning", "intelligence"],
  "logical reasoning": ["logical reasoning", "analytical"],
  intelligence: ["intelligence"],
  quantitative: ["quantitative", "quant", "mathematics", "maths"],
  mathematics: ["mathematics", "maths", "math", "quantitative", "quant"],
  quant: ["quant", "quantitative"],
  english: ["english", "verbal"],
  verbal: ["verbal", "english"],
  gk: ["gk", "general knowledge"],
  "current affairs": ["current affairs", "current"],
  "pakistan studies": ["pakistan studies", "pak studies"],
  "pakistan affairs": ["pakistan affairs"],
  computer: ["computer"],
  gsa: ["gsa"],
  german: ["german"],
  grammar: ["grammar"],
  vocabulary: ["vocabulary", "vocab"],
  listening: ["listening"],
  reading: ["reading"],
  writing: ["writing"],
  speaking: ["speaking"],
  maths: ["maths", "mathematics", "math"],
};

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Question subject must belong to an allowed paper section — never leak Pak Studies into German. */
export function matchesSubject(questionSubject: string, allowed: string[]) {
  const q = norm(questionSubject);
  if (!q) return false;
  return allowed.some((a) => {
    const x = norm(a);
    const keys = [x, ...(ALIASES[x] ?? [])];
    return keys.some((k) => q === k || q.startsWith(k + " ") || q.endsWith(" " + k));
  });
}
