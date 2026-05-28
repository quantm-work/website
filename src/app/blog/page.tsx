import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import { getPublishedPosts, getSiteUrl } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Expert finance and AI publishing from QuantM.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const siteUrl = getSiteUrl();

  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-8 py-16">
        <h1 className="mb-8 font-display text-5xl font-medium">Blog</h1>
        <div className="space-y-10">
          {posts.length === 0 ? (
            <p className="text-[var(--color-mid)]">No published posts yet.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="border-t border-[var(--color-subtle)] pt-8"
              >
                <h2 className="mb-3 font-display text-3xl font-medium">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mb-4 text-[var(--color-mid)]">{post.excerpt}</p>
                <p className="text-sm">{post.answerSummary}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold underline"
                >
                  Read article
                </Link>
                <meta itemProp="url" content={`${siteUrl}/blog/${post.slug}`} />
              </article>
            ))
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
