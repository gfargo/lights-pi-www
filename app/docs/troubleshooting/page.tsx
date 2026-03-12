import { AlertTriangle, CheckCircle, Terminal, Wifi, Usb } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Troubleshooting - Lights Pi Documentation",
  description: "Common issues and solutions for Lights Pi",
};

const issues = [
  {
    icon: Usb,
    title: "ENTTEC Not Detected",
    symptoms: [
      "test-dmx command fails",
      "No DMX output from fixtures",
      "USB device not showing in lsusb"
    ],
    solutions: [
      {
        title: "Verify USB Connection",
        code: `./lightsctl.sh test-dmx
./lightsctl.sh lsusb`
      },
      {
        title: "Check User Permissions",
        code: `./lightsctl.sh ssh
groups $USER   # should include dialout`
      },
      {
        title: "Replug Device",
        description: "Unplug and replug the ENTTEC. If harden was run, it should appear at /dev/dmx0"
      }
    ]
  },
  {
    icon: Terminal,
    title: "QLC+ Service Won't Start",
    symptoms: [
      "Web UI not accessible",
      "Service status shows failed",
      "Logs show Qt platform errors"
    ],
    solutions: [
      {
        title: "Check Service Logs",
        code: `./lightsctl.sh logs
./lightsctl.sh logs-errors`
      },
      {
        title: "Fix Qt Platform Issues",
        code: `./lightsctl.sh qlc-headless
./lightsctl.sh restart`
      },
      {
        title: "Verify Installation",
        code: `./lightsctl.sh doctor
./lightsctl.sh health`
      }
    ]
  },
  {
    icon: Wifi,
    title: "Can't Find Pi on Network",
    symptoms: [
      "lights.local doesn't resolve",
      "SSH connection fails",
      "Can't access web UI"
    ],
    solutions: [
      {
        title: "Scan Network",
        code: `./lightsctl.sh scan
./lightsctl.sh check`
      },
      {
        title: "Check WiFi Configuration",
        description: "Ensure WiFi credentials were set correctly during SD card preparation"
      },
      {
        title: "Try Direct IP",
        description: "Check your router's DHCP leases to find the Pi's IP address, then update PI_HOST in .env"
      }
    ]
  },
  {
    icon: AlertTriangle,
    title: "Web UI Hangs or Doesn't Load",
    symptoms: [
      "Browser connects but page never loads",
      "Spinning wheel forever",
      "Interface unresponsive"
    ],
    solutions: [
      {
        title: "Remove --operate Flag",
        code: `./lightsctl.sh ssh
sudo sed -i 's/--operate//' /etc/systemd/system/qlcplus-web.service
sudo systemctl daemon-reload
sudo systemctl restart qlcplus-web`
      },
      {
        title: "Restart Service",
        code: `./lightsctl.sh restart
./lightsctl.sh health`
      }
    ]
  },
  {
    icon: CheckCircle,
    title: "Lights Not Responding",
    symptoms: [
      "DMX fixtures don't respond",
      "Scenes don't affect lights",
      "Everything else works"
    ],
    solutions: [
      {
        title: "Check Universe Output",
        description: "In QLC+ web UI, go to Inputs/Outputs and ensure universe output is enabled"
      },
      {
        title: "Verify ENTTEC Selection",
        description: "Confirm ENTTEC is selected as the output plugin for the correct universe"
      },
      {
        title: "Check DMX Addresses",
        description: "Verify fixture DMX addresses in QLC+ match their physical DIP switch settings"
      },
      {
        title: "Test DMX Output",
        code: `./lightsctl.sh test-dmx`
      }
    ]
  }
];

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/docs" className="text-orange-500 hover:text-orange-400 mb-6 inline-block">
          ← Back to Documentation
        </Link>

        <h1 className="text-5xl font-bold mb-4">
          <span className="text-gradient">Troubleshooting</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Common issues and how to fix them
        </p>

        <div className="mb-12 bg-orange-500/20 border border-orange-500/50 rounded-xl p-6">
          <h3 className="font-bold text-white mb-3">Quick Diagnostics</h3>
          <p className="text-gray-300 mb-4">
            Start with these commands to identify issues:
          </p>
          <CodeBlock
            code={`./lightsctl.sh doctor      # Full health check
./lightsctl.sh validate    # Pre-flight validation
./lightsctl.sh diagnose    # Detailed diagnostic dump`}
            language="bash"
          />
        </div>

        <div className="space-y-8">
          {issues.map((issue, index) => {
            const Icon = issue.icon;
            return (
              <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3">{issue.title}</h2>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Symptoms:</h4>
                      <ul className="space-y-1">
                        {issue.symptoms.map((symptom, i) => (
                          <li key={i} className="text-gray-300 text-sm">• {symptom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-semibold text-white">Solutions:</h4>
                  {issue.solutions.map((solution, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <h5 className="font-bold text-orange-500 mb-3">{solution.title}</h5>
                      {solution.description && (
                        <p className="text-gray-300 mb-3">{solution.description}</p>
                      )}
                      {solution.code && (
                        <CodeBlock code={solution.code} language="bash" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-linear-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Having Issues?</h2>
          <p className="text-white/90 mb-6">
            Join our community for help from other users and developers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Join Discord
            </Link>
            <a
              href="https://github.com/gfargo/lights-pi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
            >
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
