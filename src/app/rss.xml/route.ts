import { getPublishedPosts, getSiteUrl } from "@/lib/posts";
import { renderRss } from "@/lib/publishing/rss";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPublishedPosts();
  const siteUrl = getSiteUrl();

  return new Response(
    renderRss(
      posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        answerSummary: post.answerSummary,
        publishedAt: post.publishedAt ?? post.createdAt,
        updatedAt: post.updatedAt,
      })),
      siteUrl,
    ),
    {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    },
  );
}
