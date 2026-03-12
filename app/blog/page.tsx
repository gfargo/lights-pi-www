import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog - Lights Pi | Latest Updates & Tutorials",
  description: "Latest updates, tutorials, and community stories from Lights Pi. Learn about new features, setup guides, and real-world use cases.",
  openGraph: {
    title: "Blog - Lights Pi",
    description: "Latest updates, tutorials, and community stories from Lights Pi",
    type: "website",
  },
};

const categories = [
  { name: "All", count: 12 },
  { name: "Release Notes", count: 3 },
  { name: "Tutorials", count: 4 },
  { name: "Community", count: 3 },
  { name: "Use Cases", count: 2 }
];

const posts = [
  {
    title: "Lights Pi 2.0 Released",
    excerpt: "Major update brings improved performance, new features, and better hardware support. Learn what's new and how to upgrade.",
    category: "Release Notes",
    date: "2026-03-10",
    author: "Lights Pi Team",
    readTime: "5 min read",
    tags: ["release", "update", "features"],
    featured: true
  },
  {
    title: "Building a Portable DJ Rig with Lights Pi",
    excerpt: "Step-by-step guide to creating a professional mobile lighting setup for events and parties. Includes equipment list and setup tips.",
    category: "Tutorials",
    date: "2026-03-05",
    author: "DJ Mike",
    readTime: "12 min read",
    tags: ["tutorial", "events", "dj"]
  },
  {
    title: "Community Spotlight: Sarah's YouTube Studio",
    excerpt: "How one content creator built a professional studio lighting setup for under $500. Interview and setup tour included.",
    category: "Community",
    date: "2026-03-01",
    author: "Community Team",
    readTime: "8 min read",
    tags: ["community", "youtube", "interview"]
  },
  {
    title: "Getting Started with Wireless DMX",
    excerpt: "Complete guide to adding wireless DMX to your Lights Pi setup. Hardware recommendations, setup process, and troubleshooting tips.",
    category: "Tutorials",
    date: "2026-02-25",
    author: "Tech Guide",
    readTime: "10 min read",
    tags: ["tutorial", "wireless", "dmx"]
  },
  {
    title: "Lights Pi in Education: Teaching Lighting Design",
    excerpt: "How schools and universities are using Lights Pi to teach lighting design and theater production on a budget.",
    category: "Use Cases",
    date: "2026-02-20",
    author: "Education Team",
    readTime: "7 min read",
    tags: ["education", "use-case", "theater"]
  },
  {
    title: "Version 1.5 Update: New Features and Improvements",
    excerpt: "Incremental update brings bug fixes, performance improvements, and community-requested features.",
    category: "Release Notes",
    date: "2026-02-15",
    author: "Lights Pi Team",
    readTime: "4 min read",
    tags: ["release", "update"]
  },
  {
    title: "Creating Custom Fixture Definitions",
    excerpt: "Learn how to add support for any DMX fixture to Lights Pi. Includes examples and best practices.",
    category: "Tutorials",
    date: "2026-02-10",
    author: "Tech Guide",
    readTime: "15 min read",
    tags: ["tutorial", "advanced", "fixtures"]
  },
  {
    title: "Community Showcase: February 2026",
    excerpt: "Highlighting the best community setups from this month. Amazing creativity and innovation from our users.",
    category: "Community",
    date: "2026-02-05",
    author: "Community Team",
    readTime: "6 min read",
    tags: ["community", "showcase"]
  },
  {
    title: "Photography Studio Lighting with Lights Pi",
    excerpt: "Professional photographer shares how they use Lights Pi for client sessions. Setup details and workflow tips.",
    category: "Use Cases",
    date: "2026-01-30",
    author: "Pro Photographer",
    readTime: "9 min read",
    tags: ["photography", "use-case", "professional"]
  },
  {
    title: "Integrating Lights Pi with Home Assistant",
    excerpt: "Complete guide to connecting Lights Pi to your smart home. MQTT setup, automation examples, and voice control.",
    category: "Tutorials",
    date: "2026-01-25",
    author: "Smart Home Guide",
    readTime: "11 min read",
    tags: ["tutorial", "smart-home", "automation"]
  },
  {
    title: "Version 1.0 Launch: Lights Pi is Here!",
    excerpt: "After months of development and testing, Lights Pi 1.0 is officially released. Thank you to our amazing community!",
    category: "Release Notes",
    date: "2026-01-15",
    author: "Lights Pi Team",
    readTime: "6 min read",
    tags: ["release", "launch", "milestone"]
  },
  {
    title: "Meet the Community: Top Contributors",
    excerpt: "Celebrating the developers, testers, and community members who made Lights Pi possible.",
    category: "Community",
    date: "2026-01-10",
    author: "Community Team",
    readTime: "5 min read",
    tags: ["community", "contributors"]
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Lights Pi <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12 text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured
                </div>
                <h2 className="text-4xl font-bold mb-4">{posts[0].title}</h2>
                <p className="text-white/90 text-lg mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-white/80 mb-8">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {posts[0].author}
                  </div>
                </div>
                <Link
                  href={`/blog/${posts[0].title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Read More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-9xl p-12">
                🚀
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post, index) => (
            <article key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl">
                {post.category === "Tutorials" ? "📚" : 
                 post.category === "Community" ? "👥" :
                 post.category === "Use Cases" ? "💡" : "📢"}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <Link
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest Lights Pi news, tutorials, and community stories delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
