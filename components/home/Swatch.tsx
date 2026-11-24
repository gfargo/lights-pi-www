import Link from "next/link";
import type { ReactNode } from "react";

/** A scene swatch: one cell per fixture, 4px apart, square corners. */
export function Swatch({
  cells,
  className = "",
  label,
}: {
  cells: string[];
  className?: string;
  label?: string;
}) {
  return (
    <div className={`swatch ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {cells.map((c, i) => (
        <span key={i} style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/** The primary action: a warm block standing on an eight-cell foot. */
export function SwatchButton({
  href,
  children,
  onClick,
  external = false,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  external?: boolean;
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
      <span className="foot swatch" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} />
        ))}
      </span>
    </>
  );
  return external ? (
    <a href={href} onClick={onClick} className="btn-swatch" target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} onClick={onClick} className="btn-swatch">
      {inner}
    </Link>
  );
}
