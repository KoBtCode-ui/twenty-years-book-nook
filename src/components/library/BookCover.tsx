import type { Book } from "@/lib/books";
import { cn } from "@/lib/utils";

/** Flat front cover for a generated-art book: painting + typeset title. */
export function BookCover({ book, size = "md", className }: { book: Book; size?: "sm" | "md" | "lg"; className?: string }) {
  const title = size === "sm" ? "text-[0.95rem]" : size === "lg" ? "text-3xl" : "text-xl";
  return (
    <div className={cn(`tone-${book.tone} relative h-full w-full overflow-hidden bg-[var(--tone-bg)]`, className)}>
      <img src={book.art} alt="" loading="lazy" width={768} height={1152} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="cover-shade absolute inset-0" />
      <div className="absolute inset-x-0 top-0 p-[8%] text-[var(--tone-fg)]">
        <p className="eyebrow !text-[0.5rem] !tracking-[0.3em] opacity-80">{book.author}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-[8%] text-[var(--tone-fg)]">
        <div className="mb-2 h-px w-8 bg-[var(--tone-accent)]" />
        <h3 className={cn("font-display-tight leading-[0.95] font-medium", title)}>{book.title}</h3>
        <p className="mt-1.5 text-[0.55rem] tracking-[0.25em] uppercase opacity-75">Góc Thư Viện 11A5</p>
      </div>
    </div>
  );
}
