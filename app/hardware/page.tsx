import { ShoppingCart, Cpu, Usb, Cable, Wifi, Shield } from "lucide-react";

export const metadata = {
  title: "Hardware Guide - Lights Pi",
  description: "Complete shopping list and hardware recommendations for building your Lights Pi controller",
};

const shoppingList = [
  {
    item: "Raspberry Pi 4 (4GB)",
    purpose: "Main controller",
    price: "$55",
    priority: "Required",
    link: "#"
  },
  {
    item: "Raspberry Pi 3B+",
    purpose: "Budget alternative",
    price: "$35",
    priority: "Alternative",
    link: "#"
  },
  {
    item: "MicroSD Card 32GB",
    purpose: "OS storage",
    price: "$8",
    priority: "Required",
    link: "#"
  },
  {
    item: "ENTTEC DMX USB Pro",
    purpose: "DMX interface",
    price: "$150",
    priority: "Required",
    link: "#"
  },
  {
    item: "Power Supply (USB-C/Micro)",
    purpose: "Pi power",
    price: "$8",
    priority: "Required",
    link: "#"
  },
  {
    item: "DMX Cable (3-pin)",
    purpose: "Fixture connection",
    price: "$10-20",
    priority: "Required",
    link: "#"
  },
  {
    item: "Wireless DMX System",
    purpose: "Cable-free setup",
    price: "$200-500",
    priority: "Optional",
    link: "#"
  },
  {
    item: "Case for Pi",
    purpose: "Protection",
    price: "$10-20",
    priority: "Recommended",
    link: "#"
  }
];

const setups = [
  {
    name: "Budget Setup",
    price: "$200",
    icon: Cpu,
    items: [
      "Raspberry Pi 3B+",
      "ENTTEC USB Pro",
      "2x LED par cans",
      "Basic cables & power"
    ],
    color: "blue"
  },
  {
    name: "Creator Setup",
    price: "$500",
    icon: Usb,
    items: [
      "Raspberry Pi 4 (4GB)",
      "ENTTEC USB Pro",
      "4x RGB LED panels",
      "Wireless DMX transmitter"
    ],
    color: "purple"
  },
  {
    name: "Professional Setup",
    price: "$1,500",
    icon: Wifi,
    items: [
      "Raspberry Pi 4 (8GB)",
      "ENTTEC USB Pro",
      "8+ fixtures (moving heads, pars, strips)",
      "Wireless DMX system",
      "Backup Pi"
    ],
    color: "pink"
  }
];

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Hardware <span className="text-gradient">Guide</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to build your Lights Pi controller
          </p>
        </div>

        {/* Shopping List */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Complete Shopping List</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-gray-900">Item</th>
                    <th className="text-left py-4 px-6 font-bold text-gray-900">Purpose</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">Price</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">Priority</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-900">Buy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shoppingList.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="py-4 px-6 font-medium text-gray-900">{item.item}</td>
                      <td className="py-4 px-6 text-gray-600">{item.purpose}</td>
                      <td className="py-4 px-6 text-center text-gray-900 font-semibold">{item.price}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === "Required" ? "bg-red-100 text-red-700" :
                          item.priority === "Recommended" ? "bg-blue-100 text-blue-700" :
                          item.priority === "Alternative" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <a href={item.link} className="text-blue-600 hover:text-blue-700 font-medium">
                          <ShoppingCart className="w-5 h-5 inline" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-sm text-green-700 font-semibold mb-1">Minimum Setup</div>
              <div className="text-3xl font-bold text-green-900">~$200</div>
              <div className="text-sm text-green-600 mt-1">Pi 3 + basic setup</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-sm text-blue-700 font-semibold mb-1">Recommended Setup</div>
              <div className="text-3xl font-bold text-blue-900">~$250</div>
              <div className="text-sm text-blue-600 mt-1">Pi 4 + case</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-sm text-purple-700 font-semibold mb-1">With Wireless DMX</div>
              <div className="text-3xl font-bold text-purple-900">~$450-750</div>
              <div className="text-sm text-purple-600 mt-1">Full wireless setup</div>
            </div>
          </div>
        </div>

        {/* Example Setups */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Example Setups</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {setups.map((setup, index) => {
              const Icon = setup.icon;
              return (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{setup.name}</h3>
                  <div className="text-3xl font-bold text-gradient mb-6">{setup.price}</div>
                  <ul className="space-y-3">
                    {setup.items.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="text-blue-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hardware Deep Dives */}
        <div className="space-y-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start">
              <Cpu className="w-8 h-8 text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Raspberry Pi Selection</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 mb-4">
                    Both the Raspberry Pi 3B+ and Pi 4 work great for Lights Pi. The Pi 4 offers better performance
                    and more RAM, but the Pi 3B+ is perfectly capable for most setups.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Choose Pi 4 if:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• You have 10+ fixtures</li>
                        <li>• You want faster web interface</li>
                        <li>• You plan to run additional services</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Choose Pi 3B+ if:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• You&apos;re on a budget</li>
                        <li>• You have fewer than 10 fixtures</li>
                        <li>• You want to minimize power consumption</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start">
              <Usb className="w-8 h-8 text-purple-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">ENTTEC DMX USB Pro</h3>
                <p className="text-gray-700 mb-4">
                  The ENTTEC DMX USB Pro is the recommended DMX interface. It&apos;s reliable, well-supported by QLC+,
                  and widely available. Make sure to buy from authorized dealers to avoid counterfeits.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Avoid counterfeits:</strong> Buy from B&H Photo, Amazon (sold by ENTTEC), or authorized dealers.
                      Counterfeit units may not work properly with QLC+.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="flex items-start">
              <Cable className="w-8 h-8 text-pink-600 mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">DMX Cables</h3>
                <p className="text-gray-700 mb-4">
                  Use quality DMX cables for reliable operation. Most fixtures use 3-pin XLR, but some professional
                  fixtures use 5-pin. Cable quality matters for longer runs.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Maximum cable length: 300-500 feet total
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Use termination resistor for long runs
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Avoid running DMX cables parallel to power cables
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl mb-6 text-white/90">
            Get your hardware and follow our quick start guide
          </p>
          <a
            href="/quick-start"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Quick Start Guide
          </a>
        </div>
      </div>
    </div>
  );
}
