export interface User {
  id: string;
  email: string;
  role: "admin" | "editor";
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  alt: string;
  caption?: string | null;
  transcript?: string | null;
  url?: string | null;
  updatedAt: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  answerSummary: string;
  body: Record<string, unknown> & { root?: unknown };
  faqs?: Array<{ id?: string; question: string; answer: string }> | null;
  citations?: Array<{
    id?: string;
    label: string;
    url: string;
    publisher?: string | null;
  }> | null;
  topics?: Array<{ id?: string; topic: string }> | null;
  heroImage?: Media | string | null;
  publishedAt?: string | null;
  lastReviewedAt: string;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: Media | string | null;
  } | null;
  _status?: "draft" | "published" | null;
  updatedAt: string;
  createdAt: string;
}
