"use client";

import { Video, Camera, Radio, Music, GraduationCap, Home } from "lucide-react";
import { useState } from 'react';

const useCases = [
  {
    icon: Video,
    title: "YouTube Studio",
    description: "Consistent lighting for videos",
    features: ["Quick scene changes", "Remote control during recording", "Professional results"],
    color: "red"
  },
  {
    icon: Camera,
    title: "Photography Studio",
    description: "Client session presets",
    features: ["Color temperature control", "Mood lighting scenes", "Portrait & product lighting"],
    color: "blue"
  },
  {
    icon: Radio,
    title: "Live Streaming",
    description: "Dynamic lighting effects",
    features: ["Viewer interaction triggers", "Multi-camera setups", "Scene automation"],
    color: "purple"
  },
  {
    icon: Music,
    title: "Small Venue/Events",
    description: "Portable lighting rig",
    features: ["Event-specific scenes", "Easy setup/teardown", "Wireless control"],
    color: "pink"
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Teaching lighting design",
    features: ["Affordable lab equipment", "Hands-on learning", "Curriculum integration"],
    color: "green"
  },
  {
    icon: Home,
    title: "Home Automation",
    description: "Ambient lighting",
    features: ["Smart home integration", "MQTT/API control", "Scheduled scenes"],
    color: "orange"
  }
];

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for <span className="text-gradient">Your Workflow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From content creation to live events, Lights Pi adapts to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <Icon className={`w-10 h-10 mb-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
