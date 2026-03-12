"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Github } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg" />
            <span className="font-bold text-xl">Lights Pi</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/quick-start" className="text-gray-700 hover:text-blue-600 transition">
              Quick Start
            </Link>
            <Link href="/hardware" className="text-gray-700 hover:text-blue-600 transition">
              Hardware
            </Link>
            <Link href="/showcase" className="text-gray-700 hover:text-blue-600 transition">
              Showcase
            </Link>
            <Link href="/docs" className="text-gray-700 hover:text-blue-600 transition">
              Docs
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-blue-600 transition">
              Community
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/lights-pi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link
              href="/quick-start"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
