import Link from "next/link";
import { Video, Camera, Radio, Music, GraduationCap, Home, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Use Cases - Lights Pi | Real-World Applications",
  description: "Discover how Lights Pi adapts to your workflow - from YouTube studios to live events. See real examples, budgets, and fixture recommendations.",
  openGraph: {
    title: "Use Cases - Lights Pi",
    description: "Discover how Lights Pi adapts to your workflow - from content creation to live events",
    type: "website",
  },
};

const useCases = [
  {
    id: "youtube",
    icon: Video,
    title: "YouTube/Content Creation",
    tagline: "Consistent lighting across videos",
    description: "Create professional-looking videos with consistent, controllable lighting. Perfect for YouTubers, vloggers, and content creators who need reliable lighting setups.",
    color: "red",
    features: [
      "Quick scene switching between video types",
      "Remote control during recording",
      "Consistent color temperature",
      "Integration with OBS/streaming software"
    ],
    fixtures: ["2-4 LED panels", "RGB accent strips", "Key and fill lights"],
    budget: "$400-800",
    example: "A tech YouTuber uses 3 LED panels controlled by Lights Pi. One scene for talking head videos, another for product reviews, and a third for B-roll. All controlled from their phone while recording."
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photography Studios",
    tagline: "Client session presets",
    description: "Professional portrait and product photography with instant lighting adjustments. Save client-specific presets and switch between setups in seconds.",
    color: "blue",
    features: [
      "Client session presets",
      "Color temperature matching",
      "Mood lighting scenes",
      "Portrait vs product lighting modes"
    ],
    fixtures: ["4-6 LED panels", "Strip lights", "Background lights"],
    budget: "$600-1,200",
    example: "A portrait photographer has presets for headshots, family portraits, and dramatic lighting. Each client's preferred setup is saved and recalled instantly for return visits."
  },
  {
    id: "streaming",
    icon: Radio,
    title: "Live Streaming",
    tagline: "Dynamic lighting effects",
    description: "Engage your audience with dynamic lighting that responds to stream events. Perfect for gamers, streamers, and live content creators.",
    color: "purple",
    features: [
      "Dynamic effects",
      "Viewer interaction triggers",
      "Multi-camera setups",
      "Scene automation"
    ],
    fixtures: ["RGB LED strips", "Smart bulbs", "Accent lights"],
    budget: "$300-600",
    example: "A Twitch streamer's lights change color when receiving donations, flash during exciting gameplay moments, and automatically adjust for different stream segments."
  },
  {
    id: "events",
    icon: Music,
    title: "Small Venues & Events",
    tagline: "Portable lighting rig",
    description: "Professional lighting for small venues, weddings, parties, and corporate events. Easy setup and teardown with wireless control.",
    color: "pink",
    features: [
      "Portable rigs",
      "Event-specific scenes",
      "Easy setup/teardown",
      "Wireless control"
    ],
    fixtures: ["Moving heads", "Par cans", "Wireless DMX"],
    budget: "$1,000-2,500",
    example: "A mobile DJ brings their Lights Pi setup to weddings and parties. Pre-programmed scenes for dinner, dancing, and special moments. All controlled wirelessly from anywhere in the venue."
  },
  {
    id: "education",
    icon: GraduationCap,
    title: "Education & Training",
    tagline: "Teaching lighting design",
    description: "Affordable lighting control for schools, universities, and training programs. Hands-on learning without the professional price tag.",
    color: "green",
    features: [
      "Affordable lab equipment",
      "Hands-on learning",
      "Curriculum integration",
      "Multiple student access"
    ],
    fixtures: ["Various DMX fixtures", "Training setups"],
    budget: "$200-500 per station",
    example: "A theater program uses Lights Pi to teach lighting design. Students learn DMX control, scene programming, and fixture management on real equipment without expensive commercial controllers."
  },
  {
    id: "home",
    icon: Home,
    title: "Home Automation",
    tagline: "Ambient lighting",
    description: "Integrate DMX lighting into your smart home. Control ambient lighting, set schedules, and create the perfect atmosphere for any occasion.",
    color: "orange",
    features: [
      "Smart home integration",
      "MQTT/API control",
      "Scheduled scenes",
      "Voice control ready"
    ],
    fixtures: ["RGB strips", "Smart bulbs", "Accent lights"],
    budget: "$200-400",
    example: "A smart home enthusiast controls their living room accent lighting through Home Assistant. Lights automatically adjust throughout the day and respond to movie watching, dinner time, and bedtime routines."
  }
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Lights Pi Adapts to <span className="text-gradient">Your Workflow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From content creation to live events, discover how Lights Pi fits your needs
          </p>
        </div>

        <div className="space-y-20">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div key={useCase.id} className="relative">
                <div className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold mb-3 text-gray-900">{useCase.title}</h2>
                    <p className="text-xl text-gray-600 mb-6">{useCase.tagline}</p>
                    <p className="text-gray-700 mb-8">{useCase.description}</p>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {useCase.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-gray-700">
                              <span className="text-blue-500 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <div className="text-sm text-blue-700 font-semibold mb-1">Typical Budget</div>
                          <div className="text-2xl font-bold text-blue-900">{useCase.budget}</div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                          <div className="text-sm text-purple-700 font-semibold mb-1">Fixtures</div>
                          <div className="text-sm text-purple-900">{useCase.fixtures.join(", ")}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2">Real-World Example</h4>
                      <p className="text-gray-700 italic">{useCase.example}</p>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-8xl shadow-2xl">
                      <Icon className="w-32 h-32 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">
            Build your Lights Pi controller and start controlling your lights today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quick-start"
              className="inline-flex items-center justify-center bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Quick Start Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/showcase"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
            >
              View Showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
