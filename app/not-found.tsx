import Link from "next/link";
import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { SwatchButton } from "@/components/home/Swatch";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Lights Pi",
  description: "The page you're looking for doesn't exist. Return to the Lights Pi homepage, the quick start or the docs.",
};

export default function NotFound() {
  return (
    <div className="min-h-[100svh] bg-ink px-[var(--gutter)] pb-[clamp(96px,12vw,180px)]">
      <PageHead
        scene={4}
        label="404"
        title="This page is dark."
        lead="Nothing is patched to this address. It may have moved, or the link may be wrong."
      >
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
          <SwatchButton href="/quick-start">Start the build</SwatchButton>
          <Link href="/hardware" className="link-plain">
            Hardware
          </Link>
          <Link href="/docs" className="link-plain">
            Docs
          </Link>
          <Link href="/" className="link-plain">
            Home
          </Link>
        </div>
      </PageHead>
    </div>
  );
}
