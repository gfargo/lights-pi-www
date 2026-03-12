import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/github";

export const metadata = {
  title: "Blog - Lights Pi | Latest Updates & Tutorials",
  description: "Latest updates, tutorials, and community stories from Lights Pi. Learn about new features, setup guides, and real-world use cases.",
  openGraph: {
    title: "Blog - Lights Pi",
    description: "Latest updates, tutorials, and community stories from Lights Pi",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  const categories = [
    { name: "All", count: posts.length },
    { name: "Release Notes", count: posts.filter(p => p.category === "Release Notes").length },
    { name: "Tutorials", count: posts.filter(p => p.category === "Tutorials").length },
    { name: "Community", count: posts.filter(p => p.category === "Community").length },
    { name: "Use Cases", count: posts.filter(p => p.category === "Use Cases").length }
  ];

  const featuredPost = posts.find(p => p.featured) || posts[0];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Lights Pi <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Latest updates, tutorials, and community stories
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                index === 0
                  ? "bg-orange-500 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700 hover:border-orange-500"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured
                </div>
                <h2 className="text-4xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-white/90 text-lg mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-white/80 mb-8">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {featuredPost.author}
                  </div>
                </div>
                <a
                  href={`https://github.com/gfargo/lights-pi/releases/tag/${featuredPost.version || featuredPost.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-900 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Read More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-9xl p-12">
                🚀
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, index) => (
            <article key={index} className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center text-6xl">
                {post.category === "Tutorials" ? "📚" : 
                 post.category === "Community" ? "👥" :
                 post.category === "Use Cases" ? "💡" : "📢"}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-orange-500/20 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  {post.version ? (
                    <a
                      href={`https://github.com/gfargo/lights-pi/releases/tag/${post.version}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-500 font-medium text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-orange-500 hover:text-orange-500 font-medium text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-gray-800 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Stay Updated</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get the latest Lights Pi news, tutorials, and community stories delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-orange-500/50 outline-none"
            />
            <button className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
