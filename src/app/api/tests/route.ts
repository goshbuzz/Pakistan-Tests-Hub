import { NextResponse } from "next/server";
import { TESTS } from "@/data/tests";

export async function GET() {
  return NextResponse.json({ tests: TESTS });
}
