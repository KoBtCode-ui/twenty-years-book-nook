import { describe, expect, it } from "vitest";
import { bookSearchUrl, parseBookSearch } from "@/lib/book-search";
import { featuredBooks } from "@/lib/books";

describe("Featured and online books", () => {
  it("keeps the uploaded diary first and includes multiple real-cover featured books", () => {
    expect(featuredBooks[0]?.id).toBe("mai-mai-tuoi-hai-muoi");
    expect(featuredBooks).toHaveLength(6);
    expect(featuredBooks.filter((book) => !book.cover)).toHaveLength(0);
  });
  it("encodes author queries separately and forwards pagination", () => {
    const url = new URL(bookSearchUrl(" Nguyễn Nhật Ánh ", 2, "author"));
    expect(url.searchParams.get("author")).toBe("Nguyễn Nhật Ánh");
    expect(url.searchParams.get("q")).toBeNull();
    expect(url.searchParams.get("page")).toBe("2");
  });
  it("normalizes records without fabricating missing covers and rejects unsafe work links", () => {
    const result = parseBookSearch({ numFound: 2, docs: [{ key: "/works/OL123W", title: "Tuổi thơ dữ dội" }, { key: "https://unsafe.example", title: "Invalid" }] });
    expect(result.total).toBe(2);
    expect(result.books).toHaveLength(1);
    expect(result.books[0]?.cover).toBeNull();
    expect(result.books[0]?.link).toBe("https://openlibrary.org/works/OL123W");
  });
});