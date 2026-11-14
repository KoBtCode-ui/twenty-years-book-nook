import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export type FlipPage = { key: string; content: ReactNode; label?: string };

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  /** Pages in reading order; index 0 is the front cover. */
  pages: FlipPage[];
  /** Content for the inside of the front cover (left page of the first open spread). */
  insideCover: ReactNode;
  /** Outside of the back cover, shown after the last page is turned. */
  backCover: ReactNode;
};

/**
 * A 3D page-turning book. Desktop shows two-page spreads, phones one page at a time.
 * Each "leaf" is a sheet with a front (right-hand page) and a back (next left-hand page).
 */
export function FlipBook({ open, onOpenChange, title, pages, insideCover, backCover }: Props) {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [turning, setTurning] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  // Spread mode leaves: leaf i = { front: pages[i*2], back: pages[i*2+1] or insideCover for i=0 }
  const leaves = useMemo(() => {
    if (isMobile) return pages.map((p) => ({ front: p.content, back: null as ReactNode, key: p.key }));
    const out: { front: ReactNode; back: ReactNode; key: string }[] = [];
    // Sequence of faces after the cover: [insideCover, p1, p2, ...]
    const faces: ReactNode[] = [pages[0]?.content, insideCover, ...pages.slice(1).map((p) => p.content)];
    if (faces.length % 2 === 1) faces.push(backCover);
    for (let i = 0; i < faces.length; i += 2) out.push({ front: faces[i], back: faces[i + 1], key: `leaf-${i}` });
    return out;
  }, [isMobile, pages, insideCover, backCover]);

  const max = isMobile ? leaves.length - 1 : leaves.length;
  useEffect(() => { if (!open) setIndex(0); }, [open]);
  useEffect(() => { setIndex((i) => Math.min(i, max)); }, [max]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const n = Math.max(0, Math.min(max, i + dir));
        if (n !== i) {
          const leaf = dir === 1 ? i : n;
          setTurning(leaf);
          window.setTimeout(() => setTurning(null), 1000);
        }
        return n;
      });
    },
    [max],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const closed = !isMobile && index === 0;
  const atEnd = index === max;
  const pageLabel = isMobile
    ? `Trang ${index + 1} / ${leaves.length}`
    : index === 0
      ? "Bìa trước"
      : atEnd
        ? "Bìa sau"
        : `Mở trang ${index} / ${max - 1}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[100dvh] max-h-none w-screen max-w-none flex-col items-center justify-center gap-6 rounded-none border-0 bg-night/95 p-4 text-night-foreground backdrop-blur-md sm:max-w-none [&>button]:hidden">
        <DialogTitle className="sr-only">{title} — đọc thử</DialogTitle>
        <DialogDescription className="sr-only">Lật từng trang để xem trước những trang đầu của sách.</DialogDescription>

        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--gradient-lamp)" }} />

        <div className="relative z-10 flex w-full max-w-6xl items-center justify-between">
          <div>
            <p className="eyebrow text-gold">Đọc thử · Góc Thư Viện 11A5</p>
            <p className="font-display-tight mt-1 text-2xl sm:text-3xl">{title}</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="rounded-full border border-night-foreground/25 p-2.5 transition hover:bg-night-foreground/10" aria-label="Đóng">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="flip-stage relative z-10 flex flex-1 items-center justify-center"
          onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div
            className="flip-book"
            style={
              isMobile
                ? { width: "min(82vw, 52vh)", aspectRatio: "0.63" }
                : { width: "min(84vw, 126vh)", maxWidth: "980px", aspectRatio: "1.26", transform: `translateX(${closed ? "-25%" : atEnd ? "25%" : "0"})` }
            }
          >
            {/* Spine shadow */}
            {!isMobile && !closed && !atEnd && <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[999] w-10 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,oklch(0_0_0/0.25)_50%,transparent)]" />}

            {leaves.map((leaf, i) => {
              const flipped = i < index;
              const z = flipped ? i + 1 : leaves.length - i;
              return (
                <div
                  key={leaf.key}
                  className={cn("flip-leaf", (i === index || i === index - 1 || turning === i) && "shadow-book", flipped && "is-flipped", turning === i && "is-turning")}
                  style={{
                    zIndex: turning === i ? 500 : z,
                    left: isMobile ? 0 : "50%",
                    width: isMobile ? "100%" : "50%",
                    opacity: isMobile && flipped ? 0 : 1,
                    transition: isMobile ? "transform 0.9s cubic-bezier(0.645,0.045,0.355,1), opacity 0.4s 0.6s" : undefined,
                  }}
                  onClick={() => go(flipped ? -1 : 1)}
                >
                  <div className="flip-face flip-face-front rounded-r-md">{leaf.front}</div>
                  <div className="flip-face flip-face-back rounded-l-md">{leaf.back}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <button onClick={() => go(-1)} disabled={index === 0} className="rounded-full border border-night-foreground/25 p-3 transition hover:bg-night-foreground/10 disabled:opacity-30" aria-label="Trang trước">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="eyebrow min-w-36 text-center text-night-foreground/80">{pageLabel}</span>
          <button onClick={() => go(1)} disabled={atEnd} className="rounded-full border border-gold/60 bg-gold p-3 text-gold-foreground transition hover:brightness-110 disabled:opacity-30" aria-label="Trang sau">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="relative z-10 -mt-3 text-xs text-night-foreground/50">Nhấn vào trang, vuốt hoặc dùng phím ← → để lật</p>
      </DialogContent>
    </Dialog>
  );
}
