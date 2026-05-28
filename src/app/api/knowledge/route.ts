import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/posts";
import { buildKnowledgeFeed } from "@/lib/publishing/knowledge";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPublishedPosts();
  return NextResponse.json(
    buildKnowledgeFeed(
      posts.map((post) => ({
        slug: post.slug,
        title: post.title,
        answerSummary: post.answerSummary,
        lastReviewedAt: post.lastReviewedAt,
        topics: post.topics ?? [],
        faqs: post.faqs ?? [],
        citations: post.citations ?? [],
      })),
    ),
  );
}
