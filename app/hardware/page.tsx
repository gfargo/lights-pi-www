"use client";

import { ShoppingCart, Cpu, Usb, Cable, Shield, Wifi } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { shoppingList, costSummary, setups } from "@/lib/hardware-catalog";

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Hardware <span className="text-gradient">Guide</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to build your Lights Pi controller
          </p>
        </div>

        {/* Shopping List */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Complete Shopping List</h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-orange-500/20 to-blue-500/20">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-white">Item</th>
                    <th className="text-left py-4 px-6 font-bold text-white">Purpose</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Price</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Priority</th>
                    <th className="text-center py-4 px-6 font-bold text-white">Buy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {shoppingList.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition">
                      <td className="py-4 px-6 font-medium text-white">{item.item}</td>
                      <td className="py-4 px-6 text-gray-400">{item.purpose}</td>
                      <td className="py-4 px-6 text-center text-white font-semibold">{item.price}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === "Required" ? "bg-red-500/20 text-red-400" :
                          item.priority === "Recommended" ? "bg-orange-500/20 text-orange-500" :
                          item.priority === "Alternative" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-gray-800 text-gray-300"
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <a 
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEvent.clickShoppingItem(item.item, item.price)}
                          className="text-orange-500 hover:text-orange-400 font-medium inline-block"
                        >
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
            <div className="bg-gray-900 rounded-xl p-6 border border-green-500/50">
              <div className="text-sm text-green-400 font-semibold mb-1">{costSummary.minimum.label}</div>
              <div className="text-3xl font-bold text-white">{costSummary.minimum.price}</div>
              <div className="text-sm text-green-600 mt-1">{costSummary.minimum.note}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/50">
              <div className="text-sm text-orange-500 font-semibold mb-1">{costSummary.recommended.label}</div>
              <div className="text-3xl font-bold text-white">{costSummary.recommended.price}</div>
              <div className="text-sm text-orange-500 mt-1">{costSummary.recommended.note}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-purple-500/50">
              <div className="text-sm text-purple-400 font-semibold mb-1">{costSummary.wireless.label}</div>
              <div className="text-3xl font-bold text-white">{costSummary.wireless.price}</div>
              <div className="text-sm text-orange-500 mt-1">{costSummary.wireless.note}</div>
            </div>
          </div>
        </div>

        {/* Example Setups */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Example Setups</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {setups.map((setup, index) => {
              const icons = [Cpu, Usb, Wifi];
              const Icon = icons[index] ?? Cpu;
              return (
                <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{setup.name}</h3>
                  <div className="text-3xl font-bold text-gradient mb-6">{setup.price}</div>
                  <ul className="space-y-3">
                    {setup.items.map((item, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-blue-400 mr-2">✓</span>
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
          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start">
              <Cpu className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Raspberry Pi Selection</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-300 mb-4">
                    Both the Raspberry Pi 3B+ and Pi 4 work great for Lights Pi. The Pi 4 offers better performance
                    and more RAM, but the Pi 3B+ is perfectly capable for most setups.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-bold text-white mb-2">Choose Pi 4 if:</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• You have 10+ fixtures</li>
                        <li>• You want faster web interface</li>
                        <li>• You plan to run additional services</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">Choose Pi 3B+ if:</h4>
                      <ul className="space-y-2 text-gray-300">
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

          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start">
              <Usb className="w-8 h-8 text-orange-500 mr-4 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">ENTTEC DMX Interfaces</h3>
                <p className="text-gray-300 mb-4">
                  ENTTEC makes the most widely supported USB-to-DMX interfaces for QLC+. They offer two models
                  depending on your needs and budget.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-bold text-white mb-2">Open DMX USB (~$67)</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Entry-level, open-source hardware</li>
                      <li>• Great for small setups and getting started</li>
                      <li>• Output only, no RDM support</li>
                      <li>• Works well with QLC+</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">DMX USB Pro (~$130)</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Professional-grade, faster frame rates</li>
                      <li>• RDM support for device discovery</li>
                      <li>• More stable under heavy load</li>
                      <li>• Recommended for 10+ fixtures</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-yellow-400 mr-2 shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-200">
                      <strong>Avoid counterfeits:</strong> Buy from B&H Photo, Amazon (sold by ENTTEC), or authorized dealers.
                      Counterfeit units may not work properly with QLC+.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
            <div className="flex items-start">
              <Cable className="w-8 h-8 text-pink-600 mr-4 shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">DMX Cables</h3>
                <p className="text-gray-300 mb-4">
                  Use quality DMX cables for reliable operation. Most fixtures use 3-pin XLR, but some professional
                  fixtures use 5-pin. Cable quality matters for longer runs.
                </p>
                <ul className="space-y-2 text-gray-300">
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
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    Enttec interfaces use 5-pin connectors — if you're connecting to a 3-pin device like the Chauvet D-Fi Hub 2, you'll need a 5-pin to 3-pin converter cable
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-linear-to-r from-orange-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Build?</h2>
          <p className="text-xl mb-6 text-white/90">
            Get your hardware and follow our quick start guide
          </p>
          <a
            href="/quick-start"
            onClick={() => trackEvent.clickGetStarted('hardware_cta')}
            className="inline-block bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            View Quick Start Guide
          </a>
        </div>
      </div>
    </div>
  );
}
