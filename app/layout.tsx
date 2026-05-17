import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { OutboundLinkTracker } from "@/components/analytics/OutboundLinkTracker";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { FlagsProvider } from "@/components/flags/flags-provider";
import { resolveAllFlags, pickClientFlags } from "@/lib/flags/runtime";
import { getLatestVersion } from "@/lib/github";

// Editorial-theatrical type system.
// Fraunces (variable, with optical-size axis) for display.
// Geist Sans for body. Geist Mono for technical / cue-sheet typography.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://lights.griffen.codes'),
  title: "Lights Pi - QLC+ Lighting Controller for the Raspberry Pi",
  description: "Open source, self-hosted DMX lighting controller. Control professional fixtures from any device on your network — or wire it into Claude, ChatGPT, or any MCP-capable LLM agent. No subscriptions, unlimited fixtures.",
  keywords: ["Raspberry Pi lighting controller", "DMX controller", "QLC+", "studio lighting", "open source", "MCP server", "Model Context Protocol", "LLM agent", "Claude Desktop lighting"],
  authors: [{ name: "Lights Pi Team" }],
  openGraph: {
    title: "Lights Pi - QLC+ Lighting Controller for the Raspberry Pi",
    description: "Open source, self-hosted DMX lighting controller. Control professional fixtures from any device on your network — or wire it into Claude, ChatGPT, or any MCP-capable LLM agent. No subscriptions, unlimited fixtures.",
    type: "website",
    url: "https://lights.griffen.codes",
    siteName: "Lights Pi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lights Pi - QLC+ Lighting Controller",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lights Pi - QLC+ Lighting Controller for the Raspberry Pi",
    description: "Open source, self-hosted DMX lighting controller. Control professional fixtures from any device on your network — or wire it into Claude, ChatGPT, or any MCP-capable LLM agent. No subscriptions, unlimited fixtures.",
    images: ["/twitter-card.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve all flags + the latest release tag on the server.
  // getLatestVersion shares the underlying releases fetch cache with page.tsx
  // (1 hour TTL), so this is a single shared upstream request.
  const [serverFlags, version] = await Promise.all([
    resolveAllFlags(),
    getLatestVersion(),
  ]);
  const clientFlags = pickClientFlags(serverFlags);

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="bg-ink text-paper font-sans antialiased">
        <FlagsProvider flags={clientFlags}>
          {/* Skip to content link for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-amber-tungsten focus:text-ink focus:shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer version={version} />
          <Analytics />
          <SpeedInsights />
          {/* Custom engagement trackers — see components/analytics/* */}
          <PageViewTracker />
          <ScrollDepthTracker />
          <OutboundLinkTracker />
        </FlagsProvider>
      </body>
    </html>
  );
}
