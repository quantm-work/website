import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import {
  getMediaUrl,
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
  getSiteUrl,
} from "@/lib/posts";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/publishing/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const title = post.meta?.title ?? post.title;
  const description = post.meta?.description ?? post.excerpt;
  const image = getMediaUrl(post.meta?.image ?? post.heroImage);

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: image ? [image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const related = getRelatedPosts(allPosts, post.slug);
  const siteUrl = getSiteUrl();
  const articleJsonLd = buildArticleJsonLd(post, siteUrl);
  const faqJsonLd = buildFaqJsonLd(post.faqs ?? []);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post, siteUrl);

  return (
    <>
      <Header />
      <main id="main" className="mx-auto max-w-3xl px-8 py-16">
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(breadcrumbJsonLd),
            }}
          />

          <h1 className="mb-8 font-display text-5xl font-medium">
            {post.title}
          </h1>

          <section id="answer" className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-medium">
              Direct Answer
            </h2>
            <p>{post.answerSummary}</p>
          </section>

          {post.topics?.length ? (
            <section id="key-points" className="mb-10">
              <h2 className="mb-4 font-display text-2xl font-medium">
                Key Points
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                {post.topics.map((item) => (
                  <li key={item.id ?? item.topic}>{item.topic}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <section id="body" className="prose prose-neutral mb-10 max-w-none">
            <RichText data={post.body as unknown as SerializedEditorState} />
          </section>

          <section id="faq" className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-medium">FAQ</h2>
            <div className="space-y-6">
              {(post.faqs ?? []).map((faq) => (
                <div key={faq.id ?? faq.question}>
                  <h3 className="mb-2 text-xl font-semibold">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="sources" className="mb-10">
            <h2 className="mb-4 font-display text-2xl font-medium">Sources</h2>
            <ul className="list-disc space-y-2 pl-6">
              {(post.citations ?? []).map((source) => (
                <li key={source.id ?? source.url}>
                  <a
                    href={source.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {source.label}
                  </a>
                  {source.publisher ? ` — ${source.publisher}` : null}
                </li>
              ))}
            </ul>
          </section>

          <p className="text-sm text-[var(--color-mid)]">
            Last reviewed{" "}
            {new Date(post.lastReviewedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </article>

        {related.length ? (
          <section className="mt-16 border-t border-[var(--color-subtle)] pt-10">
            <h2 className="mb-6 font-display text-2xl font-medium">
              Related Posts
            </h2>
            <ul className="space-y-4">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-semibold underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
