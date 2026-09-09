/** Public-knowledge topic trees (FSc/PMDC/NTS/CSS outlines), not leaked papers. */

export type OutlineRow = { subject: string; topic: string; subtopic: string; weightage: number };

const MDCAT: OutlineRow[] = [
  { subject: "Biology", topic: "Cell biology", subtopic: "Cell structure, membranes, organelles, cell cycle", weightage: 8 },
  { subject: "Biology", topic: "Biological molecules", subtopic: "Carbohydrates, proteins, lipids, nucleic acids, enzymes", weightage: 8 },
  { subject: "Biology", topic: "Genetics", subtopic: "Mendel, DNA/RNA, transcription, biotechnology", weightage: 9 },
  { subject: "Biology", topic: "Human physiology", subtopic: "Digestion, circulation, respiration, nervous, reproduction", weightage: 10 },
  { subject: "Biology", topic: "Diversity & ecology", subtopic: "Kingdoms, evolution, ecosystems (FSc)", weightage: 6 },
  { subject: "Chemistry", topic: "Physical chemistry", subtopic: "Atomic structure, bonding, states, thermo, equilibrium, electrochem", weightage: 10 },
  { subject: "Chemistry", topic: "Inorganic", subtopic: "Periodic table, s/p/d block, industrial chemistry", weightage: 7 },
  { subject: "Chemistry", topic: "Organic", subtopic: "Hydrocarbons, alkyl halides, alcohols, carbonyls, biochemistry intro", weightage: 8 },
  { subject: "Physics", topic: "Mechanics & fluids", subtopic: "Kinematics, Newton, work-energy, circular, viscosity", weightage: 7 },
  { subject: "Physics", topic: "Waves, heat, optics", subtopic: "SHM, sound, thermodynamics, geometrical & wave optics", weightage: 7 },
  { subject: "Physics", topic: "Electricity & modern", subtopic: "Electrostatics, current, magnetism, electronics, nuclear", weightage: 6 },
  { subject: "English", topic: "Comprehension & grammar", subtopic: "Vocab, tenses, error spotting, sentence completion", weightage: 8 },
  { subject: "Logical Reasoning", topic: "Critical thinking", subtopic: "Course of action, cause-effect, letters/numbers, logical deduction", weightage: 6 },
];

const ECAT: OutlineRow[] = [
  { subject: "Mathematics", topic: "Algebra & functions", subtopic: "Quadratic, sequences, matrices, functions", weightage: 10 },
  { subject: "Mathematics", topic: "Calculus & trig", subtopic: "Limits, differentiation, integration, identities", weightage: 10 },
  { subject: "Mathematics", topic: "Vectors & conics", subtopic: "Straight line, circle, vectors", weightage: 8 },
  { subject: "Physics", topic: "Mechanics", subtopic: "Motion, force, energy, rotational", weightage: 12 },
  { subject: "Physics", topic: "EM & modern", subtopic: "Current, fields, electronics, nuclear", weightage: 10 },
  { subject: "Chemistry", topic: "Physical & organic", subtopic: "Stoichiometry, equilibrium, hydrocarbons (or CS alternative)", weightage: 12 },
  { subject: "Computer", topic: "Programming basics", subtopic: "When CS paper chosen: logic, C/C++ basics, networks", weightage: 8 },
  { subject: "English", topic: "Usage", subtopic: "Grammar and comprehension", weightage: 10 },
  { subject: "Intelligence", topic: "Aptitude", subtopic: "NET/GIKI-style pattern and spatial items", weightage: 10 },
];

const GAT: OutlineRow[] = [
  { subject: "English", topic: "Verbal", subtopic: "Analogies, antonyms, sentence completion, reading", weightage: 35 },
  { subject: "Quantitative", topic: "Arithmetic & algebra", subtopic: "Percent, ratio, equations, word problems", weightage: 20 },
  { subject: "Quantitative", topic: "Geometry & data", subtopic: "Area, graphs, basic stats", weightage: 15 },
  { subject: "Analytical", topic: "Arguments", subtopic: "Logical games, deduction, analytic reasoning", weightage: 30 },
];

const CSS: OutlineRow[] = [
  { subject: "English", topic: "Essay", subtopic: "Argumentative / analytical essay (long)", weightage: 8 },
  { subject: "English", topic: "Precis & composition", subtopic: "Precis, comprehension, grammar, translation", weightage: 8 },
  { subject: "GSA", topic: "General Science & Ability", subtopic: "Everyday science + quantitative/analytic ability", weightage: 8 },
  { subject: "Current Affairs", topic: "Pakistan & world", subtopic: "Regional, international, Pakistan issues", weightage: 8 },
  { subject: "Pakistan Affairs", topic: "History & polity", subtopic: "Movement, constitution, economy, foreign policy", weightage: 8 },
  { subject: "Islamiat", topic: "Islamic studies", subtopic: "Beliefs, Quran/Hadith themes, Islamic history (or Ethics option)", weightage: 8 },
  { subject: "Optional", topic: "Group papers", subtopic: "600 marks from FPSC groups I–VII (confirm current list)", weightage: 52 },
];

const POLICE: OutlineRow[] = [
  { subject: "English", topic: "Basic grammar", subtopic: "Tenses, synonyms, comprehension (matric/FA level)", weightage: 20 },
  { subject: "Urdu", topic: "Language", subtopic: "Idioms, grammar, comprehension", weightage: 15 },
  { subject: "Islamiat", topic: "Fundamentals", subtopic: "Ibadat, Seerah, Islamic history basics", weightage: 20 },
  { subject: "Pakistan Studies", topic: "History & geography", subtopic: "Pakistan movement, constitution, provinces", weightage: 20 },
  { subject: "GK", topic: "Current & everyday", subtopic: "Pakistan current affairs, basic science, computer", weightage: 25 },
];

export function outlineFor(testId: string, category: string): OutlineRow[] | null {
  if (["adm-01", "adm-09", "adm-13", "adm-14", "adm-15"].includes(testId)) return MDCAT;
  if (["adm-02", "adm-03", "adm-04", "adm-12"].includes(testId)) return ECAT;
  if (["grd-01", "grd-03", "grd-05"].includes(testId)) return GAT;
  if (testId === "psc-01") return CSS;
  if (category === "Police") return POLICE;
  return null;
}
