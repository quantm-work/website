import type { CollectionConfig } from "payload";
import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  upload: {
    mimeTypes: ["image/*", "audio/*", "video/*", "application/pdf"],
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "text" },
    { name: "transcript", type: "textarea" },
  ],
};
