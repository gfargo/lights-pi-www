import Link from "next/link";
import { Home, Search, ArrowLeft, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Lights Pi",
  description: "The page you're looking for doesn't exist. Return to Lights Pi homepage or browse our documentation.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="inline-flex space-x-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 animate-pulse flex items-center justify-center">
              <Lightbulb className="w-10 h-10 text-blue-600" />
            </div>
            <div className="w-20 h-20 rounded-full bg-purple-500/20 animate-pulse delay-200 flex items-center justify-center">
              <Lightbulb className="w-10 h-10 text-purple-600" />
            </div>
            <div className="w-20 h-20 rounded-full bg-pink-500/20 animate-pulse delay-500 flex items-center justify-center">
              <Lightbulb className="w-10 h-10 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 text-gradient">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
          Looks like this page is in the dark. Let's get you back to the light!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            href="/docs"
            className="flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition border border-gray-200"
          >
            <Search className="w-5 h-5" />
            <span>Browse Docs</span>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Popular Pages
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            <Link
              href="/quick-start"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quick Start Guide</span>
            </Link>
            <Link
              href="/hardware"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Hardware Setup</span>
            </Link>
            <Link
              href="/demo"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Interactive Demo</span>
            </Link>
            <Link
              href="/showcase"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition p-2 rounded-lg hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Showcase Gallery</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
