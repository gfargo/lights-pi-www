import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/quick-start" className="text-gray-400 hover:text-white transition">Quick Start</Link></li>
              <li><Link href="/hardware" className="text-gray-400 hover:text-white transition">Hardware Guide</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white transition">Interactive Demo</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-white transition">Documentation</Link></li>
              <li><Link href="/roadmap" className="text-gray-400 hover:text-white transition">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="https://github.com/yourusername/lights-pi" className="text-gray-400 hover:text-white transition">GitHub</a></li>
              <li><a href="https://discord.gg/yourserver" className="text-gray-400 hover:text-white transition">Discord</a></li>
              <li><Link href="/showcase" className="text-gray-400 hover:text-white transition">Showcase Gallery</Link></li>
              <li><Link href="/contributing" className="text-gray-400 hover:text-white transition">Contributing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/use-cases" className="text-gray-400 hover:text-white transition">Use Cases</Link></li>
              <li><Link href="/comparison" className="text-gray-400 hover:text-white transition">Comparison</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="https://opensource.org/licenses/MIT" className="text-gray-400 hover:text-white transition">MIT License</a></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
            </ul>
            <div className="mt-6 flex items-center space-x-4">
              <a href="https://github.com/yourusername/lights-pi" className="text-gray-400 hover:text-white transition">
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
