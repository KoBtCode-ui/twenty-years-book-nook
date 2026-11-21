import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Library, Search } from "lucide-react";

import coverAsset from "@/assets/mai-mai-tuoi-20-cover.jpg";
import storyPhoto from "@/assets/mai-mai-tuoi-20-photo.jpg";
import libraryBg from "@/assets/library-bg.jpg";
import p1 from "@/assets/pages/trang-1.jpg";
import p2 from "@/assets/pages/trang-2.jpg";
import p3 from "@/assets/pages/trang-3.jpg";
import p4 from "@/assets/pages/trang-4.jpg";
import p5 from "@/assets/pages/trang-5.jpg";
import p6 from "@/assets/pages/trang-6.jpg";
import p7 from "@/assets/pages/trang-7.jpg";

import { Book3D } from "@/components/library/Book3D";
import { BookCover } from "@/components/library/BookCover";
import { BookDialog } from "@/components/library/BookDialog";
import { DustParticles } from "@/components/library/DustParticles";
import { FlipBook, type FlipPage } from "@/components/library/FlipBook";
import { FeaturedBooks } from "@/components/library/FeaturedBooks";
import { OnlineSearch } from "@/components/library/OnlineSearch";
import { RingCarousel } from "@/components/library/RingCarousel";
import { useReveal } from "@/components/library/useReveal";
import { GENRES, companions, filterBooks, shelfBooks, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Góc Thư Viện 11A5 · Sách nổi bật & tìm sách trực tuyến" },
      { name: "description", content: "Đọc thử Mãi mãi tuổi hai mươi, khám phá 6 sách nổi bật, tủ sách tuổi trẻ thời chiến và tìm sách trực tuyến với Open Library." },
      { property: "og:title", content: "Góc Thư Viện 11A5" },
      { property: "og:description", content: "Đọc thử nhật ký, khám phá sách nổi bật và tìm sách trực tuyến cùng lớp 11A5." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const KIM_DONG = "https://nxbkimdong.com.vn/mai-mai-tuoi-hai-muoi-nhat-ky-thoi-chien-viet-nam";

function PageImg({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />;
}

function Index() {
  useReveal();
  const [reading, setReading] = useState(false);
  const [picked, setPicked] = useState<Book | null>(null);
  const [genre, setGenre] = useState<string>("Tất cả");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => filterBooks(shelfBooks, genre, query), [genre, query]);

  const pages: FlipPage[] = useMemo(
    () => [
      { key: "cover", content: <PageImg src={coverAsset} alt="Bìa sách Mãi mãi tuổi hai mươi" /> },
      { key: "t1", content: <PageImg src={p1} alt="Trang tên sách" /> },
      { key: "t2", content: <PageImg src={p2} alt="Chân dung liệt sĩ Nguyễn Văn Thạc" /> },
      { key: "t3", content: <PageImg src={p3} alt="Trang bìa lót" /> },
      {
        key: "stamp",
        content: (
          <div className="paper-grain flex h-full flex-col items-center justify-center gap-3 bg-paper p-6 text-center text-foreground">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-accent/60 text-accent">
              <Library className="h-8 w-8" />
            </div>
            <p className="eyebrow text-accent">Góc Thư Viện 11A5</p>
            <p className="font-script text-2xl text-primary">Sách đọc thử</p>
          </div>
        ),
      },
      { key: "t4", content: <PageImg src={p4} alt="Lời nói đầu" /> },
      { key: "t5", content: <PageImg src={p5} alt="Trang 6" /> },
      { key: "t6", content: <PageImg src={p6} alt="Trang 7" /> },
      { key: "t7", content: <PageImg src={p7} alt="Trang 8" /> },
      {
        key: "end",
        content: (
          <div className="paper-grain flex h-full flex-col items-center justify-center gap-4 bg-paper p-8 text-center text-foreground">
            <p className="eyebrow text-muted-foreground">Hết phần đọc thử</p>
            <p className="font-display-tight text-3xl leading-tight">Hành trình còn tiếp trong từng trang nhật ký…</p>
            <a href={KIM_DONG} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground">
              Xem sách tại NXB Kim Đồng <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative isolate hero-library overflow-hidden bg-night text-night-foreground">
        <img src={libraryBg} alt="" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover opacity-55" />
        <div className="bg-night-gradient absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute -top-20 right-[20%] -z-10 h-[140%] w-40 animate-rays bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-[38%] -z-10 h-[140%] w-24 animate-rays bg-gold/10 blur-3xl [animation-delay:-4s]" />
        <DustParticles />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-night-foreground/15 px-6 py-5">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Library className="h-4 w-4" />
            </span>
            <span className="eyebrow !text-[0.72rem] text-night-foreground">Góc Thư Viện 11A5</span>
          </a>
          <span className="eyebrow hidden text-night-foreground/55 md:block">Một trang sách, một thời tuổi trẻ</span>
          <a href="#ke-sach" className="flex items-center gap-2 text-sm text-night-foreground/85 transition hover:text-gold">
            Kệ sách <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <FeaturedBooks onRead={() => setReading(true)} onPick={setPicked} />

        <a href="#cau-chuyen" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-night-foreground/60 transition hover:text-gold" aria-label="Cuộn xuống">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...shelfBooks, ...shelfBooks].map((b, i) => (
            <span key={i} className="font-display-tight flex items-center gap-10 text-2xl italic">
              {b.title} <span className="text-gold not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ================= STORY ================= */}
      <section id="cau-chuyen" className="paper-grain">
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div className="reveal group relative" style={{ perspective: "1400px" }}>
            <div className="relative overflow-hidden rounded-sm shadow-book transition duration-700 [transform:rotateY(8deg)_rotateX(3deg)] group-hover:[transform:rotateY(0)_rotateX(0)]">
              <img src={storyPhoto} alt="Ảnh chụp cuốn Mãi mãi tuổi hai mươi ấn bản NXB Kim Đồng trên kệ gỗ" loading="lazy" className="aspect-[3/2] w-full object-cover transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
              <p className="eyebrow absolute bottom-5 left-5 text-gold">Ấn bản mới · Nhà xuất bản Kim Đồng</p>
            </div>
            <div className="absolute -top-5 -left-5 -z-10 h-full w-full rounded-sm border border-accent/40" />
          </div>

          <div className="reveal [--delay:150ms]">
            <p className="flex items-baseline gap-4">
              <span className="font-display-tight text-6xl text-accent">01</span>
              <span className="eyebrow text-muted-foreground">Một cuốn nhật ký, một thời tuổi trẻ</span>
            </p>
            <h2 className="font-display-tight mt-6 text-5xl leading-[0.95] sm:text-6xl">
              Từng trang viết <em className="text-primary">chân thực</em> của người lính trẻ
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
              Từ ngày đầu nhập ngũ đến chặng đường hướng về Quảng Trị, từng trang viết chân thực đưa ta đến gần hơn với đời sống và tâm tình của một người lính trẻ.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["Thời gian ghi chép", "1971 — 1972"],
                ["Ấn bản Kim Đồng", "348 trang"],
                ["Nhà xuất bản", "NXB Kim Đồng"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow !text-[0.58rem] text-muted-foreground">{k}</dt>
                  <dd className="font-display-tight mt-2 text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
            <button onClick={() => setReading(true)} className="mt-10 inline-flex items-center gap-3 rounded-sm bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition hover:brightness-110">
              <BookOpen className="h-4 w-4" /> Lật xem trang đầu sách
            </button>
          </div>
        </div>
      </section>

      {/* ================= COMPANIONS ================= */}
      <section className="paper-grain border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow flex items-center gap-3 text-accent">
                <span className="h-px w-8 bg-accent" /> Đọc thêm
              </p>
              <h2 className="font-display-tight mt-4 text-5xl sm:text-6xl">
                Những trang sách <em className="text-primary">bên cạnh</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Nhật ký, những bức thư và những câu chuyện còn vang lại từ một thời đã qua.</p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {companions.map((b, i) => (
              <article key={b.id} className="reveal group" style={{ ["--delay" as string]: `${i * 120}ms` }}>
                <button onClick={() => setPicked(b)} className={`tone-${b.tone} relative block aspect-[4/5] w-full overflow-hidden rounded-sm bg-[var(--tone-bg)] text-left shadow-card`}>
                  <img src={b.art} alt="" loading="lazy" width={768} height={1152} className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-1000 group-hover:scale-110 group-hover:opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--tone-bg)] via-transparent to-transparent" />
                  <span className="font-display-tight absolute top-5 left-5 text-5xl text-[var(--tone-fg)]">0{i + 2}</span>
                  <div className={cn("absolute right-6 bottom-6 left-1/2 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100", b.cover ? "opacity-100" : "translate-y-6 opacity-0")} style={{ perspective: "800px" }}>
                    <div className={cn("ml-auto aspect-[2/3] overflow-hidden rounded-r-sm shadow-book transition duration-700 [transform:rotateY(-24deg)] group-hover:[transform:rotateY(-8deg)_scale(1.05)]", b.cover ? "w-36" : "w-28")}>
                      <BookCover book={b} size="sm" />
                    </div>
                  </div>
                </button>
                <div className="mt-5">
                  <p className="eyebrow !text-[0.6rem] text-muted-foreground">{b.tag}</p>
                  <h3 className="font-display-tight mt-2 text-3xl leading-tight">
                    <a href={b.link} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 transition hover:text-accent">
                      {b.title} <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
                    </a>
                  </h3>
                  <p className="mt-1 text-sm font-medium">{b.author}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RING ================= */}
      <section className="relative overflow-hidden bg-night py-24 text-night-foreground">
        <img src={libraryBg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm" />
        <div className="bg-night-gradient absolute inset-0" />
        <DustParticles count={40} />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="reveal text-center">
            <p className="eyebrow text-gold">20 cuốn sách cùng chủ đề</p>
            <h2 className="font-display-tight mt-4 text-5xl sm:text-7xl">
              Vòng xoay <em className="text-gold-shimmer">ký ức</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-night-foreground/65">Tuổi trẻ, chiến tranh và khát vọng sống đẹp — những trang sách đã đi cùng bao thế hệ học trò.</p>
          </div>
          <div className="reveal mt-10 [--delay:150ms]">
            <RingCarousel books={shelfBooks} onPick={setPicked} />
          </div>
        </div>
      </section>

      {/* ================= SHELF ================= */}
      <section id="ke-sach" className="paper-grain">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow flex items-center gap-3 text-accent">
                <span className="h-px w-8 bg-accent" /> Kệ sách lớp 11A5
              </p>
              <h2 className="font-display-tight mt-4 text-5xl sm:text-6xl">
                Chọn một cuốn, <em className="text-primary">mở một thời</em>
              </h2>
            </div>
            <label className="flex w-full items-center gap-2 rounded-sm border border-input bg-card px-4 py-3 sm:w-72">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm tên sách, tác giả…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </label>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  genre === g ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary hover:text-primary",
                )}
              >
                {g}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-16 text-center text-muted-foreground">Chưa tìm thấy cuốn sách nào phù hợp.</p>
          ) : (
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
              {visible.map((b, i) => (
                <div key={b.id} className="reveal is-visible flex flex-col" style={{ animation: `rise 0.8s ${(i % 5) * 80}ms both cubic-bezier(0.2,0.8,0.2,1)` }}>
                  <div className="flex justify-center pt-4">
                    <Book3D tone={b.tone} width={148} height={222} depth={24} rest={{ x: 2, y: -18 }} tilt={30} onClick={() => setPicked(b)} label={`Xem sách ${b.title}`} className="transition duration-500 hover:-translate-y-3">
                      <BookCover book={b} size="sm" />
                    </Book3D>
                  </div>
                  <div className="shelf-plank mt-5" />
                  <div className="mt-3 px-1">
                    <p className="eyebrow !text-[0.55rem] text-muted-foreground">{b.tag}</p>
                    <p className="font-display-tight mt-1 text-xl leading-tight">{b.title}</p>
                    <p className="text-xs text-muted-foreground">{b.author}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <OnlineSearch />

      {/* ================= FOOTER ================= */}
      <footer className="bg-night text-night-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-10">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold">
              <Library className="h-4 w-4" />
            </span>
            <span className="eyebrow !text-[0.72rem]">Góc Thư Viện 11A5</span>
          </div>
          <p className="eyebrow text-night-foreground/50">Những trang sách gìn giữ ký ức</p>
          <a href={KIM_DONG} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-night-foreground/80 hover:text-gold">
            Tư liệu sách: NXB Kim Đồng <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </footer>

      <FlipBook
        open={reading}
        onOpenChange={setReading}
        title="Mãi mãi tuổi hai mươi"
        pages={pages}
        insideCover={<div className="tone-forest paper-grain h-full w-full bg-[var(--tone-bg)]" />}
        backCover={
          <div className="tone-forest flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--tone-bg)] text-[var(--tone-fg)]">
            <Library className="h-8 w-8 text-[var(--tone-accent)]" />
            <p className="eyebrow">Góc Thư Viện 11A5</p>
          </div>
        }
      />
      <BookDialog book={picked} onClose={() => setPicked(null)} />
    </div>
  );
}
