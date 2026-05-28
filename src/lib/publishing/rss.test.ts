import { describe, expect, test } from "bun:test";
import { renderRss } from "./rss";

describe("renderRss", () => {
  test("includes title, canonical URL, summary, and dates", () => {
    const xml = renderRss(
      [
        {
          slug: "hello-world",
          title: "Hello World",
          answerSummary: "A concise answer.",
          publishedAt: "2026-01-01T00:00:00.000Z",
          updatedAt: "2026-01-02T00:00:00.000Z",
        },
      ],
      "https://quantm.work",
    );

    expect(xml).toContain("<title>Hello World</title>");
    expect(xml).toContain("<link>https://quantm.work/blog/hello-world</link>");
    expect(xml).toContain("<description>A concise answer.</description>");
    expect(xml).toContain("<pubDate>");
    expect(xml).toContain("<lastBuildDate>");
  });
});
