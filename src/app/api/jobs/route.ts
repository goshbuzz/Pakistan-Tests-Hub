import { NextResponse } from "next/server";
import { JOBS } from "@/data/jobs";

export async function GET() {
  return NextResponse.json({
    synced_at: new Date().toISOString(),
    jobs: JOBS,
    note: "Production scrapers should poll official_url per test and diff into this feed. Apply always happens on the source site.",
  });
}
