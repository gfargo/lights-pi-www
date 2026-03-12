import { Globe, Zap, Wifi, Shield, Database, Code } from "lucide-react";
import { FadeIn } from '../animations/FadeIn';

const features = [
  {
    icon: Globe,
    title: "Web-Based Control",
    description: "Control from any device with a browser. No apps to install. Responsive mobile interface.",
    color: "blue"
  },
  {
    icon: Zap,
    title: "DMX Standard",
    description: "Works with any DMX fixture. ENTTEC USB Pro support. Wireless DMX compatible.",
    color: "purple"
  },
  {
    icon: Wifi,
    title: "Auto-Discovery",
    description: "mDNS hostname (lights.local). No IP address configuration. Instant network access.",
    color: "pink"
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "HTTPS with mkcert. Firewall configuration. SSH key authentication.",
    color: "green"
  },
  {
    icon: Database,
    title: "Backup & Restore",
    description: "One-command backups. Version control friendly. Disaster recovery ready.",
    color: "orange"
  },
  {
    icon: Code,
    title: "Extensible",
    description: "Custom fixture definitions. Scene libraries. API access.",
    color: "indigo"
  }
];

const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600", border: "border-blue-100" },
  purple: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100" },
  pink: { bg: "bg-pink-50", icon: "text-pink-600", border: "border-pink-100" },
  green: { bg: "bg-green-50", icon: "text-green-600", border: "border-green-100" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600", border: "border-orange-100" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100" }
};

export function KeyFeatures() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need, <span className="text-gradient">Out of the Box</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional features without the professional price tag
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
                  <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-6 ring-2 ring-white`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
