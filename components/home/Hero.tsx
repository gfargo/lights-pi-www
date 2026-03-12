"use client";

import Link from "next/link";
import { Play, Github, Star } from "lucide-react";
import { FadeIn } from '../animations/FadeIn';
import { trackEvent } from '@/lib/analytics';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements - QLC+ inspired */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-9000/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-9000/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <FadeIn delay={0.1} direction="down">
          <div className="mb-8 inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-700">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm text-gray-300">Open Source • Self-Hosted • No Subscriptions</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Professional Studio Lighting
            <br />
            <span className="text-gradient">Control for $35</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/quick-start"
              onClick={() => trackEvent.clickGetStarted('hero')}
              className="group bg-linear-to-r from-orange-500 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started in 10 Minutes
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/demo"
              onClick={() => trackEvent.demoInteraction('hero_demo_click')}
              className="flex items-center space-x-2 bg-gray-800 text-gray-200 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition border border-gray-700"
            >
              <Play className="w-5 h-5" />
              <span>Try Demo</span>
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5" />
              <span>1.2k+ stars</span>
            </div>
            <div className="w-1 h-4 bg-gray-700" />
            <span>500+ installations</span>
            <div className="w-1 h-4 bg-gray-700" />
            <span>Active community</span>
          </div>
        </FadeIn>

        {/* Demo preview placeholder */}
        <FadeIn delay={0.6}>
          <div className="mt-16 relative">
            <div className="relative mx-auto max-w-5xl rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-800">
              <div className="aspect-video bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-9000 animate-pulse" />
                    <div className="w-16 h-16 rounded-full bg-gray-9000 animate-pulse delay-200" />
                    <div className="w-16 h-16 rounded-full bg-gray-9000 animate-pulse delay-500" />
                  </div>
                  <p className="text-gray-400">Interactive demo coming soon</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-linear-to-br from-orange-500 to-blue-500 rounded-full blur-3xl opacity-30" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-linear-to-br from-blue-500 to-green-500 rounded-full blur-3xl opacity-30" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
