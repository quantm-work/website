import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { secret?: string; paths?: string[] };
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  for (const path of body.paths ?? []) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: body.paths ?? [] });
}
