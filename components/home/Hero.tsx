"use client";

import Link from "next/link";
import { Play, Github, Star } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <FadeIn delay={0.1} direction="down">
          <div className="mb-8 inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-700">Open Source • Self-Hosted • No Subscriptions</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Professional Studio Lighting
            <br />
            <span className="text-gradient">Control for $35</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/quick-start"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started in 10 Minutes
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <button className="flex items-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition border border-gray-200">
              <Play className="w-5 h-5" />
              <Link href="/demo">Try Demo</Link>
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>1.2k+ stars</span>
            </div>
            <div className="w-1 h-4 bg-gray-300" />
            <span>500+ installations</span>
            <div className="w-1 h-4 bg-gray-300" />
            <span>Active community</span>
          </div>
        </FadeIn>

        {/* Demo preview placeholder */}
        <FadeIn delay={0.6}>
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
                    <div className="w-16 h-16 rounded-full bg-purple-500 animate-pulse delay-200" />
                    <div className="w-16 h-16 rounded-full bg-pink-500 animate-pulse delay-500" />
                  </div>
                  <p className="text-white/60">Interactive demo coming soon</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-3xl opacity-50" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
