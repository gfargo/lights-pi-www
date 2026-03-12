"use client";

import Link from "next/link";
import { Home, RefreshCw, AlertTriangle, Github } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Error Icon */}
        <div className="mb-8">
          <div className="inline-flex space-x-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-red-500/20 animate-pulse flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <div className="w-20 h-20 rounded-full bg-orange-500/20 animate-pulse delay-200 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-orange-600" />
            </div>
            <div className="w-20 h-20 rounded-full bg-yellow-500/20 animate-pulse delay-500 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4 text-gradient">500</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Something Went Wrong
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto">
          Our lights flickered and something broke. We're working on fixing it!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={reset}
            className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition border border-gray-200"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>

        {/* Error Details & Help */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Need Help?
          </h3>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <p className="text-gray-600 text-sm">
              If this problem persists, please report it on GitHub:
            </p>
            <a
              href="https://github.com/gfargo/lights-pi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition p-2 rounded-lg hover:bg-blue-50"
            >
              <Github className="w-5 h-5" />
              <span>Report Issue on GitHub</span>
            </a>
            {error.digest && (
              <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
