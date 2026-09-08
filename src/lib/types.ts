export type Category =
  | "Admissions"
  | "Admissions-Grad"
  | "Recruitment"
  | "PSC"
  | "Banking"
  | "Police"
  | "Judicial"
  | "Teaching"
  | "Armed Forces"
  | "Professional";

export type CareerStage =
  | "Matric"
  | "Intermediate"
  | "Graduate"
  | "Job Seeker"
  | "Professional";

export type Test = {
  id: string;
  name: string;
  category: Category;
  career_stage: CareerStage;
  conducting_body: string;
  official_url: string;
  eligibility: string;
  format_description: string;
  fee_info: string;
  last_updated: string;
  priority?: boolean;
};

export type SyllabusItem = {
  id: string;
  test_id: string;
  subject: string;
  topic: string;
  subtopic: string;
  weightage: number;
};

export type PastPaper = {
  id: string;
  test_id: string;
  year: number;
  conducting_body_variant: string;
  file_url: string;
  source: string;
  verified: boolean;
};

export type MCQ = {
  id: string;
  test_id: string;
  subject: string;
  topic: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  source: "official" | "ai_generated" | "aggregator";
};

export type MockConfig = {
  id: string;
  test_id: string;
  time_limit_minutes: number;
  negative_marking: boolean;
  negative_value: number;
  question_count: number;
};

export type Alert = {
  id: string;
  test_id: string;
  type: "new_date" | "roll_slip" | "result" | "announcement";
  title: string;
  body: string;
  source_url: string;
  published_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  language: "en" | "ur";
};

export type MockAttempt = {
  test_id: string;
  score: number;
  total: number;
  date: string;
  paper_year?: number;
};

export type Job = {
  id: string;
  test_id: string;
  title: string;
  organization: string;
  location: string;
  last_date: string;
  apply_url: string;
  source: string;
  posts?: string;
  fee?: string;
  synced_at: string;
};

export type PrepPack = {
  test_id: string;
  documents: string[];
  challan: string;
  apply_url: string;
  apply_label: string;
};
