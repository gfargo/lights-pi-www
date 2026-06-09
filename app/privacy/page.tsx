import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Lights Pi",
  description: "Lights Pi privacy policy. No telemetry, no tracking, no data collection from your lighting rig.",
};

export default function PrivacyPage() {
  return (
    <section className="min-h-screen bg-ink py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <p className="eyebrow">Legal</p>
        <h1
          className="font-display text-paper mt-6"
          style={{ fontSize: "var(--text-display-md)" }}
        >
          Privacy Policy
        </h1>

        <div className="mt-12 space-y-8 text-paper/70 leading-relaxed">
          <p>
            Lights Pi is open source software that runs entirely on your own
            hardware. We believe your lighting rig is your business.
          </p>

          <h2 className="font-mono text-sm uppercase tracking-widest text-amber-tungsten pt-4">
            The software
          </h2>
          <p>
            Lights Pi collects <strong className="text-paper">no telemetry, no usage data, and
            no analytics</strong> from your Raspberry Pi or lighting setup. All
            processing happens locally on your hardware. The MCP server, control
            server, and QLC+ instance never phone home.
          </p>

          <h2 className="font-mono text-sm uppercase tracking-widest text-amber-tungsten pt-4">
            This website
          </h2>
          <p>
            This marketing site uses{" "}
            <a
              href="https://vercel.com/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper border-b border-paper/30 hover:border-amber-tungsten hover:text-amber-tungsten transition-colors"
            >
              Vercel Analytics
            </a>{" "}
            for anonymous, aggregate page-view metrics. No cookies are set. No
            personally identifiable information is collected. You can block the
            script without any loss of functionality.
          </p>

          <h2 className="font-mono text-sm uppercase tracking-widest text-amber-tungsten pt-4">
            Third-party AI providers
          </h2>
          <p>
            If you configure the optional AI scene generation feature with
            OpenAI, Anthropic, or another provider, your natural-language
            commands are sent to that provider&apos;s API. Review their respective
            privacy policies. The local Ollama option keeps everything on-device.
          </p>

          <h2 className="font-mono text-sm uppercase tracking-widest text-amber-tungsten pt-4">
            Contact
          </h2>
          <p>
            Questions? Open an issue on{" "}
            <a
              href="https://github.com/gfargo/lights-pi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper border-b border-paper/30 hover:border-amber-tungsten hover:text-amber-tungsten transition-colors"
            >
              GitHub
            </a>.
          </p>
        </div>

        <p className="mt-16 font-mono text-xs text-paper/30 uppercase tracking-widest">
          Last updated: June 2025
        </p>
      </div>
    </section>
  );
}
