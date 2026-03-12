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

export async function getGitHubReleases(): Promise<GitHubRelease[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const releases = await response.json();
    
    return releases.map((release: any) => ({
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

// Static blog posts (tutorials, community, etc.)
export const staticPosts: BlogPost[] = [
  {
    title: "Building a Portable DJ Rig with Lights Pi",
    excerpt: "Step-by-step guide to creating a professional mobile lighting setup for events and parties. Includes equipment list and setup tips.",
    category: "Tutorials",
    date: "2026-03-05T00:00:00Z",
    author: "DJ Mike",
    readTime: "12 min read",
    tags: ["tutorial", "events", "dj"],
    featured: false,
    slug: "portable-dj-rig",
  },
  {
    title: "Community Spotlight: Sarah's YouTube Studio",
    excerpt: "How one content creator built a professional studio lighting setup for under $500. Interview and setup tour included.",
    category: "Community",
    date: "2026-03-01T00:00:00Z",
    author: "Community Team",
    readTime: "8 min read",
    tags: ["community", "youtube", "interview"],
    featured: false,
    slug: "youtube-studio-spotlight",
  },
  {
    title: "Getting Started with Wireless DMX",
    excerpt: "Complete guide to adding wireless DMX to your Lights Pi setup. Hardware recommendations, setup process, and troubleshooting tips.",
    category: "Tutorials",
    date: "2026-02-25T00:00:00Z",
    author: "Tech Guide",
    readTime: "10 min read",
    tags: ["tutorial", "wireless", "dmx"],
    featured: false,
    slug: "wireless-dmx-guide",
  },
  {
    title: "Lights Pi in Education: Teaching Lighting Design",
    excerpt: "How schools and universities are using Lights Pi to teach lighting design and theater production on a budget.",
    category: "Use Cases",
    date: "2026-02-20T00:00:00Z",
    author: "Education Team",
    readTime: "7 min read",
    tags: ["education", "use-case", "theater"],
    featured: false,
    slug: "education-use-case",
  },
  {
    title: "Creating Custom Fixture Definitions",
    excerpt: "Learn how to add support for any DMX fixture to Lights Pi. Includes examples and best practices.",
    category: "Tutorials",
    date: "2026-02-10T00:00:00Z",
    author: "Tech Guide",
    readTime: "15 min read",
    tags: ["tutorial", "advanced", "fixtures"],
    featured: false,
    slug: "custom-fixtures",
  },
  {
    title: "Photography Studio Lighting with Lights Pi",
    excerpt: "Professional photographer shares how they use Lights Pi for client sessions. Setup details and workflow tips.",
    category: "Use Cases",
    date: "2026-01-30T00:00:00Z",
    author: "Pro Photographer",
    readTime: "9 min read",
    tags: ["photography", "use-case", "professional"],
    featured: false,
    slug: "photography-studio",
  },
  {
    title: "Integrating Lights Pi with Home Assistant",
    excerpt: "Complete guide to connecting Lights Pi to your smart home. MQTT setup, automation examples, and voice control.",
    category: "Tutorials",
    date: "2026-01-25T00:00:00Z",
    author: "Smart Home Guide",
    readTime: "11 min read",
    tags: ["tutorial", "smart-home", "automation"],
    featured: false,
    slug: "home-assistant-integration",
  },
];

export async function getAllPosts(): Promise<BlogPost[]> {
  const releases = await getGitHubReleases();
  const releasePosts = releases.map(releaseToPost);
  
  // Combine and sort by date
  const allPosts = [...releasePosts, ...staticPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return allPosts;
}
