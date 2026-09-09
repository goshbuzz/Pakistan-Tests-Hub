/** Which subjects belong on this test. Used so MDCAT never gets GAT quant, etc. */
export function subjectsFor(testId: string, category: string): string[] {
  if (["adm-01", "adm-09", "adm-13", "adm-14", "adm-15"].includes(testId)) {
    return ["Biology", "Chemistry", "Physics", "English", "Logical Reasoning"];
  }
  if (["adm-02", "adm-03", "adm-04", "adm-12"].includes(testId)) {
    return ["Mathematics", "Physics", "Chemistry", "English", "Intelligence"];
  }
  if (["adm-05", "adm-07"].includes(testId)) {
    return ["Mathematics", "English", "Analytical", "Physics", "Computer"];
  }
  if (testId === "adm-06") return ["English", "Mathematics", "Analytical"];
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
  return ["English", "GK", "Pakistan Studies", "Islamiat"];
}

export function allowMix(testId: string, category: string) {
  const s = subjectsFor(testId, category).map((x) => x.toLowerCase());
  return {
    english: s.some((x) => x.includes("english") || x.includes("verbal")),
    maths: s.some((x) => x.includes("math") || x.includes("quant") || x.includes("gsa")),
    analytical: s.some((x) => x.includes("analytic") || x.includes("intelligence") || x.includes("logical")),
  };
}

export function matchesSubject(questionSubject: string, allowed: string[]) {
  const q = questionSubject.toLowerCase();
  return allowed.some((a) => {
    const x = a.toLowerCase();
    return q.includes(x) || x.includes(q.split(" ")[0]);
  });
}
