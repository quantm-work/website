import configPromise from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

const lexicalBody = {
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "Disposable smoke-test body for Payload publish validation.",
            version: 1,
          },
        ],
      },
    ],
  },
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 },
    );
  }

  const secret = process.env.REVALIDATE_SECRET;
  const header = request.headers.get("x-smoke-secret");
  if (secret) {
    if (header !== secret) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 },
      );
    }
  } else if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET required" },
      { status: 401 },
    );
  }

  const timestamp = Date.now();
  const slug = `cursor-publish-smoke-${timestamp}`;
  const now = new Date().toISOString();
  const payload = await getPayload({ config: configPromise });

  const post = await payload.create({
    collection: "posts",
    overrideAccess: true,
    draft: false,
    data: {
      title: `Cursor Publish Smoke ${timestamp}`,
      slug,
      excerpt: "Disposable excerpt for publish validation.",
      answerSummary:
        "This is a forty-word minimum direct answer used to validate blog listing, RSS, knowledge API, and publish hooks after creating a Payload post in the local database.",
      body: lexicalBody,
      publishedAt: now,
      lastReviewedAt: now,
      topics: [{ topic: "Smoke test" }, { topic: "Payload CMS" }],
      faqs: [
        {
          question: "Is this post real?",
          answer: "No. It is a disposable smoke-test entry for validation.",
        },
      ],
      citations: [
        {
          label: "QuantM",
          url: "https://quantm.work",
          publisher: "QuantM",
        },
      ],
      meta: {
        title: `Cursor Publish Smoke ${timestamp} | QuantM`,
        description: "Disposable SEO description for publish validation.",
      },
      _status: "published",
    },
  });

  return NextResponse.json({
    ok: true,
    id: post.id,
    slug: post.slug,
    title: post.title,
    status: post._status,
    publishedAt: post.publishedAt,
  });
}
