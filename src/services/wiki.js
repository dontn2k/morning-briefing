export async function fetchWikiRandom() {
  try {
    const res = await fetch(
      "https://de.wikipedia.org/api/rest_v1/page/random/summary"
    );
    if (!res.ok) throw new Error("Wiki error");
    const data = await res.json();
    const raw = data.extract || "";
    const firstSentence =
      raw.split(/(?<=[.!?])\s+/)[0] || raw.slice(0, 200);
    return {
      title: data.title || "",
      extract: firstSentence,
      url: data.content_urls?.mobile?.page || "",
      error: false,
    };
  } catch {
    return { title: "", extract: "", url: "", error: true };
  }
}
