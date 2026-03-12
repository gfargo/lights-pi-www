import { Cpu, HardDrive, Wifi, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "System Requirements - Lights Pi Documentation",
  description: "Hardware and software requirements for running Lights Pi",
};

export default function SystemRequirementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/docs" className="text-orange-500 hover:text-orange-400 mb-6 inline-block">
          ← Back to Documentation
        </Link>

        <h1 className="text-5xl font-bold mb-4">
          <span className="text-gradient">System Requirements</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          What you need to run Lights Pi
        </p>

        <div className="space-y-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <Cpu className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Raspberry Pi</h2>
                <p className="text-gray-300 mb-4">
                  Lights Pi supports both Raspberry Pi 3B+ and Pi 4 with automatic optimizations for each model.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="font-bold text-white mb-3">Raspberry Pi 4 (Recommended)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 2GB RAM minimum, 4GB+ recommended</li>
                  <li>• Better performance for 10+ fixtures</li>
                  <li>• Faster web interface</li>
                  <li>• Can run additional services</li>
                  <li>• USB 3.0 ports</li>
                </ul>
                <div className="mt-4 text-sm text-orange-500">
                  Price: ~$55 (4GB model)
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="font-bold text-white mb-3">Raspberry Pi 3B+ (Budget)</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 1GB RAM (sufficient for most setups)</li>
                  <li>• Works great for &lt;10 fixtures</li>
                  <li>• Automatic performance optimizations</li>
                  <li>• Lower power consumption</li>
                  <li>• More affordable</li>
                </ul>
                <div className="mt-4 text-sm text-orange-500">
                  Price: ~$35
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                <strong>Pi 3 Optimizations:</strong> When Pi 3 is detected, Lights Pi automatically reduces GPU memory, disables Bluetooth/HDMI, increases swap, and optimizes CPU governor for better performance.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <HardDrive className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Storage</h2>
                <p className="text-gray-300 mb-4">
                  MicroSD card for the operating system and configuration.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Minimum:</strong> 16GB Class 10 or better</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Recommended:</strong> 32GB UHS-I (U1) or better</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Brands:</strong> SanDisk, Samsung, Kingston (avoid no-name brands)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <Wifi className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Network</h2>
                <p className="text-gray-300 mb-4">
                  WiFi or Ethernet connection for remote access.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>WiFi:</strong> 2.4GHz or 5GHz (Pi 3B+ and Pi 4 support both)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Ethernet:</strong> Gigabit on Pi 4, 100Mbps on Pi 3B+</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>mDNS:</strong> Automatic discovery via lights.local</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Dual WiFi:</strong> Configure two networks for redundancy</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start mb-6">
              <Zap className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Power Supply</h2>
                <p className="text-gray-300 mb-4">
                  Proper power supply is critical for stable operation.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Pi 4:</strong> USB-C, 5V 3A (15W) official power supply</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Pi 3B+:</strong> Micro USB, 5V 2.5A (12.5W) official power supply</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">✓</span>
                <span><strong>Warning:</strong> Underpowered supplies cause instability and corruption</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/90 mb-6">
              Follow our quick start guide to set up your Lights Pi
            </p>
            <Link
              href="/quick-start"
              className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Quick Start Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
