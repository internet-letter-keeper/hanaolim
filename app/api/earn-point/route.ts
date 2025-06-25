// app/api/earn-point/route.ts
import { NextResponse } from "next/server";
import { handleEarnPoint } from "@/lib/actions/point-earn-action";

export async function POST(req: Request) {
  const { letterId, soldierId } = await req.json();
  const result = await handleEarnPoint({ letterId, soldierId });
  return NextResponse.json(result);
}
