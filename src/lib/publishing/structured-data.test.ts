import { describe, expect, test } from "bun:test";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "./structured-data";

const post = {
  slug: "hello-world",
  title: "Hello World",
  excerpt: "Excerpt",
  answerSummary: "Answer",
  publishedAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
};

describe("structured data builders", () => {
  test("builds Article JSON-LD", () => {
    expect(buildArticleJsonLd(post, "https://quantm.work")).toMatchObject({
      "@type": "Article",
      headline: "Hello World",
      url: "https://quantm.work/blog/hello-world",
    });
  });

  test("builds FAQPage JSON-LD", () => {
    expect(
      buildFaqJsonLd([{ question: "What?", answer: "This." }]),
    ).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [{ "@type": "Question", name: "What?" }],
    });
  });

  test("builds BreadcrumbList JSON-LD", () => {
    const breadcrumb = buildBreadcrumbJsonLd(post, "https://quantm.work");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(3);
    expect(breadcrumb.itemListElement?.[2]).toMatchObject({
      position: 3,
      name: "Hello World",
    });
  });
});
