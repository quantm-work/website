const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export function buildIndexNowPayload(
  urls: string[],
  key: string,
  host: string,
): { urlList: string[]; key: string; keyLocation: string; host: string } {
  if (!urls.length) throw new Error("At least one URL is required");
  if (!key) throw new Error("INDEXNOW_KEY is required");
  if (!host) throw new Error("Host is required");

  for (const url of urls) {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new Error(`Invalid URL: ${url}`);
    }
    if (parsed.hostname !== host) {
      throw new Error(`URL host mismatch: ${url}`);
    }
  }

  return {
    urlList: urls,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    host,
  };
}

export async function submitIndexNow(
  urls: string[],
  key: string,
  host: string,
): Promise<Response> {
  const payload = buildIndexNowPayload(urls, key, host);
  return fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
}
