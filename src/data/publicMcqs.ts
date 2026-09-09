import { MCQ } from "@/lib/types";

/** Public facts / original items — not copied paper scans. */
const FACTS: Omit<MCQ, "id" | "test_id">[] = [
  { subject: "Pakistan Studies", topic: "History", question_text: "Pakistan came into being on:", options: ["23 March 1940", "14 August 1947", "23 March 1956", "27 December 1971"], correct_answer: 1, explanation: "14 August 1947.", difficulty: "easy", source: "official" },
  { subject: "Pakistan Studies", topic: "History", question_text: "The Objectives Resolution was passed in:", options: ["1940", "1949", "1956", "1973"], correct_answer: 1, explanation: "12 March 1949.", difficulty: "medium", source: "official" },
  { subject: "Pakistan Studies", topic: "Constitution", question_text: "How many articles were in the original 1973 Constitution (as commonly taught)?", options: ["240", "280", "330", "365"], correct_answer: 1, explanation: "Originally 280 articles (later amended).", difficulty: "medium", source: "official" },
  { subject: "Pakistan Studies", topic: "Geography", question_text: "The longest river in Pakistan is the:", options: ["Jhelum", "Chenab", "Indus", "Ravi"], correct_answer: 2, explanation: "Indus.", difficulty: "easy", source: "official" },
  { subject: "Pakistan Studies", topic: "Geography", question_text: "K2 lies in which range?", options: ["Hindu Kush", "Karakoram", "Salt Range", "Sulaiman"], correct_answer: 1, explanation: "Karakoram.", difficulty: "easy", source: "official" },
  { subject: "Islamiat", topic: "Ibadat", question_text: "Number of obligatory prayers in a day:", options: ["3", "4", "5", "7"], correct_answer: 2, explanation: "Five.", difficulty: "easy", source: "official" },
  { subject: "Islamiat", topic: "Quran", question_text: "The Quran was revealed over approximately:", options: ["10 years", "13 years", "23 years", "40 years"], correct_answer: 2, explanation: "About 23 years.", difficulty: "easy", source: "official" },
  { subject: "Islamiat", topic: "Seerah", question_text: "The Treaty of Hudaybiyyah was in:", options: ["1 AH", "6 AH", "8 AH", "10 AH"], correct_answer: 1, explanation: "6 AH.", difficulty: "medium", source: "official" },
  { subject: "GK", topic: "World", question_text: "Headquarters of the UN is in:", options: ["Geneva", "New York", "Paris", "Vienna"], correct_answer: 1, explanation: "New York.", difficulty: "easy", source: "official" },
  { subject: "GK", topic: "World", question_text: "SAARC was established in:", options: ["1972", "1985", "1991", "1999"], correct_answer: 1, explanation: "1985, Dhaka.", difficulty: "medium", source: "official" },
  { subject: "English", topic: "Grammar", question_text: "Neither Ali nor his friends ___ present.", options: ["is", "was", "are", "has"], correct_answer: 2, explanation: "Verb agrees with nearer subject (friends).", difficulty: "medium", source: "official" },
  { subject: "English", topic: "Grammar", question_text: "Choose the correct sentence:", options: ["She suggested me to wait.", "She suggested that I wait.", "She suggested to waiting.", "She suggest I waits."], correct_answer: 1, explanation: "Suggest that + subjunctive/base.", difficulty: "medium", source: "official" },
  { subject: "English", topic: "Vocab", question_text: "Antonym of “scarce”:", options: ["rare", "meagre", "abundant", "sparse"], correct_answer: 2, explanation: "Abundant.", difficulty: "easy", source: "official" },
  { subject: "Quant", topic: "Percent", question_text: "A number increased by 20% then decreased by 20% is net:", options: ["unchanged", "4% less", "4% more", "20% less"], correct_answer: 1, explanation: "0.8×1.2=0.96.", difficulty: "medium", source: "official" },
  { subject: "Quant", topic: "Ratio", question_text: "If 3:5 = x:20 then x =", options: ["8", "12", "15", "18"], correct_answer: 1, explanation: "3/5=x/20 → x=12.", difficulty: "easy", source: "official" },
  { subject: "Quant", topic: "Average", question_text: "Average of 10, 20, 30, 40 is:", options: ["20", "25", "30", "40"], correct_answer: 1, explanation: "100/4=25.", difficulty: "easy", source: "official" },
  { subject: "Quant", topic: "Time", question_text: "A car covers 120 km in 2 hours. Speed is:", options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"], correct_answer: 2, explanation: "60 km/h.", difficulty: "easy", source: "official" },
  { subject: "Analytical", topic: "Series", question_text: "3, 6, 11, 18, 27, ?", options: ["36", "38", "39", "40"], correct_answer: 1, explanation: "+3,+5,+7,+9,+11.", difficulty: "medium", source: "official" },
  { subject: "Analytical", topic: "Odd one", question_text: "Odd one out: Mercury, Venus, Mars, Pluto (as a planet of the 8):", options: ["Mercury", "Venus", "Mars", "Pluto"], correct_answer: 3, explanation: "Pluto is a dwarf planet.", difficulty: "easy", source: "official" },
  { subject: "Biology", topic: "Cell", question_text: "Powerhouse of the cell is the:", options: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi"], correct_answer: 1, explanation: "Mitochondria.", difficulty: "easy", source: "official" },
  { subject: "Biology", topic: "Genetics", question_text: "DNA base pairing is:", options: ["A-G, T-C", "A-T, G-C", "A-C, G-T", "A-A, T-T"], correct_answer: 1, explanation: "A-T and G-C.", difficulty: "easy", source: "official" },
  { subject: "Biology", topic: "Physiology", question_text: "Insulin is secreted by:", options: ["Thyroid", "Adrenal cortex", "Pancreatic β cells", "Pituitary posterior"], correct_answer: 2, explanation: "Islets of Langerhans β cells.", difficulty: "medium", source: "official" },
  { subject: "Chemistry", topic: "Periodic", question_text: "Atomic number of carbon is:", options: ["4", "6", "8", "12"], correct_answer: 1, explanation: "Z=6.", difficulty: "easy", source: "official" },
  { subject: "Chemistry", topic: "Acids", question_text: "pH of pure water at 25 °C is:", options: ["0", "7", "14", "1"], correct_answer: 1, explanation: "Neutral 7.", difficulty: "easy", source: "official" },
  { subject: "Chemistry", topic: "Organic", question_text: "General formula of alkanes is:", options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnHn"], correct_answer: 1, explanation: "CnH2n+2.", difficulty: "easy", source: "official" },
  { subject: "Physics", topic: "Mechanics", question_text: "SI unit of force is:", options: ["Joule", "Watt", "Newton", "Pascal"], correct_answer: 2, explanation: "Newton.", difficulty: "easy", source: "official" },
  { subject: "Physics", topic: "Optics", question_text: "Speed of light in vacuum is about:", options: ["3×10^6 m/s", "3×10^8 m/s", "3×10^10 m/s", "330 m/s"], correct_answer: 1, explanation: "3×10^8 m/s.", difficulty: "easy", source: "official" },
  { subject: "Physics", topic: "Electricity", question_text: "Ohm’s law is:", options: ["V=IR", "P=mv", "F=Gm1m2/r", "E=mc"], correct_answer: 0, explanation: "V=IR.", difficulty: "easy", source: "official" },
  { subject: "Maths", topic: "Calculus", question_text: "d/dx (sin x) =", options: ["−sin x", "cos x", "tan x", "sec² x"], correct_answer: 1, explanation: "cos x.", difficulty: "easy", source: "official" },
  { subject: "Maths", topic: "Algebra", question_text: "(a+b)² =", options: ["a²+b²", "a²+2ab+b²", "a²−2ab+b²", "2ab"], correct_answer: 1, explanation: "a²+2ab+b².", difficulty: "easy", source: "official" },
  { subject: "Civics", topic: "Rights", question_text: "Article 25-A of the Constitution relates to:", options: ["right to education", "freedom of trade", "armed forces", "taxation"], correct_answer: 0, explanation: "Free education 5–16.", difficulty: "medium", source: "official" },
  { subject: "Law", topic: "PPC", question_text: "PPC means:", options: ["Pakistan Penal Code", "Punjab Police Code", "Public Procurement Code", "Postal Parcel Code"], correct_answer: 0, explanation: "Pakistan Penal Code.", difficulty: "easy", source: "official" },
  { subject: "Banking", topic: "SBP", question_text: "State Bank of Pakistan was inaugurated in:", options: ["1947", "1948", "1956", "1973"], correct_answer: 1, explanation: "1 July 1948.", difficulty: "medium", source: "official" },
  { subject: "Pedagogy", topic: "Bloom", question_text: "In original Bloom’s taxonomy the highest level is:", options: ["Knowledge", "Application", "Analysis", "Evaluation"], correct_answer: 3, explanation: "Evaluation (1956).", difficulty: "medium", source: "official" },
  { subject: "Computer", topic: "Basics", question_text: "1 byte =", options: ["4 bits", "8 bits", "16 bits", "32 bits"], correct_answer: 1, explanation: "8 bits.", difficulty: "easy", source: "official" },
  { subject: "Current", topic: "Pakistan", question_text: "The federal capital of Pakistan is:", options: ["Karachi", "Lahore", "Islamabad", "Peshawar"], correct_answer: 2, explanation: "Islamabad.", difficulty: "easy", source: "official" },
];

export function publicMcqsFor(testId: string): MCQ[] {
  return FACTS.map((f, i) => ({
    ...f,
    kind: "mcq" as const,
    id: `${testId}-pub-${i}`,
    test_id: testId,
  }));
}
