import { MCQ } from "@/lib/types";

function q(
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  difficulty: MCQ["difficulty"],
  extra?: Partial<MCQ>
): Omit<MCQ, "id" | "test_id"> {
  return {
    kind: extra?.kind ?? "mcq",
    subject,
    topic,
    question_text,
    options: extra?.kind && extra.kind !== "mcq" ? ["Write your answer", "See model", "Skip", "Review"] : options,
    correct_answer: extra?.kind && extra.kind !== "mcq" ? 1 : correct_answer,
    explanation,
    difficulty,
    source: "official",
    model_answer: extra?.model_answer,
  };
}

const EN: Omit<MCQ, "id" | "test_id">[] = [
  q("Listening", "Signpost", "In a lecture, “however” most often signals:", ["an example", "a contrast", "a date", "the end only"], 1, "Contrast / unexpected turn.", "easy"),
  q("Listening", "Numbers", "The speaker says “fifteen”. You should write:", ["50", "15", "16", "13"], 1, "Fifteen = 15, fifty = 50.", "easy"),
  q("Reading", "TFNG", "The text says “some cities banned cars”. Statement “All cities banned cars” is:", ["True", "False", "Not Given", "Both T and F"], 1, "All ≠ some → False.", "medium"),
  q("Reading", "TFNG", "The text never mentions cost. “Tickets are expensive” is:", ["True", "False", "Not Given", "True if you guess"], 2, "Not in the text.", "easy"),
  q("Reading", "Vocab", "In academic reading, “mitigate” is closest to:", ["worsen", "reduce the severity of", "measure", "ignore"], 1, "Make less severe.", "medium"),
  q("Grammar", "Articles", "___ Amazon is the longest river in South America.", ["A", "An", "The", "—"], 2, "Unique geographical names often take the.", "easy"),
  q("Grammar", "Tenses", "By 2020 the company ___ the factory.", ["builds", "had built", "building", "build"], 1, "Past perfect before a past point.", "medium"),
  q("Grammar", "Subject-verb", "The number of applicants ___ risen.", ["have", "has", "are", "were"], 1, "The number → singular.", "medium"),
  q("Vocabulary", "Collocation", "Make a ___ (not “do a decision”).", ["decision", "homework", "research", "mistake only never"], 0, "make a decision.", "easy"),
  q("Vocabulary", "Academic", "“Albeit” means:", ["although", "because", "therefore", "never"], 0, "Although / even if.", "hard"),
  q("Writing", "Task 2", "A Task 2 introduction should:", ["copy the question word for word", "paraphrase + thesis", "list statistics only", "apologise"], 1, "Paraphrase and take a position if asked.", "easy"),
  q(
    "Writing",
    "Task 2 essay",
    "Write a 4-paragraph outline: “Some people think universities should teach job skills; others want general education. Discuss both and give your opinion.”",
    [],
    0,
    "Model outline.",
    "hard",
    {
      kind: "long",
      model_answer:
        "Intro: paraphrase + thesis (both needed; balance towards employability with core thinking skills). BP1: job skills — internships, labour market. BP2: general education — citizenship, transfer. Conclusion: hybrid curriculum.",
    }
  ),
  q(
    "Speaking",
    "Part 2",
    "Speak 1–2 minutes: describe a city you would like to live in. Cover: where, why, what you would do, how life would change.",
    [],
    0,
    "Model cues.",
    "medium",
    {
      kind: "short",
      model_answer:
        "Name the city; locate it; two reasons (work/study/climate); a typical day; one challenge; close with a feeling. Do not memorise a tourist brochure.",
    }
  ),
  q("Speaking", "Fluency", "The best way to extend a Part 1 answer is:", ["yes/no only", "point + reason + tiny example", "a 4-minute speech", "switch to Urdu"], 1, "PRE: point, reason, example.", "easy"),
];

const GER_A: Omit<MCQ, "id" | "test_id">[] = [
  q("German", "A1 articles", "___ Mann (masculine nominative):", ["der", "die", "das", "den"], 0, "der Mann.", "easy"),
  q("German", "A1 verbs", "Ich ___ aus Pakistan. (kommen)", ["kommt", "komme", "kommen", "kamst"], 1, "ich komme.", "easy"),
  q("German", "A1 numbers", "How do you say 16?", ["sechzig", "sechs", "sechzehn", "sieben"], 2, "sechzehn.", "easy"),
  q("German", "A1 questions", "“Wie heißt du?” asks for:", ["age", "your name", "address", "job"], 1, "What is your name?", "easy"),
  q("German", "A2 Perfekt", "Gestern ___ ich ins Kino ___. (gehen)", ["habe / gegangen", "bin / gegangen", "hat / gehen", "war / geht"], 1, "gehen uses sein.", "medium"),
  q("German", "A2 modals", "Wir ___ heute arbeiten. (müssen)", ["muss", "müssen", "musst", "müsst ich"], 1, "wir müssen.", "easy"),
  q("German", "B1 weil", "Ich bleibe zu Hause, ___ ich krank bin.", ["weil", "wenn nur", "ohne", "statt"], 0, "weil + verb at end.", "medium"),
  q("German", "B1 cases", "Ich danke ___ Freund. (dative)", ["der", "dem", "den", "das"], 1, "danken + Dativ: dem Freund.", "hard"),
  q("German", "B2 Konjunktiv", "Wenn ich Zeit ___, ___ ich kommen. (haben / würden)", ["hätte / würde", "habe / will", "hatte / muss", "hat / kommt"], 0, "Irrealis: hätte, würde.", "hard"),
  q("German", "B2 connectors", "“dennoch” is closest to:", ["therefore", "nevertheless", "because", "before"], 1, "Nevertheless.", "medium"),
  q("German", "C1 style", "Nominalisierung of “die Stadt wächst”:", ["das Wachstum der Stadt", "die Stadt gehen", "wachst du", "Städte klein"], 0, "Noun phrase for academic German.", "hard"),
  q(
    "Writing",
    "A1 form",
    "Write 4 sentences introducing yourself in German (name, country, languages, hobby).",
    [],
    0,
    "Model.",
    "easy",
    {
      kind: "short",
      model_answer: "Ich heiße … Ich komme aus Pakistan. Ich spreche Urdu, Englisch und ein bisschen Deutsch. Ich spiele gerne Cricket.",
    }
  ),
];

const PTE: Omit<MCQ, "id" | "test_id">[] = [
  q("Speaking", "PTE", "In Repeat Sentence you should:", ["wait 5 seconds", "start immediately and keep the rhythm", "translate to Urdu first", "write an essay"], 1, "Immediate clear repetition.", "easy"),
  q("Listening", "WFD", "Write From Dictation scores:", ["vocabulary lists only", "each correct word in order (high weight)", "pronunciation only", "nothing"], 1, "WFD is a high-yield item.", "medium"),
  q("Reading", "FIB", "Fill in the blanks: choose words that fit ___ and meaning.", ["grammar", "the national anthem", "your opinion", "the clock"], 0, "Collocation + grammar.", "easy"),
];

const GRE: Omit<MCQ, "id" | "test_id">[] = [
  q("Verbal", "SE", "Sentence equivalence: pick two words that both fit and yield similar meaning.", ["one synonym pair", "any two long words", "opposites", "numbers"], 0, "Two blanks same sense.", "medium"),
  q("Quantitative", "GRE", "If 2x + 3 = 11, x =", ["3", "4", "5", "8"], 1, "2x=8.", "easy"),
];

export function languageFor(testId: string, allowed: string[]): Omit<MCQ, "id" | "test_id">[] {
  let pool: Omit<MCQ, "id" | "test_id">[] = [];
  if (["int-01", "int-02", "int-04", "int-11", "int-12"].includes(testId)) pool = EN;
  else if (testId === "int-03") pool = [...EN, ...PTE];
  else if (testId.startsWith("int-0") && Number(testId.slice(4)) >= 5 && Number(testId.slice(4)) <= 10) {
    const lvl = testId === "int-05" ? "A1" : testId === "int-06" ? "A2" : testId === "int-07" ? "B1" : testId === "int-08" ? "B2" : "C";
    pool = GER_A.filter((x) => x.topic.includes(lvl) || x.topic.startsWith(lvl) || (lvl === "C" && x.topic.includes("C1")) || x.subject === "Writing");
    if (pool.length < 6) pool = GER_A;
  } else if (testId === "int-13") pool = [...GRE, ...EN.filter((x) => x.subject === "Vocabulary" || x.subject === "Grammar")];
  const low = allowed.map((a) => a.toLowerCase());
  const filtered = pool.filter((p) => low.some((a) => p.subject.toLowerCase().includes(a.split(" ")[0]) || a.includes(p.subject.toLowerCase()) || p.subject === "Grammar" || p.subject === "Vocabulary"));
  return filtered.length ? filtered : pool;
}
