import type { PublishablePost } from "./types";

export type RssPost = PublishablePost & {
  slug: string;
  title: string;
  answerSummary: string;
  publishedAt: string;
  updatedAt: string;
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderRss(posts: RssPost[], siteUrl: string): string {
  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${escapeXml(url)}</link>
  <guid>${escapeXml(url)}</guid>
  <description>${escapeXml(post.answerSummary)}</description>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  <lastBuildDate>${new Date(post.updatedAt).toUTCString()}</lastBuildDate>
</item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>QuantM Blog</title>
  <link>${escapeXml(siteUrl)}/blog</link>
  <description>Expert finance and AI publishing from QuantM</description>
${items}
</channel>
</rss>`;
}
