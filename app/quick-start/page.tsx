import { CheckCircle, Download, Terminal, Plug, Sparkles, AlertCircle } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Quick Start - Lights Pi",
  description: "Get your Lights Pi lighting controller up and running in 10 minutes",
};

const prerequisites = [
  "Raspberry Pi 3B+ or 4",
  "MicroSD card (16GB+)",
  "ENTTEC DMX USB Pro",
  "DMX fixture(s)",
  "Computer with SD card reader",
  "WiFi network"
];

const steps = [
  {
    icon: Download,
    title: "Prepare SD Card",
    time: "5 minutes",
    content: [
      "Download Raspberry Pi Imager from raspberrypi.com",
      "Select Raspberry Pi OS Lite (64-bit)",
      "Configure hostname: lights",
      "Enable SSH with password or key",
      "Configure WiFi credentials",
      "Write to SD card"
    ]
  },
  {
    icon: Terminal,
    title: "Provision Pi",
    time: "5 minutes",
    content: [
      "Insert SD card into Pi and power on",
      "Wait 2-3 minutes for first boot",
      "SSH into Pi: ssh pi@lights.local",
      "Clone repository or download setup script",
      "Run: make provision",
      "Wait for automatic configuration"
    ]
  },
  {
    icon: Plug,
    title: "Connect Hardware",
    time: "2 minutes",
    content: [
      "Plug ENTTEC USB Pro into Raspberry Pi",
      "Connect DMX cable from ENTTEC to first fixture",
      "Daisy-chain additional fixtures if needed",
      "Power on all fixtures"
    ]
  },
  {
    icon: Sparkles,
    title: "Access Web UI",
    time: "Ready!",
    content: [
      "Open browser to https://lights.local:9999",
      "Accept self-signed certificate (first time)",
      "Configure your fixtures in QLC+",
      "Create your first scene",
      "Start controlling your lights!"
    ]
  }
];

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Get Started in <span className="text-gradient">10 Minutes</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Follow this step-by-step guide to set up your Lights Pi lighting controller
          </p>
        </div>

        {/* Time estimate */}
        <div className="bg-gray-900 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white mb-2">What You&apos;ll Build</h3>
              <p className="text-gray-300 mb-2">A fully functional web-based DMX lighting controller</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>⏱ Time: ~15 minutes</span>
                <span>•</span>
                <span>📊 Skill Level: Beginner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Prerequisites</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8">
            <p className="text-gray-400 mb-6">Make sure you have the following before starting:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {prerequisites.map((item, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-orange-500 rounded" />
                  <span className="text-gray-300">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200" />
                )}
                <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="inline-block bg-blue-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            Step {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        </div>
                        <div className="text-sm font-semibold text-orange-500">
                          ⏱ {step.time}
                        </div>
                      </div>
                      <ul className="space-y-3 mb-6">
                        {step.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Code examples for specific steps */}
                      {index === 1 && (
                        <div className="space-y-4">
                          <CodeBlock
                            code="cp .env.example .env
# Edit .env with your settings"
                            language="bash"
                            filename=".env configuration"
                          />
                          <CodeBlock
                            code={`WIFI1_SSID="SetupNet" WIFI1_PSK="setup-pass" \\
WIFI2_SSID="StudioNet" WIFI2_PSK="studio-pass" \\
./lightsctl.sh setup-full`}
                            language="bash"
                            filename="Full provisioning"
                          />
                          <CodeBlock
                            code={`./lightsctl.sh doctor
./lightsctl.sh test-dmx`}
                            language="bash"
                            filename="Verify installation"
                          />
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="space-y-4">
                          <CodeBlock
                            code="./lightsctl.sh open-web"
                            language="bash"
                            filename="Open web interface"
                          />
                          <p className="text-sm text-gray-400 mt-4">
                            Or manually navigate to: <code className="bg-gray-100 px-2 py-1 rounded">https://lights.local:9999</code>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Steps */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">🎉 You&apos;re All Set!</h2>
          <p className="text-gray-300 mb-6">
            Your Lights Pi controller is ready. Here&apos;s what to do next:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">→</span>
              <span className="text-gray-300">Explore the QLC+ interface and create more scenes</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">→</span>
              <span className="text-gray-300">Set up HTTPS for secure access (optional)</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">→</span>
              <span className="text-gray-300">Join our Discord community for support</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">→</span>
              <span className="text-gray-300">Share your setup in the showcase gallery</span>
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/docs"
              className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              View Full Documentation
            </a>
            <a
              href="/community"
              className="inline-flex items-center justify-center bg-gray-900 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition border border-purple-200"
            >
              Join Community
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
