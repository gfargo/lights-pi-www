import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Lights Pi",
  description: "Frequently asked questions about Lights Pi. Setup, hardware compatibility, MCP integration, DMX troubleshooting, and more.",
  alternates: {
    canonical: "https://lights.griffen.codes/faq",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
