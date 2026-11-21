import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredBooks, type Book } from "@/lib/books";
import { Book3D } from "./Book3D";
import { BookCover } from "./BookCover";

export function FeaturedBooks({ onRead, onPick }: { onRead: () => void; onPick: (book: Book) => void }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const book = featuredBooks[index];
  useEffect(() => {
    setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  useEffect(() => {
    if (!playing || hovered) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % featuredBooks.length), 9000);
    return () => window.clearInterval(timer);
  }, [playing, hovered]);
  if (!book) return null;
  const open = () => book.id === "mai-mai-tuoi-hai-muoi" ? onRead() : onPick(book);
  const change = (direction: number) => {
    setIndex((value) => (value + direction + featuredBooks.length) % featuredBooks.length);
    setPlaying(false);
  };
  return (
    <div className="featured-showcase relative z-10 mx-auto max-w-7xl px-6 pt-10 pb-16" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocusCapture={() => setPlaying(false)}>
      <p className="font-display-tight mb-8 text-3xl text-night-foreground">Góc Thư Viện 11A5</p>
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div key={`text-${book.id}`} className="featured-enter min-w-0">
          <p className="eyebrow text-gold">Sách nổi bật · {String(index + 1).padStart(2, "0")} / {String(featuredBooks.length).padStart(2, "0")}</p>
          <h1 className="font-display-tight mt-5 max-w-xl text-5xl leading-[1.06] font-light sm:text-6xl lg:text-7xl">{book.title}</h1>
          <p className="mt-5 text-lg font-medium text-gold">{book.author}</p>
          <p className="mt-4 max-w-lg leading-relaxed text-night-foreground/75">{book.blurb}</p>
          <p className="eyebrow mt-6 text-night-foreground/55">{book.tag}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={open} size="lg" className="h-auto min-h-12 whitespace-normal bg-gold px-5 text-gold-foreground hover:bg-gold/90"><BookOpen />{index === 0 ? "Đọc thử trang đầu" : "Khám phá cuốn sách"}</Button>
            {book.link && <Button asChild variant="ghost" className="h-auto min-h-12 whitespace-normal border border-night-foreground/25 text-night-foreground hover:bg-night-foreground/10 hover:text-gold"><a href={book.link} target="_blank" rel="noreferrer">{index === 0 ? "NXB Kim Đồng" : "Tìm đọc"}<ArrowUpRight /></a></Button>}
          </div>
        </div>
        <div key={`cover-${book.id}`} className="featured-book-enter flex justify-center py-5">
          <div className="featured-float">
            <Book3D tone={book.tone} width={240} height={360} depth={40} rest={{ x: 5, y: -25 }} tilt={32} onClick={open} label={index === 0 ? "Mở sách Mãi mãi tuổi hai mươi để đọc thử" : `Mở sách nổi bật ${book.title}`}><BookCover book={book} size="lg" /></Book3D>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-night-foreground/20 pt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="eyebrow text-night-foreground/65">Những cuốn sách của một thời tuổi trẻ</p>
          <div className="flex shrink-0 gap-1">
            <Button variant="ghost" size="icon" className="text-night-foreground hover:bg-night-foreground/10 hover:text-gold" onClick={() => change(-1)} aria-label="Sách nổi bật trước" title="Sách nổi bật trước"><ChevronLeft /></Button>
            <Button variant="ghost" size="icon" className="text-night-foreground hover:bg-night-foreground/10 hover:text-gold" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Dừng chuyển sách" : "Tự động chuyển sách"} title={playing ? "Dừng chuyển sách" : "Tự động chuyển sách"}>{playing ? <Pause /> : <Play />}</Button>
            <Button variant="ghost" size="icon" className="text-night-foreground hover:bg-night-foreground/10 hover:text-gold" onClick={() => change(1)} aria-label="Sách nổi bật tiếp theo" title="Sách nổi bật tiếp theo"><ChevronRight /></Button>
          </div>
        </div>
        <div className="featured-thumbnails flex gap-3 overflow-x-auto pb-3">
          {featuredBooks.map((item, i) => <Button key={item.id} variant="ghost" aria-label={`Chọn sách nổi bật ${item.title}`} aria-pressed={i === index} onClick={() => { setIndex(i); setPlaying(false); }} className={`featured-thumbnail h-auto w-48 shrink-0 justify-start whitespace-normal rounded-sm border p-2 text-left text-night-foreground hover:bg-night-foreground/10 hover:text-night-foreground ${i === index ? "border-gold bg-night-foreground/10" : "border-night-foreground/15"}`}>
            <img src={item.cover} alt="" className="h-16 w-11 shrink-0 object-cover" />
            <span className="min-w-0 text-xs leading-relaxed">{item.title}</span>
          </Button>)}
        </div>
      </div>
    </div>
  );
}