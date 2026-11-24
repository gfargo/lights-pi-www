"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PageHead } from "@/components/PageHead";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[100svh] bg-ink px-[var(--gutter)] pb-[clamp(96px,12vw,180px)]">
      <PageHead
        scene={5}
        label="Error"
        title="Something tripped the breaker."
        lead="This page failed to load. Try it again; if it keeps happening, tell us on GitHub."
      >
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <button type="button" onClick={reset} className="btn-swatch cursor-pointer">
            <span>Try again</span>
            <span aria-hidden="true">↻</span>
            <span className="foot swatch" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} />
              ))}
            </span>
          </button>
          <a
            href="https://github.com/gfargo/lights-pi/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="link-plain"
          >
            Report it on GitHub
          </a>
          <Link href="/" className="link-plain">
            Home
          </Link>
        </div>
        {error.digest ? (
          <p className="mt-10 text-paper/80" style={{ fontSize: "var(--step-body)" }}>
            Error ID {error.digest}. Include it in the report.
          </p>
        ) : null}
      </PageHead>
    </div>
  );
}
