import { Globe, Zap, Wifi, Shield, Sparkles, Save, Bot } from "lucide-react";
import { FadeIn } from '../animations/FadeIn';

const features = [
  {
    icon: Sparkles,
    title: "AI Scene Generation",
    description: "Describe a mood in plain English. The AI knows your exact fixtures and channels — no accidental strobing.",
    color: "purple"
  },
  {
    icon: Bot,
    title: "MCP Server Built In",
    description: "Streamable HTTP MCP endpoint at :5001/mcp. Connect Claude Desktop, ChatGPT, Cursor, or any agent — the rig becomes a tool.",
    color: "purple"
  },
  {
    icon: Save,
    title: "Save & Recall",
    description: "Love a generated scene? Save it permanently with one click. Recall instantly — no AI call needed.",
    color: "green"
  },
  {
    icon: Globe,
    title: "Web-Based Control",
    description: "Control from any device with a browser. AI chat, channel sliders, and scene buttons. No apps to install.",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Fixture-Aware",
    description: "Reads QLC+ fixture definitions (.qxf) for authoritative channel roles. Warm/cool/amber fixtures just work.",
    color: "orange"
  },
  {
    icon: Wifi,
    title: "Auto-Discovery",
    description: "mDNS hostname (lights.local). WiFi watchdog auto-recovers dropped connections. Zero config networking.",
    color: "pink"
  },
  {
    icon: Shield,
    title: "Reliable Architecture",
    description: "Single persistent WebSocket to QLC+. No socket leaks, no connection limits. Fades run in real-time.",
    color: "indigo"
  }
];

const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-gray-900", icon: "text-blue-400", border: "border-blue-900/50" },
  purple: { bg: "bg-gray-900", icon: "text-orange-500", border: "border-gray-800" },
  pink: { bg: "bg-gray-900", icon: "text-orange-400", border: "border-gray-800" },
  green: { bg: "bg-gray-900", icon: "text-green-400", border: "border-green-900/50" },
  orange: { bg: "bg-gray-900", icon: "text-orange-500", border: "border-gray-800" },
  indigo: { bg: "bg-gray-900", icon: "text-blue-400", border: "border-gray-800" }
};

export function KeyFeatures() {
  return (
    <section className="py-24 bg-linear-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need, <span className="text-gradient">Out of the Box</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade features with zero ongoing costs
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            return (
              <FadeIn key={index} delay={index * 0.1}>
                <div
                  className={`${colors.bg} rounded-2xl p-8 border ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-6 ring-2 ring-gray-700`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
