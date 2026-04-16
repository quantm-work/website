import { type NextRequest, NextResponse } from "next/server";

/**
 * Dev/preview helper: `?debug-region=DE` (or `us-ca`, `clear`) sets a short-lived
 * cookie so `resolveRegion()` can simulate EU/CA/etc. from localhost. No-op in
 * production; on Vercel real geo comes from `x-vercel-ip-country` headers and
 * does not need this file.
 */
export function proxy(request: NextRequest) {
  const debug = request.nextUrl.searchParams.get("debug-region");
  if (!debug) return NextResponse.next();

  const response = NextResponse.next();
  if (debug.trim().toLowerCase() === "clear") {
    response.cookies.delete("qmw_debug_region");
  } else {
    response.cookies.set("qmw_debug_region", debug, {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      httpOnly: false,
    });
  }
  return response;
}

export const config = {
  matcher: [
    // Only pages; skip static/image/optimization/api paths.
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
