"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "Do I need programming experience?",
          a: "No! The setup process is automated with simple commands. If you can follow a recipe, you can set up Lights Pi."
        },
        {
          q: "How long does setup take?",
          a: "About 10-15 minutes from start to finish. Most of that time is waiting for the Pi to boot and install software."
        },
        {
          q: "What if I don't have a Raspberry Pi?",
          a: "You'll need to purchase one. The Pi 3B+ costs around $35 and the Pi 4 costs around $55. Check our hardware guide for details."
        },
        {
          q: "Can I use this commercially?",
          a: "Yes! Lights Pi is MIT licensed, which means you can use it for any purpose, including commercial projects."
        }
      ]
    },
    {
      category: "Hardware",
      questions: [
        {
          q: "Which Raspberry Pi should I buy?",
          a: "Both Pi 3B+ and Pi 4 work great. Pi 4 offers better performance for larger setups (10+ fixtures), while Pi 3B+ is perfect for smaller setups and costs less."
        },
        {
          q: "Do I need the ENTTEC specifically?",
          a: "The ENTTEC DMX USB Pro is highly recommended as it's well-supported and reliable. Other DMX interfaces may work but aren't officially supported."
        },
        {
          q: "What fixtures are compatible?",
          a: "Any DMX-512 compatible fixture will work. This includes LED pars, moving heads, strip lights, and more from any manufacturer."
        },
        {
          q: "Can I use wireless DMX?",
          a: "Yes! Wireless DMX systems work great with Lights Pi. Just connect the wireless transmitter to the ENTTEC USB Pro."
        }
      ]
    },
    {
      category: "Software",
      questions: [
        {
          q: "Is this really free?",
          a: "Yes! Lights Pi is completely free and open source. No subscriptions, no hidden fees, no limitations."
        },
        {
          q: "How do updates work?",
          a: "Updates are released on GitHub. You can pull the latest changes and run the update script. We follow semantic versioning."
        },
        {
          q: "Can I customize the interface?",
          a: "Yes! The entire project is open source. You can modify anything you want. QLC+ also has extensive customization options."
        },
        {
          q: "What about security?",
          a: "Lights Pi includes HTTPS setup, firewall configuration, and SSH key authentication. It's designed to be secure by default."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "Pi won't connect to WiFi",
          a: "Double-check your WiFi credentials in the Raspberry Pi Imager. Make sure you're using 2.4GHz WiFi (5GHz may not work on older Pis)."
        },
        {
          q: "ENTTEC not detected",
          a: "Make sure it's plugged in before starting QLC+. Try unplugging and replugging it. Check that you have an authentic ENTTEC (not a counterfeit)."
        },
        {
          q: "Fixtures not responding",
          a: "Check DMX addressing, cable connections, and that fixtures are powered on. Use the DMX test command to verify output."
        },
        {
          q: "Web interface won't load",
          a: "Make sure you're on the same network as the Pi. Try accessing via IP address instead of lights.local. Check that services are running."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about Lights Pi
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold mb-6 text-white">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const index = catIndex * 100 + qIndex;
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={qIndex}
                      className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:shadow-md transition"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800 transition"
                      >
                        <span className="font-semibold text-white pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-300">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Still Have Questions?</h2>
          <p className="text-gray-400 mb-6">
            Join our community for help and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/community"
              className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Join Discord
            </a>
            <a
              href="/docs"
              className="bg-gray-900 text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition border border-purple-200"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
