import { Terminal, Settings, Wrench, Shield, Database } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Command Reference - Lights Pi Documentation",
  description: "Complete reference for all Lights Pi commands and scripts",
};

const commandCategories = [
  {
    icon: Terminal,
    title: "Core Commands",
    color: "orange",
    commands: [
      { name: "validate", desc: "Pre-flight validation of config and connectivity" },
      { name: "doctor", desc: "Comprehensive health check with recommendations" },
      { name: "health", desc: "Quick status check (service, web UI, USB, resources)" },
      { name: "test-dmx", desc: "Verify ENTTEC USB and DMX output capability" },
      { name: "backup", desc: "Pull QLC+ config to local storage" },
      { name: "restore <file>", desc: "Restore QLC+ config from backup" }
    ]
  },
  {
    icon: Settings,
    title: "Provisioning",
    color: "blue",
    commands: [
      { name: "setup-full", desc: "Full provisioning: setup then harden (recommended)" },
      { name: "setup", desc: "Base install (requires WIFI1_SSID/PSK)" },
      { name: "harden", desc: "Firewall, watchdog, unattended upgrades" },
      { name: "add-key [pubkey]", desc: "Install SSH public key on Pi" },
      { name: "static-ip <ip/prefix> <gw>", desc: "Configure static IP address" },
      { name: "update", desc: "apt update && upgrade on Pi" }
    ]
  },
  {
    icon: Wrench,
    title: "Service Management",
    color: "purple",
    commands: [
      { name: "status", desc: "systemd status for qlcplus-web.service" },
      { name: "restart", desc: "Restart qlcplus-web.service" },
      { name: "logs", desc: "Last 80 lines from service journal" },
      { name: "logs-errors", desc: "Show only ERROR and WARN lines" },
      { name: "tail", desc: "Follow service logs live" },
      { name: "diagnose", desc: "Full diagnostic dump" }
    ]
  },
  {
    icon: Shield,
    title: "QLC+ Operations",
    color: "green",
    commands: [
      { name: "deploy-workspace <file>", desc: "Upload workspace to Pi and restart" },
      { name: "pull-workspace [output]", desc: "Download current workspace from Pi" },
      { name: "list-fixtures", desc: "Show installed fixture definitions" },
      { name: "install-fixture <file>", desc: "Upload custom fixture definition" },
      { name: "open-web", desc: "Open web UI in default browser" }
    ]
  },
  {
    icon: Database,
    title: "Network & System",
    color: "pink",
    commands: [
      { name: "wifi-status", desc: "Show current SSID and IP address" },
      { name: "scan", desc: "Scan network for Pi devices" },
      { name: "ssh", desc: "Open interactive shell on Pi" },
      { name: "reboot", desc: "Reboot the Pi" },
      { name: "os-version", desc: "Show OS and kernel version" }
    ]
  }
];

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/docs" className="text-orange-500 hover:text-orange-400 mb-6 inline-block">
          ← Back to Documentation
        </Link>

        <h1 className="text-5xl font-bold mb-4">
          <span className="text-gradient">Command Reference</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Complete reference for all lightsctl.sh commands
        </p>

        <div className="mb-12 bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-bold text-white mb-3">Basic Usage</h3>
          <CodeBlock
            code="./lightsctl.sh <command> [arguments]"
            language="bash"
          />
          <p className="text-gray-400 mt-4">
            All commands can also be run via Makefile shortcuts: <code className="bg-gray-800 px-2 py-1 rounded">make &lt;command&gt;</code>
          </p>
        </div>

        <div className="space-y-8">
          {commandCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.commands.map((cmd, i) => (
                    <div key={i} className="border-l-2 border-orange-500/50 pl-4">
                      <code className="text-orange-500 font-mono text-sm">{cmd.name}</code>
                      <p className="text-gray-400 text-sm mt-1">{cmd.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-white/90 mb-6">
            Check out our troubleshooting guide or join the community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/docs"
              className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              All Documentation
            </Link>
            <Link
              href="/community"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
