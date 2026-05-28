import type { CollectionAfterChangeHook } from "payload";
import { submitIndexNow } from "../../../lib/publishing/indexnow";
import type { Post } from "../../../payload-types";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://quantm.work";
}

function getHost(siteUrl: string): string {
  return new URL(siteUrl).hostname;
}

async function revalidatePaths(paths: string[]) {
  const siteUrl = getSiteUrl();
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  await fetch(`${siteUrl}/api/revalidate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, paths }),
  }).catch(() => undefined);
}

export const afterPublish: CollectionAfterChangeHook<Post> = async ({
  doc,
  operation,
  previousDoc,
}) => {
  if (!["create", "update"].includes(operation)) return doc;
  if (doc._status !== "published") return doc;

  const siteUrl = getSiteUrl();
  const path = `/blog/${doc.slug}`;
  const paths = [path, "/blog", "/rss.xml", "/sitemap.xml", "/api/knowledge"];

  if (
    previousDoc?._status === "published" &&
    previousDoc.slug !== doc.slug &&
    previousDoc.slug
  ) {
    paths.push(`/blog/${previousDoc.slug}`);
  }

  await revalidatePaths(paths);

  const key = process.env.INDEXNOW_KEY;
  if (key) {
    await submitIndexNow([`${siteUrl}${path}`], key, getHost(siteUrl)).catch(
      () => undefined,
    );
  }

  return doc;
};
