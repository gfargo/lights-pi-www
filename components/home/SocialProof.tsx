import { getGitHubRepoStats } from '@/lib/github';
import { Star, Users, Download, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "YouTube Creator",
    avatar: "SC",
    content: "Lights Pi transformed my studio setup. Professional results at a fraction of the cost. The web interface makes it so easy to control everything from my phone.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Event Producer",
    avatar: "MR",
    content: "I've used commercial controllers for years. Lights Pi does everything I need and more. The open source nature means I can customize it exactly how I want.",
    rating: 5
  },
  {
    name: "Emma Thompson",
    role: "Photography Studio Owner",
    avatar: "ET",
    content: "Setup was incredibly simple. Within 15 minutes I had full control of all my studio lights. The scene presets save me so much time between client sessions.",
    rating: 5
  }
];

export async function SocialProof() {
  const stats = await getGitHubRepoStats();
  
  const displayStats = [
    { icon: Star, value: `${stats.stars}+`, label: "GitHub Stars" },
    { icon: Users, value: "500+", label: "Active Users" },
    { icon: Download, value: "2k+", label: "Downloads" },
    { icon: Heart, value: "100%", label: "Open Source" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="text-gradient">Creators Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of creators using Lights Pi for their lighting needs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {displayStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
