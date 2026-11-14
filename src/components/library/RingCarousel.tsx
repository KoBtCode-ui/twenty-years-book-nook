import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Book } from "@/lib/books";
import { BookCover } from "./BookCover";

/** Books arranged on a slowly spinning 3D cylinder; drag or use arrows to spin. */
export function RingCarousel({ books, onPick }: { books: Book[]; onPick: (b: Book) => void }) {
  const ring = useRef<HTMLDivElement>(null);
  const state = useRef({ angle: 0, vel: 0.06, dragging: false, lastX: 0, moved: 0, hover: false, target: null as number | null });
  const n = books.length;
  const step = 360 / n;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      const s = state.current;
      if (s.target != null) {
        const d = s.target - s.angle;
        s.angle += d * 0.08;
        if (Math.abs(d) < 0.05) s.target = null;
      } else if (!s.dragging) {
        const base = s.hover || reduce ? 0 : -0.06;
        s.vel += (base - s.vel) * 0.03;
        s.angle += s.vel;
      }
      if (ring.current) ring.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${s.angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const spin = (dir: 1 | -1) => {
    const s = state.current;
    const snapped = Math.round(s.angle / step) * step;
    s.target = snapped + dir * step;
  };

  return (
    <div className="relative">
      <div
        className="ring-stage relative mx-auto h-[360px] w-full select-none sm:h-[440px] [--iw:120px] [--ih:180px] [--r:400px] sm:[--iw:150px] sm:[--ih:225px] sm:[--r:520px]"
        onPointerEnter={() => (state.current.hover = true)}
        onPointerLeave={() => { state.current.hover = false; state.current.dragging = false; }}
        onPointerDown={(e) => {
          const s = state.current;
          s.dragging = true; s.lastX = e.clientX; s.moved = 0; s.target = null;
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.dragging) return;
          const dx = e.clientX - s.lastX;
          s.lastX = e.clientX; s.moved += Math.abs(dx);
          s.angle += dx * 0.25; s.vel = dx * 0.25;
        }}
        onPointerUp={() => (state.current.dragging = false)}
        style={{ touchAction: "pan-y" }}
      >
        <div ref={ring} className="ring absolute left-1/2 top-10 h-[var(--ih)] w-0">
          {books.map((b, i) => (
            <button
              key={b.id}
              type="button"
              onClick={() => state.current.moved < 6 && onPick(b)}
              className="ring-item group h-[var(--ih)] w-[var(--iw)] -translate-x-1/2"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
              aria-label={`Xem sách ${b.title}`}
            >
              <div className="h-full w-full overflow-hidden rounded-r-md shadow-book transition duration-500 group-hover:-translate-y-4 group-hover:scale-105">
                <BookCover book={b} size="sm" />
              </div>
              <div className="mx-auto mt-3 h-3 w-4/5 rounded-full bg-night/30 blur-md" />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto h-24 w-3/4 rounded-[50%] bg-gold/20 blur-3xl" />
      </div>
      <div className="mt-2 flex items-center justify-center gap-4">
        <button onClick={() => spin(1)} className="rounded-full border border-night-foreground/25 p-3 text-night-foreground transition hover:bg-night-foreground/10" aria-label="Xoay trái">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="eyebrow text-night-foreground/60">Kéo để xoay · Nhấn để xem</span>
        <button onClick={() => spin(-1)} className="rounded-full border border-night-foreground/25 p-3 text-night-foreground transition hover:bg-night-foreground/10" aria-label="Xoay phải">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
