import { MCQ } from "@/lib/types";
import { HAS_LONG } from "./patterns";

function item(
  kind: MCQ["kind"],
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  model_answer?: string
): Omit<MCQ, "id" | "test_id"> {
  return {
    kind,
    subject,
    topic,
    question_text,
    options: kind === "mcq" ? options : ["Write your answer", "See model answer", "Skip", "Mark for review"],
    correct_answer: kind === "mcq" ? correct_answer : 1,
    explanation,
    model_answer,
    difficulty: "medium",
    source: "official",
  };
}

const ENGLISH: Omit<MCQ, "id" | "test_id">[] = [
  item("mcq", "English", "Grammar", "Choose the correct option: The committee ___ divided on the issue.", ["is", "are", "have", "has been being"], 1, "When members act separately, plural ‘are’ is accepted; many papers key ‘are’."),
  item("mcq", "English", "Grammar", "He insisted ___ paying the bill.", ["to", "on", "for", "at"], 1, "insist on + gerund."),
  item("mcq", "English", "Grammar", "If I ___ you, I would apply this year.", ["am", "was", "were", "be"], 2, "Unreal present: were."),
  item("mcq", "English", "Vocab", "“Ephemeral” means:", ["lasting", "short-lived", "expensive", "loud"], 1, "Short-lived."),
  item("mcq", "English", "Vocab", "Synonym of “meticulous”:", ["careless", "careful", "lazy", "angry"], 1, "Very careful."),
  item("mcq", "English", "Preposition", "She is good ___ mathematics.", ["in", "at", "on", "with"], 1, "good at."),
  item("mcq", "English", "Idiom", "“To nip in the bud” means:", ["encourage growth", "stop early", "plant a tree", "delay forever"], 1, "Stop at the start."),
  item("mcq", "English", "Spot error", "One of the boys ___ absent today.", ["are", "is", "were", "have"], 1, "One of + plural noun + singular verb."),
  item("mcq", "English", "Narration", "He said, “I am tired.” Indirect:", ["He said he is tired.", "He said that he was tired.", "He said that I am tired.", "He told he tired."], 1, "Backshift to was."),
  item("mcq", "English", "Voice", "Passive of “They are painting the wall.”:", ["The wall painted.", "The wall is being painted.", "The wall was painted.", "The wall has painted."], 1, "is being painted."),
];

const MATHS: Omit<MCQ, "id" | "test_id">[] = [
  item("mcq", "Mathematics", "Algebra", "If 2x − 5 = 11, x =", ["6", "8", "3", "16"], 1, "2x=16, x=8."),
  item("mcq", "Mathematics", "Algebra", "Roots of x² − 7x + 12 = 0 are:", ["2 and 6", "3 and 4", "1 and 12", "−3 and −4"], 1, "(x−3)(x−4)."),
  item("mcq", "Mathematics", "Percent", "A shirt of 2,000 is sold at 15% discount. Sale price:", ["1,700", "1,800", "1,850", "2,150"], 0, "85% of 2000 = 1700."),
  item("mcq", "Mathematics", "Ratio", "Divide 240 in 3:5. Smaller share:", ["90", "80", "150", "72"], 0, "3/8 of 240 = 90."),
  item("mcq", "Mathematics", "Average", "Average of 5, 10, 15, 20, 25:", ["12", "15", "16", "20"], 1, "75/5=15."),
  item("mcq", "Mathematics", "Time-work", "A does a job in 10 days, B in 15. Together days:", ["5", "6", "8", "12"], 1, "1/10+1/15=1/6 → 6 days."),
  item("mcq", "Mathematics", "Speed", "Distance 90 km, time 1.5 h. Speed:", ["45 km/h", "55", "60", "75"], 2, "90/1.5=60."),
  item("mcq", "Mathematics", "Simple interest", "SI on 5,000 at 8% for 2 years:", ["400", "800", "1,000", "5,800"], 1, "PRT/100=800."),
  item("mcq", "Mathematics", "Geometry", "Area of a circle radius 7 (π=22/7):", ["44", "154", "22", "49"], 1, "πr²=154."),
  item("mcq", "Mathematics", "Calculus", "∫ 3x² dx =", ["x³ + C", "6x + C", "3x + C", "x² + C"], 0, "x³ + C."),
  item("mcq", "Mathematics", "Trig", "sin 30° =", ["1", "1/2", "√3/2", "0"], 1, "1/2."),
  item("mcq", "Mathematics", "Log", "log₁₀ 1000 =", ["2", "3", "4", "10"], 1, "10³=1000."),
];

const ANALYTICAL: Omit<MCQ, "id" | "test_id">[] = [
  item("mcq", "Analytical", "Series", "4, 9, 16, 25, 36, ?", ["42", "45", "49", "64"], 2, "Squares 2²…7²=49."),
  item("mcq", "Analytical", "Analogy", "Book : pages :: wall :", ["brick", "house", "paint", "roof"], 0, "Made of units."),
  item("mcq", "Analytical", "Coding", "If CAT = 24 (C=3,A=1,T=20), then DOG =", ["15", "26", "27", "30"], 1, "D=4,O=15,G=7 → 26."),
  item("mcq", "Analytical", "Direction", "A walks north 3 km, east 4 km. Displacement:", ["3 km", "4 km", "5 km", "7 km"], 2, "3-4-5 triangle."),
  item("mcq", "Analytical", "Syllogism", "All poets are poor. Some poor are honest. Conclusion “some poets are honest” is:", ["necessarily true", "necessarily false", "uncertain", "a tautology"], 2, "No forced overlap."),
  item("mcq", "Analytical", "Odd", "Odd one: Square, Rectangle, Triangle, Circumference", ["Square", "Rectangle", "Triangle", "Circumference"], 3, "Circumference is not a polygon."),
  item("mcq", "Analytical", "Blood", "A is B’s brother. B is C’s father. A is C’s:", ["father", "uncle", "son", "cousin"], 1, "Uncle."),
  item("mcq", "Analytical", "Calendar", "If 1st is Friday, the 8th is:", ["Friday", "Saturday", "Thursday", "Sunday"], 0, "+7 same weekday."),
];

const SHORT: Omit<MCQ, "id" | "test_id">[] = [
  item(
    "short",
    "English",
    "Precis skill",
    "In 40–50 words, state the difference between a précis and a paraphrase.",
    [],
    0,
    "Model below.",
    "A précis is a shortened faithful restatement of only the core ideas and proportion of the original. A paraphrase restates the whole meaning in new words at similar length, without necessarily compressing."
  ),
  item(
    "short",
    "Pakistan Affairs",
    "Constitution",
    "Write four salient features of the 1973 Constitution (short notes).",
    [],
    0,
    "Model below.",
    "Written and rigid with amendment procedure; federal with parliamentary form; Islamic provisions including Objectives Resolution; fundamental rights and independent judiciary (High Courts and Supreme Court)."
  ),
  item(
    "short",
    "GSA",
    "Ability",
    "Define photosynthesis in two sentences.",
    [],
    0,
    "Model below.",
    "Green plants convert carbon dioxide and water into glucose using sunlight and chlorophyll. Oxygen is released as a by-product."
  ),
  item(
    "short",
    "Law",
    "CPC",
    "What is a decree? (5–8 lines as in a judicial short note)",
    [],
    0,
    "Model below.",
    "A decree is the formal expression of an adjudication which, so far as regards the court expressing it, conclusively determines the rights of the parties with regard to all or any of the matters in controversy in the suit (see CPC s.2(2)). It may be preliminary or final."
  ),
  item(
    "short",
    "ISSB",
    "WAT",
    "Write one short sentence for the word COURAGE.",
    [],
    0,
    "Model below.",
    "Courage is doing the right thing even when it is difficult."
  ),
];

const LONG: Omit<MCQ, "id" | "test_id">[] = [
  item(
    "long",
    "English Essay",
    "CSS/PMS",
    "Outline an essay: “Climate change and Pakistan’s water security” (introduction, 4 arguments, conclusion).",
    [],
    0,
    "Model outline.",
    "Intro: Himalayan melt, Indus basin, population. 1) Glacier/monsoon variability. 2) Irrigation inefficiency and groundwater. 3) Transboundary and storage (dams). 4) Adaptation: lining, pricing, diplomacy. Conclusion: water governance is national security."
  ),
  item(
    "long",
    "Current Affairs",
    "CSS",
    "Discuss (long): Role of CPEC in Pakistan’s economy — opportunities and risks.",
    [],
    0,
    "Model heads.",
    "Opportunities: energy, Gwadar, connectivity, jobs. Risks: debt, transparency, security of projects, industrial capacity to use corridors. Balanced conclusion with policy caveats."
  ),
  item(
    "long",
    "Judgment writing",
    "Civil Judge",
    "Write a short judgment structure: parties, facts, issues, findings, relief (civil suit for recovery).",
    [],
    0,
    "Model structure.",
    "Title/parties; brief facts from plaint/WS; issues framed; evidence discussion issue-wise; findings; decree/dismissal; costs; date and signature."
  ),
];

export function mixFor(testId: string, category: string): Omit<MCQ, "id" | "test_id">[] {
  const out = [...ENGLISH, ...MATHS, ...ANALYTICAL];
  if (HAS_LONG.has(testId) || category === "PSC" || category === "Judicial") {
    out.push(...SHORT, ...LONG);
  }
  if (testId === "arm-01") out.push(...SHORT.filter((s) => s.subject === "ISSB"));
  return out;
}
