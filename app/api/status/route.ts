import { NextResponse } from "next/server";
import { getQueryStatus } from "@/lib/query";

export async function GET() {
  const status = await getQueryStatus();
  return NextResponse.json(status);
}
