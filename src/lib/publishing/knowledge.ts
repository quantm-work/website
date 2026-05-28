import type { KnowledgePost, PublishablePost } from "./types";

export function mapToKnowledgePost(
  post: PublishablePost & {
    slug: string;
    title: string;
    answerSummary: string;
    lastReviewedAt: string;
  },
): KnowledgePost {
  return {
    title: post.title,
    url: `/blog/${post.slug}`,
    summary: post.answerSummary,
    topics: post.topics ?? [],
    faqs: post.faqs ?? [],
    citations: post.citations ?? [],
    lastReviewedAt: post.lastReviewedAt,
  };
}

export function buildKnowledgeFeed(
  posts: Array<
    PublishablePost & {
      slug: string;
      title: string;
      answerSummary: string;
      lastReviewedAt: string;
    }
  >,
) {
  return {
    updatedAt: new Date().toISOString(),
    posts: posts.map(mapToKnowledgePost),
  };
}
