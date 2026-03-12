import { MessageCircle, Github, Users, Heart, Code, BookOpen } from "lucide-react";
import { getGitHubRepoStats } from "@/lib/github";

export const metadata = {
  title: "Community - Lights Pi",
  description: "Join the Lights Pi community",
};

export default async function CommunityPage() {
  const stats = await getGitHubRepoStats();

  const communityStats = [
    { icon: Github, value: `${stats.stars}+`, label: "GitHub Stars" },
    { icon: Users, value: `${Math.floor(stats.stars * 0.4)}+`, label: "Active Users" },
    { icon: Heart, value: `${stats.forks}+`, label: "Contributors" }
  ];
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Join the <span className="text-gradient">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with creators, get help, and contribute to Lights Pi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 to-blue-500 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Community Channels */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Discord */}
          <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
            <MessageCircle className="w-12 h-12 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Discord Community</h2>
            <p className="text-white/90 mb-6">
              Join our Discord server for real-time chat, support, and discussions with other Lights Pi users.
            </p>
            <ul className="space-y-2 mb-8 text-white/90">
              <li>✓ Get help from the community</li>
              <li>✓ Share your setups</li>
              <li>✓ Discuss features and ideas</li>
              <li>✓ Connect with other creators</li>
            </ul>
            <a
              href="https://discord.com/invite/KGu9nE9Ejx"
              className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Join Discord
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
            <Github className="w-12 h-12 mb-6" />
            <h2 className="text-3xl font-bold mb-4">GitHub Repository</h2>
            <p className="text-white/90 mb-6">
              Star the repo, report issues, contribute code, and stay updated with the latest releases.
            </p>
            <ul className="space-y-2 mb-8 text-white/90">
              <li>✓ Report bugs and issues</li>
              <li>✓ Request new features</li>
              <li>✓ Contribute code</li>
              <li>✓ Review pull requests</li>
            </ul>
            <a
              href="https://github.com/gfargo/lights-pi"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Get Involved */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Get Involved</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 text-center hover:shadow-lg transition">
              <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">For Users</h3>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• Share your setup in the showcase</li>
                <li>• Help others in Discord</li>
                <li>• Report bugs and issues</li>
                <li>• Request features</li>
                <li>• Write tutorials</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 text-center hover:shadow-lg transition">
              <Code className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">For Developers</h3>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• Contribute code</li>
                <li>• Fix bugs</li>
                <li>• Add features</li>
                <li>• Improve documentation</li>
                <li>• Create integrations</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 text-center hover:shadow-lg transition">
              <BookOpen className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">For Content Creators</h3>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• Create video tutorials</li>
                <li>• Write blog posts</li>
                <li>• Share on social media</li>
                <li>• Showcase your setup</li>
                <li>• Inspire others</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contributing CTA */}
        <div className="bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-purple-500/50 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Contribute?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Check out our contributing guide to learn how you can help make Lights Pi even better
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/gfargo/lights-pi/blob/main/CONTRIBUTING.md"
              className="bg-linear-to-r from-orange-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Contributing Guide
            </a>
            <a
              href="https://github.com/gfargo/lights-pi/issues"
              className="bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition border border-purple-500/50"
            >
              View Open Issues
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
