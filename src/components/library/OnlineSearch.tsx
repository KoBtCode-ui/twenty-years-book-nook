import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Globe, LoaderCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEARCH_PAGE_SIZE, searchOnlineBooks, type OnlineBook } from "@/lib/book-search";

function OnlineCover({ book }: { book: OnlineBook }) {
  const [failed, setFailed] = useState(false);
  return <div className="flex aspect-[2/3] w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-secondary text-muted-foreground shadow-card">
    {book.cover && !failed ? <img src={book.cover} alt={`Bìa sách ${book.title}`} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-contain" /> : <BookOpen className="h-8 w-8" />}
  </div>;
}

export function OnlineSearch() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("q");
  const [request, setRequest] = useState({ query: "", mode: "q", page: 1 });
  const result = useQuery({
    queryKey: ["online-books", request],
    queryFn: ({ signal }) => searchOnlineBooks(request.query, request.page, request.mode, signal),
    enabled: Boolean(request.query), staleTime: 300_000, retry: 1,
  });
  const data = result.data;
  return <section id="tim-sach" className="border-t border-border bg-card">
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="eyebrow flex items-center gap-2 text-accent"><Globe className="h-4 w-4" /> Open Library</p><h2 className="font-display-tight mt-4 text-4xl sm:text-5xl">Tìm sách <em className="text-primary">khắp thế giới</em></h2></div>
        <a href="https://openlibrary.org" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground">Open Library<ArrowUpRight className="h-4 w-4" /></a>
      </div>
      <form className="mt-8 flex flex-wrap gap-3" onSubmit={(event) => { event.preventDefault(); if (input.trim()) setRequest({ query: input.trim(), mode, page: 1 }); }}>
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-sm border border-input bg-background px-4"><Search className="h-4 w-4 shrink-0 text-muted-foreground" /><input aria-label="Tìm sách trực tuyến" placeholder="Tên sách, tác giả hoặc ISBN…" value={input} onChange={(event) => setInput(event.target.value)} maxLength={200} className="h-12 w-full min-w-0 bg-transparent text-sm outline-none" /></label>
        <select aria-label="Tìm theo" value={mode} onChange={(event) => setMode(event.target.value)} className="h-12 max-w-full rounded-sm border border-input bg-background px-3 text-sm"><option value="q">Tất cả</option><option value="title">Tên sách</option><option value="author">Tác giả</option></select>
        <Button type="submit" className="h-12" disabled={!input.trim()}><Search /> Tìm sách</Button>
      </form>
      {!request.query && <div className="mt-5 flex flex-wrap gap-2">{["Nguyễn Nhật Ánh", "Bảo Ninh", "Tuổi thơ dữ dội"].map((query) => <Button key={query} variant="outline" size="sm" onClick={() => { setInput(query); setMode("q"); setRequest({ query, mode: "q", page: 1 }); }}>{query}</Button>)}</div>}
      <div aria-live="polite" className="mt-8">
        {result.isFetching && <p className="flex items-center gap-2 text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" /> Đang tìm sách…</p>}
        {result.isError && <div className="flex flex-wrap items-center gap-3"><p className="text-destructive">Không thể kết nối Open Library lúc này. Bạn thử lại nhé.</p><Button variant="outline" onClick={() => void result.refetch()}>Thử lại</Button></div>}
        {data && !result.isFetching && <>
          <p className="mb-6 text-sm text-muted-foreground">{data.total.toLocaleString("vi-VN")} kết quả cho “{request.query}” · Trang {request.page}</p>
          {data.books.length === 0 ? <p className="py-8 text-muted-foreground">Chưa tìm thấy sách. Thử tên khác, tên tác giả hoặc ISBN nhé.</p> : <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">{data.books.map((book) => <article key={book.id} className="online-book-enter flex min-w-0 gap-4 border-b border-border pb-6"><OnlineCover book={book} /><div className="min-w-0"><h3 className="font-display-tight break-words text-xl leading-snug">{book.title}</h3><p className="mt-2 break-words text-sm text-muted-foreground">{book.authors}</p><p className="mt-2 text-xs text-muted-foreground">{book.year ?? "Chưa rõ năm"}{book.editions > 0 && ` · ${book.editions} ấn bản`}</p><Button asChild variant="link" className="mt-2 h-auto whitespace-normal p-0 text-left"><a href={book.link} target="_blank" rel="noreferrer">Xem sách<ArrowUpRight /></a></Button></div></article>)}</div>}
          {data.total > SEARCH_PAGE_SIZE && <div className="mt-8 flex items-center justify-center gap-4"><Button variant="outline" size="icon" disabled={request.page === 1} onClick={() => setRequest((value) => ({ ...value, page: value.page - 1 }))} aria-label="Kết quả trước"><ChevronLeft /></Button><span className="text-sm">{request.page} / {Math.ceil(data.total / SEARCH_PAGE_SIZE).toLocaleString("vi-VN")}</span><Button variant="outline" size="icon" disabled={request.page * SEARCH_PAGE_SIZE >= data.total} onClick={() => setRequest((value) => ({ ...value, page: value.page + 1 }))} aria-label="Kết quả tiếp theo"><ChevronRight /></Button></div>}
        </>}
      </div>
    </div>
  </section>;
}