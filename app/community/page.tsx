import { MessageCircle, Github, Users, Heart, Code, BookOpen } from "lucide-react";

export const metadata = {
  title: "Community - Lights Pi",
  description: "Join the Lights Pi community",
};

const stats = [
  { icon: Github, value: "1.2k+", label: "GitHub Stars" },
  { icon: Users, value: "500+", label: "Active Users" },
  { icon: MessageCircle, value: "200+", label: "Discord Members" },
  { icon: Heart, value: "50+", label: "Contributors" }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Join the <span className="text-gradient">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with creators, get help, and contribute to Lights Pi
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Community Channels */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Discord */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
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
              href="https://discord.gg/yourserver"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Join Discord
            </a>
          </div>

          {/* GitHub */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
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
              href="https://github.com/yourusername/lights-pi"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Get Involved */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Get Involved</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Users</h3>
              <ul className="space-y-2 text-gray-600 text-left">
                <li>• Share your setup in the showcase</li>
                <li>• Help others in Discord</li>
                <li>• Report bugs and issues</li>
                <li>• Request features</li>
                <li>• Write tutorials</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition">
              <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Developers</h3>
              <ul className="space-y-2 text-gray-600 text-left">
                <li>• Contribute code</li>
                <li>• Fix bugs</li>
                <li>• Add features</li>
                <li>• Improve documentation</li>
                <li>• Create integrations</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center hover:shadow-lg transition">
              <BookOpen className="w-12 h-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">For Content Creators</h3>
              <ul className="space-y-2 text-gray-600 text-left">
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
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Contribute?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out our contributing guide to learn how you can help make Lights Pi even better
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/yourusername/lights-pi/blob/main/CONTRIBUTING.md"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Contributing Guide
            </a>
            <a
              href="https://github.com/yourusername/lights-pi/issues"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition border border-purple-200"
            >
              View Open Issues
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
