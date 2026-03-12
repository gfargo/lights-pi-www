import { Check, X } from "lucide-react";

export function CostComparison() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Save Thousands, <span className="text-gradient">Keep the Quality</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional lighting control shouldn&apos;t break the bank
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-700">
                <th className="text-left py-4 px-6 font-bold text-white">Feature</th>
                <th className="text-center py-4 px-6 font-bold text-gray-400">Commercial</th>
                <th className="text-center py-4 px-6 font-bold bg-linear-to-r from-orange-500 to-blue-500 text-white rounded-t-xl">
                  Lights Pi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Initial Cost</td>
                <td className="py-4 px-6 text-center text-gray-400">$500-$5,000</td>
                <td className="py-4 px-6 text-center font-bold text-green-600 bg-gray-900">$35-$150</td>
              </tr>
              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Monthly Fee</td>
                <td className="py-4 px-6 text-center text-gray-400">$10-$50</td>
                <td className="py-4 px-6 text-center font-bold text-green-600 bg-gray-900">$0</td>
              </tr>
              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Fixture Limit</td>
                <td className="py-4 px-6 text-center text-gray-400">Varies</td>
                <td className="py-4 px-6 text-center font-bold text-green-600 bg-gray-900">Unlimited</td>
              </tr>

              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Customization</td>
                <td className="py-4 px-6 text-center">
                  <X className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center bg-gray-900">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Open Source</td>
                <td className="py-4 px-6 text-center">
                  <X className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center bg-gray-900">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
              </tr>
              <tr className="hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-white">Self-Hosted</td>
                <td className="py-4 px-6 text-center">
                  <X className="w-5 h-5 text-red-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center bg-gray-900">
                  <Check className="w-5 h-5 text-green-600 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-linear-to-r from-orange-500/20 to-blue-500/20 rounded-2xl p-8 border border-orange-500/50">
            <p className="text-3xl font-bold text-white mb-2">
              Save up to <span className="text-gradient">$4,850+</span>
            </p>
            <p className="text-gray-400">in the first year alone</p>
          </div>
        </div>
      </div>
    </section>
  );
}
