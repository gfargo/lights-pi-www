import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lights Pi - Professional Studio Lighting Control for $35",
  description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
  keywords: ["Raspberry Pi lighting controller", "DMX controller", "QLC+", "studio lighting", "open source"],
  authors: [{ name: "Lights Pi Team" }],
  openGraph: {
    title: "Lights Pi - Professional Studio Lighting Control for $35",
    description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
    type: "website",
    url: "https://lightspi.dev",
    siteName: "Lights Pi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lights Pi - Professional Studio Lighting Control for $35",
    description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
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
      </body>
    </html>
  );
}
