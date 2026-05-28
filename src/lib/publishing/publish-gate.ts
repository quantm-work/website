import type { PublishablePost } from "./types";

export function requireForPublish<T extends PublishablePost>(data: T): T {
  if (data._status !== "published") return data;

  const required: (keyof PublishablePost)[] = [
    "title",
    "slug",
    "excerpt",
    "answerSummary",
    "body",
    "publishedAt",
    "lastReviewedAt",
  ];

  for (const field of required) {
    if (!data[field]) throw new Error(`Missing: ${field}`);
  }

  if (!data.faqs?.length) throw new Error("Add at least one FAQ");
  if (!data.citations?.length) throw new Error("Add at least one citation");
  if (!data.meta?.title) throw new Error("Missing SEO title");
  if (!data.meta?.description) throw new Error("Missing SEO description");

  return data;
}
