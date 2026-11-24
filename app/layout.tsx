import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { OutboundLinkTracker } from "@/components/analytics/OutboundLinkTracker";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { RevealObserver } from "@/components/RevealObserver";
import { FlagsProvider } from "@/components/flags/flags-provider";
import { resolveAllFlags, pickClientFlags } from "@/lib/flags/runtime";
import { getLatestVersion } from "@/lib/github";

// One typeface: Chillax (Fontshare, loaded in <head>) for display and text.
// Geist Mono is kept only for real code blocks in the docs.
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
  alternates: {
    canonical: "https://lights.griffen.codes",
  },
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
      className={geistMono.variable}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600&display=swap"
        />
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
          <RevealObserver />
          <ScrollDepthTracker />
          <OutboundLinkTracker />
        </FlagsProvider>
      </body>
    </html>
  );
}
