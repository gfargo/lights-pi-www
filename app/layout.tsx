import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lights Pi - Professional Studio Lighting Control for $35",
  description: "Open source, self-hosted, no subscriptions. Control DMX fixtures from any device on your network.",
  keywords: ["Raspberry Pi lighting controller", "DMX controller", "QLC+", "studio lighting", "open source"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
