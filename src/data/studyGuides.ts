export type Guide = { test_id: string; title: string; body: string };

const IELTS_SKILLS: Guide[] = [
  {
    test_id: "int-01",
    title: "How this hub replaces an academy",
    body: "Work the syllabus checkboxes, then 10 mocks. Writing and speaking use model answers — compare structure, not copy memorised essays (examiners penalise that). Official booking only: ielts.org, britishcouncil.pk, ielts.idp.com. We do not sell leaked Cambridge scans.",
  },
  {
    test_id: "int-01",
    title: "Band mapping (immigration & uni)",
    body: "Academic 6.0 ≈ independent user; 6.5–7.0 typical master’s UK/Aus; 7.0+ competitive Canada SDS / good unis. Always read the CAS/offer letter. General Training bands map to CLB for Canada (e.g. 6.0 ≈ CLB 7 in some skills — confirm IRCC table, it changes).",
  },
  {
    test_id: "int-01",
    title: "Listening — method",
    body: "Preview questions in the silent time. Underline dates, numbers, names. If you miss one, skip — the recording does not pause. Spelling counts. Write AND/OR as the question demands. Transfer answers in paper tests in the extra 10 minutes; on computer, check grammar in gaps.",
  },
  {
    test_id: "int-01",
    title: "Reading Academic — method",
    body: "Passage 1 easier, 3 hardest. True/False/Not Given: True = stated; False = opposite; NG = cannot know. Do not use world knowledge. Headings: read first/last sentence of each paragraph. Matching: names and dates first. Aim 20 min per passage.",
  },
  {
    test_id: "int-01",
    title: "Writing Task 1 (Academic)",
    body: "150+ words. Overview is mandatory (what the chart mainly shows) — without it you cap around band 5. Group data; do not list every number. No opinions. Time 20 minutes. Process diagrams: follow stages with passives (is heated, is then cooled).",
  },
  {
    test_id: "int-01",
    title: "Writing Task 2 essay",
    body: "250+ words, 40 min. Intro (paraphrase + thesis), 2 body paragraphs (topic sentence, example), short conclusion. Answer the exact question type: agree/disagree, discuss both, advantages, problem-solution. Coherence > fancy idioms. Avoid memorised templates the examiner has seen 500 times.",
  },
  {
    test_id: "int-01",
    title: "Speaking",
    body: "Part 1 short personal. Part 2: use the 1-minute prep to note 4 bullets; speak 1.5–2 min. Part 3 abstract. Extend: point → reason → example. Fluency and pronunciation matter as much as vocabulary. Do not recite a prepared speech.",
  },
];

const IELTS_GT: Guide[] = IELTS_SKILLS.map((g) => ({
  ...g,
  test_id: "int-02",
  title: g.title.replace("Academic", "General"),
  body:
    g.title.includes("Task 1")
      ? "General Task 1 is a letter (formal/semi/informal) 150 words: purpose in sentence 1, cover all bullets, tone matching the reader (Dear Sir/Madam vs Hi Ali). Task 2 same essay skills as Academic but topics are social/work."
      : g.body,
}));

export const STUDY_GUIDES: Guide[] = [
  ...IELTS_SKILLS,
  ...IELTS_GT,
  {
    test_id: "int-03",
    title: "PTE vs IELTS (Australia / NZ)",
    body: "PTE is fully computer-scored. Repeat sentence and write from dictation carry heavy weight — daily 20 minutes of shadowing beats a month of academy notes. Speak clearly into the mic; do not wait too long or the item times out. Essay: 200–300 words, 20 min.",
  },
  {
    test_id: "int-03",
    title: "PTE task order strategy",
    body: "Read aloud: chunk by punctuation. Repeat sentence: write first 4 words in your head, speak immediately. Describe image: 25s intro + 2 features + conclusion. Re-tell lecture: template of 3 points max. Enable spell-check only where the software allows; still proof WFD.",
  },
  {
    test_id: "int-04",
    title: "TOEFL iBT for US/Canada uni",
    body: "Integrated writing: 3 minutes reading, lecture, 20 minutes to write how the lecture challenges the text. Independent writing: 10-minute new shorter task in current iBT — check ets.org for the live format. Speaking: 15–30s prep, structured response (opinion + two reasons).",
  },
  {
    test_id: "int-05",
    title: "German A1 — family reunion / first visa",
    body: "Learn: sein/haben, regular present, accusative after für/durch, articles der/die/das, numbers, time, food, directions. Speak in full sentences in the oral. Goethe Start Deutsch 1: short listening (announcements), forms, 30-word writing. Book only at Goethe-Institut Pakistan.",
  },
  {
    test_id: "int-06",
    title: "German A2",
    body: "Add Perfekt, modal verbs (können, müssen, wollen), dative, comparatives, subordinate weil/dass. Write 30–40 words emails. Listening: two-speaker dialogues.",
  },
  {
    test_id: "int-07",
    title: "German B1 — work & settlement",
    body: "B1 is the workhorse for many residence titles. Need: Präteritum of sein/haben/modals, adjective endings intro, relative clauses, passive werden. Write ~80 words. Oral: plan a trip with a partner. telc B1 and Goethe B1 are both widely accepted — check the embassy list.",
  },
  {
    test_id: "int-08",
    title: "German B2 — study & skilled visa",
    body: "Argument essays, Konjunktiv II, passive, nominalisation. Reading: newspaper length. Many Fachhochschule programmes ask B2. Speak with examples and connectors (dennoch, infolgedessen).",
  },
  {
    test_id: "int-09",
    title: "German C1 / TestDaF — university",
    body: "TestDaF TDN 4 in all sections ≈ C1 for most unis. Practise graphs in writing, lecture notes in listening. Goethe C1 is modular. Do not rely on English in the exam room.",
  },
  {
    test_id: "int-10",
    title: "German C2",
    body: "Near-native production: style shifting, idioms, academic register. Only sit this if a profession or GDS is required.",
  },
  {
    test_id: "int-11",
    title: "CELPIP for Canada PR",
    body: "Computer test, North American accents. Speaking: 8 short tasks, 30–90s. Writing: email + survey 150–200 words. Map CLB from celpip.ca. IRCC does not take in-person coaching certificates — only the test score.",
  },
  {
    test_id: "int-12",
    title: "Duolingo English Test",
    body: "Quiet room, passport, computer with camera. Adaptive. Universities publish DET cut scores (often 110–130). Not valid as UK SELT. Practice the interactive speaking/writing on englishtest.duolingo.com.",
  },
  {
    test_id: "int-13",
    title: "GRE General",
    body: "Verbal: text completion, sentence equivalence, reading. Quant: arithmetic to basic stats, no calculus. AWA: 30 min issue essay. Official PowerPrep on ets.org is the real software.",
  },
  {
    test_id: "adm-06",
    title: "LCAT vs SAT",
    body: "LUMS UG often accepts SAT/ACT instead of LCAT. LCAT itself is Verbal + Quantitative MCQ in several timed sections (~2h40), no calculator. Do not study Pakistan GK or Biology for LCAT. Drill reading speed and algebra word problems under a clock — that is the mock, not the MCQ bank.",
  },
  {
    test_id: "adm-01",
    title: "MDCAT without a coaching factory",
    body: "Finish FSc textbooks first (they ARE the syllabus). Then this hub’s Biology/Chemistry/Physics bank and 10 levelled mocks. PMDC weight: Bio 45% Chem 25% Phy 20% Eng 5% LR 5% (confirm current uniform curriculum). Past paper leaks are illegal and often wrong keys.",
  },
  {
    test_id: "psc-01",
    title: "CSS without an academy",
    body: "MPT is MCQ screening. Written is long answers: 3 hours × 12 papers. Build outlines, not photocopied notes. Compulsory: Essay, Precis, GSA, CA, PA, Islamiat. Optionals: pick scoring+background mix from FPSC groups. Read Dawn + one international paper daily.",
  },
  {
    test_id: "psc-01",
    title: "Essay & précis method",
    body: "Essay: 10 min outline, 2.5 h write, 10 min cut repetition. One thesis, four arguments, Pakistan examples with years. Precis: count words, compress to 1/3, keep proportion, title last. Do not dump current-affairs lists into the essay.",
  },
  {
    test_id: "adm-02",
    title: "ECAT self-study",
    body: "UET-style 100 MCQ / 100 min: Maths 30, Physics 30, Chem or CS 30, English 10. Finish FSc textbooks, then timed mini-mocks here. Calculator policy follows the live UET notice — drill without one unless allowed.",
  },
  {
    test_id: "adm-03",
    title: "NUST NET",
    body: "Engineering NET: Maths 40%, Physics 30%, Chemistry 15%, English 10%, Intelligence 5%, computer-based. Merit uses NET + HSSC + SSC as NUST publishes. Sit several NET series; this hub’s mocks are short slices of that mix.",
  },
  {
    test_id: "grd-01",
    title: "GAT-General plan",
    body: "100 MCQ / 120 min: Verbal, Quantitative, Analytical (A/B/C share). No Pakistan Studies. Analogies and analytic games need daily 20-minute drills. HEC/NTS passing marks depend on the university — check the programme, not rumours.",
  },
  {
    test_id: "psc-07",
    title: "PPSC one-paper jobs",
    body: "Most general posts: one MCQ paper (English, Urdu, Islamiat, Pak Studies, GK, job-related) then interview. Read the advertisement’s syllabus line-by-line. Apply only on ppsc.gop.pk.",
  },
  {
    test_id: "rec-01",
    title: "NTS recruitment tests",
    body: "Each project has its own ad: English, analytical, GK, professional MCQs; negative marking only if that ad says so. Practise the mix here, then print the official roll number slip from nts.org.pk.",
  },
  {
    test_id: "pol-01",
    title: "Punjab Police written after physical",
    body: "Physical first (height, running, etc. as advertised), then a written MCQ in Urdu, English, Islamiat, Pakistan Studies, GK — not CSS essays. Apply via punjabpolice.gov.pk/punjabpolice-jobs or PPSC when they conduct the post.",
  },
  {
    test_id: "bnk-01",
    title: "Bank MTO / IBP-style",
    body: "English, Quant, Analytical, Banking GK (SBP, KYC/AML, products, Raast). Read the last SBP monetary policy summary in plain language. Apply on the bank’s careers page, not on this hub.",
  },
  {
    test_id: "arm-01",
    title: "ISSB four days",
    body: "Not a university MCQ exam. Screening intelligence + WAT (short sentences under time) + TAT stories + GTO outdoor + interview. Practise honest, positive, specific sentences — selectors read personality, not coaching slogans.",
  },
  {
    test_id: "arm-02",
    title: "PMA Long Course initial",
    body: "Intelligence + academic MCQ (English, maths, Islamiat, Pak Studies, GK), then physical, ISSB, medical. Join only on joinpakarmy.gov.pk.",
  },
  {
    test_id: "tch-01",
    title: "Educators / PPSC teaching",
    body: "MCQ: English, pedagogy (Bloom, assessment, classroom), your subject, GK/Islamiat/Pak Studies. Tick pedagogy first — many fail method items, not content.",
  },
  {
    test_id: "jud-01",
    title: "Civil Judge written",
    body: "Long law papers (CPC, PPC, CrPC, Constitution, evidence, judgment writing) + viva. Mocks here are short notes and a judgment skeleton — not auto-marked. Read bare acts; do not rely on MCQ banks as the real paper.",
  },
  {
    test_id: "pro-01",
    title: "ACCA Skills papers",
    body: "CBE: objective + constructed response. Practise time per constructed task. Ethics and professional skills marks are real. Book exams on accaglobal.com only.",
  },
  {
    test_id: "pro-04",
    title: "CFA Level I",
    body: "Item-set / independent MCQs. Ethics is weighted — read the Code. Quant, FRA, Econ, CF, PM, Equity, FI, Derivatives, Alt, Portfolio. Mini-mocks here are Ethics/FRA/Quant slices.",
  },
  {
    test_id: "pro-07",
    title: "HEC LAT",
    body: "Law Admission Test for 5-year LLB: MCQ on intro to law / constitution / language plus an essay component as HEC notifies. Apply on hec.gov.pk.",
  },
  {
    test_id: "adm-05",
    title: "FAST NU entry",
    body: "Maths + English + Analytical; Physics or Computer by programme. No Biology, no Pakistan GK. Drill calculus and patterns under a clock.",
  },
  {
    test_id: "grd-05",
    title: "HEC HAT",
    body: "English, analytical, quantitative (subject variants for some scholarships). Used for indigenous scholarships / many local PhD screens. Confirm the live HEC portal.",
  },
];

export function guidesFor(testId: string): Guide[] {
  const own = STUDY_GUIDES.filter((g) => g.test_id === testId);
  if (own.length) return own;
  return [
    {
      test_id: testId,
      title: "Self-study path",
      body: "Tick every syllabus topic, drill the MCQ bank, sit all 10 mocks (easy → hard). Use the Apply tab only for the official portal. This hub’s items are original public-knowledge practice — not leaked academy PDFs.",
    },
  ];
}
