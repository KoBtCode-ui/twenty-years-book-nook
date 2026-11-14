import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  tone?: string;
  width?: number;
  height?: number;
  depth?: number;
  /** Resting rotation in degrees. */
  rest?: { x: number; y: number };
  /** How strongly the book follows the pointer. */
  tilt?: number;
  className?: string;
  onClick?: () => void;
  label?: string;
};

/** A CSS-3D book (cover, spine, page block, top) that tilts toward the pointer. */
export function Book3D({ children, tone, width = 220, height = 330, depth = 36, rest = { x: 6, y: -26 }, tilt = 22, className, onClick, label }: Props) {
  const inner = useRef<HTMLDivElement>(null);

  const setRot = (x: number, y: number, gloss: number) => {
    const el = inner.current;
    if (!el) return;
    el.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    el.style.setProperty("--gloss", `${gloss}%`);
  };

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot(rest.x - py * tilt * 0.6, rest.y * 0.25 + px * tilt * 1.4, 100 - (px + 0.5) * 100);
  };

  const style = { "--w": `${width}px`, "--h": `${height}px`, "--d": `${depth}px` } as CSSProperties;
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      aria-label={label}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={() => setRot(rest.x, rest.y, 100)}
      className={cn("book3d group block cursor-pointer outline-none", tone && `tone-${tone}`, className)}
      style={style}
    >
      <div ref={inner} className="book3d-inner" style={{ transform: `rotateX(${rest.x}deg) rotateY(${rest.y}deg)` }}>
        <div className="book3d-shadow" />
        <div className="book3d-face book3d-back" />
        <div className="book3d-face book3d-spine" />
        <div className="book3d-face book3d-pages" />
        <div className="book3d-face book3d-top" />
        <div className="book3d-face book3d-front shadow-book">
          {children}
          <div className="book3d-gloss" />
        </div>
      </div>
    </Tag>
  );
}
