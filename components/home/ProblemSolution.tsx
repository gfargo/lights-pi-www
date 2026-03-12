import { XCircle, CheckCircle, Sparkles } from "lucide-react";
import { FadeIn } from '../animations/FadeIn';

export function ProblemSolution() {
  return (
    <section className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* The Problem */}
          <FadeIn delay={0.1} direction="left">
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-900/50">
              <div className="w-12 h-12 bg-red-900/50 rounded-lg flex items-center justify-center mb-6">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">The Problem</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Commercial lighting controllers: $500-$5,000+
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Subscription-based cloud services
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Vendor lock-in
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Complex setup processes
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* The Solution */}
          <FadeIn delay={0.2}>
            <div className="bg-gray-900 rounded-2xl p-8 border border-blue-900/50">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">The Solution</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  Raspberry Pi + open source software
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  One-time hardware cost (~$35)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  Complete control from your network
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  10-minute setup process
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* The Result */}
          <FadeIn delay={0.3} direction="right">
            <div className="bg-gradient-to-br from-orange-900/30 to-blue-900/30 rounded-2xl p-8 border border-orange-900/50">
              <div className="w-12 h-12 bg-orange-900/50 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">The Result</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">★</span>
                  Professional-grade control
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">★</span>
                  Unlimited fixtures
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">★</span>
                  Customizable workflows
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">★</span>
                  Community-driven features
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
