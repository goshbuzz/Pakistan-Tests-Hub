export type Faq = { q: string; a: string };

export const GLOBAL_FAQS: Faq[] = [
  {
    q: "What is Pakistan Tests Hub?",
    a: "Pakistan Tests Hub is a free self-study website and a project of GoshBuzz (goshbuzz.com). It is for fresh graduates, job seekers and professionals in Pakistan. It covers 100 exams — MDCAT, ECAT, CSS, PMS, PPSC, FPSC, NTS, PTS, ISSB, bank MTO, police, educators, ACCA/CA, IELTS and German — with syllabus, original MCQ banks, timed mocks that follow each paper’s mix, and official apply URLs. We do not host leaked past-paper PDFs.",
  },
  {
    q: "Where can I find government jobs in Pakistan and the related tests?",
    a: "Open the Jobs tab for ads we sync from official bodies (FPSC, PPSC, NTS, PTS, Punjab Police, banks). Each listing has the official apply link. Then open the matching test (CSS, PPSC one-paper, NTS recruitment, police, educators) for syllabus, MCQs and mocks. Always submit the form on the conducting-body website.",
  },
  {
    q: "How should a fresh graduate prepare for CSS or PMS without an academy?",
    a: "Use the CSS or provincial PMS page: tick the last-exam syllabus, drill compulsory MCQs (English, GK, Current Affairs, Pakistan Affairs, Islamiat), write short notes and essays in mocks (written answers are not auto-marked), then apply only on fpsc.gov.pk or the provincial PSC. Mocks are mini-papers, not the full 1,200-mark written.",
  },
  {
    q: "What is the latest MDCAT pattern?",
    a: "Public PMDC/UHS pattern used here: 200 MCQs in 3.5 hours — Biology 68, Chemistry 54, Physics 54, English 18, Logical Reasoning 6, typically no negative marking. Confirm the live provincial notice. Our MDCAT mocks follow that mix, not GAT quant/analytical.",
  },
  {
    q: "Is the MCQ bank the same as a mock test?",
    a: "No. The bank is untimed drill, one item at a time. A mock is a timed mini-paper in that exam’s mix (MCQ, short, essay/speaking where the real test has them). Ten mocks; questions reshuffle each open. Written tasks are not auto-scored.",
  },
  {
    q: "How do I apply for Punjab Police jobs?",
    a: "Use the official jobs page https://www.punjabpolice.gov.pk/punjabpolice-jobs (or PPSC when they advertise the post). Pakistan Tests Hub links there and offers physical/written-pattern practice — we never take the application ourselves.",
  },
  {
    q: "Which tests do NTS, PTS, OTS and PPSC conduct?",
    a: "NTS: GAT, NAT, many recruitment projects. PTS/OTS/UTS/CTSP: departmental screening MCQs. PPSC: Punjab one-paper MCQ jobs plus PMS. FPSC: federal jobs and CSS. ETEA: KPK admissions and jobs. Each test page on this site maps to the official apply URL.",
  },
  {
    q: "Can I prepare IELTS or German A1–C2 here for immigration?",
    a: "Yes. International tests include IELTS, PTE, TOEFL and German A1–C2. Mocks follow that exam (listening/reading MCQ plus writing and speaking tasks), not Pakistan Studies GK. Book the real exam only with the official board (British Council, Goethe, etc.).",
  },
  {
    q: "Is Pakistan Tests Hub free?",
    a: "Yes. Self-study content is free; the site may show ads. There is no academy fee. Exam fees are paid only to FPSC, UHS, NTS, ACCA and other official bodies. The hub is published by GoshBuzz (goshbuzz.com).",
  },
  {
    q: "Do you provide leaked or copyrighted past papers?",
    a: "No. Practice items are original and aligned to the last publicly described pattern. “Papers” that are not our timed practice open the official conducting-body site.",
  },
  {
    q: "Who owns or publishes Pakistan Tests Hub?",
    a: "Pakistan Tests Hub is a GoshBuzz project. GoshBuzz (https://goshbuzz.com) is the publisher and parent brand. The live hub is at https://pakistantestshub.goshbuzz.com. It is unofficial study material — not FPSC, PPSC, NTS or UHS.",
  },
];

export function faqsForTest(name: string, body: string, format: string): Faq[] {
  return [
    {
      q: `How do I prepare for ${name} in Pakistan?`,
      a: `${name} is conducted by ${body}. Last publicly described format: ${format} Use Pakistan Tests Hub for syllabus ticks, an original MCQ bank in this test’s subjects, and 10 timed mocks that follow this paper’s mix. Apply only on the official site.`,
    },
    {
      q: `Where do I apply for ${name}?`,
      a: `Never apply on a practice website. Open the Apply tab on the ${name} page — it sends you to the official ${body} URL. Keep CNIC, photos, degrees and challan ready.`,
    },
    {
      q: `Are ${name} mocks the full exam?`,
      a: `No. Mocks are timed mini-papers so you can practise the mix (MCQ / short / long) without sitting a 2–3 hour paper every day. Written answers are not auto-marked.`,
    },
  ];
}
