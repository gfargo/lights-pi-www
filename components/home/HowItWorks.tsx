import { Download, Terminal, Plug, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Flash SD Card",
    description: "Download Raspberry Pi Imager and configure WiFi and SSH",
    time: "5 minutes",
    color: "blue"
  },
  {
    icon: Terminal,
    title: "Run Setup",
    description: "One command provisioning with automatic configuration",
    time: "5 minutes",
    color: "purple"
  },
  {
    icon: Plug,
    title: "Connect Hardware",
    description: "Plug in ENTTEC USB and connect your DMX fixtures",
    time: "2 minutes",
    color: "pink"
  },
  {
    icon: Sparkles,
    title: "Start Controlling",
    description: "Open web interface, configure fixtures, and create scenes",
    time: "Ready!",
    color: "green"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Up and Running in <span className="text-gradient">10 Minutes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Simple setup process, no technical expertise required
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/30 via-blue-500/30 to-green-500/30 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl mb-6 mx-auto">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="inline-block bg-orange-900/50 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      <div className="inline-flex items-center text-sm font-semibold text-orange-500">
                        <span className="mr-1">⏱</span>
                        {step.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
