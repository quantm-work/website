import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { afterPublish } from "./hooks/afterPublish";
import { publishGate } from "./hooks/publishGate";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt", "updatedAt"],
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField({ fieldToUse: "title" }),
    { name: "excerpt", type: "textarea", required: true },
    {
      name: "answerSummary",
      type: "textarea",
      required: true,
      admin: {
        description:
          "40-80 word direct answer for search and AI answer engines.",
      },
    },
    {
      name: "body",
      type: "richText",
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: "faqs",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "citations",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        { name: "publisher", type: "text" },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "topics",
      type: "array",
      fields: [{ name: "topic", type: "text", required: true }],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "lastReviewedAt",
      type: "date",
      required: true,
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    beforeChange: [publishGate],
    afterChange: [afterPublish],
  },
};
