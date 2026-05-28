import { describe, expect, test } from "bun:test";
import { buildKnowledgeFeed } from "./knowledge";

describe("buildKnowledgeFeed", () => {
  test("maps published machine-readable fields only", () => {
    const feed = buildKnowledgeFeed([
      {
        slug: "hello-world",
        title: "Hello World",
        answerSummary: "Answer",
        lastReviewedAt: "2026-01-01T00:00:00.000Z",
        topics: [{ topic: "Finance" }],
        faqs: [{ question: "What?", answer: "This." }],
        citations: [{ label: "Source", url: "https://example.com" }],
        body: { secret: true },
      },
    ]);

    expect(feed.posts).toHaveLength(1);
    expect(feed.posts[0]).toEqual({
      title: "Hello World",
      url: "/blog/hello-world",
      summary: "Answer",
      topics: [{ topic: "Finance" }],
      faqs: [{ question: "What?", answer: "This." }],
      citations: [{ label: "Source", url: "https://example.com" }],
      lastReviewedAt: "2026-01-01T00:00:00.000Z",
    });
    expect(feed.posts[0]).not.toHaveProperty("body");
  });
});
