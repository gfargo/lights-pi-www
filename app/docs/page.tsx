import { Book, Terminal, Settings, Wrench, Shield, Code } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Documentation - Lights Pi",
  description: "Complete documentation for Lights Pi lighting controller",
};

const categories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Installation, setup, and first steps",
    links: [
      { name: "Quick Start Guide", href: "/quick-start" },
      { name: "System Requirements", href: "#" },
      { name: "SD Card Preparation", href: "#" },
      { name: "Initial Provisioning", href: "#" },
      { name: "Network Configuration", href: "#" }
    ]
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Customize your Lights Pi setup",
    links: [
      { name: "Environment Variables", href: "#" },
      { name: "Static IP Setup", href: "#" },
      { name: "WiFi Management", href: "#" },
      { name: "Firewall Rules", href: "#" },
      { name: "Service Configuration", href: "#" }
    ]
  },
  {
    icon: Terminal,
    title: "Command Reference",
    description: "All available commands and scripts",
    links: [
      { name: "Provisioning Commands", href: "#" },
      { name: "Service Management", href: "#" },
      { name: "QLC+ Commands", href: "#" },
      { name: "Network Commands", href: "#" },
      { name: "System Commands", href: "#" }
    ]
  },
  {
    icon: Wrench,
    title: "Hardware",
    description: "Hardware setup and troubleshooting",
    links: [
      { name: "Hardware Guide", href: "/hardware" },
      { name: "ENTTEC Setup", href: "#" },
      { name: "DMX Troubleshooting", href: "#" },
      { name: "Wireless DMX", href: "#" },
      { name: "Multiple Universes", href: "#" }
    ]
  },
  {
    icon: Shield,
    title: "Security",
    description: "HTTPS, SSH, and security best practices",
    links: [
      { name: "HTTPS Setup", href: "#" },
      { name: "SSH Configuration", href: "#" },
      { name: "Firewall Setup", href: "#" },
      { name: "Security Best Practices", href: "#" }
    ]
  },
  {
    icon: Code,
    title: "Advanced",
    description: "Custom fixtures, API, and integrations",
    links: [
      { name: "Custom Fixture Definitions", href: "#" },
      { name: "Backup Strategies", href: "#" },
      { name: "API Access", href: "#" },
      { name: "Integration Examples", href: "#" }
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Everything you need to know about Lights Pi
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <input
              type="search"
              placeholder="Search documentation..."
              className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-orange-500/50 outline-none transition"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Quick Links</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/quick-start" className="bg-gray-900 border border-blue-200 rounded-xl p-4 hover:shadow-md transition text-center">
              <div className="font-semibold text-blue-900">Quick Start</div>
              <div className="text-sm text-orange-500">Get started in 10 min</div>
            </Link>
            <Link href="/hardware" className="bg-gray-900 border border-purple-200 rounded-xl p-4 hover:shadow-md transition text-center">
              <div className="font-semibold text-purple-900">Hardware Guide</div>
              <div className="text-sm text-orange-500">Shopping list & setup</div>
            </Link>
            <Link href="#" className="bg-gray-900 border border-pink-200 rounded-xl p-4 hover:shadow-md transition text-center">
              <div className="font-semibold text-pink-900">Troubleshooting</div>
              <div className="text-sm text-pink-600">Common issues</div>
            </Link>
            <Link href="#" className="bg-gray-900 border border-green-200 rounded-xl p-4 hover:shadow-md transition text-center">
              <div className="font-semibold text-green-900">API Reference</div>
              <div className="text-sm text-green-600">Integration docs</div>
            </Link>
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{category.title}</h3>
                <p className="text-gray-400 mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-orange-500 hover:text-orange-500 hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl mb-6 text-white/90">
            Join our community for support and discussions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/community" className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Join Discord
            </Link>
            <a href="https://github.com/yourusername/lights-pi/issues" className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20">
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
