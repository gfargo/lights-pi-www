import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FlagsProvider } from "@/components/flags/flags-provider";
import { resolveAllFlags, pickClientFlags } from "@/lib/flags/runtime";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://lights.griffen.codes'),
  title: "Lights Pi - Professional Studio Lighting Control on the Pi",
  description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
  keywords: ["Raspberry Pi lighting controller", "DMX controller", "QLC+", "studio lighting", "open source"],
  authors: [{ name: "Lights Pi Team" }],
  openGraph: {
    title: "Lights Pi - Professional Studio Lighting Control on the Pi",
    description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
    type: "website",
    url: "https://lights.griffen.codes",
    siteName: "Lights Pi",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Lights Pi - Professional Studio Lighting Control",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lights Pi - Professional Studio Lighting Control on the Pi",
    description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
    images: ["/twitter-card.svg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve all flags on server
  const serverFlags = await resolveAllFlags();
  const clientFlags = pickClientFlags(serverFlags);

  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <FlagsProvider flags={clientFlags}>
          {/* Skip to content link for keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-orange-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </FlagsProvider>
      </body>
    </html>
  );
}
