import { describe, expect, it } from "vitest";
import { companions, filterBooks, shelfBooks } from "@/lib/books";

describe("Góc Thư Viện 11A5 book data", () => {
  it("has 20 extra books on the shelf plus 3 companion books", () => {
    expect(shelfBooks).toHaveLength(20);
    expect(companions).toHaveLength(3);
  });

  it("filters the shelf by genre and by title/author search", () => {
    expect(filterBooks(shelfBooks, "Thiếu nhi & lịch sử", "").every((b) => b.genre === "Thiếu nhi & lịch sử")).toBe(true);
    expect(filterBooks(shelfBooks, "Tất cả", "bảo ninh").map((b) => b.id)).toEqual(["noi-buon-chien-tranh"]);
  });
});
