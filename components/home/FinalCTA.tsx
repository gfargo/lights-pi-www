import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-blue-500/20 to-purple-500/10" />
      
      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Build Your
          <br />
          Lighting Controller?
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Join hundreds of creators using Lights Pi to control their studio lighting
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/quick-start"
            className="group bg-gray-900 text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/yourusername/lights-pi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition border border-white/20"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>

        <p className="text-white/80 text-sm">
          Free forever • Open source • No credit card required
        </p>
      </div>
    </section>
  );
}
