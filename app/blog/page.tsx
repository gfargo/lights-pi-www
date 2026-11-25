import Link from "next/link";
import { PageHead, SectionHead } from "@/components/PageHead";
import { getAllPosts, type BlogPost } from "@/lib/github";

export const metadata = {
  title: "Notes — Lights Pi",
  description:
    "Release notes, technical writing, and community posts from the Lights Pi project.",
  openGraph: {
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    title: "Notes — Lights Pi",
    description:
      "Release notes, technical writing, and community posts from the Lights Pi project.",
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function externalHref(post: BlogPost): string | null {
  if (post.version) {
    return `https://github.com/gfargo/lights-pi/releases/tag/${post.version}`;
  }
  return null;
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={1}
        label="Notes"
        title="Field notes and the release log."
        lead="Release notes, technical writing and things found on stage, from the Lights Pi project."
        aside={
          <a
            href="https://github.com/gfargo/lights-pi/releases.atom"
            target="_blank"
            rel="noopener noreferrer"
            className="link-plain"
          >
            Subscribe by RSS
          </a>
        }
      >
        {posts.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-paper/80" style={body} aria-label="Posts by category">
            <li className="text-paper font-medium">
              All <span className="tabular-nums">{posts.length}</span>
            </li>
            {Object.entries(counts).map(([cat, n]) => (
              <li key={cat}>
                {cat} <span className="tabular-nums">{n}</span>
              </li>
            ))}
          </ul>
        )}
      </PageHead>

      {featured && <FeaturedPost post={featured} />}

      {rest.length > 0 ? (
        <section className="mt-[clamp(56px,6vw,96px)]">
          <SectionHead title="Earlier" note={`${rest.length} ${rest.length === 1 ? "entry" : "entries"}`} />
          <ol className="border-t border-rule">
            {rest.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </ol>
        </section>
      ) : (
        <section className="mt-16 border-t border-rule pt-12">
          <p className="text-paper max-w-[42rem]" style={body}>
            No earlier entries yet. Every Lights Pi release will land here; subscribe by RSS to catch them.
          </p>
        </section>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────── presentational ── */

const body = { fontSize: "var(--step-body)", lineHeight: 1.55 } as const;

function FeaturedPost({ post }: { post: BlogPost }) {
  const href = externalHref(post) ?? `/blog/${post.slug}`;
  const external = !!externalHref(post);
  const dateLabel = formatDate(post.date);

  return (
    <article className="grid lg:grid-cols-[14rem_1fr] gap-x-10 gap-y-4 items-start border-t border-rule pt-10">
      <div className="text-paper/80 space-y-1" style={body}>
        <p className="text-amber-tungsten font-medium">Featured, {post.category.toLowerCase()}</p>
        <p>{dateLabel}</p>
        <p>{post.readTime}</p>
      </div>

      <div>
        <h2 className="font-display text-paper" style={{ fontSize: "var(--step-head)", lineHeight: 1.02, textWrap: "balance" }}>
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-amber-tungsten transition-colors">
              {post.title} <span aria-hidden className="text-paper/70">↗</span>
            </a>
          ) : (
            <Link href={href} className="hover:text-amber-tungsten transition-colors">
              {post.title}
            </Link>
          )}
        </h2>
        <p className="mt-6 text-paper max-w-[42rem]" style={{ fontSize: "var(--step-lead)", lineHeight: 1.45 }}>
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2 text-paper/80" style={body} aria-label="Tags">
            {post.tags.map((tag) => (
              <li key={tag} className="border border-rule px-3 py-1">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function PostRow({ post }: { post: BlogPost }) {
  const href = externalHref(post) ?? `/blog/${post.slug}`;
  const external = !!externalHref(post);
  const dateLabel = formatDate(post.date);

  const inner = (
    <div className="grid lg:grid-cols-[14rem_1fr_auto] gap-x-10 gap-y-2 items-baseline" style={body}>
      <div className="text-paper/80 tabular-nums">
        <span className="text-paper font-medium">{post.category}</span>, {dateLabel}
      </div>
      <div>
        <h3
          className="font-display text-paper group-hover:text-amber-tungsten transition-colors"
          style={{ fontSize: "var(--step-lead)", lineHeight: 1.15 }}
        >
          {post.title}
        </h3>
        {post.excerpt ? <p className="mt-2 text-paper max-w-[42rem]">{post.excerpt}</p> : null}
      </div>
      <div className="text-paper/80 whitespace-nowrap">
        {post.readTime}
        {external && (
          <span aria-hidden className="ml-2 group-hover:text-amber-tungsten transition-colors">
            ↗
          </span>
        )}
      </div>
    </div>
  );

  return (
    <li className="border-b border-rule">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="group block py-8 hover:bg-steel transition-colors">
          {inner}
        </a>
      ) : (
        <Link href={href} className="group block py-8 hover:bg-steel transition-colors">
          {inner}
        </Link>
      )}
    </li>
  );
}
