import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Book } from "@/lib/books";
import { Book3D } from "./Book3D";
import { BookCover } from "./BookCover";

export function BookDialog({ book, onClose }: { book: Book | null; onClose: () => void }) {
  return (
    <Dialog open={!!book} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="paper-grain max-w-3xl overflow-hidden border-border bg-card p-0 sm:rounded-md">
        {book && (
          <div className={`tone-${book.tone} grid gap-0 sm:grid-cols-[1fr_1.1fr]`}>
            <div className="relative flex items-center justify-center overflow-hidden bg-[var(--tone-bg)] p-10">
              <img src={book.art} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl" />
              <div className="relative animate-float">
                <Book3D tone={book.tone} width={190} height={285} depth={30} rest={{ x: 4, y: -22 }}>
                  <BookCover book={book} />
                </Book3D>
              </div>
            </div>
            <div className="relative flex flex-col justify-center gap-4 p-8">
              <p className="eyebrow text-accent">{book.tag}</p>
              <DialogTitle className="font-display-tight text-4xl leading-none font-normal">{book.title}</DialogTitle>
              <p className="text-sm font-semibold">{book.author}</p>
              <DialogDescription className="text-base leading-relaxed text-muted-foreground">{book.blurb}</DialogDescription>
              <p className="eyebrow text-muted-foreground">Thể loại · {book.genre}</p>
              {book.link && (
                <a href={book.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex w-fit items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110">
                  Tìm đọc cuốn sách <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
