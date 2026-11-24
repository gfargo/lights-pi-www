import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Privacy Policy - Lights Pi",
  description: "Lights Pi privacy policy. No telemetry, no tracking, no data collection from your lighting rig.",
};

const h2 = "font-display text-paper pt-6";
const h2Style = { fontSize: "var(--step-lead)", lineHeight: 1.15 } as const;
const linkCls = "text-paper underline decoration-paper/40 decoration-2 underline-offset-4 hover:decoration-amber-tungsten transition-colors";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink px-[var(--gutter)] pb-[clamp(72px,9vw,140px)]">
      <PageHead
        scene={5}
        label="Privacy"
        title="Your rig is your business."
        lead="Lights Pi is open source software that runs entirely on your own hardware."
        aside="Last updated June 2025"
      />

      <div className="max-w-[42rem] space-y-6 text-paper" style={{ fontSize: "var(--step-body)", lineHeight: 1.6 }}>
        <h2 className={h2} style={h2Style}>
          The software
        </h2>
        <p>
          Lights Pi collects <strong className="font-semibold">no telemetry, no usage data, and no analytics</strong>{" "}
          from your Raspberry Pi or lighting setup. All processing happens locally on your hardware. The MCP server,
          control server, and QLC+ instance never phone home.
        </p>

        <h2 className={h2} style={h2Style}>
          This website
        </h2>
        <p>
          This marketing site uses{" "}
          <a href="https://vercel.com/analytics" target="_blank" rel="noopener noreferrer" className={linkCls}>
            Vercel Analytics
          </a>{" "}
          for anonymous, aggregate page-view metrics. No cookies are set. No personally identifiable information is
          collected. You can block the script without any loss of functionality.
        </p>

        <h2 className={h2} style={h2Style}>
          Third-party AI providers
        </h2>
        <p>
          If you configure the optional AI scene generation feature with OpenAI, Anthropic, or another provider, your
          natural-language commands are sent to that provider&apos;s API. Review their respective privacy policies. The
          local Ollama option keeps everything on-device.
        </p>

        <h2 className={h2} style={h2Style}>
          Contact
        </h2>
        <p>
          Questions? Open an issue on{" "}
          <a href="https://github.com/gfargo/lights-pi" target="_blank" rel="noopener noreferrer" className={linkCls}>
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
