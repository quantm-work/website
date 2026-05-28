import { describe, expect, test } from "bun:test";
import { buildIndexNowPayload } from "./indexnow";

describe("buildIndexNowPayload", () => {
  test("builds a valid payload", () => {
    expect(
      buildIndexNowPayload(
        ["https://quantm.work/blog/hello-world"],
        "abc123",
        "quantm.work",
      ),
    ).toEqual({
      urlList: ["https://quantm.work/blog/hello-world"],
      key: "abc123",
      keyLocation: "https://quantm.work/abc123.txt",
      host: "quantm.work",
    });
  });

  test("rejects host mismatches", () => {
    expect(() =>
      buildIndexNowPayload(
        ["https://example.com/blog/hello-world"],
        "abc123",
        "quantm.work",
      ),
    ).toThrow("URL host mismatch");
  });
});
