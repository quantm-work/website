import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";
import { getPool } from "@/lib/db";

function getAuthSecret(): string {
  const secret =
    process.env.BETTER_AUTH_SECRET ??
    process.env.PAYLOAD_SECRET ??
    process.env.REVALIDATE_SECRET;
  if (!secret) {
    throw new Error("Set BETTER_AUTH_SECRET or PAYLOAD_SECRET");
  }
  return secret;
}

function getBaseUrl(): string {
  return (
    process.env.BETTER_AUTH_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

function getTrustedOrigins(): string[] {
  const origins = new Set<string>(["http://localhost:3000"]);
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) origins.add(site.replace(/\/$/, ""));
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }
  return [...origins];
}

export function hasGoogleAuthConfig(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );
}

export function getAuth() {
  const baseURL = getBaseUrl();

  return betterAuth({
    baseURL,
    secret: getAuthSecret(),
    database: getPool(),
    trustedOrigins: getTrustedOrigins(),
    plugins: [
      oAuthProxy({
        productionURL: process.env.NEXT_PUBLIC_SITE_URL ?? baseURL,
      }),
    ],
    socialProviders: hasGoogleAuthConfig()
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: `${baseURL}/api/auth/callback/google`,
            prompt: "select_account",
          },
        }
      : {},
  });
}
