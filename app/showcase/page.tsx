import { Users } from "lucide-react";

export const metadata = {
  title: "Showcase - Lights Pi",
  description: "See what creators are building with Lights Pi",
};

const showcases = [
  {
    name: "Minimal YouTube Studio",
    creator: "@techcreator",
    image: "🎥",
    fixtures: 3,
    budget: "$300",
    useCase: "YouTube",
    description: "Simple 2-light setup with RGB accent strip for consistent video lighting"
  },
  {
    name: "Mobile DJ Rig",
    creator: "@djlights",
    image: "🎵",
    fixtures: 6,
    budget: "$1,200",
    useCase: "Events",
    description: "Portable setup with moving heads and par cans, wireless DMX control"
  },
  {
    name: "Photography Studio",
    creator: "@portraitpro",
    image: "📸",
    fixtures: 6,
    budget: "$800",
    useCase: "Photography",
    description: "LED panels and strip lights for versatile portrait and product photography"
  },
  {
    name: "Streaming Setup",
    creator: "@streamking",
    image: "🎮",
    fixtures: 4,
    budget: "$450",
    useCase: "Streaming",
    description: "Dynamic RGB lighting synchronized with stream events and alerts"
  },
  {
    name: "Theater Production",
    creator: "@stagecraft",
    image: "🎭",
    fixtures: 12,
    budget: "$2,000",
    useCase: "Theater",
    description: "Full stage lighting with moving heads, spots, and color washes"
  },
  {
    name: "Home Studio",
    creator: "@musicmaker",
    image: "🎹",
    fixtures: 5,
    budget: "$600",
    useCase: "Music",
    description: "Ambient lighting for music production and recording sessions"
  }
];

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Community <span className="text-gradient">Showcase</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            See what creators are building with Lights Pi
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">All</button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:border-blue-300">YouTube</button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:border-blue-300">Photography</button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:border-blue-300">Events</button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium border border-gray-200 hover:border-blue-300">Streaming</button>
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {showcases.map((showcase, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl">
                {showcase.image}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {showcase.useCase}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">{showcase.budget}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900">{showcase.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{showcase.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {showcase.creator}
                  </div>
                  <div className="text-sm text-gray-600">
                    {showcase.fixtures} fixtures
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit CTA */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Share Your Setup</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Built something cool with Lights Pi? Share it with the community and inspire others!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              Submit Your Setup
            </button>
            <a
              href="/community"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition border border-purple-200"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
