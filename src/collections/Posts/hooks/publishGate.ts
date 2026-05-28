import type { CollectionBeforeChangeHook } from "payload";
import { requireForPublish } from "../../../lib/publishing/publish-gate";
import type { Post } from "../../../payload-types";

export const publishGate: CollectionBeforeChangeHook<Post> = ({ data }) => {
  return requireForPublish({
    ...data,
    _status: data._status ?? undefined,
  });
};
