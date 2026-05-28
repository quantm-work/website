import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

function getHandler() {
  return toNextJsHandler(getAuth());
}

export async function GET(request: Request) {
  return getHandler().GET(request);
}

export async function POST(request: Request) {
  return getHandler().POST(request);
}
