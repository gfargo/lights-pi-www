import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/quick-start" className="text-gray-400 hover:text-orange-500 transition">Quick Start</Link></li>
              <li><Link href="/hardware" className="text-gray-400 hover:text-orange-500 transition">Hardware Guide</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-orange-500 transition">Interactive Demo</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-orange-500 transition">Documentation</Link></li>
              <li><Link href="/roadmap" className="text-gray-400 hover:text-orange-500 transition">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/gfargo/lights-pi" className="text-gray-400 hover:text-orange-500 transition">GitHub</a></li>
              <li><a href="https://discord.gg/yourserver" className="text-gray-400 hover:text-orange-500 transition">Discord</a></li>
              <li><Link href="/showcase" className="text-gray-400 hover:text-orange-500 transition">Showcase Gallery</Link></li>
              <li><Link href="/contributing" className="text-gray-400 hover:text-orange-500 transition">Contributing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-orange-500 transition">Blog</Link></li>
              <li><Link href="/use-cases" className="text-gray-400 hover:text-orange-500 transition">Use Cases</Link></li>
              <li><Link href="/comparison" className="text-gray-400 hover:text-orange-500 transition">Comparison</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-orange-500 transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="https://opensource.org/licenses/MIT" className="text-gray-400 hover:text-orange-500 transition">MIT License</a></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition">Privacy Policy</Link></li>
            </ul>
            <div className="mt-6 flex items-center space-x-4">
              <a href="https://github.com/gfargo/lights-pi" className="text-gray-400 hover:text-orange-500 transition">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lights Pi. Open source under MIT License.</p>
        </div>
      </div>
    </footer>
  );
}
