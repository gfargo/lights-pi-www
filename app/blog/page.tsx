import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
import { getAllPosts, type BlogPost } from "@/lib/github";

export const metadata = {
  title: "Notes — Lights Pi",
  description:
    "Release notes, technical writing, and community posts from the Lights Pi project.",
  openGraph: {
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
    <div className="min-h-screen bg-ink pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ─────────────────────────────────────────── HEADER ─── */}
        <header className="hairline pb-8 mb-16 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <div>
            <p className="eyebrow">Notes</p>
            <h1
              className="font-display text-paper mt-3"
              style={{ fontSize: "var(--text-display-md)" }}
            >
              Field notes, release log,
              <span className="block italic text-paper/40">
                things found on stage.
              </span>
            </h1>
          </div>
          <a
            href="https://github.com/gfargo/lights-pi/releases.atom"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-paper/60 hover:text-amber-tungsten transition-colors inline-flex items-center gap-2 self-end whitespace-nowrap"
          >
            <Rss className="w-3.5 h-3.5" />
            Subscribe · RSS
          </a>
        </header>

        {/* ─────────────────────────────────────── CATEGORIES ─── */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16 font-mono text-xs uppercase tracking-widest">
          <span className="text-paper">
            All <span className="tabular-nums text-paper/40 ml-1">{posts.length}</span>
          </span>
          {Object.entries(counts).map(([cat, n]) => (
            <span key={cat} className="text-paper/40">
              {cat}{" "}
              <span className="tabular-nums text-paper/30 ml-1">{n}</span>
            </span>
          ))}
        </div>

        {/* ─────────────────────────────────────────── FEATURED ─── */}
        {featured && <FeaturedPost post={featured} />}

        {/* ─────────────────────────────────────────── LIST ─── */}
        {rest.length > 0 ? (
          <section className="mt-20 hairline">
            <p className="eyebrow py-4">
              Earlier · {rest.length} {rest.length === 1 ? "entry" : "entries"}
            </p>
            <ol className="border-t border-rule">
              {rest.map((post) => (
                <PostRow key={post.slug} post={post} />
              ))}
            </ol>
          </section>
        ) : (
          <section className="mt-20 hairline pt-12">
            <p className="font-display italic text-paper/50 text-lg max-w-2xl">
              No earlier entries yet — every Lights Pi release will land here.
              Subscribe via RSS to catch them.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────── presentational ── */

function FeaturedPost({ post }: { post: BlogPost }) {
  const href = externalHref(post) ?? `/blog/${post.slug}`;
  const external = !!externalHref(post);
  const dateLabel = formatDate(post.date);

  return (
    <article className="grid lg:grid-cols-[14rem_1fr] gap-x-10 gap-y-6 items-start hairline pt-12 pb-12">
      {/* Margin metadata, like a magazine cover line */}
      <aside className="space-y-2 font-mono text-xs uppercase tracking-widest text-paper/40">
        <p className="text-amber-tungsten">Featured · {post.category}</p>
        <p>{dateLabel}</p>
        <p>{post.readTime}</p>
        {post.version && (
          <p className="text-paper/60">{post.version}</p>
        )}
      </aside>

      <div>
        <h2
          className="font-display text-paper leading-tight"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-tungsten transition-colors inline-flex items-start gap-3 group"
            >
              <span>{post.title}</span>
              <ArrowUpRight className="w-6 h-6 mt-3 shrink-0 text-paper/30 group-hover:text-amber-tungsten transition-colors" />
            </a>
          ) : (
            <Link
              href={href}
              className="hover:text-amber-tungsten transition-colors"
            >
              {post.title}
            </Link>
          )}
        </h2>
        <p className="mt-6 text-lg text-paper/70 leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-paper/40">
            {post.tags.map((tag) => (
              <li key={tag}>· {tag}</li>
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
    <div className="grid lg:grid-cols-[10rem_1fr_auto] gap-x-8 gap-y-2 items-baseline">
      <div className="font-mono text-xs uppercase tracking-widest text-paper/40 tabular-nums">
        <span className="text-amber-tungsten/70">{post.category}</span>
        <span className="ml-3 text-paper/30">{dateLabel}</span>
      </div>
      <div>
        <h3 className="font-display text-paper text-2xl leading-tight group-hover:text-amber-tungsten transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-paper/55 leading-relaxed">{post.excerpt}</p>
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-paper/30 whitespace-nowrap">
        {post.readTime}
        {external && (
          <ArrowUpRight className="w-3.5 h-3.5 inline-block ml-2 -mt-0.5 group-hover:text-amber-tungsten transition-colors" />
        )}
      </div>
    </div>
  );

  return (
    <li className="border-b border-rule">
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block py-8 hover:bg-steel/30 transition-colors px-2 -mx-2"
        >
          {inner}
        </a>
      ) : (
        <Link
          href={href}
          className="group block py-8 hover:bg-steel/30 transition-colors px-2 -mx-2"
        >
          {inner}
        </Link>
      )}
    </li>
  );
}
