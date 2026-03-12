"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbulb, Palette, Zap, ArrowRight } from "lucide-react";

// Note: metadata export doesn't work in client components
// SEO is handled by parent layout and can be added via next/head if needed

export default function DemoPage() {
  const [lights, setLights] = useState([
    { id: 1, name: "Light 1", r: 255, g: 100, b: 50, brightness: 100 },
    { id: 2, name: "Light 2", r: 50, g: 100, b: 255, brightness: 100 },
    { id: 3, name: "Light 3", r: 255, g: 50, b: 255, brightness: 100 },
    { id: 4, name: "Light 4", r: 50, g: 255, b: 100, brightness: 100 }
  ]);

  const [selectedLight, setSelectedLight] = useState(0);

  const updateLight = (index: number, updates: Partial<typeof lights[0]>) => {
    setLights(prev => prev.map((light, i) => 
      i === index ? { ...light, ...updates } : light
    ));
  };

  const presets = [
    { name: "Warm White", r: 255, g: 200, b: 150 },
    { name: "Cool White", r: 200, g: 220, b: 255 },
    { name: "Red", r: 255, g: 0, b: 0 },
    { name: "Green", r: 0, g: 255, b: 0 },
    { name: "Blue", r: 0, g: 0, b: 255 },
    { name: "Purple", r: 200, g: 0, b: 255 },
    { name: "Cyan", r: 0, g: 255, b: 255 },
    { name: "Yellow", r: 255, g: 255, b: 0 }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    updateLight(selectedLight, { r: preset.r, g: preset.g, b: preset.b });
  };

  const applyToAll = () => {
    const current = lights[selectedLight];
    setLights(prev => prev.map(light => ({
      ...light,
      r: current.r,
      g: current.g,
      b: current.b,
      brightness: current.brightness
    })));
  };

  const currentLight = lights[selectedLight];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Interactive <span className="text-gradient">Demo</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Try controlling virtual DMX lights. Imagine doing this with real fixtures!
          </p>
          <div className="inline-flex items-center bg-gray-9000/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-lg text-sm">
            <Zap className="w-4 h-4 mr-2" />
            This is a simplified demo. Real Lights Pi has many more features!
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Virtual Lights Display */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Virtual Lights
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {lights.map((light, index) => {
                  const opacity = light.brightness / 100;
                  return (
                    <button
                      key={light.id}
                      onClick={() => setSelectedLight(index)}
                      className={`relative aspect-square rounded-2xl transition-all duration-300 ${
                        selectedLight === index
                          ? "ring-4 ring-blue-500 scale-105"
                          : "hover:scale-102"
                      }`}
                      style={{
                        backgroundColor: `rgba(${light.r}, ${light.g}, ${light.b}, ${opacity})`,
                        boxShadow: `0 0 60px rgba(${light.r}, ${light.g}, ${light.b}, ${opacity * 0.6})`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Lightbulb className="w-12 h-12 mx-auto mb-2 text-white/80" />
                          <div className="text-white font-bold text-lg">{light.name}</div>
                          <div className="text-white/60 text-sm">{light.brightness}%</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Control: {currentLight.name}
              </h3>

              {/* RGB Sliders */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-red-400 font-semibold mb-2 block">
                    Red: {currentLight.r}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentLight.r}
                    onChange={(e) => updateLight(selectedLight, { r: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-green-400 font-semibold mb-2 block">
                    Green: {currentLight.g}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentLight.g}
                    onChange={(e) => updateLight(selectedLight, { g: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-400 font-semibold mb-2 block">
                    Blue: {currentLight.b}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={currentLight.b}
                    onChange={(e) => updateLight(selectedLight, { b: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 font-semibold mb-2 block">
                    Brightness: {currentLight.brightness}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentLight.brightness}
                    onChange={(e) => updateLight(selectedLight, { brightness: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              <button
                onClick={applyToAll}
                className="w-full bg-orange-500 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Apply to All Lights
              </button>
            </div>

            {/* Presets */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Color Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-white hover:scale-105 transition"
                    style={{
                      backgroundColor: `rgb(${preset.r}, ${preset.g}, ${preset.b})`
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Control Real Lights?</h2>
          <p className="text-xl mb-8 text-white/90">
            Build your own Lights Pi controller and control actual DMX fixtures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quick-start"
              className="inline-flex items-center justify-center bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/hardware"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition border border-white/20"
            >
              View Hardware Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
