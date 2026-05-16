export interface GitHubRelease {
  tagName: string;
  name: string;
  publishedAt: string;
  body: string;
  isLatest: boolean;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  slug: string;
  content?: string;
  version?: string;
}

const GITHUB_REPO = "gfargo/lights-pi";

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
}

export async function getGitHubRepoStats(): Promise<GitHubRepoStats> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repo = await response.json();
    
    return {
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      watchers: repo.watchers_count || 0,
      openIssues: repo.open_issues_count || 0,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub repo stats:", error);
    return {
      stars: 0,
      forks: 0,
      watchers: 0,
      openIssues: 0,
    };
  }
}

/**
 * Latest release tag from GitHub, e.g. "v2.9.0".
 *
 * Cached via the shared releases fetch (24 hour TTL). Falls back to a sane
 * default if the API is unreachable so the site never renders without a
 * version stamp.
 */
export async function getLatestVersion(fallback = "v2.9.0"): Promise<string> {
  const releases = await getGitHubReleases();
  return releases[0]?.tagName ?? fallback;
}


export async function getGitHubReleases(): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours — releases are infrequent
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const releases = await response.json();
    
    return releases.map((release: {
      tag_name: string;
      name: string;
      published_at: string;
      body?: string;
    }) => ({
      tagName: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      body: release.body || "",
      isLatest: releases[0].tag_name === release.tag_name,
    }));
  } catch (error) {
    console.error("Failed to fetch GitHub releases:", error);
    return [];
  }
}

export function releaseToPost(release: GitHubRelease): BlogPost {
  const excerpt = extractExcerpt(release.body);
  const readTime = calculateReadTime(release.body);
  
  return {
    title: release.name,
    excerpt,
    category: "Release Notes",
    date: release.publishedAt,
    author: "Lights Pi Team",
    readTime,
    tags: extractTags(release.name, release.body),
    featured: release.isLatest,
    slug: release.tagName.toLowerCase(),
    content: release.body,
    version: release.tagName,
  };
}

function extractExcerpt(body: string): string {
  // Remove markdown headers and get first paragraph
  const lines = body.split("\n").filter(line => !line.startsWith("#"));
  const firstParagraph = lines.find(line => line.trim().length > 0) || "";
  
  // Limit to 150 characters
  if (firstParagraph.length > 150) {
    return firstParagraph.substring(0, 147) + "...";
  }
  
  return firstParagraph;
}

function calculateReadTime(body: string): string {
  const wordsPerMinute = 200;
  const words = body.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function extractTags(name: string, body: string): string[] {
  const tags: string[] = ["release"];
  
  const lowerName = name.toLowerCase();
  const lowerBody = body.toLowerCase();
  
  if (lowerName.includes("ai") || lowerBody.includes("ai")) tags.push("ai");
  if (lowerName.includes("scene") || lowerBody.includes("scene")) tags.push("scenes");
  if (lowerName.includes("control") || lowerBody.includes("control")) tags.push("control");
  if (lowerName.includes("web") || lowerBody.includes("web")) tags.push("web");
  if (lowerName.includes("fixture") || lowerBody.includes("fixture")) tags.push("fixtures");
  if (lowerName.includes("template") || lowerBody.includes("template")) tags.push("templates");
  if (lowerName.includes("websocket") || lowerBody.includes("websocket")) tags.push("websocket");
  if (lowerName.includes("dmx")) tags.push("dmx");
  
  return tags.slice(0, 3); // Limit to 3 tags
}

/**
 * Static blog posts placeholder.
 *
 * The previous version of this file contained seven invented blog posts
 * (DJ Mike, Sarah, "Tech Guide", "Pro Photographer", "Smart Home Guide", …)
 * with fabricated authors and content that didn't actually exist anywhere.
 * Same credibility problem as the homepage testimonials — they were removed.
 *
 * Real blog content (tutorials, community spotlights, etc.) can be added
 * back here when it exists. Until then, the /blog page surfaces real
 * GitHub release notes only.
 */
export const staticPosts: BlogPost[] = [];

export async function getAllPosts(): Promise<BlogPost[]> {
  const releases = await getGitHubReleases();
  const releasePosts = releases.map(releaseToPost);

  // Combine and sort by date
  const allPosts = [...releasePosts, ...staticPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}
