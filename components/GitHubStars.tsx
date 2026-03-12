import { Star } from "lucide-react";
import { getGitHubRepoStats } from "@/lib/github";

export async function GitHubStars() {
  const stats = await getGitHubRepoStats();
  
  return (
    <a
      href="https://github.com/gfargo/lights-pi"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-105"
    >
      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
      <span className="text-sm font-semibold text-gray-700">
        {stats.stars > 0 ? `${stats.stars} stars` : "Star on GitHub"}
      </span>
      <span className="text-sm text-gray-500">on GitHub</span>
    </a>
  );
}
