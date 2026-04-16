import { NextResponse } from "next/server";
import { resolveRegion } from "@/lib/consent/region";

export async function GET() {
  const policy = await resolveRegion();
  return NextResponse.json(policy, {
    headers: {
      // Vary on the debug cookie + Vercel's geo header so CDN/browser don't serve stale region data.
      "cache-control": "private, no-store",
    },
  });
}
