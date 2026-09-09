import { Alert, MCQ, MockConfig, PastPaper, SyllabusItem } from "@/lib/types";

function pack(
  id: string,
  url: string,
  topics: [string, string, string, number][],
  qs: [string, string, string, string[], number, string][]
): {
  syl: SyllabusItem[];
  mcqs: MCQ[];
  papers: PastPaper[];
  mock: MockConfig;
  alert: Alert;
} {
  const syl = topics.map((t, i) => ({
    id: `${id}-syx-${i}`,
    test_id: id,
    subject: t[0],
    topic: t[1],
    subtopic: t[2],
    weightage: t[3],
  }));
  const mcqs: MCQ[] = qs.map((x, i) => ({
    id: `${id}-qx-${i}`,
    test_id: id,
    subject: x[0],
    topic: x[1],
    question_text: x[2],
    options: x[3],
    correct_answer: x[4],
    explanation: x[5],
    difficulty: "medium",
    source: "ai_generated",
  }));
  return {
    syl,
    mcqs,
    papers: [
      {
        id: `ppx-${id}`,
        test_id: id,
        year: 2025,
        conducting_body_variant: "Official portal",
        file_url: url,
        source: url,
        verified: true,
      },
    ],
    mock: {
      id: `mkx-${id}`,
      test_id: id,
      time_limit_minutes: 8,
      negative_marking: false,
      negative_value: 0,
      question_count: Math.min(4, mcqs.length),
    },
    alert: {
      id: `alx-${id}`,
      test_id: id,
      type: "announcement",
      title: `Official notices — ${id}`,
      body: `Confirm dates, fee and syllabus on ${url}. This hub does not replace the conducting body's advertisement.`,
      source_url: url,
      published_at: "2026-08-01T08:00:00Z",
    },
  };
}

const extraIds: {
  id: string;
  url: string;
  topics: [string, string, string, number][];
  qs: [string, string, string, string[], number, string][];
}[] = [
  {
    id: "adm-04",
    url: "https://giki.edu.pk",
    topics: [
      ["Mathematics", "Calculus & algebra", "GIKI aptitude emphasis on problem solving", 40],
      ["Physics", "Mechanics & EM", "FSc + applied reasoning", 35],
      ["English", "Usage", "Comprehension and grammar", 25],
    ],
    qs: [
      ["Mathematics", "Algebra", "If log₁₀ 2 ≈ 0.3010, log₁₀ 8 is about:", ["0.6020", "0.9030", "0.3010", "1.2040"], 1, "8=2³ so 0.9030."],
      ["Physics", "Mechanics", "Unit of momentum is:", ["N", "kg m/s", "J", "W"], 1, "p = mv."],
      ["English", "Grammar", "Neither of the answers ___ correct.", ["are", "is", "were", "have"], 1, "Neither takes singular."],
      ["Mathematics", "Calculus", "Derivative of sin x is:", ["cos x", "−cos x", "tan x", "sec x"], 0, "d/dx sin x = cos x."],
    ],
  },
  {
    id: "adm-05",
    url: "https://nu.edu.pk",
    topics: [
      ["Mathematics", "Discrete + calculus", "FAST CS/engineering tracks", 35],
      ["English", "Verbal", "FAST NU pattern", 20],
      ["Analytical", "IQ", "Patterns and logic", 25],
      ["Physics / CS", "Fundamentals", "Depends on programme", 20],
    ],
    qs: [
      ["Analytical", "Logic", "If all algorithms terminate, a non-terminating procedure is:", ["an algorithm", "not an algorithm", "always O(1)", "always recursive"], 1, "Algorithms must halt."],
      ["Mathematics", "Binary", "1101₂ in decimal is:", ["11", "12", "13", "14"], 2, "8+4+1=13."],
      ["English", "Vocab", "“Verbose” means:", ["brief", "wordy", "silent", "accurate"], 1, "Using too many words."],
      ["Physics", "Circuits", "In series, current is:", ["same through each component", "split equally always", "zero", "infinite"], 0, "Series current is common."],
    ],
  },
  {
    id: "adm-07",
    url: "https://iba.edu.pk",
    topics: [
      ["English", "Reading & grammar", "IBA aptitude", 35],
      ["Mathematics", "Quantitative", "Algebra, percentages, data", 35],
      ["IQ", "Analytical", "Sequences, analogies", 30],
    ],
    qs: [
      ["Mathematics", "Percent", "A price rises 10% then falls 10%. Net change:", ["0%", "1% down", "1% up", "10% down"], 1, "1.1 × 0.9 = 0.99."],
      ["English", "Usage", "Choose correct: between you and ___", ["I", "me", "we", "they"], 1, "Object pronoun me."],
      ["IQ", "Series", "3, 9, 27, 81, ?", ["108", "162", "243", "324"], 2, "×3."],
      ["Mathematics", "Ratio", "Share 120 in 2:3. Smaller share is:", ["40", "48", "60", "72"], 1, "2/5 of 120 = 48."],
    ],
  },
  {
    id: "grd-01",
    url: "https://www.nts.org.pk",
    topics: [
      ["Verbal", "English", "GAT-A/B/C variants", 35],
      ["Quantitative", "Maths", "Arithmetic and algebra", 35],
      ["Analytical", "Reasoning", "Argument and data", 30],
    ],
    qs: [
      ["Quantitative", "Average", "Average of 4, 8, 12 is:", ["6", "8", "10", "12"], 1, "24/3=8."],
      ["Verbal", "Analogy", "Bird : nest :: bee :", ["honey", "hive", "wing", "flower"], 1, "Dwelling."],
      ["Analytical", "Assumption", "A valid argument must have:", ["true premises only", "conclusion following from premises", "long sentences", "statistics"], 1, "Logical entailment."],
      ["Quantitative", "Speed", "Distance = speed ×", ["mass", "time", "force", "area"], 1, "s = vt."],
    ],
  },
  {
    id: "grd-05",
    url: "https://www.hec.gov.pk",
    topics: [
      ["English", "Academic English", "HAT verbal", 30],
      ["Analytical", "Reasoning", "HAT analytical", 35],
      ["Quantitative", "Maths", "HAT quantitative", 35],
    ],
    qs: [
      ["Quantitative", "Algebra", "If 3x = 18, x =", ["3", "6", "9", "15"], 1, "x=6."],
      ["English", "Vocab", "“Empirical” evidence is based on:", ["guesswork", "observation/experiment", "authority only", "poetry"], 1, "Data from experience."],
      ["Analytical", "Research", "A hypothesis should be:", ["untestable", "testable", "always true", "a law"], 1, "Falsifiable/testable."],
      ["Quantitative", "Percent", "20% of 250 =", ["25", "40", "50", "75"], 2, "50."],
    ],
  },
  {
    id: "psc-03",
    url: "https://spsc.gov.pk",
    topics: [
      ["English", "Essay & precis", "SPSC PMS", 20],
      ["Pakistan Studies", "Sindh & Pakistan", "History and current issues", 20],
      ["Islamiat / GK", "General", "As advertised", 20],
      ["Optional", "Professional papers", "Per SPSC syllabus", 40],
    ],
    qs: [
      ["Pakistan Studies", "Sindh", "Karachi became Pakistan’s first capital in:", ["1947", "1959", "1969", "1971"], 0, "Until the move to Islamabad."],
      ["GK", "Geography", "Indus River empties into the:", ["Arabian Sea", "Bay of Bengal", "Caspian", "Red Sea"], 0, "Arabian Sea."],
      ["English", "Grammar", "The committee ___ divided in its views.", ["is", "are", "have", "were always"], 0, "Collective as unit → is (style varies)."],
      ["Islamiat", "History", "Hijrah to Madinah occurred in:", ["610 CE", "622 CE", "632 CE", "680 CE"], 1, "622 CE."],
    ],
  },
  {
    id: "psc-08",
    url: "https://www.fpsc.gov.pk",
    topics: [
      ["English", "MCQ English", "FPSC general recruitment one-paper", 25],
      ["GK", "Pakistan & current", "As per ad", 25],
      ["Professional", "Job related", "Per post", 50],
    ],
    qs: [
      ["GK", "Capital", "Federal capital of Pakistan is:", ["Karachi", "Lahore", "Islamabad", "Peshawar"], 2, "Islamabad."],
      ["English", "Idiom", "“At the eleventh hour” means:", ["very early", "at the last moment", "at dawn", "never"], 1, "Last moment."],
      ["GK", "Constitution", "Fundamental rights are in:", ["Objectives Resolution only", "the Constitution", "SBP Act", "Qanun-e-Shahadat only"], 1, "Constitution of Pakistan."],
      ["Professional", "Service", "FPSC general recruitment ads appear on:", ["fpsc.gov.pk", "random blogs only", "WhatsApp only", "YouTube only"], 0, "Official site."],
    ],
  },
  {
    id: "bnk-02",
    url: "https://www.sbp.org.pk",
    topics: [
      ["English", "Comprehension", "SBP OG papers", 20],
      ["Quantitative", "Numeracy", "Data and arithmetic", 25],
      ["Economics / finance", "Macro & banking", "Monetary policy, SBP functions", 35],
      ["IQ", "Analytical", "Logic", 20],
    ],
    qs: [
      ["Economics", "Policy", "Open-market operations are a tool of:", ["fiscal policy", "monetary policy", "trade policy only", "labour law"], 1, "Central bank."],
      ["Quantitative", "Ratio", "If CPI rises, real value of money:", ["rises", "falls", "is unchanged by definition", "becomes infinite"], 1, "Inflation erodes purchasing power."],
      ["English", "Vocab", "“Prudential” regulation aims at:", ["bank safety and soundness", "fashion", "weather", "sports"], 0, "Financial stability."],
      ["IQ", "Logic", "All notes are liabilities of the central bank. Therefore banknotes are:", ["private equity", "central-bank liabilities", "household assets only never liabilities", "gold only"], 1, "Currency in circulation is a CB liability."],
    ],
  },
  {
    id: "pol-01",
    url: "https://www.punjabpolice.gov.pk/punjabpolice-jobs",
    topics: [
      ["Physical", "Standards", "Height, chest, running as advertised", 25],
      ["Written", "Urdu / English / Islamiat / Pak Studies / GK", "MCQ paper", 50],
      ["Interview", "Personality", "After written", 25],
    ],
    qs: [
      ["GK", "Police", "IG Punjab Police is appointed under:", ["provincial government framework", "UN only", "SBP", "HEC"], 0, "Provincial police."],
      ["Pak Studies", "Law", "PPC stands for:", ["Pakistan Penal Code", "Punjab Police Club", "Public Procurement Code", "Postal Parcel Code"], 0, "Pakistan Penal Code."],
      ["Islamiat", "Ethics", "Amanah in public office means:", ["trust / responsibility", "salary only", "uniform", "leave"], 0, "Trust."],
      ["English", "Vocab", "“Patrol” means:", ["to sleep", "to move around an area to watch it", "to resign", "to cook"], 1, "Watching a beat."],
    ],
  },
  {
    id: "tch-01",
    url: "https://www.ppsc.gop.pk",
    topics: [
      ["English", "Language", "Educators / PPSC pedagogy papers", 20],
      ["Pedagogy", "Teaching methods", "Classroom management, assessment", 30],
      ["Subject", "Content", "As per scale/subject", 30],
      ["GK / Islamiat / Pak Studies", "General", "One-paper mix", 20],
    ],
    qs: [
      ["Pedagogy", "Bloom", "Highest level in original Bloom taxonomy is:", ["Knowledge", "Application", "Evaluation", "Comprehension"], 2, "Evaluation (original)."],
      ["English", "Grammar", "A lesson plan should mainly include:", ["objectives, method, assessment", "only homework", "only roll numbers", "only salary"], 0, "Planning cycle."],
      ["Pak Studies", "Education", "Article 25-A concerns:", ["right to education", "armed forces", "banking", "aviation"], 0, "Free education."],
      ["Pedagogy", "Assessment", "Formative assessment is done:", ["only after the year ends", "during learning to improve it", "never", "only for ranking"], 1, "Ongoing feedback."],
    ],
  },
  {
    id: "arm-02",
    url: "https://www.joinpakarmy.gov.pk",
    topics: [
      ["Intelligence", "Verbal & non-verbal", "Initial Army test", 30],
      ["Academic", "English, maths, Pak studies, Islamiat, GK", "MCQ", 30],
      ["Physical", "Running, push-ups, chin-ups, ditch", "As per course", 20],
      ["ISSB + medical", "Board", "After shortlist", 20],
    ],
    qs: [
      ["Intelligence", "Series", "5, 10, 20, 40, ?", ["60", "70", "80", "90"], 2, "×2."],
      ["GK", "Army", "PMA is located at:", ["Quetta", "Kakul, Abbottabad", "Lahore Fort", "Karachi harbour"], 1, "Kakul."],
      ["Islamiat", "Seerah", "The Prophet ﷺ was born in:", ["Madinah", "Makkah", "Taif", "Jerusalem"], 1, "Makkah."],
      ["English", "Antonym", "Antonym of “courage”:", ["bravery", "cowardice", "valour", "grit"], 1, "Cowardice."],
    ],
  },
  {
    id: "arm-03",
    url: "https://www.joinpaknavy.gov.pk",
    topics: [
      ["Intelligence", "Verbal/non-verbal", "PN initial", 30],
      ["Academic", "Physics, maths, English, GK", "Officer / sailor variants", 40],
      ["Physical + ISSB", "As applicable", "Commissioned path", 30],
    ],
    qs: [
      ["Physics", "Fluids", "Buoyant force equals weight of:", ["the ship always", "displaced fluid", "air only", "anchor"], 1, "Archimedes."],
      ["GK", "Navy", "PN official careers site is:", ["joinpaknavy.gov.pk", "nba.com", "hec.gov.pk", "sbp.org.pk"], 0, "Official."],
      ["Maths", "Trig", "sin 90° =", ["0", "1", "0.5", "undefined"], 1, "1."],
      ["English", "Vocab", "“Starboard” means:", ["left side of ship", "right side of ship", "keel", "mast"], 1, "Right when facing forward."],
    ],
  },
  {
    id: "arm-04",
    url: "https://www.joinpaf.gov.pk",
    topics: [
      ["Intelligence", "e-testing", "PAF initial", 30],
      ["Academic", "Physics, maths, English", "GDP/CAE/aeroscience variants", 40],
      ["ISSB + medical + flying", "As applicable", "After shortlist", 30],
    ],
    qs: [
      ["Physics", "Motion", "Lift on a wing is primarily explained by:", ["Bernoulli / circulation", "Ohm’s law", "Hooke’s law", "Snell’s law"], 0, "Aerodynamics."],
      ["GK", "PAF", "Join PAF portal:", ["joinpaf.gov.pk", "pia.com only", "pts.org.pk", "icap.org.pk"], 0, "Official."],
      ["Maths", "Vectors", "Unit vector has magnitude:", ["0", "1", "g", "∞"], 1, "Magnitude 1."],
      ["English", "Vocab", "“Altitude” means:", ["height above a reference", "speed", "fuel", "runway length"], 0, "Height."],
    ],
  },
  {
    id: "pro-03",
    url: "https://www.icmap.com.pk",
    topics: [
      ["Operational level", "Financial accounting & cost", "ICMA Pakistan", 30],
      ["Managerial", "Management, audit, law", "Mid-level", 35],
      ["Strategic", "Strategy, financial management", "Final", 35],
    ],
    qs: [
      ["Costing", "Overheads", "Absorption costing includes:", ["variable production costs only", "fixed production overheads in product cost", "period costs only", "tax only"], 1, "Absorbs fixed production OH."],
      ["Law", "Company", "SECP regulates:", ["companies and capital markets (with others)", "hospitals only", "armies", "mosques"], 0, "Securities & companies."],
      ["FM", "Working capital", "Current assets minus current liabilities is:", ["equity", "working capital", "EBIT", "goodwill"], 1, "NWC."],
      ["Ethics", "CMA", "ICMA Pakistan is:", ["the national CMA body", "FPSC", "HEC university", "a bank"], 0, "ICMAP."],
    ],
  },
  {
    id: "pro-07",
    url: "https://www.hec.gov.pk",
    topics: [
      ["English", "Language", "LAT", 20],
      ["General knowledge", "Pakistan / Islamiat / current", "LAT MCQ", 30],
      ["Urdu", "Language", "As per HEC LAT outline", 20],
      ["Essay", "Urdu/English", "Written component when notified", 30],
    ],
    qs: [
      ["Law", "LAT", "LAT is required for:", ["5-year LLB admission (HEC policy)", "MBBS", "pilot licence", "CFA"], 0, "Law Admission Test."],
      ["GK", "Judiciary", "Supreme Court of Pakistan sits in:", ["Karachi only", "Islamabad", "Quetta only", "Peshawar only"], 1, "Islamabad."],
      ["English", "Vocab", "“Statute” means:", ["a statue", "written law", "a statue garden", "a rumour"], 1, "Act of legislature."],
      ["Islamiat", "Fiqh", "Ijma refers to:", ["consensus", "analogy only", "a tax", "a river"], 0, "Consensus."],
    ],
  },
  {
    id: "pro-11",
    url: "https://www.pec.org.pk",
    topics: [
      ["Registration", "Accredited degree", "Engineer / professional engineer pathways", 40],
      ["EPE", "Engineering practice", "For PE title when applicable", 30],
      ["CPD", "Continuing development", "Credit hours", 30],
    ],
    qs: [
      ["PEC", "Role", "PEC registers:", ["engineers in Pakistan", "doctors", "advocates", "chartered accountants"], 0, "Pakistan Engineering Council."],
      ["Ethics", "Safety", "An engineer’s primary duty is to:", ["public safety and welfare", "maximise billable hours only", "ignore codes", "hide defects"], 0, "Public safety."],
      ["CPD", "Learning", "CPD means:", ["Continuing Professional Development", "Central Police Desk", "Civil Payment Draft", "Cost Per Drill"], 0, "CPD."],
      ["Law", "Practice", "Practising as a professional engineer generally requires:", ["PEC registration as applicable", "FPSC CSS only", "IBP membership only", "PBC enrollment"], 0, "PEC."],
    ],
  },
  {
    id: "jud-01",
    url: "https://lhc.gov.pk",
    topics: [
      ["Civil law", "CPC, Contract, Specific Relief, Limitation", "Punjab Civil Judge exam", 30],
      ["Criminal law", "PPC, CrPC, QSO", "Written papers", 30],
      ["Constitution / jurisprudence", "Constitution of Pakistan", "As per LHC notice", 20],
      ["Language / judgment writing", "English & Urdu", "Plus viva", 20],
    ],
    qs: [
      ["CPC", "Jurisdiction", "Pecuniary jurisdiction depends on:", ["value of the suit", "colour of the plaint", "weather", "lawyer’s age"], 0, "Value of subject matter."],
      ["PPC", "Offence", "Qatl-i-amd is:", ["culpable homicide amounting to murder (as defined)", "a civil tort only", "a tax", "a contract clause"], 0, "Criminal homicide provisions."],
      ["Constitution", "Judiciary", "High Courts are established under:", ["the Constitution", "a municipal bye-law", "SBP circular", "NTS ad"], 0, "Constitution."],
      ["CrPC", "Bail", "Bail is generally a:", ["right or discretion depending on the offence category", "always forbidden", "only for companies", "tax refund"], 0, "Bailable vs non-bailable."],
    ],
  },
  {
    id: "adm-14",
    url: "https://numspak.edu.pk",
    topics: [
      ["Biology", "PMDC-aligned", "NUMS MDCAT", 40],
      ["Chemistry", "FSc", "Physical, organic, inorganic", 25],
      ["Physics", "FSc", "Mechanics to modern", 20],
      ["English", "Usage", "NUMS paper", 15],
    ],
    qs: [
      ["Biology", "Blood", "Oxygen is mainly carried by:", ["plasma water", "haemoglobin", "platelets", "lymph only"], 1, "Hb."],
      ["Chemistry", "Mole", "Molar mass of H₂O is about:", ["10 g/mol", "18 g/mol", "32 g/mol", "44 g/mol"], 1, "18."],
      ["Physics", "Optics", "Snell’s law relates:", ["angles and refractive indices", "mass and energy", "charge and field only", "half-life"], 0, "n1 sinθ1 = n2 sinθ2."],
      ["English", "Grammar", "The series of tests ___ difficult.", ["is", "are", "have", "were being"], 0, "Series as unit."],
    ],
  },
  {
    id: "rec-08",
    url: "https://ctsp.com.pk",
    topics: [
      ["English", "MCQ", "CTSP projects", 25],
      ["Analytical", "IQ", "Screening", 25],
      ["GK", "Pakistan", "Current + static", 25],
      ["Subject", "Job related", "Per ad", 25],
    ],
    qs: [
      ["GK", "Date", "Pakistan Resolution Day is:", ["14 August", "23 March", "6 September", "25 December"], 1, "23 March."],
      ["English", "Prep", "He is good ___ mathematics.", ["in", "at", "on", "over"], 1, "good at."],
      ["Analytical", "Odd", "Odd one out: square, rectangle, triangle, photosynthesis", ["square", "rectangle", "triangle", "photosynthesis"], 3, "Photosynthesis is not a shape."],
      ["Quant", "HCF", "HCF of 12 and 18 is:", ["3", "6", "9", "36"], 1, "6."],
    ],
  },
];

const built = extraIds.map((e) => pack(e.id, e.url, e.topics, e.qs));

export const EXTRA_SYL: SyllabusItem[] = built.flatMap((b) => b.syl);
export const EXTRA_MCQ: MCQ[] = built.flatMap((b) => b.mcqs);
export const EXTRA_PAPERS: PastPaper[] = built.flatMap((b) => b.papers);
export const EXTRA_MOCKS: MockConfig[] = built.map((b) => b.mock);
export const EXTRA_ALERTS: Alert[] = built.map((b) => b.alert);
