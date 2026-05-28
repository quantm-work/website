import { NextResponse } from "next/server";
import { submitIndexNow } from "@/lib/publishing/indexnow";

export async function POST(request: Request) {
  const body = (await request.json()) as { urls?: string[] };
  const key = process.env.INDEXNOW_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantm.work";
  const host = new URL(siteUrl).hostname;

  if (!key) {
    return NextResponse.json(
      { ok: false, error: "INDEXNOW_KEY missing" },
      { status: 500 },
    );
  }

  const urls = body.urls ?? [];
  const response = await submitIndexNow(urls, key, host);

  return NextResponse.json({
    ok: response.ok,
    status: response.status,
  });
}
