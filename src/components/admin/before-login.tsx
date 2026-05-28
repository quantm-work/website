"use client";

import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export function BeforeLogin() {
  return (
    <div className="mb-6 space-y-3">
      <button
        type="button"
        className="w-full rounded-none border border-black bg-black px-4 py-3 text-sm font-semibold text-white"
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: "/admin",
          })
        }
      >
        Sign in with Google
      </button>
      <p className="text-center text-xs text-neutral-500">
        Allowed: @quantm.work or ALLOWED_ADMIN_EMAILS
      </p>
    </div>
  );
}
