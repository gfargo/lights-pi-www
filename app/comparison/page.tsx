import { Check, X, DollarSign } from "lucide-react";

export const metadata = {
  title: "Comparison - Lights Pi",
  description: "Compare Lights Pi with commercial lighting controllers and cloud services",
};

const commercialControllers = [
  {
    name: "Martin M-PC",
    price: "$500+",
    pros: ["Professional features", "Industry standard", "Good support"],
    cons: ["Expensive", "Windows only", "Complex setup"],
    lightsPiAdvantage: "Cost-effective, cross-platform, simple setup"
  },
  {
    name: "Chamsys MagicQ",
    price: "Free / $500+",
    pros: ["Powerful features", "Industry standard", "Free tier available"],
    cons: ["Steep learning curve", "Complex interface", "Desktop only"],
    lightsPiAdvantage: "Simpler interface, web-based, mobile-friendly"
  },
  {
    name: "DMXControl",
    price: "Free",
    pros: ["Free", "Windows/Linux support", "Active community"],
    cons: ["Desktop only", "Complex setup", "Limited mobile access"],
    lightsPiAdvantage: "Web-based, works on any device, simpler setup"
  }
];

const cloudServices = [
  {
    name: "Philips Hue",
    price: "$50/month",
    pros: ["Easy setup", "Mobile app", "Smart home integration"],
    cons: ["Subscription required", "Limited to Hue fixtures", "Cloud dependent"],
    lightsPiAdvantage: "No subscription, any DMX fixture, self-hosted"
  },
  {
    name: "LIFX Cloud",
    price: "$20/month",
    pros: ["Mobile app", "Easy to use", "Color control"],
    cons: ["Subscription required", "Proprietary fixtures", "Internet required"],
    lightsPiAdvantage: "No subscription, open standard, works offline"
  }
];

export default function ComparisonPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            How Lights Pi <span className="text-gradient">Compares</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how Lights Pi stacks up against commercial controllers and cloud services
          </p>
        </div>

        {/* Feature Matrix */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Feature Comparison</h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-orange-500/20 to-blue-500/20">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-white">Feature</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-400">Commercial</th>
                    <th className="text-center py-4 px-6 font-bold text-gray-400">Cloud Service</th>
                    <th className="text-center py-4 px-6 font-bold bg-linear-to-r from-orange-500 to-blue-500 text-white">
                      Lights Pi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Initial Cost</td>
                    <td className="py-4 px-6 text-center text-gray-400">$500-$5,000</td>
                    <td className="py-4 px-6 text-center text-gray-400">$0-$100</td>
                    <td className="py-4 px-6 text-center font-bold text-green-600 bg-gray-900">$35-$150</td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Monthly Cost</td>
                    <td className="py-4 px-6 text-center text-gray-400">$0</td>
                    <td className="py-4 px-6 text-center text-gray-400">$10-$50</td>
                    <td className="py-4 px-6 text-center font-bold text-green-600 bg-gray-900">$0</td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Self-Hosted</td>
                    <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Open Source</td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Web Interface</td>
                    <td className="py-4 px-6 text-center text-gray-400">Varies</td>
                    <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Mobile Control</td>
                    <td className="py-4 px-6 text-center text-gray-400">Varies</td>
                    <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Offline Operation</td>
                    <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Any DMX Fixture</td>
                    <td className="py-4 px-6 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">Customizable</td>
                    <td className="py-4 px-6 text-center text-gray-400">Limited</td>
                    <td className="py-4 px-6 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="hover:bg-gray-800">
                    <td className="py-4 px-6 font-medium text-white">API Access</td>
                    <td className="py-4 px-6 text-center text-gray-400">Varies</td>
                    <td className="py-4 px-6 text-center text-gray-400">Limited</td>
                    <td className="py-4 px-6 text-center bg-gray-900"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* vs Commercial Controllers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">vs Commercial Controllers</h2>
          <div className="space-y-6">
            {commercialControllers.map((controller, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{controller.name}</h3>
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{controller.price}</span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-green-500 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {controller.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {controller.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <X className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-linear-to-br from-orange-500/20 to-blue-500/20 rounded-xl p-4 border border-orange-500/50">
                    <h4 className="font-bold text-orange-500 mb-2">Lights Pi Advantage</h4>
                    <p className="text-gray-300">{controller.lightsPiAdvantage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* vs Cloud Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">vs Cloud Services</h2>
          <div className="space-y-6">
            {cloudServices.map((service, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl border border-gray-700 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                    <div className="flex items-center text-gray-400">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-semibold">{service.price}</span>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-green-500 mb-3">Pros</h4>
                    <ul className="space-y-2">
                      {service.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-3">Cons</h4>
                    <ul className="space-y-2">
                      {service.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <X className="w-4 h-4 text-red-500 mr-2 shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-linear-to-br from-orange-500/20 to-blue-500/20 rounded-xl p-4 border border-orange-500/50">
                    <h4 className="font-bold text-orange-500 mb-2">Lights Pi Advantage</h4>
                    <p className="text-gray-300">{service.lightsPiAdvantage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Savings */}
        <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Save Thousands</h2>
          <p className="text-2xl mb-8 text-white/90">
            Lights Pi can save you <span className="font-bold">$4,850+</span> in the first year
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">$0</div>
              <div className="text-white/90">Monthly fees</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">$35-150</div>
              <div className="text-white/90">One-time cost</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-white/90">Fixture limit</div>
            </div>
          </div>
          <a
            href="/quick-start"
            className="inline-block bg-gray-900 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </div>
  );
}
