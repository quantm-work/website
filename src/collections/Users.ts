import type { AuthStrategy, CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated";

function isAllowedEmail(email: string): boolean {
  const allowlist = process.env.ALLOWED_ADMIN_EMAILS?.split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (allowlist?.length) return allowlist.includes(email.toLowerCase());
  return email.endsWith("@quantm.work");
}

const betterAuthStrategy: AuthStrategy = {
  name: "better-auth-google",
  authenticate: async ({ headers, payload }) => {
    const { getAuth } = await import("../lib/auth");
    const session = await getAuth().api.getSession({ headers });
    const email = session?.user?.email?.toLowerCase();

    if (!email || !isAllowedEmail(email)) {
      return { user: null };
    }

    const existing = await payload.find({
      collection: "users",
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: email } },
    });

    let user = existing.docs[0];

    if (!user) {
      user = await payload.create({
        collection: "users",
        data: {
          email,
          role: "editor",
        },
        overrideAccess: true,
      });
    }

    return {
      user: {
        collection: "users",
        ...user,
      },
    };
  },
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    disableLocalStrategy: true,
    strategies: [betterAuthStrategy],
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role"],
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: ["admin", "editor"],
    },
  ],
};
