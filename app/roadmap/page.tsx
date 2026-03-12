import { Check, Clock, Sparkles, Zap } from "lucide-react";

export const metadata = {
  title: "Roadmap - Lights Pi | Product Development Timeline",
  description: "See what's coming next for Lights Pi. View completed features, work in progress, and planned updates for the open-source lighting controller.",
  openGraph: {
    title: "Roadmap - Lights Pi",
    description: "See what's coming next for Lights Pi",
    type: "website",
  },
};

const roadmap = [
  {
    status: "completed",
    quarter: "Q4 2025",
    items: [
      {
        title: "Version 1.0 Launch",
        description: "Initial stable release with core features",
        completed: true
      },
      {
        title: "ENTTEC USB Pro Support",
        description: "Full support for ENTTEC DMX USB Pro interface",
        completed: true
      },
      {
        title: "Web-Based Control Interface",
        description: "QLC+ web interface with mobile support",
        completed: true
      },
      {
        title: "Auto-Discovery (mDNS)",
        description: "Automatic network discovery via lights.local",
        completed: true
      },
      {
        title: "HTTPS Setup",
        description: "One-command HTTPS configuration with mkcert",
        completed: true
      }
    ]
  },
  {
    status: "completed",
    quarter: "Q1 2026",
    items: [
      {
        title: "Version 1.5 Update",
        description: "Performance improvements and bug fixes",
        completed: true
      },
      {
        title: "Backup & Restore",
        description: "One-command backup and restore functionality",
        completed: true
      },
      {
        title: "Wireless DMX Support",
        description: "Documentation and support for wireless DMX systems",
        completed: true
      },
      {
        title: "Community Showcase",
        description: "Platform for users to share their setups",
        completed: true
      }
    ]
  },
  {
    status: "in-progress",
    quarter: "Q2 2026",
    items: [
      {
        title: "Version 2.0 Release",
        description: "Major update with new features and improvements",
        completed: true
      },
      {
        title: "AI Scene Generation",
        description: "Generate lighting scenes using AI descriptions",
        completed: false,
        progress: 80
      },
      {
        title: "Mobile App (PWA)",
        description: "Progressive Web App for better mobile experience",
        completed: false,
        progress: 60
      },
      {
        title: "Multi-Universe Support",
        description: "Support for multiple DMX universes",
        completed: false,
        progress: 40
      }
    ]
  },
  {
    status: "planned",
    quarter: "Q3 2026",
    items: [
      {
        title: "Plugin System",
        description: "Extensible plugin architecture for custom integrations",
        completed: false
      },
      {
        title: "Cloud Sync (Optional)",
        description: "Optional cloud backup and sync for scenes",
        completed: false
      },
      {
        title: "Advanced Scheduling",
        description: "Time-based scene automation and scheduling",
        completed: false
      },
      {
        title: "MIDI Integration",
        description: "Control lights via MIDI controllers",
        completed: false
      }
    ]
  },
  {
    status: "future",
    quarter: "Q4 2026 & Beyond",
    items: [
      {
        title: "Fixture Marketplace",
        description: "Community-driven fixture definition library",
        completed: false
      },
      {
        title: "Scene Marketplace",
        description: "Share and download pre-made scenes",
        completed: false
      },
      {
        title: "Video Tutorials",
        description: "Comprehensive video tutorial series",
        completed: false
      },
      {
        title: "Hardware Kit",
        description: "Pre-configured hardware kit for easy setup",
        completed: false
      },
      {
        title: "Multi-Pi Sync",
        description: "Synchronize multiple Lights Pi controllers",
        completed: false
      }
    ]
  }
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Product <span className="text-gradient">Roadmap</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what we&apos;re building and what&apos;s coming next for Lights Pi
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <span className="text-gray-700">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span className="text-gray-700">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
            <span className="text-gray-700">Planned</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full mr-2" />
            <span className="text-gray-700">Future</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-200 via-blue-200 to-purple-200" />

          <div className="space-y-12">
            {roadmap.map((quarter, qIndex) => (
              <div key={qIndex} className="relative">
                {/* Quarter marker */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    quarter.status === "completed" ? "bg-green-500" :
                    quarter.status === "in-progress" ? "bg-blue-500" :
                    quarter.status === "planned" ? "bg-purple-500" :
                    "bg-gray-300"
                  } shadow-lg z-10`}>
                    {quarter.status === "completed" ? <Check className="w-8 h-8 text-white" /> :
                     quarter.status === "in-progress" ? <Zap className="w-8 h-8 text-white" /> :
                     quarter.status === "planned" ? <Clock className="w-8 h-8 text-white" /> :
                     <Sparkles className="w-8 h-8 text-white" />}
                  </div>
                  <div className="ml-6">
                    <h2 className="text-2xl font-bold text-gray-900">{quarter.quarter}</h2>
                    <p className="text-gray-600 capitalize">{quarter.status.replace('-', ' ')}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="ml-24 space-y-4">
                  {quarter.items.map((item, iIndex) => (
                    <div
                      key={iIndex}
                      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {item.completed && (
                              <Check className="w-5 h-5 text-green-500 mr-2" />
                            )}
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                          {item.progress !== undefined && !item.completed && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span className="font-semibold">{item.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Input CTA */}
        <div className="mt-20 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Have Ideas?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;d love to hear your feature requests and ideas for Lights Pi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/yourusername/lights-pi/discussions"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Share Your Ideas
            </a>
            <a
              href="https://github.com/yourusername/lights-pi/issues"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition border border-purple-200"
            >
              Report Issues
            </a>
          </div>
        </div>

        {/* Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This roadmap is subject to change based on community feedback and priorities.</p>
          <p className="mt-2">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
