export type PostCitation = {
  id?: string;
  label: string;
  url: string;
  publisher?: string | null;
};

export type PostFaq = {
  id?: string;
  question: string;
  answer: string;
};

export type PostTopic = {
  id?: string;
  topic: string;
};

export type PostMeta = {
  title?: string | null;
  description?: string | null;
  image?: { url?: string | null } | string | null;
};

export type PublishablePost = {
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  answerSummary?: string | null;
  body?: unknown;
  publishedAt?: string | null;
  lastReviewedAt?: string | null;
  faqs?: PostFaq[] | null;
  citations?: PostCitation[] | null;
  topics?: PostTopic[] | null;
  meta?: PostMeta | null;
  _status?: "draft" | "published" | null;
  updatedAt?: string;
};

export type KnowledgePost = {
  title: string;
  url: string;
  summary: string;
  topics: PostTopic[];
  faqs: PostFaq[];
  citations: PostCitation[];
  lastReviewedAt: string;
};
