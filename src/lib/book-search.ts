import { z } from "zod";

export const SEARCH_PAGE_SIZE = 12;
const documentSchema = z.object({
  key: z.string().regex(/^(?:\/works\/)?OL\d+W$/),
  title: z.string(),
  author_name: z.array(z.string()).optional(),
  cover_i: z.number().int().positive().optional(),
  first_publish_year: z.number().optional(),
  edition_count: z.number().optional(),
});
const responseSchema = z.object({
  numFound: z.number().optional(),
  num_found: z.number().optional(),
  docs: z.array(z.unknown()),
});
export type OnlineBook = {
  id: string; title: string; authors: string; year: number | null;
  editions: number; cover: string | null; link: string;
};

export function bookSearchUrl(query: string, page: number, mode: string) {
  const params = new URLSearchParams({
    [mode === "title" || mode === "author" ? mode : "q"]: query.trim(),
    page: String(Math.max(1, Math.floor(page))), limit: String(SEARCH_PAGE_SIZE),
    fields: "key,title,author_name,cover_i,first_publish_year,edition_count", lang: "vi",
  });
  return `https://openlibrary.org/search.json?${params}`;
}

export function parseBookSearch(value: unknown): { total: number; books: OnlineBook[] } {
  const parsed = responseSchema.parse(value);
  const books = parsed.docs.flatMap((doc) => {
    const result = documentSchema.safeParse(doc);
    if (!result.success) return [];
    const b = result.data;
    const id = b.key.replace("/works/", "");
    return [{ id, title: b.title, authors: b.author_name?.join(" · ") || "Chưa có thông tin tác giả",
      year: b.first_publish_year ?? null, editions: b.edition_count ?? 0,
      cover: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg?default=false` : null,
      link: `https://openlibrary.org/works/${id}` }];
  });
  return { total: parsed.numFound ?? parsed.num_found ?? 0, books };
}

export async function searchOnlineBooks(query: string, page: number, mode: string, signal: AbortSignal) {
  const response = await fetch(bookSearchUrl(query, page, mode), { signal });
  if (!response.ok) throw new Error("Không thể kết nối Open Library lúc này. Bạn thử lại nhé.");
  return parseBookSearch(await response.json());
}