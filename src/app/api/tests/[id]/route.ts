import { NextResponse } from "next/server";
import { TESTS } from "@/data/tests";
import { ALERTS, MCQS, MOCKS, PAST_PAPERS, SYLLABUS } from "@/data/content";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const test = TESTS.find((t) => t.id === params.id);
  if (!test) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({
    test,
    syllabus: SYLLABUS.filter((s) => s.test_id === params.id),
    papers: PAST_PAPERS.filter((s) => s.test_id === params.id),
    mcqs: MCQS.filter((s) => s.test_id === params.id),
    mock: MOCKS.find((s) => s.test_id === params.id) ?? null,
    alerts: ALERTS.filter((s) => s.test_id === params.id),
  });
}
