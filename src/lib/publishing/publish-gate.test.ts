import { describe, expect, test } from "bun:test";
import { requireForPublish } from "./publish-gate";

const completePost = {
  _status: "published" as const,
  title: "Test Post",
  slug: "test-post",
  excerpt: "Short excerpt",
  answerSummary: "Direct answer for search engines.",
  body: { root: {} },
  publishedAt: "2026-01-01T00:00:00.000Z",
  lastReviewedAt: "2026-01-01T00:00:00.000Z",
  faqs: [{ question: "What?", answer: "This." }],
  citations: [{ label: "Source", url: "https://example.com" }],
  meta: { title: "SEO Title", description: "SEO Description" },
};

describe("requireForPublish", () => {
  test("passes complete published posts", () => {
    expect(requireForPublish(completePost)).toEqual(completePost);
  });

  test("skips validation for drafts", () => {
    expect(
      requireForPublish({ ...completePost, _status: "draft", title: "" }),
    ).toEqual({ ...completePost, _status: "draft", title: "" });
  });

  test("rejects missing SEO title", () => {
    expect(() =>
      requireForPublish({ ...completePost, meta: { description: "desc" } }),
    ).toThrow("Missing SEO title");
  });

  test("rejects missing FAQ", () => {
    expect(() => requireForPublish({ ...completePost, faqs: [] })).toThrow(
      "Add at least one FAQ",
    );
  });
});
