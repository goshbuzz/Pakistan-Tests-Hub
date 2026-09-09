import { MCQ } from "@/lib/types";

function q(
  subject: string,
  topic: string,
  question_text: string,
  options: string[],
  correct_answer: number,
  explanation: string,
  difficulty: MCQ["difficulty"]
): Omit<MCQ, "id" | "test_id"> {
  return {
    kind: "mcq",
    subject,
    topic,
    question_text,
    options,
    correct_answer,
    explanation,
    difficulty,
    source: "official",
  };
}

export const CIVIC: Omit<MCQ, "id" | "test_id">[] = [
  q("Pakistan Studies", "Movement", "The All-India Muslim League was founded in:", ["1905", "1906", "1913", "1940"], 1, "Dhaka, 1906.", "easy"),
  q("Pakistan Studies", "Movement", "Quaid-e-Azam presented the Fourteen Points in:", ["1916", "1929", "1940", "1946"], 1, "1929.", "medium"),
  q("Pakistan Studies", "Geography", "The Salt Range is mainly in:", ["Sindh", "Punjab", "Balochistan coast", "GB only"], 1, "Punjab.", "easy"),
  q("Pakistan Studies", "Constitution", "Pakistan became a republic under the constitution of:", ["1947", "1956", "1962", "1973"], 1, "1956 Constitution.", "medium"),
  q("Pakistan Studies", "Provinces", "How many provinces does Pakistan have?", ["2", "3", "4", "5"], 2, "Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan.", "easy"),
  q("Islamiat", "Pillars", "The first pillar of Islam is:", ["Zakat", "Shahadah", "Hajj", "Sawm"], 1, "Declaration of faith.", "easy"),
  q("Islamiat", "Quran", "The longest Surah of the Quran is:", ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "Ya-Sin"], 1, "Al-Baqarah.", "easy"),
  q("Islamiat", "Seerah", "The Battle of Badr was in:", ["1 AH", "2 AH", "5 AH", "8 AH"], 1, "2 AH.", "medium"),
  q("Islamiat", "Fiqh", "Qiyas in Islamic law means:", ["consensus", "analogy", "a tax", "a prayer"], 1, "Analogical reasoning.", "hard"),
  q("GK", "Pakistan", "National poet of Pakistan is commonly taught as:", ["Ghalib", "Allama Iqbal", "Faiz only", "Mir Taqi Mir"], 1, "Allama Iqbal.", "easy"),
  q("GK", "World", "WTO deals primarily with:", ["world trade rules", "world health", "football", "space"], 0, "World Trade Organization.", "medium"),
  q("GK", "Pakistan", "The highest civil award of Pakistan is:", ["Sitara-e-Jurat", "Nishan-e-Pakistan", "Tamgha-e-Khidmat", "Hilal-e-Imtiaz only"], 1, "Nishan-e-Pakistan.", "medium"),
  q("GK", "Computer", "HTTP is used for:", ["web pages", "only email", "only DNS", "only FTP"], 0, "Hypertext transfer.", "easy"),
  q("Urdu", "Language", "Urdu is written in a script derived mainly from:", ["Latin", "Perso-Arabic (Nastaliq)", "Devanagari only", "Cyrillic"], 1, "Nastaliq.", "easy"),
  q("Current Affairs", "Orgs", "OIC stands for:", ["Organisation of Islamic Cooperation", "Oil Import Club", "Open Internet Code", "Oxford International College"], 0, "OIC.", "easy"),
  q("Job related", "Service", "A government job advertisement should be read from:", ["the official conducting-body site", "only forwarded PDFs", "random Facebook pages", "guesswork"], 0, "Official ad is authoritative.", "easy"),
  q("Pedagogy", "Classroom", "A SMART objective is:", ["vague", "specific and measurable", "only emotional", "never timed"], 1, "Specific, measurable, etc.", "medium"),
  q("Law", "Constitution", "Article 184(3) is associated with:", ["original jurisdiction of the Supreme Court on questions of public importance and FR", "income tax rates", "MDCAT seats", "bank interest"], 0, "Suo motu / original SC jurisdiction theme.", "hard"),
  q("Pakistan Affairs", "Movement", "The Lahore Resolution was adopted in:", ["1930", "1940", "1946", "1956"], 1, "23 March 1940.", "easy"),
  q("Pakistan Affairs", "Polity", "The 18th Amendment (2010) mainly:", ["abolished provinces", "strengthened provincial autonomy", "ended the Senate", "moved the capital"], 1, "Devolution / concurrent list.", "medium"),
  q("GSA", "Science", "The SI unit of electric current is:", ["volt", "ampere", "ohm", "watt"], 1, "Ampere.", "easy"),
  q("GSA", "Ability", "If 25% of a number is 40, the number is:", ["80", "120", "160", "200"], 2, "n=160.", "easy"),
  q("Current Affairs", "Pakistan", "CPEC is primarily a corridor project with:", ["China", "Brazil", "Iceland", "New Zealand only"], 0, "China–Pakistan Economic Corridor.", "easy"),
  q("Optional", "Method", "For CSS optionals you should pick subjects:", ["only rumoured scoring without background", "with some academic background + scoring mix", "all science if you are a lawyer", "randomly on exam day"], 1, "Background + FPSC groups.", "easy"),
  q("Urdu", "Grammar", "Urdu izafat typically links:", ["two nouns (e.g. kitab-e-adab)", "only English verbs", "CNIC numbers", "DNA bases"], 0, "Persian-style izafat.", "medium"),
];

export function civicFor(allowed: string[]): Omit<MCQ, "id" | "test_id">[] {
  const low = allowed.map((a) => a.toLowerCase());
  return CIVIC.filter((s) =>
    low.some((a) => {
      const sub = s.subject.toLowerCase();
      return sub === a || a.includes(sub) || sub.includes(a.split(" ")[0]) || (a.includes("gk") && sub === "gk");
    })
  );
}
