import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";
import type { Post } from "@/payload-types";

export const getPayloadClient = cache(async () =>
  getPayload({ config: configPromise }),
);

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 2,
      limit: 100,
    });
    return result.docs as Post[];
  } catch {
    return [];
  }
});

export const hasPublishedPosts = cache(async (): Promise<boolean> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.count({
      collection: "posts",
      where: { _status: { equals: "published" } },
    });
    return result.totalDocs > 0;
  } catch {
    return false;
  }
});

export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "posts",
        where: {
          slug: { equals: slug },
          _status: { equals: "published" },
        },
        depth: 2,
        limit: 1,
      });
      return (result.docs[0] as Post | undefined) ?? null;
    } catch {
      return null;
    }
  },
);

export function getRelatedPosts(
  posts: Post[],
  currentSlug: string,
  limit = 3,
): Post[] {
  return posts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantm.work";
}

export function getMediaUrl(media: Post["heroImage"]): string | undefined {
  if (!media || typeof media === "string") return undefined;
  return media.url ?? undefined;
}
