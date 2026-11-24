import type { ReactNode } from "react";
import { SCENES } from "@/lib/scenes";
import { Swatch } from "@/components/home/Swatch";

/**
 * The opening of every interior page: a strip of one scene's swatch at the
 * top edge (each page wears a different scene), the page's name in plain
 * sentence case, one headline at display size and one lead sentence. An
 * optional `aside` sits at the right margin on wide screens (a date, a
 * count, a link) in the text face, never in small capitals.
 */
export function PageHead({
  label,
  title,
  lead,
  aside,
  scene = 0,
  children,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  /** Index into SCENES; pick a different one per page. */
  scene?: number;
  children?: ReactNode;
}) {
  const s = SCENES[scene % SCENES.length];
  return (
    <header className="pt-[clamp(104px,12vw,168px)] pb-[clamp(48px,6vw,88px)]">
      <Swatch cells={s.cells} className="h-3 w-full max-w-[22rem] !gap-[3px]" />
      <p className="mt-8 text-paper font-medium" style={{ fontSize: "var(--step-body)" }}>
        {label}
      </p>
      <div className="mt-3 grid gap-x-10 gap-y-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h1
            className="font-display text-paper max-w-[16ch]"
            style={{ fontSize: "var(--step-display)", textWrap: "balance" }}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className="mt-8 max-w-[40rem] text-paper"
              style={{ fontSize: "var(--step-lead)", lineHeight: 1.45 }}
            >
              {lead}
            </p>
          ) : null}
        </div>
        {aside ? (
          <div className="text-paper/80 lg:text-right" style={{ fontSize: "var(--step-body)" }}>
            {aside}
          </div>
        ) : null}
      </div>
      {children}
    </header>
  );
}

/** A section heading inside an interior page, in the text face, sentence case. */
export function SectionHead({ title, note, id }: { title: ReactNode; note?: ReactNode; id?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mb-8">
      <h2 id={id} className="font-display text-paper" style={{ fontSize: "var(--step-head)" }}>
        {title}
      </h2>
      {note ? (
        <p className="text-paper/80" style={{ fontSize: "var(--step-body)" }}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
